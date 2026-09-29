"use client";

import { useState } from "react";

export default function PlanBillingPanel() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const plans = {
    monthly: [
      {
        name: "Basic",
        price: "$7.99",
        period: "/month",
        features: [
          "8,000 monthly credits (words — shared across study tools & Song It)",
          "Song It: up to 600 words per request",
          "Study & generation: up to 20,000 words per request",
          "15 max study sets",
          "Unlimited Solve AI · paper grader · AI tutor",
          "1 essay review / mo",
          "Flashcards, MCQ, Fill, Short · Text, PDF, DOCX",
        ],
        cta: "Get Basic",
        current: false,
      },
      {
        name: "Pro",
        price: "$19.99",
        period: "/month",
        features: [
          "40,000 monthly credits (words)",
          "Song It: up to 2,000 words per request",
          "Study & generation: up to 75,000 words per request",
          "YouTube & URL support · unlimited study sets",
          "Unlimited Solve AI · paper grader · tutor",
          "5 essay reviews / mo · advanced analytics",
          "Priority email support",
        ],
        cta: "Upgrade to Pro",
        current: false,
        popular: true,
      },
      {
        name: "Ultra",
        price: "$39.99",
        period: "/month",
        features: [
          "90,000 monthly credits (words)",
          "Song It: up to 3,000 words per request",
          "Study & generation: up to 200,000 words per request",
          "All sources & study modes · unlimited",
          "Unlimited Solve AI · paper grader · essay reviews",
          "Team study groups · advanced analytics",
          "Dedicated support options",
        ],
        cta: "Upgrade to Ultra",
        current: false,
      },
    ],
    yearly: [
      {
        name: "Basic",
        price: "$3.99",
        period: "/mo · billed yearly",
        features: [
          "8,000 monthly credits (words — shared across study tools & Song It)",
          "Song It: up to 600 words per request",
          "Study & generation: up to 20,000 words per request",
          "15 max study sets",
          "Unlimited Solve AI · paper grader · AI tutor",
          "1 essay review / mo",
          "Flashcards, MCQ, Fill, Short · Text, PDF, DOCX",
        ],
        cta: "Get Basic",
        current: false,
      },
      {
        name: "Pro",
        price: "$9.99",
        period: "/mo · billed yearly",
        features: [
          "40,000 monthly credits (words)",
          "Song It: up to 2,000 words per request",
          "Study & generation: up to 75,000 words per request",
          "YouTube & URL support · unlimited study sets",
          "Unlimited Solve AI · paper grader · tutor",
          "5 essay reviews / mo · advanced analytics",
          "Priority email support",
        ],
        cta: "Upgrade to Pro",
        current: false,
        popular: true,
      },
      {
        name: "Ultra",
        price: "$19.99",
        period: "/mo · billed yearly",
        features: [
          "90,000 monthly credits (words)",
          "Song It: up to 3,000 words per request",
          "Study & generation: up to 200,000 words per request",
          "All sources & study modes · unlimited",
          "Unlimited Solve AI · paper grader · essay reviews",
          "Team study groups · advanced analytics",
          "Dedicated support options",
        ],
        cta: "Upgrade to Ultra",
        current: false,
      },
    ],
  };

  const currentPlans = plans[billingCycle];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0b1e] via-[#0d0e24] to-[#0a0b1e] p-8">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Plan & Billing</h1>
            <p className="text-green-200/70 text-base mt-1">
              Manage your subscription and view usage
            </p>
          </div>
        </div>
      </div>

      {/* Current Plan Status */}
      <section className="mb-8">
        <div className="bg-gradient-to-br from-[#0c0d20] to-[#0a0b1e] rounded-3xl border border-green-500/20 p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Free Plan</h3>
              <p className="text-green-200/70 text-sm">Currently active</p>
            </div>
            <div className="text-right">
              <span className="inline-block bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold border border-green-500/30">
                ● Active
              </span>
            </div>
          </div>

          <div className="bg-[#080916] border border-green-500/30 rounded-2xl p-6 mb-6">
            <div className="mb-4">
              <h4 className="text-green-200/70 text-sm mb-2">Credits Used This Month</h4>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">292</span>
                <span className="text-green-300/50 text-lg">/ 300</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="bg-gray-800 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full"
                  style={{ width: "97%" }}
                ></div>
              </div>
            </div>

            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
              <p className="text-red-400 text-sm">
                <strong>⚠️ Running low on credits</strong> — consider upgrading your plan.
                Your monthly limit resets in <strong>30 days</strong>.
              </p>
            </div>
          </div>

          <p className="text-green-200/70 text-sm">
            💡 Resets: <strong>October 20, 2026 at 12:00 AM</strong>
          </p>
        </div>
      </section>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-3 bg-[#0c0d20] rounded-full p-1.5 border border-green-500/20">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${
              billingCycle === "monthly"
                ? "bg-white text-[#0A0F0D] shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all flex items-center gap-2 ${
              billingCycle === "yearly"
                ? "bg-white text-[#0A0F0D] shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Yearly
            <span className="bg-[#5eead4] text-[#0A0F0D] text-xs px-2 py-0.5 rounded-full font-bold">
              -50%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Plans */}
      <section className="grid md:grid-cols-3 gap-6 mb-8">
        {currentPlans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-3xl p-8 transition-all ${
              plan.popular
                ? "bg-[#1f2937] border-2 border-[#5eead4]/30 shadow-2xl"
                : "bg-[#111827] border border-[#1f2937] hover:border-[#374151]"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 right-6">
                <span className="bg-[#5eead4] text-[#0A0F0D] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <span>⚡</span> POPULAR
                </span>
              </div>
            )}

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg">
                ⚡
              </div>
              <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
            </div>

            <div className="mb-2">
              <span className="text-5xl font-bold text-white">{plan.price}</span>
              <span className="text-base text-gray-400 ml-1">{plan.period}</span>
            </div>

            <button
              className={`w-full py-3.5 px-6 rounded-xl font-bold mb-8 mt-6 transition-all flex items-center justify-center gap-2 ${
                plan.popular
                  ? "bg-white text-[#0A0F0D] hover:bg-gray-100 shadow-lg"
                  : "bg-[#1f2937] text-white hover:bg-[#374151] border border-[#374151]"
              }`}
            >
              {plan.cta}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            <ul className="space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#5eead4]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-300 leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>

            <p className="text-center text-gray-500 text-xs mt-8 pt-6 border-t border-[#1f2937]">
              No hidden fees · Cancel anytime
            </p>
          </div>
        ))}
      </section>

      {/* Billing History */}
      <section>
        <div className="bg-gradient-to-br from-[#0c0d20] to-[#0a0b1e] rounded-3xl border border-green-500/20 p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-600/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white">Billing History</h2>
          </div>

          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-300/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-green-200/70 text-lg">No billing history available yet</p>
            <p className="text-green-300/50 text-sm mt-2">Your invoices will appear here once you subscribe</p>
          </div>
        </div>
      </section>
    </div>
  );
}
