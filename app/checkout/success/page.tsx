"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, AlertCircle, ArrowRight, Calendar, Mail, User, CreditCard, Clock } from "lucide-react"
import confetti from "canvas-confetti"

function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [error, setError] = useState<string | null>(null)
  const [paymentDetails, setPaymentDetails] = useState<any>(null)

  // Launch confetti when payment is successful
  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Check if we're returning from PayPal direct link
        const storedPayPalData = localStorage.getItem("paypalCheckout")

        if (storedPayPalData) {
          const paypalData = JSON.parse(storedPayPalData)

          // Check if the data is recent (within the last hour)
          const isRecent = new Date().getTime() - paypalData.timestamp < 3600000

          if (isRecent) {
            // Clear the stored data
            localStorage.removeItem("paypalCheckout")

            // Set success state with the stored data
            setStatus("success")
            setPaymentDetails({
              source: "PayPal",
              orderId: "Direct Payment",
              email: paypalData.email,
              name: paypalData.name,
            })
            setTimeout(() => launchConfetti(), 500)
            return
          }
        }

        const source = searchParams.get("source")
        console.log("Payment source:", source)

        if (source === "stripe") {
          const sessionId = searchParams.get("session_id")
          if (!sessionId) {
            throw new Error("No session ID found")
          }

          console.log("Verifying Stripe payment with session ID:", sessionId)

          const response = await fetch("/api/stripe/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId }),
          })

          const data = await response.json()
          if (!response.ok) {
            throw new Error(data.error || "Payment verification failed")
          }

          if (data.success) {
            setStatus("success")
            setPaymentDetails(data.details)
            setTimeout(() => launchConfetti(), 500)
          } else {
            throw new Error("Payment was not successful")
          }
        } else if (source === "paypal") {
          // For PayPal, we might have the order ID directly in the URL
          const orderId = searchParams.get("orderId")

          if (orderId) {
            console.log("PayPal payment completed with order ID:", orderId)
            // For PayPal JS SDK integration, we don't need to verify again
            // as the payment is already captured client-side
            setStatus("success")
            setPaymentDetails({
              orderId: orderId,
              source: "PayPal",
            })
            setTimeout(() => launchConfetti(), 500)
          } else {
            // If we don't have the order ID, this might be a redirect from the API flow
            const token = searchParams.get("token")

            if (!token) {
              // No specific PayPal parameters, assume direct link success
              setStatus("success")
              setPaymentDetails({
                source: "PayPal",
                orderId: "Direct Payment",
              })
              setTimeout(() => launchConfetti(), 500)
              return
            }

            console.log("Verifying PayPal payment with token:", token)

            const response = await fetch("/api/paypal/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderId: token }),
            })

            const data = await response.json()
            if (!response.ok) {
              throw new Error(data.error || "Payment verification failed")
            }

            if (data.success) {
              setStatus("success")
              setPaymentDetails(data.details)
              setTimeout(() => launchConfetti(), 500)
            } else {
              throw new Error("Payment was not successful")
            }
          }
        } else {
          // For direct PayPal link or other sources, just show success
          console.log("Direct payment completed")
          setStatus("success")
          setPaymentDetails({
            source: "PayPal",
            orderId: "Direct Payment",
          })
          setTimeout(() => launchConfetti(), 500)
        }
      } catch (error) {
        console.error("Payment verification error:", error)
        setStatus("error")
        setError(error instanceof Error ? error.message : "Payment verification failed")
      }
    }

    verifyPayment()
  }, [searchParams])

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  const today = formatDate(new Date())
  const nextMonth = formatDate(new Date(new Date().setMonth(new Date().getMonth() + 1)))

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100">
        <div className="text-center">
          <div className="mb-6">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dein%20Abschnittstext%20%281%29-yspPj82NocbAdIUBsd6nTl9jztMfbE.png"
              alt="Memecoins Agents Logo"
              width={100}
              height={100}
              className="mx-auto"
            />
          </div>
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Processing Your Payment</h1>
          <p className="text-gray-600 mb-8">Please wait while we confirm your transaction...</p>
          <div className="flex justify-center items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0s" }}></div>
            <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.4s" }}></div>
          </div>
        </div>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Error</h1>
          <p className="text-gray-600 mb-6">{error || "There was an error processing your payment."}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header section with success message */}
          <div className="bg-gradient-to-r from-primary to-red-700 p-8 text-center text-white">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white mb-6">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-xl opacity-90">Welcome to Crypto University!</p>
          </div>

          {/* Main content */}
          <div className="p-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 flex items-center">
              <div className="bg-green-100 rounded-full p-2 mr-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-green-800">Your subscription is now active</h3>
                <p className="text-green-700 text-sm">You now have full access to all our premium features</p>
              </div>
            </div>

            {/* Order details */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-900 border-b pb-2">Order Summary</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CreditCard className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Payment Method</p>
                      <p className="font-medium text-gray-900">
                        {paymentDetails?.source || (paymentDetails?.paymentIntentId ? "Credit Card" : "PayPal")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Purchase Date</p>
                      <p className="font-medium text-gray-900">{today}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Next Billing Date</p>
                      <p className="font-medium text-gray-900">{nextMonth}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {paymentDetails?.email && (
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium text-gray-900">{paymentDetails.email}</p>
                      </div>
                    </div>
                  )}

                  {paymentDetails?.name && (
                    <div className="flex items-start">
                      <User className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium text-gray-900">{paymentDetails.name}</p>
                      </div>
                    </div>
                  )}

                  {(paymentDetails?.orderId || paymentDetails?.paymentIntentId) && (
                    <div className="flex items-start">
                      <div className="h-5 w-5 text-gray-500 mt-0.5 mr-3">#</div>
                      <div>
                        <p className="text-sm text-gray-500">Order ID</p>
                        <p className="font-medium text-gray-900 break-all">
                          {paymentDetails.orderId || paymentDetails.paymentIntentId}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Subscription Plan</span>
                  <span className="font-medium">Crypto University Premium</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-700">Amount</span>
                  <span className="font-medium">€70.99</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-700">Billing Cycle</span>
                  <span className="font-medium">Monthly</span>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-lg text-primary">€70.99</span>
                </div>
              </div>
            </div>

            {/* Next steps */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Next Steps:</h3>
              <ol className="space-y-4 text-gray-700">
                <li className="flex">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                    1
                  </span>
                  <span>Check your email for your login details and welcome information</span>
                </li>
                <li className="flex">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                    2
                  </span>
                  <span>Set up your crypto wallet using our step-by-step guide</span>
                </li>
                <li className="flex">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                    3
                  </span>
                  <span>Watch our exclusive instructional video to get started</span>
                </li>
                <li className="flex">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                    4
                  </span>
                  <span>Start receiving signals within the next 24 hours</span>
                </li>
              </ol>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors"
              >
                Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>

        {/* Additional information */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>A confirmation email has been sent to your email address.</p>
          <p className="mt-2">
            If you have any questions, please{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contact our support team
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100">
          <div className="text-center">
            <div className="mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse mx-auto"></div>
            </div>
            <h1 className="text-2xl font-bold mb-4 text-gray-900">Loading...</h1>
            <div className="w-48 h-2 bg-gray-200 rounded animate-pulse mx-auto"></div>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
