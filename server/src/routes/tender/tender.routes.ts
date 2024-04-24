import { Router } from "express";
import { validatePayload } from "@middlewares/validate.middleware";
import {
  createTender,
  getTenders,
} from "@controllers/tender/tender.controller";
import { createTenderSchema } from "@schemas/tender";

const router = Router();

router
  .post("/", validatePayload(createTenderSchema), createTender)
  .get("/", getTenders);

export default router;
