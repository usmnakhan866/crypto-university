"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useLanguage } from "@/context/language-context"

const FAQSection = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(0)
  const { t } = useLanguage()

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index)
  }

  // Get FAQs from translations
  const faqs = t("faq.questions", { returnObjects: true })

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            {t("faq.title")} <span className="text-primary">{t("faq.highlightedTitle")}</span>
          </h2>
          <p className="text-xl text-gray-700">{t("faq.subtitle")}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq: { question: string; answer: string }, index: number) => (
            <div
              key={index}
              className="mb-4 border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <button
                className="flex justify-between items-center w-full bg-white px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                onClick={() => toggleQuestion(index)}
                aria-expanded={openQuestion === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="font-medium text-gray-900">{faq.question}</h3>
                {openQuestion === index ? (
                  <ChevronUp className="text-primary flex-shrink-0" size={20} />
                ) : (
                  <ChevronDown className="text-primary flex-shrink-0" size={20} />
                )}
              </button>

              <div
                id={`faq-answer-${index}`}
                className={`transition-all duration-300 ${openQuestion === index ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}
              >
                <div className="px-6 py-4 bg-gray-50">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
