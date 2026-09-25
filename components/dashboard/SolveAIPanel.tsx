"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  PaperAirplaneIcon,
  Bars3Icon,
  XMarkIcon,
  PlusIcon,
  AcademicCapIcon,
  CalculatorIcon,
  BeakerIcon,
  BoltIcon,
  BookOpenIcon,
  CodeBracketIcon,
  BuildingLibraryIcon,
  GlobeAltIcon,
  LightBulbIcon,
  CogIcon,
  TrashIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  subject: string | null;
  createdAt: number;
}

const subjects = [
  "General",
  "Math",
  "Biology",
  "Chemistry",
  "Physics",
  "History",
  "Computer Science",
  "Literature",
  "Geography",
  "Psychology",
  "Engineering",
];

const getSubjectIcon = (subject: string) => {
  const iconClass = "w-6 h-6";
  switch (subject) {
    case "Math":
      return <CalculatorIcon className={iconClass} />;
    case "Biology":
      return <BeakerIcon className={iconClass} />;
    case "Chemistry":
      return <BeakerIcon className={iconClass} />;
    case "Physics":
      return <BoltIcon className={iconClass} />;
    case "History":
      return <BookOpenIcon className={iconClass} />;
    case "Computer Science":
      return <CodeBracketIcon className={iconClass} />;
    case "Literature":
      return <BuildingLibraryIcon className={iconClass} />;
    case "Geography":
      return <GlobeAltIcon className={iconClass} />;
    case "Psychology":
      return <LightBulbIcon className={iconClass} />;
    case "Engineering":
      return <CogIcon className={iconClass} />;
    default:
      return <AcademicCapIcon className={iconClass} />;
  }
};

