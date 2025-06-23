import { Schema, model } from "mongoose";
//import User from './user.model.js';
const commentSchema = new Schema(
  {
    userId: {
      type:Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: { type: String, required: true },
    status: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const errorSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  comment: {
    comments: [commentSchema],
  },
  label: {
    type: String,
    required: true,
  },
  lang: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: () => Date.now(),
  },
});

export default model("ErrorLog", errorSchema);
