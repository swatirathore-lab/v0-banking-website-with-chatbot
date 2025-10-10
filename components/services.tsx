"use client"

import { useLanguage } from "@/components/language-provider"

export function Services() {
  const { t } = useLanguage()
  const items = [
    {
      title: t("services.personal.title"),
      desc: t("services.personal.desc"),
    },
    {
      title: t("services.cards.title"),
      desc: t("services.cards.desc"),
    },
    {
      title: t("services.invest.title"),
      desc: t("services.invest.desc"),
    },
    {
      title: t("services.ins.title"),
      desc: t("services.ins.desc"),
    },
  ]

  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-12 md:py-16 bg-accent">
      <h2 className="text-2xl md:text-3xl font-semibold">{t("services.title")}</h2>
      <p className="mt-2 leading-relaxed text-card-foreground">{t("services.subtitle")}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.title}
            className="rounded-lg border border-border bg-card p-5 transition-transform hover:-translate-y-1"
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-popover-foreground">{item.desc}</p>
            <a href="#contact" className="mt-4 inline-flex text-sm text-primary underline-offset-4 hover:underline">
              {t("services.learnMore")}
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
