import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const chat = mongoose.model("Chat", chatSchema);