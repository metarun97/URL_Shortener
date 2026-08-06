// Impoted items:-
import mongoose from "mongoose";

// urlSchema created:-
const urlSchema = new mongoose.Schema({
  full_url: {
    type: String,
    required: true,
  },

  short_url: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
},
  { timestamps: true }
);

// urlModel created:-
const urlModel = mongoose.model("shortUrl", urlSchema);

export default urlModel;

