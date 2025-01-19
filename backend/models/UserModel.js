import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    groups: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
    playbackID: {
      type: String,
      ref: "Asset",
    },
  },
  {
    timestamps: true, //created at and updated at
  }
)

const User = mongoose.model("User", userSchema)

export default User
