"use client";

import ThemeToggle from '../ThemeToggle';

export default function DashboardHome() {
  const aiTools = [
    {
      id: "study-beats",
      name: "Study Beats AI",
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
      id: "mind-map",
      name: "Mind Map",
      description: "Visualize knowledge with interactive hierarchical diagrams.",
      iconType: "map",
      gradient: "from-green-400 to-green-500",
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black dark:from-black dark:via-gray-950 dark:to-black light:from-white light:via-gray-50 light:to-white p-8">
      {/* Welcome Header */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white dark:text-white light:text-gray-900">
                Welcome back, Bina Ale! 👋
              </h1>
              <p className="text-green-200 dark:text-green-200 light:text-gray-600 text-sm mt-1">
                Here is what's happening with your Study account today.
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* AI Tools Section */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h2 className="text-xl font-bold text-white">Study AI Tools</h2>
        </div>
        
        {/* Featured Tools - Full Width Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {aiTools.slice(0, 2).map((tool) => (
            <button
              key={tool.id}
              onClick={() => handleToolClick(tool.id)}
              className="group relative bg-gradient-to-br from-gray-900/80 to-black/80 dark:from-gray-900/80 dark:to-black/80 light:from-white light:to-gray-50 backdrop-blur rounded-2xl p-5 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/10 text-left overflow-hidden"
            >
              {/* Subtle gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300 rounded-2xl`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon and Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="group-hover:scale-105 transition-transform duration-300">
                    {getIcon(tool.iconType)}
                  </div>
                  {tool.badge && (
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${tool.badgeColor} border`}>
                      {tool.badge}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-white dark:text-white light:text-gray-900 font-semibold text-base mb-1.5 group-hover:text-gray-100 dark:group-hover:text-gray-100 light:group-hover:text-gray-700 transition-colors duration-300">
                  {tool.name}
                </h3>

                {/* Description */}
                <p className="text-green-200/80 text-xs leading-relaxed group-hover:text-green-100 transition-colors duration-300">
                  {tool.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Other Tools - Regular Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {aiTools.slice(2).map((tool) => (
            <button
              key={tool.id}
              onClick={() => handleToolClick(tool.id)}
              className="group relative bg-gradient-to-br from-gray-900/80 to-black/80 dark:from-gray-900/80 dark:to-black/80 light:from-white light:to-gray-50 backdrop-blur rounded-2xl p-5 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/10 text-left overflow-hidden"
            >
              {/* Subtle gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300 rounded-2xl`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon and Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="group-hover:scale-105 transition-transform duration-300">
                    {getIcon(tool.iconType)}
                  </div>
                  {tool.badge && (
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${tool.badgeColor} border`}>
                      {tool.badge}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-white dark:text-white light:text-gray-900 font-semibold text-base mb-1.5 group-hover:text-gray-100 dark:group-hover:text-gray-100 light:group-hover:text-gray-700 transition-colors duration-300">
                  {tool.name}
                </h3>

                {/* Description */}
                <p className="text-green-200/80 text-xs leading-relaxed group-hover:text-green-100 transition-colors duration-300">
                  {tool.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Stats Grid */}
      <section className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Words Usage */}
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 dark:from-gray-900/80 dark:to-black/80 light:from-white light:to-gray-50 backdrop-blur rounded-2xl p-5 border border-green-500/20">
            <div className="flex items-center gap-2.5 mb-3">
              <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <h3 className="text-white dark:text-white light:text-gray-900 font-semibold text-sm">AI Words</h3>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-0.5">8</p>
                <p className="text-green-200/70 dark:text-green-200/70 light:text-gray-600 text-xs">Remaining</p>
              </div>
              <div className="text-right">
                <p className="text-green-300/50 dark:text-green-300/50 light:text-gray-400 text-xs line-through">245</p>
                <p className="text-red-400 text-xs font-medium">Low balance</p>
              </div>
            </div>
          </div>

          {/* Activity */}
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur rounded-2xl p-5 border border-green-500/20">
            <div className="flex items-center gap-2.5 mb-3">
              <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h3 className="text-white font-semibold text-sm">Activity</h3>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold text-white mb-0.5">62</p>
                <p className="text-green-200/70 text-xs">Minutes today</p>
              </div>
              <div className="text-right">
                <p className="text-green-400 text-xs font-medium">+18%</p>
                <p className="text-green-300/50 text-xs">vs yesterday</p>
              </div>
            </div>
          </div>

          {/* Tools Used */}
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur rounded-2xl p-5 border border-green-500/20">
            <div className="flex items-center gap-2.5 mb-3">
              <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h3 className="text-white font-semibold text-sm">Tools Used</h3>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold text-white mb-0.5">5</p>
                <p className="text-green-200/70 text-xs">This week</p>
              </div>
              <div className="text-right">
                <p className="text-green-400 text-xs font-medium">Study Beats</p>
                <p className="text-green-300/50 text-xs">Most used</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <div className="flex items-center gap-2 mb-5">
          <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h2 className="text-xl font-bold text-white">Quick Actions</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="group bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur rounded-2xl p-5 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:scale-[1.01] text-left">
            <div className="flex items-center gap-3.5">
              <svg className="w-6 h-6 text-green-400 group-hover:text-green-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-sm mb-0.5">Continue Last Session</h3>
                <p className="text-green-200/70 text-xs">Resume Study Beats AI from 2 hours ago</p>
              </div>
              <svg className="w-4 h-4 text-green-300/50 group-hover:text-green-400 transform group-hover:translate-x-0.5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          <button className="group bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur rounded-2xl p-5 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:scale-[1.01] text-left">
            <div className="flex items-center gap-3.5">
              <svg className="w-6 h-6 text-green-400 group-hover:text-green-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-sm mb-0.5">View History</h3>
                <p className="text-green-200/70 text-xs">Access your past work and study sessions</p>
              </div>
              <svg className="w-4 h-4 text-green-300/50 group-hover:text-green-400 transform group-hover:translate-x-0.5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
}
