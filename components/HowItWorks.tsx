"use client";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Upload Your Content",
      description: "Import notes, PDFs, or textbooks. Type directly or paste any text you want to learn.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "AI Generates Materials",
      description: "Our AI instantly creates flashcards, quizzes, and study guides tailored to your content.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Learn & Track Progress",
      description: "Study with adaptive quizzes and track your mastery with detailed analytics and insights.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="relative py-32 bg-[#0A0F0D]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Start learning in
            <span className="block mt-2 bg-gradient-to-r from-[#5eead4] to-[#7dd3c0] bg-clip-text text-transparent">
              three simple steps
            </span>
          </h2>
          <p className="text-lg text-gray-400">
            From content to mastery in minutes. No manual flashcard creation required.
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              
              {/* Connecting Line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-[60%] w-full h-[2px] bg-gradient-to-r from-[#2d4a3d] to-transparent" />
              )}

              {/* Card */}
              <div className="relative p-8 rounded-2xl bg-[#0f1612] border border-[#1a2420] hover:border-[#2d4a3d] transition-all">
                
                {/* Number Badge */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[#1a3329] text-[#5eead4] mb-6">
                  {step.icon}
                </div>

                {/* Step Number */}
                <div className="text-5xl font-bold text-[#1a3329] mb-4">
                  {step.number}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
