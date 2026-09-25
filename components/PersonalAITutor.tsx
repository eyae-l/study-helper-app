"use client";

import Link from "next/link";

export default function PersonalAITutor() {
  return (
    <section id="tutor" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-5 text-left">
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#0B3B2C] uppercase mb-3">
              YOUR PERSONAL AI TUTOR
            </p>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-semibold text-gray-950 leading-[1.12] tracking-tight mb-5">
              Everything you need<br />
              to study better.
            </h2>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-8 max-w-md">
              Turn your notes, lessons, and questions into a personalized study experience with AI.
            </p>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-[#0B3B2C] hover:bg-[#07261D] text-white text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-full shadow-sm hover:shadow transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Start Studying Free</span>
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Right Column: Light Mode Application Window Mockup */}
          <div className="lg:col-span-7 relative">
            
            {/* Window Container */}
            <div className="relative mx-auto rounded-2xl bg-white border border-gray-200/90 shadow-2xl overflow-hidden ring-1 ring-gray-900/5">
              
              {/* Window Title Bar */}
              <div className="h-8 bg-gray-50/90 border-b border-gray-100 flex items-center px-3.5 gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                <span className="text-[10px] text-gray-400 font-medium ml-2">StudyHelper App</span>
              </div>

              {/* Window Workspace */}
              <div className="flex h-[320px] sm:h-[350px]">
                
                {/* App Sidebar */}
                <div className="w-32 sm:w-40 bg-gray-50/70 border-r border-gray-100 p-3 flex flex-col justify-between shrink-0">
                  <div>
                    {/* Brand */}
                    <div className="flex items-center gap-1.5 mb-4">
                      <div className="w-5 h-5 rounded bg-[#0B3B2C] text-white font-serif font-bold text-[10px] flex items-center justify-center">
                        S
                      </div>
                      <span className="text-xs font-bold text-gray-900">StudyHelper</span>
                    </div>

                    {/* Nav Items */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-[#E8F5EE] text-[#0B3B2C] font-semibold text-[10.5px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        <span>Dashboard</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 text-gray-500 text-[10px] hover:text-gray-900">
                        <span>💡</span>
                        <span>Solve AI</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 text-gray-500 text-[10px] hover:text-gray-900">
                        <span>🗺️</span>
                        <span>Mind Map</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 text-gray-500 text-[10px] hover:text-gray-900">
                        <span>📋</span>
                        <span>Paper Grader</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 text-gray-500 text-[10px] hover:text-gray-900">
                        <span>🎵</span>
                        <span>Study Beats AI</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 text-gray-500 text-[10px] hover:text-gray-900">
                        <span>📄</span>
                        <span>Summarizer</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 text-gray-500 text-[10px] hover:text-gray-900">
                        <span>✍️</span>
                        <span>Smart Notes</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 text-gray-500 text-[10px] hover:text-gray-900">
                        <span>❓</span>
                        <span>Quizzes</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 text-gray-500 text-[10px] hover:text-gray-900">
                        <span>🎴</span>
                        <span>Flashcards</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* App Main Area */}
                <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between bg-white">
                  <div>
                    {/* Search / Ask Bar */}
                    <div className="relative mb-4">
                      <div className="flex items-center bg-gray-50 border border-gray-200/90 rounded-xl px-3 py-2 shadow-2xs">
                        <svg className="w-3.5 h-3.5 text-gray-400 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                          type="text"
                          readOnly
                          placeholder="Ask anything..."
                          className="bg-transparent text-xs text-gray-700 w-full focus:outline-none placeholder-gray-400"
                        />
                        <div className="w-6 h-6 rounded-lg bg-[#0B3B2C] flex items-center justify-center text-white shrink-0">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* 2x2 Feature Action Cards */}
                    <div className="grid grid-cols-2 gap-2.5">
                      {/* Solve AI */}
                      <div className="p-3 rounded-xl border border-gray-100 bg-[#FAFDFB] hover:border-emerald-200 transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 rounded-md bg-[#E8F5EE] text-[#0B3B2C] flex items-center justify-center text-xs">
                            💡
                          </div>
                          <span className="font-semibold text-xs text-gray-900">Solve AI</span>
                        </div>
                        <p className="text-[10px] text-gray-500 leading-tight">
                          Get instant answers
                        </p>
                      </div>

                      {/* Create Quiz */}
                      <div className="p-3 rounded-xl border border-gray-100 bg-[#FAFDFB] hover:border-emerald-200 transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 rounded-md bg-[#E8F5EE] text-[#0B3B2C] flex items-center justify-center text-xs">
                            📝
                          </div>
                          <span className="font-semibold text-xs text-gray-900">Create Quiz</span>
                        </div>
                        <p className="text-[10px] text-gray-500 leading-tight">
                          Practice with AI
                        </p>
                      </div>

                      {/* Study Flashcards */}
                      <div className="p-3 rounded-xl border border-gray-100 bg-[#FAFDFB] hover:border-emerald-200 transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 rounded-md bg-[#E8F5EE] text-[#0B3B2C] flex items-center justify-center text-xs">
                            🗂️
                          </div>
                          <span className="font-semibold text-xs text-gray-900">Study Flashcards</span>
                        </div>
                        <p className="text-[10px] text-gray-500 leading-tight">
                          Turn notes into flashcards
                        </p>
                      </div>

                      {/* Ask a Question */}
                      <div className="p-3 rounded-xl border border-gray-100 bg-[#FAFDFB] hover:border-emerald-200 transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 rounded-md bg-[#E8F5EE] text-[#0B3B2C] flex items-center justify-center text-xs">
                            💬
                          </div>
                          <span className="font-semibold text-xs text-gray-900">Ask a Question</span>
                        </div>
                        <p className="text-[10px] text-gray-500 leading-tight">
                          24/7 tutor explanations
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Window Bottom Hint */}
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[9px] text-gray-400">
                    <span>Press ⌘K to open command search</span>
                    <span className="text-emerald-700 font-medium">8 AI tools active</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Floating Badge Anchored at Bottom-Right */}
            <div className="absolute -bottom-4 -right-2 sm:-right-4 z-20">
              <div className="bg-white/98 backdrop-blur-md border border-gray-200/90 rounded-xl px-4 py-2.5 shadow-xl shadow-gray-200/60 flex items-center gap-2 transform hover:scale-105 transition-transform">
                <span className="text-emerald-700 text-sm">✦</span>
                <span className="text-xs font-semibold text-gray-800 whitespace-nowrap">
                  Smarter study starts here.
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
