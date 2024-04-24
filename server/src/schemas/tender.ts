import zod from "zod";

const createTenderSchema = zod.object({
  tenderName: zod.string().min(3).max(255),
  tenderDescription: zod.string().min(3).max(255),
  price: zod.number().positive(),
  tenderStartTime: zod.date(),
  tenderEndTime: zod.date(),
  bufferTime: zod.number().positive(),
});

export { createTenderSchema };
