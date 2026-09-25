"use client";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out StudyHelper",
      features: [
        "Up to 50 flashcards",
        "5 AI-generated quizzes per month",
        "Basic study analytics",
        "Mobile app access",
        "Community support",
      ],
      cta: "Get Started Free",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$12",
      period: "per month",
      description: "For serious students and learners",
      features: [
        "Unlimited flashcards",
        "Unlimited AI quizzes",
        "Advanced analytics & insights",
        "Priority AI processing",
        "Export to PDF/Anki",
        "Ad-free experience",
        "Priority support",
      ],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Team",
      price: "$29",
      period: "per month",
      description: "For study groups and classrooms",
      features: [
        "Everything in Pro",
        "Up to 10 team members",
        "Shared study sets",
        "Team analytics dashboard",
        "Collaboration tools",
        "Admin controls",
        "Dedicated support",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-32 bg-[#0A0F0D]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Simple, transparent
            <span className="block mt-2 bg-gradient-to-r from-[#5eead4] to-[#7dd3c0] bg-clip-text text-transparent">
              pricing for everyone
            </span>
          </h2>
          <p className="text-lg text-gray-400">
            Choose the plan that fits your learning goals. Always flexible, cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all ${
                plan.highlighted
                  ? "bg-[#1a3329] border-2 border-[#5eead4]/30 shadow-2xl shadow-[#1a3329]/50 scale-105"
                  : "bg-[#0f1612] border border-[#1a2420] hover:border-[#2d4a3d]"
              }`}
            >
              {/* Most Popular Badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-[#5eead4] text-[#0A0F0D] px-4 py-1.5 rounded-full text-sm font-bold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? "text-white" : "text-white"}`}>
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-4">
                <span className={`text-5xl font-bold ${plan.highlighted ? "text-white" : "text-white"}`}>
                  {plan.price}
                </span>
                <span className={`text-lg ml-2 ${plan.highlighted ? "text-gray-300" : "text-gray-400"}`}>
                  {plan.period}
                </span>
              </div>

              {/* Description */}
              <p className={`mb-8 ${plan.highlighted ? "text-gray-300" : "text-gray-400"}`}>
                {plan.description}
              </p>

              {/* CTA Button */}
              <button
                className={`w-full py-3.5 px-6 rounded-xl font-semibold mb-8 transition-all ${
                  plan.highlighted
                    ? "bg-[#5eead4] text-[#0A0F0D] hover:bg-[#7dd3c0]"
                    : "bg-[#1a3329] text-[#5eead4] hover:bg-[#234d3a] border border-[#2d4a3d]"
                }`}
              >
                {plan.cta}
              </button>

              {/* Features List */}
              <ul className="space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        plan.highlighted ? "text-[#5eead4]" : "text-[#5eead4]"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={`text-sm ${plan.highlighted ? "text-gray-200" : "text-gray-300"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-center text-gray-500 mt-16 text-sm">
          All plans include a 14-day free trial. No credit card required. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
