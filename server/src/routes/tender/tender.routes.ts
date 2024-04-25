import { Router } from "express";
import { validatePayload } from "@middlewares/validate.middleware";
import {
  createTender,
  getTenderById,
  getTenders,
} from "@controllers/tender/tender.controller";
import { createTenderSchema } from "@schemas/tender.schema";

const router = Router();

router
  .post("/", validatePayload(createTenderSchema), createTender)
  .get("/", getTenders)
  .get("/:id", getTenderById);
export default router;
