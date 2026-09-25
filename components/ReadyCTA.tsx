"use client";

import Link from "next/link";

export default function ReadyCTA() {
  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Soft Mint Curved Topo Card */}
        <div className="relative rounded-3xl sm:rounded-[36px] bg-gradient-to-b from-[#E9F5EF] via-[#EEF7F2] to-[#E5F3EB] border border-[#D0EADB] p-8 sm:p-12 md:p-16 text-center overflow-hidden shadow-sm">
          
          {/* Topographical Contour Flow Lines (SVG Background) */}
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <svg
              className="w-full h-full object-cover"
              viewBox="0 0 1000 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M-50 350 C 200 380, 350 240, 550 280 C 750 320, 850 180, 1050 200"
                stroke="#A8DCC0"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />
              <path
                d="M-50 300 C 180 340, 320 180, 520 220 C 720 260, 820 120, 1050 140"
                stroke="#B8E4CD"
                strokeWidth="1.2"
              />
              <path
                d="M-50 250 C 150 290, 280 130, 480 160 C 680 190, 800 60, 1050 90"
                stroke="#C7EBD7"
                strokeWidth="1"
              />
              <path
                d="M-50 200 C 120 230, 250 80, 450 100 C 650 120, 780 20, 1050 40"
                stroke="#D4F0E1"
                strokeWidth="1"
              />
              <path
                d="M-50 380 C 250 410, 400 300, 600 340 C 800 380, 900 240, 1050 260"
                stroke="#9CD4B6"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-2xl mx-auto">
            
            {/* Overline */}
            <p className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-[#0B3B2C] uppercase mb-4">
              READY TO GET STARTED?
            </p>

            {/* Headline */}
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-semibold text-gray-950 leading-[1.18] tracking-tight mb-7">
              Join thousands of students<br className="hidden sm:inline" /> already learning with StudyHelper.
            </h2>

            {/* CTA Button */}
            <div className="flex flex-col items-center justify-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-[#0B3B2C] hover:bg-[#07261D] text-white text-xs sm:text-sm font-semibold px-7 py-3.5 rounded-full shadow-sm hover:shadow transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Start Studying Free</span>
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>

              {/* Subtext */}
              <p className="text-[11px] text-gray-400 mt-4 font-normal tracking-wide">
                No credit card required
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
