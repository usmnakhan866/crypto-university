"use client"

import { useState, useRef } from "react"
import { Play } from "lucide-react"
import { useLanguage } from "@/context/language-context"

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLIFrameElement>(null)
  const { t } = useLanguage()

  // Updated Vimeo URL with parameters to hide branding and controls
  const videoSrc = "https://player.vimeo.com/video/1079403268?autoplay=1&title=0&byline=0&portrait=0" 
  const thumbnailUrl = "https://i.imgur.com/y3UEMbq.jpg" // your thumbnail

  const handlePlay = () => {
    setIsPlaying(true)
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
                className="w-full h-full object-cover"
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
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
                title="MEME COIN AGENT INTRO VIDEO"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default VideoSection
