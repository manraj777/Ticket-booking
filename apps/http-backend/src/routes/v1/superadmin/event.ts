import { Router } from "express";
import { client } from "@repo/db/client";
import { superAdminMiddleware } from "../../../middleware/superadmin";

const router: Router = Router();

router.get("/events", superAdminMiddleware, async (req, res) => {
    const events = await client.event.findMany();
    
    res.json({
        events
    });
});

export default router;