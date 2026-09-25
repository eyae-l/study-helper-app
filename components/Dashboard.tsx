export default function Dashboard() {
  const features = [
    {
      icon: '⚡',
      title: 'AI-Powered Generation',
      description: 'Transform any content into study materials instantly',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: '🎯',
      title: 'Adaptive Learning',
      description: 'Personalized to your learning pace and style',
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      icon: '📊',
      title: 'Progress Analytics',
      description: 'Track your mastery with detailed insights',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🔄',
      title: 'Spaced Repetition',
      description: 'Scientifically optimized review schedules',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: '🎨',
      title: 'Interactive Cards',
      description: 'Engaging flashcards that make learning fun',
      gradient: 'from-rose-500 to-red-500'
    },
    {
      icon: '🤝',
      title: 'Collaboration',
      description: 'Study together with shared sets and groups',
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <section className="relative bg-white dark:bg-gradient-to-b dark:from-[#0d0d2b] dark:to-black py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30"></div>
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-200/20 dark:bg-emerald-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 pill-badge px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span>🚀</span>
            <span>Powerful Features</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            Everything you need to
            <br />
            <span className="text-gradient-emerald">study smarter</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Built for students who want results. Powered by AI that actually understands how you learn.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group glass-card rounded-3xl p-8 smooth-transition hover:scale-[1.02]"
            >
              {/* Icon with gradient background */}
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-3xl mb-5 shadow-lg group-hover:scale-110 smooth-transition`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Dashboard Mockup */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-3xl blur-3xl opacity-20"></div>
            
            {/* Main dashboard container */}
            <div className="relative glass-card rounded-3xl overflow-hidden shadow-2xl">
              {/* Browser header */}
              <div className="bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm px-6 py-4 flex items-center gap-3 border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400 shadow-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400 shadow-sm"></div>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white dark:bg-slate-700 px-4 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 text-sm border border-slate-200 dark:border-slate-600 font-mono">
                    app.studyhelper.com/dashboard
                  </div>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-8 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
                {/* Navigation tabs */}
                <div className="flex gap-2 mb-8 border-b border-slate-200 dark:border-slate-700">
                  {['Overview', 'Study Sets', 'Flashcards', 'Progress'].map((tab, i) => (
                    <button
                      key={tab}
                      className={`px-4 py-3 text-sm font-semibold smooth-transition rounded-t-lg ${
                        i === 0
                          ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { label: 'Mastery Score', value: '92%', icon: '📊', color: 'emerald', progress: 92 },
                    { label: 'Day Streak', value: '14', icon: '🔥', color: 'orange', subtitle: 'Keep it up!' },
                    { label: 'Cards Due', value: '48', icon: '📇', color: 'blue', subtitle: 'Review now' }
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="glass-card rounded-2xl p-6 hover:scale-105 smooth-transition"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">{stat.icon}</span>
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                          {stat.label}
                        </span>
                      </div>
                      <div className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                        {stat.value}
                      </div>
                      {stat.progress && (
                        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 rounded-full smooth-transition`}
                            style={{ width: `${stat.progress}%` }}
                          ></div>
                        </div>
                      )}
                      {stat.subtitle && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">{stat.subtitle}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
