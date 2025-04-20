"use client"
import { useLanguage } from "@/context/language-context"
import { CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

const WhatToExpect = () => {
  const { t } = useLanguage()

  // Define static expectations and details arrays
  const expectations = [t("whatToExpect.point1"), t("whatToExpect.point2"), t("whatToExpect.point3")]

  const details = [t("whatToExpect.detail1"), t("whatToExpect.detail2"), t("whatToExpect.detail3")]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="section bg-white" id="what-to-expect">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
            {t("whatToExpect.title")} <span className="text-primary">{t("whatToExpect.highlightedTitle")}</span>
          </h2>

          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {expectations.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                variants={itemVariants}
              >
                <CheckCircle className="text-primary mr-4 flex-shrink-0 mt-1" size={24} />
                <div>
                  <p className="text-xl text-gray-800">{item}</p>
                  {details[index] && <p className="text-gray-600 mt-2">{details[index]}</p>}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-12 bg-white border border-gray-200 rounded-xl p-6 text-center shadow-lg">
            <blockquote className="text-xl text-gray-800 italic mb-4">"{t("whatToExpect.testimonial")}"</blockquote>
            <cite className="text-gray-900 font-medium">{t("whatToExpect.testimonialAuthor")}</cite>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhatToExpect
