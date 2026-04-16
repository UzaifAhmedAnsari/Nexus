import {Router} from 'express';
import {prisma} from '../lib/prisma.js';

const router = Router();

router.get('/health', async (_req, res, next) => {
    try {
        const [dbNow] = await prisma.$queryRaw`SELECT NOW() AS now`;
        const [users, workspaces, memberships] = await Promise.all([
            prisma.user.count(),
            prisma.workspace.count(),
            prisma.workspaceMember.count(),
        ]);


        res.json({
            ok: true,
            service: "api",
            database: {
                ok: true,
                time: dbNow.now,
            },
            stats: {
                users,
                workspaces,
                memberships,
            },
            uptimeSeconds: Math.floor(process.uptime()),
            timestamp: new Date().toISOString(),
        });

    } catch (error) {
        next(error);
    }
});

export default router;
