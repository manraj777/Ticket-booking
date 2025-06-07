import { Router } from "express";
import { verifyToken, generateToken } from "authenticator";

 const router : Router = Router();

 router.post("/signup", (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const totp = generateToken(phoneNumber + "SIGNUP");
    // send totp to phone number


    res.json({
        id : "1"
    })
 });

 router.post("/signup/verify", (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const totp = generateToken(phoneNumber + "SIGNUP");
    if(!verifyToken(phoneNumber + "SIGNUP", req.body.otp)){
        res.json({
            message : "Invalid OTP"
        })
        return;
    }
    // set user to verified in database
    res.json({
        
    });
 });

 export default router;