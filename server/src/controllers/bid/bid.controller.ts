import { asyncHandler } from "@middlewares/async.middleware";
import { Request, Response } from "express";
import bidModel from "@models/bid.model";
import tenderModel from "@models/tender.model";
import { _response } from "@utils/response.util";

export const createBid = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body;
  const { tenderId } = payload;
  const tender = await tenderModel.findById(tenderId);

  if (!tender) return _response(res, "Tender not found", false, 404, null);

  const currentDate = new Date();
  const tenderEndDate = new Date(tender.tenderEndTime);

  if (currentDate > tenderEndDate) {
    return _response(res, "Tender has expired", false, 400, null);
  }

  let isLastMinuteBid = false;
  // If a bid is placed in the last 5 minutes of the tender end time, raise a flag and
  // extend the end time for that tender by the given buffer time set by the admin.
  const bidEndTime = new Date(tenderEndDate);
  bidEndTime.setMinutes(tenderEndDate.getMinutes() - 5);
  if (currentDate > bidEndTime) {
    // Check if there is a buffer time set by the admin
    if (tender.bufferTime) {
      const bufferTime = Number(tender.bufferTime || 0);
      if (!isNaN(bufferTime) && bufferTime > 0) {
        // Extend the tender end time by the buffer time
        tenderEndDate.setMinutes(tenderEndDate.getMinutes() + bufferTime);

        // Update tender end time in the database
        tender.tenderEndTime = tenderEndDate;
        isLastMinuteBid = true;
        await tender.save();
      }
    }
  }

  const bid = await bidModel.create({ ...payload, isLastMinuteBid });

  return _response(res, "Bid successfully submitted!", true, 201, bid);
});

export const getBidForCompany = asyncHandler(
  async (req: Request, res: Response) => {
    const { filter, page, limit } = req.query;
    const search = filter ? filter.toString() : "";
    const page_size = Number(limit) || 10;
    const current_page = Number(page) || 1;
    const skip = (current_page - 1) * page_size;

    const query: any = {
      tenderId: req.params["tenderId"],
    };

    // Add the optional condition for companyName
    if (search) {
      query.companyName = { $regex: new RegExp(search, "i") };
    }

    const total_records = await bidModel.countDocuments(query);

    const bids = await bidModel
      .find(query)
      .sort({ bidPrice: -1 })
      .skip(skip)
      .limit(page_size)

      // .populate("tenderId")
      .lean();
    return _response(res, "Bids fetched successfully", true, 200, {
      bids,
      total_records,
    });
  }
);
