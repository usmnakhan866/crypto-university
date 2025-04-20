"use client"

import { useLanguage } from "@/context/language-context"
import Image from "next/image"

const DetailedResults = () => {
  const { t } = useLanguage()

  // Define static results array
  const results = [
    {
      coin: "fry/SOL",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250319-WA0030.jpg-mdWo62RmAA36AuQAyrkGOHheArmQAm.jpeg",
      prediction: t("detailedResults.results.0.prediction"),
      result: t("detailedResults.results.0.result"),
      description: t("detailedResults.results.0.description"),
    },
    {
      coin: "Qwen Ai",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250319-WA0031.jpg-uOUcsy2fYjj0LMRgH9wkFxHktinARQ.jpeg",
      prediction: t("detailedResults.results.1.prediction"),
      result: t("detailedResults.results.1.result"),
      description: t("detailedResults.results.1.description"),
    },
    {
      coin: "Crypto punks",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250319-WA0032.jpg-qi1rPHhqVXmhFAJ8TBZXKMrBnWGxYC.jpeg",
      prediction: t("detailedResults.results.2.prediction"),
      result: t("detailedResults.results.2.result"),
      description: t("detailedResults.results.2.description"),
    },
    {
      coin: "DOGECAUCUS",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250319-WA0033.jpg-mwE33qExabW0ETpZmhgyuWgRniaXa6.jpeg",
      prediction: t("detailedResults.results.3.prediction"),
      result: t("detailedResults.results.3.result"),
      description: t("detailedResults.results.3.description"),
    },
    {
      coin: "Woolly Mouse",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250319-WA0029.jpg-NLOloHNMkWhEKxJeTMS8R6WMjksrIX.jpeg",
      prediction: t("detailedResults.results.4.prediction"),
      result: t("detailedResults.results.4.result"),
      description: t("detailedResults.results.4.description"),
    },
    {
      coin: "If she's down",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250319-WA0027.jpg-cC4PWWKLblmBDBPwqeikri9ZHo4Jke.jpeg",
      prediction: t("detailedResults.results.5.prediction"),
      result: t("detailedResults.results.5.result"),
      description: t("detailedResults.results.5.description"),
    },
    {
      coin: "DJ Daniel",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250319-WA0028.jpg-OkQjOC4VYr2s9OgOpzseIjog8cgD1j.jpeg",
      prediction: t("detailedResults.results.6.prediction"),
      result: t("detailedResults.results.6.result"),
      description: t("detailedResults.results.6.description"),
    },
    {
      coin: "Titcoin",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250319-WA0026.jpg-zqziTgBaKnH8bQ3w48zoIYUMlRhOxv.jpeg",
      prediction: t("detailedResults.results.7.prediction"),
      result: t("detailedResults.results.7.result"),
      description: t("detailedResults.results.7.description"),
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            {t("detailedResults.title")} <span className="text-primary">{t("detailedResults.highlightedTitle")}</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">{t("detailedResults.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
          {results.map((result, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-3/5 p-6 flex items-center justify-center bg-gray-50">
                  <div className="w-full h-full flex items-center justify-center">
                    <Image
                      src={result.image || "/placeholder.svg"}
                      alt={`${result.coin} result`}
                      width={500}
                      height={500}
                      className="rounded-lg w-auto h-auto max-h-[400px] object-contain"
                      priority={index < 4} // Load first 4 images with priority
                    />
                  </div>
                </div>
                <div className="md:w-2/5 p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{result.coin}</h3>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">{t("detailedResults.predictionLabel")}</span> {result.prediction}
                  </p>
                  <p className="text-green-600 font-bold mb-2">
                    {t("detailedResults.resultLabel")} {result.result}
                  </p>
                  <p className="text-gray-600 text-sm">{result.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DetailedResults
