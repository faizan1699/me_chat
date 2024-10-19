import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    creater: {
      type: mongoose.Types.ObjectId,
    },
    member: [
      {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Room = mongoose.models.room || mongoose.model("room", RoomSchema);

export default Room;
