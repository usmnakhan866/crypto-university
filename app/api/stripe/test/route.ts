import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST() {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY

    if (!stripeKey) {
      return NextResponse.json({ error: "Stripe secret key is not configured" }, { status: 500 })
    }

    // Initialize Stripe with your secret key
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2025-03-31.basil",
    })

    // Test the connection by retrieving the account information
    const account = await stripe.accounts.retrieve()

    return NextResponse.json({
      success: true,
      message: "Stripe connection successful",
      accountId: account.id,
    })
  } catch (error) {
    console.error("Error testing Stripe connection:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to connect to Stripe",
      },
      { status: 500 },
    )
  }
}
