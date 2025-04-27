"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, ChevronDown, ChevronUp, ArrowRight, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/context/language-context"

export default function QAPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [openCategory, setOpenCategory] = useState("")
  const [openQuestions, setOpenQuestions] = useState<string[]>([])
  const [filteredCategories, setFilteredCategories] = useState<any[]>([])
  const [noResults, setNoResults] = useState(false)

  const faqCategories = [
    {
      id: "general",
      name: t("qa.categories.general"),
      questions: [
        {
          id: "experienceNeeded",
          question: t("qa.questions.experienceNeeded.question"),
          answer: t("qa.questions.experienceNeeded.answer"),
        },
        {
          id: "startingCapital",
          question: t("qa.questions.startingCapital.question"),
          answer: t("qa.questions.startingCapital.answer"),
        },
        {
          id: "getHelp",
          question: t("qa.questions.getHelp.question"),
          answer: t("qa.questions.getHelp.answer"),
        },
        {
          id: "earningTimeframe",
          question: t("qa.questions.earningTimeframe.question"),
          answer: t("qa.questions.earningTimeframe.answer"),
        },
        {
          id: "howItWorks",
          question: t("qa.questions.howItWorks.question"),
          answer: t("qa.questions.howItWorks.answer"),
        },
      ],
    },
    {
      id: "technical",
      name: t("qa.categories.technical"),
      questions: [
        {
          id: "monthlyPayment",
          question: t("qa.questions.monthlyPayment.question"),
          answer: t("qa.questions.monthlyPayment.answer"),
        },
        {
          id: "paymentProcess",
          question: t("qa.questions.paymentProcess.question"),
          answer: t("qa.questions.paymentProcess.answer"),
        },
        {
          id: "timeInvestment",
          question: t("qa.questions.timeInvestment.question"),
          answer: t("qa.questions.timeInvestment.answer"),
        },
      ],
    },
    {
      id: "signals",
      name: t("qa.categories.signals"),
      questions: [
        {
          id: "freeJoin",
          question: t("qa.questions.freeJoin.question"),
          answer: t("qa.questions.freeJoin.answer"),
        },
        {
          id: "earnMore",
          question: t("qa.questions.earnMore.question"),
          answer: t("qa.questions.earnMore.answer"),
        },
      ],
    },
  ]

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCategories(faqCategories)
      setNoResults(false)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = faqCategories
      .map((category) => ({
        ...category,
        questions: category.questions.filter(
          (q) => q.question.toLowerCase().includes(query) || q.answer.toLowerCase().includes(query),
        ),
      }))
      .filter((category) => category.questions.length > 0)

    setFilteredCategories(filtered)
    setNoResults(filtered.length === 0)
  }, [searchQuery])

  const toggleQuestion = (id: string) => {
    setOpenQuestions((prev) => (prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]))
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    if (e.target.value.trim() !== "") {
      setOpenCategory("")
    } else {
      setOpenCategory("general")
    }
  }

  return (
    <>
      <nav className="bg-gray-100 py-3" aria-label="Breadcrumb">
        <div className="container mx-auto">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-gray-400 hover:text-primary">
                {t("nav.home")}
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">{t("qa.title")}</li>
          </ol>
        </div>
      </nav>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {t("qa.heading")} <span className="text-primary">{t("qa.highlightedHeading")}</span>
            </h1>
            <p className="text-xl text-gray-700">{t("qa.subheading")}</p>
          </div>

          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative mb-8">
              <input
                type="text"
                placeholder={t("qa.searchPlaceholder")}
                value={searchQuery}
                onChange={handleSearchChange}
                className="form-input pl-12 py-3 text-gray-700 rounded-lg border-2 border-gray-300 w-full focus:ring-primary focus:border-primary transition"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              {searchQuery && (
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-900"
                  onClick={() => setSearchQuery("")}
                  aria-label={t("qa.clearSearch")}
                >
                  ✕
                </button>
              )}
            </div>
            <div className="mt-2 text-sm text-gray-400 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              <span>{t("qa.searchTip")}</span>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            {noResults ? (
              <div className="text-center py-12 bg-gray-900 rounded-lg">
                <p className="text-gray-400 mb-4">{t("qa.noResults")}</p>
                <button onClick={() => setSearchQuery("")} className="text-primary hover:underline">
                  {t("qa.clearSearch")}
                </button>
              </div>
            ) : (
              filteredCategories.map((category) => (
                <div key={category.id} className="mb-8">
                  <button
                    className="flex justify-between items-center w-full bg-white border border-gray-200 rounded-lg px-6 py-4 text-left hover:border-primary/50 transition-colors"
                    onClick={() => setOpenCategory(openCategory === category.id ? "" : category.id)}
                    aria-expanded={openCategory === category.id}
                    aria-controls={`category-${category.id}`}
                  >
                    <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
                    {openCategory === category.id ? (
                      <ChevronUp className="text-primary" size={20} />
                    ) : (
                      <ChevronDown className="text-primary" size={20} />
                    )}
                  </button>
                  <div
                    id={`category-${category.id}`}
                    className={`mt-4 space-y-4 transition-all duration-300 ${openCategory === category.id ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}
                  >
                    {category.questions.map((item) => (
                      <div
                        key={item.id}
                        className="border border-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                      >
                        <button
                          className="flex justify-between items-center w-full bg-white px-6 py-4 text-left hover:bg-gray-900/50 transition-colors"
                          onClick={() => toggleQuestion(item.id)}
                          aria-expanded={openQuestions.includes(item.id)}
                          aria-controls={`question-${item.id}`}
                        >
                          <h3 className="font-medium text-gray-900">{item.question}</h3>
                          {openQuestions.includes(item.id) ? (
                            <ChevronUp className="text-primary flex-shrink-0" size={20} />
                          ) : (
                            <ChevronDown className="text-primary flex-shrink-0" size={20} />
                          )}
                        </button>
                        <div
                          id={`question-${item.id}`}
                          className={`transition-all duration-300 ${openQuestions.includes(item.id) ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}
                        >
                          <div className="px-6 py-4 bg-gray-50">
                            <p className="text-gray-700">{item.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-white to-primary/10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              {t("qa.cta.title")} <span className="text-primary">{t("qa.cta.highlightedTitle")}</span>
            </h2>
            <p className="text-xl text-gray-700 mb-8">{t("qa.cta.description")}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="btn-primary flex items-center justify-center gap-2 group">
                {t("qa.cta.contact")}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/checkout" className="btn-secondary flex items-center justify-center gap-2 group">
                {t("qa.cta.startNow")}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
