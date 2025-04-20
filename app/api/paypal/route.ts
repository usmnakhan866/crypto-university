import { NextResponse } from "next/server"

// Helper function to log detailed errors
function logPayPalError(stage: string, error: any) {
  console.error(`PayPal ${stage} error:`, {
    message: error.message || "Unknown error",
    stack: error.stack,
    details: error.details || {},
    data: error.data || {},
  })
}

export async function POST(request: Request) {
  try {
    const { amount, email, name } = await request.json()

    console.log("PayPal payment request:", { amount, email })

    // Validate inputs
    if (!amount || isNaN(Number.parseFloat(amount))) {
      return NextResponse.json({ error: "Valid amount is required" }, { status: 400 })
    }

    // Use the provided PayPal credentials
    const clientId = "Aas2med3Ch9YjkHRTHx_QtNo1Xa5liC2D6yDa3QCAy9NSjbiMeETGqdQxDSmpxZPGAhnAwIaLGGNHX5y"
    const clientSecret = "EJ5Anqo6la4Jz2kFwACfCRjB3QlU-3vLjZSQEZEO2U69sqM5kDttBcJvA09EwQhzzkD8PtcLDapajVI6"

    // Based on the client ID format, these appear to be sandbox credentials
    // Use the sandbox API endpoint
    const apiBase = "https://api-m.sandbox.paypal.com"

    console.log("Using PayPal API base:", apiBase)

    // Get an access token from PayPal
    try {
      const authString = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")

      console.log("Requesting PayPal access token...")

      const tokenResponse = await fetch(`${apiBase}/v1/oauth2/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${authString}`,
        },
        body: "grant_type=client_credentials",
      })

      const tokenData = await tokenResponse.json()

      if (!tokenResponse.ok) {
        console.error("PayPal token error response:", tokenData)
        throw new Error(`Failed to get PayPal access token: ${tokenData.error_description || "Unknown error"}`)
      }

      console.log("PayPal token obtained successfully")
      const accessToken = tokenData.access_token

      // Create a PayPal order
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL ||
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")

      console.log("Creating PayPal order with return URL base:", baseUrl)

      // Generate a unique request ID to prevent duplicate orders
      const requestId = `order-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`

      const orderPayload = {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "EUR",
              value: amount.toString(),
            },
            description: "Crypto University Subscription",
          },
        ],
        application_context: {
          brand_name: "Crypto University",
          landing_page: "LOGIN",
          user_action: "PAY_NOW",
          return_url: `${baseUrl}/checkout/success?source=paypal`,
          cancel_url: `${baseUrl}/checkout/cancel?source=paypal`,
        },
      }

      console.log("PayPal order payload:", JSON.stringify(orderPayload))

      const orderResponse = await fetch(`${apiBase}/v2/checkout/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "PayPal-Request-Id": requestId,
        },
        body: JSON.stringify(orderPayload),
      })

      const orderData = await orderResponse.json()

      if (!orderResponse.ok) {
        console.error("PayPal order creation error response:", orderData)
        throw new Error(
          `Failed to create PayPal order: ${
            orderData.message ||
            (orderData.details && orderData.details[0] ? orderData.details[0].description : "Unknown error")
          }`,
        )
      }

      console.log("PayPal order created successfully:", { id: orderData.id, status: orderData.status })

      // Find the approval URL
      const approvalLink = orderData.links.find((link: any) => link.rel === "approve")

      if (!approvalLink || !approvalLink.href) {
        console.error("No approval URL found in PayPal response:", orderData)
        throw new Error("No approval URL found in PayPal response")
      }

      console.log("PayPal approval URL found:", approvalLink.href)

      return NextResponse.json({
        success: true,
        approvalUrl: approvalLink.href,
        orderId: orderData.id,
      })
    } catch (tokenError) {
      logPayPalError("token request", tokenError)
      throw tokenError
    }
  } catch (error: any) {
    logPayPalError("general", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to create PayPal order",
        errorDetails: process.env.NODE_ENV === "development" ? error.toString() : undefined,
      },
      { status: 500 },
    )
  }
}
