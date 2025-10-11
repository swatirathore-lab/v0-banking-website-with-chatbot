"use client"

import type React from "react"
import { useLanguage } from "@/components/language-provider"
import { useState, useRef, useEffect } from "react"

type Message = { role: "user" | "assistant"; content: string }

const getPredefinedResponses = (lang: "en" | "hi") =>
  lang === "hi"
    ? [
        {
          keywords: ["loan", "borrow", "ऋण", "लोन"],
          response: `मैं आपको ऋण विकल्पों में मार्गदर्शन कर सकता/सकती हूँ! उदाहरण:
• पर्सनल लोन: ₹15 लाख तक, 10.5% वार्षिक
• होम लोन: ₹50 लाख तक प्री-अप्रूव्ड, 8.75% वार्षिक
क्या आप आवेदन जारी रखना चाहेंगे या और विवरण जानना चाहेंगे?`,
        },
        {
          keywords: ["fraud", "security", "fraud check", "धोखाधड़ी", "सिक्योरिटी"],
          response: `🔒 धोखाधड़ी जाँच पूरी

जोखिम आकलन: कम ✓

हालिया गतिविधि स्कैन:
• ✓ सभी लेन-देन सामान्य खर्च पैटर्न में
• ✓ कोई असामान्य लॉगिन लोकेशन नहीं
• ✓ डिवाइस फिंगरप्रिंट अधिकृत डिवाइस से मेल खाते हैं
• ⚠️ 1 लेन-देन समीक्षा हेतु: ₹18,500 नए पेयी को (3 दिन पहले)

सक्रिय अलर्ट:
• रियल-टाइम लेन-देन मॉनिटरिंग: चालू
• भौगोलिक विसंगति पहचान: चालू
• बड़े लेन-देन अलर्ट (>₹50,000): चालू
• नए डिवाइस लॉगिन नोटिफिकेशन: चालू

सुझाव:
1) फ़्लैग किए गए लेन-देन की पुष्टि करें
2) ₹10,000 से ऊपर 2FA सक्षम करें
3) मोबाइल बैंकिंग के लिए बायोमेट्रिक सक्षम करें

क्या आप लेन-देन इतिहास देखना या सुरक्षा सेटिंग्स बदलना चाहेंगे?`,
        },
        {
          keywords: ["invest", "investment", "savings", "निवेश", "बचत"],
          response: `आपके लिए निवेश सुझाव:
• फिक्स्ड डिपॉज़िट: 7.5% वार्षिक
• म्यूचुअल फंड: 12–15% ऐतिहासिक रिटर्न वाले विविध फंड
• SIP: ₹5,000/माह से शुरू करें
क्या मैं इनमें से किसी विकल्प पर विस्तृत जानकारी दूँ?`,
        },
        {
          keywords: ["balance", "account", "summary", "बैलेंस", "खाता", "सारांश"],
          response: `आपका खाता सारांश:
• बचत खाता: ₹2,45,680
• चालू खाता: ₹5,12,340
• फिक्स्ड डिपॉज़िट: ₹10,00,000
क्या आप विस्तृत स्टेटमेंट या खर्च विश्लेषण चाहते हैं?`,
        },
        {
          keywords: ["hello", "hi", "नमस्ते"],
          response: `नमस्ते! मैं TARA, आपकी AI बैंकिंग सहायक हूँ। मैं आपकी किस प्रकार सहायता कर सकती हूँ?`,
        },
      ]
    : [
        {
          keywords: ["loan", "borrow"],
          response: `I can guide you with loan options! For example:
• Personal Loan: Up to ₹15 lakhs at 10.5% p.a.
• Home Loan: Pre-approved for ₹50 lakhs at 8.75% p.a.
Would you like to proceed with an application or learn more?`,
        },
        {
          keywords: ["fraud", "security", "fraud check"],
          response: `🔒 Fraud Detection Analysis Complete

**Risk Assessment: LOW ✓**

**Recent Activity Scan:**
• ✓ All transactions within normal spending patterns
• ✓ No unusual login locations detected
• ✓ Device fingerprints match authorized devices
• ⚠️ 1 transaction flagged for review: ₹18,500 to new payee (3 days ago)

**Proactive Alerts Active:**
• Real-time transaction monitoring: ON
• Geographic anomaly detection: ON
• Large transaction alerts (>₹50,000): ON
• New device login notifications: ON

**Recommendations:**
1. Review the flagged transaction - verify if legitimate
2. Enable 2FA for transactions above ₹10,000
3. Set up biometric authentication for mobile banking

Would you like to review your transaction history or adjust security settings?`,
        },
        {
          keywords: ["invest", "investment", "savings"],
          response: `Here are personalized investment recommendations:
• Fixed Deposit: 7.5% p.a.
• Mutual Funds: Diversified equity funds with 12-15% historical returns
• SIP: Start with ₹5,000/month for wealth building
Shall I provide detailed information on any of these options?`,
        },
        {
          keywords: ["balance", "account", "summary"],
          response: `Here's your account summary:
• Savings Account: ₹2,45,680
• Current Account: ₹5,12,340
• Fixed Deposits: ₹10,00,000
Would you like a detailed statement or spending analysis?`,
        },
        {
          keywords: ["hello", "hi"],
          response: `Hello! I'm TARA, your AI banking assistant. How can I assist you today?`,
        },
      ]

