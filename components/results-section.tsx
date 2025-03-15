"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const ResultsSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)

  const results = [
    {
      coin: "PEPE",
      profit: "+1,240%",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      coin: "FLOKI",
      profit: "+860%",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      coin: "SHIB",
      profit: "+2,100%",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      coin: "DOGE",
      profit: "+950%",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      coin: "BONK",
      profit: "+1,750%",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      coin: "WIF",
      profit: "+1,320%",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      coin: "MEME",
      profit: "+890%",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      coin: "TURBO",
      profit: "+1,480%",
      image: "/placeholder.svg?height=100&width=100",
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
            Our <span className="text-primary">Results</span> Speak for Themselves
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Here are some of our recent successful signals that our members profited from
          </p>
        </div>

        <div className="relative mb-10">
          {/* Left scroll button */}
          {showLeftButton && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} className="text-gray-600" />
            </button>
          )}

          {/* Right scroll button */}
          {showRightButton && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} className="text-gray-600" />
            </button>
          )}

          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x snap-mandatory"
            onScroll={handleScroll}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {results.map((result, index) => (
              <div
                key={index}
                className="min-w-[220px] max-w-[220px] bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-primary/50 transition-colors shadow-md hover:shadow-lg snap-start"
              >
                <div className="flex justify-center mb-4">
                  <Image
                    src={result.image || "/placeholder.svg"}
                    alt={result.coin}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                </div>
                <h4 className="font-bold text-gray-900 text-xl mb-2">{result.coin}</h4>
                <p className="text-green-600 font-bold text-2xl">{result.profit}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/checkout" className="btn-primary inline-block text-xl">
            👉 START NOW
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ResultsSection

