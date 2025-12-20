"use client"

import { useState } from "react"
import { Loader2, CheckCircle, Mail } from "lucide-react"

export default function NewsletterCTA() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    setStatus("idle")

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(data.message)
        setEmail("")
      } else {
        setStatus("error")
        setMessage(data.error)
      }
    } catch {
      setStatus("error")
      setMessage("დაფიქსირდა შეცდომა")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="my-8 p-6 rounded-lg bg-muted/30 border border-border/50">
      <div className="flex items-center gap-2 mb-3">
        <Mail className="size-5 text-amber-500" />
        <h4 className="font-semibold text-lg">გამოიწერეთ უფასოდ</h4>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        მიიღეთ ფსიქოლოგიური ინსაითები და პრაქტიკული რჩევები პირდაპირ თქვენს მეილზე.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          placeholder="თქვენი ელ-ფოსტა"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 h-11 px-4 rounded-md border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 px-6 rounded-md bg-amber-500 hover:bg-amber-600 text-white font-medium text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "გამოწერა"
          )}
        </button>
      </form>
      {status !== "idle" && (
        <div
          className={`mt-3 text-sm flex items-center gap-2 ${
            status === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {status === "success" && <CheckCircle className="size-4" />}
          {message}
        </div>
      )}
    </div>
  )
}
