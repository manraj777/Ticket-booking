import { Router } from "express";
import { client } from "@repo/db/client";
import { superAdminMiddleware } from "../../../middleware/superadmin";
import { UpdateEventSchema } from "@repo/common/types";

const router: Router = Router();

router.get("/", superAdminMiddleware, async (req, res) => {
    const events = await client.event.findMany();
    
    res.json({
        events
    });
});

router.put("/metadata/:eventId", superAdminMiddleware, async (req, res) => {
    const {data, success} = UpdateEventSchema.safeParse(req.body);
    const eventId = req.params.eventId ?? "";
    if(!success) {
        res.status(400).json({
            error: "Invalid request body"
        });
        return;
    }

    try{
    
        await client.event.update({
            where: {
                id: eventId
            },
            data: {
                name: data.name,
                description: data.description,
                startTime: new Date(data.startTime),
                locationId: data.location,
                imageUrl: data.banner,
                published: data.published,
                ended: data.ended
            }
        })
            res.json({
                message : "Event updated successfully"
            })
    } catch(e) {
        res.status(500).json({
            message: "Could not update event",
        });
    }
});

export default router;