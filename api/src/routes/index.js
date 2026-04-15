import {Router} from 'express';
import healthRoutes from './health.routes.js';
import systemRoutes from './system.routes.js';


const router = Router();


router.use('/v1', healthRoutes);
router.use('/v1', systemRoutes);

export default router;