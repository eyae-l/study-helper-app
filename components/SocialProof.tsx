"use client";

export default function SocialProof() {
  const logos = [
    { name: "Harvard", width: "w-24" },
    { name: "Stanford", width: "w-28" },
    { name: "MIT", width: "w-16" },
    { name: "Oxford", width: "w-24" },
    { name: "Cambridge", width: "w-32" },
    { name: "Yale", width: "w-20" },
  ];

  return (
    <section className="relative py-20 bg-[#0A0F0D] border-y border-[#1a2420]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <p className="text-center text-gray-500 text-sm font-medium mb-12 uppercase tracking-wider">
          Trusted by students from leading universities
        </p>

        {/* Logos Grid */}
        <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-16 opacity-40">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className={`${logo.width} h-8 rounded bg-gradient-to-br from-[#1a3329] to-[#0f1612] border border-[#1a2420] flex items-center justify-center`}
            >
              <span className="text-[#5eead4] text-xs font-bold opacity-60">
                {logo.name}
              </span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-[#1a2420]">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">50K+</div>
            <div className="text-gray-400 text-sm">Active Students</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">10M+</div>
            <div className="text-gray-400 text-sm">Flashcards Created</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">500K+</div>
            <div className="text-gray-400 text-sm">Quizzes Completed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">95%</div>
            <div className="text-gray-400 text-sm">Satisfaction Rate</div>
          </div>
        </div>

      </div>
    </section>
  );
}
