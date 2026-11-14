export const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 49,
    tagline: "Everything you need to build a consistent training routine.",
    popular: false,
    features: [
      "Full gym access",
      "Locker & shower access",
      "Welcome fitness assessment",
      "Access to selected classes",
    ],
    extras: ["Flexible training hours"],
  },
  {
    id: "performance",
    name: "Performance",
    price: 79,
    tagline:
      "Our most complete membership for members who want more from their training.",
    popular: true,
    features: [
      "Everything in Starter",
      "Unlimited group classes",
      "Monthly progress review",
      "Priority class booking",
    ],
    extras: ["One fitness consultation"],
  },
  {
    id: "elite",
    name: "Elite",
    price: 129,
    tagline:
      "Premium coaching and support for members ready to take things further.",
    popular: false,
    features: [
      "Everything in Performance",
      "2 personal training sessions",
      "Personal training plan",
      "Nutrition guidance",
    ],
    extras: ["Recovery area access"],
  },
]

// true = included, false = not included, string = shown as text
// values are in the same order as `plans` above
export const comparison = [
  { label: "Gym access", values: [true, true, true] },
  { label: "Locker & shower access", values: [true, true, true] },
  { label: "Flexible training hours", values: [true, true, true] },
  { label: "Welcome fitness assessment", values: [true, true, true] },
  { label: "Group classes", values: ["Selected classes", "Unlimited", "Unlimited"] },
  { label: "Priority class booking", values: [false, true, true] },
  { label: "Monthly progress review", values: [false, true, true] },
  { label: "Fitness consultation", values: [false, true, true] },
  { label: "Personal training sessions", values: [false, false, "2 sessions"] },
  { label: "Personal training plan", values: [false, false, true] },
  { label: "Nutrition guidance", values: [false, false, true] },
  { label: "Recovery area access", values: [false, false, true] },
]

export const faqs = [
  {
    q: "Is there a contract?",
    a: "No. All memberships are month-to-month. Cancel anytime before your next billing date.",
  },
  {
    q: "Can I change my plan later?",
    a: "Yes. You can move up or down between plans, and the change applies from your next billing date.",
  },
  {
    q: "I'm new to training. Is that okay?",
    a: "Absolutely. Every plan starts with a welcome fitness assessment, and our coaches will help you find the right starting point.",
  },
  {
    q: "How do I join and pay?",
    a: "Choose a plan and book your first visit online. Payment is handled at the gym for now.",
  },
]