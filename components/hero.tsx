"use client"

import { useLanguage } from "@/components/language-provider"

export function Hero() {
  const { t } = useLanguage()
  return (
    <section id="cta" className="relative overflow-hidden bg-section">
      <div className="hero-gradient">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-20 grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-semibold text-balance reveal-up">
              {t("BANKING THAT PUTS YOUR GOALS FIRST")}
            </h1>
            <p className="mt-4 leading-relaxed text-pretty text-black text-black">{t("hero.subtitle")}</p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#services"
                className="rounded-md bg-primary px-5 py-2.5 font-medium text-primary-foreground text-base"
              >
                {t("hero.explore")}
              </a>
              <a
                href="/agent"
                className="rounded-md border border-border px-5 py-2.5 font-medium hover:bg-accent transition text-primary text-base"
              >
                {t("hero.advisor") || "Talk to an Advisor"}
              </a>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 reveal-up delay-150">
            <h2 className="font-medium text-lg text-foreground">{t("hero.snapshot")}</h2>
            <ul className="mt-4 grid grid-cols-2 gap-4">
              <li className="rounded-md border border-border p-4 transition-transform hover:-translate-y-0.5">
                <div className="text-2xl font-semibold">4.25%</div>
                <div className="text-sm text-muted-foreground">{t("hero.yield")}</div>
              </li>
              <li className="rounded-md border border-border p-4 transition-transform hover:-translate-y-0.5">
                <div className="text-2xl font-semibold">0₹</div>
                <div className="text-sm text-muted-foreground">{t("hero.fees")}</div>
              </li>
              <li className="rounded-md border border-border p-4 transition-transform hover:-translate-y-0.5">
                <div className="text-2xl font-semibold">24x7</div>
                <div className="text-sm text-muted-foreground">{t("hero.support")}</div>
              </li>
              <li className="rounded-md border border-border p-4 transition-transform hover:-translate-y-0.5">
                <div className="text-2xl font-semibold">Tier‑1</div>
                <div className="text-sm text-muted-foreground">{t("hero.security")}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* floating bubbles */}
      <span className="pointer-events-none absolute right-10 top-10 h-24 w-24 rounded-full bg-accent/40 blur-md float-bubble" />
      <span className="pointer-events-none absolute right-28 bottom-8 h-16 w-16 rounded-full bg-primary/40 blur-md float-bubble-slow" />
    </section>
  )
}
