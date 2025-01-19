import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { lp } from "./livepeer/livepeer.js"

dotenv.config()

const app = express()

// Cors
app.use(cors())

// Middlewares
app.use(express.json())
app.use(express.urlencoded())

// Routes
app.get("/", (req, res) => res.status(200).json("Backend is running!"))

const server = () => {
  lp()
  app.listen(5000, () => {
    console.log("Server started at port 5000")
  })
}

server()
