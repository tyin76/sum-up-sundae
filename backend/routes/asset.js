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

// Check if a user has uploaded a video this week
router.get("/has-uploaded/:userID", async (req, res) => {
  try {
    const { userID } = req.params

    // Validate userID
    if (!userID) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" })
    }

    // Calculate the start of the current week (Sunday at 00:00)
    const now = new Date()
    const startOfWeek = new Date(
      now.setDate(now.getDate() - now.getDay())
    ).setHours(0, 0, 0, 0)

    // Query assets for the user created this week
    const recentAsset = await Asset.findOne({
      userID,
      createdAt: { $gte: startOfWeek },
    })

    if (recentAsset) {
      return res.status(200).json({
        success: true,
        hasUploaded: true,
        message: "User has uploaded a video this week",
      })
    }

    res.status(200).json({
      success: true,
      hasUploaded: false,
      message: "User has not uploaded a video this week",
    })
  } catch (error) {
    console.error("Error checking upload status:", error.message)
    res.status(500).json({ success: false, message: "Server error", error })
  }
})

// Upload a video
router.post("/", async (req, res) => {
  try {
    const { userID } = req.body
    // Check if the user exists
    const userExists = await User.findById(userID)
    if (!userExists) {
      return res.status(404).json({ error: "User not found" })
    }

    const { url, playbackID, ID } = await lp(userID)

    // Check if the user already has a video
    const existingAsset = await Asset.findOne({ userID })

    if (existingAsset) {
      // Update the existing asset with new details
      existingAsset.ID = ID
      existingAsset.playbackID = playbackID
      existingAsset.uploadUrl = url

      await existingAsset.save()
      await User.findByIdAndUpdate(userID, {
        playbackID: playbackID,
      })

      return res.status(200).json(existingAsset)
    }

    // Create a new video record
    const newVideo = await Asset.create({
      userID,
      ID,
      playbackID,
      uploadUrl: url,
    })

    await User.findByIdAndUpdate(userID, {
      playbackID: playbackID,
    })

    res.status(201).json(newVideo)
  } catch (error) {
    console.error("Error uploading video:", error.message)
    res.status(500).json(error)
  }
})

export default router
