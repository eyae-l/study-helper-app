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
import { initializeDemoStudySet } from "@/lib/init-demo-data";
import { getDemoUserId } from "@/lib/demo-user";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [studySetId, setStudySetId] = useState<string | null>(null);
  const [userId] = useState(getDemoUserId());
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize demo data on mount
  useEffect(() => {
    const initData = async () => {
      try {
        console.log('Initializing demo data...');
        const studySet = await initializeDemoStudySet();
        if (studySet) {
          console.log('Study set initialized:', studySet.id);
          setStudySetId(studySet.id);
        } else {
          console.error('Failed to initialize study set');
        }
        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to initialize demo data:", error);
        setIsInitialized(true);
      }
    };

    initData();
  }, []);

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

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0b1e]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0a0b1e]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1">
        {activeTab === "dashboard" && <DashboardHome />}
        {activeTab === "study-beats" && <StudyBeatsPanel />}
        {activeTab === "summarizer" && <SummarizerPanel />}
        {activeTab === "smart-notes" && <SmartNotesPanel />}
        {activeTab === "quizzes" && studySetId && <QuizzesPanel studySetId={studySetId} userId={userId} />}
        {activeTab === "flashcards" && studySetId && <FlashcardsPanel studySetId={studySetId} userId={userId} />}
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
