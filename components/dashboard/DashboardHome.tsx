"use client";

import ThemeToggle from '../ThemeToggle';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function DashboardHome() {
  const aiTools = [
    {
      id: "song-it",
      name: "Song It",
      description: "Transform notes into summaries and memorable lyrics for better retention.",
      iconType: "music",
      gradient: "from-green-500 to-green-600",
      badge: "NEW",
      badgeColor: "bg-green-500/20 text-green-400 border-green-500/30",
    },
    {
      id: "summarizer",
      name: "Summarizer",
      description: "Condense long texts into concise summaries quickly.",
      iconType: "document",
      gradient: "from-green-400 to-green-600",
      badge: "Popular",
      badgeColor: "bg-green-500/20 text-green-400 border-green-500/30",
    },
    {
      id: "solve-ai",
      name: "Solve AI",
      description: "AI problem solver with step-by-step explanations across subjects.",
      iconType: "lightbulb",
      gradient: "from-green-500 to-green-700",
      badge: null,
      badgeColor: "",
    },
    {
      id: "paper-grader",
      name: "Paper Grader",
      description: "Get instant essay feedback with rubric scores and suggestions.",
      iconType: "clipboard",
      gradient: "from-green-600 to-green-700",
      badge: null,
      badgeColor: "",
    },
    {
      id: "smart-notes",
      name: "Smart Notes",
      description: "AI-powered note organization and formatting.",
      iconType: "pencil",
      gradient: "from-green-500 to-green-600",
      badge: null,
      badgeColor: "",
    },
    {
      id: "quizzes",
      name: "Quizzes",
      description: "Generate interactive quizzes from any content.",
      iconType: "question",
      gradient: "from-green-400 to-green-600",
      badge: null,
      badgeColor: "",
    },
    {
      id: "flashcards",
      name: "Flashcards",
      description: "Create digital flashcards with spaced repetition.",
      iconType: "card",
      gradient: "from-green-500 to-green-700",
      badge: null,
      badgeColor: "",
    },
  ];

  const getIcon = (type: string) => {
    const iconClass = "w-6 h-6 text-white";
    
    switch(type) {
      case "music":
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        );
      case "document":
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case "lightbulb":
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      case "map":
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        );
      case "clipboard":
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        );
      case "pencil":
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        );
      case "question":
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "card":
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleToolClick = (toolId: string) => {
    const event = new CustomEvent('navigate-tool', { detail: toolId });
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F0D] via-[#0f1612] to-[#0A0F0D] p-8 animate-fade-in">
      {/* Enhanced Welcome Header with Better Spacing */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-5 animate-fade-in-up">
            {/* Improved Avatar with Gradient Border */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-300"></div>
              <div className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center shadow-2xl ring-4 ring-[#0A0F0D]">
                <span className="text-white font-bold text-2xl">B</span>
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white tracking-tight mb-1.5">
                Welcome back, <span className="text-gradient-primary">Bina Ale</span>! 👋
              </h1>
              <p className="text-gray-400 text-base">
                Here's what's happening with your study journey today
              </p>
            </div>
          </div>
          <div className="animate-fade-in">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* AI Tools Section - Enhanced Cards */}
      <section className="mb-12 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">Study AI Tools</h2>
          <div className="ml-auto">
            <span className="text-sm text-gray-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              {aiTools.length} tools available
            </span>
          </div>
        </div>
        
        {/* Featured Tools - Enhanced Full Width Row with shadcn Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {aiTools.slice(0, 2).map((tool, index) => (
            <Card
              key={tool.id}
              className="group relative cursor-pointer overflow-hidden hover-lift transition-all duration-500 border-green-500/20 bg-gradient-to-br from-[#0c0d20]/80 to-[#0a0b1e]/90 backdrop-blur"
              style={{animationDelay: `${0.15 + index * 0.05}s`}}
              onClick={() => handleToolClick(tool.id)}
            >
              {/* Animated Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} />
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
              
              <CardHeader className="relative z-10">
                {/* Icon and Badge Row */}
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-14 h-14 bg-gradient-to-br ${tool.gradient} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                    {getIcon(tool.iconType)}
                  </div>
                  {tool.badge && (
                    <Badge variant="secondary" className={`${tool.badgeColor} border backdrop-blur-sm shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                      {tool.badge}
                    </Badge>
                  )}
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl group-hover:text-gray-50 transition-colors duration-300 mb-2">
                      {tool.name}
                    </CardTitle>
                    <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {tool.description}
                    </CardDescription>
                  </div>
                  <svg 
                    className="w-5 h-5 text-gray-500 group-hover:text-green-400 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </CardHeader>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/0 group-hover:ring-green-500/30 transition-all duration-500" />
            </Card>
          ))}
        </div>

        {/* Other Tools - Enhanced Regular Grid with shadcn Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {aiTools.slice(2).map((tool, index) => (
            <Card
              key={tool.id}
              className="group relative cursor-pointer overflow-hidden hover-lift transition-all duration-500 border-green-500/20 bg-gradient-to-br from-[#0c0d20]/60 to-[#0a0b1e]/80 backdrop-blur"
              style={{animationDelay: `${0.2 + index * 0.05}s`}}
              onClick={() => handleToolClick(tool.id)}
            >
              {/* Hover Gradient Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <CardContent className="relative z-10 p-6">
                {/* Icon and Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${tool.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                    {getIcon(tool.iconType)}
                  </div>
                  {tool.badge && (
                    <Badge variant="secondary" className={`${tool.badgeColor} border backdrop-blur-sm group-hover:scale-105 transition-transform duration-300`}>
                      {tool.badge}
                    </Badge>
                  )}
                </div>

                <CardTitle className="text-base mb-2 group-hover:text-gray-50 transition-colors duration-300">
                  {tool.name}
                </CardTitle>

                <CardDescription className="text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {tool.description}
                </CardDescription>
              </CardContent>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 group-hover:ring-green-500/30 transition-all duration-500" />
            </Card>
          ))}
        </div>
      </section>

      {/* Enhanced Stats Grid with Better Visual Design using shadcn Cards */}
      <section className="mb-12 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* AI Words Usage - Enhanced Card */}
          <Card className="relative group border-blue-500/20 bg-gradient-to-br from-[#0c0d20]/80 to-[#0a0b1e]/90 hover-lift">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <CardTitle className="text-base">AI Words</CardTitle>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-white mb-1">8</p>
                  <p className="text-gray-400 text-sm">Remaining</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-sm line-through mb-0.5">245</p>
                  <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/30">
                    Low
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity - Enhanced Card */}
          <Card className="relative group border-green-500/20 bg-gradient-to-br from-[#0c0d20]/80 to-[#0a0b1e]/90 hover-lift">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <CardTitle className="text-base">Activity</CardTitle>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-white mb-1">62</p>
                  <p className="text-gray-400 text-sm">Minutes today</p>
                </div>
                <div className="text-right">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mb-0.5">
                    +18%
                  </Badge>
                  <p className="text-gray-500 text-xs">vs yesterday</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tools Used - Enhanced Card */}
          <Card className="relative group border-purple-500/20 bg-gradient-to-br from-[#0c0d20]/80 to-[#0a0b1e]/90 hover-lift">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <CardTitle className="text-base">Tools Used</CardTitle>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-white mb-1">5</p>
                  <p className="text-gray-400 text-sm">This week</p>
                </div>
                <div className="text-right">
                  <p className="text-purple-400 text-sm font-semibold mb-0.5">Song It</p>
                  <p className="text-gray-500 text-xs">Most used</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Enhanced Quick Actions with shadcn Cards */}
      <section className="animate-fade-in-up" style={{animationDelay: '0.4s'}}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card className="group cursor-pointer border-green-500/20 bg-gradient-to-br from-[#0c0d20]/80 to-[#0a0b1e]/90 hover-lift">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base mb-1 group-hover:text-gray-50 transition-colors">Continue Last Session</CardTitle>
                  <CardDescription className="group-hover:text-gray-300 transition-colors">Resume Song It from 2 hours ago</CardDescription>
                </div>
                <svg className="w-5 h-5 text-gray-500 group-hover:text-green-400 transform group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </CardContent>
          </Card>

          <Card className="group cursor-pointer border-blue-500/20 bg-gradient-to-br from-[#0c0d20]/80 to-[#0a0b1e]/90 hover-lift">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base mb-1 group-hover:text-gray-50 transition-colors">View History</CardTitle>
                  <CardDescription className="group-hover:text-gray-300 transition-colors">Access your past work and study sessions</CardDescription>
                </div>
                <svg className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transform group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
