"use client"

import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { LanguageModal } from "./language-modal"

type Lang = "en" | "hi"
type Dict = Record<string, string>

const en: Dict = {
  "header.brand": "Tata Capital Banking",
  "header.services": "Services",
  "header.about": "About",
  "header.contact": "Contact",
  "header.openAccount": "Open Account",

  "hero.title": "BANKING THAT PUTS YOUR GOALS FIRST",
  "hero.subtitle":
    "From everyday accounts to long‑term investments, Tata Capital Banking helps you save, grow, and move your money with confidence.",
  "hero.explore": "Explore Services",
  "hero.advisor": "Talk to an Advisor",
  "hero.snapshot": "Quick snapshot",
  "hero.yield": "High‑yield savings",
  "hero.fees": "On everyday banking",
  "hero.support": "Support availability",
  "hero.security": "Security & compliance",

  "services.title": "Services",
  "services.subtitle": "Everything you need to manage money confidently—built on reliability and trust.",
  "services.learnMore": "Learn more",
  "services.personal.title": "Personal Loans",
  "services.personal.desc":
    "Fast approvals and flexible repayment options to fund your goals—education, home upgrades, and more.",
  "services.cards.title": "Credit Cards",
  "services.cards.desc": "Rewards for your everyday spends, zero hidden charges, and robust fraud protection.",
  "services.invest.title": "Investments",
  "services.invest.desc": "Diversified options from fixed deposits to mutual funds with transparent guidance.",
  "services.ins.title": "Insurance",
  "services.ins.desc": "Protect what matters most with comprehensive life, health, and asset coverage.",

  "about.title": "About Tata Capital Banking",
  "about.body":
    "We combine modern digital experiences with robust governance and risk controls. Our mission is to help individuals and businesses grow with confidence—through transparent products, fair pricing, and dedicated support.",
  "about.metrics.customers": "Customers served",
  "about.metrics.support": "Dedicated support",
  "about.metrics.security": "Security standards",
  "about.metrics.coverage": "Coverage & partners",

  "footer.company": "Company",
  "footer.support": "Support",
  "footer.legal": "Legal",
  "footer.copyright": "All rights reserved.",

  "chat.open": "Talk to an Advisor",
  "chat.title": "Assistant",
  "chat.close": "Close",
  "chat.placeholder": "Type your question…",
  "chat.send": "Send",

  "lang.modal.title": "Select Your Preferred Language To Enter The Website",
  "lang.modal.subtitle": "वेबसाइट में प्रवेश के लिए अपनी पसंदीदा भाषा का चयन करें",
  "lang.modal.remember": "Remember my choice",
  "lang.modal.hindi": "Hindi",
  "lang.modal.english": "English",
}

