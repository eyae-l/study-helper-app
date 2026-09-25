export default function LearnMaster() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-gray-500 text-sm uppercase tracking-wider mb-4">
            WHY STUDENTS LOVE STUDY HEALPER
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-black mb-6">
            Learn, master, & bring
            <br />
            your potential to life
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Everything you need to study smarter — not harder. Built on cognitive science,
            powered by the best AI models.
          </p>
        </div>

        {/* Feature demonstration */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Sample content */}
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
            <div className="mb-4">
              <span className="text-xs text-gray-500 uppercase tracking-wider">📝 Organic Chemistry — Ch 16</span>
            </div>
            <h3 className="text-xl font-semibold text-black mb-4">YOUR NOTES</h3>
            <div className="space-y-3 text-gray-700">
              <p className="leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
              <p className="leading-relaxed">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>

          {/* Right side - AI Generated */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
            <div className="mb-4">
              <span className="text-xs text-green-600 uppercase tracking-wider">✨ AI GENERATED — 14 CARDS</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 text-sm">1</span>
                </div>
                <div>
                  <p className="text-black font-medium">What is nucleophilic?</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 text-sm">2</span>
                </div>
                <div>
                  <p className="text-black font-medium">Define SN1 reaction mechanism</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
