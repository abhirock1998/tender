import zod from "zod";

const createBidSchema = zod.object({
  bidPrice: zod.number().min(1, { message: "Bid Amount must be at least 1" }),
  tenderId: zod.string().refine((value) => value && value !== null, {
    message: "Tender Id is required",
  }),
  bidCompany: zod.string().refine((value) => value && value !== null, {
    message: "Company Name is required",
  }),
});

export { createBidSchema };
