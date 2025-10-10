"use client"

import { useLanguage } from "@/components/language-provider"

export function SiteFooter() {
  const { t } = useLanguage()
  return (
    <footer id="contact" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-primary" aria-hidden />
              <span className="font-semibold">{t("header.brand")}</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Trusted solutions for savings, credit, and investments—built on reliability.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">{t("footer.company")}</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#about" className="hover:text-primary">
                  {t("header.about")}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-primary">
                  {t("header.services")}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary">
                  {t("header.contact")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">{t("footer.support")}</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Accessibility
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">{t("footer.legal")}</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Disclosures
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {t("header.brand")}. {t("footer.copyright")}
        </p>
      </div>
    </footer>
  )
}
