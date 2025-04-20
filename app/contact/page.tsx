"use client"
import type React from "react"
import { useState } from "react"
import { Mail, MessageSquare, Send, AlertCircle, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/context/language-context"

export default function ContactPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const validateForm = () => {
    let valid = true
    const errors = {
      name: "",
      email: "",
      subject: "",
      message: "",
    }

    if (!formData.name.trim()) {
      errors.name = t("contact.validationErrors.name")
      valid = false
    }

    if (!formData.email.trim()) {
      errors.email = t("contact.validationErrors.email.required")
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = t("contact.validationErrors.email.invalid")
      valid = false
    }

    if (!formData.subject.trim()) {
      errors.subject = t("contact.validationErrors.subject")
      valid = false
    }

    if (!formData.message.trim()) {
      errors.message = t("contact.validationErrors.message.required")
      valid = false
    } else if (formData.message.trim().length < 10) {
      errors.message = t("contact.validationErrors.message.minLength")
      valid = false
    }

    setFormErrors(errors)
    return valid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Send the form data to the API
    fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsSubmitting(false)
        if (data.success) {
          setSubmitSuccess(true)
          // Reset form
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          })
        } else {
          setSubmitError(data.error || t("contact.errorMessage"))
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error)
        setIsSubmitting(false)
        setSubmitError(t("contact.errorMessage"))
      })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
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
            <li className="text-gray-900 font-medium">{t("contact.title")}</li>
          </ol>
        </div>
      </nav>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {t("contact.heading")} <span className="text-primary">{t("contact.highlightedTitle")}</span>
            </h1>
            <p className="text-xl text-gray-700">{t("contact.subheading")}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center hover:border-primary/50 transition-colors shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                <Mail size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{t("contact.emailCard.title")}</h3>
              <p className="text-gray-700 mb-4">{t("contact.emailCard.description")}</p>
              <a
                href={`mailto:${t("contact.emailCard.email")}`}
                className="text-primary hover:underline inline-flex items-center"
                aria-label={t("contact.emailCard.title")}
              >
                {t("contact.emailCard.email")}
              </a>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center hover:border-primary/50 transition-colors shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                <MessageSquare size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{t("contact.chatCard.title")}</h3>
              <p className="text-gray-700 mb-4">{t("contact.chatCard.description")}</p>
              <Link
                href="/payment"
                className="text-primary hover:underline inline-flex items-center"
                aria-label={t("contact.chatCard.button")}
              >
                {t("contact.chatCard.button")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">{t("contact.formTitle")}</h2>

            {submitSuccess ? (
              <div className="bg-green-900/30 border border-green-500 text-green-400 p-6 rounded-lg text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-900/50 mb-4">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t("contact.successMessage.title")}</h3>
                <p className="mb-4">{t("contact.successMessage.description")}</p>
                <Link
                  href="/payment"
                  className="inline-block bg-green-800 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  {t("contact.successMessage.button")}
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {submitError && (
                  <div className="bg-red-900/30 border border-red-500 text-red-400 p-4 rounded-lg mb-6 text-center">
                    <p>{submitError || t("contact.errorMessage")}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-900 mb-2 flex items-center">
                      {t("contact.formFields.name")}{" "}
                      <span className="text-primary ml-1">{t("contact.formFields.required")}</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`form-input ${formErrors.name ? "border-red-500" : ""}`}
                      placeholder={t("contact.formFields.name")}
                      aria-describedby={formErrors.name ? "name-error" : undefined}
                    />
                    {formErrors.name && (
                      <p id="name-error" className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle size={16} className="mr-1" /> {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-900 mb-2 flex items-center">
                      {t("contact.formFields.email")}{" "}
                      <span className="text-primary ml-1">{t("contact.formFields.required")}</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`form-input ${formErrors.email ? "border-red-500" : ""}`}
                      placeholder="john@example.com"
                      aria-describedby={formErrors.email ? "email-error" : undefined}
                    />
                    {formErrors.email && (
                      <p id="email-error" className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle size={16} className="mr-1" /> {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="subject" className="block text-gray-900 mb-2 flex items-center">
                    {t("contact.formFields.subject")}{" "}
                    <span className="text-primary ml-1">{t("contact.formFields.required")}</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`form-input ${formErrors.subject ? "border-red-500" : ""}`}
                    aria-describedby={formErrors.subject ? "subject-error" : undefined}
                  >
                    <option value="">{t("contact.formFields.selectSubject")}</option>
                    <option value="general">{t("contact.formFields.subjectOptions.general")}</option>
                    <option value="support">{t("contact.formFields.subjectOptions.support")}</option>
                    <option value="billing">{t("contact.formFields.subjectOptions.billing")}</option>
                    <option value="partnership">{t("contact.formFields.subjectOptions.partnership")}</option>
                  </select>
                  {formErrors.subject && (
                    <p id="subject-error" className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle size={16} className="mr-1" /> {formErrors.subject}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-900 mb-2 flex items-center">
                    {t("contact.formFields.message")}{" "}
                    <span className="text-primary ml-1">{t("contact.formFields.required")}</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className={`form-input ${formErrors.message ? "border-red-500" : ""}`}
                    placeholder={t("contact.formFields.messagePlaceholder")}
                    aria-describedby={formErrors.message ? "message-error" : undefined}
                  ></textarea>
                  {formErrors.message && (
                    <p id="message-error" className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle size={16} className="mr-1" /> {formErrors.message}
                    </p>
                  )}
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary inline-flex items-center rounded-xl shadow-md"
                    style={{ backgroundColor: "#c20f05" }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {t("contact.submitButton.sending")}
                      </>
                    ) : (
                      <>
                        <Send size={20} className="mr-2" />
                        {t("contact.submitButton.default")}
                      </>
                    )}
                  </button>
                </div>
              </form>
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
