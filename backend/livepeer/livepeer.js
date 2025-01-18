import { Livepeer } from "livepeer"

const livepeer = new Livepeer({
  apiKey: process.env.LIVEPEER_API_KEY,
})

export const lp = async () => {
  try {
    const { stream } = await livepeer.stream.create({
      name: "Hello from JS SDK!",
    })
    console.log(stream)
  } catch (error) {
    console.error(`Error: ${error}`)
  }
}
