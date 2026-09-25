export default function PrimeActiveLearning() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side placeholder */}
          <div className="bg-gray-100 rounded-3xl p-8 h-96 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 text-sm uppercase tracking-wider mb-4">
                AI ENGINE
              </p>
              <h3 className="text-3xl font-bold text-black">Optimal AI</h3>
              <p className="text-gray-600 mt-2">Study Performance</p>
            </div>
          </div>

          {/* Right side - Prime Active Learning */}
          <div className="bg-black rounded-3xl p-10 text-white relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-gray-500 text-sm uppercase tracking-wider mb-4">
                STUDY METHOD
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Prime
                <br />
                Active Learning
              </h2>
              <p className="text-gray-400 mb-8">
                Built on the proven SM-2 spaced repetition algorithm.
                Review cards exactly when you're about to forget them.
              </p>

              {/* Flashcard examples */}
              <div className="flex gap-4 flex-wrap">
                <div className="bg-gray-800 px-4 py-3 rounded-xl border border-gray-700 flex items-center gap-2">
                  <span className="text-sm">CARD 1</span>
                  <div className="bg-red-600 px-2 py-1 rounded text-xs">Hard</div>
                </div>
                <div className="bg-gray-800 px-4 py-3 rounded-xl border border-gray-700 flex items-center gap-2">
                  <span className="text-sm">CARD 2</span>
                  <div className="bg-yellow-600 px-2 py-1 rounded text-xs">Good</div>
                </div>
                <div className="bg-gray-800 px-4 py-3 rounded-xl border border-gray-700">
                  <span className="text-sm">What is photosynthesis?</span>
                </div>
                <div className="bg-gray-800 px-4 py-3 rounded-xl border border-gray-700">
                  <span className="text-sm">Define mitosis</span>
                </div>
                <div className="bg-gray-800 px-4 py-3 rounded-xl border border-gray-700">
                  <span className="text-sm">States of matter?</span>
                </div>
                <div className="bg-gray-800 px-4 py-3 rounded-xl border border-gray-700 flex items-center gap-2">
                  <span className="text-sm">CARD 8</span>
                  <div className="bg-green-600 px-2 py-1 rounded text-xs">Easy</div>
                </div>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-900/20 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <button className="text-black hover:text-gray-600 transition-colors flex items-center gap-2 font-medium">
            See more
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
