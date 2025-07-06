import { Router } from "express";
import { client } from "@repo/db/client";
import { getToken } from "../../../utils/totp";
import { sendMessage } from "../../../utils/twilio";
import { adminMiddleware } from "../../../middleware/admin";
import { CreateEventSchema } from "@repo/common/types";

const router: Router = Router();

router.post("/", adminMiddleware, async (req, res) => {

    const {data, success} = CreateEventSchema.safeParse(req.body);
    const adminId = req.userId;

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
            discription: data.description,
            startTime: new Date(data.startTime),
            locationId: data.location
        }
    });
    res.json({
        id : 
    })
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
});


    
export default router;