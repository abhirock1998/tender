import { asyncHandler } from "@middlewares/async.middleware";
import { Request, Response } from "express";
import tenderModel from "@models/tender.model";
import { _response } from "@utils/response.util";

export const createTender = asyncHandler(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const tender = await tenderModel.create(payload);
    return _response(res, "Tender created successfully", true, 201, tender);
  }
);

export const getTenders = asyncHandler(async (req: Request, res: Response) => {
  const tenders = await tenderModel.find().sort({ createdAt: -1 }).lean();
  return _response(res, "Tenders fetched successfully", true, 200, tenders);
});
