'use client'

import dynamic from 'next/dynamic'

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

interface VideoPlayerProps {
  url?: string
  videoFileUrl?: string
  platform?: string
  thumbnail?: string
}

export function VideoPlayer({ url, videoFileUrl, platform, thumbnail }: VideoPlayerProps) {
  // If we have a native video file, use HTML5 video element
  if (videoFileUrl) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border-2 border-black bg-black">
        <video
          className="h-full w-full"
          controls
          poster={thumbnail}
          preload="metadata"
        >
          <source src={videoFileUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }

  // Otherwise, use ReactPlayer for external URLs
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border-2 border-black bg-black">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        light={thumbnail}
        playing={false}
        config={{
          youtube: {
            playerVars: { showinfo: 1 }
          },
          vimeo: {
            playerOptions: { byline: false }
          }
        }}
      />
    </div>
  )
}
