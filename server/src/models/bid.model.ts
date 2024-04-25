import mongoose from "mongoose";

const bidSchema = new mongoose.Schema(
  {
    tenderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tender",
      required: true,
    },
    bidCompany: {
      type: String,
      required: true,
    },
    bidPrice: {
      type: Number,
      required: true,
    },
    isLastMinuteBid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Bid = mongoose.model("Bid", bidSchema);

export default Bid;
