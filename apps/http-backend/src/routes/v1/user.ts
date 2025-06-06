import { Router } from "express";
import { generateKey, generateToken } from "authenticator";

 const router : Router = Router();

 router.post("/signup", (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const totp = generateToken(phoneNumber + "SIGNU");
    res.json({
        totp
    })
 });

 router.post("/signup/verify", (req, res) => {

 });

 export default router;