"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0A0F0D] overflow-hidden pt-16">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a2420_1px,transparent_1px),linear-gradient(to_bottom,#1a2420_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#1a3329] rounded-full blur-[128px] opacity-20" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#234d3a] rounded-full blur-[128px] opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a3329]/50 border border-[#2d4a3d] rounded-full mb-8 backdrop-blur-sm">
          <div className="w-2 h-2 bg-[#5eead4] rounded-full animate-pulse" />
          <span className="text-sm font-medium text-[#5eead4]">AI-Powered Study Platform</span>
        </div>

        {/* Headline */}
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
          <span className="text-white">Transform Your</span>
          <br />
          <span className="bg-gradient-to-r from-[#5eead4] via-[#7dd3c0] to-[#5eead4] bg-clip-text text-transparent">
            Study Experience
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
          Create flashcards, generate quizzes, and master any subject with the power of artificial intelligence.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a 
            href="/dashboard"
            className="px-8 py-4 bg-[#1a3329] text-[#5eead4] text-lg font-semibold rounded-xl hover:bg-[#234d3a] border border-[#2d4a3d] hover:border-[#5eead4]/30 transition-all group"
          >
            <span className="flex items-center gap-2">
              Start Learning Free
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </a>
          <button className="px-8 py-4 bg-transparent text-gray-300 text-lg font-semibold rounded-xl border border-[#2d4a3d] hover:border-[#5eead4]/30 hover:text-white transition-all group">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Demo
            </span>
          </button>
        </div>

        {/* Dashboard Preview */}
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a3329] to-transparent blur-3xl opacity-30" />
          <div className="relative rounded-2xl border border-[#2d4a3d] bg-[#0f1612] p-2 shadow-2xl shadow-[#1a3329]/50">
            <div className="rounded-xl bg-gradient-to-br from-[#0A0F0D] to-[#1a2420] aspect-video flex items-center justify-center border border-[#1a2420]">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-[#1a3329] flex items-center justify-center">
                  <svg className="w-10 h-10 text-[#5eead4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm">Dashboard Preview</p>
                  <p className="text-gray-500 text-xs">Your personalized learning hub</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
