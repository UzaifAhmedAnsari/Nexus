import { Router } from "express";
import {env} from '../config/env.js'
const router = Router();

router.get("/system/bootstrap", (_req, res) => {
  res.json({
    ok: true,
    appName: "NexusForge AI",
    environment: env.nodeEnv,
    message: "Phase 1 backend is running",
    features: ["web", "api", "db"],
    timestamp: new Date().toISOString(),
  });
});

export default router;
