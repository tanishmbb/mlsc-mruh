"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"

type Setting = {
  key: string
  value: string
  description: string | null
}

export default function AdminSystemPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  const [settings, setSettings] = useState<Setting[]>([])
  const [checkingAdmin, setCheckingAdmin] = useState(true)
  const [savingKey, setSavingKey] = useState<string | null>(null)

  /* ───────── ADMIN CHECK ───────── */
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
      return
    }

    if (!user) return

    const checkAdmin = async () => {
      const { data } = await supabase
        .from("admins")
        .select("email")
        .eq("email", user.email)
        .maybeSingle()

      if (!data) {
        router.push("/dashboard")
      } else {
        setCheckingAdmin(false)
      }
    }

    checkAdmin()
  }, [user, loading, router])

  /* ───────── LOAD SETTINGS ───────── */
  useEffect(() => {
    if (checkingAdmin) return

    const load = async () => {
      const { data } = await supabase
        .from("system_settings")
        .select("*")
        .order("key")

      setSettings(data || [])
    }

    load()
  }, [checkingAdmin])

  /* ───────── UPDATE SETTING ───────── */
  const updateSetting = async (key: string, value: string) => {
    setSavingKey(key)

    const { error } = await supabase
      .from("system_settings")
      .update({ value })
      .eq("key", key)

    if (error) {
      alert("Failed to update setting")
    } else {
      setSettings(prev =>
        prev.map(s => (s.key === key ? { ...s, value } : s))
      )
    }

    setSavingKey(null)
  }

  /* ───────── TOGGLE BOOL ───────── */
  const toggleBoolean = (s: Setting) => {
    const next = s.value === "true" ? "false" : "true"
    updateSetting(s.key, next)
  }

  if (loading || checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading system settings…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-muted-foreground mt-2">
            Global configuration & feature controls
          </p>
        </div>

        {/* SETTINGS LIST */}
        <div className="space-y-6">
          {settings.length === 0 && (
            <p className="text-muted-foreground">
              No system settings found.
            </p>
          )}

          {settings.map(s => {
            const isBool = s.value === "true" || s.value === "false"

            return (
              <div
                key={s.key}
                className="bg-card border rounded-xl p-6 space-y-3"
              >
                <div className="flex justify-between items-start gap-6">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{s.key}</h3>
                    {s.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {s.description}
                      </p>
                    )}
                  </div>

                  {/* BOOLEAN TOGGLE */}
                  {isBool && (
                    <Switch
                      checked={s.value === "true"}
                      onCheckedChange={() => toggleBoolean(s)}
                      disabled={savingKey === s.key}
                    />
                  )}
                </div>

                {/* STRING VALUE */}
                {!isBool && (
                  <div className="flex gap-3 items-center">
                    <Input
                      value={s.value}
                      onChange={e =>
                        setSettings(prev =>
                          prev.map(x =>
                            x.key === s.key
                              ? { ...x, value: e.target.value }
                              : x
                          )
                        )
                      }
                    />
                    <Button
                      onClick={() => updateSetting(s.key, s.value)}
                      disabled={savingKey === s.key}
                    >
                      {savingKey === s.key ? "Saving…" : "Save"}
                    </Button>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* WARNING ZONE */}
        <div className="border-t pt-10">
          <h2 className="text-xl font-semibold text-red-600">
            Danger Zone
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            These actions affect the entire system.
          </p>

          <div className="mt-6 space-y-4">
            <Button
              variant="destructive"
              onClick={() => {
                if (!confirm("Enable maintenance mode?")) return
                updateSetting("maintenance_mode", "true")
              }}
            >
              Enable Maintenance Mode
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}
