"use client";

export default function PlanBillingPanel() {
  return (
    <div className="min-h-screen bg-black p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Plan & Billing</h1>
            <p className="text-green-200/70 text-sm">
              Manage your subscription, view usage, and download invoices.
            </p>
          </div>
        </div>
      </div>

      {/* Current Subscription */}
      <section className="mb-8">
        <div className="bg-gray-950 border border-green-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-white">Your Subscription</h2>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">Free</h3>
              <p className="text-green-200/70 text-sm">Current Plan</p>
            </div>
            <div className="text-right">
              <span className="inline-block bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium">
                ● Cancelled
              </span>
            </div>
          </div>

          <button className="w-full bg-green-500 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Activate
          </button>
        </div>
      </section>

      {/* Refer Friends */}
      <section className="mb-8">
        <div className="bg-gray-950 border border-green-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Refer Friends</h2>
            </div>
          </div>

          <p className="text-green-200/70 text-sm mb-4">
            Share your referral link and earn rewards when friends sign up
          </p>

          <div className="flex gap-2">
            <input
              type="text"
              value="https://grubby.ai?referredBy=wICeqolC"
              className="flex-1 bg-black border border-green-500/30 rounded-lg px-4 py-2 text-green-200 text-sm font-mono"
              readOnly
            />
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
              Copy
            </button>
          </div>
        </div>
      </section>

      {/* Words Available */}
      <section className="mb-8">
        <div className="bg-gray-950 border border-green-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-white">Words Available</h2>
              <p className="text-green-200/70 text-sm">
                Monthly limit - Resets October 20, 2026 at 12:00 AM
              </p>
            </div>
          </div>

          <div className="bg-black border border-green-500/30 rounded-lg p-6">
            <div className="mb-4">
              <h3 className="text-green-200/70 text-sm mb-2">Words Used This Month</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">292</span>
                <span className="text-green-300/50">/ 300</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="bg-gray-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-full"
                  style={{ width: "97%" }}
                ></div>
              </div>
            </div>

            <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-3">
              <p className="text-red-400 text-sm">
                <strong>Running low on words</strong> — consider upgrading your plan.
                Your monthly limit resets in <strong>30 days</strong>.
              </p>
            </div>
          </div>

          <div className="mt-6 bg-black border border-green-500/30 rounded-lg p-4">
            <h4 className="text-white font-medium mb-3">Good to Know</h4>
            <ul className="space-y-2 text-green-200/70 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">ℹ️</span>
                <span>Your word limit resets every 28 days</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">ℹ️</span>
                <span>
                  Words reset at the start of each billing cycle
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">ℹ️</span>
                <span>
                  Need more words? You can upgrade your plan anytime
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Billing History */}
      <section>
        <div className="bg-gray-950 border border-green-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-white">Billing History</h2>
          </div>

          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-300/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-green-200/70">No billing history available yet.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
