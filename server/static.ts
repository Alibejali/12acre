import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { applySundanceSeo } from "./sundance-seo";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  let lastKnownGoodTemplate: string | undefined;
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("/{*path}", async (req, res, next) => {
    try {
      const indexPath = path.resolve(distPath, "index.html");
      const template = await fs.promises.readFile(indexPath, "utf-8");
      lastKnownGoodTemplate = template;
      res
        .status(200)
        .type("html")
        .send(applySundanceSeo(template, req.originalUrl));
    } catch (error) {
      console.error(`Failed to render SPA fallback for ${req.originalUrl}:`, error);

      // If SEO injection fails after a successful read, retain a valid SPA
      // document rather than passing the request to Express's default error
      // page.
      if (lastKnownGoodTemplate) {
        return res.status(200).type("html").send(lastKnownGoodTemplate);
      }

      next(error);
    }
  });
}
