"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { Html5Qrcode } from "html5-qrcode"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertTriangle, XCircle, RefreshCcw } from "lucide-react"

type ScanResult = {
  status: "success" | "warning" | "error"
  message: string
}

export default function AdminScanPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  const scannerRef = useRef<Html5Qrcode | null>(null)
  const startedRef = useRef(false)
  const lockRef = useRef(false) // 🔒 HARD LOCK

  const [result, setResult] = useState<ScanResult | null>(null)

  /* ───────── ADMIN CHECK ───────── */
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
      return
    }

    if (!user) return

    supabase
      .from("admins")
      .select("email")
      .eq("email", user.email)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) router.push("/dashboard")
      })
  }, [user, loading, router])

  /* ───────── START SCANNER ───────── */
  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true

    startScanner()

    return () => {
      stopScanner()
    }
  }, [])

  const startScanner = async () => {
    lockRef.current = false
    setResult(null)

    const scanner = new Html5Qrcode("qr-reader")
    scannerRef.current = scanner

    await scanner.start(
      { facingMode: "environment" },
      { fps: 5, qrbox: 250 },
      handleScan
    )
  }

const stopScanner = async () => {
  if (!scannerRef.current) return

  try {
    await scannerRef.current.stop()
  } catch {
    // ignore stop errors
  }

  try {
    scannerRef.current.clear() // ❗ NOT async, NO .catch
  } catch {
    // ignore clear errors
  }

  scannerRef.current = null
}


  /* ───────── SCAN HANDLER ───────── */
  const handleScan = async (decodedText: string) => {
    if (lockRef.current) return
    lockRef.current = true

    try {
      const payload = JSON.parse(decodedText)
      const { event_id, user_id } = payload

      if (!event_id || !user_id) {
        setResult({ status: "error", message: "Invalid QR code" })
        await stopScanner()
        return
      }

      const { data: rsvp } = await supabase
        .from("event_rsvps")
        .select("id, attended")
        .eq("event_id", event_id)
        .eq("user_id", user_id)
        .maybeSingle()

      if (!rsvp) {
        setResult({ status: "error", message: "RSVP not found" })
        await stopScanner()
        return
      }

      if (rsvp.attended) {
        setResult({
          status: "warning",
          message: "Attendance already marked",
        })
        await stopScanner()
        return
      }

      await supabase
        .from("event_rsvps")
        .update({
          attended: true,
          attended_at: new Date().toISOString(),
        })
        .eq("id", rsvp.id)

      setResult({
        status: "success",
        message: "Attendance marked successfully",
      })

      await stopScanner()
    } catch {
      setResult({ status: "error", message: "Invalid QR payload" })
      await stopScanner()
    }
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-24 space-y-6">
      <h1 className="text-2xl font-bold text-center">
        Scan Event QR Code
      </h1>

      <div
        id="qr-reader"
        className={`rounded-xl overflow-hidden border-4 transition-all ${
          result?.status === "success"
            ? "border-green-500"
            : result?.status === "warning"
            ? "border-yellow-500"
            : result?.status === "error"
            ? "border-red-500"
            : "border-border"
        }`}
      />

      {result && (
        <div
          className={`flex flex-col items-center gap-2 p-4 rounded-xl font-semibold text-center ${
            result.status === "success"
              ? "bg-green-100 text-green-700"
              : result.status === "warning"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {result.status === "success" && <CheckCircle />}
          {result.status === "warning" && <AlertTriangle />}
          {result.status === "error" && <XCircle />}
          {result.message}
        </div>
      )}

      {result && (
        <Button
          onClick={startScanner}
          className="mx-auto flex items-center gap-2"
        >
          <RefreshCcw size={16} />
          Scan Next
        </Button>
      )}
    </div>
  )
}
