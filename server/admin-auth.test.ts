import assert from "node:assert/strict";
import { createServer, type Server } from "node:http";
import { once } from "node:events";
import { readFileSync } from "node:fs";
import { after, test } from "node:test";
import express, { type Express } from "express";
import { requireAdmin, tokensEqual } from "./admin-auth";

const originalAdminToken = process.env.ADMIN_TOKEN;
const configuredToken = "test-admin-token-correct";
const wrongToken = "test-admin-token-wrong!!";

after(() => {
  if (originalAdminToken === undefined) delete process.env.ADMIN_TOKEN;
  else process.env.ADMIN_TOKEN = originalAdminToken;
});

function setAdminToken(value: string | undefined) {
  if (value === undefined) delete process.env.ADMIN_TOKEN;
  else process.env.ADMIN_TOKEN = value;
}

function protectedApp() {
  const app = express();
  let hits = 0;
  app.get("/api/contact", requireAdmin, (_req, res) => {
    hits += 1;
    res.status(200).json({ ok: true });
  });
  app.delete("/api/contact/:id", requireAdmin, (_req, res) => {
    hits += 1;
    res.status(200).json({ ok: true });
  });
  return { app, hits: () => hits };
}

async function listen(app: Express): Promise<{ base: string; close: () => Promise<void> }> {
  const server: Server = createServer(app);
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  if (address === null || typeof address === "string") {
    throw new Error("Expected a TCP port");
  }
  return {
    base: `http://127.0.0.1:${address.port}`,
    close: async () => {
      server.close();
      await once(server, "close");
    },
  };
}

test("admin token middleware", async (t) => {
  await t.test("tokensEqual compares equal-length buffers only", () => {
    assert.equal(tokensEqual("abcdef", "abcdef"), true);
    assert.equal(tokensEqual("abcdef", "abcdeg"), false);
    assert.equal(tokensEqual("short", "much-longer-value"), false);
    assert.equal(tokensEqual("", "configured"), false);
  });

  await t.test("GET and DELETE without a token return 401 and no data", async () => {
    setAdminToken(configuredToken);
    const { app, hits } = protectedApp();
    const server = await listen(app);
    try {
      const getResponse = await fetch(`${server.base}/api/contact`);
      assert.equal(getResponse.status, 401);
      assert.deepEqual(await getResponse.json(), { error: "Unauthorized" });

      const deleteResponse = await fetch(`${server.base}/api/contact/example-id`, {
        method: "DELETE",
      });
      assert.equal(deleteResponse.status, 401);
      assert.deepEqual(await deleteResponse.json(), { error: "Unauthorized" });
      assert.equal(hits(), 0);
    } finally {
      await server.close();
    }
  });

  await t.test("a wrong or malformed token returns 401 and is not echoed", async () => {
    setAdminToken(configuredToken);
    const { app, hits } = protectedApp();
    const server = await listen(app);
    try {
      const cases = [
        `Bearer ${wrongToken}`,
        "Bearer short",
        configuredToken,
        `Bearer ${configuredToken} extra`,
        "Basic dGVzdA==",
      ];
      for (const authorization of cases) {
        const response = await fetch(`${server.base}/api/contact`, {
          headers: { authorization },
        });
        const text = await response.text();
        assert.equal(response.status, 401);
        assert.equal(text.includes(configuredToken), false);
        assert.equal(text.includes(wrongToken), false);
      }
      const deleteResponse = await fetch(`${server.base}/api/contact/example-id`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${wrongToken}` },
      });
      assert.equal(deleteResponse.status, 401);
      assert.equal(hits(), 0);
    } finally {
      await server.close();
    }
  });

  await t.test("a matching bearer token allows GET and DELETE", async () => {
    setAdminToken(configuredToken);
    const { app, hits } = protectedApp();
    const server = await listen(app);
    try {
      const headers = { authorization: `Bearer ${configuredToken}` };
      const getResponse = await fetch(`${server.base}/api/contact`, { headers });
      assert.equal(getResponse.status, 200);
      assert.deepEqual(await getResponse.json(), { ok: true });

      const deleteResponse = await fetch(`${server.base}/api/contact/example-id`, {
        method: "DELETE",
        headers: { authorization: `bearer ${configuredToken}` },
      });
      assert.equal(deleteResponse.status, 200);
      assert.deepEqual(await deleteResponse.json(), { ok: true });
      assert.equal(hits(), 2);
    } finally {
      await server.close();
    }
  });

  await t.test("unset and empty ADMIN_TOKEN fail closed", async () => {
    for (const value of [undefined, ""] as const) {
      setAdminToken(value);
      const { app, hits } = protectedApp();
      const server = await listen(app);
      try {
        const missing = await fetch(`${server.base}/api/contact`);
        assert.equal(missing.status, 503);
        assert.deepEqual(await missing.json(), { error: "Admin access is not configured." });

        const presented = await fetch(`${server.base}/api/contact`, {
          headers: { authorization: `Bearer ${configuredToken}` },
        });
        assert.equal(presented.status, 503);
        assert.equal((await presented.text()).includes(configuredToken), false);

        const remove = await fetch(`${server.base}/api/contact/example-id`, {
          method: "DELETE",
          headers: { authorization: `Bearer ${configuredToken}` },
        });
        assert.equal(remove.status, 503);
        assert.equal(hits(), 0);
      } finally {
        await server.close();
      }
    }
  });

  await t.test("contact read and delete routes use requireAdmin and POST stays public", () => {
    const source = readFileSync(new URL("./routes.ts", import.meta.url), "utf8");
    assert.equal(source.includes('app.get("/api/contact", requireAdmin,'), true);
    assert.equal(source.includes('app.delete("/api/contact/:id", requireAdmin,'), true);
    assert.equal(source.includes('app.post("/api/contact", requireAdmin'), false);
    assert.equal(source.includes('app.post("/api/contact", async (req, res) => {'), true);
  });
});
