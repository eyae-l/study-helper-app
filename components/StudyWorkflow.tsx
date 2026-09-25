"use client";

export default function StudyWorkflow() {
  const steps = [
    {
      number: "01",
      title: "Upload",
      description: "Add your notes, files or type your questions.",
      icon: (
        <svg className="w-5 h-5 text-[#0B3B2C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.5V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Understand",
      description: "Get clear explanations and simple summaries.",
      icon: (
        <svg className="w-5 h-5 text-[#0B3B2C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.516 0c.85.493 1.508 1.333 1.508 2.316V18" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Practice",
      description: "Create quizzes, flashcards and study sessions.",
      icon: (
        <svg className="w-5 h-5 text-[#0B3B2C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      ),
    },
    {
      number: "04",
      title: "Master",
      description: "Track your progress and achieve your goals.",
      icon: (
        <svg className="w-5 h-5 text-[#0B3B2C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-5.25 6.557q0 .428.02.852m0 0a24.238 24.238 0 0010.46 0" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-20 bg-[#FBFDFB] border-t border-b border-gray-100/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Overline */}
        <div className="text-center mb-12 sm:mb-14">
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#0B3B2C] uppercase">
            FROM YOUR NOTES TO SUCCESS
          </p>
        </div>

        {/* 4 Steps Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative">
          {steps.map((step, index) => (
            <div key={step.title} className="relative flex items-center">
              
              {/* Step Card Content */}
              <div className="flex items-start gap-4 sm:flex-col sm:items-center sm:text-center w-full">
                {/* Icon Circle */}
                <div className="w-11 h-11 rounded-full bg-[#EAF5EF] border border-[#D0EADB] flex items-center justify-center shrink-0 shadow-2xs">
                  {step.icon}
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="font-semibold text-sm text-gray-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed max-w-[210px] mx-auto">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connecting Right Arrow on Desktop (for steps 1, 2, 3) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 text-gray-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
