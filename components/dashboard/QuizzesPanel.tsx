"use client";

import { useState } from "react";

type Difficulty = "easy" | "medium" | "hard";
type QuestionType = "multiple-choice" | "fill-blanks";

interface QuizzesPanelProps {
  studySetId: string;
  userId: string;
}

export default function QuizzesPanel({ studySetId, userId }: QuizzesPanelProps) {
  const [inputText, setInputText] = useState("");
  const [quiz, setQuiz] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [questionType, setQuestionType] = useState<QuestionType>("multiple-choice");

  const handleGenerateQuiz = async () => {
    if (!inputText.trim()) {
      alert("Please enter some text first!");
      return;
    }

    setIsLoading(true);
    try {
      // Import the API client
      const { ApiClient } = await import("@/lib/api-client");
      
      // Generate quiz using backend API (which uses Gemini)
      const result = await ApiClient.generateQuiz({
        content: inputText,
        title: `${difficulty} Quiz`,
        difficulty,
        count: numQuestions,
        studySetId,
        userId,
      });
      
      // Parse and format the quiz
      try {
        const quizData = result.questions || JSON.parse(result.questions);
        let formattedQuiz = `Generated Quiz (${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Difficulty - ${questionType === "multiple-choice" ? "Multiple Choice" : "Fill in the Blanks"})\n\n`;
        
        if (questionType === "multiple-choice") {
          quizData.forEach((q: any, index: number) => {
            formattedQuiz += `Q${index + 1}: ${q.question}\n`;
            q.options.forEach((opt: string, i: number) => {
              formattedQuiz += `${String.fromCharCode(65 + i)}) ${opt}\n`;
            });
            formattedQuiz += `Answer: ${String.fromCharCode(65 + q.correctAnswer)}\n`;
            if (q.explanation) {
              formattedQuiz += `Explanation: ${q.explanation}\n`;
            }
            formattedQuiz += `\n`;
          });
        } else {
          // Convert to fill-in-the-blanks format
          quizData.forEach((q: any, index: number) => {
            const blank = q.options[q.correctAnswer];
            const question = q.question.replace(blank, "__________");
            formattedQuiz += `Q${index + 1}: ${question}\n`;
            formattedQuiz += `Answer: ${blank}\n\n`;
          });
        }
        
        setQuiz(formattedQuiz);
      } catch (parseError) {
        // If parsing fails, use the raw response
        setQuiz(aiQuiz);
      }
    } catch (error) {
      console.error("Error generating quiz:", error);
      
      // Fallback quiz if API fails
      const typeLabel = questionType === "multiple-choice" ? "Multiple Choice" : "Fill in the Blanks";
      setQuiz(`Generated Quiz (${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Difficulty - ${typeLabel})

${questionType === "multiple-choice" ? `Q1: What is the main topic discussed?
A) Option A
B) Option B
C) Option C
D) Option D
Answer: B

Q2: Which concept is most important?
A) First concept
B) Second concept
C) Third concept
D) Fourth concept
Answer: A` : `Q1: The main topic discussed is __________.
Answer: [key concept]

Q2: __________ is the most important concept in this material.
Answer: [specific concept]`}

... (${numQuestions} questions total)`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/20">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Quizzes</h1>
            <p className="text-green-200/70 text-sm">
              Generate interactive quizzes from your content
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
            placeholder="Paste or type your text here to generate a quiz..."
            className="w-full h-64 bg-black border border-green-500/30 rounded-lg p-4 text-green-200 placeholder-green-300/50 focus:outline-none focus:border-green-500/60 resize-none mb-4"
          />

          <div className="mb-4">
            <label className="text-white text-sm font-medium mb-2 block">
              Number of Questions
            </label>
            <div className="flex gap-2">
              {[5, 10, 15, 20].map((num) => (
                <button
                  key={num}
                  onClick={() => setNumQuestions(num)}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    numQuestions === num
                      ? "bg-orange-600 text-white"
                      : "bg-gray-800 text-green-200/70 hover:bg-gray-700"
                  }`}
                >
                  {num}
                </button>
              ))}
              <button
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-gray-800 text-green-200/70 hover:bg-gray-700"
              >
                Custom
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-white text-sm font-medium mb-2 block">
              Question Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setQuestionType("multiple-choice")}
                className={`px-4 py-3 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${
                  questionType === "multiple-choice"
                    ? "bg-green-500 text-white shadow-lg shadow-green-500/50"
                    : "bg-black text-green-200/70 hover:bg-gray-900 border border-green-500/30"
                }`}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <span className="text-sm">Multiple Choice</span>
              </button>
              <button
                onClick={() => setQuestionType("fill-blanks")}
                className={`px-4 py-3 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${
                  questionType === "fill-blanks"
                    ? "bg-green-500 text-white shadow-lg shadow-green-500/50"
                    : "bg-black text-green-200/70 hover:bg-gray-900 border border-green-500/30"
                }`}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span className="text-sm">Fill in the Blanks</span>
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-white text-sm font-medium mb-2 block">
              Difficulty Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setDifficulty("easy")}
                className={`px-4 py-3 rounded-lg font-medium capitalize transition-all flex flex-col items-center gap-1 ${
                  difficulty === "easy"
                    ? "bg-green-500 text-white shadow-lg shadow-green-500/50"
                    : "bg-black text-green-200/70 hover:bg-gray-900 border border-green-500/30"
                }`}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">Easy</span>
              </button>
              <button
                onClick={() => setDifficulty("medium")}
                className={`px-4 py-3 rounded-lg font-medium capitalize transition-all flex flex-col items-center gap-1 ${
                  difficulty === "medium"
                    ? "bg-green-600 text-white shadow-lg shadow-green-600/50"
                    : "bg-black text-green-200/70 hover:bg-gray-900 border border-green-500/30"
                }`}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span className="text-sm">Medium</span>
              </button>
              <button
                onClick={() => setDifficulty("hard")}
                className={`px-4 py-3 rounded-lg font-medium capitalize transition-all flex flex-col items-center gap-1 ${
                  difficulty === "hard"
                    ? "bg-green-700 text-white shadow-lg shadow-green-700/50"
                    : "bg-black text-green-200/70 hover:bg-gray-900 border border-green-500/30"
                }`}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
                <span className="text-sm">Hard</span>
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-3 rounded-lg font-medium transition-colors border border-green-500/30 flex items-center justify-center gap-2">
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
            Generated Quiz
          </label>
          <div className="w-full h-64 bg-black border border-green-500/30 rounded-lg p-4 overflow-y-auto mb-4">
            {quiz ? (
              <pre className="text-green-200 whitespace-pre-wrap font-sans">
                {quiz}
              </pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-orange-600/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-green-200/70 font-medium mb-2">
                  Generated quiz questions will appear here
                </p>
                <p className="text-green-300/50 text-sm">
                  Enter your text in the input field and click Generate Quiz
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handleGenerateQuiz}
            disabled={isLoading || !inputText.trim()}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-green-500/30"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate Quiz (Free)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
