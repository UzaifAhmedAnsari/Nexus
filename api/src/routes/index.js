import {Router} from 'express';
import healthRoutes from './health.routes.js';
import systemRoutes from './system.routes.js';
import usersRoutes from './users.routes.js';
import workspacesRoutes from './workspaces.routes.js';


const router = Router();


router.use('/v1', healthRoutes);
router.use('/v1', systemRoutes);
router.use('/v1', usersRoutes);
router.use('/v1', workspacesRoutes);

export default router;