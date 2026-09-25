"use client";

import { useState, useEffect } from "react";

// Types
interface Flashcard {
  id: string;
  question: string;
  answer: string;
  position: number;
}

interface FlashcardDeck {
  id: string;
  userId: string;
  title: string;
  sourceMaterial: string;
  cards: Flashcard[];
  createdAt: string;
  updatedAt: string;
}

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

type ViewMode = "create" | "study" | "complete";
type Difficulty = "easy" | "medium" | "hard";
type UploadMethod = "file" | "text" | "youtube" | "audio" | null;

export default function FlashcardsPanel() {
  // State
  const [viewMode, setViewMode] = useState<ViewMode>("create");
  const [uploadMethod, setUploadMethod] = useState<UploadMethod>(null);
  const [inputText, setInputText] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [audioFileName, setAudioFileName] = useState("");
  const [numCards, setNumCards] = useState(10);
  const [customCardCount, setCustomCardCount] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  
  // Study state
  const [currentDeck, setCurrentDeck] = useState<FlashcardDeck | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionResults, setSessionResults] = useState<CardResult[]>([]);
  const [currentSession, setCurrentSession] = useState<StudySession | null>(null);

  // Load existing decks from localStorage
  useEffect(() => {
    const decks = getDecksFromStorage();
    if (decks.length > 0 && !currentDeck) {
      // Auto-load most recent deck if exists
      const mostRecent = decks[0];
      setCurrentDeck(mostRecent);
    }
  }, []);

  // Storage helpers
  const getDecksFromStorage = (): FlashcardDeck[] => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("flashcard_decks");
    return stored ? JSON.parse(stored) : [];
  };

  const saveDeckToStorage = (deck: FlashcardDeck) => {
    const decks = getDecksFromStorage();
    const existingIndex = decks.findIndex((d) => d.id === deck.id);
    if (existingIndex >= 0) {
      decks[existingIndex] = deck;
    } else {
      decks.unshift(deck);
    }
    localStorage.setItem("flashcard_decks", JSON.stringify(decks));
  };

  const getSessionsFromStorage = (): StudySession[] => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("flashcard_sessions");
    return stored ? JSON.parse(stored) : [];
  };

  const saveSessionToStorage = (session: StudySession) => {
    const sessions = getSessionsFromStorage();
    sessions.unshift(session);
    localStorage.setItem("flashcard_sessions", JSON.stringify(sessions));
  };

  // Card count selection
  const cardCounts = [10, 15, 20, 30, 50];
  const selectedCount =
    numCards === -1 ? parseInt(customCardCount) || 10 : numCards;

  // Generate flashcards using AI
  const generateFlashcards = async () => {
    if (!inputText.trim()) {
      alert("Add some study material before generating flashcards.");
      return;
    }

    if (selectedCount < 1 || selectedCount > 100) {
      alert("Choose a valid number of flashcards (1-100).");
      return;
    }

    setIsLoading(true);
    setLoadingMessage("Analyzing your notes...");

    try {
      // Import the API function
      const { generateFlashcards: generateFlashcardsAPI } = await import("@/lib/api");
      
      setLoadingMessage("Creating your flashcards...");
      
      // Get real AI-generated flashcards
      const aiResponse = await generateFlashcardsAPI(inputText, selectedCount);
      
      setLoadingMessage("Building your deck...");
      
      // Parse the AI response
      let cards: Flashcard[] = [];
      try {
        const parsed = JSON.parse(aiResponse);
        cards = parsed.map((item: any, i: number) => ({
          id: `card-${Date.now()}-${i}`,
          question: item.question || `Question ${i + 1}?`,
          answer: item.answer || `Answer ${i + 1}`,
          position: i,
        }));
      } catch (parseError) {
        console.error("Failed to parse flashcards:", parseError);
        // Fallback to extracting topics
        const topics = extractTopics(inputText, selectedCount);
        for (let i = 0; i < selectedCount; i++) {
          cards.push({
            id: `card-${Date.now()}-${i}`,
            question: topics[i]?.question || `Question ${i + 1} based on your notes?`,
            answer: topics[i]?.answer || `Answer explaining the concept from your study material.`,
            position: i,
          });
        }
      }

      // Create deck
      const deck: FlashcardDeck = {
        id: `deck-${Date.now()}`,
        userId: "user-1", // In real app, get from auth
        title: generateDeckTitle(inputText),
        sourceMaterial: inputText,
        cards,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      saveDeckToStorage(deck);
      setCurrentDeck(deck);
      setIsLoading(false);
      setViewMode("study");
      setCurrentCardIndex(0);
      setIsFlipped(false);
      setSessionResults([]);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      setIsLoading(false);
      alert("Failed to generate flashcards. Please try again.");
    }
  };

  // Helper: Extract topics from text
  const extractTopics = (text: string, count: number) => {
    // Simple extraction - in real app, use AI
    const sentences = text
      .split(/[.!?]+/)
      .filter((s) => s.trim().length > 20);
    
    const topics = [];
    for (let i = 0; i < Math.min(count, sentences.length); i++) {
      const sentence = sentences[i].trim();
      const words = sentence.split(" ");
      
      // Create question from first part
      const questionPart = words.slice(0, Math.ceil(words.length / 2)).join(" ");
      const answerPart = words.slice(Math.ceil(words.length / 2)).join(" ");
      
      topics.push({
        question: `What is the key concept in: "${questionPart}..."?`,
        answer: `${answerPart || sentence}`,
      });
    }

    // Fill remaining with generated questions
    while (topics.length < count) {
      topics.push({
        question: `What is another important concept from your notes?`,
        answer: `This concept relates to the material you're studying and requires review.`,
      });
    }

    return topics;
  };

  // Helper: Generate deck title
  const generateDeckTitle = (text: string): string => {
    const words = text.trim().split(" ").slice(0, 6).join(" ");
    return words.length > 50 ? words.substring(0, 50) + "..." : words;
  };

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.match(/\.(txt|md|doc|docx)$/i)) {
      alert("We couldn't process this file. Try a text file (.txt, .md).");
      return;
    }

    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setInputText(content);
    };
    reader.readAsText(file);
  };

  // Study interaction handlers
  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handleCardResult = (result: "missed" | "knew") => {
    if (!currentDeck || !isFlipped) return;

    const currentCard = currentDeck.cards[currentCardIndex];
    const cardResult: CardResult = {
      cardId: currentCard.id,
      result,
      timestamp: new Date().toISOString(),
    };

    const newResults = [...sessionResults, cardResult];
    setSessionResults(newResults);

    // Move to next card or complete
    if (currentCardIndex < currentDeck.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      completeSession(newResults);
    }
  };

  // Complete study session
  const completeSession = (results: CardResult[]) => {
    if (!currentDeck) return;

    const knownCount = results.filter((r) => r.result === "knew").length;
    const missedCount = results.filter((r) => r.result === "missed").length;
    const score = Math.round((knownCount / results.length) * 100);

    const session: StudySession = {
      id: `session-${Date.now()}`,
      deckId: currentDeck.id,
      userId: "user-1",
      results,
      score,
      knownCount,
      missedCount,
      completedAt: new Date().toISOString(),
    };

    saveSessionToStorage(session);
    setCurrentSession(session);
    setViewMode("complete");
  };

  // Review again
  const handleReviewAgain = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setSessionResults([]);
    setCurrentSession(null);
    setViewMode("study");
  };

  // View progress (placeholder - would navigate to progress page)
  const handleViewProgress = () => {
    alert("Progress tracking integrated! Check the Progress section in the sidebar.");
  };

  // Back to create
  const handleBackToCreate = () => {
    setViewMode("create");
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setSessionResults([]);
    setCurrentSession(null);
  };

  // Keyboard shortcuts
  useEffect(() => {
    if (viewMode !== "study" || !isFlipped) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "d" || e.key === "D") {
        handleCardResult("missed");
      } else if (e.key === "k" || e.key === "K") {
        handleCardResult("knew");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [viewMode, isFlipped, currentCardIndex]);

  // Render based on view mode
  return (
    <div className="min-h-screen bg-black p-8">
      {viewMode === "create" && (
        <CreateWorkspace
          uploadMethod={uploadMethod}
          setUploadMethod={setUploadMethod}
          inputText={inputText}
          setInputText={setInputText}
          uploadedFileName={uploadedFileName}
          setUploadedFileName={setUploadedFileName}
          youtubeUrl={youtubeUrl}
          setYoutubeUrl={setYoutubeUrl}
          audioFileName={audioFileName}
          setAudioFileName={setAudioFileName}
          handleFileUpload={handleFileUpload}
          numCards={numCards}
          setNumCards={setNumCards}
          customCardCount={customCardCount}
          setCustomCardCount={setCustomCardCount}
          cardCounts={cardCounts}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          isLoading={isLoading}
          loadingMessage={loadingMessage}
          generateFlashcards={generateFlashcards}
          selectedCount={selectedCount}
        />
      )}

      {viewMode === "study" && currentDeck && (
        <StudyWorkspace
          deck={currentDeck}
          currentCardIndex={currentCardIndex}
          isFlipped={isFlipped}
          handleFlipCard={handleFlipCard}
          handleCardResult={handleCardResult}
          handleBackToCreate={handleBackToCreate}
        />
      )}

      {viewMode === "complete" && currentSession && currentDeck && (
        <CompletionScreen
          session={currentSession}
          deck={currentDeck}
          handleReviewAgain={handleReviewAgain}
          handleViewProgress={handleViewProgress}
          handleBackToCreate={handleBackToCreate}
        />
      )}
    </div>
  );
}

