"use client"

import { useLanguage } from "@/components/language-provider"

export function About() {
  const { t } = useLanguage()
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-12 md:py-16 bg-section">
      <div className="rounded-lg border border-border bg-card p-6 md:p-10">
        <h2 className="text-2xl md:text-3xl font-semibold">{t("about.title")}</h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">{t("about.body")}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4 reveal-up">
          <div className="rounded-md border border-border p-4">
            <div className="text-xl font-semibold">10M+</div>
            <div className="text-sm text-muted-foreground">{t("about.metrics.customers")}</div>
          </div>
          <div className="rounded-md border border-border p-4">
            <div className="text-xl font-semibold">24x7</div>
            <div className="text-sm text-muted-foreground">{t("about.metrics.support")}</div>
          </div>
          <div className="rounded-md border border-border p-4">
            <div className="text-xl font-semibold">Tier‑1</div>
            <div className="text-sm text-muted-foreground">{t("about.metrics.security")}</div>
          </div>
          <div className="rounded-md border border-border p-4">
            <div className="text-xl font-semibold">PAN‑India</div>
            <div className="text-sm text-muted-foreground">{t("about.metrics.coverage")}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
