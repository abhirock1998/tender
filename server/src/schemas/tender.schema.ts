import zod from "zod";

const createTenderSchema = zod.object({
  tenderName: zod
    .string()
    .min(3, { message: "Tender Name must be at least 3 characters long" })
    .max(255, { message: "Tender Name must be at most 255 characters long" }),
  tenderDescription: zod
    .string()
    .min(3, {
      message: "Tender Description must be at least 3 characters long",
    })
    .max(255, {
      message: "Tender Description must be at most 255 characters long",
    }),
  tenderStartTime: zod.string().refine((value) => value && value !== null, {
    message: "Tender Start Time is required",
  }),
  tenderEndTime: zod.string().refine((value) => value && value !== null, {
    message: "Tender End Time is required",
  }),
  bufferTime: zod.number().optional(),
});
export { createTenderSchema };
