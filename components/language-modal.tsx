"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "./language-provider"

export function LanguageModal() {
  const { open, t, choose } = useLanguage()
  const [remember, setRemember] = useState(false)

  // prevent background scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = ""
      }
    }
  }, [open])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Language selection"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black/40" aria-hidden />
      <div className="relative mx-4 w-full max-w-lg rounded-xl bg-card p-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-md bg-primary" aria-hidden />
          <span className="sr-only">{t("header.brand")}</span>
        </div>

        <div className="mt-4">
          <h2 className="text-center text-xl font-semibold">{t("lang.modal.title")}</h2>
          <p className="mt-1 text-center text-muted-foreground">{t("lang.modal.subtitle")}</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => choose("hi", remember)}
            className="rounded-md bg-primary px-5 py-3 text-primary-foreground font-medium"
            aria-label={t("lang.modal.hindi")}
          >
            {t("lang.modal.hindi")}
          </button>
          <button
            onClick={() => choose("en", remember)}
            className="rounded-md bg-primary px-5 py-3 text-primary-foreground font-medium"
            aria-label={t("lang.modal.english")}
          >
            {t("lang.modal.english")}
          </button>
        </div>

        <label className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            className="h-4 w-4 border-border"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          {t("lang.modal.remember")}
        </label>
      </div>
    </div>
  )
}
