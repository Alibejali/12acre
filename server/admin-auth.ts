import { timingSafeEqual } from "node:crypto";
import type { RequestHandler } from "express";

function readBearerToken(authorization: string | undefined): string | null {
  if (!authorization) return null;
  const match = /^Bearer\s+(\S+)$/i.exec(authorization.trim());
  return match?.[1] ?? null;
}

// timingSafeEqual throws when buffer lengths differ, so reject those first.
export function tokensEqual(provided: string, expected: string): boolean {
  const providedBuffer = Buffer.from(provided);
  const expectedBuffer = Buffer.from(expected);
  if (providedBuffer.length !== expectedBuffer.length) return false;
  return timingSafeEqual(providedBuffer, expectedBuffer);
}

export const requireAdmin: RequestHandler = (req, res, next) => {
  const configured = process.env.ADMIN_TOKEN;
  if (typeof configured !== "string" || configured.length === 0) {
    res.status(503).json({ error: "Admin access is not configured." });
    return;
  }

  const provided = readBearerToken(req.header("authorization"));
  if (provided === null || !tokensEqual(provided, configured)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  next();
};
