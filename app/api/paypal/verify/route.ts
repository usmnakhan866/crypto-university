import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json()

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }

    // Use the provided PayPal credentials
    const clientId = "Aas2med3Ch9YjkHRTHx_QtNo1Xa5liC2D6yDa3QCAy9NSjbiMeETGqdQxDSmpxZPGAhnAwIaLGGNHX5y"
    const clientSecret = "EJ5Anqo6la4Jz2kFwACfCRjB3QlU-3vLjZSQEZEO2U69sqM5kDttBcJvA09EwQhzzkD8PtcLDapajVI6"

    // Based on the client ID format, these appear to be sandbox credentials
    const apiBase = "https://api-m.sandbox.paypal.com"

    // Get an access token from PayPal
    const authString = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")

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
      console.error("PayPal token error:", tokenData)
      throw new Error(`Failed to get PayPal access token: ${tokenData.error_description || "Unknown error"}`)
    }

    const accessToken = tokenData.access_token

    // First, check the order status
    const orderResponse = await fetch(`${apiBase}/v2/checkout/orders/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const orderData = await orderResponse.json()

    if (!orderResponse.ok) {
      console.error("PayPal order retrieval error:", orderData)
      throw new Error(`Failed to retrieve PayPal order: ${orderData.message || JSON.stringify(orderData)}`)
    }

    // If the order is already completed, return success
    if (orderData.status === "COMPLETED") {
      return NextResponse.json({
        success: true,
        details: {
          orderId: orderData.id,
          status: orderData.status,
        },
      })
    }

    // If not completed, try to capture the payment
    if (orderData.status === "APPROVED") {
      const captureResponse = await fetch(`${apiBase}/v2/checkout/orders/${orderId}/capture`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "PayPal-Request-Id": `capture-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`,
        },
      })

      const captureData = await captureResponse.json()

      if (!captureResponse.ok) {
        console.error("PayPal capture error:", captureData)
        throw new Error(`Failed to capture PayPal payment: ${captureData.message || JSON.stringify(captureData)}`)
      }

      // Check if the payment was successfully captured
      if (captureData.status === "COMPLETED") {
        return NextResponse.json({
          success: true,
          details: {
            orderId: captureData.id,
            status: captureData.status,
            payerId: captureData.payer?.payer_id,
            email: captureData.payer?.email_address,
            name: captureData.payer?.name
              ? `${captureData.payer.name.given_name || ""} ${captureData.payer.name.surname || ""}`.trim()
              : "Unknown",
          },
        })
      }
    }

    // If we get here, the payment wasn't completed
    return NextResponse.json(
      {
        success: false,
        error: `Payment not completed. Current status: ${orderData.status}`,
      },
      { status: 400 },
    )
  } catch (error) {
    console.error("Error verifying PayPal payment:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to verify payment",
      },
      { status: 500 },
    )
  }
}
