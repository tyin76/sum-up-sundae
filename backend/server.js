import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./mongodb/mongo.js"
import userRouter from "./routes/user.js"
dotenv.config()

const app = express()

// Cors
app.use(cors())

// Middlewares
app.use(express.json()) // allows us to accept json data in the body
app.use(express.urlencoded())

// Routes
app.use("/api/user", userRouter)

// Postman

app.listen(5000, () => {
  connectDB();
  console.log("Server started at port 5000")
})
