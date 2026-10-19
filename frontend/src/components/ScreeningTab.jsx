import React, { useState } from 'react';

export default function ScreeningTab({ jobs, candidates, onScheduleCandidate, onMoveStage }) {
  const [selectedJobId, setSelectedJobId] = useState(jobs[0]?._id || 'job_101');
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const activeJob = jobs.find(j => j._id === selectedJobId) || jobs[0];

  // Candidates for this job or general
  const filteredCandidates = candidates.filter(
    c => !c.appliedJobId || c.appliedJobId === selectedJobId
  ).sort((a, b) => (b.aiScore || 0) - (a.aiScore || 0));

  return (
    <div className="space-y-6">
      {/* Header & Job Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Semantic Match Engine</span>
          <h2 className="text-xl font-extrabold text-slate-900">AI Candidate Leaderboard</h2>
          <p className="text-xs text-slate-500 mt-0.5">Ranked by contextual fit, skills alignment & career seniority</p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-500 font-medium">Select Requisition:</label>
          <select
            value={selectedJobId}
            onChange={(e) => setSelectedJobId(e.target.value)}
            className="bg-white border border-slate-300 text-xs text-slate-800 rounded-xl px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
          >
            {jobs.map(j => (
              <option key={j._id} value={j._id}>{j.title} ({j.department})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Job Requirements Pill Bar */}
      {activeJob && (
        <div className="p-4 rounded-xl bg-slate-100/70 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-500 font-semibold">Required Stack:</span>
            {activeJob.requiredSkills?.map((s, i) => (
              <span key={i} className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-indigo-700 font-mono text-[11px] shadow-2xs">
                {s}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Min Exp: <strong className="text-slate-800">{activeJob.minExperienceYears}+ yrs</strong></span>
            <span>&bull;</span>
            <span>Type: <strong className="text-slate-800">{activeJob.type}</strong></span>
          </div>
        </div>
      )}

      {/* Candidate Ranking Table / Cards */}
      <div className="space-y-3">
        {filteredCandidates.map((c, idx) => (
          <div
            key={c._id}
            className="p-5 rounded-xl bg-white border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition flex flex-wrap items-center justify-between gap-4 shadow-sm"
          >
            {/* Left: Info */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-sm">
                #{idx + 1}
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h4 className="font-bold text-slate-900 text-base">{c.name}</h4>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {c.stage || 'AI Screened'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{c.currentTitle} &bull; {c.experienceYears} yrs experience</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {c.extractedSkills?.map((sk, i) => {
                    const skillName = typeof sk === 'string' ? sk : sk.name;
                    return (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-mono">
                        {skillName}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: AI Score & Actions */}
            <div className="flex items-center gap-5">
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-xs text-slate-500">Match Score</span>
                  <span className={`text-xl font-extrabold px-3 py-1 rounded-lg ${
                    c.aiScore >= 85 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    c.aiScore >= 70 ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                    'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {c.aiScore}%
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-1">High semantic relevance</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedCandidate(c)}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold transition shadow-sm"
                >
                  <i className="fa-solid fa-file-waveform mr-1"></i> AI Breakdown
                </button>
                <button
                  onClick={() => onScheduleCandidate(c, activeJob)}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition shadow-sm"
                >
                  <i className="fa-solid fa-calendar-plus mr-1"></i> Schedule
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Candidate Deep Dive Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 space-y-5 text-slate-800 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">AI Evaluation Dossier</span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">{selectedCandidate.name}</h3>
                <p className="text-xs text-slate-500">{selectedCandidate.currentTitle} &bull; {selectedCandidate.email}</p>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-800 flex items-center justify-center text-sm transition"
              >
                &times;
              </button>
            </div>

            {/* Score Breakdown Bars */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-500 block mb-1">Overall Match</span>
                <span className="text-2xl font-extrabold text-emerald-600">{selectedCandidate.aiScore}%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-500 block mb-1">Skills Overlap</span>
                <span className="text-2xl font-extrabold text-indigo-600">92%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-500 block mb-1">Seniority Match</span>
                <span className="text-2xl font-extrabold text-purple-600">95%</span>
              </div>
            </div>

            {/* Rationale */}
            <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-slate-700">
              <strong className="text-indigo-700 block mb-1">&bull; AI Contextual Rationale:</strong>
              Candidate presents deep mastery of core JavaScript and Node.js microservices. Demonstrated 6 years of scalable architecture experience, outperforming the 5-year requirement baseline.
            </div>

            {/* Recommended Interview Questions */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                AI-Suggested Interview Questions (Targeting Gaps & Depth):
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">1.</span>
                  <span>How have you handled high concurrency and indexing bottlenecks in MongoDB production collections?</span>
                </li>
                <li className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">2.</span>
                  <span>Can you walk through your containerization and CI/CD strategy when deploying React/Node applications to Docker?</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedCandidate(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const cand = selectedCandidate;
                  setSelectedCandidate(null);
                  onScheduleCandidate(cand, activeJob);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition"
              >
                Proceed to Schedule Interview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
