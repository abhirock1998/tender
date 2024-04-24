import mongoose from "mongoose";

const tenderSchema = new mongoose.Schema(
  {
    tenderName: {
      type: String,
      required: true,
    },
    tenderDescription: {
      type: String,
      required: true,
    },
    tenderStartTime: {
      type: Date,
      required: true,
    },
    tenderEndTime: {
      type: Date,
      required: true,
    },
    bufferTime: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Tender = mongoose.model("Tender", tenderSchema);

export default Tender;
