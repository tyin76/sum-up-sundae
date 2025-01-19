import express from "express"
import User from "../models/UserModel.js"

const router = express.Router()

router.post("/", async (req, res) => {
  const user = req.body // user will send this data

  if (!user.name) {
    return res.status(400).json({ success: false, message: "Name is required" })
  }

  const newUser = User(user)
  try {
    await newUser.save()
    res.status(201).json({ success: true, data: newUser })
  } catch (error) {
    console.error("Error in Create user:", error.message)
    res.status(500).json({ success: false, message: "Server Error" })
  }
})

export default router
