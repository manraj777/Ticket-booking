import { Router } from "express";
import userRouter from "./user";
import adminRouter from "./admin";
import adminEventRouter from "./admin/event";
import adminLocationRouter from "./admin/location";
import bookingRouter from "./user/bookings";
import transactionRouter from "./user/transaction";
import testRouter from "./test";

const router : Router = Router();

router.use("/user/bookings", bookingRouter);
router.use("/user/transaction", transactionRouter);

router.use("/user", userRouter);
router.use("/admin/event", adminEventRouter);
router.use("/admin/location", adminLocationRouter);
router.use("/admin", adminRouter);

if(process.env.NODE_ENV !== "production") {
// used only for testing purposes
    router.use("/test", testRouter);
}

export default router;
