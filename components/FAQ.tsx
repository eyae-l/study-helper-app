"use client";

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does Study Healper make students succeed?",
      answer: "Upload any study material and Study Healper's AI extracts the key concepts, then generates quizzes, flashcards, and study guides tailored to your content — built on proven cognition-science methods."
    },
    {
      question: "Why do I need a professional study partner?",
      answer: "A professional study partner helps you stay accountable, provides expert guidance, and ensures you're using the most effective learning strategies for your specific needs."
    },
    {
      question: "Why choose Study Healper for college prep?",
      answer: "Study Healper combines AI-powered study tools with spaced repetition and active recall techniques that are proven to work for college-level learning and beyond."
    },
    {
      question: "Why get a study subscription with Study Healper?",
      answer: "A subscription gives you unlimited access to all premium features including unlimited AI-generated content, advanced analytics, priority support, and new features as they're released."
    },
    {
      question: "How to set up a spaced repetition schedule?",
      answer: "Study Healper automatically sets up your spaced repetition schedule using the SM-2 algorithm. Just review cards when they're due, and the system adapts to your performance."
    },
    {
      question: "How to finalize your first study set?",
      answer: "Upload your notes or paste text, click 'Generate', review the AI-generated cards, make any edits you want, then click 'Save' to create your first study set."
    }
  ];

  return (
    <section id="faq" className="bg-white dark:bg-gray-50 py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side */}
          <div>
            <p className="text-green-600 dark:text-green-300/50 text-sm uppercase tracking-wider mb-4 font-semibold">
              FAQ
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-black mb-6 leading-tight">
              Frequently
              <br />
              Asked Questions
            </h2>
            <p className="text-slate-600 dark:text-gray-600 mb-8 text-lg leading-relaxed">
              Still have questions? We've got answers — or reach out
              any time.
            </p>
            <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3.5 rounded-full font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/35 hover:-translate-y-1 flex items-center gap-2 group">
              Contact us
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

          {/* Right side - FAQ items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-green-300 hover:shadow-lg transition-all duration-300">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </div>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-5">
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
