import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  // Contact payloads and admin errors stay out of the logs. The status line is enough.
  const isContactApi = path === "/api/contact" || path.startsWith("/api/contact/");

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    if (!isContactApi) {
      capturedJsonResponse = bodyJson;
    }
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  await registerRoutes(httpServer, app);

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // This must be registered after the SPA fallback middleware. Otherwise
  // fallback rendering errors bypass it and Express emits its plain-text
  // default "Internal Server Error" response.
  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    const requestedStatus = err?.status || err?.statusCode;
    const status =
      typeof requestedStatus === "number" && requestedStatus >= 400 && requestedStatus < 600
        ? requestedStatus
        : 500;

    console.error(`Unhandled request error for ${req.method} ${req.originalUrl}:`, err);

    // There is no safe way to replace an already-started response. Ending it
    // here avoids delegating to Express's default error handler.
    if (res.headersSent) {
      return res.end();
    }

    if (req.path.startsWith("/api")) {
      return res.status(status).json({
        error: status >= 500 ? "Internal Server Error" : "Bad Request",
      });
    }

    return res
      .status(status)
      .type("html")
      .send(
        "<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><title>Unable to load page</title></head><body><main><h1>Unable to load page</h1><p>Please try again shortly.</p></main></body></html>",
      );
  });

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
})();