export default function SolveAIPanel() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);
  const [showCustomSubject, setShowCustomSubject] = useState(false);
  const [customSubject, setCustomSubject] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load sessions from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("solve_ai_sessions");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSessions(parsed);
      } catch (error) {
        console.error("Failed to parse sessions:", error);
      }
    }
  }, []);

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem("solve_ai_sessions", JSON.stringify(sessions));
    }
  }, [sessions]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessions, currentSessionId]);

  // Debug: Track currentSessionId changes
  useEffect(() => {
    console.log("currentSessionId changed to:", currentSessionId);
    console.log("currentSession is now:", currentSession);
  }, [currentSessionId]);

  const currentSession = sessions.find((s) => s.id === currentSessionId);

  const createNewChat = (subject: string) => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: `${subject} Chat`,
      messages: [],
      subject,
      createdAt: Date.now(),
    };
    setSessions([newSession, ...sessions]);
    setCurrentSessionId(newSession.id);
  };

  const handleNewChatClick = () => {
    console.log("🔵 New Chat button clicked!");
    console.log("📊 Current state:", {
      currentSessionId,
      totalSessions: sessions.length,
      currentSession: currentSession?.title
    });
    
    // Reset to subject selection view (same as initial state)
    setCurrentSessionId(null);
    setInput("");
    
    // Close sidebar on mobile after clicking
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setShowSidebar(false);
    }
    
    console.log("✅ Showing subject selection screen");
  };

  const sendMessage = async () => {
    if (!input.trim() || !currentSessionId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: Date.now(),
    };

    // Add user message
    setSessions((prev) =>
      prev.map((session) =>
        session.id === currentSessionId
          ? { ...session, messages: [...session.messages, userMessage] }
          : session
      )
    );

    const currentInput = input;
    setInput("");
    setIsTyping(true);

    try {
      // Import the API client dynamically to avoid server-side issues
      const { ApiClient } = await import("@/lib/api-client");
      
      // Get real AI response using Gemini
      const result = await ApiClient.solveProblem(currentInput, currentSession?.subject || "General");

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: result.solution,
        timestamp: Date.now(),
      };

      setSessions((prev) =>
        prev.map((session) =>
          session.id === currentSessionId
            ? { ...session, messages: [...session.messages, aiMessage] }
            : session
        )
      );
    } catch (error) {
      console.error("Error getting AI response:", error);
      
      // Fallback to demo response if API fails
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateAIResponse(currentInput, currentSession?.subject || "General"),
        timestamp: Date.now(),
      };

      setSessions((prev) =>
        prev.map((session) =>
          session.id === currentSessionId
            ? { ...session, messages: [...session.messages, aiMessage] }
            : session
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  const generateAIResponse = (question: string, subject: string): string => {
    const responses: { [key: string]: string[] } = {
      Math: [
        "Let me help you solve this math problem step by step...",
        "Here's the mathematical approach: First, we need to identify the key variables...",
        "This is a great question! Let's break down the problem using fundamental principles...",
      ],
      Biology: [
        "In biology, this concept relates to cellular processes...",
        "Let me explain the biological mechanism behind this...",
        "This is an interesting biological phenomenon. Here's how it works...",
      ],
      Chemistry: [
        "From a chemistry perspective, we need to consider the molecular structure...",
        "Let's analyze the chemical reaction step by step...",
        "This involves understanding chemical bonds and reactions...",
      ],
      Physics: [
        "According to the laws of physics, this can be explained by...",
        "Let's apply Newton's principles to understand this better...",
        "The physics behind this involves energy and motion...",
      ],
      History: [
        "Historically, this event is significant because...",
        "Let me provide some historical context for this topic...",
        "This period in history was marked by important developments...",
      ],
      "Computer Science": [
        "In programming, we can approach this problem using algorithms...",
        "Let me explain the computational logic behind this...",
        "This concept is fundamental to computer science...",
      ],
      Literature: [
        "From a literary perspective, this work explores themes of...",
        "The author uses various literary devices to convey...",
        "This text is significant in literature because...",
      ],
      Geography: [
        "Geographically, this region is characterized by...",
        "Let's explore the geographical features and their impact...",
        "This location plays an important role due to its geography...",
      ],
      Psychology: [
        "From a psychological standpoint, this behavior can be understood through...",
        "Psychologically, this phenomenon relates to cognitive processes...",
        "Let me explain the psychological theories that apply here...",
      ],
      Engineering: [
        "From an engineering perspective, we need to consider design principles...",
        "This engineering problem requires systematic analysis...",
        "Let's approach this using engineering methodologies...",
      ],
      General: [
        "That's a great question! Let me help you understand this better...",
        "Here's a comprehensive explanation of your query...",
        "Let me break this down into simpler concepts...",
      ],
    };

    const subjectResponses = responses[subject] || responses.General;
    const randomResponse =
      subjectResponses[Math.floor(Math.random() * subjectResponses.length)];

    return `${randomResponse}\n\nBased on your question: "${question}"\n\nI can provide detailed explanations, solve problems step-by-step, and help you master this topic. Would you like me to elaborate on any specific aspect?`;
  };

  const deleteSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    if (currentSessionId === sessionId) {
      setCurrentSessionId(null);
    }
    setShowDeleteModal(false);
    setSessionToDelete(null);
  };

  const handleDeleteClick = (sessionId: string) => {
    setSessionToDelete(sessionId);
    setShowDeleteModal(true);
  };

  const handleCustomSubject = () => {
    if (customSubject.trim()) {
      createNewChat(customSubject.trim());
      setCustomSubject("");
      setShowCustomSubject(false);
    }
  };

  return (
    <div className="relative flex h-screen bg-gradient-to-br from-black via-gray-950 to-black">
      {/* Development Debug Panel - Remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 bg-black/90 backdrop-blur-xl border border-green-500/30 rounded-xl p-3 text-xs text-white font-mono z-50 max-w-xs">
          <div className="font-bold mb-2 text-green-400">🐛 Debug Info</div>
          <div className="space-y-1 text-green-100">
            <div>Session ID: {currentSessionId || 'null'}</div>
            <div>Total Sessions: {sessions.length}</div>
            <div>Current Session: {currentSession?.title || 'none'}</div>
            <div>View: {currentSession ? 'Chat' : 'Subject Selection'}</div>
            <div>Sidebar: {showSidebar ? 'Open' : 'Closed'}</div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-black/90 backdrop-blur-xl border border-green-500/30 rounded-3xl p-6 max-w-md w-full shadow-2xl shadow-green-500/20 animate-scale-in">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center border border-red-500/30">
                <TrashIcon className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Delete Chat</h3>
                <p className="text-sm text-green-200">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-green-100 mb-6">
              Are you sure you want to delete this conversation? All messages will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSessionToDelete(null);
                }}
                className="flex-1 px-4 py-3 bg-green-500/10 hover:bg-green-500/20 backdrop-blur-xl text-green-100 rounded-xl transition-all border border-green-500/30 hover:border-green-500/40 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => sessionToDelete && deleteSession(sessionToDelete)}
                className="flex-1 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-xl text-red-400 hover:text-red-300 rounded-xl transition-all border border-red-500/30 hover:border-red-500/40 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Subject Modal */}
      {showCustomSubject && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-black/90 backdrop-blur-xl border border-green-500/30 rounded-3xl p-6 max-w-md w-full shadow-2xl shadow-green-500/20 animate-scale-in">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center border border-green-500/30">
                <SparklesIcon className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Custom Subject</h3>
                <p className="text-sm text-green-200">Enter your study topic</p>
              </div>
            </div>
            <input
              type="text"
              value={customSubject}
              onChange={(e) => setCustomSubject(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleCustomSubject()}
              placeholder="e.g., Philosophy, Economics, Art History..."
              className="w-full px-4 py-3 bg-green-500/5 backdrop-blur-xl border border-green-500/30 focus:border-green-500/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/30 text-white placeholder-green-300/50 mb-6"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCustomSubject(false);
                  setCustomSubject("");
                }}
                className="flex-1 px-4 py-3 bg-green-500/10 hover:bg-green-500/20 backdrop-blur-xl text-green-100 rounded-xl transition-all border border-green-500/30 hover:border-green-500/40 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCustomSubject}
                disabled={!customSubject.trim()}
                className="flex-1 px-4 py-3 bg-green-500/30 hover:bg-green-500/40 backdrop-blur-xl text-white rounded-xl transition-all border border-green-500/50 hover:border-green-500/60 font-medium disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Start Chat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Glassy Sidebar Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-10 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full z-20 transition-all duration-300 ease-in-out ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative`}
        style={{ width: "280px" }}
      >
        <div className="flex flex-col h-full bg-black/40 backdrop-blur-xl border-r border-green-500/20">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-green-500/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Chat History</h2>
              <button
                onClick={() => setShowSidebar(false)}
                className="lg:hidden p-2 hover:bg-green-500/10 rounded-xl transition-colors"
              >
                <XMarkIcon className="w-5 h-5 text-green-200" />
              </button>
            </div>
            
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("🎯 Sidebar New Chat button physical click detected");
                handleNewChatClick();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500/20 hover:bg-green-500/30 backdrop-blur-xl text-white rounded-xl transition-all border border-green-500/40 hover:border-green-500/50 hover:scale-[1.02] active:scale-95"
            >
              <PlusIcon className="w-5 h-5" />
              <span>New Chat</span>
            </button>
          </div>

          {/* Sessions List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin scrollbar-thumb-green-500/20 scrollbar-track-transparent">
            {sessions.length === 0 ? (
              <div className="text-center text-green-200 mt-12 px-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                  <SparklesIcon className="w-8 h-8 text-green-400" />
                </div>
                <p className="text-sm">No chats yet</p>
                <p className="text-xs mt-2 opacity-70">Start a conversation to begin</p>
              </div>
            ) : (
              sessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => setCurrentSessionId(session.id)}
                  className={`group relative p-3 rounded-xl cursor-pointer transition-all ${
                    currentSessionId === session.id
                      ? "bg-green-500/30 backdrop-blur-xl border border-green-500/50"
                      : "bg-green-500/5 hover:bg-green-500/15 border border-green-500/20 hover:border-green-500/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 ${currentSessionId === session.id ? 'text-green-300' : 'text-green-400 group-hover:text-green-300'}`}>
                      {getSubjectIcon(session.subject || "General")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white text-sm truncate">{session.title}</p>
                      <p className={`text-xs truncate mt-1 ${
                        currentSessionId === session.id ? "text-green-100" : "text-green-300/70"
                      }`}>
                        {session.messages.length > 0
                          ? session.messages[session.messages.length - 1].content.slice(0, 40) + "..."
                          : "No messages yet"}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(session.id);
                      }}
                      className={`flex-shrink-0 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all ${
                        currentSessionId === session.id
                          ? "hover:bg-green-500/20 text-green-200"
                          : "hover:bg-green-500/10 text-green-300"
                      }`}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-black/40 backdrop-blur-xl border-b border-green-500/20 px-6 py-4">
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            <div className="flex items-center gap-4">
              {!showSidebar && (
                <button
                  onClick={() => setShowSidebar(true)}
                  className="lg:hidden p-2 hover:bg-green-500/10 rounded-xl transition-colors"
                >
                  <Bars3Icon className="w-6 h-6 text-green-300" />
                </button>
              )}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/30 to-green-600/20 backdrop-blur-xl flex items-center justify-center border border-green-500/40">
                  <SparklesIcon className="w-6 h-6 text-green-300" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Solve AI</h1>
                  <p className="text-xs text-green-200">Your AI Study Assistant</p>
                </div>
              </div>
            </div>
            
            {/* New Chat button in header when chat is active */}
            {currentSessionId && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log("🎯 Header New Chat button physical click detected");
                  handleNewChatClick();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 backdrop-blur-xl text-white rounded-xl transition-all border border-green-500/40 hover:border-green-500/50 text-sm hover:scale-105 active:scale-95"
              >
                <PlusIcon className="w-4 h-4" />
                <span className="hidden sm:inline">New Chat</span>
              </button>
            )}
          </div>
        </div>

        {/* Chat Content */}
        <div className="flex-1 overflow-hidden">
          {!currentSession ? (
            /* Empty State - Subject Selection */
            <div className="h-full flex items-center justify-center p-6">
              <div className="max-w-4xl w-full">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500/30 to-green-600/20 backdrop-blur-xl rounded-3xl mb-6 border border-green-500/40">
                    <AcademicCapIcon className="w-10 h-10 text-green-300" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-3">
                    What would you like to learn today?
                  </h2>
                  <p className="text-green-200 text-lg">Choose a subject to start your AI-powered study session</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {subjects.map((subject) => (
                    <button
                      key={subject}
                      onClick={() => createNewChat(subject)}
                      className="w-full flex items-center justify-start gap-3 px-4 py-3 bg-green-500/20 hover:bg-green-500/30 backdrop-blur-xl text-white rounded-xl transition-all border border-green-500/40 hover:border-green-500/50"
                    >
                      {getSubjectIcon(subject)}
                      <span className="text-sm font-medium">{subject}</span>
                    </button>
                  ))}
                  
                  {/* Custom Subject Button */}
                  <button
                    onClick={() => setShowCustomSubject(true)}
                    className="w-full flex items-center justify-start gap-3 px-4 py-3 bg-green-500/20 hover:bg-green-500/30 backdrop-blur-xl text-white rounded-xl transition-all border-2 border-green-500/50 hover:border-green-500/60 border-dashed"
                  >
                    <PlusIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">Other</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Chat Messages */
            <div className="flex flex-col h-full">
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                <div className="max-w-4xl mx-auto space-y-6">
                  {currentSession.messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full min-h-[400px]">
                      <div className="text-center max-w-md">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500/30 to-green-600/20 backdrop-blur-xl rounded-3xl mb-6 border border-green-500/40">
                          {getSubjectIcon(currentSession.subject || "General")}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">
                          {currentSession.title}
                        </h3>
                        <p className="text-green-200 text-lg mb-6">
                          I'm here to help you learn {currentSession.subject}!
                        </p>
                        <div className="bg-green-500/10 backdrop-blur-xl border border-green-500/20 rounded-2xl p-4 text-left">
                          <p className="text-sm text-green-100 mb-3 font-medium">Try asking me:</p>
                          <ul className="space-y-2 text-sm text-green-200/80">
                            <li className="flex items-start gap-2">
                              <span className="text-green-400 mt-0.5">•</span>
                              <span>Explain a concept or topic</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-400 mt-0.5">•</span>
                              <span>Help solve a problem step-by-step</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-400 mt-0.5">•</span>
                              <span>Answer questions about your homework</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-400 mt-0.5">•</span>
                              <span>Review and practice key concepts</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {currentSession.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-4 ${
                              message.role === "user"
                                ? "bg-green-500/30 backdrop-blur-xl text-white border border-green-500/50 shadow-lg shadow-green-500/10"
                                : "bg-green-500/10 backdrop-blur-xl border border-green-500/20 text-green-50"
                            }`}
                          >
                            <p className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed">{message.content}</p>
                            <p className={`text-xs mt-3 ${
                              message.role === "user" ? "text-green-100" : "text-green-300/70"
                            }`}>
                              {new Date(message.timestamp).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-green-500/10 backdrop-blur-xl border border-green-500/20 rounded-2xl px-6 py-4">
                            <div className="flex gap-2">
                              <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></span>
                              <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                              <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </>
                  )}
                </div>
              </div>

              {/* Input Area */}
              <div className="border-t border-green-500/20 bg-black/40 backdrop-blur-xl px-4 sm:px-6 py-4">
                <div className="max-w-4xl mx-auto">
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                        placeholder="Ask me anything..."
                        className="w-full px-5 py-4 bg-green-500/5 backdrop-blur-xl border border-green-500/30 focus:border-green-500/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/30 text-white placeholder-green-300/50 transition-all"
                        disabled={isTyping}
                      />
                    </div>
                    <button
                      onClick={sendMessage}
                      disabled={!input.trim() || isTyping}
                      className="px-6 py-4 bg-green-500/30 hover:bg-green-500/40 backdrop-blur-xl text-white rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2 border border-green-500/50 hover:border-green-500/60 hover:shadow-lg hover:shadow-green-500/20"
                    >
                      <PaperAirplaneIcon className="w-5 h-5" />
                      <span className="hidden sm:inline text-sm font-medium">Send</span>
                    </button>
                  </div>
                  <p className="text-xs text-green-300/60 mt-3 text-center">
                    Press Enter to send • Shift + Enter for new line
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        
        /* Modal animation */
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
