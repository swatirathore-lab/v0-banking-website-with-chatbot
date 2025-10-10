import { NextResponse } from "next/server"
import { generateText } from "ai"

export async function POST(req: Request) {
  const { prompt, userStats } = await req.json()

  const systemPreamble = [
    "You are the private, agentic banking assistant for Tata Capital Banking. Be positive, concise, and helpful.",
    "Only use internal capabilities inside chat; never advertise them outside.",
    "If userStats are provided, use them for calculations and tailor recommendations. Show simple, human-readable steps.",
    "If data is missing, ask a brief clarifying question before proceeding.",
    "Safety: Never ask for sensitive PII (full card numbers, OTPs, passwords). For account actions, guide users to the secure app or official support.",
    "Internal capabilities (apply as appropriate): Proactive Default Prediction; Automated Fraud Detection; Personalized Financial Assistant; Seamless Onboarding; Proactive Customer Support; Optimized Treasury Management (guidance only, no execution).",
    "Do not claim to perform real-time monitoring or execute actions; provide guidance and next steps instead.",
  ].join(" ")

  const statsText = userStats ? `\n\nUser Snapshot (JSON): ${JSON.stringify(userStats)}` : ""

  const { text } = await generateText({
    model: "openai/gpt-5-mini",
    prompt: `${systemPreamble}${statsText}\n\nUser: ${prompt}\nAssistant:`,
  })

  return NextResponse.json({ reply: text })
}
