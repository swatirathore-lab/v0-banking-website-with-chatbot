export const defaultUserStats = {
  name: "Arian Zesan",
  accounts: [
    { type: "Checking", balance: 4235.12, currency: "$" },
    { type: "Savings", balance: 18250.0, currency: "$" },
  ],
  monthlyIncome: 7200,
  monthlyExpenses: 4150,
  creditScore: 754,
  loans: [
    { kind: "Auto", principal: 18000, apr: 4.1, remaining: 9200 },
    { kind: "Credit Card", principal: 3000, apr: 20.9, remaining: 1250 },
  ],
} as const
