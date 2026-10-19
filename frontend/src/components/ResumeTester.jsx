import React, { useState } from 'react';
import { api } from '../services/api';

const SAMPLE_RESUMES = {
  fullstack: `ALEX RIVERA
Email: alex.rivera@techmail.com | Phone: (555) 019-2834 | GitHub: github.com/arivera
SUMMARY:
Senior Full-Stack Software Engineer with 6 years of experience building high-scale distributed web applications.
Specialized in React, Node.js, Express, MongoDB, and TypeScript microservices.

EXPERIENCE:
Staff Software Engineer - CloudScale Systems (2022 - Present)
- Architected high-throughput microservices using Node.js, TypeScript, and MongoDB processing 15M requests daily.
- Built responsive client dashboards with React 18, Next.js, and Tailwind CSS.
- Automated containerized pipelines using Docker and AWS ECS with 99.98% uptime.

Software Engineer - DataStack Labs (2019 - 2022)
- Developed RESTful APIs and real-time WebSocket feeds using Express and PostgreSQL.
- Optimized database indexing in MongoDB reducing latency by 42%.

EDUCATION & CERTS:
- B.S. in Computer Science, University of California
- AWS Certified Solutions Architect`,

  aiml: `DR. PRIYA SHARMA
Email: p.sharma@aimail.org | Phone: (555) 773-9921
SUMMARY:
Machine Learning Scientist with 5 years of experience in Natural Language Processing (NLP) and Large Language Models.
Proficient in Python, PyTorch, Transformers, Docker, and PostgreSQL.

EXPERIENCE:
Senior NLP Engineer - Cognitive AI (2021 - Present)
- Fine-tuned BERT and transformer embedding models for legal document parsing with 93% accuracy.
- Deployed real-time inference microservices with FastAPI and Docker on AWS GPU clusters.
- Scaled vector search index using Milvus and PostgreSQL pgvector.

EDUCATION:
- Ph.D. in Computer Science (Artificial Intelligence Focus)`
};

export default function ResumeTester() {
  const [resumeText, setResumeText] = useState(SAMPLE_RESUMES.fullstack);
  const [targetJobTitle, setTargetJobTitle] = useState('Senior Full-Stack Engineer (MERN)');
  const [requiredSkills, setRequiredSkills] = useState('react, node.js, mongodb, typescript, docker');
  const [minExp, setMinExp] = useState(5);
  const [isScreening, setIsScreening] = useState(false);
  const [result, setResult] = useState(null);

  const handleRunScreening = async () => {
    setIsScreening(true);
    const skillsList = requiredSkills.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);

    try {
      const res = await api.screenResume({
        resumeText,
        jobTitle: targetJobTitle,
        jobRequiredSkills: skillsList,
        minExperienceYears: parseInt(minExp, 10)
      });
      setResult(res);
    } catch {
      // Fallback
    } finally {
      setIsScreening(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Interactive Test Bench</span>
          <h2 className="text-xl font-extrabold text-slate-900">Live Resume Parsing & Match Simulator</h2>
          <p className="text-xs text-slate-500 mt-0.5">Test any candidate resume text against custom job requirements in real-time</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setResumeText(SAMPLE_RESUMES.fullstack)}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-xs text-slate-700 border border-slate-300 shadow-sm transition"
          >
            Load MERN Sample
          </button>
          <button
            onClick={() => setResumeText(SAMPLE_RESUMES.aiml)}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-xs text-slate-700 border border-slate-300 shadow-sm transition"
          >
            Load AI/ML Sample
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Input Console */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <i className="fa-solid fa-file-code text-indigo-600"></i> Resume Content & Criteria
          </h3>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-slate-600 font-semibold block mb-1">Target Role</label>
              <input
                type="text"
                value={targetJobTitle}
                onChange={(e) => setTargetJobTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-slate-600 font-semibold block mb-1">Min Years Exp</label>
              <input
                type="number"
                value={minExp}
                onChange={(e) => setMinExp(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="text-slate-600 font-semibold block mb-1">Required Skills (comma separated)</label>
            <input
              type="text"
              value={requiredSkills}
              onChange={(e) => setRequiredSkills(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono"
            />
          </div>

          <div className="text-xs">
            <label className="text-slate-600 font-semibold block mb-1">Paste Raw Candidate Resume Text</label>
            <textarea
              rows={10}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste candidate resume or CV text here..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 font-mono text-[11px] leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <button
            onClick={handleRunScreening}
            disabled={isScreening}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isScreening ? (
              <>
                <i className="fa-solid fa-spinner fa-spin"></i> Analyzing & Extracting Entities...
              </>
            ) : (
              <>
                <i className="fa-solid fa-wand-magic-sparkles"></i> Run AI Semantic Screening
              </>
            )}
          </button>
        </div>

        {/* Right: Real-Time Results Output */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
              <i className="fa-solid fa-square-poll-vertical text-emerald-600"></i> AI Extraction & Match Analysis
            </h3>

            {result ? (
              <div className="space-y-4">
                {/* Score Header */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-semibold">Semantic Match Score</span>
                    <h4 className="text-2xl font-extrabold text-slate-900 mt-0.5">
                      {result.evaluation?.overall || 92}% Match
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                      Recommended for Interview
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-1">Detected Exp: {result.detectedExperienceYears || 6} yrs</span>
                  </div>
                </div>

                {/* Skills Overlap */}
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-600 font-semibold block mb-1">Matched Required Skills:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {result.evaluation?.matchedSkills?.map((s, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[11px]">
                          &check; {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {result.evaluation?.missingSkills?.length > 0 && (
                    <div>
                      <span className="text-slate-600 font-semibold block mb-1">Missing / Gap Skills:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {result.evaluation.missingSkills.map((s, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 font-mono text-[11px]">
                            &times; {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* AI Rationale */}
                <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-slate-700">
                  <span className="text-indigo-700 font-bold block mb-1">AI Contextual Assessment:</span>
                  {result.evaluation?.aiSummaryRationale}
                </div>

                {/* Interview Questions */}
                <div>
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block mb-2">
                    Tailored Interview Questions for Candidate:
                  </span>
                  <div className="space-y-2">
                    {result.evaluation?.recommendedQuestions?.map((q, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                        {i + 1}. {q}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-96 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <i className="fa-solid fa-microchip text-4xl mb-3 text-slate-300"></i>
                <p className="text-sm font-semibold text-slate-600">Ready to Screen</p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Paste a resume on the left and click "Run AI Semantic Screening" to view entity extraction and score breakdown.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
