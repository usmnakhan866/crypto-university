import { NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-03-31.basil",
})

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    // Check if the payment was successful
    if (session.payment_status === "paid") {
      // Here you would typically update your database to record the successful payment
      // For example, create a subscription, update user status, etc.

      return NextResponse.json({
        success: true,
        details: {
          customerId: session.customer,
          paymentIntentId: session.payment_intent,
          amount: session.amount_total ? session.amount_total / 100 : 0, // Convert from cents
          currency: session.currency,
          email: session.customer_details?.email,
          name: session.metadata?.name,
        },
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Payment was not successful",
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Error verifying Stripe payment:", error)
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 })
  }
}
