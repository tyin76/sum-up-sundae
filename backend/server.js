import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./mongodb/mongo.js"

dotenv.config()

const app = express()

// Cors
app.use(cors())

// Middlewares
app.use(express.json())
app.use(express.urlencoded())

// Routes
app.get("/", (req, res) => res.status(200).json("Backend is running!"))

app.listen(5432, () => {
  connectDB();
  console.log("Server started at port 5000")
})
