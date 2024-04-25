import { asyncHandler } from "@middlewares/async.middleware";
import { Request, Response } from "express";
import tenderModel from "@models/tender.model";
import { _response } from "@utils/response.util";
import mongoose from "mongoose";

export const createTender = asyncHandler(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const tender = await tenderModel.create(payload);
    return _response(res, "Tender created successfully", true, 201, tender);
  }
);

export const getTenderById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const tender = await tenderModel.findById(id);
    return _response(res, "Tender fetched successfully", true, 200, tender);
  }
);

export const getTenders = asyncHandler(async (req: Request, res: Response) => {
  const { filter, page, limit } = req.query;
  const search = filter ? filter.toString() : "";
  const page_size = Number(limit) || 10;
  const current_page = Number(page) || 1;
  const skip = (current_page - 1) * page_size;

  const query = {
    $and: [
      {
        $or: [
          { tenderDescription: { $regex: new RegExp(search, "i") } },
          { tenderName: { $regex: new RegExp(search, "i") } },
        ],
      },
    ],
  };

  const total_records = await tenderModel.countDocuments(query);

  const tenders = await tenderModel
    .find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(page_size)
    .lean();
  return _response(res, "Tenders fetched successfully", true, 200, {
    tenders,
    total_records,
  });
});
