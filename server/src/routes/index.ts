import { Router } from "express";
import tenderRoutes from "@routes/tender/tender.routes";
import bidRoutes from "@routes/bid/bid.routes";
import userRoutes from "@routes/user/user.routes";

const router = Router();

router.use("/tender", tenderRoutes);
router.use("/bid", bidRoutes);
router.use("/user", userRoutes);

export default router;
