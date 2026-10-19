import React from 'react';

export default function Navbar({ activeTab, setActiveTab, dbStatus, onOpenHelp, onAddCandidate }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-chart-pie' },
    { id: 'screening', label: 'AI Screening & Ranking', icon: 'fa-wand-magic-sparkles' },
    { id: 'pipeline', label: 'Candidate ATS (Kanban)', icon: 'fa-bars-progress' },
    { id: 'scheduler', label: 'Smart Scheduler', icon: 'fa-calendar-days' },
    { id: 'tester', label: 'Resume Test Bench', icon: 'fa-flask-vial' },
    { id: 'database', label: 'SQL Database', icon: 'fa-database' }
  ];

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur sticky top-0 z-40 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-xs">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm p-1 flex items-center justify-center overflow-hidden shrink-0">
          <img src="/college_crest_square.png" alt="Easwari Engineering College Logo" className="w-full h-full object-contain" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-extrabold text-base tracking-tight text-slate-900">TalentAI</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              Easwari Engineering College
            </span>
          </div>
          <p className="text-xs text-slate-500">Autonomous Talent Intelligence & ATS</p>
        </div>
      </div>

      {/* Tabs */}
      <nav className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-white text-indigo-600 shadow-sm font-bold border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <i className={`fa-solid ${tab.icon} text-xs`}></i>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Recruiter Actions & Status */}
      <div className="flex items-center gap-2.5">
        {/* DB Indicator */}
        <button
          onClick={() => setActiveTab('database')}
          title="View Relational SQL Database Schema & Data"
          className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold border flex items-center gap-1.5 transition ${
            dbStatus === 'connected'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${dbStatus === 'connected' ? 'bg-emerald-500' : 'bg-indigo-500'}`}></span>
          <i className="fa-solid fa-database text-[10px]"></i>
          <span>{dbStatus === 'connected' ? 'SQL: Live' : 'SQL: SQLite Ready'}</span>
        </button>

        <button
          onClick={onOpenHelp}
          className="px-3.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-1.5 transition shadow-2xs"
        >
          <i className="fa-solid fa-compass"></i> Recruiter Guide
        </button>

        <button
          onClick={onAddCandidate}
          className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
        >
          <i className="fa-solid fa-user-plus text-xs"></i> Add Candidate
        </button>

        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 text-xs font-bold shadow-2xs" title="HR Recruiter Profile">
          HR
        </div>
      </div>
    </header>
  );
}
