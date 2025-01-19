import { useParams } from "react-router-dom"
import Video from "../components/Video.js"

function UserSumUp() {
  const { playbackId } = useParams()

  return <Video src={playbackId} />
}

export default UserSumUp
