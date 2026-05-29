"use client"

import { useEffect } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/dashboard")
      } else {
        router.replace("/login")
      }
    })
  }, [router])

  return <p className="p-6">Signing you in…</p>
}
