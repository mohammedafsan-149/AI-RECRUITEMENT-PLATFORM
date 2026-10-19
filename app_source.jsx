
    const { useState, useEffect, useMemo } = React;

    // Initial Enterprise Mock Datasets
    const INITIAL_JOBS = [
      {
        _id: 'job_101',
        title: 'Senior Full-Stack Engineer (MERN)',
        department: 'Engineering',
        location: 'Remote / Global',
        type: 'Full-Time',
        requiredSkills: ['react', 'node.js', 'mongodb', 'typescript', 'docker'],
        preferredSkills: ['aws', 'redis', 'graphql'],
        minExperienceYears: 5,
        openings: 2,
        salary: '$140k - $175k'
      },
      {
        _id: 'job_102',
        title: 'AI / Machine Learning Engineer',
        department: 'Data & AI',
        location: 'San Francisco, CA / Hybrid',
        type: 'Full-Time',
        requiredSkills: ['python', 'machine learning', 'docker', 'postgresql'],
        preferredSkills: ['fastapi', 'kubernetes', 'aws'],
        minExperienceYears: 4,
        openings: 1,
        salary: '$155k - $190k'
      },
      {
        _id: 'job_103',
        title: 'Lead Product Manager (HR Tech)',
        department: 'Product',
        location: 'New York, NY / Hybrid',
        type: 'Full-Time',
        requiredSkills: ['agile', 'scrum', 'system design'],
        preferredSkills: ['data analytics', 'sql'],
        minExperienceYears: 6,
        openings: 1,
        salary: '$150k - $180k'
      }
    ];

    const INITIAL_CANDIDATES = [
      {
        _id: 'c1',
        name: 'Sarah Chen',
        email: 'sarah.chen@example.com',
        phone: '+1 (555) 392-1084',
        currentTitle: 'Senior Full-Stack Developer',
        company: 'CloudScale Inc.',
        experienceYears: 6,
        skills: ['react', 'node.js', 'mongodb', 'typescript', 'docker', 'aws'],
        stage: 'AI Screened',
        jobId: 'job_101',
        aiScore: 94,
        scoreBreakdown: { skills: 96, experience: 95, domain: 90, education: 92 },
        rationale: 'Exceptional fit for MERN stack role. 6 years of scalable production microservices, exceeding the 5-year requirement baseline. Demonstrated leadership on distributed systems.'
      },
      {
        _id: 'c2',
        name: 'Marcus Vance',
        email: 'm.vance@example.com',
        phone: '+1 (555) 819-4472',
        currentTitle: 'Software Engineer',
        company: 'Apex Digital Labs',
        experienceYears: 4,
        skills: ['react', 'node.js', 'postgresql', 'mongodb'],
        stage: 'Interview Scheduled',
        jobId: 'job_101',
        aiScore: 86,
        scoreBreakdown: { skills: 88, experience: 82, domain: 85, education: 89 },
        rationale: 'Strong JavaScript foundations with proven full-stack API design. Minor gap in Docker container orchestration and TypeScript type-safety at enterprise scale.'
      },
      {
        _id: 'c3',
        name: 'Elena Rostova',
        email: 'elena.rostova@example.com',
        phone: '+1 (555) 948-2311',
        currentTitle: 'Lead AI Engineer',
        company: 'Cognitive Matrix',
        experienceYears: 7,
        skills: ['python', 'machine learning', 'docker', 'postgresql', 'aws', 'nlp'],
        stage: 'Technical Evaluation',
        jobId: 'job_102',
        aiScore: 96,
        scoreBreakdown: { skills: 98, experience: 96, domain: 95, education: 94 },
        rationale: 'Top-tier NLP & LLM architect with published transformer research and enterprise GPU cluster deployment experience. High cultural and technical alignment.'
      },
      {
        _id: 'c4',
        name: 'David Kim',
        email: 'david.k@example.com',
        phone: '+1 (555) 234-9812',
        currentTitle: 'Junior Frontend Developer',
        company: 'Startify Labs',
        experienceYears: 2,
        skills: ['react', 'typescript'],
        stage: 'Applied',
        jobId: 'job_101',
        aiScore: 62,
        scoreBreakdown: { skills: 55, experience: 50, domain: 70, education: 85 },
        rationale: 'Promising frontend aptitude, but falls short of the 5-year seniority threshold and backend Node/Mongo prerequisites. Recommend junior engineering pool.'
      },
      {
        _id: 'c5',
        name: 'Amina Al-Mansoor',
        email: 'amina.m@example.com',
        phone: '+1 (555) 762-1190',
        currentTitle: 'Senior Product Manager',
        company: 'NextGen HR Solutions',
        experienceYears: 6,
        skills: ['agile', 'scrum', 'system design', 'data analytics'],
        stage: 'Offer',
        jobId: 'job_103',
        aiScore: 92,
        scoreBreakdown: { skills: 94, experience: 90, domain: 95, education: 90 },
        rationale: 'Deep track record steering AI enterprise workflows from 0 to 1 with proven sprint velocity and measurable customer retention metrics.'
      }
    ];

    const INITIAL_INTERVIEWS = [
      {
        _id: 'i1',
        candidateName: 'Marcus Vance',
        candidateEmail: 'm.vance@example.com',
        candidateId: 'c2',
        jobTitle: 'Senior Full-Stack Engineer (MERN)',
        interviewerName: 'Alex Rivera (VP Eng)',
        scheduledDate: '2026-10-20',
        timeSlot: '14:00 - 15:00 UTC',
        type: 'Technical Architecture',
        status: 'Confirmed'
      },
      {
        _id: 'i2',
        candidateName: 'Sarah Chen',
        candidateEmail: 'sarah.chen@example.com',
        candidateId: 'c1',
        jobTitle: 'Senior Full-Stack Engineer (MERN)',
        interviewerName: 'Jessica Park (HR Lead)',
        scheduledDate: '2026-10-21',
        timeSlot: '10:00 - 10:45 UTC',
        type: 'Initial Recruiter Screen',
        status: 'Confirmed'
      }
    ];


    const RAW_SEED_SQL = `-- TalentAI SQL Database Seed Script
INSERT INTO jobs (id, title, department, location, type, salary_range, min_experience_years, required_skills, description, status) VALUES
('job_101', 'Senior Full-Stack Engineer (MERN)', 'Engineering', 'Remote / Hybrid', 'Full-time', '$135k - $165k', 5, 'react, node.js, mongodb, typescript, docker', 'Architect high-scale microservices and client dashboards.', 'Active'),
('job_102', 'Lead AI & Machine Learning Scientist', 'AI Research', 'San Francisco / Hybrid', 'Full-time', '$160k - $210k', 5, 'python, machine learning, docker, postgresql, aws', 'Lead LLM fine-tuning, embedding pipelines, and semantic extraction services.', 'Active'),
('job_103', 'Technical Product Manager (Platform)', 'Product', 'New York / Remote', 'Full-time', '$140k - $175k', 4, 'agile, scrum, system design, apis', 'Drive developer platform APIs and recruitment automation roadmap.', 'Active');

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
('iv_03', 'cand_05', 'Amina Al-Mansoor', 'amina.m@example.com', 'Technical Product Manager (Platform)', 'Elena Rostova (Staff PM)', '2026-10-26', '11:00 AM - 11:45 AM', 'Leadership & Culture Fit', 'https://meet.google.com/new', 'Confirmed');`;

    // Main App Component
    function App() {
      const [activeTab, setActiveTab] = useState('dashboard');
      const [jobs, setJobs] = useState(INITIAL_JOBS);
      const [selectedJobId, setSelectedJobId] = useState('job_101');
      const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
      const [interviews, setInterviews] = useState(INITIAL_INTERVIEWS);

      // SQL Database Tab State
      const [sqlTable, setSqlTable] = useState('candidates');
      const [sqlCopyStatus, setSqlCopyStatus] = useState(false);

      // Filtering & Search states
      const [searchQuery, setSearchQuery] = useState('');
      const [filterMinScore, setFilterMinScore] = useState('all');
      const [filterStage, setFilterStage] = useState('all');

      // Modals
      const [selectedCandidate, setSelectedCandidate] = useState(null);
      const [showHelpGuide, setShowHelpGuide] = useState(false);
      const [showNewJobModal, setShowNewJobModal] = useState(false);
      const [showNewCandidateModal, setShowNewCandidateModal] = useState(false);
      const [activeInterviewRoom, setActiveInterviewRoom] = useState(null);

      // Toast Notification
      const [toastMessage, setToastMessage] = useState(null);

      const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 4000);
      };

      // Interview Form State
      const [interviewForm, setInterviewForm] = useState({
        candidateName: '',
        candidateEmail: '',
        jobTitle: 'Senior Full-Stack Engineer (MERN)',
        interviewerName: 'Engineering Lead',
        scheduledDate: '2026-10-22',
        timeSlot: '14:00 - 15:00 UTC',
        type: 'Technical Architecture'
      });

      // New Job Form State
      const [newJobForm, setNewJobForm] = useState({
        title: '',
        department: 'Engineering',
        location: 'Remote',
        requiredSkills: '',
        minExperienceYears: 3,
        salary: '$130k - $160k'
      });

      // New Candidate Form State
      const [newCandForm, setNewCandForm] = useState({
        name: '',
        email: '',
        currentTitle: '',
        experienceYears: 4,
        skills: '',
        jobId: 'job_101'
      });

      // Resume Sandbox State
      const [sandboxResume, setSandboxResume] = useState(
`ALEX RIVERA | alex.rivera@techmail.com | (555) 019-2834
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
- Optimized database indexing in MongoDB reducing query latency by 42%.`
      );
      const [sandboxResult, setSandboxResult] = useState(null);
      const [isScreening, setIsScreening] = useState(false);

      const activeJob = jobs.find(j => j._id === selectedJobId) || jobs[0];

      // Filtered Candidates
      const filteredCandidates = useMemo(() => {
        return candidates.filter(c => {
          // Requisition filter
          if (c.jobId && c.jobId !== selectedJobId) return false;
          // Search query (name, title, skills)
          if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            const matchName = c.name.toLowerCase().includes(q);
            const matchTitle = c.currentTitle.toLowerCase().includes(q);
            const matchSkill = c.skills.some(s => s.toLowerCase().includes(q));
            if (!matchName && !matchTitle && !matchSkill) return false;
          }
          // Score filter
          if (filterMinScore === '90' && c.aiScore < 90) return false;
          if (filterMinScore === '80' && c.aiScore < 80) return false;
          if (filterMinScore === '70' && c.aiScore < 70) return false;
          // Stage filter
          if (filterStage !== 'all' && c.stage !== filterStage) return false;

          return true;
        }).sort((a, b) => b.aiScore - a.aiScore);
      }, [candidates, selectedJobId, searchQuery, filterMinScore, filterStage]);

      // Stage Advancement
      const advanceStage = (candId) => {
        const order = ['Applied', 'AI Screened', 'Interview Scheduled', 'Technical Evaluation', 'Offer', 'Hired'];
        setCandidates(prev => prev.map(c => {
          if (c._id === candId) {
            const idx = order.indexOf(c.stage);
            if (idx < order.length - 1) {
              const nextStage = order[idx + 1];
              showToast(`${c.name} advanced to "${nextStage}"`);
              return { ...c, stage: nextStage };
            }
          }
          return c;
        }));
      };

      // Add New Job
      const handleCreateJob = (e) => {
        e.preventDefault();
        if (!newJobForm.title) return;
        const skillsArr = newJobForm.requiredSkills.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
        const created = {
          _id: 'job_' + Date.now(),
          title: newJobForm.title,
          department: newJobForm.department,
          location: newJobForm.location,
          type: 'Full-Time',
          requiredSkills: skillsArr.length > 0 ? skillsArr : ['react', 'node.js', 'mongodb'],
          preferredSkills: ['aws', 'docker'],
          minExperienceYears: parseInt(newJobForm.minExperienceYears, 10),
          openings: 1,
          salary: newJobForm.salary
        };
        setJobs([created, ...jobs]);
        setSelectedJobId(created._id);
        setShowNewJobModal(false);
        showToast(`New Job Requisition "${created.title}" published!`);
      };

      // Add New Candidate
      const handleCreateCandidate = (e) => {
        e.preventDefault();
        if (!newCandForm.name || !newCandForm.email) return;
        const skillsArr = newCandForm.skills.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
        const reqJob = jobs.find(j => j._id === newCandForm.jobId) || activeJob;

        // Auto compute match score
        const matched = reqJob.requiredSkills.filter(r => skillsArr.includes(r.toLowerCase()));
        const calcScore = Math.min(96, Math.max(45, Math.round((matched.length / reqJob.requiredSkills.length) * 100)));

        const created = {
          _id: 'c_' + Date.now(),
          name: newCandForm.name,
          email: newCandForm.email,
          phone: '+1 (555) 000-1122',
          currentTitle: newCandForm.currentTitle || 'Software Engineer',
          company: 'Candidate Portfolio',
          experienceYears: parseInt(newCandForm.experienceYears, 10),
          skills: skillsArr,
          stage: 'Applied',
          jobId: reqJob._id,
          aiScore: calcScore,
          scoreBreakdown: { skills: calcScore, experience: 85, domain: 80, education: 85 },
          rationale: `Candidate added manually. Matched ${matched.length} of ${reqJob.requiredSkills.length} required skills (${matched.join(', ')}).`
        };

        setCandidates([created, ...candidates]);
        setShowNewCandidateModal(false);
        showToast(`Candidate "${created.name}" added to pipeline!`);
      };

      // Handle Schedule Submit
      const handleScheduleSubmit = (e) => {
        e.preventDefault();
        if (!interviewForm.candidateName || !interviewForm.candidateEmail) return;

        const newInv = {
          _id: 'i_' + Date.now(),
          ...interviewForm,
          status: 'Confirmed'
        };
        setInterviews([newInv, ...interviews]);

        // Auto-advance candidate to Interview Scheduled if in prior stage
        setCandidates(prev => prev.map(c => {
          if (c.name.toLowerCase() === interviewForm.candidateName.toLowerCase() && (c.stage === 'Applied' || c.stage === 'AI Screened')) {
            return { ...c, stage: 'Interview Scheduled' };
          }
          return c;
        }));

        showToast(`Interview scheduled for ${newInv.candidateName}! Calendar invite generated.`);
      };

      // Quick Shortlist & Email Action
      const handleQuickShortlist = (cand) => {
        advanceStage(cand._id);
        showToast(`Email invitation drafted and sent to ${cand.email}`);
      };

      // Reject politely
      const handlePoliteReject = (cand) => {
        setCandidates(prev => prev.map(c => c._id === cand._id ? { ...c, stage: 'Archived / Polite Feedback' } : c));
        showToast(`Polite, constructive feedback email dispatched to ${cand.name}`);
      };

      // Run Sandbox Screening
      const runSandboxScreening = () => {
        setIsScreening(true);
        setTimeout(() => {
          const text = sandboxResume.toLowerCase();
          const reqs = activeJob.requiredSkills;
          const matched = reqs.filter(r => text.includes(r.toLowerCase()));
          const missing = reqs.filter(r => !text.includes(r.toLowerCase()));
          const score = Math.round((matched.length / reqs.length) * 100);

          setSandboxResult({
            score: Math.min(98, Math.max(35, score)),
            matched,
            missing,
            detectedExp: text.includes('6 years') ? 6 : (text.includes('5 years') ? 5 : 4),
            rationale: score >= 80 
              ? `High semantic compatibility with ${activeJob.title}. Candidate possesses verified core technologies (${matched.join(', ')}) with substantial production tenure.`
              : `Partial fit. Lacks prerequisites: ${missing.join(', ')}. Recommend technical deep-dive on transferable foundations.`,
            questions: [
              `How do you optimize read/write performance when indexing collections in MongoDB for large volumes?`,
              `Can you walk through your containerization and CI/CD strategy when deploying Node/React microservices?`,
              `Describe an instance where you resolved high system latency or deadlocks in production.`
            ]
          });
          setIsScreening(false);
          showToast("AI Semantic Screening complete!");
        }, 650);
      };

      return (
        <div className="min-h-screen flex flex-col justify-between">

          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white px-4 py-3 rounded-2xl shadow-2xl border border-indigo-400 flex items-center gap-3 animate-fade-in text-xs font-semibold">
              <i className="fa-solid fa-circle-check text-emerald-300 text-sm"></i>
              <span>{toastMessage}</span>
              <button onClick={() => setToastMessage(null)} className="ml-2 text-indigo-200 hover:text-white">&times;</button>
            </div>
          )}

          {/* Navigation Bar */}
          <header className="border-b border-slate-200 bg-white/95 backdrop-blur sticky top-0 z-40 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 shadow-sm p-1 flex items-center justify-center overflow-hidden shrink-0">
                <img src="college_crest_square.png" alt="Easwari Engineering College Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-extrabold text-base tracking-tight text-slate-900">TalentAI</h1>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Easwari Engineering College
                  </span>
                </div>
                <p className="text-xs text-slate-500">Autonomous Talent Intelligence & ATS Platform</p>
              </div>
            </div>

            {/* Main Feature Tabs */}
            <nav className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: 'fa-chart-pie' },
                { id: 'screening', label: 'AI Screening & Ranking', icon: 'fa-wand-magic-sparkles' },
                { id: 'pipeline', label: 'Candidate ATS (Kanban)', icon: 'fa-bars-progress' },
                { id: 'scheduler', label: 'Smart Scheduler', icon: 'fa-calendar-days' },
                { id: 'tester', label: 'Resume Test Bench', icon: 'fa-flask-vial' },
                { id: 'database', label: 'SQL Database', icon: 'fa-database' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-2 ${
                    activeTab === t.id
                      ? 'bg-white text-indigo-600 shadow-sm font-bold border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <i className={`fa-solid ${t.icon} text-xs`}></i>
                  <span>{t.label}</span>
                </button>
              ))}
            </nav>

            {/* Recruiter Help & Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowHelpGuide(true)}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-1.5 transition shadow-2xs"
                title="Complete Recruiter Guidance & Tour"
              >
                <i className="fa-solid fa-circle-question"></i>
                <span>Recruiter Guide</span>
              </button>

              <button
                onClick={() => setShowNewCandidateModal(true)}
                className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
              >
                <i className="fa-solid fa-user-plus text-xs"></i>
                <span>Add Candidate</span>
              </button>

              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 text-xs font-bold shadow-2xs" title="HR Recruiter Profile">
                HR
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-6">

            {/* TAB 1: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6 animate-fade-in">
                {/* Welcome Recruiter Hero Banner */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-50/80 via-purple-50/50 to-white border border-indigo-100 flex flex-wrap items-center justify-between gap-4 shadow-sm">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 text-[11px] font-semibold mb-2">
                      <i className="fa-solid fa-sparkles"></i> AI Hiring Copilot Active
                    </div>
                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Recruiter Velocity Command Center</h2>
                    <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                      AI screening has reduced candidate evaluation time by <strong>75%</strong> and expedited scheduling from 4.2 days down to <strong>instant self-booking</strong>.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    <button
                      onClick={() => setActiveTab('screening')}
                      className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition flex items-center gap-2"
                    >
                      <i className="fa-solid fa-wand-magic-sparkles"></i> Review Top Ranked Candidates
                    </button>
                    <button
                      onClick={() => setShowHelpGuide(true)}
                      className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold text-xs shadow-sm transition flex items-center gap-2"
                    >
                      <i className="fa-solid fa-book-open"></i> How It Works
                    </button>
                  </div>
                </div>

                {/* KPI Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { title: 'Resumes Screened', val: '1,428', sub: '+32% this month', icon: 'fa-file-lines', color: 'text-indigo-600' },
                    { title: 'Avg Screening Time', val: '1.2 mins', sub: '95% faster than manual (25m)', icon: 'fa-bolt', color: 'text-emerald-600' },
                    { title: 'Interview Conversion', val: '68.4%', sub: '3.2x higher quality pipeline', icon: 'fa-arrow-trend-up', color: 'text-purple-600' },
                    { title: 'Avg Time-to-Hire', val: '12 Days', sub: 'vs 44-day industry avg', icon: 'fa-clock', color: 'text-pink-600' }
                  ].map((m, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{m.title}</span>
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-sm text-indigo-600">
                          <i className={`fa-solid ${m.icon}`}></i>
                        </div>
                      </div>
                      <div>
                        <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{m.val}</div>
                        <div className={`text-[11px] font-semibold mt-1.5 flex items-center gap-1 ${m.color}`}>
                          <i className="fa-solid fa-arrow-up-right text-[10px]"></i> {m.sub}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recruitment Funnel & Recruiter Workflow Tips */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Pipeline Funnel */}
                  <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                    <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center justify-between">
                      <span>Live Candidate Pipeline Funnel</span>
                      <span className="text-xs font-normal text-slate-500">Active Engineering Requisitions</span>
                    </h3>
                    <div className="space-y-4 text-xs font-semibold">
                      <div>
                        <div className="flex justify-between mb-1.5 text-slate-700">
                          <span>1. Sourced & Applied</span>
                          <span className="text-indigo-600 font-bold">1,428 Applications (100%)</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-3">
                          <div className="bg-indigo-600 h-3 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1.5 text-slate-700">
                          <span>2. AI Screened (Match &ge; 75%)</span>
                          <span className="text-purple-600 font-bold">312 Candidates (21.8%)</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-3">
                          <div className="bg-purple-600 h-3 rounded-full" style={{ width: '22%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1.5 text-slate-700">
                          <span>3. Automated Interview Booked</span>
                          <span className="text-pink-600 font-bold">84 Candidates (5.9%)</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-3">
                          <div className="bg-pink-600 h-3 rounded-full" style={{ width: '6%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1.5 text-slate-700">
                          <span>4. Technical & Team Assessment</span>
                          <span className="text-amber-600 font-bold">28 Candidates (1.9%)</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-3">
                          <div className="bg-amber-500 h-3 rounded-full" style={{ width: '2%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1.5 text-emerald-800 font-bold">
                          <span>5. Offer Extended & Accepted</span>
                          <span className="text-emerald-600 font-bold">12 Hires (0.84%)</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-3">
                          <div className="bg-emerald-500 h-3 rounded-full" style={{ width: '1%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recruiter Quick Actions Card */}
                  <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                        <i className="fa-solid fa-list-check text-indigo-600"></i> Recruiter Daily Checklist
                      </h3>
                      <p className="text-xs text-slate-500 mb-4">Recommended tasks for today's hiring pipeline:</p>

                      <div className="space-y-2.5 text-xs">
                        <div 
                          onClick={() => setActiveTab('screening')}
                          className="p-3 rounded-xl bg-slate-50 hover:bg-indigo-50/40 border border-slate-200 hover:border-indigo-200 cursor-pointer transition"
                        >
                          <div className="font-semibold text-slate-900 flex items-center justify-between">
                            <span>Review Sarah Chen's Profile</span>
                            <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">94% Match</span>
                          </div>
                          <p className="text-slate-500 text-[11px] mt-1">Pending recruiter sign-off for Senior MERN role.</p>
                        </div>

                        <div 
                          onClick={() => setActiveTab('scheduler')}
                          className="p-3 rounded-xl bg-slate-50 hover:bg-purple-50/40 border border-slate-200 hover:border-purple-200 cursor-pointer transition"
                        >
                          <div className="font-semibold text-slate-900 flex items-center justify-between">
                            <span>Upcoming Interview Call</span>
                            <span className="text-[10px] bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full font-bold">Marcus Vance</span>
                          </div>
                          <p className="text-slate-500 text-[11px] mt-1">Technical Architecture round with VP of Engineering.</p>
                        </div>

                        <div 
                          onClick={() => setActiveTab('pipeline')}
                          className="p-3 rounded-xl bg-slate-50 hover:bg-indigo-50/40 border border-slate-200 hover:border-indigo-200 cursor-pointer transition"
                        >
                          <div className="font-semibold text-slate-900 flex items-center justify-between">
                            <span>Offer Letter Prepared</span>
                            <span className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full font-bold">Amina Al-Mansoor</span>
                          </div>
                          <p className="text-slate-500 text-[11px] mt-1">Lead Product Manager role ready for signing.</p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab('screening')}
                      className="w-full mt-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-semibold text-xs transition text-center"
                    >
                      Go to Screening Leaderboard &rarr;
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: AI SCREENING & RANKING */}
            {activeTab === 'screening' && (
              <div className="space-y-6 animate-fade-in">
                {/* Header & Controls */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Semantic Matching Engine</span>
                    <h2 className="text-xl font-extrabold text-slate-900">AI Candidate Leaderboard</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Ranked by contextual fit, verified skills alignment & tenure stability</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-slate-500 font-medium">Requisition:</label>
                      <select
                        value={selectedJobId}
                        onChange={(e) => setSelectedJobId(e.target.value)}
                        className="bg-white border border-slate-300 text-xs text-slate-800 rounded-xl px-3 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
                      >
                        {jobs.map(j => (
                          <option key={j._id} value={j._id}>{j.title} ({j.department})</option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={() => setShowNewJobModal(true)}
                      className="px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-semibold shadow-sm flex items-center gap-1.5 transition"
                    >
                      <i className="fa-solid fa-plus text-xs"></i> Post New Job
                    </button>
                  </div>
                </div>

                {/* Job Specs Bar */}
                <div className="p-4 rounded-xl bg-slate-100/70 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-slate-500 font-semibold">Required Stack:</span>
                    {activeJob.requiredSkills.map((sk, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-indigo-700 font-mono text-[11px] shadow-2xs">
                        {sk}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-slate-500">
                    <span>Min Exp: <strong className="text-slate-800">{activeJob.minExperienceYears}+ yrs</strong></span>
                    <span>&bull;</span>
                    <span>Comp: <strong className="text-emerald-700">{activeJob.salary || '$140k - $175k'}</strong></span>
                    <span>&bull;</span>
                    <span>Location: <strong className="text-slate-800">{activeJob.location}</strong></span>
                  </div>
                </div>

                {/* Recruiter Search & Filter Toolbar */}
                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex-1 min-w-[240px] relative">
                    <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400"></i>
                    <input
                      type="text"
                      placeholder="Search candidate by name, title, or skill (e.g. React, Python, Elena)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500 font-medium">Match:</span>
                      <select
                        value={filterMinScore}
                        onChange={(e) => setFilterMinScore(e.target.value)}
                        className="bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-2.5 py-1.5 focus:bg-white focus:outline-none"
                      >
                        <option value="all">All Scores</option>
                        <option value="90">&ge; 90% (Top Tier)</option>
                        <option value="80">&ge; 80% (Qualified)</option>
                        <option value="70">&ge; 70% (Potential)</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500 font-medium">Stage:</span>
                      <select
                        value={filterStage}
                        onChange={(e) => setFilterStage(e.target.value)}
                        className="bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-2.5 py-1.5 focus:bg-white focus:outline-none"
                      >
                        <option value="all">All Stages</option>
                        <option value="Applied">Applied</option>
                        <option value="AI Screened">AI Screened</option>
                        <option value="Interview Scheduled">Interview Scheduled</option>
                        <option value="Technical Evaluation">Technical Evaluation</option>
                        <option value="Offer">Offer</option>
                      </select>
                    </div>

                    {(searchQuery || filterMinScore !== 'all' || filterStage !== 'all') && (
                      <button
                        onClick={() => { setSearchQuery(''); setFilterMinScore('all'); setFilterStage('all'); }}
                        className="text-indigo-600 hover:text-indigo-800 font-semibold"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                </div>

                {/* Candidate Cards */}
                <div className="space-y-3">
                  {filteredCandidates.map((cand, idx) => (
                    <div
                      key={cand._id}
                      className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition flex flex-wrap items-center justify-between gap-4 shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-sm">
                          #{idx + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2.5">
                            <h4 className="font-bold text-slate-900 text-base">{cand.name}</h4>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                              {cand.stage}
                            </span>
                            <span className="text-[11px] text-slate-500 font-mono">{cand.company}</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{cand.currentTitle} &bull; {cand.experienceYears} yrs experience &bull; {cand.email}</p>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {cand.skills.map((s, i) => (
                              <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-mono border border-slate-200">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-5">
                        <div className="text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <span className="text-xs text-slate-500 font-medium">AI Match</span>
                            <span className={`text-xl font-extrabold px-3 py-1 rounded-lg ${
                              cand.aiScore >= 85 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                              cand.aiScore >= 70 ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                              'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}>
                              {cand.aiScore}%
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 block mt-1">Weighted Composite</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedCandidate(cand)}
                            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold shadow-sm transition"
                            title="View Full Evaluation, Gaps & Interview Questions"
                          >
                            <i className="fa-solid fa-file-waveform mr-1"></i> Dossier
                          </button>

                          <button
                            onClick={() => {
                              setInterviewForm({
                                ...interviewForm,
                                candidateName: cand.name,
                                candidateEmail: cand.email,
                                jobTitle: activeJob.title
                              });
                              setActiveTab('scheduler');
                            }}
                            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
                          >
                            <i className="fa-solid fa-calendar-plus text-xs"></i> Schedule
                          </button>

                          <button
                            onClick={() => handleQuickShortlist(cand)}
                            className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs transition"
                            title="Shortlist & Fast-track candidate"
                          >
                            <i className="fa-solid fa-circle-check"></i>
                          </button>

                          <button
                            onClick={() => handlePoliteReject(cand)}
                            className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs transition"
                            title="Send Polite AI Feedback & Archive"
                          >
                            <i className="fa-solid fa-ban"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredCandidates.length === 0 && (
                    <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl text-slate-400 space-y-3">
                      <i className="fa-solid fa-user-slash text-3xl text-slate-400"></i>
                      <p className="text-sm font-semibold text-slate-700">No candidates match your current filter.</p>
                      <p className="text-xs text-slate-500">Try clearing filters or clicking "+ Add Candidate" to create a new profile.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: KANBAN ATS */}
            {activeTab === 'pipeline' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Visual Candidate Tracker</span>
                    <h2 className="text-xl font-extrabold text-slate-900">Full-Funnel ATS Pipeline</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Click "Advance &rarr;" to move candidates across automated hiring stages</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowNewCandidateModal(true)}
                      className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
                    >
                      <i className="fa-solid fa-plus text-xs"></i> Add Candidate
                    </button>
                    <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Pipeline Synced
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 items-start">
                  {['Applied', 'AI Screened', 'Interview Scheduled', 'Technical Evaluation', 'Offer', 'Hired'].map(stageName => {
                    const stageCands = candidates.filter(c => c.stage === stageName);
                    return (
                      <div key={stageName} className="bg-slate-100/70 rounded-2xl border border-slate-200 p-3.5 flex flex-col min-h-[500px]">
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                          <span className="font-bold text-xs text-slate-700 uppercase tracking-wide">{stageName}</span>
                          <span className="px-2 py-0.5 rounded-full bg-white text-slate-700 font-mono text-[11px] font-bold border border-slate-200 shadow-2xs">
                            {stageCands.length}
                          </span>
                        </div>

                        <div className="space-y-2.5 flex-1">
                          {stageCands.map(c => (
                            <div key={c._id} className="p-3 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition shadow-sm">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-bold text-slate-900 text-xs cursor-pointer hover:text-indigo-600 transition" onClick={() => setSelectedCandidate(c)}>
                                  {c.name}
                                </h4>
                                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
                                  {c.aiScore}%
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 mb-2 truncate">{c.currentTitle}</p>
                              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                                <span className="text-slate-400">{c.experienceYears}y exp</span>
                                {stageName !== 'Hired' && (
                                  <button
                                    onClick={() => advanceStage(c._id)}
                                    className="text-indigo-600 hover:text-indigo-800 font-bold transition flex items-center gap-1"
                                  >
                                    Advance &rarr;
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}

                          {stageCands.length === 0 && (
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
            )}

            {/* TAB 4: SMART SCHEDULER & VIDEO ROOM */}
            {activeTab === 'scheduler' && (
              <div className="space-y-6 animate-fade-in">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Autonomous Interview Coordination</span>
                    <h2 className="text-xl font-extrabold text-slate-900">Smart Interview Scheduler & Virtual Room</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Automated calendar invites with instant Google Meet link generator & in-app interview scorecard</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                    <i className="fa-solid fa-calendar-check"></i> Google Workspace & Outlook 365 Sync Active
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Scheduling Form */}
                  <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                    <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
                      <i className="fa-solid fa-calendar-plus text-indigo-600"></i> Dispatch Interview Booking
                    </h3>

                    <form onSubmit={handleScheduleSubmit} className="space-y-3.5 text-xs">
                      <div>
                        <label className="text-slate-600 font-semibold block mb-1">Candidate Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Candidate Name"
                          value={interviewForm.candidateName}
                          onChange={(e) => setInterviewForm({ ...interviewForm, candidateName: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="text-slate-600 font-semibold block mb-1">Candidate Email</label>
                        <input
                          type="email"
                          required
                          placeholder="Candidate Email"
                          value={interviewForm.candidateEmail}
                          onChange={(e) => setInterviewForm({ ...interviewForm, candidateEmail: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="text-slate-600 font-semibold block mb-1">Target Requisition</label>
                        <select
                          value={interviewForm.jobTitle}
                          onChange={(e) => setInterviewForm({ ...interviewForm, jobTitle: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        >
                          {jobs.map(j => <option key={j._id} value={j.title}>{j.title}</option>)}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-slate-600 font-semibold block mb-1">Date</label>
                          <input
                            type="date"
                            value={interviewForm.scheduledDate}
                            onChange={(e) => setInterviewForm({ ...interviewForm, scheduledDate: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="text-slate-600 font-semibold block mb-1">Time Slot</label>
                          <select
                            value={interviewForm.timeSlot}
                            onChange={(e) => setInterviewForm({ ...interviewForm, timeSlot: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                          >
                            <option value="10:00 - 11:00 UTC">10:00 - 11:00 UTC</option>
                            <option value="14:00 - 15:00 UTC">14:00 - 15:00 UTC</option>
                            <option value="16:00 - 17:00 UTC">16:00 - 17:00 UTC</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-slate-600 font-semibold block mb-1">Interview Round</label>
                        <select
                          value={interviewForm.type}
                          onChange={(e) => setInterviewForm({ ...interviewForm, type: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        >
                          <option value="Initial Recruiter Screen">Initial Recruiter Screen</option>
                          <option value="Technical Architecture">Technical Architecture</option>
                          <option value="Pair Programming">Pair Programming</option>
                          <option value="Culture Fit & Team Match">Culture Fit & Team Match</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-2"
                      >
                        <i className="fa-solid fa-paper-plane"></i> Book & Dispatch Calendar Invites
                      </button>
                    </form>
                  </div>

                  {/* Scheduled List with Working Google Meet & In-App Meeting Room */}
                  <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                    <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center justify-between">
                      <span>Confirmed Interview Sessions</span>
                      <span className="text-xs font-normal text-slate-500">{interviews.length} Scheduled</span>
                    </h3>

                    <div className="space-y-3.5">
                      {interviews.map(iv => (
                        <div key={iv._id} className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 flex flex-wrap items-center justify-between gap-4 shadow-sm hover:border-slate-300 transition">
                          <div>
                            <div className="flex items-center gap-2.5">
                              <h4 className="font-bold text-slate-900 text-sm">{iv.candidateName}</h4>
                              <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-semibold">
                                {iv.type}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{iv.jobTitle} &bull; Panel: {iv.interviewerName}</p>
                            <div className="flex items-center gap-3 text-xs text-slate-700 mt-2 font-mono">
                              <span className="text-indigo-600"><i className="fa-regular fa-calendar mr-1"></i>{iv.scheduledDate}</span>
                              <span>&bull;</span>
                              <span className="text-indigo-600"><i className="fa-regular fa-clock mr-1"></i>{iv.timeSlot}</span>
                            </div>
                          </div>

                          {/* Working Meeting Action Buttons */}
                          <div className="flex items-center gap-2">
                            {/* In-App Interview Room */}
                            <button
                              onClick={() => setActiveInterviewRoom(iv)}
                              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
                              title="Launch in-app video room with candidate resume & live AI scorecard"
                            >
                              <i className="fa-solid fa-video text-xs"></i> In-App Room
                            </button>

                            {/* Working Real Google Meet Link */}
                            <a
                              href="https://meet.google.com/new"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-700 text-xs font-semibold transition flex items-center gap-1.5 shadow-2xs"
                              title="Opens a real instant Google Meet video call in a new tab"
                            >
                              <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i> Google Meet (Live)
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-[11px] text-indigo-900 flex items-center gap-2">
                      <i className="fa-solid fa-info-circle text-indigo-600"></i>
                      <span><strong>Pro Tip for Recruiters:</strong> "In-App Room" launches the live video assessment console with candidate scorecards, while "Google Meet (Live)" opens an instant live meeting directly on Google Meet.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: RESUME TEST BENCH */}
            {activeTab === 'tester' && (
              <div className="space-y-6 animate-fade-in">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Semantic Simulation Sandbox</span>
                    <h2 className="text-xl font-extrabold text-slate-900">Live Resume Match Test Bench</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Paste or edit any resume text to compute match scores, extract skills & generate AI questions</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSandboxResume(
`ALEX RIVERA | alex.rivera@techmail.com | (555) 019-2834
Staff Full-Stack Software Engineer with 6 years experience.
SKILLS: React, Node.js, Express, MongoDB, TypeScript, Docker, AWS, Microservices.
EXPERIENCE:
- CloudScale Inc (2022-Present): Architected Node.js/MongoDB microservices handling 12M daily requests.
- DataLab (2019-2022): Built full-stack React dashboards with real-time WebSockets.`
                      )}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-xs text-slate-700 border border-slate-300 shadow-sm transition"
                    >
                      Load MERN Sample
                    </button>

                    <button
                      onClick={() => setSandboxResume(
`DR. ELENA VANCE | elena@ai-eng.io | (555) 948-2311
Lead AI & Machine Learning Scientist with 6 years experience.
SKILLS: Python, Machine Learning, PyTorch, Docker, PostgreSQL, NLP, Kubernetes, AWS.
EXPERIENCE:
- Cognitive Labs (2021-Present): Built transformer embedding pipelines with 94% precision.
- Vector Systems (2018-2021): Scaled GPU inference microservices with FastAPI & Docker.`
                      )}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-xs text-slate-700 border border-slate-300 shadow-sm transition"
                    >
                      Load AI/ML Sample
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Box */}
                  <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
                    <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                      <i className="fa-solid fa-file-lines text-indigo-600"></i> Candidate Resume Text
                    </h3>

                    <textarea
                      rows={12}
                      value={sandboxResume}
                      onChange={(e) => setSandboxResume(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 font-mono text-xs leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />

                    <button
                      onClick={runSandboxScreening}
                      disabled={isScreening}
                      className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-2"
                    >
                      {isScreening ? (
                        <>
                          <i className="fa-solid fa-spinner fa-spin"></i> Extracting Entities & Scoring...
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-wand-magic-sparkles"></i> Run AI Semantic Screening
                        </>
                      )}
                    </button>
                  </div>

                  {/* Right Box */}
                  <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
                        <i className="fa-solid fa-square-poll-vertical text-emerald-600"></i> Live AI Evaluation Dossier
                      </h3>

                      {sandboxResult ? (
                        <div className="space-y-4">
                          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                            <div>
                              <span className="text-xs text-slate-500 font-semibold">Overall Match Score</span>
                              <h4 className="text-3xl font-extrabold text-slate-900 mt-0.5">{sandboxResult.score}%</h4>
                            </div>
                            <div className="text-right">
                              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                                Candidate Shortlisted
                              </span>
                              <span className="text-[10px] text-slate-500 block mt-1">Detected Exp: {sandboxResult.detectedExp} yrs</span>
                            </div>
                          </div>

                          <div className="space-y-2 text-xs">
                            <div>
                              <span className="text-slate-600 font-semibold block mb-1">Matched Skills:</span>
                              <div className="flex flex-wrap gap-1.5">
                                {sandboxResult.matched.map((s, i) => (
                                  <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[11px]">
                                    &check; {s}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {sandboxResult.missing.length > 0 && (
                              <div>
                                <span className="text-slate-600 font-semibold block mb-1">Missing / Gap Skills:</span>
                                <div className="flex flex-wrap gap-1.5">
                                  {sandboxResult.missing.map((s, i) => (
                                    <span key={i} className="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 font-mono text-[11px]">
                                      &times; {s}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-slate-700">
                            <span className="text-indigo-700 font-bold block mb-1">AI Contextual Assessment:</span>
                            {sandboxResult.rationale}
                          </div>

                          <div>
                            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block mb-2">
                              Custom AI Interview Questions:
                            </span>
                            <div className="space-y-2">
                              {sandboxResult.questions.map((q, i) => (
                                <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                                  {i + 1}. {q}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="h-80 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-6 text-slate-400">
                          <i className="fa-solid fa-microchip text-4xl mb-3 text-slate-300"></i>
                          <p className="text-sm font-semibold text-slate-600">Ready to Evaluate</p>
                          <p className="text-xs text-slate-400 mt-1 max-w-xs">
                            Click "Run AI Semantic Screening" to test entity extraction and score ranking.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: RELATIONAL SQL DATABASE */}
            {activeTab === 'database' && (
              <div className="space-y-6 animate-fade-in">
                {/* Header */}
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
                      3NF normalized relational data storing all applicant records, requisitions, interview schedules & scorecards
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => {
                        const blob = new Blob([RAW_SEED_SQL], { type: 'text/sql' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'seed.sql';
                        a.click();
                        URL.revokeObjectURL(url);
                        showToast('seed.sql downloaded!');
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
                    >
                      <i className="fa-solid fa-database text-purple-600"></i> Download seed.sql
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(RAW_SEED_SQL);
                        setSqlCopyStatus(true);
                        setTimeout(() => setSqlCopyStatus(false), 3000);
                        showToast('SQL insert dump copied to clipboard!');
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
                    >
                      <i className="fa-solid fa-copy"></i> {sqlCopyStatus ? 'Copied!' : 'Copy SQL Dump'}
                    </button>
                  </div>
                </div>

                {/* Database Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">jobs Table</div>
                    <div className="text-2xl font-extrabold text-slate-900 mt-1">{jobs.length} Rows</div>
                    <div className="text-[11px] text-indigo-600 font-semibold mt-1">Requisitions indexed</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">candidates Table</div>
                    <div className="text-2xl font-extrabold text-slate-900 mt-1">{candidates.length} Rows</div>
                    <div className="text-[11px] text-emerald-600 font-semibold mt-1">AI-scored applicant profiles</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">interviews Table</div>
                    <div className="text-2xl font-extrabold text-slate-900 mt-1">{interviews.length} Rows</div>
                    <div className="text-[11px] text-purple-600 font-semibold mt-1">Confirmed video meetings</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">interview_scorecards</div>
                    <div className="text-2xl font-extrabold text-slate-900 mt-1">1 Row</div>
                    <div className="text-[11px] text-amber-600 font-semibold mt-1">In-app assessment rubrics</div>
                  </div>
                </div>

                {/* Table Viewer Card */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-200 gap-2">
                    <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
                      {[
                        { id: 'candidates', label: 'candidates' },
                        { id: 'jobs', label: 'jobs' },
                        { id: 'interviews', label: 'interviews' },
                        { id: 'scorecards', label: 'interview_scorecards' }
                      ].map(t => (
                        <button
                          key={t.id}
                          onClick={() => setSqlTable(t.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                            sqlTable === t.id
                              ? 'bg-white text-indigo-600 shadow-sm font-bold'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                    <span className="text-xs text-slate-500 font-mono">Dialect: PostgreSQL / MySQL / SQLite Compatible</span>
                  </div>

                  {sqlTable === 'candidates' && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                            <th className="py-2.5 px-3">id (PK)</th>
                            <th className="py-2.5 px-3">name</th>
                            <th className="py-2.5 px-3">email</th>
                            <th className="py-2.5 px-3">current_title</th>
                            <th className="py-2.5 px-3">experience</th>
                            <th className="py-2.5 px-3">ai_score</th>
                            <th className="py-2.5 px-3">stage</th>
                            <th className="py-2.5 px-3">job_id (FK)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {candidates.map(c => (
                            <tr key={c._id} className="hover:bg-slate-50/60">
                              <td className="py-2.5 px-3 font-mono text-indigo-600">{c._id}</td>
                              <td className="py-2.5 px-3 font-semibold text-slate-900">{c.name}</td>
                              <td className="py-2.5 px-3 text-slate-600">{c.email}</td>
                              <td className="py-2.5 px-3 text-slate-600">{c.currentTitle}</td>
                              <td className="py-2.5 px-3 text-slate-600">{c.experienceYears} yrs</td>
                              <td className="py-2.5 px-3 font-bold text-emerald-600">{c.aiScore}%</td>
                              <td className="py-2.5 px-3">
                                <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-semibold border border-indigo-200">
                                  {c.stage}
                                </span>
                              </td>
                              <td className="py-2.5 px-3 font-mono text-slate-500">{c.jobId || 'job_101'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {sqlTable === 'jobs' && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                            <th className="py-2.5 px-3">id (PK)</th>
                            <th className="py-2.5 px-3">title</th>
                            <th className="py-2.5 px-3">department</th>
                            <th className="py-2.5 px-3">location</th>
                            <th className="py-2.5 px-3">salary</th>
                            <th className="py-2.5 px-3">min_exp</th>
                            <th className="py-2.5 px-3">required_skills</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {jobs.map(j => (
                            <tr key={j._id} className="hover:bg-slate-50/60">
                              <td className="py-2.5 px-3 font-mono text-indigo-600">{j._id}</td>
                              <td className="py-2.5 px-3 font-semibold text-slate-900">{j.title}</td>
                              <td className="py-2.5 px-3 text-slate-600">{j.department}</td>
                              <td className="py-2.5 px-3 text-slate-600">{j.location}</td>
                              <td className="py-2.5 px-3 font-semibold text-slate-800">{j.salary}</td>
                              <td className="py-2.5 px-3 text-slate-600">{j.minExperienceYears} yrs</td>
                              <td className="py-2.5 px-3 font-mono text-[11px] text-indigo-600">{j.requiredSkills.join(', ')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {sqlTable === 'interviews' && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                            <th className="py-2.5 px-3">id (PK)</th>
                            <th className="py-2.5 px-3">candidate_name</th>
                            <th className="py-2.5 px-3">job_title</th>
                            <th className="py-2.5 px-3">interviewer</th>
                            <th className="py-2.5 px-3">scheduled_date</th>
                            <th className="py-2.5 px-3">time_slot</th>
                            <th className="py-2.5 px-3">type</th>
                            <th className="py-2.5 px-3">status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {interviews.map(i => (
                            <tr key={i._id} className="hover:bg-slate-50/60">
                              <td className="py-2.5 px-3 font-mono text-indigo-600">{i._id}</td>
                              <td className="py-2.5 px-3 font-semibold text-slate-900">{i.candidateName}</td>
                              <td className="py-2.5 px-3 text-slate-600">{i.jobTitle}</td>
                              <td className="py-2.5 px-3 text-slate-600">{i.interviewerName}</td>
                              <td className="py-2.5 px-3 font-mono text-indigo-600">{i.scheduledDate}</td>
                              <td className="py-2.5 px-3 text-slate-600">{i.timeSlot}</td>
                              <td className="py-2.5 px-3 text-slate-600">{i.type}</td>
                              <td className="py-2.5 px-3">
                                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">
                                  {i.status || 'Confirmed'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {sqlTable === 'scorecards' && (
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
                          <tr className="hover:bg-slate-50/60">
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
            )}
          </main>

          {/* ================= MODALS & DRAWERS ================= */}

          {/* 1. Recruiter Complete Guidance & Walkthrough Modal */}
          {showHelpGuide && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto animate-fade-in text-slate-800">
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

                {/* Step-by-Step Guide Grid */}
                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                    <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold flex items-center justify-center shrink-0 mt-0.5">1</div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Step 1: Set Up or Select Job Requisitions</h4>
                      <p className="text-slate-600 mt-1 leading-relaxed">
                        In the <strong>AI Screening</strong> tab, select your target role (e.g. Senior MERN Engineer) or click <strong>"+ Post New Job"</strong>. The AI instantly loads the required technology stack, minimum experience threshold, and salary benchmark.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                    <div className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 font-bold flex items-center justify-center shrink-0 mt-0.5">2</div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Step 2: Review AI Candidate Rankings & Scores</h4>
                      <p className="text-slate-600 mt-1 leading-relaxed">
                        Candidates are automatically scored from 0% to 100% using a weighted algorithm: <strong>45% Skills Fit + 30% Experience Seniority + 15% Domain Relevance + 10% Credentials</strong>. Use the search bar to filter by skill or minimum score (&ge;90%).
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                    <div className="w-7 h-7 rounded-lg bg-pink-50 border border-pink-200 text-pink-700 font-bold flex items-center justify-center shrink-0 mt-0.5">3</div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Step 3: Inspect Candidate Dossier & Cheat-Sheet</h4>
                      <p className="text-slate-600 mt-1 leading-relaxed">
                        Click <strong>"Dossier"</strong> on any candidate. The AI reveals exact matched skills, missing prerequisite gaps, career tenure, and generates custom tailored technical interview questions to ask during the call!
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold flex items-center justify-center shrink-0 mt-0.5">4</div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Step 4: Smart Scheduling & Live Interview Room</h4>
                      <p className="text-slate-600 mt-1 leading-relaxed">
                        Click <strong>"Schedule"</strong> to dispatch calendar bookings. For the interview, click <strong>"In-App Room"</strong> to run a live session with integrated candidate resume notes and scorecard ratings, or click <strong>"Google Meet (Live)"</strong> to launch a real instant Google Meet video call.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                    <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 font-bold flex items-center justify-center shrink-0 mt-0.5">5</div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Step 5: Visual ATS Pipeline (Kanban)</h4>
                      <p className="text-slate-600 mt-1 leading-relaxed">
                        Track applicants visually across 6 stages (*Applied &rarr; AI Screened &rarr; Interview Scheduled &rarr; Technical Evaluation &rarr; Offer &rarr; Hired*). Click <strong>"Advance &rarr;"</strong> to progress top candidates seamlessly.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setShowHelpGuide(false)}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition"
                  >
                    Got it, Let's Start Hiring!
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. Interactive In-App Video Call / Meeting Room Modal */}
          {activeInterviewRoom && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 space-y-5 animate-fade-in text-slate-800">
                {/* Room Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Live Interview Room: {activeInterviewRoom.candidateName}</h3>
                      <p className="text-xs text-slate-500">{activeInterviewRoom.jobTitle} &bull; {activeInterviewRoom.type}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href="https://meet.google.com/new"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-700 text-xs font-semibold flex items-center gap-1.5 transition shadow-2xs"
                    >
                      <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i> Open Google Meet (New Tab)
                    </a>
                    <button
                      onClick={() => setActiveInterviewRoom(null)}
                      className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition"
                    >
                      &times;
                    </button>
                  </div>
                </div>

                {/* Video & Scorecard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {/* Left: Video Feed Mockup (Dark feed simulates camera video) */}
                  <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 flex flex-col justify-between min-h-[300px]">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                        <i className="fa-solid fa-circle text-[8px]"></i> Candidate Video Connected
                      </span>
                      <span className="font-mono text-slate-500">HD 1080p &bull; 00:14:28</span>
                    </div>

                    {/* Candidate Avatar & Speaking Indicator */}
                    <div className="my-auto flex flex-col items-center justify-center text-center space-y-3">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-xl shadow-indigo-500/20">
                        {activeInterviewRoom.candidateName.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{activeInterviewRoom.candidateName}</h4>
                        <p className="text-xs text-slate-400">Candidate Audio Active (Microphone on)</p>
                      </div>
                    </div>

                    {/* In-Call Controls */}
                    <div className="flex items-center justify-center gap-3 pt-3 border-t border-slate-800/80">
                      <button className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center text-xs">
                        <i className="fa-solid fa-microphone"></i>
                      </button>
                      <button className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center text-xs">
                        <i className="fa-solid fa-video"></i>
                      </button>
                      <button className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center text-xs">
                        <i className="fa-solid fa-display"></i>
                      </button>
                      <button
                        onClick={() => {
                          showToast(`Interview notes saved and candidate advanced!`);
                          setActiveInterviewRoom(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5"
                      >
                        <i className="fa-solid fa-phone-slash"></i> Complete & End
                      </button>
                    </div>
                  </div>

                  {/* Right: Recruiter Scorecard & AI Questions */}
                  <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-4 text-xs">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <i className="fa-solid fa-clipboard-check text-indigo-600"></i> Recruiter Live Scorecard
                    </h4>

                    {/* Ratings */}
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 font-medium">Technical Architecture:</span>
                        <div className="flex gap-1 text-amber-400">
                          <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-regular fa-star text-slate-300"></i>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 font-medium">Problem Solving & Speed:</span>
                        <div className="flex gap-1 text-amber-400">
                          <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 font-medium">Communication & Culture:</span>
                        <div className="flex gap-1 text-amber-400">
                          <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                        </div>
                      </div>
                    </div>

                    {/* AI Suggested Question during call */}
                    <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-[11px] text-slate-700">
                      <strong className="text-indigo-700 block mb-1">AI Prompt for Interviewer:</strong>
                      "Ask the candidate how they handle schema migrations and caching invalidation in MongoDB under high-traffic microservices."
                    </div>

                    {/* Recruiter Notes Area */}
                    <div>
                      <label className="text-slate-600 font-semibold block mb-1">Interviewer Private Notes</label>
                      <textarea
                        rows={3}
                        defaultValue="Strong candidate with deep grasp of distributed microservices. Expressed clear motivation for our mission. Recommend fast-tracking to final team match."
                        className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        onClick={() => {
                          showToast("Interview scorecard submitted successfully!");
                          setActiveInterviewRoom(null);
                        }}
                        className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition"
                      >
                        Submit Evaluation Scorecard
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. Candidate Deep Dossier Modal */}
          {selectedCandidate && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 space-y-5 animate-fade-in max-h-[90vh] overflow-y-auto text-slate-800">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Candidate Dossier & AI Analysis</span>
                    <h3 className="text-xl font-bold text-slate-900 mt-0.5">{selectedCandidate.name}</h3>
                    <p className="text-xs text-slate-500">{selectedCandidate.currentTitle} &bull; {selectedCandidate.email} &bull; {selectedCandidate.phone}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCandidate(null)}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center text-sm transition"
                  >
                    &times;
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2.5 text-center">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 block mb-1">Overall Match</span>
                    <span className="text-xl font-extrabold text-emerald-600">{selectedCandidate.aiScore}%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 block mb-1">Skills Overlap</span>
                    <span className="text-xl font-extrabold text-indigo-600">{selectedCandidate.scoreBreakdown?.skills || 92}%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 block mb-1">Seniority Match</span>
                    <span className="text-xl font-extrabold text-purple-600">{selectedCandidate.scoreBreakdown?.experience || 90}%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 block mb-1">Domain Fit</span>
                    <span className="text-xl font-extrabold text-pink-600">{selectedCandidate.scoreBreakdown?.domain || 88}%</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-slate-700">
                  <strong className="text-indigo-700 block mb-1">&bull; AI Contextual Evaluation:</strong>
                  {selectedCandidate.rationale}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Custom AI Interview Questions (Probing Depth & Gaps):
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2">
                      <span className="text-indigo-600 font-bold">1.</span>
                      <span>How have you resolved high latency and indexing bottlenecks in MongoDB production collections under heavy load?</span>
                    </li>
                    <li className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2">
                      <span className="text-indigo-600 font-bold">2.</span>
                      <span>Can you explain your containerization and zero-downtime deployment strategy with Docker and CI/CD pipelines?</span>
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
                      setInterviewForm({
                        ...interviewForm,
                        candidateName: cand.name,
                        candidateEmail: cand.email,
                        jobTitle: activeJob.title
                      });
                      setActiveTab('scheduler');
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition"
                  >
                    Proceed to Schedule Interview
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 4. Post New Job Requisition Modal */}
          {showNewJobModal && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 space-y-4 animate-fade-in text-slate-800">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <i className="fa-solid fa-briefcase text-indigo-600"></i> Post New Job Requisition
                  </h3>
                  <button onClick={() => setShowNewJobModal(false)} className="text-slate-400 hover:text-slate-700 text-lg">&times;</button>
                </div>

                <form onSubmit={handleCreateJob} className="space-y-3 text-xs">
                  <div>
                    <label className="text-slate-600 font-semibold block mb-1">Job Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Senior DevOps / Cloud Architect"
                      value={newJobForm.title}
                      onChange={(e) => setNewJobForm({ ...newJobForm, title: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-600 font-semibold block mb-1">Department</label>
                      <select
                        value={newJobForm.department}
                        onChange={(e) => setNewJobForm({ ...newJobForm, department: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none"
                      >
                        <option value="Engineering">Engineering</option>
                        <option value="Data & AI">Data & AI</option>
                        <option value="Product">Product</option>
                        <option value="Design">Design</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-slate-600 font-semibold block mb-1">Min Experience</label>
                      <input
                        type="number"
                        value={newJobForm.minExperienceYears}
                        onChange={(e) => setNewJobForm({ ...newJobForm, minExperienceYears: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-600 font-semibold block mb-1">Required Skills (Comma separated)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. docker, kubernetes, terraform, aws, python"
                      value={newJobForm.requiredSkills}
                      onChange={(e) => setNewJobForm({ ...newJobForm, requiredSkills: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-600 font-semibold block mb-1">Location</label>
                      <input
                        type="text"
                        value={newJobForm.location}
                        onChange={(e) => setNewJobForm({ ...newJobForm, location: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-slate-600 font-semibold block mb-1">Salary Range</label>
                      <input
                        type="text"
                        value={newJobForm.salary}
                        onChange={(e) => setNewJobForm({ ...newJobForm, salary: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowNewJobModal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition"
                    >
                      Publish Requisition
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* 5. Add New Candidate Modal */}
          {showNewCandidateModal && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 space-y-4 animate-fade-in text-slate-800">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <i className="fa-solid fa-user-plus text-indigo-600"></i> Add Candidate to Pipeline
                  </h3>
                  <button onClick={() => setShowNewCandidateModal(false)} className="text-slate-400 hover:text-slate-700 text-lg">&times;</button>
                </div>

                <form onSubmit={handleCreateCandidate} className="space-y-3 text-xs">
                  <div>
                    <label className="text-slate-600 font-semibold block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jason Thorne"
                      value={newCandForm.name}
                      onChange={(e) => setNewCandForm({ ...newCandForm, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-600 font-semibold block mb-1">Email</label>
                      <input
                        type="email"
                        required
                        placeholder="jason@example.com"
                        value={newCandForm.email}
                        onChange={(e) => setNewCandForm({ ...newCandForm, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-slate-600 font-semibold block mb-1">Years of Exp</label>
                      <input
                        type="number"
                        value={newCandForm.experienceYears}
                        onChange={(e) => setNewCandForm({ ...newCandForm, experienceYears: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-600 font-semibold block mb-1">Current Job Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Full-Stack Engineer"
                      value={newCandForm.currentTitle}
                      onChange={(e) => setNewCandForm({ ...newCandForm, currentTitle: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-slate-600 font-semibold block mb-1">Target Requisition</label>
                    <select
                      value={newCandForm.jobId}
                      onChange={(e) => setNewCandForm({ ...newCandForm, jobId: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none"
                    >
                      {jobs.map(j => <option key={j._id} value={j._id}>{j.title}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-600 font-semibold block mb-1">Extracted / Verified Skills (Comma separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. react, node.js, mongodb, typescript, docker"
                      value={newCandForm.skills}
                      onChange={(e) => setNewCandForm({ ...newCandForm, skills: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowNewCandidateModal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition"
                    >
                      Add & Evaluate Candidate
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Footer */}
          <footer className="border-t border-slate-200 bg-white px-6 py-4 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2 shadow-2xs">
            <div className="flex items-center gap-3">
              <img src="college_crest_square.png" alt="Easwari Crest" className="w-5 h-5 object-contain" />
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

    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
  