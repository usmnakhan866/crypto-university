"use client"
import { useLanguage } from "@/context/language-context"

import Image from "next/image"
import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const ResultsSection = () => {
  const { t } = useLanguage()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)

  // Define a static array of results instead of using translations
  const results = [
    {
      coin: "CryptoPunks",
      profit: "+690.76%",
      image: "crypto%20punk.jpg-ZUJIaLyRVLkBpkMfbDmFeyL1nlYPvs.jpeg",
    },
    {
      coin: "OFFICIAL DOGE CAUCUS",
      profit: "+323.96%",
      image: "doge.jpg-zB7g6ZZ1ostK4Q4odYQUBk8B2Jhu1Q.jpeg",
    },
    {
      coin: "fry/SOL",
      profit: "+136.11%",
      image: "fry%20sol.jpg-oPPb6El0mx8vh2MJaxsVkMHZAF6nHN.jpeg",
    },
    {
      coin: "Qwen/SOL",
      profit: "+421.10%",
      image: "Qwen.jpg-kXVEQ9eUgnKUKMRAgXSzySsrGE9nVL.jpeg",
    },
    {
      coin: "Woolly Mouse",
      profit: "+70.46%",
      image: "wolly%20mouse.jpg-tv6wocJuFtxgvtcKJgXaxtDgL6TL4T.jpeg",
    },
    {
      coin: "titcoin/SOL",
      profit: "+187.73%",
      image: "ttcoin.jpg-ZJcO3vQQgKonEuwbJq4SRA80ujzYHH.jpeg",
    },
    {
      coin: "DJ Daniel",
      profit: "+83.96%",
      image: "Dj_daniel.jpg-ETwxAQFDJef0ITNloC3kS4zzJVgmEu.jpeg",
    },
    {
      coin: "DOWN/SOL",
      profit: "+100.64%",
      image: "Down%20sol.jpg-yLRmYsxHJZcRCxWMd9ltYRKMo2sy1l.jpeg",
    },
  ]

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const scrollAmount = container.clientWidth * 0.8
      const newScrollPosition =
        direction === "left" ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount

      container.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      })

      // Update button visibility after scroll
      setTimeout(() => {
        if (container) {
          setShowLeftButton(container.scrollLeft > 0)
          setShowRightButton(container.scrollLeft < container.scrollWidth - container.clientWidth - 10)
        }
      }, 300)
    }
  }

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      setShowLeftButton(container.scrollLeft > 0)
      setShowRightButton(container.scrollLeft < container.scrollWidth - container.clientWidth - 10)
    }
  }

  return (
    <section className="section bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            {t("results.title")} <span className="text-primary">{t("results.highlightedTitle")}</span>{" "}
            {t("results.subtitle")}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">{t("results.description")}</p>
        </div>

        <div className="relative mb-10">
          {showLeftButton && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              aria-label={t("results.scrollLeft")}
            >
              <ChevronLeft size={24} className="text-gray-600" />
            </button>
          )}

          {showRightButton && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              aria-label={t("results.scrollRight")}
            >
              <ChevronRight size={24} className="text-gray-600" />
            </button>
          )}

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x snap-mandatory"
            onScroll={handleScroll}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {results.map((result: any, index: number) => (
              <div
                key={index}
                className="min-w-[220px] max-w-[220px] bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-primary/50 transition-colors shadow-md hover:shadow-lg snap-start"
              >
                <div className="flex justify-center mb-4">
                  <Image
                    src={`https://hebbkx1anhila5yf.public.blob.vercel-storage.com/${result.image}`}
                    alt={result.coin}
                    width={80}
                    height={80}
                    className="rounded-full h-20 w-20 object-cover"
                  />
                </div>
                <h4 className="font-bold text-gray-900 text-xl mb-2">{result.coin}</h4>
                <p className="text-green-600 font-bold text-2xl">{result.profit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResultsSection
