"use client"

import type React from "react"
import { useLanguage } from "@/components/language-provider"
import { useState, useRef, useEffect } from "react"

type Message = { role: "user" | "assistant"; content: string }

const predefinedResponses: { keywords: string[]; response: string }[] = [
  {
    keywords: ["loan", "borrow"],
    response: `I can guide you with loan options! For example:
• Personal Loan: Up to ₹15 lakhs at 10.5% p.a.
• Home Loan: Pre-approved for ₹50 lakhs at 8.75% p.a.
Would you like to proceed with an application or learn more?`,
  },
  {
    keywords: ["fraud", "security"],
    response: `Your account security is our priority. Our AI monitors:
• Unusual spending patterns
• Login attempts from new devices
• Large or international transactions
All systems are secure. Would you like to review recent activity or set up additional alerts?`,
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
  const { t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hello! I'm TARA, your AI banking assistant. \n How may I help you today?`,
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll chat to bottom on new message
  const messagesEndRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

async function sendMessage(e?: React.FormEvent, message?: string) {
  e?.preventDefault()
  const prompt = (message || input.trim()).toLowerCase()
  if (!prompt) return

  // Add user message
  setMessages((prev) => [
    ...prev,
    { role: "user", content: message || input.trim() },
  ])
  setInput("")
  setLoading(true)

  setTimeout(() => {
    let response = "I'm here to assist you with Tata Capital Banking services."

    // Check for 'proceed with application'
    if (prompt === "proceed with application") {
      response = `Great! To proceed with your loan application, you'll need to provide the following:
1. Proof of Identity (Aadhar, PAN, Passport, etc.)
2. Proof of Address (Utility bills, Passport, Rent Agreement)
3. Income Proof (Salary slips, Bank statements, ITRs)
4. Employment Details (Company name, Designation, Experience)
5. Loan Details (Amount required, Purpose, Tenure)

Please make sure you have these documents ready. Would you like me to start the application process now?`
    } else {
      // Match predefined responses
      for (const rule of predefinedResponses) {
        if (rule.keywords.some((kw) => prompt.includes(kw))) {
          response = rule.response
          break
        }
      }
    }

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: response },
    ])
    setLoading(false)
    inputRef.current?.focus()
  }, 1000)
}

  const quickActions = ["Check Balance", "Apply for Loan", "Investment Advice", "Security Check"]

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
