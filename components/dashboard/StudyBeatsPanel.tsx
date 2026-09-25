"use client";

import { useState, useEffect, useRef } from "react";

import {
  MusicalNoteIcon,
  DocumentPlusIcon,
  CloudArrowUpIcon,
  SparklesIcon,
  FireIcon,
  BoltIcon,
  CheckCircleIcon,
  PlayIcon,
  PauseIcon,
  TrashIcon,
  PlusIcon,
  ClipboardDocumentIcon,
  ArrowPathIcon,
  PencilIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface Song {
  id: string;
  title: string;
  genre: string;
  createdAt: string;
  lyrics: string;
}

interface Playlist {
  id: string;
  name: string;
  songCount: number;
  createdAt: string;
}

export default function StudyBeatsPanel() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("lo-fi");
  const [title, setTitle] = useState("");
  const [savedSongs, setSavedSongs] = useState<Song[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [currentView, setCurrentView] = useState<"create" | "songs" | "playlists">("create");
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [showNewPlaylistModal, setShowNewPlaylistModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [isPasting, setIsPasting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFileName, setUploadFileName] = useState("");
  const [summaryLength, setSummaryLength] = useState<"short" | "medium" | "long">("medium");
  const [generatedLyrics, setGeneratedLyrics] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const genres = [
    { id: "lo-fi", label: "Lo-Fi", color: "from-green-500 to-green-600" },
    { id: "hip-hop", label: "Hip-Hop", color: "from-orange-500 to-red-500" },
    { id: "pop", label: "Pop", color: "from-blue-500 to-cyan-500" },
    { id: "synthwave", label: "Synthwave", color: "from-indigo-500 to-purple-500" },
  ];

  const summaryLengths = [
    { id: "short" as const, label: "Short", description: "~1 min", icon: <BoltIcon className="w-4 h-4" /> },
    { id: "medium" as const, label: "Medium", description: "~2-3 min", icon: <SparklesIcon className="w-4 h-4" /> },
    { id: "long" as const, label: "Long", description: "~4-5 min", icon: <FireIcon className="w-4 h-4" /> },
  ];

  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = () => {
    if (typeof window === "undefined") return;
    
    const songs = localStorage.getItem("study_beats_songs");
    const lists = localStorage.getItem("study_beats_playlists");
    
    if (songs) setSavedSongs(JSON.parse(songs));
    if (lists) setPlaylists(JSON.parse(lists));
  };

  const handlePaste = async () => {
    setIsPasting(true);
    try {
      const text = await navigator.clipboard.readText();
      if (text.trim()) {
        setInputText(prev => prev + (prev ? '\n\n' : '') + text);
        setTimeout(() => setIsPasting(false), 500);
      } else {
        setIsPasting(false);
        alert("Clipboard is empty. Please copy some text first.");
      }
    } catch (err) {
      setIsPasting(false);
      console.log("Clipboard permission denied");
      const textarea = document.querySelector('textarea');
      if (textarea) {
        textarea.focus();
        setTimeout(() => {
          alert("Please paste your text manually:\n• Windows/Linux: Ctrl+V\n• Mac: Cmd+V");
        }, 100);
      }
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadFileName(file.name);

    try {
      let text = "";
      
      if (file.type === "text/plain" || file.name.endsWith('.txt')) {
        text = await file.text();
      } else {
        text = await file.text();
      }
      
      setTimeout(() => {
        if (text.trim()) {
          setInputText(text);
          setIsUploading(false);
          
          if (!title) {
            const suggestedTitle = file.name.replace(/\.(txt|doc|docx|pdf)$/i, '');
            setTitle(suggestedTitle);
          }
        } else {
          setIsUploading(false);
          alert("The file appears to be empty or unreadable.");
        }
      }, 800);
    } catch (error) {
      setIsUploading(false);
      setUploadFileName("");
      alert("Failed to read file. Please make sure it's a text file (.txt)");
      console.error("File read error:", error);
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleGenerateLyrics = async () => {
    if (!inputText.trim()) {
      alert("Please add study material first!\n\nYou can:\n• Paste text\n• Upload a document\n• Type directly");
      return;
    }

    setIsLoading(true);
    
    try {
      // Import the API function
      const { generateStudyBeatsLyrics } = await import("@/lib/api");
      
      // Get real AI-generated lyrics
      const aiLyrics = await generateStudyBeatsLyrics(inputText, selectedGenre, summaryLength);
      
      setGeneratedLyrics(aiLyrics);
      setIsEditMode(false);
    } catch (error) {
      console.error("Error generating lyrics:", error);
      
      // Fallback to demo lyrics if API fails
      let lyricsContent = "";
      
      if (summaryLength === "short") {
        lyricsContent = `[Verse 1]
Learning new concepts, breaking them down
Main ideas flowing, knowledge all around

[Chorus]
Grasp the content, make it clear
Transform the knowledge, keep it near

[Outro]
Now I remember, concepts are clear
Study beats helped, nothing to fear`;
      } else if (summaryLength === "medium") {
        lyricsContent = `[Verse 1]
Learning new concepts, breaking them down
Main ideas flowing, knowledge all around
Key points are shining, making them mine
Studying smart now, one step at a time

[Chorus]
Grasp the content, make it simple and clear
Transform the knowledge, keep it near
Main ideas to melodies, that's how we learn
Study beats playing, watch the concepts turn

[Verse 2]
From notes to summaries, now to a song
Memory anchors help me stay strong
Lyrics make learning stick in my brain
Education through music, wisdom I gain

[Outro]
Now I remember, concepts are clear
Study beats helped, nothing to fear`;
      } else {
        lyricsContent = `[Intro]
Starting my journey, notes in my hand
Ready to learn and understand

[Verse 1]
Learning new concepts, breaking them down
Main ideas flowing, knowledge all around
Key points are shining, making them mine
Studying smart now, one step at a time

[Pre-Chorus]
Every word matters, every line counts
Building my knowledge, word amounts

[Chorus]
Grasp the content, make it simple and clear
Transform the knowledge, keep it near
Main ideas to melodies, that's how we learn
Study beats playing, watch the concepts turn

[Verse 2]
From notes to summaries, now to a song
Memory anchors help me stay strong
Lyrics make learning stick in my brain
Education through music, wisdom I gain

[Bridge]
La la la, learn learn learn
Knowledge returns, watch it burn
Main ideas in harmony
Study beats set me free

[Chorus - Repeat]
Grasp the content, make it simple and clear
Transform the knowledge, keep it near
Main ideas to melodies, that's how we learn
Study beats playing, watch the concepts turn

[Outro]
Now I remember, concepts are clear
Study beats helped, nothing to fear
Learning complete, knowledge retained
All this studying hasn't been in vain`;
      }

      setGeneratedLyrics(lyricsContent);
      setIsEditMode(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSong = () => {
    if (!generatedLyrics.trim()) {
      alert("No lyrics to save!");
      return;
    }

    const newSong: Song = {
      id: Date.now().toString(),
      title: title.trim() || `Study Beat - ${genres.find(g => g.id === selectedGenre)?.label}`,
      genre: selectedGenre,
      createdAt: new Date().toISOString(),
      lyrics: generatedLyrics
    };

    const updatedSongs = [newSong, ...savedSongs];
    setSavedSongs(updatedSongs);
    localStorage.setItem("study_beats_songs", JSON.stringify(updatedSongs));
    
    // Show success feedback
    alert("✅ Song saved successfully!");
    
    // Optionally switch to songs view
    setSelectedSong(newSong);
  };

  const handleRegenerateLyrics = () => {
    if (confirm("Regenerate lyrics? Current lyrics will be replaced.")) {
      handleGenerateLyrics();
    }
  };

  const handleCopyLyrics = async () => {
    try {
      await navigator.clipboard.writeText(generatedLyrics);
      alert("✅ Lyrics copied to clipboard!");
    } catch (err) {
      alert("Failed to copy. Please select and copy manually.");
    }
  };

  const handleNewSong = () => {
    if (generatedLyrics && !confirm("Start a new song? Current lyrics will be cleared.")) {
      return;
    }
    setGeneratedLyrics("");
    setInputText("");
    setTitle("");
    setUploadFileName("");
    setIsEditMode(false);
  };

  const handleClearAll = () => {
    if (confirm("Clear all input? This cannot be undone.")) {
      setInputText("");
      setTitle("");
      setUploadFileName("");
    }
  };

  const handleDeleteSong = (id: string) => {
    const updated = savedSongs.filter(song => song.id !== id);
    setSavedSongs(updated);
    localStorage.setItem("study_beats_songs", JSON.stringify(updated));
    if (selectedSong?.id === id) setSelectedSong(null);
  };

  const handleCreatePlaylist = () => {
    if (!newPlaylistName.trim()) {
      alert("Please enter a playlist name!");
      return;
    }

    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name: newPlaylistName,
      songCount: 0,
      createdAt: new Date().toISOString(),
    };

    const updated = [newPlaylist, ...playlists];
    setPlaylists(updated);
    localStorage.setItem("study_beats_playlists", JSON.stringify(updated));
    setNewPlaylistName("");
    setShowNewPlaylistModal(false);
  };

  const handleDeletePlaylist = (id: string) => {
    const updated = playlists.filter(p => p.id !== id);
    setPlaylists(updated);
    localStorage.setItem("study_beats_playlists", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0b1e] via-[#0d0e24] to-[#0a0b1e] p-8">
      {/* Header with better typography */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
            <MusicalNoteIcon className="w-7 h-7 text-white" strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Study Beats AI</h1>
            <p className="text-green-200/70 text-base mt-1">
              Transform your notes into memorable study songs
            </p>
          </div>
        </div>
      </div>

      {/* Modern Navigation Pills */}
      <div className="flex gap-3 mb-8 bg-gray-950/60 backdrop-blur-sm p-2 rounded-2xl border border-green-500/20/50 inline-flex">
        <button
          onClick={() => setCurrentView("create")}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
            currentView === "create"
              ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-purple-500/30"
              : "text-green-200/70 hover:text-white hover:bg-white/5"
          }`}
        >
          <div className="flex items-center gap-2">
            <PlusIcon className="w-4 h-4" strokeWidth={2} />
            <span>Create New</span>
          </div>
        </button>
        <button
          onClick={() => setCurrentView("songs")}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
            currentView === "songs"
              ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-purple-500/30"
              : "text-green-200/70 hover:text-white hover:bg-white/5"
          }`}
        >
          <div className="flex items-center gap-2">
            <MusicalNoteIcon className="w-4 h-4" strokeWidth={2} />
            <span>Saved Songs</span>
            {savedSongs.length > 0 && (
              <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-0.5 rounded-full">
                {savedSongs.length}
              </span>
            )}
          </div>
        </button>
        <button
          onClick={() => setCurrentView("playlists")}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
            currentView === "playlists"
              ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-purple-500/30"
              : "text-green-200/70 hover:text-white hover:bg-white/5"
          }`}
        >
          <div className="flex items-center gap-2">
            <DocumentPlusIcon className="w-4 h-4" strokeWidth={2} />
            <span>Playlists</span>
            {playlists.length > 0 && (
              <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-0.5 rounded-full">
                {playlists.length}
              </span>
            )}
          </div>
        </button>
      </div>

      {/* Create New View */}
      {currentView === "create" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section - Premium Card Design */}
          <div className="bg-gradient-to-br from-[#0c0d20] to-[#0a0b1e] rounded-3xl border border-green-500/20/50 p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <PencilIcon className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <h2 className="text-xl font-bold text-white">Study Material</h2>
            </div>
            
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.doc,.docx,.pdf,text/plain"
              onChange={handleFileUpload}
              className="hidden"
            />
            
            {/* Upload Actions - Modern Button Group */}
            <div className="mb-5">
              <label className="text-green-200/70 text-sm font-medium mb-3 block">Add Content</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handlePaste}
                  disabled={isPasting}
                  className={`group relative overflow-hidden px-5 py-4 rounded-2xl font-medium transition-all duration-300 ${
                    isPasting
                      ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white"
                      : "bg-white/5 hover:bg-white/10 text-green-200 hover:text-white border border-green-500/30/50 hover:border-green-500/50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {isPasting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm">Pasting...</span>
                      </>
                    ) : (
                      <>
                        <ClipboardDocumentIcon className="w-4 h-4" strokeWidth={2} />
                        <span className="text-sm">Paste Text</span>
                      </>
                    )}
                  </div>
                </button>
                <button
                  onClick={handleUploadClick}
                  disabled={isUploading}
                  className={`group relative overflow-hidden px-5 py-4 rounded-2xl font-medium transition-all duration-300 ${
                    isUploading
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                      : "bg-white/5 hover:bg-white/10 text-green-200 hover:text-white border border-green-500/30/50 hover:border-green-500/50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {isUploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm">Uploading...</span>
                      </>
                    ) : (
                      <>
                        <CloudArrowUpIcon className="w-4 h-4" strokeWidth={2} />
                        <span className="text-sm">Upload File</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* File upload indicator */}
            {uploadFileName && (
              <div className="mb-4 p-4 bg-blue-500/10 border border-green-500/30 rounded-2xl flex items-center justify-between backdrop-blur-sm">
                <div className="flex items-center gap-3 text-green-400 text-sm">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircleIcon className="w-4 h-4" strokeWidth={2} />
                  </div>
                  <span className="font-medium">{uploadFileName}</span>
                </div>
                <button
                  onClick={() => setUploadFileName("")}
                  className="text-green-300/50 hover:text-green-200 transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" strokeWidth={2} />
                </button>
              </div>
            )}

            {/* Textarea - Modern Design */}
            <div className="relative mb-5">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your lecture notes, textbook excerpts, or study content here...

Tips for best results:
• Include key concepts and definitions
• Add important dates or formulas  
• The more detailed, the better!"
                className="w-full h-56 bg-[#080916] border border-green-500/30/50 rounded-2xl p-5 text-green-200 placeholder-green-300/50 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-purple-500/20 resize-none transition-all"
              />
              {inputText && (
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <span className="text-xs text-green-300/50 bg-[#080916]/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-green-500/30/50">
                    {inputText.length.toLocaleString()} characters
                  </span>
                  <button
                    onClick={handleClearAll}
                    className="text-green-300/50 hover:text-red-400 bg-[#080916]/90 backdrop-blur-sm p-2 rounded-lg border border-green-500/30/50 hover:border-red-500/50 transition-all"
                    title="Clear all"
                  >
                    <XMarkIcon className="w-4 h-4" strokeWidth={2} />
                  </button>
                </div>
              )}
            </div>

            {/* Title Input */}
            <div className="mb-5">
              <label className="text-green-200/70 text-sm font-medium mb-2 block">Song Title (Optional)</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Biology Chapter 5 - Cell Division"
                className="w-full bg-[#080916] border border-green-500/30/50 rounded-2xl px-5 py-3 text-green-200 placeholder-green-300/50 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>

            {/* Summary Length - Enhanced Pills */}
            <div className="mb-5">
              <label className="text-green-200/70 text-sm font-medium mb-3 block">Song Length</label>
              <div className="grid grid-cols-3 gap-3">
                {summaryLengths.map((length) => (
                  <button
                    key={length.id}
                    onClick={() => setSummaryLength(length.id)}
                    className={`px-4 py-4 rounded-2xl text-sm font-medium transition-all duration-300 ${
                      summaryLength === length.id
                        ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30 scale-105"
                        : "bg-white/5 hover:bg-white/10 text-green-200/70 hover:text-white border border-green-500/30/50 hover:border-green-500/50"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2 mb-1">
                      {length.icon}
                      <span className="font-bold">{length.label}</span>
                    </div>
                    <div className="text-xs opacity-90">{length.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Genre Selection - Modern Cards */}
            <div className="mb-6">
              <label className="text-green-200/70 text-sm font-medium mb-3 block">Music Genre</label>
              <div className="grid grid-cols-2 gap-3">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => setSelectedGenre(genre.id)}
                    className={`group px-5 py-4 rounded-2xl font-medium transition-all duration-300 ${
                      selectedGenre === genre.id
                        ? `bg-gradient-to-br ${genre.color} text-white shadow-lg scale-105`
                        : "bg-white/5 hover:bg-white/10 text-green-200/70 hover:text-white border border-green-500/30/50"
                    }`}
                  >
                    <div className="text-sm font-semibold">{genre.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button - Premium CTA */}
            <button
              onClick={handleGenerateLyrics}
              disabled={isLoading || !inputText.trim()}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white px-8 py-5 rounded-2xl font-bold text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/40 hover:scale-[1.02]"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating Your Study Beat...</span>
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5" strokeWidth={2} />
                  <span>Generate Study Beat</span>
                </>
              )}
            </button>
          </div>

          {/* Generated Lyrics / Preview Section */}
          <div className="bg-gradient-to-br from-[#0c0d20] to-[#0a0b1e] rounded-3xl border border-green-500/20/50 p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <MusicalNoteIcon className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <h2 className="text-xl font-bold text-white">
                  {generatedLyrics ? "Generated Lyrics" : "Live Preview"}
                </h2>
              </div>
              
              {generatedLyrics && (
                <button
                  onClick={handleNewSong}
                  className="text-green-200/70 hover:text-white text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <PlusIcon className="w-4 h-4" strokeWidth={2} />
                  New Song
                </button>
              )}
            </div>
            
            <div className="h-[560px] bg-[#080916] rounded-2xl p-6 overflow-y-auto border border-green-500/30/50 mb-6">
              {generatedLyrics ? (
                // Show Generated Lyrics (No upload/paste buttons here)
                <div className="space-y-4">
                  <div className="pb-4 border-b border-green-500/30/50">
                    <h3 className="text-white font-bold text-2xl mb-2">
                      {title || "Untitled Study Beat"}
                    </h3>
                    <div className="flex items-center gap-3 text-xs">
                      <span className={`bg-gradient-to-r ${genres.find(g => g.id === selectedGenre)?.color} text-white px-3 py-1.5 rounded-full font-semibold`}>
                        {selectedGenre.toUpperCase()}
                      </span>
                      <span className="text-green-200/70">•</span>
                      <span className="text-green-200/70">
                        {summaryLength === "short" ? "~1 min" : summaryLength === "medium" ? "~2-3 min" : "~4-5 min"}
                      </span>
                    </div>
                  </div>

                  {isEditMode ? (
                    <textarea
                      value={generatedLyrics}
                      onChange={(e) => setGeneratedLyrics(e.target.value)}
                      className="w-full h-[400px] bg-gray-950 border border-green-500/30/50 rounded-xl p-4 text-green-200 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-purple-500/20 resize-none font-sans text-sm leading-relaxed"
                    />
                  ) : (
                    <pre className="text-green-200 whitespace-pre-wrap font-sans text-sm leading-loose">
                      {generatedLyrics}
                    </pre>
                  )}
                </div>
              ) : inputText ? (
                // Show Live Preview (when no lyrics generated yet)
                <div className="space-y-5">
                  <div className="pb-5 border-b border-green-500/30/50">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-xs font-semibold uppercase tracking-wider">Ready to Generate</span>
                    </div>
                    <h3 className="text-white font-bold text-2xl mb-2">
                      {title || "Untitled Study Beat"}
                    </h3>
                    <div className="flex items-center gap-3 text-xs">
                      <span className={`bg-gradient-to-r ${genres.find(g => g.id === selectedGenre)?.color} text-white px-3 py-1.5 rounded-full font-semibold`}>
                        {selectedGenre.toUpperCase()}
                      </span>
                      <span className="text-green-200/70">•</span>
                      <span className="text-green-200/70">{inputText.split(/\s+/).filter(w => w.length > 0).length} words</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-green-300/50 text-xs font-semibold uppercase tracking-wider mb-3">Study Material Preview</div>
                    <div className="bg-gray-950 border border-green-500/30/50 rounded-xl p-4 text-green-200 text-sm leading-relaxed max-h-[280px] overflow-y-auto">
                      {inputText.substring(0, 500)}
                      {inputText.length > 500 && (
                        <span className="text-gray-600"> ... (+{inputText.length - 500} characters)</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-950 border border-green-500/30/50 rounded-xl p-4">
                      <div className="text-green-300/50 text-xs mb-1.5">Character Count</div>
                      <div className="text-white font-bold text-xl">{inputText.length.toLocaleString()}</div>
                    </div>
                    <div className="bg-gray-950 border border-green-500/30/50 rounded-xl p-4">
                      <div className="text-green-300/50 text-xs mb-1.5">Estimated Length</div>
                      <div className="text-white font-bold text-xl">
                        {summaryLength === "short" ? "~1 min" : summaryLength === "medium" ? "~2-3 min" : "~4-5 min"}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-green-500/30 rounded-xl p-4 flex gap-3">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-sm text-green-200 leading-relaxed">
                      <span className="font-semibold text-green-400">Pro Tip:</span> Our AI will analyze your content and transform key concepts into catchy, memorable lyrics that make studying fun!
                    </div>
                  </div>
                </div>
              ) : (
                // Empty State - No study track yet
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  <h3 className="text-green-200/70 font-semibold text-lg mb-2">
                    No study track yet
                  </h3>
                  <p className="text-green-300/50 text-sm max-w-sm leading-relaxed">
                    Upload material to get exam lyrics, then generate a full song
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons - Show when lyrics are generated */}
            {generatedLyrics && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setIsEditMode(!isEditMode)}
                    className="bg-white/5 hover:bg-white/10 text-green-200 hover:text-white px-5 py-3 rounded-2xl font-medium transition-all duration-300 border border-green-500/30/50 hover:border-gray-600/50 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>{isEditMode ? "Preview" : "Edit"}</span>
                  </button>
                  
                  <button
                    onClick={handleCopyLyrics}
                    className="bg-white/5 hover:bg-white/10 text-green-200 hover:text-white px-5 py-3 rounded-2xl font-medium transition-all duration-300 border border-green-500/30/50 hover:border-gray-600/50 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copy</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleSaveSong}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-5 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-green-500/30 hover:scale-[1.02]"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    <span>Save Song</span>
                  </button>

                  <button
                    onClick={handleRegenerateLyrics}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-purple-700 hover:to-pink-700 text-white px-5 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 hover:scale-[1.02]"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Regenerate</span>
                  </button>
                </div>

                <button
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-blue-500/30 hover:scale-[1.02]"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                  <span>Generate Full Song with AI</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Saved Songs View */}
      {currentView === "songs" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Songs List */}
          <div className="lg:col-span-1 space-y-3">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-bold text-lg">Your Library</h2>
              <span className="text-green-200/70 text-sm bg-white/5 px-3 py-1 rounded-full">{savedSongs.length} songs</span>
            </div>
            
            {savedSongs.length === 0 ? (
              <div className="bg-gradient-to-br from-[#0c0d20] to-[#0a0b1e] rounded-2xl border border-green-500/20/50 p-10 text-center">
                <div className="w-14 h-14 bg-gray-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <p className="text-green-200/70 text-sm">No songs yet</p>
                <p className="text-gray-600 text-xs mt-1">Create your first study beat!</p>
              </div>
            ) : (
              savedSongs.map((song) => (
                <div
                  key={song.id}
                  onClick={() => setSelectedSong(song)}
                  className={`group bg-gradient-to-br from-[#0c0d20] to-[#0a0b1e] rounded-2xl border p-5 cursor-pointer transition-all duration-300 ${
                    selectedSong?.id === song.id
                      ? "border-green-500/50 shadow-lg shadow-purple-500/20 scale-[1.02]"
                      : "border-green-500/20/50 hover:border-green-500/30/50 hover:scale-[1.01]"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2 leading-snug">
                        {song.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-green-200/70">
                        <span className="bg-white/5 px-2 py-1 rounded-lg">{song.genre.toUpperCase()}</span>
                        <span>•</span>
                        <span>{new Date(song.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSong(song.id);
                      }}
                      className="text-gray-600 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-500/10"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Song Details */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#0c0d20] to-[#0a0b1e] rounded-3xl border border-green-500/20/50 p-8 shadow-2xl">
            {selectedSong ? (
              <>
                <div className="mb-8">
                  <h2 className="text-white text-3xl font-bold mb-3">{selectedSong.title}</h2>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-1.5 rounded-full font-semibold">
                      {selectedSong.genre.toUpperCase()}
                    </span>
                    <span className="text-green-200/70">{new Date(selectedSong.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-[#080916] border border-green-500/30/50 rounded-2xl p-6 max-h-[450px] overflow-y-auto mb-6">
                  <pre className="text-green-200 whitespace-pre-wrap font-sans text-sm leading-loose">
                    {selectedSong.lyrics}
                  </pre>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:scale-[1.02]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Play Song</span>
                  </button>
                  <button className="bg-white/5 hover:bg-white/10 text-green-200 hover:text-white px-8 py-4 rounded-2xl font-medium transition-all duration-300 border border-green-500/30/50 hover:border-gray-600/50 flex items-center justify-center gap-3">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Download</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-32">
                <div className="w-20 h-20 bg-gray-800/30 rounded-3xl flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-xl mb-2">No Song Selected</h3>
                <p className="text-green-200/70 text-sm">Click on a song from your library to view lyrics</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Playlists View */}
      {currentView === "playlists" && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-bold text-2xl">Your Playlists</h2>
            <button
              onClick={() => setShowNewPlaylistModal(true)}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center gap-2 shadow-lg shadow-purple-500/30 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>New Playlist</span>
            </button>
          </div>

          {playlists.length === 0 ? (
            <div className="bg-gradient-to-br from-[#0c0d20] to-[#0a0b1e] rounded-3xl border border-green-500/20/50 p-16 text-center shadow-2xl">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-2xl mb-2">No Playlists Yet</h3>
              <p className="text-green-200/70 text-sm mb-8 max-w-md mx-auto">Create playlists to organize your study songs by subject, difficulty, or study session</p>
              <button
                onClick={() => setShowNewPlaylistModal(true)}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 inline-flex items-center gap-3 shadow-lg shadow-purple-500/30 hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Create Your First Playlist</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="bg-gradient-to-br from-[#0c0d20] to-[#0a0b1e] rounded-3xl border border-green-500/20/50 p-6 hover:border-green-500/30/50 transition-all duration-300 hover:scale-[1.02] shadow-lg"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </div>
                    <button
                      onClick={() => handleDeletePlaylist(playlist.id)}
                      className="text-gray-600 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-500/10"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  
                  <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{playlist.name}</h3>
                  <p className="text-green-200/70 text-sm mb-5">
                    {playlist.songCount} songs • {new Date(playlist.createdAt).toLocaleDateString()}
                  </p>
                  
                  <button className="w-full bg-white/5 hover:bg-white/10 text-green-200 hover:text-white px-5 py-3 rounded-2xl font-medium transition-all duration-300 border border-green-500/30/50 hover:border-green-500/50">
                    Open Playlist
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* New Playlist Modal - Modern Design */}
      {showNewPlaylistModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-gradient-to-br from-[#0c0d20] to-[#0a0b1e] rounded-3xl border border-green-500/20/50 p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-white text-2xl font-bold mb-6">Create Playlist</h3>
            
            <div className="mb-8">
              <label className="text-green-200/70 text-sm font-medium mb-3 block">Playlist Name</label>
              <input
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                placeholder="e.g., Biology Finals Study Mix"
                className="w-full bg-[#080916] border border-green-500/30/50 rounded-2xl px-5 py-4 text-green-200 placeholder-green-300/50 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                autoFocus
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowNewPlaylistModal(false);
                  setNewPlaylistName("");
                }}
                className="flex-1 bg-white/5 hover:bg-white/10 text-green-200 hover:text-white px-6 py-4 rounded-2xl font-medium transition-all duration-300 border border-green-500/30/50 hover:border-gray-600/50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePlaylist}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-purple-500/30 hover:scale-105"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
