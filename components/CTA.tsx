"use client";

export default function CTA() {
  return (
    <section className="relative py-32 bg-[#0A0F0D] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a2420_1px,transparent_1px),linear-gradient(to_bottom,#1a2420_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1a3329] rounded-full blur-[150px] opacity-20" />

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="relative rounded-3xl border border-[#2d4a3d] bg-gradient-to-br from-[#1a3329] to-[#0f1612] p-12 md:p-16 text-center overflow-hidden">
          
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#5eead4]/5 to-transparent" />

          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to transform your
              <span className="block mt-2 bg-gradient-to-r from-[#5eead4] to-[#7dd3c0] bg-clip-text text-transparent">
                study routine?
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join thousands of students who are already learning smarter with AI-powered study tools.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="/dashboard"
                className="px-8 py-4 bg-[#5eead4] text-[#0A0F0D] text-lg font-bold rounded-xl hover:bg-[#7dd3c0] transition-all shadow-lg shadow-[#5eead4]/20 hover:shadow-[#5eead4]/40 group"
              >
                <span className="flex items-center gap-2">
                  Start Learning Free
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
              <a
                href="#pricing"
                className="px-8 py-4 bg-transparent text-gray-300 text-lg font-semibold rounded-xl border border-[#2d4a3d] hover:border-[#5eead4]/30 hover:text-white transition-all"
              >
                View Pricing
              </a>
            </div>

            {/* Small Print */}
            <p className="text-gray-500 text-sm mt-8">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
