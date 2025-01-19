import { readFile } from "fs/promises"
import fetch from "node-fetch"
import { existsSync } from "fs"
import { log } from "console"

const filepath =
  "/Users/hieule/xuanhieu/nwhacks2025/sum-up-sundae/backend/assets/IMG_4544.MOV"

export const lp = async (id) => {
  try {
    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer b5755414-1b2a-43c8-bc26-5e1b19c5f154",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: id,
        creatorId: "admin",
        playbackPolicy: { type: "public", allowedOrigins: ["*"] },
        staticMp4: true,
      }),
    }
    const response = await fetch(
      "https://livepeer.studio/api/asset/request-upload",
      options
    )
    const data = await response.json()
    console.log(data)
    const url = data.url
    const playbackID = data.asset?.playbackId
    const ID = data.asset?.id

    if (!url) throw new Error("Upload URL not received")

    return { url, playbackID, ID }

    // console.log("File exists:", existsSync(filepath))
    // const file = await readFile(filepath)

    // const uploadResponse = await fetch(url, {
    //   method: "PUT",
    //   body: asset,
    //   headers: {
    //     "Content-Type": "video/mp4", // Specify file type
    //   },
    // })
    // const uploadUrl = uploadResponse.url
    // // const playbackID = data.asset?.playbackId
    // // const ID = data.asset?.id
    // return { ID, playbackID, uploadUrl }
  } catch (error) {
    console.error(error)
  }
}
