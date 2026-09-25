export default function FinalCTA() {
  return (
    <section className="bg-black py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-gradient-to-br from-gray-950 to-black rounded-3xl p-16 text-center relative overflow-hidden border border-green-500/20">
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-900/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                <span className="text-white font-bold text-2xl">N</span>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ready to study like a top 1%
              <br />
              student?
            </h2>
            
            <p className="text-green-200/70 text-lg mb-10 max-w-2xl mx-auto">
              Join 84,000+ students who've stopped studying harder and started
              studying smarter.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/dashboard" className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full font-medium hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-500/30 flex items-center justify-center gap-2">
                Start Free
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#pricing" className="bg-green-500/10 border border-green-500/30 text-green-100 px-8 py-4 rounded-full font-medium hover:bg-green-500/20 transition-all inline-flex items-center justify-center">
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
