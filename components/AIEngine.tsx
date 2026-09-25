export default function AIEngine() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - AI Engine */}
          <div>
            <p className="text-gray-500 text-sm uppercase tracking-wider mb-4">
              🤖 AI ENGINE
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Optimal AI
              <br />
              Study Performance
            </h2>
            <p className="text-gray-600 mb-8">
              Top-line models house domain-specific one you the best
              answer, fastest flashcards, and sharpest quizzes — every time.
            </p>
            
            {/* Model uptime indicator */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">MODEL UPTIME</span>
                <span className="text-green-600 text-sm font-medium">+82% faster</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-4xl font-bold text-black">1.2</span>
                <span className="text-gray-500 text-sm">seconds average</span>
              </div>
              {/* Color bars */}
              <div className="flex gap-2">
                {[
                  { color: "bg-cyan-400", width: "w-1/8" },
                  { color: "bg-cyan-500", width: "w-1/8" },
                  { color: "bg-blue-400", width: "w-1/8" },
                  { color: "bg-green-400", width: "w-1/8" },
                  { color: "bg-green-500", width: "w-1/8" },
                  { color: "bg-teal-400", width: "w-1/8" },
                  { color: "bg-blue-500", width: "w-1/8" },
                  { color: "bg-green-600", width: "w-1/8" }
                ].map((bar, i) => (
                  <div key={i} className={`h-3 ${bar.color} rounded flex-1`}></div>
                ))}
              </div>
            </div>

            <button className="text-black hover:text-gray-600 transition-colors flex items-center gap-2 font-medium">
              See more
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Right side - Prime Active Learning placeholder */}
          <div className="bg-black rounded-3xl p-8 text-white h-96 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 text-sm uppercase tracking-wider mb-4">
                STUDY METHOD
              </p>
              <h3 className="text-3xl font-bold">Prime</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
