"use client"

import { useState } from "react"
import Link from "next/link"

export default function PaymentTestPage() {
  const [testResult, setTestResult] = useState<{
    stripe?: { success: boolean; message: string }
    paypal?: { success: boolean; message: string }
  }>({})
  const [isLoading, setIsLoading] = useState<{ stripe?: boolean; paypal?: boolean }>({})

  const testStripeConnection = async () => {
    setIsLoading({ ...isLoading, stripe: true })
    try {
      const response = await fetch("/api/stripe/test", {
        method: "POST",
      })
      const data = await response.json()
      setTestResult({
        ...testResult,
        stripe: {
          success: response.ok,
          message: response.ok ? "Stripe connection successful!" : data.error || "Connection failed",
        },
      })
    } catch (error) {
      setTestResult({
        ...testResult,
        stripe: {
          success: false,
          message: error instanceof Error ? error.message : "An unknown error occurred",
        },
      })
    } finally {
      setIsLoading({ ...isLoading, stripe: false })
    }
  }

  const testPayPalConnection = async () => {
    setIsLoading({ ...isLoading, paypal: true })
    try {
      const response = await fetch("/api/paypal/test", {
        method: "POST",
      })
      const data = await response.json()
      setTestResult({
        ...testResult,
        paypal: {
          success: response.ok,
          message: response.ok ? "PayPal connection successful!" : data.error || "Connection failed",
        },
      })
    } catch (error) {
      setTestResult({
        ...testResult,
        paypal: {
          success: false,
          message: error instanceof Error ? error.message : "An unknown error occurred",
        },
      })
    } finally {
      setIsLoading({ ...isLoading, paypal: false })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Payment Integration Test</h1>

        <div className="space-y-8">
          {/* Stripe Test */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Stripe Integration</h2>
            <p className="text-gray-600 mb-4">Test your Stripe integration by verifying the API connection.</p>

            <button
              onClick={testStripeConnection}
              disabled={isLoading.stripe}
              className="bg-[#635BFF] hover:bg-[#524DDB] text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
            >
              {isLoading.stripe ? "Testing..." : "Test Stripe Connection"}
            </button>

            {testResult.stripe && (
              <div
                className={`mt-4 p-4 rounded-lg ${testResult.stripe.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
              >
                {testResult.stripe.message}
              </div>
            )}
          </div>

          {/* PayPal Test */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">PayPal Integration</h2>
            <p className="text-gray-600 mb-4">Test your PayPal integration by verifying the API connection.</p>

            <button
              onClick={testPayPalConnection}
              disabled={isLoading.paypal}
              className="bg-[#0070BA] hover:bg-[#005ea6] text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
            >
              {isLoading.paypal ? "Testing..." : "Test PayPal Connection"}
            </button>

            {testResult.paypal && (
              <div
                className={`mt-4 p-4 rounded-lg ${testResult.paypal.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
              >
                {testResult.paypal.message}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <Link href="/checkout" className="text-primary hover:underline">
            Go to Checkout Page
          </Link>
        </div>
      </div>
    </div>
  )
}
