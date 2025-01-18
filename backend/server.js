import express from "express"
import cors from "cors"

const app = express()

// Cors
app.use(cors())

// Middlewares
app.use(express.json())
app.use(express.urlencoded())

// Routes
app.get("/", (req, res) => res.status(200).json("Backend is running!"))

app.listen(5000, () => {
  console.log("Server started at port 5000")
})
