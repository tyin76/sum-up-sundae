import express from "express"
import User from "../models/UserModel.js"

const router = express.Router()

// Create new user, and check if user is already existed
router.post("/", async (req, res) => {
  try {
    const { name, email, avatar } = req.body // user will send this data

    if (!name || !email) {
      return res
        .status(400)
        .json({ success: false, message: "Required field(s) is missing" })
    }

    const existUser = await User.findOne({ email })

    if (existUser) {
      return res.status(200).json(existUser)
    }

    const newUser = await User.create({
      name,
      email,
      avatar,
    })

    res.status(200).json(newUser)
  } catch (error) {
    console.error("Error in Create user:", error.message)
    res.status(500).json(error)
  }
})

export default router
