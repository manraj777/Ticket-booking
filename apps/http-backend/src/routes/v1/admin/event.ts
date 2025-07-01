import { Router } from "express";
import { client } from "@repo/db/client";
import { getToken } from "../../../utils/totp";
import { sendMessage } from "../../../utils/twilio";

const router: Router = Router();

router.post("/create", async (req, res) => {
    const number = req.body.number;
    const topt = getToken(number,"AUTH");

    const user = await client.user.upsert({
        where: {
            number
        },
        create: {
            number,
            name: ""
        },
        update: {

        }

    });

    if(process.env.NODE_ENV === "production") {
        try {
            await sendMessage(`Your authentication code is ${topt}`, number);
        } catch (error) {
            console.error("Failed to send message:", error);
            return res.status(500).json({ error: "Failed to send authentication code." });
        }
    }
    res.json({
        id : user.id
    })
});

export default router;