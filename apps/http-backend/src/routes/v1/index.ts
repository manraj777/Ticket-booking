import { Router } from "express";
import userRouter from "./user";
import adminRouter from "./admin";
import adminEventRouter from "./admin/event";

const router : Router = Router();

router.use("/user", userRouter);
router.use("/admin/event", adminEventRouter)
router.use("/admin", adminRouter);

export default router;