export function Chatbot({ inline = false, userStats }: { inline?: boolean; userStats?: any }) {
  const [open, setOpen] = useState(inline ? true : false)
  const { t, lang } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        lang === "hi"
          ? "नमस्ते! मैं TARA, आपकी AI बैंकिंग सहायक हूँ। मैं आपकी किस प्रकार सहायता कर सकती हूँ?"
          : "Hello! I'm TARA, your AI banking assistant. \n How may I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const responses = getPredefinedResponses(lang)

  async function sendMessage(e?: React.FormEvent, message?: string) {
    e?.preventDefault()
    const prompt = (message || input.trim()).toLowerCase()
    if (!prompt) return

    setMessages((prev) => [...prev, { role: "user", content: message || input.trim() }])
    setInput("")
    setLoading(true)

    setTimeout(() => {
      let response =
        lang === "hi"
          ? "मैं टाटा कैपिटल बैंकिंग सेवाओं में आपकी सहायता के लिए उपलब्ध हूँ।"
          : "I'm here to assist you with Tata Capital Banking services."

      if (prompt === "proceed with application" || prompt.includes("आवेदन")) {
        response =
          lang === "hi"
            ? `बहुत बढ़िया! आवेदन आगे बढ़ाने के लिए आपको ये दस्तावेज़ चाहिए:
1. पहचान प्रमाण (आधार, पैन, पासपोर्ट)
2. पते का प्रमाण (यूटिलिटी बिल, पासपोर्ट, रेंट एग्रीमेंट)
3. आय प्रमाण (सैलरी स्लिप, बैंक स्टेटमेंट, आईटीआर)
4. नौकरी विवरण (कंपनी, पद, अनुभव)
5. ऋण विवरण (राशि, उद्देश्य, अवधि)
क्या मैं अभी आवेदन शुरू कर दूँ?`
            : `Great! To proceed with your loan application, you'll need:
1. Proof of Identity (Aadhar, PAN, Passport)
2. Proof of Address (Utility bills, Passport, Rent Agreement)
3. Income Proof (Salary slips, Bank statements, ITRs)
4. Employment Details (Company, Designation, Experience)
5. Loan Details (Amount, Purpose, Tenure)
Shall I start the application now?`
      } else {
        for (const rule of responses) {
          if (rule.keywords.some((kw) => prompt.includes(kw))) {
            response = rule.response
            break
          }
        }
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }])
      setLoading(false)
      inputRef.current?.focus()
    }, 1000)
  }

  const quickActions = ["Check Balance", "Apply for Loan", "Investment Advice", "Security Check", "Fraud Check"]

  if (inline) {
    return (
      <div className="relative w-full rounded-lg border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="font-medium">{t("chat.title")}</div>
          <span className="text-xs text-muted-foreground">Powered by AI</span>
        </div>
        <div className="h-80 overflow-y-auto p-4">
          <ul className="space-y-3">
            {messages.map((m, i) => (
              <li key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <span
                  className={
                    m.role === "user"
                      ? "inline-block rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground"
                      : "inline-block rounded-md bg-accent px-3 py-2 text-sm"
                  }
                >
                  {m.content}
                </span>
              </li>
            ))}
            {loading && (
              <li className="text-left">
                <span className="inline-block rounded-md bg-accent px-3 py-2 text-sm">Typing…</span>
              </li>
            )}
          </ul>
          <div ref={messagesEndRef} />
        </div>
        <div className="flex flex-wrap gap-2 p-3">
          {quickActions.map((action) => (
            <button
              key={action}
              onClick={() => sendMessage(undefined, action)}
              className="px-3 py-1 rounded bg-primary text-white text-xs hover:bg-primary/80"
            >
              {action}
            </button>
          ))}
        </div>
        <form onSubmit={sendMessage} className="flex items-center gap-2 border-t border-border p-3">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("chat.placeholder")}
            className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {t("chat.send")}
          </button>
        </form>
      </div>
    )
  }

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Banking assistant"
          className="fixed inset-0 z-50 flex items-end md:items-center md:justify-end"
        >
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} aria-hidden />
          <div className="relative m-4 w-full max-w-sm rounded-lg border border-border bg-card shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="font-medium">{t("chat.title")}</div>
              <button
                aria-label="Close assistant"
                onClick={() => setOpen(false)}
                className="rounded-md border border-border px-2 py-1 text-sm"
              >
                {t("chat.close")}
              </button>
            </div>

            <div className="h-80 overflow-y-auto p-4">
              <ul className="space-y-3">
                {messages.map((m, i) => (
                  <li key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                    <span
                      className={
                        m.role === "user"
                          ? "inline-block rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground"
                          : "inline-block rounded-md bg-accent px-3 py-2 text-sm"
                      }
                    >
                      {m.content}
                    </span>
                  </li>
                ))}
                {loading && (
                  <li className="text-left">
                    <span className="inline-block rounded-md bg-accent px-3 py-2 text-sm">Typing…</span>
                  </li>
                )}
              </ul>
              <div ref={messagesEndRef} />
            </div>

            <div className="flex flex-wrap gap-2 p-3">
              {quickActions.map((action) => (
                <button
                  key={action}
                  onClick={() => sendMessage(undefined, action)}
                  className="px-3 py-1 rounded bg-primary text-white text-xs hover:bg-primary/80"
                >
                  {action}
                </button>
              ))}
            </div>

            <form onSubmit={sendMessage} className="flex items-center gap-2 border-t border-border p-3">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("chat.placeholder")}
                className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
              >
                {t("chat.send")}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbot
