import { readFile } from "fs/promises"
import fetch from "node-fetch"
import { existsSync } from "fs"

const filepath =
  "/Users/hieule/xuanhieu/nwhacks2025/sum-up-sundae/backend/assets/IMG_4544.MOV"

const options = {
  method: "POST",
  headers: {
    Authorization: "Bearer b5755414-1b2a-43c8-bc26-5e1b19c5f154",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "test",
    creatorId: "admin",
    playbackPolicy: { type: "public", allowedOrigins: ["*"] },
    staticMp4: true,
  }),
}
export const lp = async () => {
  try {
    const response = await fetch(
      "https://livepeer.studio/api/asset/request-upload",
      options
    )
    const data = await response.json()
    const url = data.url

    if (!url) throw new Error("Upload URL not received")

    console.log("File exists:", existsSync(filepath))
    const file = await readFile(filepath)

    const uploadResponse = await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": "video/mp4", // Specify file type
      },
    })

    console.log("Upload response:", uploadResponse)
  } catch (error) {
    console.error(error)
  }
}
