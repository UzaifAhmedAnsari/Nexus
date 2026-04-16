import { Router } from "express";
import {env} from '../config/env.js'
import {prisma} from '../lib/prisma.js';

const router = Router();

router.get("/system/bootstrap", async (_req, res, next) => {
  try {
    const [users, workspace, memberships] = await Promise.all([
      prisma.user.findMany({
        orderBy: { createdAt: "asc"},
        select: {
          id: true,
          name: true,
          email: true,
          avatarInitials: true,
          createdAt: true,
        },
      }),
      prisma.workspace.findMany({
        orderBy: { createdAt: "asc"},
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          }
        }
      }),
      prisma.workspaceMember.findMany({
        orderBy: { createdAt: "asc"},
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          }
        }
      })
    ]);

    res.json({
      ok: true,
      appName: "NexusForge AI",
      enviroment: env.nodeEnv,
      message: "Phase 2 relational bootstrap loaded",
      stats: {
        users: users.length,
        workspaces: workspace.length,
        memberships: memberships.length,
      },
      users,
      workspaces,
      memberships,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
});

export default router;
