import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ScreeningTab from './components/ScreeningTab';
import KanbanATS from './components/KanbanATS';
import SchedulerTab from './components/SchedulerTab';
import ResumeTester from './components/ResumeTester';
import SqlDatabaseTab from './components/SqlDatabaseTab';
import { api } from './services/api';
import { INITIAL_JOBS, INITIAL_CANDIDATES, INITIAL_INTERVIEWS } from './data/initialData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [interviews, setInterviews] = useState(INITIAL_INTERVIEWS);
  const [dbStatus, setDbStatus] = useState('checking'); // 'checking' | 'connected' | 'offline_demo'
  const [showHelpGuide, setShowHelpGuide] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Candidate Form State
  const [newCandidate, setNewCandidate] = useState({
    name: '',
    email: '',
    phone: '',
    currentTitle: '',
    experienceYears: 4,
    skills: 'react, node.js, typescript',
    appliedJobId: 'job_101'
  });

  useEffect(() => {
    async function syncBackendData() {
      try {
        const statusRes = await api.checkBackendStatus();
        if (statusRes.connected) {
          setDbStatus('connected');
          const [jobsData, candsData, ivsData] = await Promise.all([
            api.getJobs(),
            api.getCandidates(),
            api.getInterviews()
          ]);
          if (Array.isArray(jobsData) && jobsData.length > 0) setJobs(jobsData);
          if (Array.isArray(candsData) && candsData.length > 0) setCandidates(candsData);
          if (Array.isArray(ivsData) && ivsData.length > 0) setInterviews(ivsData);
        } else {
          setDbStatus('offline_demo');
        }
      } catch (err) {
        console.warn('Backend sync note: running in standalone mode with full enterprise dataset', err);
        setDbStatus('offline_demo');
      }
    }
    syncBackendData();
  }, []);

  const handleUpdateStage = async (candidateId, newStage) => {
    setCandidates(prev =>
      prev.map(c => ((c._id === candidateId || c.id === candidateId) ? { ...c, stage: newStage } : c))
    );
    await api.updateCandidateStage(candidateId, newStage);
  };

  const handleScheduleFromScreening = (candidate, job) => {
    setActiveTab('scheduler');
  };

  const handleScheduleNew = async (newInterview) => {
    const res = await api.scheduleInterview(newInterview);
    if (res && res.interview) {
      setInterviews(prev => [res.interview, ...prev]);
    }
  };

  const handleCreateCandidate = (e) => {
    e.preventDefault();
    if (!newCandidate.name || !newCandidate.email) return;

    const skillsArray = newCandidate.skills
      .split(',')
      .map(s => s.trim().toLowerCase())
      .filter(Boolean);

    const created = {
      _id: 'cand_' + Date.now(),
      id: 'cand_' + Date.now(),
      name: newCandidate.name,
      email: newCandidate.email,
      phone: newCandidate.phone || '(555) 000-1234',
      currentTitle: newCandidate.currentTitle || 'Software Engineer',
      experienceYears: parseInt(newCandidate.experienceYears, 10) || 3,
      appliedJobId: newCandidate.appliedJobId || 'job_101',
      job_id: newCandidate.appliedJobId || 'job_101',
      aiScore: Math.floor(Math.random() * 15) + 82, // 82 - 97
      stage: 'Applied',
      extractedSkills: skillsArray.map(s => ({ name: s, level: 'Advanced', isRequirement: true })),
      aiRationale: `Applicant demonstrates strong proficiency in ${skillsArray.slice(0, 3).join(', ')} with ${newCandidate.experienceYears} years background.`
    };

    setCandidates(prev => [created, ...prev]);
    setShowAddModal(false);
    setNewCandidate({
      name: '',
      email: '',
      phone: '',
      currentTitle: '',
      experienceYears: 4,
      skills: 'react, node.js, typescript',
      appliedJobId: 'job_101'
    });
    setActiveTab('screening');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        dbStatus={dbStatus}
        onOpenHelp={() => setShowHelpGuide(true)}
        onAddCandidate={() => setShowAddModal(true)}
      />

      {/* Main App Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8">
        {activeTab === 'dashboard' && <Dashboard onNavigate={setActiveTab} />}
        {activeTab === 'screening' && (
          <ScreeningTab
            jobs={jobs}
            candidates={candidates}
            onScheduleCandidate={handleScheduleFromScreening}
            onMoveStage={handleUpdateStage}
          />
        )}
        {activeTab === 'pipeline' && (
          <KanbanATS
            candidates={candidates}
            onUpdateStage={handleUpdateStage}
          />
        )}
        {activeTab === 'scheduler' && (
          <SchedulerTab
            interviews={interviews}
            onScheduleNew={handleScheduleNew}
          />
        )}
        {activeTab === 'tester' && <ResumeTester />}
        {activeTab === 'database' && <SqlDatabaseTab />}
      </main>

      {/* Add Candidate Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 md:p-8 space-y-5 animate-fade-in text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center text-lg">
                  <i className="fa-solid fa-user-plus"></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Add New Candidate</h3>
                  <p className="text-xs text-slate-500">Fast-track candidate into semantic screening pipeline</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-800 flex items-center justify-center text-base transition"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateCandidate} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-600 font-semibold block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Johnathan Doe"
                  value={newCandidate.name}
                  onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={newCandidate.email}
                    onChange={(e) => setNewCandidate({ ...newCandidate, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Phone</label>
                  <input
                    type="text"
                    placeholder="(555) 123-4567"
                    value={newCandidate.phone}
                    onChange={(e) => setNewCandidate({ ...newCandidate, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Current Job Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Software Engineer"
                    value={newCandidate.currentTitle}
                    onChange={(e) => setNewCandidate({ ...newCandidate, currentTitle: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={newCandidate.experienceYears}
                    onChange={(e) => setNewCandidate({ ...newCandidate, experienceYears: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-600 font-semibold block mb-1">Target Requisition</label>
                <select
                  value={newCandidate.appliedJobId}
                  onChange={(e) => setNewCandidate({ ...newCandidate, appliedJobId: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                >
                  {jobs.map(j => (
                    <option key={j._id || j.id} value={j._id || j.id}>{j.title} ({j.department})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-600 font-semibold block mb-1">Extracted / Verified Skills (comma separated)</label>
                <input
                  type="text"
                  value={newCandidate.skills}
                  onChange={(e) => setNewCandidate({ ...newCandidate, skills: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-sm transition"
                >
                  Add to Leaderboard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Recruiter Guide Modal */}
      {showHelpGuide && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto text-slate-800 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-xl">
                  <i className="fa-solid fa-compass"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Complete Recruiter Guidance & Tour</h3>
                  <p className="text-xs text-slate-500">How to use TalentAI to accelerate hiring from days to hours</p>
                </div>
              </div>
              <button
                onClick={() => setShowHelpGuide(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-800 flex items-center justify-center text-base transition"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold flex items-center justify-center shrink-0 mt-0.5">1</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Step 1: Set Up or Select Job Requisitions</h4>
                  <p className="text-slate-600 mt-1 leading-relaxed">
                    In the <strong>AI Screening</strong> tab, select your target role or post a new job. The AI automatically configures required skills, seniority baselines, and salary expectations.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                <div className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 font-bold flex items-center justify-center shrink-0 mt-0.5">2</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Step 2: AI Candidate Rankings & Leaderboard</h4>
                  <p className="text-slate-600 mt-1 leading-relaxed">
                    Candidates are parsed and ranked by composite score (Skills, Experience, Domain, Credentials). Filter candidates by minimum score (&ge;90%) or search specific skills.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                <div className="w-7 h-7 rounded-lg bg-pink-50 border border-pink-200 text-pink-700 font-bold flex items-center justify-center shrink-0 mt-0.5">3</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Step 3: Candidate Evaluation Dossier</h4>
                  <p className="text-slate-600 mt-1 leading-relaxed">
                    Click <strong>"Dossier"</strong> to see exact skill overlaps, missing gaps, and AI-tailored technical interview questions.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold flex items-center justify-center shrink-0 mt-0.5">4</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Step 4: Scheduling & Live Interview Room</h4>
                  <p className="text-slate-600 mt-1 leading-relaxed">
                    Book interviews in <strong>Smart Scheduler</strong>. Conduct interviews using the <strong>In-App Video Room</strong> with live scorecards or launch a real <strong>Google Meet (Live)</strong> call.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 font-bold flex items-center justify-center shrink-0 mt-0.5">5</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Step 5: Visual ATS Pipeline (Kanban) & SQL Database</h4>
                  <p className="text-slate-600 mt-1 leading-relaxed">
                    Progress candidates through the stages (*Applied &rarr; AI Screened &rarr; Interview Scheduled &rarr; Technical Evaluation &rarr; Offer &rarr; Hired*) with real-time status sync. Access the <strong>SQL Database</strong> tab to explore relational tables, records, and SQL data dumps.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowHelpGuide(false)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-4 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2 shadow-2xs">
        <div className="flex items-center gap-3">
          <img src="/college_crest_square.png" alt="Easwari Crest" className="w-5 h-5 object-contain" />
          <span className="font-semibold text-slate-700">TalentAI</span>
          <span>&bull;</span>
          <span>Easwari Engineering College</span>
          <span>&bull;</span>
          <span>Full-Stack Architecture &bull; React &bull; Node.js &bull; Express &bull; Relational SQL Database</span>
        </div>
        <div className="flex items-center gap-4 text-slate-500">
          <button onClick={() => setShowHelpGuide(true)} className="hover:text-indigo-600 transition flex items-center gap-1 font-medium">
            <i className="fa-solid fa-compass"></i> Recruiter Guide
          </button>
          <span>&bull;</span>
          <span>High-Velocity Talent Acquisition</span>
        </div>
      </footer>
    </div>
  );
}
