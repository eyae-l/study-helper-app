"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHome from "@/components/dashboard/DashboardHome";
import StudyBeatsPanel from "@/components/dashboard/StudyBeatsPanel";
import SummarizerPanel from "@/components/dashboard/SummarizerPanel";
import SmartNotesPanel from "@/components/dashboard/SmartNotesPanel";
import QuizzesPanel from "@/components/dashboard/QuizzesPanel";
import FlashcardsPanel from "@/components/dashboard/FlashcardsPanel";
import HistoryPanel from "@/components/dashboard/HistoryPanel";
import SettingsPanel from "@/components/dashboard/SettingsPanel";
import PlanBillingPanel from "@/components/dashboard/PlanBillingPanel";
import ProgressPanel from "@/components/dashboard/ProgressPanel";
import SolveAIPanel from "@/components/dashboard/SolveAIPanel";
import MindMapPanel from "@/components/dashboard/MindMapPanel";
import PaperGraderPanel from "@/components/dashboard/PaperGraderPanel";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Listen for tool navigation events from dashboard cards
  useEffect(() => {
    const handleNavigateTool = (event: CustomEvent) => {
      setActiveTab(event.detail);
    };

    window.addEventListener('navigate-tool', handleNavigateTool as EventListener);
    
    return () => {
      window.removeEventListener('navigate-tool', handleNavigateTool as EventListener);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0a0b1e]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1">
        {activeTab === "dashboard" && <DashboardHome />}
        {activeTab === "study-beats" && <StudyBeatsPanel />}
        {activeTab === "summarizer" && <SummarizerPanel />}
        {activeTab === "smart-notes" && <SmartNotesPanel />}
        {activeTab === "quizzes" && <QuizzesPanel />}
        {activeTab === "flashcards" && <FlashcardsPanel />}
        {activeTab === "solve-ai" && <SolveAIPanel />}
        {activeTab === "mind-map" && <MindMapPanel />}
        {activeTab === "paper-grader" && <PaperGraderPanel />}
        {activeTab === "progress" && <ProgressPanel />}
        {activeTab === "history" && <HistoryPanel />}
        {activeTab === "settings" && <SettingsPanel />}
        {activeTab === "upgrade-plan" && <PlanBillingPanel />}
      </main>
    </div>
  );
}
