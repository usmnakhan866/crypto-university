"use client"

import Image from "next/image"

interface PayPalButtonProps {
  amount: string
  onSuccess: (details: any) => void
  onError: (error: any) => void
  onCancel: () => void
}

export default function PayPalButton({ amount }: PayPalButtonProps) {
  return (
    <div>
      <a
        href="https://www.paypal.com/ncp/payment/73WD4GFF22NNA"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-[#0070BA] hover:bg-[#005ea6] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center"
      >
        <Image
          src="https://upload.wikimedia.org/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png"
          alt="PayPal"
          width={80}
          height={30}
          className="h-6 w-auto object-contain mr-2"
        />
        Pay with PayPal
      </a>
    </div>
  )
}
