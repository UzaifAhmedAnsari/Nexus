import { Router } from "express";
import {prisma} from '../lib/prisma.js';

const router = Router();


router.get("/workspaces", async(_req, res, next) => {
    try {
        const workspaces = await prisma.workspace.findMany({
            orderBy: {createdAt: "asc"},
            include: {
                owner: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                memberships: {
                    orderBy: {joineddAt: "asc"},
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
            },

            });
    } catch (error) {
        next(error);
    }
});

export default router;