const hi: Dict = {
  "header.brand": "टाटा कैपिटल बैंकिंग",
  "header.services": "सेवाएँ",
  "header.about": "परिचय",
  "header.contact": "संपर्क",
  "header.openAccount": "खाता खोलें",

  "hero.title": "आपके लक्ष्यों को प्राथमिकता देने वाला बैंकिंग अनुभव",
  "hero.subtitle":
    "दैनिक खातों से लेकर दीर्घकालिक निवेश तक—टाटा कैपिटल बैंकिंग आपको आत्मविश्वास के साथ अपनी धनराशि बचाने, बढ़ाने और प्रबंधित करने में मदद करता है।",
  "hero.explore": "सेवाएँ देखें",
  "hero.advisor": "सलाहकार से बात करें",
  "hero.snapshot": "त्वरित झलक",
  "hero.yield": "उच्च-ब्याज बचत",
  "hero.fees": "दैनिक बैंकिंग पर 0 शुल्क",
  "hero.support": "24x7 सहायता",
  "hero.security": "सुरक्षा और अनुपालन",

  "services.title": "सेवाएँ",
  "services.subtitle": "विश्वसनीयता और भरोसे पर आधारित—आत्मविश्वास के साथ धन प्रबंधन के लिए आपकी सभी जरूरतें।",
  "services.learnMore": "और जानें",
  "services.personal.title": "पर्सनल लोन",
  "services.personal.desc": "तेजी से स्वीकृति और लचीली पुनर्भुगतान—शिक्षा, गृह सुधार और अन्य लक्ष्यों के लिए।",
  "services.cards.title": "क्रेडिट कार्ड",
  "services.cards.desc": "रोज़मर्रा के खर्चों पर रिवॉर्ड, बिना छिपे शुल्क, और मजबूत धोखाधड़ी सुरक्षा।",
  "services.invest.title": "निवेश",
  "services.invest.desc": "फिक्स्ड डिपॉजिट से म्यूचुअल फंड तक विविध विकल्प, पारदर्शी मार्गदर्शन के साथ।",
  "services.ins.title": "बीमा",
  "services.ins.desc": "जीवन, स्वास्थ्य और परिसंपत्तियों के व्यापक कवरेज के साथ जो महत्वपूर्ण है उसकी सुरक्षा करें।",

  "about.title": "टाटा कैपिटल बैंकिंग के बारे में",
  "about.body":
    "हम आधुनिक डिजिटल अनुभवों को मजबूत गवर्नेंस और जोखिम नियंत्रणों के साथ जोड़ते हैं। हमारा उद्देश्य पारदर्शी उत्पादों, उचित मूल्य निर्धारण और समर्पित सहायता के माध्यम से व्यक्तियों और व्यवसायों को आत्मविश्वास से आगे बढ़ने में मदद करना है।",
  "about.metrics.customers": "सेवित ग्राहक",
  "about.metrics.support": "समर्पित सहायता",
  "about.metrics.security": "सुरक्षा मानक",
  "about.metrics.coverage": "कवरेज और भागीदार",

  "footer.company": "कंपनी",
  "footer.support": "सहायता",
  "footer.legal": "कानूनी",
  "footer.copyright": "सर्वाधिकार सुरक्षित।",

  "chat.open": "सलाहकार से बात करें",
  "chat.title": "सहायक",
  "chat.close": "बंद करें",
  "chat.placeholder": "अपना प्रश्न लिखें…",
  "chat.send": "भेजें",

  "lang.modal.title": "वेबसाइट में प्रवेश के लिए अपनी पसंदीदा भाषा चुनें",
  "lang.modal.subtitle": "Select your preferred language to enter the website",
  "lang.modal.remember": "मेरी पसंद याद रखें",
  "lang.modal.hindi": "हिंदी",
  "lang.modal.english": "English",
}

type Ctx = {
  lang: Lang
  t: (key: string) => string
  setLang: (l: Lang) => void
  // modal control
  open: boolean
  choose: (l: Lang, remember: boolean) => void
  openModal: () => void
}

const LanguageContext = createContext<Ctx | null>(null)

const STORAGE_KEY = "bank-lang"
const STORAGE_REMEMBER = "bank-lang-remember"

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en")
  const [open, setOpen] = useState<boolean>(true)

  // initialize from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null
      if (saved) {
        setLang(saved)
        setOpen(false)
      } else {
        setOpen(true)
      }
    } catch {
      setOpen(true)
    }
  }, [])

  // reflect in <html lang="">
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang
    }
  }, [lang])

  const t = useMemo(() => {
    const d = lang === "hi" ? hi : en
    return (key: string) => d[key] ?? key
  }, [lang])

  const choose = (l: Lang, remember: boolean) => {
    setLang(l)
    setOpen(false)
    try {
      localStorage.setItem(STORAGE_KEY, l)
      localStorage.setItem(STORAGE_REMEMBER, "true")
    } catch {
      // ignore
    }
  }

  const openModal = () => {
    setOpen(true)
  }

  return (
    <LanguageContext.Provider value={{ lang, t, setLang, open, choose, openModal }}>
      {children}
      <LanguageModal />
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
