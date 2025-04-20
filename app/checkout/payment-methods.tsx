"use client"

import Image from "next/image"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"

interface PaymentMethodsProps {
  amount: string
  itemName: string
  onSuccess: () => void
  onCancel: () => void
  email: string
  name: string
}

export default function PaymentMethods({ amount, itemName, onSuccess, onCancel, email, name }: PaymentMethodsProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("stripe")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paypalError, setPaypalError] = useState<string | null>(null)
  const [showPayPalFlow, setShowPayPalFlow] = useState(false)

  const handleStripeCheckout = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Create a new checkout session
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          email,
          name,
          successUrl: `${window.location.origin}/checkout/success?source=stripe&session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/checkout/cancel?source=stripe`,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to initialize Stripe")
      }

      // Redirect to Stripe's checkout page
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error("No checkout URL returned from Stripe")
      }
    } catch (error) {
      console.error("Error initializing Stripe payment:", error)
      setError(error instanceof Error ? error.message : "Failed to initialize Stripe payment")
      setIsLoading(false)
    }
  }

  const handlePayPalSuccess = (details: any) => {
    console.log("PayPal payment successful:", details)
    // Redirect to success page
    window.location.href = `/checkout/success?source=paypal&orderId=${details.id}`
  }

  const handlePayPalError = (error: any) => {
    console.error("PayPal payment error:", error)
    setPaypalError(error instanceof Error ? error.message : "PayPal payment failed")
  }

  const handlePayPalCancel = () => {
    console.log("PayPal payment cancelled")
    setShowPayPalFlow(false)
  }

  const startPayPalCheckout = () => {
    setShowPayPalFlow(true)
  }

  if (showPayPalFlow) {
    return (
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="mb-6">
          <button
            onClick={() => setShowPayPalFlow(false)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to payment options
          </button>
        </div>

        <h3 className="text-xl font-bold mb-6 text-center">Complete Your Payment</h3>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Subscription Plan:</span>
            <span className="font-medium">Crypto University Premium</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-700">Amount:</span>
            <span className="font-bold text-primary">€70.99</span>
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-gray-700">Click the button below to complete your payment securely with PayPal</p>
        </div>

        <a
          href="https://www.paypal.com/ncp/payment/73WD4GFF22NNA"
          className="w-full bg-[#0070BA] hover:bg-[#005ea6] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center"
          onClick={() => {
            // Store information in localStorage to handle return from PayPal
            localStorage.setItem(
              "paypalCheckout",
              JSON.stringify({
                amount: amount,
                email: email,
                name: name,
                timestamp: new Date().getTime(),
              }),
            )
          }}
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png"
            alt="PayPal"
            width={80}
            height={30}
            className="h-6 w-auto object-contain mr-2"
          />
          Pay €{amount} with PayPal
        </a>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>You will be redirected to PayPal to complete your payment.</p>
          <p className="mt-2">After payment, you'll be returned to our site automatically.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Stripe Payment Option */}
        <div
          className={`border ${selectedMethod === "stripe" ? "border-primary" : "border-gray-200"} rounded-lg p-4 hover:border-primary transition-colors`}
        >
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="stripe"
              checked={selectedMethod === "stripe"}
              onChange={() => setSelectedMethod("stripe")}
              className="mr-3"
            />
            <span className="text-gray-900 font-medium">Card Payment</span>
            <div className="flex ml-auto space-x-2">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                alt="Visa"
                width={40}
                height={25}
                className="h-6 w-auto object-contain"
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
                alt="Mastercard"
                width={40}
                height={25}
                className="h-6 w-auto object-contain"
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png"
                alt="Amex"
                width={40}
                height={25}
                className="h-6 w-auto object-contain"
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/1200px-Apple_Pay_logo.svg.png"
                alt="Apple Pay"
                width={40}
                height={25}
                className="h-6 w-auto object-contain"
              />
            </div>
          </label>
        </div>

        {/* PayPal Option */}
        <div
          className={`border ${selectedMethod === "paypal" ? "border-primary" : "border-gray-200"} rounded-lg p-4 hover:border-primary transition-colors`}
        >
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={selectedMethod === "paypal"}
              onChange={() => setSelectedMethod("paypal")}
              className="mr-3"
            />
            <span className="text-gray-900 font-medium">PayPal</span>
            <div className="ml-auto">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png"
                alt="PayPal"
                width={80}
                height={30}
                className="h-8 w-auto object-contain"
              />
            </div>
          </label>
        </div>
      </div>

      {/* Payment Forms */}
      <div className="mt-6">
        {selectedMethod === "stripe" && (
          <button
            onClick={handleStripeCheckout}
            disabled={isLoading}
            className="w-full bg-[#635BFF] hover:bg-[#524DDB] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Processing...
              </>
            ) : (
              <>
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                  alt="Stripe"
                  width={60}
                  height={25}
                  className="h-6 w-auto object-contain mr-2"
                />
                {`Pay €${amount} securely`}
              </>
            )}
          </button>
        )}

        {selectedMethod === "paypal" && (
          <button
            onClick={startPayPalCheckout}
            className="w-full bg-[#0070BA] hover:bg-[#005ea6] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center"
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png"
              alt="PayPal"
              width={80}
              height={30}
              className="h-6 w-auto object-contain mr-2"
            />
            Continue with PayPal
          </button>
        )}
      </div>
    </div>
  )
}
