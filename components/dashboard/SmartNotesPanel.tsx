"use client";

import { useState } from "react";

export default function SmartNotesPanel() {
  const [inputText, setInputText] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputText(text);
    } catch (err) {
      // Clipboard access denied or not available
      console.log("Clipboard access not available. Please paste manually.");
      alert("Please paste your text manually using Ctrl+V or Cmd+V");
    }
  };

  const handleGenerateNotes = async () => {
    if (!inputText.trim()) {
      alert("Please enter some text first!");
      return;
    }

    setIsLoading(true);
    try {
      // Import the API client
      const { ApiClient } = await import("@/lib/api-client");
      
      // Get real AI-generated notes using Gemini
      const result = await ApiClient.generateSmartNotes(inputText);
      
      setNotes(result.notes);
    } catch (error) {
      console.error("Error generating notes:", error);
      
      // Fallback notes if API fails
      setNotes(`# Study Notes

## Key Concepts
- Point 1: Important concept extracted from your text
- Point 2: Another key insight organized clearly
- Point 3: Summary of main ideas

## Detailed Notes
Your organized notes with proper formatting and structure will appear here. The AI analyzes your content and creates well-structured study notes.

## Action Items
- Review these notes
- Create flashcards from key points
- Test understanding with quizzes`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Smart Notes</h1>
            <p className="text-green-200/70 text-sm">
              AI-powered note organization and formatting
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-950 rounded-xl border border-green-500/20 p-6">
          <label className="text-white font-medium mb-3 block">
            Input Text
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste or type your text here to generate smart notes..."
            className="w-full h-96 bg-black border border-green-500/30 rounded-lg p-4 text-green-200 placeholder-green-300/50 focus:outline-none focus:border-green-500 resize-none mb-4"
          />
          
          <div className="flex gap-3">
            <button
              onClick={handlePaste}
              className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-3 rounded-lg font-medium transition-colors border border-green-500/30 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Paste Text
            </button>
            <button className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-3 rounded-lg font-medium transition-colors border border-green-500/30 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Upload File
            </button>
          </div>
        </div>

        <div className="bg-gray-950 rounded-xl border border-green-500/20 p-6">
          <label className="text-white font-medium mb-3 block">
            Generated Notes
          </label>
          <div className="w-full h-96 bg-black border border-green-500/30 rounded-lg p-4 overflow-y-auto mb-4">
            {notes ? (
              <pre className="text-green-200 whitespace-pre-wrap font-sans">
                {notes}
              </pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <p className="text-green-200/70 font-medium mb-2">
                  Generated notes will appear here
                </p>
                <p className="text-green-300/50 text-sm">
                  Enter your text in the input field and click Generate Notes
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handleGenerateNotes}
            disabled={isLoading || !inputText.trim()}
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Generate Notes (Free)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
