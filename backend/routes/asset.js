import express from "express"
import Group from "../models/GroupModel.js"
import Asset from "../models/AssetModel.js"
import User from "../models/UserModel.js"
import { lp } from "../livepeer/livepeer.js"

const router = express.Router()

// Get all assets of users within a specific group
router.get("/group/:groupId/", async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId)
    if (!group) {
      return res.status(404).json({ error: "Group not found" })
    }

    const userIds = group.users.map((user) => user.userID)
    const assets = await Asset.find({ userID: { $in: userIds } })

    res.status(200).json(assets)
  } catch (error) {
    console.error("Error fetching assets for group:", error.message)
    res.status(500).json(error)
  }
})

// Get asset of a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const assets = await Asset.findOne({ userID: req.params.userId })
    if (!assets) {
      return res.status(404).json({ error: "Asset not found for this user" })
    }

    res.status(200).json(assets)
  } catch (error) {
    console.error("Error fetching assets for user:", error.message)
    res.status(500).json(error)
  }
})

// Upload a video
router.post("/", async (req, res) => {
  try {
    const { userID } = req.body
    // if (!asset) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Required field(s) is missing" })
    // }

    // Check if the user exists
    const userExists = await User.findById(userID)
    if (!userExists) {
      return res.status(404).json({ error: "User not found" })
    }

    // Check if the user already has a video
    // const existingVideo = await Asset.findOne({ userID })
    // if (existingVideo) {
    //   return res
    //     .status(400)
    //     .json({ error: "User already has an associated video" })
    // }

    const { url, playbackID, ID } = await lp(userID)
    // Create a new video record
    const newVideo = await Asset.create({
      userID,
      ID,
      playbackID,
      uploadUrl: url,
    })

    res.status(201).json(newVideo)
  } catch (error) {
    console.error("Error uploading video:", error.message)
    res.status(500).json(error)
  }
})

export default router
