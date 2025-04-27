"use client"
import { useLanguage } from "@/context/language-context"
import { Target, Video, DollarSign, GraduationCap, LifeBuoy, Lock } from "lucide-react"
import Link from "next/link"

const WhatYouGet = () => {
  const { t } = useLanguage()

  // Get benefits from translations
  const benefits = [
    {
      icon: <Target size={32} className="text-primary" />,
      title: t("whatYouGet.benefit1.title"),
      description: t("whatYouGet.benefit1.description"),
    },
    {
      icon: <Video size={32} className="text-primary" />,
      title: t("whatYouGet.benefit2.title"),
      description: t("whatYouGet.benefit2.description"),
    },
    {
      icon: <DollarSign size={32} className="text-primary" />,
      title: t("whatYouGet.benefit3.title"),
      description: t("whatYouGet.benefit3.description"),
    },
    {
      icon: <GraduationCap size={32} className="text-primary" />,
      title: t("whatYouGet.benefit4.title"),
      description: t("whatYouGet.benefit4.description"),
    },
    {
      icon: <LifeBuoy size={32} className="text-primary" />,
      title: t("whatYouGet.benefit5.title"),
      description: t("whatYouGet.benefit5.description"),
    },
    {
      icon: <Lock size={32} className="text-primary" />,
      title: t("whatYouGet.benefit6.title"),
      description: t("whatYouGet.benefit6.description"),
    },
  ]

  return (
    <section className="section bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            {t("whatYouGet.title")} <span className="text-primary">{t("whatYouGet.highlightedTitle")}</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">{t("whatYouGet.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:border-primary/50 transition-colors shadow-md hover:shadow-lg"
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{benefit.title}</h3>
              <p className="text-gray-700">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/checkout"
            className="btn-primary inline-block text-xl rounded-xl shadow-md"
            style={{ backgroundColor: "#c20f05" }}
          >
            {t("nav.startNow")}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default WhatYouGet
