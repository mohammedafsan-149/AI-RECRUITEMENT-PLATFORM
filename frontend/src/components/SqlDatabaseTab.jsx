import React, { useState } from 'react';

const SAMPLE_SQL_SEED = `-- TalentAI SQL Seed Data
INSERT INTO jobs (id, title, department, location, type, salary_range, min_experience_years, required_skills, description, status) VALUES
('job_101', 'Senior Full-Stack Engineer (MERN)', 'Engineering', 'Remote / Hybrid', 'Full-time', '$135k - $165k', 5, 'react, node.js, mongodb, typescript, docker', 'Architect high-scale microservices, client dashboards, and distributed web applications.', 'Active'),
('job_102', 'Lead AI & Machine Learning Scientist', 'AI Research', 'San Francisco / Hybrid', 'Full-time', '$160k - $210k', 5, 'python, machine learning, docker, postgresql, aws', 'Lead LLM fine-tuning, embedding pipelines, semantic parsing, and GPU microservice clusters.', 'Active'),
('job_103', 'Technical Product Manager (Platform)', 'Product', 'New York / Remote', 'Full-time', '$140k - $175k', 4, 'agile, scrum, system design, apis', 'Drive developer platform APIs, recruiter workflows, and automated hiring intelligence roadmap.', 'Active');

INSERT INTO candidates (id, job_id, name, email, phone, current_title, experience_years, ai_score, stage, extracted_skills_json, ai_rationale) VALUES
('cand_01', 'job_101', 'Sarah Chen', 'sarah.chen@example.com', '(555) 234-8901', 'Senior Full-Stack Developer', 6, 94, 'AI Screened', '[{"name":"react"},{"name":"node.js"},{"name":"mongodb"},{"name":"typescript"}]', 'Exceptional candidate with 6 years experience in MERN stack microservices.'),
('cand_02', 'job_101', 'Marcus Vance', 'm.vance@example.com', '(555) 781-4432', 'Full-Stack Software Engineer', 4, 86, 'Interview Scheduled', '[{"name":"react"},{"name":"node.js"},{"name":"postgresql"}]', 'Solid full-stack foundations with PostgreSQL and React experience.'),
('cand_03', 'job_102', 'Elena Rostova', 'elena.rostova@example.com', '(555) 912-3341', 'Lead AI Engineer', 7, 96, 'Technical Evaluation', '[{"name":"python"},{"name":"machine learning"},{"name":"docker"}]', 'Outstanding specialist deploying transformer models and GPU inference clusters.'),
('cand_04', 'job_101', 'David Kim', 'david.k@example.com', '(555) 441-2983', 'Junior Frontend Engineer', 2, 62, 'Applied', '[{"name":"react"},{"name":"typescript"}]', 'Lacks the 5+ years seniority requirement and backend database experience.'),
('cand_05', 'job_103', 'Amina Al-Mansoor', 'amina.m@example.com', '(555) 602-1194', 'Senior Product Manager', 6, 92, 'Offer', '[{"name":"agile"},{"name":"scrum"}]', 'Proven product leader who has spearheaded multiple platform API initiatives.'),
('cand_06', 'job_101', 'Alex Rivera', 'alex.rivera@techmail.com', '(555) 019-2834', 'Staff Full-Stack Software Engineer', 6, 94, 'Applied', '[{"name":"react"},{"name":"node.js"},{"name":"mongodb"}]', 'Top-tier senior engineer architecting Node.js/MongoDB microservices (15M daily requests).');

INSERT INTO interviews (id, candidate_id, candidate_name, candidate_email, job_title, interviewer_name, scheduled_date, time_slot, interview_type, meet_link, status) VALUES
('iv_01', 'cand_01', 'Sarah Chen', 'sarah.chen@example.com', 'Senior Full-Stack Engineer (MERN)', 'Alex Rivera (Tech Lead)', '2026-10-24', '10:00 AM - 10:45 AM', 'Technical System Design', 'https://meet.google.com/new', 'Confirmed'),
('iv_02', 'cand_03', 'Elena Rostova', 'elena.rostova@example.com', 'Lead AI & Machine Learning Scientist', 'Dr. Marcus Vance (VP AI)', '2026-10-25', '02:30 PM - 03:15 PM', 'Architecture Deep-Dive', 'https://meet.google.com/new', 'Confirmed'),
('iv_03', 'cand_05', 'Amina Al-Mansoor', 'amina.m@example.com', 'Technical Product Manager (Platform)', 'Elena Rostova (Staff PM)', '2026-10-26', '11:00 AM - 11:45 AM', 'Leadership & Culture Fit', 'https://meet.google.com/new', 'Confirmed');

INSERT INTO interview_scorecards (id, interview_id, candidate_id, interviewer_name, technical_score, problem_solving_score, culture_fit_score, overall_recommendation, assessment_notes) VALUES
('sc_01', 'iv_01', 'cand_01', 'Alex Rivera (Tech Lead)', 5, 5, 4, 'Strong Hire', 'Superb understanding of event loops, distributed caching, and state management.');`;