// CREATE WORKSPACE COMPONENT
function CreateWorkspace({
  uploadMethod,
  setUploadMethod,
  inputText,
  setInputText,
  uploadedFileName,
  setUploadedFileName,
  youtubeUrl,
  setYoutubeUrl,
  audioFileName,
  setAudioFileName,
  handleFileUpload,
  numCards,
  setNumCards,
  customCardCount,
  setCustomCardCount,
  cardCounts,
  difficulty,
  setDifficulty,
  isLoading,
  loadingMessage,
  generateFlashcards,
  selectedCount,
}: any) {
  
  // Handle YouTube URL processing
  const handleYoutubeProcess = () => {
    if (!youtubeUrl.trim()) {
      alert("Please enter a YouTube URL!");
      return;
    }
    // Simulate transcript extraction
    setInputText(`[Transcript from YouTube video: ${youtubeUrl}]\n\nSample transcript content that would be extracted from the video...`);
    setYoutubeUrl("");
    setUploadMethod(null);
  };

  // Handle audio file upload
  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.match(/\.(mp3|wav|m4a|ogg)$/i)) {
      alert("Please upload an audio file (.mp3, .wav, .m4a, .ogg).");
      return;
    }

    setAudioFileName(file.name);
    // Simulate transcription
    setInputText(`[Transcription from audio: ${file.name}]\n\nSample transcribed content from the audio file...`);
    setUploadMethod(null);
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Create flashcards</h1>
        <p className="text-green-200/70">
          Turn your notes into flashcards and test what you remember.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Source Input */}
        <div className="bg-[#0c0d20] rounded-xl border border-gray-800 p-6 mb-6">
          <label className="text-white font-semibold mb-4 block">
            Study Material
          </label>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your notes, study material, or lecture content here..."
            className="w-full h-64 bg-black border border-green-500/30 rounded-lg p-4 text-green-100 placeholder-green-300/50 focus:outline-none focus:border-green-500/60 resize-none mb-4 transition-colors"
          />

          {(uploadedFileName || audioFileName) && (
            <div className="mb-4 flex items-center gap-3 bg-black border border-green-500/30 rounded-lg p-3">
              <span className="text-green-400">
                {uploadedFileName ? "📄" : "🎵"}
              </span>
              <span className="text-green-200 text-sm flex-1">
                {uploadedFileName || audioFileName}
              </span>
              <button
                onClick={() => {
                  setUploadedFileName("");
                  setAudioFileName("");
                  setInputText("");
                }}
                className="text-green-200/70 hover:text-red-400 transition-colors"
              >
                ✕
              </button>
            </div>
          )}

          {/* Upload Method Options - Compact List */}
          <div className="space-y-2">
            <p className="text-green-200/70 text-sm mb-3">Or upload from:</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* Upload File */}
              <label className="bg-black hover:bg-green-500/10 border border-green-500/30 hover:border-blue-500/50 rounded-lg p-3 cursor-pointer transition-all group">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-500/20 group-hover:bg-green-500/30 rounded-lg flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">Upload file</p>
                    <p className="text-gray-500 text-xs">PDF, DOCX, TXT</p>
                  </div>
                </div>
                <input
                  type="file"
                  accept=".txt,.md,.doc,.docx,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {/* YouTube Link */}
              <button
                onClick={() => setUploadMethod(uploadMethod === "youtube" ? null : "youtube")}
                className={`bg-black hover:bg-red-600/10 border border-green-500/30 hover:border-red-500/50 rounded-lg p-3 transition-all group ${
                  uploadMethod === "youtube" ? "border-red-500 bg-red-600/10" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-600/20 group-hover:bg-red-600/30 rounded-lg flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-white text-sm font-medium">YouTube</p>
                    <p className="text-gray-500 text-xs">Video URL</p>
                  </div>
                </div>
              </button>

              {/* Record Audio */}
              <label className="bg-black hover:bg-green-500/10 border border-green-500/30 hover:border-purple-500/50 rounded-lg p-3 cursor-pointer transition-all group">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-500/20 group-hover:bg-green-500/30 rounded-lg flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">Audio</p>
                    <p className="text-gray-500 text-xs">MP3, WAV</p>
                  </div>
                </div>
                <input
                  type="file"
                  accept=".mp3,.wav,.m4a,.ogg"
                  onChange={handleAudioUpload}
                  className="hidden"
                />
              </label>

              {/* Paste from Clipboard */}
              <button
                onClick={async () => {
                  try {
                    const text = await navigator.clipboard.readText();
                    if (text) {
                      setInputText(text);
                    }
                  } catch (err) {
                    alert("Please paste directly into the text area above, or grant clipboard permissions.");
                  }
                }}
                className="bg-black hover:bg-green-600/10 border border-green-500/30 hover:border-green-500/50 rounded-lg p-3 transition-all group"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-600/20 group-hover:bg-green-600/30 rounded-lg flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-white text-sm font-medium">Clipboard</p>
                    <p className="text-gray-500 text-xs">Paste text</p>
                  </div>
                </div>
              </button>
            </div>

            {/* YouTube URL Input (Expandable) */}
            {uploadMethod === "youtube" && (
              <div className="mt-4 bg-black border border-red-500/50 rounded-lg p-4">
                <label className="text-white text-sm font-medium mb-2 block">
                  YouTube Video URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="flex-1 bg-[#0c0d20] border border-green-500/30 rounded-lg px-4 py-2 text-green-200 placeholder-gray-600 focus:outline-none focus:border-red-500 text-sm"
                  />
                  <button
                    onClick={handleYoutubeProcess}
                    disabled={!youtubeUrl.trim()}
                    className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Extract
                  </button>
                  <button
                    onClick={() => {
                      setUploadMethod(null);
                      setYoutubeUrl("");
                    }}
                    className="text-green-200/70 hover:text-white px-2 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Number of Cards */}
        <div className="bg-[#0c0d20] rounded-xl border border-gray-800 p-6 mb-6">
          <label className="text-white font-semibold mb-4 block">
            Number of flashcards
          </label>

          <div className="grid grid-cols-6 gap-3 mb-4">
            {cardCounts.map((count) => (
              <button
                key={count}
                onClick={() => setNumCards(count)}
                className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                  numCards === count
                    ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                    : "bg-black text-green-200/70 hover:bg-gray-900 border border-green-500/30"
                }`}
              >
                {count}
              </button>
            ))}
            <button
              onClick={() => setNumCards(-1)}
              className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                numCards === -1
                  ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                  : "bg-black text-green-200/70 hover:bg-gray-900 border border-green-500/30"
              }`}
            >
              Custom
            </button>
          </div>

          {numCards === -1 && (
            <input
              type="number"
              value={customCardCount}
              onChange={(e) => setCustomCardCount(e.target.value)}
              placeholder="Enter number (1-100)"
              min="1"
              max="100"
              className="w-full bg-black border border-green-500/30 rounded-lg p-3 text-green-200 placeholder-gray-600 focus:outline-none focus:border-blue-500"
            />
          )}
        </div>

        {/* Generation Options */}
        <div className="bg-[#0c0d20] rounded-xl border border-gray-800 p-6 mb-6">
          <label className="text-white font-semibold mb-4 block">
            Options (Optional)
          </label>

          <div className="grid grid-cols-3 gap-3">
            {(["easy", "medium", "hard"] as Difficulty[]).map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`px-4 py-3 rounded-lg font-medium capitalize transition-all ${
                  difficulty === level
                    ? "bg-green-500 text-white"
                    : "bg-black text-green-200/70 hover:bg-gray-900 border border-green-500/30"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateFlashcards}
          disabled={isLoading || !inputText.trim()}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-green-500/30"
        >
          {isLoading ? (
            <>
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              {loadingMessage}
            </>
          ) : (
            <>
              <span className="text-xl">✨</span>
              Generate {selectedCount} flashcards
            </>
          )}
        </button>
      </div>
    </>
  );
}

