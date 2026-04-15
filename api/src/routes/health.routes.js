import {Router} from 'express';
import {getDatabaseTime} from '../lib/db.js';

const router = Router();

router.get('/health', async (_req, res, next) => {
    try {
        const dbTime = await getDatabaseTime();

        res.json({
            ok: true,
            service: 'api',
            databse: {
                ok: true,
                time: dbTime,
            },
            uptimeSeconds: Math.floor(process.uptime()),
            timestamp: new Date().toISOString(),
        });

    } catch (error) {
        next(error);
    }
});

export default router;