export default function SqlDatabaseTab() {
  const [activeTable, setActiveTable] = useState('candidates');
  const [copySuccess, setCopySuccess] = useState(false);

  const downloadFile = (content, filename) => {
    const blob = new Blob([content], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyDump = () => {
    navigator.clipboard.writeText(SAMPLE_SQL_SEED);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Relational Database Engine</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              PostgreSQL &bull; SQLite Active
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">SQL Relational Database Explorer</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Normalized 3NF relational architecture storing all candidates, jobs, interviews, and evaluation scorecards
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => downloadFile(SAMPLE_SQL_SEED, 'seed.sql')}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
          >
            <i className="fa-solid fa-database text-purple-600"></i> Download seed.sql
          </button>
          <button
            onClick={handleCopyDump}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
          >
            <i className="fa-solid fa-copy"></i> {copySuccess ? 'Copied to Clipboard!' : 'Copy SQL Data Dump'}
          </button>
        </div>
      </div>

      {/* Database KPI Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">jobs Table</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">3 Rows</div>
          <div className="text-[11px] text-indigo-600 font-semibold mt-1">Requisitions indexed</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">candidates Table</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">6 Rows</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">AI-scored profiles</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">interviews Table</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">3 Rows</div>
          <div className="text-[11px] text-purple-600 font-semibold mt-1">Confirmed video links</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">interview_scorecards</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">1 Row</div>
          <div className="text-[11px] text-amber-600 font-semibold mt-1">In-app ratings saved</div>
        </div>
      </div>

      {/* Main Relational Table Viewer */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-200 gap-2">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
            {[
              { id: 'candidates', label: 'candidates Table' },
              { id: 'jobs', label: 'jobs Table' },
              { id: 'interviews', label: 'interviews Table' },
              { id: 'scorecards', label: 'interview_scorecards Table' }
            ].map(tbl => (
              <button
                key={tbl.id}
                onClick={() => setActiveTable(tbl.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTable === tbl.id
                    ? 'bg-white text-indigo-600 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tbl.label}
              </button>
            ))}
          </div>
          <span className="text-xs text-slate-500 font-mono">Dialect: PostgreSQL / MySQL / SQLite</span>
        </div>

        {/* candidates table */}
        {activeTable === 'candidates' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <th className="py-2.5 px-3">id (PK)</th>
                  <th className="py-2.5 px-3">name</th>
                  <th className="py-2.5 px-3">email</th>
                  <th className="py-2.5 px-3">current_title</th>
                  <th className="py-2.5 px-3">experience_years</th>
                  <th className="py-2.5 px-3">ai_score</th>
                  <th className="py-2.5 px-3">stage</th>
                  <th className="py-2.5 px-3">job_id (FK)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2.5 px-3 font-mono text-indigo-600">cand_01</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Sarah Chen</td>
                  <td className="py-2.5 px-3 text-slate-600">sarah.chen@example.com</td>
                  <td className="py-2.5 px-3 text-slate-600">Senior Full-Stack Developer</td>
                  <td className="py-2.5 px-3 text-slate-600">6 yrs</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-600">94%</td>
                  <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 text-[10px] font-semibold border border-purple-200">AI Screened</span></td>
                  <td className="py-2.5 px-3 font-mono text-slate-500">job_101</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono text-indigo-600">cand_02</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Marcus Vance</td>
                  <td className="py-2.5 px-3 text-slate-600">m.vance@example.com</td>
                  <td className="py-2.5 px-3 text-slate-600">Full-Stack Software Engineer</td>
                  <td className="py-2.5 px-3 text-slate-600">4 yrs</td>
                  <td className="py-2.5 px-3 font-bold text-indigo-600">86%</td>
                  <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-semibold border border-indigo-200">Interview Scheduled</span></td>
                  <td className="py-2.5 px-3 font-mono text-slate-500">job_101</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono text-indigo-600">cand_03</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Elena Rostova</td>
                  <td className="py-2.5 px-3 text-slate-600">elena.rostova@example.com</td>
                  <td className="py-2.5 px-3 text-slate-600">Lead AI Engineer</td>
                  <td className="py-2.5 px-3 text-slate-600">7 yrs</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-600">96%</td>
                  <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 text-[10px] font-semibold border border-amber-200">Technical Evaluation</span></td>
                  <td className="py-2.5 px-3 font-mono text-slate-500">job_102</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono text-indigo-600">cand_04</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">David Kim</td>
                  <td className="py-2.5 px-3 text-slate-600">david.k@example.com</td>
                  <td className="py-2.5 px-3 text-slate-600">Junior Frontend Engineer</td>
                  <td className="py-2.5 px-3 text-slate-600">2 yrs</td>
                  <td className="py-2.5 px-3 font-bold text-rose-600">62%</td>
                  <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold border border-slate-200">Applied</span></td>
                  <td className="py-2.5 px-3 font-mono text-slate-500">job_101</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono text-indigo-600">cand_05</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Amina Al-Mansoor</td>
                  <td className="py-2.5 px-3 text-slate-600">amina.m@example.com</td>
                  <td className="py-2.5 px-3 text-slate-600">Senior Product Manager</td>
                  <td className="py-2.5 px-3 text-slate-600">6 yrs</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-600">92%</td>
                  <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">Offer</span></td>
                  <td className="py-2.5 px-3 font-mono text-slate-500">job_103</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono text-indigo-600">cand_06</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Alex Rivera</td>
                  <td className="py-2.5 px-3 text-slate-600">alex.rivera@techmail.com</td>
                  <td className="py-2.5 px-3 text-slate-600">Staff Full-Stack Software Engineer</td>
                  <td className="py-2.5 px-3 text-slate-600">6 yrs</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-600">94%</td>
                  <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold border border-slate-200">Applied</span></td>
                  <td className="py-2.5 px-3 font-mono text-slate-500">job_101</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* jobs table */}
        {activeTable === 'jobs' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <th className="py-2.5 px-3">id (PK)</th>
                  <th className="py-2.5 px-3">title</th>
                  <th className="py-2.5 px-3">department</th>
                  <th className="py-2.5 px-3">location</th>
                  <th className="py-2.5 px-3">type</th>
                  <th className="py-2.5 px-3">salary_range</th>
                  <th className="py-2.5 px-3">min_exp</th>
                  <th className="py-2.5 px-3">required_skills</th>
                  <th className="py-2.5 px-3">status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2.5 px-3 font-mono text-indigo-600">job_101</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Senior Full-Stack Engineer (MERN)</td>
                  <td className="py-2.5 px-3 text-slate-600">Engineering</td>
                  <td className="py-2.5 px-3 text-slate-600">Remote / Hybrid</td>
                  <td className="py-2.5 px-3 text-slate-600">Full-time</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">$135k - $165k</td>
                  <td className="py-2.5 px-3 text-slate-600">5 yrs</td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-indigo-600">react, node.js, mongodb, typescript, docker</td>
                  <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">Active</span></td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono text-indigo-600">job_102</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Lead AI & Machine Learning Scientist</td>
                  <td className="py-2.5 px-3 text-slate-600">AI Research</td>
                  <td className="py-2.5 px-3 text-slate-600">San Francisco / Hybrid</td>
                  <td className="py-2.5 px-3 text-slate-600">Full-time</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">$160k - $210k</td>
                  <td className="py-2.5 px-3 text-slate-600">5 yrs</td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-indigo-600">python, machine learning, docker, postgresql, aws</td>
                  <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">Active</span></td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono text-indigo-600">job_103</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Technical Product Manager (Platform)</td>
                  <td className="py-2.5 px-3 text-slate-600">Product</td>
                  <td className="py-2.5 px-3 text-slate-600">New York / Remote</td>
                  <td className="py-2.5 px-3 text-slate-600">Full-time</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">$140k - $175k</td>
                  <td className="py-2.5 px-3 text-slate-600">4 yrs</td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-indigo-600">agile, scrum, system design, apis</td>
                  <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">Active</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* interviews table */}
        {activeTable === 'interviews' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <th className="py-2.5 px-3">id (PK)</th>
                  <th className="py-2.5 px-3">candidate_name</th>
                  <th className="py-2.5 px-3">candidate_email</th>
                  <th className="py-2.5 px-3">job_title</th>
                  <th className="py-2.5 px-3">interviewer_name</th>
                  <th className="py-2.5 px-3">scheduled_date</th>
                  <th className="py-2.5 px-3">time_slot</th>
                  <th className="py-2.5 px-3">interview_type</th>
                  <th className="py-2.5 px-3">status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2.5 px-3 font-mono text-indigo-600">iv_01</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Sarah Chen</td>
                  <td className="py-2.5 px-3 text-slate-600">sarah.chen@example.com</td>
                  <td className="py-2.5 px-3 text-slate-600">Senior Full-Stack Engineer (MERN)</td>
                  <td className="py-2.5 px-3 text-slate-600">Alex Rivera (Tech Lead)</td>
                  <td className="py-2.5 px-3 font-mono text-indigo-600">2026-10-24</td>
                  <td className="py-2.5 px-3 text-slate-600">10:00 AM - 10:45 AM</td>
                  <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-semibold border border-indigo-200">Technical System Design</span></td>
                  <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">Confirmed</span></td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono text-indigo-600">iv_02</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Elena Rostova</td>
                  <td className="py-2.5 px-3 text-slate-600">elena.rostova@example.com</td>
                  <td className="py-2.5 px-3 text-slate-600">Lead AI & Machine Learning Scientist</td>
                  <td className="py-2.5 px-3 text-slate-600">Dr. Marcus Vance (VP AI)</td>
                  <td className="py-2.5 px-3 font-mono text-indigo-600">2026-10-25</td>
                  <td className="py-2.5 px-3 text-slate-600">02:30 PM - 03:15 PM</td>
                  <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 text-[10px] font-semibold border border-purple-200">Architecture Deep-Dive</span></td>
                  <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">Confirmed</span></td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono text-indigo-600">iv_03</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Amina Al-Mansoor</td>
                  <td className="py-2.5 px-3 text-slate-600">amina.m@example.com</td>
                  <td className="py-2.5 px-3 text-slate-600">Technical Product Manager (Platform)</td>
                  <td className="py-2.5 px-3 text-slate-600">Elena Rostova (Staff PM)</td>
                  <td className="py-2.5 px-3 font-mono text-indigo-600">2026-10-26</td>
                  <td className="py-2.5 px-3 text-slate-600">11:00 AM - 11:45 AM</td>
                  <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 text-[10px] font-semibold border border-amber-200">Leadership & Culture Fit</span></td>
                  <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">Confirmed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* interview_scorecards table */}
        {activeTable === 'scorecards' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <th className="py-2.5 px-3">id (PK)</th>
                  <th className="py-2.5 px-3">interview_id (FK)</th>
                  <th className="py-2.5 px-3">candidate_id (FK)</th>
                  <th className="py-2.5 px-3">interviewer</th>
                  <th className="py-2.5 px-3">technical</th>
                  <th className="py-2.5 px-3">problem_solving</th>
                  <th className="py-2.5 px-3">culture_fit</th>
                  <th className="py-2.5 px-3">recommendation</th>
                  <th className="py-2.5 px-3">notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2.5 px-3 font-mono text-indigo-600">sc_01</td>
                  <td className="py-2.5 px-3 font-mono text-slate-500">iv_01</td>
                  <td className="py-2.5 px-3 font-mono text-slate-500">cand_01</td>
                  <td className="py-2.5 px-3 text-slate-600">Alex Rivera (Tech Lead)</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-600">5 / 5</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-600">5 / 5</td>
                  <td className="py-2.5 px-3 font-bold text-indigo-600">4 / 5</td>
                  <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">Strong Hire</span></td>
                  <td className="py-2.5 px-3 text-slate-600">Superb understanding of event loops, distributed caching, and state management.</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
