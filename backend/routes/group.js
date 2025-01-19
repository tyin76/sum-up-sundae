import express from "express"
import Group from "../models/GroupModel.js"
import User from "../models/UserModel.js"

const router = express.Router()

// Get group by ID
router.get("/:id", async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
    if (!group) {
      return res.status(404).json({ error: "Group not found" })
    }
    res.status(200).json(group)
  } catch (error) {
    console.error("Error fetching group:", error.message)
    res.status(500).json(error)
  }
})

// Get all users in a specific group
router.get("/user/:groupID", async (req, res) => {
  try {
    const { groupID } = req.params

    // Find the group by ID
    const group = await Group.findById(groupID)
    if (!group) {
      return res
        .status(404)
        .json({ success: false, message: "Group not found" })
    }

    // Extract user IDs from the group
    const userIDs = group.users.map((user) => user.userID)

    // Fetch user details for all user IDs
    const users = await User.find({ _id: { $in: userIDs } }).select(
      "name email avatar"
    ) // Only include these fields in the response
    res.status(200).json({ users })
  } catch (error) {
    console.error("Error fetching users for group:", error.message)
    res.status(500).json({ success: false, message: "Server error" })
  }
})

// Create new group
router.post("/", async (req, res) => {
  try {
    const { userID } = req.body // user will send this data
    if (!userID) {
      return res.status(400).json({ error: "Missing user ID" })
    }

    const newGroup = await Group.create({
      users: [
        {
          userID: userID,
        },
      ],
    })

    const { _id } = newGroup
    await User.findByIdAndUpdate(userID, {
      groups: _id,
    })
    res.status(200).json(newGroup)
  } catch (error) {
    console.error("Error in Create user:", error.message)
    res.status(500).json(error)
  }
})

// Add user to group
router.post("/add/:groupId/user", async (req, res) => {
  try {
    const { userID } = req.body
    const group = await Group.findById(req.params.groupId)
    console.log(userID)
    console.log(req.params.groupId)
    if (!group) {
      return res.status(404).json({ error: "Group not found" })
    }

    group.users.push({ userID })
    await group.save()
    await User.findByIdAndUpdate(userID, {
      groups: req.params.groupId,
    })

    res.status(200).json(group)
  } catch (error) {
    console.error("Error adding user to group:", error.message)
    res.status(500).json(error)
  }
})

// Remove user from group
router.delete("/:groupId/user/:userId", async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId)
    if (!group) {
      return res.status(404).json({ error: "Group not found" })
    }

    // Remove the user from the group
    group.users = group.users.filter(
      (user) => user.userID.toString() !== req.params.userId
    )
    await group.save()

    // Check if the user's `groups` field matches the group being removed
    const user = await User.findById(req.params.userId)
    if (user && user.groups == req.params.groupId) {
      user.groups = null // Clear the group association
      await user.save()
    }

    res.status(200).json(group)
  } catch (error) {
    console.error("Error removing user from group:", error.message)
    res.status(500).json(error)
  }
})

export default router
