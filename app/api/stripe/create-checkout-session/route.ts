import { NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-03-31.basil",
})

export async function POST(request: Request) {
  try {
    const { amount, email, name, successUrl, cancelUrl } = await request.json()

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Crypto University Subscription",
              description: "Monthly subscription to Crypto University",
            },
            unit_amount: Math.round(Number.parseFloat(amount) * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url:
        successUrl ||
        `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?source=stripe&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel?source=stripe`,
      customer_email: email,
      metadata: {
        name: name,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Error creating Stripe session:", error)
    return NextResponse.json({ error: "Failed to create payment session" }, { status: 500 })
  }
}
