import * as Player from "@livepeer/react/player"
import { PauseIcon, PlayIcon } from "@livepeer/react/assets"

const playbackId = "42730aktt5ikyttr"

// fetch the playback info on the server, using React Server Components
// or regular API routes
// export const getPlaybackSource = async () => {
//   const playbackInfo = await livepeer.playback.get(playbackId)

//   const src = getSrc(playbackInfo.playbackInfo)

//   return src
// }

// pass the parsed playback info Src[] into the player
function Video({ src }) {
  return (
    <div>
      <Player.Root
        src={`https://vod-cdn.lp-playback.studio/raw/jxf4iblf6wlsyor6526t4tcmtmqa/catalyst-vod-com/hls/${src}/index.m3u8`}
        className="border-8 border-black"
      >
        <Player.Container className="w-[500px] h-[500px] border-4 border-red-500 contain">
          <Player.Video className="object-scale-down w-[500px] [h-500px] border-8 border-black" />
          <Player.Controls className="flex items-center justify-center">
            <Player.PlayPauseTrigger className="w-20 h-20">
              <Player.PlayingIndicator asChild matcher={false}>
                <PlayIcon />
              </Player.PlayingIndicator>
              <Player.PlayingIndicator asChild>
                <PauseIcon />
              </Player.PlayingIndicator>
            </Player.PlayPauseTrigger>
          </Player.Controls>
        </Player.Container>
      </Player.Root>
    </div>
  )
}

export default Video
