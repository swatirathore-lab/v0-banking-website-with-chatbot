import Link from "next/link"
import { Chatbot } from "@/components/chatbot"

export default function AgentPage() {
  const userStats = {
    name: "Arian Zesan",
    balances: { checking: 28324, savings: 14500 },
    monthlySpend: 1999,
    creditScore: 742,
    loans: [
      { type: "Home Loan", amount: 1200000, rate: 8.5 },
      { type: "Auto Loan", amount: 350000, rate: 9.2 },
    ],
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-background">
      <section className="mx-auto max-w-6xl px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent transition"
        >
          ← Back to Website
        </Link>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 rounded-2xl border border-border bg-white p-4">
            <h1 className="text-2xl font-bold">Agentic Advisor</h1>
            <p className="mt-2 text-black text-black">
              Ask anything about your accounts, onboarding, or planning. I’ll use your snapshot to give precise, helpful
              answers.
            </p>
            <div className="mt-4">
              <Chatbot inline userStats={userStats} />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-4 shadow-xl">
              <h2 className="text-lg font-semibold bg-primary text-popover text-center">What I can do</h2>
              <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground space-y-2">
                <li className="text-foreground">Default Prediction</li>
                <li className="text-foreground">Automated Fraud Detection</li>
               
                <li className="text-foreground">Seamless Onboarding Guidance</li>
                <li className="text-foreground">Customer Support</li>
                <li className="text-foreground">Optimized Treasury Management (guidance only)</li>
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h2 className="text-lg font-semibold">Your Snapshot</h2>
              <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-foreground leading-7 tracking-normal">Checking</dt>
                  <dd className="font-medium">₹{userStats.balances.checking.toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="text-foreground">Savings</dt>
                  <dd className="font-medium">₹{userStats.balances.savings.toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="bg-background text-foreground">Monthly Spend</dt>
                  <dd className="font-medium">₹{userStats.monthlySpend.toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="text-foreground">Credit Score</dt>
                  <dd className="font-medium">{userStats.creditScore}</dd>
                </div>
              </dl>
              <div className="mt-4 rounded-md border border-border p-3 bg-accent">
                <div className="text-sm font-medium">Active Loans</div>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  {userStats.loans.map((l, i) => (
                    <li key={i} className="flex items-center justify-between">
                      <span className="text-foreground">{l.type}</span>
                      <span>
                        ₹{l.amount.toLocaleString()} @ {l.rate}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
