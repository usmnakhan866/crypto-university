import { NextResponse } from "next/server"

export async function POST() {
  try {
    // Use the provided PayPal credentials
    const clientId = "Aas2med3Ch9YjkHRTHx_QtNo1Xa5liC2D6yDa3QCAy9NSjbiMeETGqdQxDSmpxZPGAhnAwIaLGGNHX5y"
    const clientSecret = "EJ5Anqo6la4Jz2kFwACfCRjB3QlU-3vLjZSQEZEO2U69sqM5kDttBcJvA09EwQhzzkD8PtcLDapajVI6"

    // Based on the client ID format, these appear to be sandbox credentials
    const apiBase = "https://api-m.sandbox.paypal.com"

    // Get an access token from PayPal to test the connection
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
      throw new Error(`Failed to get PayPal access token: ${tokenData.error_description || "Unknown error"}`)
    }

    return NextResponse.json({
      success: true,
      message: "PayPal connection successful",
      expiresIn: tokenData.expires_in,
    })
  } catch (error) {
    console.error("Error testing PayPal connection:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to connect to PayPal",
      },
      { status: 500 },
    )
  }
}
