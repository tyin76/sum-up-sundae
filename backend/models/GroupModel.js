import mongoose from "mongoose"

const groupSchema = new mongoose.Schema(
  {
    users: [
      {
        userID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          unique: true,
        },
      },
    ],
  },
  {
    timestamps: true, //created at and updated at
  }
)

const Group = mongoose.model("Group", groupSchema)

export default Group
