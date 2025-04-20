import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-03-31.basil",
})

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { price, name, email } = data

    // Create a Stripe Checkout Session
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
            unit_amount: Math.round(Number.parseFloat(price) * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,
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
