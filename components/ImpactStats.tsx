export default function ImpactStats() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-black rounded-3xl p-16 text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="mb-12">
              <p className="text-gray-500 text-sm uppercase tracking-wider mb-4">
                IMPACT
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Enhancing retention,
                <br />
                speed, and confidence.
              </h2>
              <p className="text-gray-400 max-w-2xl">
                Students using Study Healper report an average 3x increase in
                retention and 40% faster study sessions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Stat 1 */}
              <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                <div className="text-4xl font-bold mb-2">3x</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  RETENTION GAIN
                </div>
              </div>

              {/* Stat 2 */}
              <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                <div className="text-4xl font-bold mb-2">40%</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  FASTER STUDY
                </div>
              </div>

              {/* Stat 3 */}
              <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                <div className="text-4xl font-bold mb-2">64k+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  ACTIVE LEARNERS
                </div>
              </div>

              {/* Stat 4 */}
              <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                <div className="text-4xl font-bold mb-2">11M+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  QUESTIONS GENERATED
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
