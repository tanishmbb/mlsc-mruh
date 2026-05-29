"use client"

import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

export default function LoginPage() {
  const signIn = async (provider: "github" | "google") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm p-6 border rounded-xl shadow bg-card space-y-6">
        <h1 className="text-xl font-bold text-center">
          Sign in to MLSC MRUH
        </h1>

        {/* GitHub */}
        <Button
          className="w-full flex items-center gap-2"
          onClick={() => signIn("github")}
        >
          <Github size={18} />
          Continue with GitHub
        </Button>

        {/* Google */}
        <Button
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={() => signIn("google")}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.6 0 6.1 1.5 7.5 2.8l5.5-5.5C33.8 3.8 29.4 2 24 2 14.7 2 6.8 7.8 3.7 16l6.5 5C11.8 14.5 17.4 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.5 24c0-1.6-.1-2.8-.4-4H24v8.1h12.7c-.6 3.1-2.4 5.7-5.1 7.4l7.9 6.1c4.6-4.3 7-10.6 7-17.6z"
            />
            <path
              fill="#FBBC05"
              d="M10.2 28.9c-.5-1.4-.8-2.9-.8-4.4s.3-3 .8-4.4l-6.5-5c-1.3 2.6-2 5.6-2 9.4s.7 6.8 2 9.4l6.5-5z"
            />
            <path
              fill="#34A853"
              d="M24 46c5.4 0 9.8-1.8 13.1-4.9l-7.9-6.1c-2.2 1.5-5 2.4-8.2 2.4-6.6 0-12.2-5-13.8-11.6l-6.5 5C6.8 40.2 14.7 46 24 46z"
            />
          </svg>
          Continue with Google
        </Button>
      </div>
    </div>
  )
}
