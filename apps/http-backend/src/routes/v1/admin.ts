import { Router } from "express";
import { client } from "@repo/db/client";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../../config";
import { sendMessage } from "../../utils/twilio";
import { getToken, verifyToken } from "../../utils/totp";
const router : Router = Router();

router.post("/signin", async(req, res) => {
    const number = req.body.number;
    const totp = getToken(number, "AUTH");
    try {
            const user = await client.user.findFirstOrThrow({
            where: {
                number
            }
        });

        // send totp to phone number
        if(process.env.NODE_ENV === "production"){
            // send otp to user's phone number
            try {
                await sendMessage(`Your OTP for signing up is ${totp}`, number);
            }
            catch (e){
                res.status(500).json({
                    message: "Failed to send OTP. Please try again later."
                });
                return;
            }
        
        }
        res.json({
            message: "OTP sent to your phone number"
        })
    }
    
   catch(e){
        res.status(411).json({
            message: "User not invalid."
        });
   }


    
 });

  router.post("/signin/verify", async(req, res) => {
    const number = req.body.number;
    const otp = req.body.totp;
    if(process.env.NODE_ENV === "production" && !verifyToken(number,  "AUTH", otp)){
        res.json({
            message : "Invalid OTP"
        })
        return;
    }

    const user = await client.user.findFirstOrThrow({
        where: {
            number
        }
    })
    const token = jwt.sign({
        userId: user.id
    }, JWT_PASSWORD)
    // set user to verified in database

    res.json({
        token
    });
 });

 export default router;