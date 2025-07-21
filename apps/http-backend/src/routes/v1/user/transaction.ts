import { Router } from "express";
import { client } from "@repo/db/client";
import { userMiddleware } from "../../../middleware/user";

const router : Router = Router();

router.post("/", userMiddleware, async(req, res) => {
   const transaction = await client.payment.findMany({
      where : {
         userId: req.userId
      },
   });
   res.json({ 
     transaction
   });
})

export default router;