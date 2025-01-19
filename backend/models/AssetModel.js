import mongoose from "mongoose"

const assetSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ID: {
      type: String,
    },
    playbackID: {
      type: String,
    },
    uploadUrl: {
      type: String,
    },
  },
  {
    timestamps: true, //created at and updated at
  }
)

const Asset = mongoose.model("Asset", assetSchema)

export default Asset
