import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middleware/error-handler.js";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use((req, _res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
  });

  app.get("/healthz", (_req, res) => {
    res.json({
      ok: true,
      service: "api",
    });
  });

  app.use("/api", routes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
