"use client";

export default function UniversityLogos() {
  return (
    <section className="py-14 sm:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Overline with Side Divider Lines */}
        <div className="flex items-center justify-center gap-4 mb-10 max-w-xl mx-auto">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-gray-400 uppercase whitespace-nowrap">
            TRUSTED BY STUDENTS FROM
          </span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        {/* University Logos Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-10 items-center justify-items-center opacity-75 hover:opacity-100 transition-opacity">
          
          {/* Harvard University */}
          <div className="flex items-center gap-2 text-gray-800 hover:text-black transition-colors group cursor-default">
            {/* Harvard Shield Crest */}
            <svg className="w-7 h-8 shrink-0 text-[#A51C30] group-hover:scale-105 transition-transform" viewBox="0 0 100 120" fill="currentColor">
              <path d="M50 0 C77 0 100 23 100 50 C100 85 50 120 50 120 C50 120 0 85 0 50 C0 23 23 0 50 0 Z" fill="#A51C30" />
              <path d="M22 25 h22 v18 h-22 Z M56 25 h22 v18 h-22 Z M39 52 h22 v18 h-22 Z" fill="#ffffff" />
              <text x="25" y="38" fontSize="11" fontFamily="serif" fontWeight="bold" fill="#A51C30">VE</text>
              <text x="59" y="38" fontSize="11" fontFamily="serif" fontWeight="bold" fill="#A51C30">RI</text>
              <text x="42" y="65" fontSize="11" fontFamily="serif" fontWeight="bold" fill="#A51C30">TAS</text>
            </svg>
            <div className="leading-tight">
              <p className="font-serif font-bold text-xs tracking-wider uppercase text-gray-900">Harvard</p>
              <p className="text-[8px] font-sans tracking-widest uppercase text-gray-500">University</p>
            </div>
          </div>

          {/* Stanford University */}
          <div className="flex items-center gap-2 text-gray-800 hover:text-black transition-colors group cursor-default">
            {/* Stanford Tree Crest */}
            <div className="w-7 h-7 rounded-full bg-[#8C1515] flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2 L7 10 L10 10 L6 16 L11 16 L8 22 L16 22 L13 16 L18 16 L14 10 L17 10 Z" />
              </svg>
            </div>
            <span className="font-serif font-bold text-sm tracking-tight text-gray-900">
              Stanford
            </span>
          </div>

          {/* University of Cambridge */}
          <div className="flex items-center gap-2 text-gray-800 hover:text-black transition-colors group cursor-default">
            {/* Cambridge Crest */}
            <svg className="w-7 h-7 shrink-0 text-[#A30000] group-hover:scale-105 transition-transform" viewBox="0 0 100 100" fill="currentColor">
              <rect x="10" y="10" width="80" height="80" rx="16" fill="#A30000" />
              <path d="M50 15 v70 M15 50 h70" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
              <circle cx="32" cy="32" r="5" fill="#ffffff" />
              <circle cx="68" cy="32" r="5" fill="#ffffff" />
              <circle cx="32" cy="68" r="5" fill="#ffffff" />
              <circle cx="68" cy="68" r="5" fill="#ffffff" />
            </svg>
            <div className="leading-tight text-left">
              <p className="text-[7.5px] uppercase font-sans tracking-wider text-gray-500">University of</p>
              <p className="font-serif font-bold text-xs tracking-wider uppercase text-gray-900">Cambridge</p>
            </div>
          </div>

          {/* MIT */}
          <div className="flex items-center gap-1.5 text-gray-900 hover:text-black transition-colors group cursor-default">
            {/* MIT Stencil Bars SVG */}
            <div className="flex items-end gap-1 h-6 shrink-0 group-hover:scale-105 transition-transform">
              <div className="w-1.5 h-6 bg-gray-900" />
              <div className="w-1.5 h-4 bg-gray-900" />
              <div className="w-1.5 h-6 bg-[#A31F34]" />
              <div className="w-1.5 h-6 bg-gray-900" />
              <div className="w-1.5 h-4 bg-gray-900" />
              <div className="w-1.5 h-6 bg-gray-900" />
            </div>
            <span className="font-bold text-sm tracking-widest font-mono text-gray-900 ml-1">
              MIT
            </span>
          </div>

          {/* UCLA */}
          <div className="flex items-center text-gray-900 hover:text-[#2774AE] transition-colors group cursor-default">
            <span className="font-black text-xl tracking-tighter italic font-sans text-gray-900 group-hover:text-[#2774AE] transition-colors">
              UCLA
            </span>
          </div>

          {/* Oxford University */}
          <div className="flex items-center gap-2 text-gray-800 hover:text-black transition-colors group cursor-default">
            {/* Oxford Shield */}
            <div className="w-7 h-7 rounded-md bg-[#002147] flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <span className="font-serif font-bold text-sm tracking-wider text-gray-900">
              Oxford
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
