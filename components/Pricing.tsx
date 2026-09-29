"use client";

import { useState } from "react";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const plans = {
    monthly: [
      {
        name: "Basic",
        icon: "⚡",
        price: "$7.99",
        period: "/month",
        description: "Perfect for casual learners",
        features: [
          "8,000 monthly credits (words — shared across study tools & Song It)",
          "Song It: up to 600 words per request · basic engine · tuned for detectors (incl. GPTZero-style mode)",
          "Study & generation: up to 20,000 words per request",
          "15 max study sets",
          "Unlimited Solve AI (text & image) · unlimited paper grader · AI tutor & editor (within credits)",
          "1 essay review / mo",
          "Flashcards, MCQ, Fill, Short · Text, PDF, DOCX",
          "Standard priority on AI generations · customer support",
        ],
        cta: "Get Basic",
        highlighted: false,
        badge: null,
      },
      {
        name: "Pro",
        icon: "⚡",
        price: "$19.99",
        period: "/month",
        description: "For serious students",
        features: [
          "40,000 monthly credits (words)",
          "Song It: up to 2,000 words per request · advanced engine · faster / high-priority processing",
          "Study & generation: up to 75,000 words per request",
          "YouTube & URL support · unlimited study sets",
          "Unlimited Solve AI · paper grader · tutor & editor (within credits)",
          "5 essay reviews / mo · Tutor, Notes, Quiz modes · advanced analytics",
          "Priority email support",
        ],
        cta: "Get Pro",
        highlighted: true,
        badge: "POPULAR",
      },
      {
        name: "Ultra",
        icon: "⚡",
        price: "$39.99",
        period: "/month",
        description: "For power users & teams",
        features: [
          "90,000 monthly credits (words)",
          "Song It: up to 3,000 words per request · advanced engine · priority processing",
          "Study & generation: up to 200,000 words per request",
          "All sources & study modes · unlimited study sets",
          "Unlimited Solve AI · paper grader · tutor & essay reviews (within credits)",
          "Team study groups · advanced analytics · dedicated support options (plan-dependent)",
        ],
        cta: "Get Ultra",
        highlighted: false,
        badge: null,
      },
    ],
    yearly: [
      {
        name: "Basic",
        icon: "⚡",
        price: "$3.99",
        period: "/mo · billed yearly",
        description: "Perfect for casual learners",
        features: [
          "8,000 monthly credits (words — shared across study tools & Song It)",
          "Song It: up to 600 words per request · basic engine · tuned for detectors (incl. GPTZero-style mode)",
          "Study & generation: up to 20,000 words per request",
          "15 max study sets",
          "Unlimited Solve AI (text & image) · unlimited paper grader · AI tutor & editor (within credits)",
          "1 essay review / mo",
          "Flashcards, MCQ, Fill, Short · Text, PDF, DOCX",
          "Standard priority on AI generations · customer support",
        ],
        cta: "Get Basic",
        highlighted: false,
        badge: null,
      },
      {
        name: "Pro",
        icon: "⚡",
        price: "$9.99",
        period: "/mo · billed yearly",
        description: "For serious students",
        features: [
          "40,000 monthly credits (words)",
          "Song It: up to 2,000 words per request · advanced engine · faster / high-priority processing",
          "Study & generation: up to 75,000 words per request",
          "YouTube & URL support · unlimited study sets",
          "Unlimited Solve AI · paper grader · tutor & editor (within credits)",
          "5 essay reviews / mo · Tutor, Notes, Quiz modes · advanced analytics",
          "Priority email support",
        ],
        cta: "Get Pro",
        highlighted: true,
        badge: "POPULAR",
      },
      {
        name: "Ultra",
        icon: "⚡",
        price: "$19.99",
        period: "/mo · billed yearly",
        description: "For power users & teams",
        features: [
          "90,000 monthly credits (words)",
          "Song It: up to 3,000 words per request · advanced engine · priority processing",
          "Study & generation: up to 200,000 words per request",
          "All sources & study modes · unlimited study sets",
          "Unlimited Solve AI · paper grader · tutor & essay reviews (within credits)",
          "Team study groups · advanced analytics · dedicated support options (plan-dependent)",
        ],
        cta: "Get Ultra",
        highlighted: false,
        badge: null,
      },
    ],
  };

  const currentPlans = plans[billingCycle];

  return (
    <section id="pricing" className="relative py-32 bg-[#0A0F0D]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Simple, transparent
            <span className="block mt-2 bg-gradient-to-r from-[#5eead4] to-[#7dd3c0] bg-clip-text text-transparent">
              pricing for everyone
            </span>
          </h2>
          <p className="text-lg text-gray-400 mb-10">
            Choose the plan that fits your learning goals. Always flexible, cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 bg-[#0f1612] rounded-full p-1.5 border border-[#1a2420]">
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

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {currentPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 transition-all ${
                plan.highlighted
                  ? "bg-[#1f2937] border-2 border-[#5eead4]/30 shadow-2xl shadow-[#1a3329]/50"
                  : "bg-[#111827] border border-[#1f2937] hover:border-[#374151]"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 right-6">
                  <span className="bg-[#5eead4] text-[#0A0F0D] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <span>⚡</span> {plan.badge}
                  </span>
                </div>
              )}

              {/* Icon & Plan Name */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg">
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
              </div>

              {/* Price */}
              <div className="mb-2">
                <span className="text-5xl font-bold text-white">{plan.price}</span>
                <span className="text-base text-gray-400 ml-1">{plan.period}</span>
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-3.5 px-6 rounded-xl font-bold mb-8 mt-6 transition-all flex items-center justify-center gap-2 ${
                  plan.highlighted
                    ? "bg-white text-[#0A0F0D] hover:bg-gray-100 shadow-lg"
                    : "bg-[#1f2937] text-white hover:bg-[#374151] border border-[#374151]"
                }`}
              >
                {plan.cta}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              {/* Features List */}
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

              {/* Footer Note */}
              <p className="text-center text-gray-500 text-xs mt-8 pt-6 border-t border-[#1f2937]">
                No hidden fees · Cancel anytime
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-center text-gray-500 mt-16 text-sm">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}
