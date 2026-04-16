import { Router } from "express";
import { prisma } from "../lib/prisma.js";


const router = Router();

router.get("/users", async(_req, res, next) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: "asc"},
            select: {
                id: true,
                name: true,
                email: true,
                avatarInitials: true,
                createdAt: true,
            },
        });

        res.json ({
            ok: true,
            users,
        });
    } catch (error) {
        next(error);
    }
});

export default router;