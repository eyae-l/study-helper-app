"use client";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0F0D]/80 backdrop-blur-xl border-b border-[#1a2420]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-[#1a3329] flex items-center justify-center shadow-lg shadow-[#1a3329]/20 group-hover:bg-[#234d3a] transition-all">
              <span className="font-bold text-[#5eead4] text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-[#e0f2ee]">
              StudyHelper
            </span>
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {['Features', 'How it Works', 'Pricing'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-sm font-medium text-gray-400 hover:text-[#5eead4] transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Sign In
            </button>
            <a
              href="/dashboard"
              className="inline-flex items-center px-5 py-2.5 bg-[#1a3329] text-[#5eead4] text-sm font-semibold rounded-lg hover:bg-[#234d3a] border border-[#2d4a3d] hover:border-[#5eead4]/30 transition-all"
            >
              Get Started Free
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
