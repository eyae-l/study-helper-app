"use client";

import { useState, useEffect } from "react";

interface StudySession {
  id: string;
  deckId: string;
  userId: string;
  results: CardResult[];
  score: number;
  knownCount: number;
  missedCount: number;
  completedAt: string;
}

interface CardResult {
  cardId: string;
  result: "missed" | "knew";
  timestamp: string;
}

interface FlashcardDeck {
  id: string;
  userId: string;
  title: string;
  sourceMaterial: string;
  cards: any[];
  createdAt: string;
  updatedAt: string;
}

export default function ProgressPanel() {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [decks, setDecks] = useState<FlashcardDeck[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgressData();
  }, []);

  const loadProgressData = () => {
    if (typeof window === "undefined") return;
    
    const storedSessions = localStorage.getItem("flashcard_sessions");
    const storedDecks = localStorage.getItem("flashcard_decks");
    
    setSessions(storedSessions ? JSON.parse(storedSessions) : []);
    setDecks(storedDecks ? JSON.parse(storedDecks) : []);
    setLoading(false);
  };

  // Calculate statistics
  const totalAttempts = sessions.length;
  const avgScore = sessions.length > 0
    ? Math.round(sessions.reduce((sum, s) => sum + s.score, 0) / sessions.length)
    : 0;
  const bestScore = sessions.length > 0
    ? Math.max(...sessions.map((s) => s.score))
    : 0;
  const totalKnown = sessions.reduce((sum, s) => sum + s.knownCount, 0);
  const totalMissed = sessions.reduce((sum, s) => sum + s.missedCount, 0);
  const totalCards = totalKnown + totalMissed;

  // Performance categories
  const excellentSessions = sessions.filter((s) => s.score >= 80).length;
  const goodSessions = sessions.filter((s) => s.score >= 60 && s.score < 80).length;
  const needsWorkSessions = sessions.filter((s) => s.score < 60).length;

  // Deck statistics
  const deckStats = decks.map((deck) => {
    const deckSessions = sessions.filter((s) => s.deckId === deck.id);
    const deckAvg = deckSessions.length > 0
      ? Math.round(deckSessions.reduce((sum, s) => sum + s.score, 0) / deckSessions.length)
      : 0;
    const deckBest = deckSessions.length > 0
      ? Math.max(...deckSessions.map((s) => s.score))
      : 0;

    return {
      deck,
      attempts: deckSessions.length,
      avgScore: deckAvg,
      bestScore: deckBest,
      lastStudied: deckSessions.length > 0 ? deckSessions[0].completedAt : null,
    };
  });

  // Format time ago
  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-8 flex items-center justify-center">
        <div className="text-green-200/70">Loading progress...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Progress</h1>
        <p className="text-green-200/70">
          Track your flashcard study performance and improvement
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-950 border border-green-500/20 rounded-xl p-6">
          <div className="text-green-200/70 text-sm mb-2">Total Attempts</div>
          <div className="text-3xl font-bold text-white">{totalAttempts}</div>
        </div>

        <div className="bg-gray-950 border border-green-500/20 rounded-xl p-6">
          <div className="text-green-200/70 text-sm mb-2">Average Score</div>
          <div className="text-3xl font-bold text-green-400">{avgScore}%</div>
        </div>

        <div className="bg-gray-950 border border-green-500/20 rounded-xl p-6">
          <div className="text-green-200/70 text-sm mb-2">Best Score</div>
          <div className="text-3xl font-bold text-green-400">{bestScore}%</div>
        </div>

        <div className="bg-gray-950 border border-green-500/20 rounded-xl p-6">
          <div className="text-green-200/70 text-sm mb-2">Total Cards Studied</div>
          <div className="text-3xl font-bold text-green-400">{totalCards}</div>
        </div>
      </div>

      {/* Activity Breakdown */}
      <div className="bg-gray-950 border border-green-500/20 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Activity Breakdown</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-green-200">Flashcards</span>
          </div>
          <span className="text-green-200/70">{totalAttempts} attempts</span>
        </div>
      </div>

      {/* Recent Performance */}
      {sessions.length > 0 && (
        <div className="bg-gray-950 border border-green-500/20 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Recent Performance</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-green-200/70">Excellent (80%+)</span>
              <div className="flex items-center gap-3 flex-1 max-w-md ml-8">
                <div className="flex-1 h-2 bg-black rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{
                      width: `${sessions.length > 0 ? (excellentSessions / sessions.length) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="text-white font-semibold w-12 text-right">
                  {excellentSessions}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-green-200/70">Good (60-79%)</span>
              <div className="flex items-center gap-3 flex-1 max-w-md ml-8">
                <div className="flex-1 h-2 bg-black rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{
                      width: `${sessions.length > 0 ? (goodSessions / sessions.length) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="text-white font-semibold w-12 text-right">
                  {goodSessions}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-green-200/70">Needs Work (&lt;60%)</span>
              <div className="flex items-center gap-3 flex-1 max-w-md ml-8">
                <div className="flex-1 h-2 bg-black rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500"
                    style={{
                      width: `${sessions.length > 0 ? (needsWorkSessions / sessions.length) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="text-white font-semibold w-12 text-right">
                  {needsWorkSessions}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Study Sets in Progress */}
      {deckStats.length > 0 && (
        <div className="bg-gray-950 border border-green-500/20 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Study Sets</h2>
          <div className="space-y-4">
            {deckStats.map((stat) => (
              <div
                key={stat.deck.id}
                className="bg-black border border-green-500/30 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">
                      {stat.deck.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-green-200/70">
                      <span>{stat.attempts} attempts</span>
                      <span>•</span>
                      <span>avg {stat.avgScore}%</span>
                      {stat.lastStudied && (
                        <>
                          <span>•</span>
                          <span>{timeAgo(stat.lastStudied)}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {stat.bestScore}%
                    </div>
                    <div className="text-xs text-green-300/50">Best</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600"
                      style={{ width: `${stat.avgScore}%` }}
                    />
                  </div>
                  <span className="text-xs text-green-300/50 w-12">
                    {stat.avgScore}%
                  </span>
                </div>

                <div className="mt-2">
                  <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded">
                    Flashcards
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Attempts */}
      {sessions.length > 0 && (
        <div className="bg-gray-950 border border-green-500/20 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Recent Attempts</h2>
          <div className="space-y-3">
            {sessions.slice(0, 10).map((session) => {
              const deck = decks.find((d) => d.id === session.deckId);
              return (
                <div
                  key={session.id}
                  className="bg-black border border-green-500/30 rounded-lg p-4 hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`text-3xl font-bold ${
                        session.score >= 80
                          ? "text-green-400"
                          : session.score >= 60
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {session.score}%
                    </div>

                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-1">
                        {deck?.title || "Flashcard Deck"}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-green-200/70">
                        <span>
                          {session.knownCount}/{session.knownCount + session.missedCount} correct
                        </span>
                        <span>•</span>
                        <span>{timeAgo(session.completedAt)}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded">
                        Flashcards
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {sessions.length === 0 && (
        <div className="bg-gray-950 border border-green-500/20 rounded-xl p-12 text-center">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">📊</span>
          </div>
          <h3 className="text-white text-xl font-semibold mb-2">
            No progress yet
          </h3>
          <p className="text-green-200/70 mb-6">
            Start studying with flashcards to see your progress here
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-500 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Go to Flashcards
          </button>
        </div>
      )}
    </div>
  );
}
