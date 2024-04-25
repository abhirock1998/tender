import { createBid, getBidForCompany } from "@controllers/bid/bid.controller";
import { validatePayload } from "@middlewares/validate.middleware";
import { createBidSchema } from "@schemas/bid.schema";
import { Router } from "express";

const router = Router();

router
  .post("/", validatePayload(createBidSchema), createBid)
  .get("/:tenderId", getBidForCompany);

export default router;
