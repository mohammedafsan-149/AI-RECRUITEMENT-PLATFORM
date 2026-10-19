import React from 'react';

export default function Dashboard({ onNavigate }) {
  const metrics = [
    { title: 'Resumes Screened', val: '1,428', change: '+32% this month', icon: 'fa-file-lines', color: 'indigo' },
    { title: 'Avg Screening Time', val: '1.2 mins', change: 'Down from 25 mins (95% drop)', icon: 'fa-bolt', color: 'emerald' },
    { title: 'Interview Conversion', val: '68.4%', change: '3.2x higher quality rate', icon: 'fa-arrow-trend-up', color: 'purple' },
    { title: 'Avg Time-to-Hire', val: '12 Days', change: 'Industry benchmark: 44 days', icon: 'fa-clock', color: 'pink' }
  ];

  const recentActivities = [
    { text: 'AI Screened Sarah Chen with 94% match for Senior Full-Stack Engineer', time: '12m ago', type: 'match' },
    { text: 'Google Meet invite auto-dispatched to Marcus Vance for Fri 2:00 PM', time: '45m ago', type: 'sched' },
    { text: 'Blind PII Redaction completed on 42 batch applications from LinkedIn', time: '2h ago', type: 'sec' },
    { text: 'Offer letter generated for Amina Al-Mansoor ($165,000/yr)', time: '4h ago', type: 'offer' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-50/80 via-purple-50/50 to-white border border-indigo-100 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Hiring Velocity Dashboard</span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Autonomous Recruitment Engine Live</h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            AI screening has cut recruiter manual evaluation time by <strong>75%</strong> while boosting interview-to-offer velocity.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onNavigate('screening')}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition shadow-sm flex items-center gap-2"
          >
            <i className="fa-solid fa-wand-magic-sparkles"></i> Review Top Candidates
          </button>
          <button
            onClick={() => onNavigate('tester')}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold text-xs shadow-sm transition flex items-center gap-2"
          >
            <i className="fa-solid fa-upload"></i> Test Resume Matcher
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{m.title}</span>
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 text-sm">
                <i className={`fa-solid ${m.icon}`}></i>
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{m.val}</div>
              <div className="text-[11px] font-semibold text-emerald-600 mt-1.5 flex items-center gap-1">
                <i className="fa-solid fa-arrow-up-right text-[10px]"></i> {m.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Funnel Breakdown & Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recruitment Funnel */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center justify-between">
            <span>Live Recruitment Pipeline Funnel</span>
            <span className="text-xs font-normal text-slate-500">Past 30 Days</span>
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-slate-700">1. Sourced & Applied</span>
                <span className="text-indigo-600 font-bold">1,428 Candidates (100%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div className="bg-indigo-600 h-3 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-slate-700">2. AI Screened (Match &ge; 75%)</span>
                <span className="text-purple-600 font-bold">312 Candidates (21.8%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div className="bg-purple-600 h-3 rounded-full" style={{ width: '22%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-slate-700">3. Interview Scheduled (Autonomous Sync)</span>
                <span className="text-pink-600 font-bold">84 Candidates (5.9%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div className="bg-pink-600 h-3 rounded-full" style={{ width: '6%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-slate-700">4. Technical & Team Assessment</span>
                <span className="text-amber-600 font-bold">28 Candidates (1.9%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div className="bg-amber-500 h-3 rounded-full" style={{ width: '2%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-emerald-800 font-bold">5. Offers Extended & Accepted</span>
                <span className="text-emerald-600 font-bold">12 Hires (0.84%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div className="bg-emerald-500 h-3 rounded-full" style={{ width: '1%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-4">Real-Time AI Feed</h3>
            <div className="space-y-3.5">
              {recentActivities.map((act, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <p className="text-slate-700 leading-relaxed font-medium">{act.text}</p>
                  <span className="text-[10px] text-slate-400 block mt-1">{act.time}</span>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => onNavigate('pipeline')}
            className="w-full mt-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-semibold transition text-center"
          >
            Open Full ATS Board &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
