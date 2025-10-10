"use client"

import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/language-provider"

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { t, openModal } = useLanguage()
  return (
    <header className="w-full border-b border-border bg-background/80 sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={openModal}
            className="rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:bg-accent transition"
            aria-label="Change language"
          >
            Language
          </button>
          <Link href="/" className="flex items-center gap-2" aria-label={t("header.brand")}>
          
            <span className="font-semibold">{t("header.brand")}</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#services" className="text-sm hover:text-primary">
            {t("header.services")}
          </a>
          <a href="#about" className="text-sm hover:text-primary">
            {t("header.about")}
          </a>
          <a href="#contact" className="text-sm hover:text-primary">
            {t("header.contact")}
          </a>
          <a
            href="#cta"
            className={cn(
              "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium",
              "bg-primary text-primary-foreground hover:opacity-90",
            )}
          >
            {t("header.openAccount")}
          </a>
        </nav>

        <button
          aria-label="Toggle Menu"
          className="md:hidden inline-flex items-center justify-center rounded-md border border-border px-3 py-2"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Toggle menu</span>
          <div className="h-4 w-6">
            <div className="h-0.5 w-full bg-foreground mb-1" />
            <div className="h-0.5 w-full bg-foreground mb-1" />
            <div className="h-0.5 w-full bg-foreground" />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border">
          <nav className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3">
            <a href="#services" className="text-sm">
              {t("header.services")}
            </a>
            <a href="#about" className="text-sm">
              {t("header.about")}
            </a>
            <a href="#contact" className="text-sm">
              {t("header.contact")}
            </a>
            <a
              href="#cta"
              className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-primary text-primary-foreground"
            >
              {t("header.openAccount")}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
