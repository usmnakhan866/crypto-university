"use client"

import { useState, useRef } from "react"
import { Play, Volume2, VolumeX } from "lucide-react"
import { useLanguage } from "@/context/language-context"

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLIFrameElement>(null)
  const { t } = useLanguage()

  const toggleMute = () => {
    if (videoRef.current) {
      const iframe = videoRef.current
      const message = isMuted
        ? '{"event":"command","func":"unMute","args":""}'
        : '{"event":"command","func":"mute","args":""}'

      iframe.contentWindow?.postMessage(message, "*")
      setIsMuted(!isMuted)
    }
  }

  const playVideo = () => {
    setIsPlaying(true)
  }

  // Video URL
  const videoUrl = "https://drive.google.com/file/d/1FDKsI94ok6MCD3IgVlbef9jOLReteZZT/preview"

  // Using your Imgur link (added .jpg extension for better compatibility)
  const thumbnailUrl = "https://i.imgur.com/y3UEMbq.jpg"

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto max-w-6xl text-center">
        <h1 className="text-[2.5rem] md:text-[3.5rem] font-bold text-[#1a2b3b] mb-4">{t("videoSection.title")}</h1>
        <p className="text-xl text-gray-600 mb-4">{t("videoSection.subtitle1")}</p>
        <p className="text-xl text-gray-800 font-semibold mb-4">{t("videoSection.subtitle2")}</p>
        <div className="flex justify-center mb-8">
          <div className="text-2xl">↘️⬇️↙️</div>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden border-8 border-white shadow-2xl">
          {!isPlaying ? (
            <div
              className="absolute inset-0 bg-cover bg-center cursor-pointer"
              style={{
                backgroundImage: `url('${thumbnailUrl}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              onClick={playVideo}
            >
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-xl"
                  aria-label={t("videoSection.playButton")}
                >
                  <Play size={36} className="text-[#1a2b3b] ml-2" />
                </button>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-0 pb-[56.25%]">
              <iframe
                ref={videoRef}
                className="absolute top-0 left-0 w-full h-full"
                src={videoUrl}
                title="Crypto Currency Commercial"
                allow="autoplay"
                allowFullScreen
              ></iframe>

              <button
                onClick={toggleMute}
                className="absolute bottom-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                aria-label={isMuted ? t("videoSection.unmuteButton") : t("videoSection.muteButton")}
              >
                {isMuted ? <VolumeX size={20} className="text-white" /> : <Volume2 size={20} className="text-white" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default VideoSection
