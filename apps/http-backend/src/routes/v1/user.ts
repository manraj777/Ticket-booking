import { Router } from "express";
import { verifyToken, generateToken } from "authenticator";
import { client } from "@repo/db/client";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../../config";
import { sendMessage } from "../../utils/twilio";
 const router : Router = Router();

 router.post("/signup", async(req, res) => {
    const number = req.body.phoneNumber;
    const totp = generateToken(number + "SIGNUP");
    // send totp to phone number
    const user = await client.user.upsert({
        where:{
            number
        },
        create: {
            number,
            name: ""
        },
        update: {
            
        }
    });

    if(process.env.NODE_ENV === "production"){
        // send otp to user's phone number
        try {
            await sendMessage(number, `Your OTP for signing up is ${totp}`);
        }
        catch (e){
            res.status(500).json({
                message: "Failed to send OTP. Please try again later."
            });
            return;
        }
    
    }
   


    res.json({
        id : user.id
    })
 });

 router.post("/signup/verify", async(req, res) => {
    const number = req.body.phoneNumber;
    const name = req.body.name;
    const totp = generateToken(number + "SIGNUP");
    if(!verifyToken(number + "SIGNUP", req.body.otp)){
        res.json({
            message : "Invalid OTP"
        })
        return;
    }

    const userId = await client.user.update({
        where: {
            number
        },
        data: {
            name,
            verified: true
        }
    })
    const token = jwt.sign({
        userId
    }, JWT_PASSWORD)
    // set user to verified in database

    res.json({
        token
    });
 });

 export default router;