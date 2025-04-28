"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Volume2, VolumeX } from "lucide-react"
import { useLanguage } from "@/context/language-context"

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const videoRef = useRef<HTMLIFrameElement>(null)
  const { t } = useLanguage()

  const videoSrc = "https://drive.google.com/file/d/1FDKsI94ok6MCD3IgVlbef9jOLReteZZT/preview"
  const thumbnailUrl = "https://i.imgur.com/y3UEMbq.jpg"

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handleIframeLoad = () => {
    if (videoRef.current) {
      const playMessage = '{"event":"command","func":"playVideo","args":""}'
      videoRef.current.contentWindow?.postMessage(playMessage, "*")
      setIframeLoaded(true)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      const message = isMuted
        ? '{"event":"command","func":"unMute","args":""}'
        : '{"event":"command","func":"mute","args":""}'
      videoRef.current.contentWindow?.postMessage(message, "*")
      setIsMuted(!isMuted)
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto max-w-6xl text-center">
        {/* Heading */}
        <h1 className="text-[2.5rem] md:text-[3.5rem] font-bold text-[#1a2b3b] mb-4">
          {t("videoSection.title")}
        </h1>
        <p className="text-xl text-gray-600 mb-4">{t("videoSection.subtitle1")}</p>
        <p className="text-xl text-gray-800 font-semibold mb-4">{t("videoSection.subtitle2")}</p>

        {/* Down Arrows */}
        <div className="flex justify-center mb-8 text-2xl">↘️⬇️↙️</div>

        {/* Video Player */}
        <div className="relative aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden border-8 border-white shadow-2xl">
          {!isPlaying ? (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black cursor-pointer"
              onClick={handlePlay}
            >
              <img
                src={thumbnailUrl}
                alt="Video Thumbnail"
                className="max-w-full max-h-full object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-xl"
                  aria-label={t("videoSection.playButton")}
                >
                  <Play size={36} className="text-[#1a2b3b]" />
                </button>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-0 pb-[56.25%]">
              <iframe
                ref={videoRef}
                src={videoSrc}
                title="Crypto Currency Commercial"
                allow="autoplay"
                allowFullScreen
                onLoad={handleIframeLoad}
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>

              {/* Mute/Unmute Button */}
              <button
                onClick={toggleMute}
                className="absolute bottom-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                aria-label={isMuted ? t("videoSection.unmuteButton") : t("videoSection.muteButton")}
              >
                {isMuted ? (
                  <VolumeX size={20} className="text-white" />
                ) : (
                  <Volume2 size={20} className="text-white" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default VideoSection
