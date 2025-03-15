"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MessageSquare, Send, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
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

  const validateForm = () => {
    let valid = true
    const errors = {
      name: "",
      email: "",
      subject: "",
      message: "",
    }

    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Name is required"
      valid = false
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = "Email is required"
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid"
      valid = false
    }

    // Subject validation
    if (!formData.subject.trim()) {
      errors.subject = "Subject is required"
      valid = false
    }

    // Message validation
    if (!formData.message.trim()) {
      errors.message = "Message is required"
      valid = false
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters"
      valid = false
    }

    setFormErrors(errors)
    return valid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    }, 1500)
  }

  return (
    <>
      {/* Breadcrumb navigation for better UX */}
      <nav className="bg-gray-100 py-3" aria-label="Breadcrumb">
        <div className="container mx-auto">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-gray-400 hover:text-primary">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">Contact</li>
          </ol>
        </div>
      </nav>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Contact <span className="text-primary">Our Experts</span>
            </h1>
            <p className="text-xl text-gray-700">
              Have questions about our services? Our team is here to help you 24/7.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center hover:border-primary/50 transition-colors shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                <Mail size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Email Us</h3>
              <p className="text-gray-700 mb-4">Our support team will get back to you within 24 hours.</p>
              <a
                href="mailto:support@cryptouniversity.com"
                className="text-primary hover:underline inline-flex items-center"
                aria-label="Email our support team"
              >
                support@cryptouniversity.com
              </a>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center hover:border-primary/50 transition-colors shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                <MessageSquare size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Live Chat</h3>
              <p className="text-gray-700 mb-4">Chat with our experts in real-time for immediate assistance.</p>
              <button
                className="text-primary hover:underline inline-flex items-center"
                aria-label="Start live chat with our support team"
              >
                Start Live Chat
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center hover:border-primary/50 transition-colors shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                <Phone size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Phone Support</h3>
              <p className="text-gray-700 mb-4">Available Monday to Friday, 9am to 5pm CET.</p>
              <a
                href="tel:+1234567890"
                className="text-primary hover:underline inline-flex items-center"
                aria-label="Call our support team"
              >
                +1 (234) 567-890
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-black to-primary/10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-white text-center">
              Send Us a <span className="text-primary">Message</span>
            </h2>

            {submitSuccess ? (
              <div className="bg-green-900/30 border border-green-500 text-green-400 p-6 rounded-lg text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-900/50 mb-4">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Message Sent Successfully!</h3>
                <p className="mb-4">Thank you for contacting us. We'll get back to you as soon as possible.</p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="bg-green-800 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-white mb-2 flex items-center">
                      Your Name <span className="text-primary ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`form-input ${formErrors.name ? "border-red-500" : ""}`}
                      placeholder="John Smith"
                      aria-describedby={formErrors.name ? "name-error" : undefined}
                    />
                    {formErrors.name && (
                      <p id="name-error" className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle size={16} className="mr-1" /> {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white mb-2 flex items-center">
                      Your Email <span className="text-primary ml-1">*</span>
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
                  <label htmlFor="subject" className="block text-white mb-2 flex items-center">
                    Subject <span className="text-primary ml-1">*</span>
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
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="partnership">Partnership Opportunity</option>
                  </select>
                  {formErrors.subject && (
                    <p id="subject-error" className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle size={16} className="mr-1" /> {formErrors.subject}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-white mb-2 flex items-center">
                    Your Message <span className="text-primary ml-1">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className={`form-input ${formErrors.message ? "border-red-500" : ""}`}
                    placeholder="How can we help you?"
                    aria-describedby={formErrors.message ? "message-error" : undefined}
                  ></textarea>
                  {formErrors.message && (
                    <p id="message-error" className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle size={16} className="mr-1" /> {formErrors.message}
                    </p>
                  )}
                </div>

                <div className="text-center">
                  <button type="submit" disabled={isSubmitting} className="btn-primary inline-flex items-center">
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
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-xl text-gray-700 mb-8">Can't find what you're looking for? Contact our support team.</p>

            <div className="text-left space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  How quickly will I receive signals after signing up?
                </h3>
                <p className="text-gray-700">
                  You'll start receiving signals immediately after your subscription is confirmed. We typically send 5-7
                  signals per day directly to your email and through our members-only platform.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Do I need prior experience with cryptocurrency?
                </h3>
                <p className="text-gray-700">
                  No prior experience is needed. Our step-by-step guides and instructional videos will walk you through
                  everything from setting up your wallet to executing trades based on our signals.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Can I cancel my subscription at any time?</h3>
                <p className="text-gray-700">
                  Yes, you can cancel your subscription at any time with no questions asked. There are no long-term
                  commitments or hidden fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

