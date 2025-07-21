import { Router } from "express";
import { client } from "@repo/db/client";
import { userMiddleware } from "../../../middleware/user";

const router : Router = Router();

router.post("/", userMiddleware, async(req, res) => {
   const booking = await client.booking.findMany({
      where : {
         userId: req.userId
      },
   });
   res.json({ 
     booking
   });
})

export default router;