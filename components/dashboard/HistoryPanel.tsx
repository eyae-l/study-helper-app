"use client";

import { useState, useEffect } from "react";

interface HistoryItem {
  id: string;
  tool: string;
  prompt: string;
  date: string;
  wordCount: string;
  type: "summarizer" | "flashcards" | "study-beats" | "smart-notes" | "quizzes";
}

export default function HistoryPanel() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    if (typeof window === "undefined") return;

    const items: HistoryItem[] = [];

    // Load flashcard sessions
    const sessionsData = localStorage.getItem("flashcard_sessions");
    const decksData = localStorage.getItem("flashcard_decks");
    
    if (sessionsData && decksData) {
      const sessions = JSON.parse(sessionsData);
      const decks = JSON.parse(decksData);

      sessions.forEach((session: any) => {
        const deck = decks.find((d: any) => d.id === session.deckId);
        if (deck) {
          items.push({
            id: session.id,
            tool: "Flashcards",
            prompt: deck.sourceMaterial,
            date: new Date(session.completedAt).toLocaleString(),
            wordCount: `${session.knownCount}/${session.knownCount + session.missedCount} correct · ${session.score}%`,
            type: "flashcards",
          });
        }
      });
    }

    // Add default item if exists
    items.push({
      id: "1",
      tool: "Summarizer",
      prompt: "Study Tools: Applications and Methods - Effective learning strategies include active recall, spaced repetition, and proper note organization. Studies show that students who use AI-powered study tools can improve retention by up to 40% and reduce study time significantly. Modern learning platforms integrate cognitive science principles to help students master any subject efficiently...",
      date: "9/20/2026, 8:32:42 AM",
      wordCount: "252 words",
      type: "summarizer",
    });

    setHistoryItems(items);
  };

  const filters = [
    { id: "all", label: "All" },
    { id: "study-beats", label: "Study Beats" },
    { id: "summarizer", label: "Summarizer" },
    { id: "smart-notes", label: "Smart Notes" },
    { id: "flashcards", label: "Flashcards" },
    { id: "quizzes", label: "Quizzes" },
  ];

  const filteredItems =
    selectedFilter === "all"
      ? historyItems
      : historyItems.filter(
          (item) => item.type === selectedFilter
        );

  const getToolIcon = (type: string) => {
    switch (type) {
      case "flashcards":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      case "summarizer":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case "study-beats":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        );
      case "smart-notes":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        );
      case "quizzes":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-700 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">History</h1>
            <p className="text-green-200/70 text-sm">
              View and manage your study tool history. Copy or insert content into other tools.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <label className="text-white text-sm font-medium mb-3 block">
          Filter by tool:
        </label>
        <div className="flex gap-3 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFilter === filter.id
                  ? "bg-green-500 text-white"
                  : "bg-gray-950 text-green-200/70 hover:bg-gray-800 border border-green-500/30"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* History Items */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-gray-950 border border-green-500/20 rounded-xl p-6 hover:border-green-500/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span>{getToolIcon(item.type)}</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">{item.tool}</h3>
                  <p className="text-green-200/70 text-xs">
                    {item.type === "flashcards"
                      ? "Study session completed"
                      : "Click to retry or copy response"}
                  </p>
                </div>
              </div>
              <button className="text-green-200/70 hover:text-white transition-colors">
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>

            {/* Prompt Content */}
            <div className="bg-black border border-green-500/30 rounded-lg p-4 mb-4">
              <p className="text-green-200/70 text-xs uppercase tracking-wider mb-2">
                {item.type === "flashcards" ? "Study Material" : "Prompt"}
              </p>
              <p className="text-green-200 text-sm leading-relaxed line-clamp-3">
                {item.prompt}
              </p>
              <button className="text-green-400 hover:text-blue-300 text-xs mt-2">
                {item.wordCount}
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <span className="text-green-300/50 text-sm">{item.date}</span>
              <div className="flex-1"></div>
              <button className="flex items-center gap-2 bg-black hover:bg-gray-800 text-green-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-green-500/30">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy Input
              </button>
              {item.type !== "flashcards" && (
                <>
                  <button className="flex items-center gap-2 bg-black hover:bg-gray-800 text-green-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-green-500/30">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Copy Output
                  </button>
                  <button className="bg-green-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Open in {item.tool}
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="bg-gray-950 border border-green-500/20 rounded-xl p-12 text-center">
          <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🕐</span>
          </div>
          <h3 className="text-white text-lg font-semibold mb-2">
            No history yet
          </h3>
          <p className="text-green-200/70">
            Your recent activity will appear here once you start using Study tools
          </p>
        </div>
      )}
    </div>
  );
}