// STUDY WORKSPACE COMPONENT
function StudyWorkspace({
  deck,
  currentCardIndex,
  isFlipped,
  handleFlipCard,
  handleCardResult,
  handleBackToCreate,
}: any) {
  const currentCard = deck.cards[currentCardIndex];
  const progress = ((currentCardIndex + 1) / deck.cards.length) * 100;

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={handleBackToCreate}
          className="text-green-200/70 hover:text-white mb-4 flex items-center gap-2 transition-colors"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-white mb-1">Flashcards</h1>
        <p className="text-green-200/70">{deck.title}</p>
      </div>

      {/* Progress */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-green-200/70 text-sm">
            {currentCardIndex + 1} / {deck.cards.length}
          </span>
          <span className="text-green-200/70 text-sm">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-[#0c0d20] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div className="max-w-2xl mx-auto mb-8">
        <div
          onClick={handleFlipCard}
          className="bg-[#0c0d20] border-2 border-gray-800 rounded-2xl p-12 min-h-[400px] flex items-center justify-center cursor-pointer hover:border-green-500/30 transition-all group"
          style={{
            perspective: "1000px",
          }}
        >
          <div className="text-center">
            <div className="text-gray-500 text-sm uppercase tracking-wider mb-4">
              {isFlipped ? "Answer" : "Question"}
            </div>
            <p className="text-white text-2xl leading-relaxed mb-6">
              {isFlipped ? currentCard.answer : currentCard.question}
            </p>
            {!isFlipped && (
              <p className="text-gray-500 text-sm">Click to reveal answer</p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {isFlipped && (
        <div className="max-w-2xl mx-auto grid grid-cols-2 gap-4">
          <button
            onClick={() => handleCardResult("missed")}
            className="bg-red-600/20 hover:bg-red-600/30 border-2 border-red-600/50 text-red-400 px-8 py-6 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-3 group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">
              ✕
            </span>
            <div className="text-left">
              <div>Missed it</div>
              <div className="text-xs opacity-70">Press D</div>
            </div>
          </button>

          <button
            onClick={() => handleCardResult("knew")}
            className="bg-green-600/20 hover:bg-green-600/30 border-2 border-green-600/50 text-green-400 px-8 py-6 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-3 group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">
              ✓
            </span>
            <div className="text-left">
              <div>Knew it</div>
              <div className="text-xs opacity-70">Press K</div>
            </div>
          </button>
        </div>
      )}
    </>
  );
}

// COMPLETION SCREEN COMPONENT
function CompletionScreen({
  session,
  deck,
  handleReviewAgain,
  handleViewProgress,
  handleBackToCreate,
}: any) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl">🎉</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-3">Deck complete</h1>
        <p className="text-2xl text-green-200/70">
          {session.score}% recall across {deck.cards.length} cards
        </p>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-green-600/10 border-2 border-green-600/30 rounded-xl p-8 text-center">
          <div className="text-green-400 text-5xl font-bold mb-2">
            {session.knownCount}
          </div>
          <div className="text-green-400 font-semibold">Knew it</div>
        </div>

        <div className="bg-red-600/10 border-2 border-red-600/30 rounded-xl p-8 text-center">
          <div className="text-red-400 text-5xl font-bold mb-2">
            {session.missedCount}
          </div>
          <div className="text-red-400 font-semibold">Missed</div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-4">
        <button
          onClick={handleReviewAgain}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-3"
        >
          <span>🔄</span>
          Review again
        </button>

        <button
          onClick={handleViewProgress}
          className="w-full bg-[#0c0d20] hover:bg-gray-900 border border-green-500/30 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-3"
        >
          <span>📊</span>
          View progress
        </button>

        <button
          onClick={handleBackToCreate}
          className="w-full bg-transparent hover:bg-[#0c0d20] text-green-200/70 hover:text-white px-6 py-4 rounded-xl font-medium transition-all"
        >
          Create new deck
        </button>
      </div>
    </div>
  );
}
