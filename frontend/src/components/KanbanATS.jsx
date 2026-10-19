import React from 'react';

export default function KanbanATS({ candidates, onUpdateStage }) {
  const stages = [
    { id: 'Applied', title: 'Applied', color: 'border-slate-700' },
    { id: 'AI Screened', title: 'AI Screened', color: 'border-indigo-500/50' },
    { id: 'Interview Scheduled', title: 'Interview Scheduled', color: 'border-purple-500/50' },
    { id: 'Technical Evaluation', title: 'Tech Evaluation', color: 'border-pink-500/50' },
    { id: 'Offer', title: 'Offer Stage', color: 'border-emerald-500/50' },
    { id: 'Hired', title: 'Hired', color: 'border-emerald-400' }
  ];

  const handleNextStage = (candidate) => {
    const currentIndex = stages.findIndex(s => s.id === (candidate.stage || 'Applied'));
    if (currentIndex < stages.length - 1) {
      const nextStage = stages[currentIndex + 1].id;
      onUpdateStage(candidate._id, nextStage);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Visual Candidate Tracker</span>
          <h2 className="text-xl font-extrabold text-slate-900">Full-Funnel ATS Pipeline</h2>
          <p className="text-xs text-slate-500 mt-0.5">Drag or click to advance candidates through stages with real-time sync</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 font-semibold">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span> Active Automated Transitions
        </div>
      </div>

      {/* Kanban Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 items-start">
        {stages.map(st => {
          const stageCandidates = candidates.filter(c => (c.stage || 'Applied') === st.id);

          return (
            <div key={st.id} className="bg-slate-100/70 rounded-2xl border border-slate-200 p-3.5 flex flex-col min-h-[500px]">
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                <span className="font-bold text-xs text-slate-700 uppercase tracking-wide">{st.title}</span>
                <span className="px-2 py-0.5 rounded-full bg-white text-slate-700 font-mono text-[11px] font-bold border border-slate-200 shadow-2xs">
                  {stageCandidates.length}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-2.5 flex-1">
                {stageCandidates.map(cand => (
                  <div
                    key={cand._id}
                    className="p-3 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition group shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="font-bold text-slate-900 text-xs">{cand.name}</h4>
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
                        {cand.aiScore || 85}%
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 mb-2 truncate">{cand.currentTitle}</p>

                    <div className="flex flex-wrap gap-1 mb-2.5">
                      {cand.extractedSkills?.slice(0, 3).map((s, i) => {
                        const name = typeof s === 'string' ? s : s.name;
                        return (
                          <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                            {name}
                          </span>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                      <span className="text-slate-400">{cand.experienceYears}y exp</span>
                      {st.id !== 'Hired' && (
                        <button
                          onClick={() => handleNextStage(cand)}
                          className="text-indigo-600 hover:text-indigo-800 font-bold transition flex items-center gap-1"
                        >
                          Next Stage &rarr;
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {stageCandidates.length === 0 && (
                  <div className="h-32 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-xs italic">
                    No candidates
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
