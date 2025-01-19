import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./mongodb/mongo.js"
import User from "./models/UserModel.js"

dotenv.config()

const app = express()

// Cors
app.use(cors())

// Middlewares
app.use(express.json()) // allows us to accept json data in the body
app.use(express.urlencoded())

// Routes
app.post("/api/users", async (req, res) => {
  const user = req.body; // user will send this data

  if (!user.name) {
    return res.status(400).json({ success:false, message: "Name is required" });
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

// Postman

app.listen(5432, () => {
  connectDB();
  console.log("Server started at port 5000")
})
