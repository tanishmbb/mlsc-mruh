"use client"

import { QRCodeCanvas } from "qrcode.react"

type Props = {
  eventId: string
  userId: string
}

export default function EventQRCode({ eventId, userId }: Props) {
  const payload = JSON.stringify({
    event_id: eventId,
    user_id: userId,
  })

  return (
    <div
      className="
        inline-flex flex-col items-center gap-3
        bg-white
        p-4
        rounded-xl
        border-4 border-gray-300
        shadow-md
      "
      style={{
        backgroundColor: "#ffffff",
        isolation: "isolate",
      }}
    >
      <QRCodeCanvas
        value={payload}
        size={200}
        bgColor="#FFFFFF"
        fgColor="#000000"
        level="H"
      />

      <p className="text-xs text-gray-700 text-center">
        Show this QR at the event for attendance
      </p>
    </div>
  )
}
