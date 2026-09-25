"use client";

import { useState } from "react";

export default function SettingsPanel() {
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [userName, setUserName] = useState("Bina Ale");

  return (
    <div className="min-h-screen bg-black p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">⚙️</span>
          <div>
            <h1 className="text-2xl font-bold text-white">Account & Security</h1>
            <p className="text-green-200/70 text-sm">
              Manage your profile and security settings.
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <section className="mb-8">
        <div className="bg-gray-950 border border-green-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <span>👤</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Personal Information</h2>
              <p className="text-green-200/70 text-sm">
                This information is private and only viewable by you.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-green-200/70 text-sm mb-2 block">Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-black border border-green-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="text-green-200/70 text-sm mb-2 block">
                Email address
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="email"
                  value="menrisa75@gmail.com"
                  className="flex-1 bg-black border border-green-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
                  disabled
                  readOnly
                />
                <span className="bg-gray-700 text-green-200 px-3 py-2 rounded-lg text-sm">
                  Managed by Google
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Change Avatar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="mb-8">
        <div className="bg-gray-950 border border-green-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <span>🔒</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Security</h2>
              <p className="text-green-200/70 text-sm">
                Your account is managed by Google. Password changes must be made
                through your Google account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Connected Apps */}
      <section className="mb-8">
        <div className="bg-gray-950 border border-green-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
              <span>🔌</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                Connected apps
                <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                  NEW
                </span>
              </h2>
              <p className="text-green-200/70 text-sm">
                Use Study Healper tools from inside Claude, ChatGPT, Cursor and other AI
                tools. Requires use the same word quota as this dashboard.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-black border border-green-500/30 text-green-200 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                Claude 🤖
              </button>
              <button className="px-4 py-2 bg-black border border-green-500/30 text-green-200 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                ChatGPT 💬
              </button>
              <button className="px-4 py-2 bg-black border border-green-500/30 text-green-200 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                Cursor
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button className="px-4 py-2 bg-black border border-green-500/30 text-green-200 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                VS Code 💻
              </button>
              <button className="px-4 py-2 bg-black border border-green-500/30 text-green-200 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                Claude Code 🚀
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Full setup guide
              </button>
            </div>

            <div className="bg-black border border-green-500/30 rounded-lg p-4">
              <label className="text-green-200/70 text-sm mb-2 block">
                Server URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value="https://grubby.ai/api/mcp"
                  className="flex-1 bg-gray-950 border border-green-500/30 rounded px-3 py-2 text-green-200 text-sm font-mono"
                  readOnly
                />
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </button>
              </div>
              <p className="text-green-300/50 text-xs mt-2">
                In Claude or ChatGPT, paste this and sign in — no key needed.
              </p>
            </div>

            <div className="bg-black border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-green-200/70 text-sm">API Keys</label>
                <button className="bg-green-500 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors">
                  New Key
                </button>
              </div>
              <p className="text-green-300/50 text-xs">
                Only for advanced use clients that send a fixed header. Up to 5 active
                keys.
              </p>
              <div className="mt-3 flex items-center gap-2 text-green-300/50 text-sm">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
                <span>
                  No API keys yet. Claude and ChatGPT don't need one — sign in
                  with the server URL above.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delete Account */}
      <section>
        <div className="bg-gray-950 border border-red-900/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
              <span>⚠️</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Delete account</h2>
              <p className="text-green-200/70 text-sm">
                Permanently close your account. Your subscription is cancelled
                immediately and no prorated refund is issued for any remaining time.
                This cannot be undone.
              </p>
            </div>
          </div>

          <p className="text-green-200/70 text-sm mb-4">
            Only want to cancel your subscription? You don't need to delete your
            account — you'll keep access until the end of your billing period.{" "}
            <a href="#" className="text-green-400 hover:text-blue-300">
              Manage your subscription
            </a>
          </p>

          <button
            onClick={() => setShowDeleteWarning(true)}
            className="bg-red-600/20 hover:bg-red-600/30 text-red-400 px-6 py-2 rounded-lg text-sm font-medium transition-colors border border-red-600/50"
          >
            Delete my account
          </button>
        </div>
      </section>

      {/* Legal Section */}
      <section className="mt-8">
        <div className="bg-gray-950 border border-green-500/20 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Legal</h2>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-green-400 hover:text-blue-300 text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-green-400 hover:text-blue-300 text-sm transition-colors"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
