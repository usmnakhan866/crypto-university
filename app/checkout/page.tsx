"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle, CreditCard, Lock, AlertCircle, ArrowLeft } from "lucide-react"

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    agreeToTerms: false,
  })

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    agreeToTerms: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const validateForm = () => {
    let valid = true
    const errors = {
      name: "",
      email: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      agreeToTerms: "",
    }

    // Only validate fields relevant to the current step
    if (step === 1) {
      if (!formData.name.trim()) {
        errors.name = "Name is required"
        valid = false
      }

      if (!formData.email.trim()) {
        errors.email = "Email is required"
        valid = false
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Email is invalid"
        valid = false
      }
    } else if (step === 2) {
      if (!formData.cardNumber.trim()) {
        errors.cardNumber = "Card number is required"
        valid = false
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
        errors.cardNumber = "Card number must be 16 digits"
        valid = false
      }

      if (!formData.expiryDate.trim()) {
        errors.expiryDate = "Expiry date is required"
        valid = false
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
        errors.expiryDate = "Expiry date must be in MM/YY format"
        valid = false
      }

      if (!formData.cvv.trim()) {
        errors.cvv = "CVV is required"
        valid = false
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        errors.cvv = "CVV must be 3 or 4 digits"
        valid = false
      }

      if (!formData.agreeToTerms) {
        errors.agreeToTerms = "You must agree to the terms"
        valid = false
      }
    }

    setFormErrors(errors)
    return valid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target

    // Format card number with spaces
    if (name === "cardNumber") {
      const formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()

      setFormData((prev) => ({
        ...prev,
        [name]: formattedValue,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }))
    }

    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const nextStep = () => {
    if (validateForm()) {
      setStep((prev) => prev + 1)
      // Scroll to top when changing steps
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
    // Scroll to top when changing steps
    window.scrollTo(0, 0)
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
      // Scroll to top to show success message
      window.scrollTo(0, 0)
    }, 1500)
  }

  const benefits = [
    "Instant access to 5-7 daily signals",
    "Step-by-step guides for wallet setup",
    "Exclusive instructional videos",
    "24/7 expert support",
    "Access to members-only community",
    "No minimum term - cancel anytime",
  ]

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
            <li className="text-gray-900 font-medium">Checkout</li>
          </ol>
        </div>
      </nav>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            {/* Progress indicator */}
            {!submitSuccess && (
              <div className="mb-12">
                <div className="flex justify-between items-center max-w-md mx-auto">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary" : "bg-gray-300"}`}
                    >
                      {step > 1 ? <CheckCircle size={20} /> : 1}
                    </div>
                    <span className="text-sm mt-2 text-gray-900">Your Info</span>
                  </div>
                  <div className={`h-1 flex-1 mx-2 ${step >= 2 ? "bg-primary" : "bg-gray-300"}`}></div>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary" : "bg-gray-300"}`}
                    >
                      {step > 2 ? <CheckCircle size={20} /> : 2}
                    </div>
                    <span className="text-sm mt-2 text-gray-900">Payment</span>
                  </div>
                  <div className={`h-1 flex-1 mx-2 ${step >= 3 ? "bg-primary" : "bg-gray-300"}`}></div>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary" : "bg-gray-300"}`}
                    >
                      3
                    </div>
                    <span className="text-sm mt-2 text-gray-900">Confirmation</span>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h1 className="text-4xl font-bold mb-6 text-gray-900">
                  Start Your <span className="text-primary">Journey</span> Today
                </h1>
                <p className="text-xl text-gray-700 mb-8">
                  Join thousands of successful traders and start profiting from MemeCoins with our expert signals.
                </p>

                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">What's Included:</h3>
                  <ul className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="text-primary mr-3 flex-shrink-0 mt-1" size={20} />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Monthly Subscription</h3>
                    <div>
                      <span className="text-gray-400 line-through mr-2">€99.99</span>
                      <span className="text-primary font-bold text-2xl">€70.99</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">Limited time offer - Save 30% today!</p>
                  <div className="flex items-center text-yellow-400">
                    <Lock size={16} className="mr-2" />
                    <span className="text-sm">Secure payment - Cancel anytime</span>
                  </div>
                </div>

                {/* Testimonial for social proof */}
                <div className="mt-8 bg-gray-900/50 border border-gray-800 rounded-xl p-6 shadow-lg">
                  <div className="flex items-start">
                    <div className="mr-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-gray-900 font-bold">JD</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-700 italic mb-2">
                        "I've made back my subscription fee 10x in just the first month. The signals are incredibly
                        accurate!"
                      </p>
                      <p className="text-gray-900 font-medium">John D. - Member since 2023</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                {submitSuccess ? (
                  <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-lg">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-900/30 mb-6">
                      <CheckCircle size={40} className="text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">Payment Successful!</h2>
                    <p className="text-xl text-gray-700 mb-6">Thank you for joining Crypto University!</p>
                    <div className="bg-black/50 rounded-lg p-6 mb-8 text-left">
                      <h3 className="font-bold text-gray-900 mb-4">Next Steps:</h3>
                      <ol className="space-y-4 text-gray-700 list-decimal list-inside">
                        <li>
                          Check your email at <span className="text-primary">{formData.email}</span> for your login
                          details
                        </li>
                        <li>Set up your crypto wallet using our step-by-step guide</li>
                        <li>Watch our exclusive instructional video</li>
                        <li>Start receiving signals within the next 24 hours</li>
                      </ol>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link href="/" className="btn-primary">
                        Go to Dashboard
                      </Link>
                      <Link href="/contact" className="btn-secondary">
                        Contact Support
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg">
                    {step === 1 && (
                      <>
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">Your Information</h2>

                        <form>
                          <div className="mb-6">
                            <label htmlFor="name" className="block text-gray-900 mb-2 flex items-center">
                              Full Name <span className="text-primary ml-1">*</span>
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

                          <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-900 mb-2 flex items-center">
                              Email Address <span className="text-primary ml-1">*</span>
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

                          <div className="flex justify-between mt-8">
                            <Link href="/" className="text-gray-400 hover:text-gray-900 flex items-center">
                              <ArrowLeft size={16} className="mr-1" /> Back to Home
                            </Link>
                            <button type="button" onClick={nextStep} className="btn-primary">
                              Continue to Payment
                            </button>
                          </div>
                        </form>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">Payment Details</h2>

                        <form onSubmit={handleSubmit}>
                          <div className="mb-6">
                            <label htmlFor="cardNumber" className="block text-gray-900 mb-2 flex items-center">
                              Card Number <span className="text-primary ml-1">*</span>
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleChange}
                                required
                                maxLength={19} // 16 digits + 3 spaces
                                className={`form-input pl-12 ${formErrors.cardNumber ? "border-red-500" : ""}`}
                                placeholder="1234 5678 9012 3456"
                                aria-describedby={formErrors.cardNumber ? "cardNumber-error" : undefined}
                              />
                              <CreditCard
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={20}
                              />
                            </div>
                            {formErrors.cardNumber && (
                              <p id="cardNumber-error" className="text-red-500 text-sm mt-1 flex items-center">
                                <AlertCircle size={16} className="mr-1" /> {formErrors.cardNumber}
                              </p>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                              <label htmlFor="expiryDate" className="block text-gray-900 mb-2 flex items-center">
                                Expiry Date <span className="text-primary ml-1">*</span>
                              </label>
                              <input
                                type="text"
                                id="expiryDate"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleChange}
                                required
                                className={`form-input ${formErrors.expiryDate ? "border-red-500" : ""}`}
                                placeholder="MM/YY"
                                maxLength={5}
                                aria-describedby={formErrors.expiryDate ? "expiryDate-error" : undefined}
                              />
                              {formErrors.expiryDate && (
                                <p id="expiryDate-error" className="text-red-500 text-sm mt-1 flex items-center">
                                  <AlertCircle size={16} className="mr-1" /> {formErrors.expiryDate}
                                </p>
                              )}
                            </div>

                            <div>
                              <label htmlFor="cvv" className="block text-gray-900 mb-2 flex items-center">
                                CVV <span className="text-primary ml-1">*</span>
                              </label>
                              <input
                                type="text"
                                id="cvv"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleChange}
                                required
                                className={`form-input ${formErrors.cvv ? "border-red-500" : ""}`}
                                placeholder="123"
                                maxLength={4}
                                aria-describedby={formErrors.cvv ? "cvv-error" : undefined}
                              />
                              {formErrors.cvv && (
                                <p id="cvv-error" className="text-red-500 text-sm mt-1 flex items-center">
                                  <AlertCircle size={16} className="mr-1" /> {formErrors.cvv}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="mb-8">
                            <div className="flex items-start">
                              <input
                                type="checkbox"
                                id="agreeToTerms"
                                name="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onChange={handleChange}
                                required
                                className="mt-1 mr-3"
                                aria-describedby={formErrors.agreeToTerms ? "agreeToTerms-error" : undefined}
                              />
                              <label htmlFor="agreeToTerms" className="text-gray-700 text-sm">
                                I agree to the{" "}
                                <a href="#" className="text-primary hover:underline">
                                  Terms of Service
                                </a>{" "}
                                and{" "}
                                <a href="#" className="text-primary hover:underline">
                                  Privacy Policy
                                </a>
                                . I understand that I can cancel my subscription at any time.
                              </label>
                            </div>
                            {formErrors.agreeToTerms && (
                              <p id="agreeToTerms-error" className="text-red-500 text-sm mt-1 flex items-center">
                                <AlertCircle size={16} className="mr-1" /> {formErrors.agreeToTerms}
                              </p>
                            )}
                          </div>

                          <div className="flex justify-between mt-8">
                            <button
                              type="button"
                              onClick={prevStep}
                              className="text-gray-900 border border-gray-600 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center"
                            >
                              <ArrowLeft size={16} className="mr-1" /> Back
                            </button>
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="btn-primary flex items-center justify-center"
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
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <Lock size={20} className="mr-2" />
                                  Complete Purchase - €70.99/month
                                </>
                              )}
                            </button>
                          </div>

                          <div className="mt-6 flex justify-center">
                            <div className="flex items-center space-x-4">
                              <Image src="/placeholder.svg?height=30&width=50" alt="Visa" width={50} height={30} />
                              <Image
                                src="/placeholder.svg?height=30&width=50"
                                alt="Mastercard"
                                width={50}
                                height={30}
                              />
                              <Image src="/placeholder.svg?height=30&width=50" alt="PayPal" width={50} height={30} />
                              <Image src="/placeholder.svg?height=30&width=50" alt="Apple Pay" width={50} height={30} />
                            </div>
                          </div>

                          <div className="mt-6 text-center text-sm text-gray-400 flex items-center justify-center">
                            <Lock size={14} className="mr-2" />
                            <span>Your payment information is secure and encrypted</span>
                          </div>
                        </form>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {!submitSuccess && (
        <section className="py-16 bg-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>

              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">When will I start receiving signals?</h3>
                  <p className="text-gray-700">
                    You'll start receiving signals immediately after your payment is processed. Our system will
                    automatically send you login details to access our members-only platform.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Can I cancel my subscription?</h3>
                  <p className="text-gray-700">
                    Yes, you can cancel your subscription at any time with no questions asked. There are no long-term
                    commitments or hidden fees.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Is my payment information secure?</h3>
                  <p className="text-gray-700">
                    Yes, we use industry-standard encryption and secure payment processors to ensure your payment
                    information is always protected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

