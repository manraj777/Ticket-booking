import { Router } from "express";
import { client } from "@repo/db/client";
import { adminMiddleware } from "../../../middleware/admin";
import { CreateEventSchema, UpdateEventSchema } from "@repo/common/types";
import { getEvent } from "../../../controllers/events";

const router: Router = Router();

router.post("/", adminMiddleware, async (req, res) => {

    const {data, success} = CreateEventSchema.safeParse(req.body);
    const adminId = req.userId;

    if (!adminId) {
        res.status(401).json({ error: "Unauthorized: adminId missing" });
        return;
    }

    if(!success) {
        res.status(400).json({
            error: "Invalid request body"
        })
        return;
    }
    try {
        const event = await client.event.create({
            data: {
                name: data.name,
                description: data.description,
                startTime: new Date(data.startTime),
                locationId: data.locationId,
                imageUrl: data.imageUrl,
                adminId,
                banner: data.banner
            }
        });
        res.json({
            id : event.id
        })
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
});


router.put("/:eventId", adminMiddleware, async (req, res) => {
    const {data, success} = UpdateEventSchema.safeParse(req.body);
    const adminId = req.userId;
    const eventId = req.params.eventId ?? "";

    if(!adminId) {
        res.status(401).json({ 
            error: "Unauthorized: adminId missing" 
        });
        return;
    }

    if(!success) {
        res.status(400).json({
            error: "Invalid request body"
        });
        return;
    }

    try {
        const event = await client.event.findUnique({
            where: {
                id: eventId
            }
        })
        
        if (!event || event.startTime > new Date() || event.adminId !== adminId) {
            res.status(404).json({
                error: "Cant update event"
            });
            return;
        }
        await client.event.update({
            where: {
                id: eventId,
                adminId: adminId
            },
            data: {
                name: data.name,
                description: data.description,
                startTime: new Date(data.startTime),
                locationId: data.location,
                banner: data.banner,
                adminId,
                published: data.published,
                ended: data.ended
            }   
        })
        res.json({
            id : event.id
        })
    } catch(e) {
        res.status(500).json({
            messsage : "Could not update event",
        })
    }

});

router.get("/events", adminMiddleware, async (req, res) => {
    const events = await client.event.findMany({
        where: {
            adminId: req.userId
        }
    });
    res.json({
        events
    });
});


router.get("/events/:eventId", adminMiddleware, async (req, res) => {
    const event = await getEvent(req.params.eventId ?? "");

    if (!event) {
        res.status(404).json({
            error: "Event not found"
        });
        return;
    }

    res.json({
        event
    });
})

    
export default router;