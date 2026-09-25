"use client";

import Link from "next/link";

export default function StudyToolsGrid() {
  const tools = [
    {
      title: "AI Study Assistant",
      description: "Get instant answers and clear explanations.",
      icon: (
        <svg className="w-5 h-5 text-[#0B3B2C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      ),
    },
    {
      title: "Smart Notes",
      description: "Summarize, organize and understand faster.",
      icon: (
        <svg className="w-5 h-5 text-[#0B3B2C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
    },
    {
      title: "Flashcards",
      description: "Learn with spaced repetition.",
      icon: (
        <svg className="w-5 h-5 text-[#0B3B2C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m-15 0A2.25 2.25 0 003 12v6a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18v-6a2.25 2.25 0 00-1.5-2.122m-15 0h15" />
        </svg>
      ),
    },
    {
      title: "Practice Questions",
      description: "Build your confidence with real practice.",
      icon: (
        <svg className="w-5 h-5 text-[#0B3B2C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-.817-.168.75.75 0 01-.168-.817c.28-.9.37-1.637.336-2.285C3.398 16.326 2.25 14.28 2.25 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
      ),
    },
    {
      title: "Study Progress",
      description: "Track your growth and stay motivated.",
      icon: (
        <svg className="w-5 h-5 text-[#0B3B2C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.25 2.25L18 6.75" />
        </svg>
      ),
    },
    {
      title: "Exam Preparation",
      description: "Focus on what matters most.",
      icon: (
        <svg className="w-5 h-5 text-[#0B3B2C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-white border-t border-gray-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#0B3B2C] uppercase mb-3">
            EVERYTHING YOU NEED
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-semibold text-gray-950 tracking-tight leading-tight">
            One platform. All your study tools.
          </h2>
        </div>

        {/* 6 Feature Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {tools.map((tool) => (
            <Link
              key={tool.title}
              href="/dashboard"
              className="group flex flex-col items-center text-center p-3 rounded-2xl hover:bg-gray-50/80 transition-all transform hover:-translate-y-1"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-[#EAF5EF] border border-[#D5EEDB] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#E1F3E8] transition-all shadow-2xs">
                {tool.icon}
              </div>

              {/* Title */}
              <h3 className="font-semibold text-xs sm:text-[13px] text-gray-900 mb-1.5 group-hover:text-[#0B3B2C] transition-colors leading-snug">
                {tool.title}
              </h3>

              {/* Subtext */}
              <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
