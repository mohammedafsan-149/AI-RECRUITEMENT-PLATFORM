const { useState, useEffect, useMemo } = React;
const INITIAL_JOBS = [
  {
    _id: "job_101",
    title: "Senior Full-Stack Engineer (MERN)",
    department: "Engineering",
    location: "Remote / Global",
    type: "Full-Time",
    requiredSkills: ["react", "node.js", "mongodb", "typescript", "docker"],
    preferredSkills: ["aws", "redis", "graphql"],
    minExperienceYears: 5,
    openings: 2,
    salary: "$140k - $175k"
  },
  {
    _id: "job_102",
    title: "AI / Machine Learning Engineer",
    department: "Data & AI",
    location: "San Francisco, CA / Hybrid",
    type: "Full-Time",
    requiredSkills: ["python", "machine learning", "docker", "postgresql"],
    preferredSkills: ["fastapi", "kubernetes", "aws"],
    minExperienceYears: 4,
    openings: 1,
    salary: "$155k - $190k"
  },
  {
    _id: "job_103",
    title: "Lead Product Manager (HR Tech)",
    department: "Product",
    location: "New York, NY / Hybrid",
    type: "Full-Time",
    requiredSkills: ["agile", "scrum", "system design"],
    preferredSkills: ["data analytics", "sql"],
    minExperienceYears: 6,
    openings: 1,
    salary: "$150k - $180k"
  }
];
const INITIAL_CANDIDATES = [
  {
    _id: "c1",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    phone: "+1 (555) 392-1084",
    currentTitle: "Senior Full-Stack Developer",
    company: "CloudScale Inc.",
    experienceYears: 6,
    skills: ["react", "node.js", "mongodb", "typescript", "docker", "aws"],
    stage: "AI Screened",
    jobId: "job_101",
    aiScore: 94,
    scoreBreakdown: { skills: 96, experience: 95, domain: 90, education: 92 },
    rationale: "Exceptional fit for MERN stack role. 6 years of scalable production microservices, exceeding the 5-year requirement baseline. Demonstrated leadership on distributed systems."
  },
  {
    _id: "c2",
    name: "Marcus Vance",
    email: "m.vance@example.com",
    phone: "+1 (555) 819-4472",
    currentTitle: "Software Engineer",
    company: "Apex Digital Labs",
    experienceYears: 4,
    skills: ["react", "node.js", "postgresql", "mongodb"],
    stage: "Interview Scheduled",
    jobId: "job_101",
    aiScore: 86,
    scoreBreakdown: { skills: 88, experience: 82, domain: 85, education: 89 },
    rationale: "Strong JavaScript foundations with proven full-stack API design. Minor gap in Docker container orchestration and TypeScript type-safety at enterprise scale."
  },
  {
    _id: "c3",
    name: "Elena Rostova",
    email: "elena.rostova@example.com",
    phone: "+1 (555) 948-2311",
    currentTitle: "Lead AI Engineer",
    company: "Cognitive Matrix",
    experienceYears: 7,
    skills: ["python", "machine learning", "docker", "postgresql", "aws", "nlp"],
    stage: "Technical Evaluation",
    jobId: "job_102",
    aiScore: 96,
    scoreBreakdown: { skills: 98, experience: 96, domain: 95, education: 94 },
    rationale: "Top-tier NLP & LLM architect with published transformer research and enterprise GPU cluster deployment experience. High cultural and technical alignment."
  },
  {
    _id: "c4",
    name: "David Kim",
    email: "david.k@example.com",
    phone: "+1 (555) 234-9812",
    currentTitle: "Junior Frontend Developer",
    company: "Startify Labs",
    experienceYears: 2,
    skills: ["react", "typescript"],
    stage: "Applied",
    jobId: "job_101",
    aiScore: 62,
    scoreBreakdown: { skills: 55, experience: 50, domain: 70, education: 85 },
    rationale: "Promising frontend aptitude, but falls short of the 5-year seniority threshold and backend Node/Mongo prerequisites. Recommend junior engineering pool."
  },
  {
    _id: "c5",
    name: "Amina Al-Mansoor",
    email: "amina.m@example.com",
    phone: "+1 (555) 762-1190",
    currentTitle: "Senior Product Manager",
    company: "NextGen HR Solutions",
    experienceYears: 6,
    skills: ["agile", "scrum", "system design", "data analytics"],
    stage: "Offer",
    jobId: "job_103",
    aiScore: 92,
    scoreBreakdown: { skills: 94, experience: 90, domain: 95, education: 90 },
    rationale: "Deep track record steering AI enterprise workflows from 0 to 1 with proven sprint velocity and measurable customer retention metrics."
  }
];
const INITIAL_INTERVIEWS = [
  {
    _id: "i1",
    candidateName: "Marcus Vance",
    candidateEmail: "m.vance@example.com",
    candidateId: "c2",
    jobTitle: "Senior Full-Stack Engineer (MERN)",
    interviewerName: "Alex Rivera (VP Eng)",
    scheduledDate: "2026-10-20",
    timeSlot: "14:00 - 15:00 UTC",
    type: "Technical Architecture",
    status: "Confirmed"
  },
  {
    _id: "i2",
    candidateName: "Sarah Chen",
    candidateEmail: "sarah.chen@example.com",
    candidateId: "c1",
    jobTitle: "Senior Full-Stack Engineer (MERN)",
    interviewerName: "Jessica Park (HR Lead)",
    scheduledDate: "2026-10-21",
    timeSlot: "10:00 - 10:45 UTC",
    type: "Initial Recruiter Screen",
    status: "Confirmed"
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
function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [selectedJobId, setSelectedJobId] = useState("job_101");
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [interviews, setInterviews] = useState(INITIAL_INTERVIEWS);
  const [sqlTable, setSqlTable] = useState("candidates");
  const [sqlCopyStatus, setSqlCopyStatus] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMinScore, setFilterMinScore] = useState("all");
  const [filterStage, setFilterStage] = useState("all");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showHelpGuide, setShowHelpGuide] = useState(false);
  const [showNewJobModal, setShowNewJobModal] = useState(false);
  const [showNewCandidateModal, setShowNewCandidateModal] = useState(false);
  const [activeInterviewRoom, setActiveInterviewRoom] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4e3);
  };
  const [interviewForm, setInterviewForm] = useState({
    candidateName: "",
    candidateEmail: "",
    jobTitle: "Senior Full-Stack Engineer (MERN)",
    interviewerName: "Engineering Lead",
    scheduledDate: "2026-10-22",
    timeSlot: "14:00 - 15:00 UTC",
    type: "Technical Architecture"
  });
  const [newJobForm, setNewJobForm] = useState({
    title: "",
    department: "Engineering",
    location: "Remote",
    requiredSkills: "",
    minExperienceYears: 3,
    salary: "$130k - $160k"
  });
  const [newCandForm, setNewCandForm] = useState({
    name: "",
    email: "",
    currentTitle: "",
    experienceYears: 4,
    skills: "",
    jobId: "job_101"
  });
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
  const activeJob = jobs.find((j) => j._id === selectedJobId) || jobs[0];
  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      if (c.jobId && c.jobId !== selectedJobId) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = c.name.toLowerCase().includes(q);
        const matchTitle = c.currentTitle.toLowerCase().includes(q);
        const matchSkill = c.skills.some((s) => s.toLowerCase().includes(q));
        if (!matchName && !matchTitle && !matchSkill) return false;
      }
      if (filterMinScore === "90" && c.aiScore < 90) return false;
      if (filterMinScore === "80" && c.aiScore < 80) return false;
      if (filterMinScore === "70" && c.aiScore < 70) return false;
      if (filterStage !== "all" && c.stage !== filterStage) return false;
      return true;
    }).sort((a, b) => b.aiScore - a.aiScore);
  }, [candidates, selectedJobId, searchQuery, filterMinScore, filterStage]);
  const advanceStage = (candId) => {
    const order = ["Applied", "AI Screened", "Interview Scheduled", "Technical Evaluation", "Offer", "Hired"];
    setCandidates((prev) => prev.map((c) => {
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
  const handleCreateJob = (e) => {
    e.preventDefault();
    if (!newJobForm.title) return;
    const skillsArr = newJobForm.requiredSkills.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
    const created = {
      _id: "job_" + Date.now(),
      title: newJobForm.title,
      department: newJobForm.department,
      location: newJobForm.location,
      type: "Full-Time",
      requiredSkills: skillsArr.length > 0 ? skillsArr : ["react", "node.js", "mongodb"],
      preferredSkills: ["aws", "docker"],
      minExperienceYears: parseInt(newJobForm.minExperienceYears, 10),
      openings: 1,
      salary: newJobForm.salary
    };
    setJobs([created, ...jobs]);
    setSelectedJobId(created._id);
    setShowNewJobModal(false);
    showToast(`New Job Requisition "${created.title}" published!`);
  };
  const handleCreateCandidate = (e) => {
    e.preventDefault();
    if (!newCandForm.name || !newCandForm.email) return;
    const skillsArr = newCandForm.skills.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
    const reqJob = jobs.find((j) => j._id === newCandForm.jobId) || activeJob;
    const matched = reqJob.requiredSkills.filter((r) => skillsArr.includes(r.toLowerCase()));
    const calcScore = Math.min(96, Math.max(45, Math.round(matched.length / reqJob.requiredSkills.length * 100)));
    const created = {
      _id: "c_" + Date.now(),
      name: newCandForm.name,
      email: newCandForm.email,
      phone: "+1 (555) 000-1122",
      currentTitle: newCandForm.currentTitle || "Software Engineer",
      company: "Candidate Portfolio",
      experienceYears: parseInt(newCandForm.experienceYears, 10),
      skills: skillsArr,
      stage: "Applied",
      jobId: reqJob._id,
      aiScore: calcScore,
      scoreBreakdown: { skills: calcScore, experience: 85, domain: 80, education: 85 },
      rationale: `Candidate added manually. Matched ${matched.length} of ${reqJob.requiredSkills.length} required skills (${matched.join(", ")}).`
    };
    setCandidates([created, ...candidates]);
    setShowNewCandidateModal(false);
    showToast(`Candidate "${created.name}" added to pipeline!`);
  };
  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    if (!interviewForm.candidateName || !interviewForm.candidateEmail) return;
    const newInv = {
      _id: "i_" + Date.now(),
      ...interviewForm,
      status: "Confirmed"
    };
    setInterviews([newInv, ...interviews]);
    setCandidates((prev) => prev.map((c) => {
      if (c.name.toLowerCase() === interviewForm.candidateName.toLowerCase() && (c.stage === "Applied" || c.stage === "AI Screened")) {
        return { ...c, stage: "Interview Scheduled" };
      }
      return c;
    }));
    showToast(`Interview scheduled for ${newInv.candidateName}! Calendar invite generated.`);
  };
  const handleQuickShortlist = (cand) => {
    advanceStage(cand._id);
    showToast(`Email invitation drafted and sent to ${cand.email}`);
  };
  const handlePoliteReject = (cand) => {
    setCandidates((prev) => prev.map((c) => c._id === cand._id ? { ...c, stage: "Archived / Polite Feedback" } : c));
    showToast(`Polite, constructive feedback email dispatched to ${cand.name}`);
  };
  const runSandboxScreening = () => {
    setIsScreening(true);
    setTimeout(() => {
      const text = sandboxResume.toLowerCase();
      const reqs = activeJob.requiredSkills;
      const matched = reqs.filter((r) => text.includes(r.toLowerCase()));
      const missing = reqs.filter((r) => !text.includes(r.toLowerCase()));
      const score = Math.round(matched.length / reqs.length * 100);
      setSandboxResult({
        score: Math.min(98, Math.max(35, score)),
        matched,
        missing,
        detectedExp: text.includes("6 years") ? 6 : text.includes("5 years") ? 5 : 4,
        rationale: score >= 80 ? `High semantic compatibility with ${activeJob.title}. Candidate possesses verified core technologies (${matched.join(", ")}) with substantial production tenure.` : `Partial fit. Lacks prerequisites: ${missing.join(", ")}. Recommend technical deep-dive on transferable foundations.`,
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
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen flex flex-col justify-between" }, toastMessage && /* @__PURE__ */ React.createElement("div", { className: "fixed bottom-6 right-6 z-50 bg-indigo-600 text-white px-4 py-3 rounded-2xl shadow-2xl border border-indigo-400 flex items-center gap-3 animate-fade-in text-xs font-semibold" }, /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-circle-check text-emerald-300 text-sm" }), /* @__PURE__ */ React.createElement("span", null, toastMessage), /* @__PURE__ */ React.createElement("button", { onClick: () => setToastMessage(null), className: "ml-2 text-indigo-200 hover:text-white" }, "\xD7")), /* @__PURE__ */ React.createElement("header", { className: "border-b border-slate-200 bg-white/95 backdrop-blur sticky top-0 z-40 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-xs" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-11 h-11 rounded-xl bg-white border border-slate-200 shadow-sm p-1 flex items-center justify-center overflow-hidden shrink-0" }, /* @__PURE__ */ React.createElement("img", { src: "college_crest_square.png", alt: "Easwari Engineering College Logo", className: "w-full h-full object-contain" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("h1", { className: "font-extrabold text-base tracking-tight text-slate-900" }, "TalentAI"), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200" }, "Easwari Engineering College")), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500" }, "Autonomous Talent Intelligence & ATS Platform"))), /* @__PURE__ */ React.createElement("nav", { className: "flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/80" }, [
    { id: "dashboard", label: "Dashboard", icon: "fa-chart-pie" },
    { id: "screening", label: "AI Screening & Ranking", icon: "fa-wand-magic-sparkles" },
    { id: "pipeline", label: "Candidate ATS (Kanban)", icon: "fa-bars-progress" },
    { id: "scheduler", label: "Smart Scheduler", icon: "fa-calendar-days" },
    { id: "tester", label: "Resume Test Bench", icon: "fa-flask-vial" },
    { id: "database", label: "SQL Database", icon: "fa-database" }
  ].map((t) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: t.id,
      onClick: () => setActiveTab(t.id),
      className: `px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-2 ${activeTab === t.id ? "bg-white text-indigo-600 shadow-sm font-bold border border-slate-200/60" : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"}`
    },
    /* @__PURE__ */ React.createElement("i", { className: `fa-solid ${t.icon} text-xs` }),
    /* @__PURE__ */ React.createElement("span", null, t.label)
  ))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowHelpGuide(true),
      className: "px-3.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-1.5 transition shadow-2xs",
      title: "Complete Recruiter Guidance & Tour"
    },
    /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-circle-question" }),
    /* @__PURE__ */ React.createElement("span", null, "Recruiter Guide")
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowNewCandidateModal(true),
      className: "px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
    },
    /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-user-plus text-xs" }),
    /* @__PURE__ */ React.createElement("span", null, "Add Candidate")
  ), /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 text-xs font-bold shadow-2xs", title: "HR Recruiter Profile" }, "HR"))), /* @__PURE__ */ React.createElement("main", { className: "flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-6" }, activeTab === "dashboard" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6 animate-fade-in" }, /* @__PURE__ */ React.createElement("div", { className: "p-6 rounded-2xl bg-gradient-to-r from-indigo-50/80 via-purple-50/50 to-white border border-indigo-100 flex flex-wrap items-center justify-between gap-4 shadow-sm" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 text-[11px] font-semibold mb-2" }, /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-sparkles" }), " AI Hiring Copilot Active"), /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-extrabold text-slate-900 tracking-tight" }, "Recruiter Velocity Command Center"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed" }, "AI screening has reduced candidate evaluation time by ", /* @__PURE__ */ React.createElement("strong", null, "75%"), " and expedited scheduling from 4.2 days down to ", /* @__PURE__ */ React.createElement("strong", null, "instant self-booking"), ".")), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2.5" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setActiveTab("screening"),
      className: "px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition flex items-center gap-2"
    },
    /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-wand-magic-sparkles" }),
    " Review Top Ranked Candidates"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowHelpGuide(true),
      className: "px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold text-xs shadow-sm transition flex items-center gap-2"
    },
    /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-book-open" }),
    " How It Works"
  ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4" }, [
    { title: "Resumes Screened", val: "1,428", sub: "+32% this month", icon: "fa-file-lines", color: "text-indigo-600" },
    { title: "Avg Screening Time", val: "1.2 mins", sub: "95% faster than manual (25m)", icon: "fa-bolt", color: "text-emerald-600" },
    { title: "Interview Conversion", val: "68.4%", sub: "3.2x higher quality pipeline", icon: "fa-arrow-trend-up", color: "text-purple-600" },
    { title: "Avg Time-to-Hire", val: "12 Days", sub: "vs 44-day industry avg", icon: "fa-clock", color: "text-pink-600" }
  ].map((m, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-3" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-semibold text-slate-500 uppercase tracking-wider" }, m.title), /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-sm text-indigo-600" }, /* @__PURE__ */ React.createElement("i", { className: `fa-solid ${m.icon}` }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-3xl font-extrabold text-slate-900 tracking-tight" }, m.val), /* @__PURE__ */ React.createElement("div", { className: `text-[11px] font-semibold mt-1.5 flex items-center gap-1 ${m.color}` }, /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-arrow-up-right text-[10px]" }), " ", m.sub))))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm" }, /* @__PURE__ */ React.createElement("h3", { className: "text-base font-bold text-slate-900 mb-4 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", null, "Live Candidate Pipeline Funnel"), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-normal text-slate-500" }, "Active Engineering Requisitions")), /* @__PURE__ */ React.createElement("div", { className: "space-y-4 text-xs font-semibold" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between mb-1.5 text-slate-700" }, /* @__PURE__ */ React.createElement("span", null, "1. Sourced & Applied"), /* @__PURE__ */ React.createElement("span", { className: "text-indigo-600 font-bold" }, "1,428 Applications (100%)")), /* @__PURE__ */ React.createElement("div", { className: "w-full bg-slate-100 rounded-full h-3" }, /* @__PURE__ */ React.createElement("div", { className: "bg-indigo-600 h-3 rounded-full", style: { width: "100%" } }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between mb-1.5 text-slate-700" }, /* @__PURE__ */ React.createElement("span", null, "2. AI Screened (Match \u2265 75%)"), /* @__PURE__ */ React.createElement("span", { className: "text-purple-600 font-bold" }, "312 Candidates (21.8%)")), /* @__PURE__ */ React.createElement("div", { className: "w-full bg-slate-100 rounded-full h-3" }, /* @__PURE__ */ React.createElement("div", { className: "bg-purple-600 h-3 rounded-full", style: { width: "22%" } }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between mb-1.5 text-slate-700" }, /* @__PURE__ */ React.createElement("span", null, "3. Automated Interview Booked"), /* @__PURE__ */ React.createElement("span", { className: "text-pink-600 font-bold" }, "84 Candidates (5.9%)")), /* @__PURE__ */ React.createElement("div", { className: "w-full bg-slate-100 rounded-full h-3" }, /* @__PURE__ */ React.createElement("div", { className: "bg-pink-600 h-3 rounded-full", style: { width: "6%" } }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between mb-1.5 text-slate-700" }, /* @__PURE__ */ React.createElement("span", null, "4. Technical & Team Assessment"), /* @__PURE__ */ React.createElement("span", { className: "text-amber-600 font-bold" }, "28 Candidates (1.9%)")), /* @__PURE__ */ React.createElement("div", { className: "w-full bg-slate-100 rounded-full h-3" }, /* @__PURE__ */ React.createElement("div", { className: "bg-amber-500 h-3 rounded-full", style: { width: "2%" } }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between mb-1.5 text-emerald-800 font-bold" }, /* @__PURE__ */ React.createElement("span", null, "5. Offer Extended & Accepted"), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-600 font-bold" }, "12 Hires (0.84%)")), /* @__PURE__ */ React.createElement("div", { className: "w-full bg-slate-100 rounded-full h-3" }, /* @__PURE__ */ React.createElement("div", { className: "bg-emerald-500 h-3 rounded-full", style: { width: "1%" } }))))), /* @__PURE__ */ React.createElement("div", { className: "p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "text-base font-bold text-slate-900 mb-2 flex items-center gap-2" }, /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-list-check text-indigo-600" }), " Recruiter Daily Checklist"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 mb-4" }, "Recommended tasks for today's hiring pipeline:"), /* @__PURE__ */ React.createElement("div", { className: "space-y-2.5 text-xs" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      onClick: () => setActiveTab("screening"),
      className: "p-3 rounded-xl bg-slate-50 hover:bg-indigo-50/40 border border-slate-200 hover:border-indigo-200 cursor-pointer transition"
    },
    /* @__PURE__ */ React.createElement("div", { className: "font-semibold text-slate-900 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", null, "Review Sarah Chen's Profile"), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold" }, "94% Match")),
    /* @__PURE__ */ React.createElement("p", { className: "text-slate-500 text-[11px] mt-1" }, "Pending recruiter sign-off for Senior MERN role.")
  ), /* @__PURE__ */ React.createElement(
    "div",
    {
      onClick: () => setActiveTab("scheduler"),
      className: "p-3 rounded-xl bg-slate-50 hover:bg-purple-50/40 border border-slate-200 hover:border-purple-200 cursor-pointer transition"
    },
    /* @__PURE__ */ React.createElement("div", { className: "font-semibold text-slate-900 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", null, "Upcoming Interview Call"), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full font-bold" }, "Marcus Vance")),
    /* @__PURE__ */ React.createElement("p", { className: "text-slate-500 text-[11px] mt-1" }, "Technical Architecture round with VP of Engineering.")
  ), /* @__PURE__ */ React.createElement(
    "div",
    {
      onClick: () => setActiveTab("pipeline"),
      className: "p-3 rounded-xl bg-slate-50 hover:bg-indigo-50/40 border border-slate-200 hover:border-indigo-200 cursor-pointer transition"
    },
    /* @__PURE__ */ React.createElement("div", { className: "font-semibold text-slate-900 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", null, "Offer Letter Prepared"), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full font-bold" }, "Amina Al-Mansoor")),
    /* @__PURE__ */ React.createElement("p", { className: "text-slate-500 text-[11px] mt-1" }, "Lead Product Manager role ready for signing.")
  ))), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setActiveTab("screening"),
      className: "w-full mt-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-semibold text-xs transition text-center"
    },
    "Go to Screening Leaderboard \u2192"
  )))), activeTab === "screening" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6 animate-fade-in" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-indigo-600 uppercase tracking-wider" }, "Semantic Matching Engine"), /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-extrabold text-slate-900" }, "AI Candidate Leaderboard"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 mt-0.5" }, "Ranked by contextual fit, verified skills alignment & tenure stability")), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("label", { className: "text-xs text-slate-500 font-medium" }, "Requisition:"), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: selectedJobId,
      onChange: (e) => setSelectedJobId(e.target.value),
      className: "bg-white border border-slate-300 text-xs text-slate-800 rounded-xl px-3 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
    },
    jobs.map((j) => /* @__PURE__ */ React.createElement("option", { key: j._id, value: j._id }, j.title, " (", j.department, ")"))
  )), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowNewJobModal(true),
      className: "px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-semibold shadow-sm flex items-center gap-1.5 transition"
    },
    /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-plus text-xs" }),
    " Post New Job"
  ))), /* @__PURE__ */ React.createElement("div", { className: "p-4 rounded-xl bg-slate-100/70 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-slate-500 font-semibold" }, "Required Stack:"), activeJob.requiredSkills.map((sk, idx) => /* @__PURE__ */ React.createElement("span", { key: idx, className: "px-2.5 py-1 rounded-md bg-white border border-slate-200 text-indigo-700 font-mono text-[11px] shadow-2xs" }, sk))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4 text-slate-500" }, /* @__PURE__ */ React.createElement("span", null, "Min Exp: ", /* @__PURE__ */ React.createElement("strong", { className: "text-slate-800" }, activeJob.minExperienceYears, "+ yrs")), /* @__PURE__ */ React.createElement("span", null, "\u2022"), /* @__PURE__ */ React.createElement("span", null, "Comp: ", /* @__PURE__ */ React.createElement("strong", { className: "text-emerald-700" }, activeJob.salary || "$140k - $175k")), /* @__PURE__ */ React.createElement("span", null, "\u2022"), /* @__PURE__ */ React.createElement("span", null, "Location: ", /* @__PURE__ */ React.createElement("strong", { className: "text-slate-800" }, activeJob.location)))), /* @__PURE__ */ React.createElement("div", { className: "p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1 min-w-[240px] relative" }, /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400" }), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Search candidate by name, title, or skill (e.g. React, Python, Elena)...",
      value: searchQuery,
      onChange: (e) => setSearchQuery(e.target.value),
      className: "w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-slate-500 font-medium" }, "Match:"), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: filterMinScore,
      onChange: (e) => setFilterMinScore(e.target.value),
      className: "bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-2.5 py-1.5 focus:bg-white focus:outline-none"
    },
    /* @__PURE__ */ React.createElement("option", { value: "all" }, "All Scores"),
    /* @__PURE__ */ React.createElement("option", { value: "90" }, "\u2265 90% (Top Tier)"),
    /* @__PURE__ */ React.createElement("option", { value: "80" }, "\u2265 80% (Qualified)"),
    /* @__PURE__ */ React.createElement("option", { value: "70" }, "\u2265 70% (Potential)")
  )), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-slate-500 font-medium" }, "Stage:"), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: filterStage,
      onChange: (e) => setFilterStage(e.target.value),
      className: "bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-2.5 py-1.5 focus:bg-white focus:outline-none"
    },
    /* @__PURE__ */ React.createElement("option", { value: "all" }, "All Stages"),
    /* @__PURE__ */ React.createElement("option", { value: "Applied" }, "Applied"),
    /* @__PURE__ */ React.createElement("option", { value: "AI Screened" }, "AI Screened"),
    /* @__PURE__ */ React.createElement("option", { value: "Interview Scheduled" }, "Interview Scheduled"),
    /* @__PURE__ */ React.createElement("option", { value: "Technical Evaluation" }, "Technical Evaluation"),
    /* @__PURE__ */ React.createElement("option", { value: "Offer" }, "Offer")
  )), (searchQuery || filterMinScore !== "all" || filterStage !== "all") && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        setSearchQuery("");
        setFilterMinScore("all");
        setFilterStage("all");
      },
      className: "text-indigo-600 hover:text-indigo-800 font-semibold"
    },
    "Clear Filters"
  ))), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, filteredCandidates.map((cand, idx) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: cand._id,
      className: "p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition flex flex-wrap items-center justify-between gap-4 shadow-sm"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-sm" }, "#", idx + 1), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2.5" }, /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-slate-900 text-base" }, cand.name), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200" }, cand.stage), /* @__PURE__ */ React.createElement("span", { className: "text-[11px] text-slate-500 font-mono" }, cand.company)), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 mt-0.5" }, cand.currentTitle, " \u2022 ", cand.experienceYears, " yrs experience \u2022 ", cand.email), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-1.5 mt-2" }, cand.skills.map((s, i) => /* @__PURE__ */ React.createElement("span", { key: i, className: "px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-mono border border-slate-200" }, s))))),
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-5" }, /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 justify-end" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-500 font-medium" }, "AI Match"), /* @__PURE__ */ React.createElement("span", { className: `text-xl font-extrabold px-3 py-1 rounded-lg ${cand.aiScore >= 85 ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : cand.aiScore >= 70 ? "bg-indigo-50 text-indigo-700 border border-indigo-200" : "bg-amber-50 text-amber-700 border border-amber-200"}` }, cand.aiScore, "%")), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-400 block mt-1" }, "Weighted Composite")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setSelectedCandidate(cand),
        className: "px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold shadow-sm transition",
        title: "View Full Evaluation, Gaps & Interview Questions"
      },
      /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-file-waveform mr-1" }),
      " Dossier"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          setInterviewForm({
            ...interviewForm,
            candidateName: cand.name,
            candidateEmail: cand.email,
            jobTitle: activeJob.title
          });
          setActiveTab("scheduler");
        },
        className: "px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
      },
      /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-calendar-plus text-xs" }),
      " Schedule"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => handleQuickShortlist(cand),
        className: "p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs transition",
        title: "Shortlist & Fast-track candidate"
      },
      /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-circle-check" })
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => handlePoliteReject(cand),
        className: "p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs transition",
        title: "Send Polite AI Feedback & Archive"
      },
      /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-ban" })
    )))
  )), filteredCandidates.length === 0 && /* @__PURE__ */ React.createElement("div", { className: "p-12 text-center bg-white border border-slate-200 rounded-2xl text-slate-400 space-y-3" }, /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-user-slash text-3xl text-slate-400" }), /* @__PURE__ */ React.createElement("p", { className: "text-sm font-semibold text-slate-700" }, "No candidates match your current filter."), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500" }, 'Try clearing filters or clicking "+ Add Candidate" to create a new profile.')))), activeTab === "pipeline" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6 animate-fade-in" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-indigo-600 uppercase tracking-wider" }, "Visual Candidate Tracker"), /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-extrabold text-slate-900" }, "Full-Funnel ATS Pipeline"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 mt-0.5" }, 'Click "Advance \u2192" to move candidates across automated hiring stages')), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowNewCandidateModal(true),
      className: "px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
    },
    /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-plus text-xs" }),
    " Add Candidate"
  ), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-emerald-700 font-semibold flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200" }, /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }), " Pipeline Synced"))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 items-start" }, ["Applied", "AI Screened", "Interview Scheduled", "Technical Evaluation", "Offer", "Hired"].map((stageName) => {
    const stageCands = candidates.filter((c) => c.stage === stageName);
    return /* @__PURE__ */ React.createElement("div", { key: stageName, className: "bg-slate-100/70 rounded-2xl border border-slate-200 p-3.5 flex flex-col min-h-[500px]" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between pb-3 mb-3 border-b border-slate-200" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-xs text-slate-700 uppercase tracking-wide" }, stageName), /* @__PURE__ */ React.createElement("span", { className: "px-2 py-0.5 rounded-full bg-white text-slate-700 font-mono text-[11px] font-bold border border-slate-200 shadow-2xs" }, stageCands.length)), /* @__PURE__ */ React.createElement("div", { className: "space-y-2.5 flex-1" }, stageCands.map((c) => /* @__PURE__ */ React.createElement("div", { key: c._id, className: "p-3 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition shadow-sm" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-1" }, /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-slate-900 text-xs cursor-pointer hover:text-indigo-600 transition", onClick: () => setSelectedCandidate(c) }, c.name), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200" }, c.aiScore, "%")), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-slate-500 mb-2 truncate" }, c.currentTitle), /* @__PURE__ */ React.createElement("div", { className: "pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]" }, /* @__PURE__ */ React.createElement("span", { className: "text-slate-400" }, c.experienceYears, "y exp"), stageName !== "Hired" && /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => advanceStage(c._id),
        className: "text-indigo-600 hover:text-indigo-800 font-bold transition flex items-center gap-1"
      },
      "Advance \u2192"
    )))), stageCands.length === 0 && /* @__PURE__ */ React.createElement("div", { className: "h-32 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-xs italic" }, "No candidates")));
  }))), activeTab === "scheduler" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6 animate-fade-in" }, /* @__PURE__ */ React.createElement("div", { className: "p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-indigo-600 uppercase tracking-wider" }, "Autonomous Interview Coordination"), /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-extrabold text-slate-900" }, "Smart Interview Scheduler & Virtual Room"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 mt-0.5" }, "Automated calendar invites with instant Google Meet link generator & in-app interview scorecard")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold" }, /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-calendar-check" }), " Google Workspace & Outlook 365 Sync Active")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm" }, /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-slate-900 text-base mb-4 flex items-center gap-2" }, /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-calendar-plus text-indigo-600" }), " Dispatch Interview Booking"), /* @__PURE__ */ React.createElement("form", { onSubmit: handleScheduleSubmit, className: "space-y-3.5 text-xs" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-slate-600 font-semibold block mb-1" }, "Candidate Name"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      required: true,
      placeholder: "Candidate Name",
      value: interviewForm.candidateName,
      onChange: (e) => setInterviewForm({ ...interviewForm, candidateName: e.target.value }),
      className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-slate-600 font-semibold block mb-1" }, "Candidate Email"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "email",
      required: true,
      placeholder: "Candidate Email",
      value: interviewForm.candidateEmail,
      onChange: (e) => setInterviewForm({ ...interviewForm, candidateEmail: e.target.value }),
      className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-slate-600 font-semibold block mb-1" }, "Target Requisition"), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: interviewForm.jobTitle,
      onChange: (e) => setInterviewForm({ ...interviewForm, jobTitle: e.target.value }),
      className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
    },
    jobs.map((j) => /* @__PURE__ */ React.createElement("option", { key: j._id, value: j.title }, j.title))
  )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-slate-600 font-semibold block mb-1" }, "Date"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "date",
      value: interviewForm.scheduledDate,
      onChange: (e) => setInterviewForm({ ...interviewForm, scheduledDate: e.target.value }),
      className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-slate-600 font-semibold block mb-1" }, "Time Slot"), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: interviewForm.timeSlot,
      onChange: (e) => setInterviewForm({ ...interviewForm, timeSlot: e.target.value }),
      className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
    },
    /* @__PURE__ */ React.createElement("option", { value: "10:00 - 11:00 UTC" }, "10:00 - 11:00 UTC"),
    /* @__PURE__ */ React.createElement("option", { value: "14:00 - 15:00 UTC" }, "14:00 - 15:00 UTC"),
    /* @__PURE__ */ React.createElement("option", { value: "16:00 - 17:00 UTC" }, "16:00 - 17:00 UTC")
  ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-slate-600 font-semibold block mb-1" }, "Interview Round"), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: interviewForm.type,
      onChange: (e) => setInterviewForm({ ...interviewForm, type: e.target.value }),
      className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
    },
    /* @__PURE__ */ React.createElement("option", { value: "Initial Recruiter Screen" }, "Initial Recruiter Screen"),
    /* @__PURE__ */ React.createElement("option", { value: "Technical Architecture" }, "Technical Architecture"),
    /* @__PURE__ */ React.createElement("option", { value: "Pair Programming" }, "Pair Programming"),
    /* @__PURE__ */ React.createElement("option", { value: "Culture Fit & Team Match" }, "Culture Fit & Team Match")
  )), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "submit",
      className: "w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-2"
    },
    /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-paper-plane" }),
    " Book & Dispatch Calendar Invites"
  ))), /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm" }, /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-slate-900 text-base mb-4 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", null, "Confirmed Interview Sessions"), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-normal text-slate-500" }, interviews.length, " Scheduled")), /* @__PURE__ */ React.createElement("div", { className: "space-y-3.5" }, interviews.map((iv) => /* @__PURE__ */ React.createElement("div", { key: iv._id, className: "p-4 rounded-xl bg-slate-50/80 border border-slate-200 flex flex-wrap items-center justify-between gap-4 shadow-sm hover:border-slate-300 transition" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2.5" }, /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-slate-900 text-sm" }, iv.candidateName), /* @__PURE__ */ React.createElement("span", { className: "px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-semibold" }, iv.type)), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 mt-1" }, iv.jobTitle, " \u2022 Panel: ", iv.interviewerName), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 text-xs text-slate-700 mt-2 font-mono" }, /* @__PURE__ */ React.createElement("span", { className: "text-indigo-600" }, /* @__PURE__ */ React.createElement("i", { className: "fa-regular fa-calendar mr-1" }), iv.scheduledDate), /* @__PURE__ */ React.createElement("span", null, "\u2022"), /* @__PURE__ */ React.createElement("span", { className: "text-indigo-600" }, /* @__PURE__ */ React.createElement("i", { className: "fa-regular fa-clock mr-1" }), iv.timeSlot))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setActiveInterviewRoom(iv),
      className: "px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5",
      title: "Launch in-app video room with candidate resume & live AI scorecard"
    },
    /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-video text-xs" }),
    " In-App Room"
  ), /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "https://meet.google.com/new",
      target: "_blank",
      rel: "noopener noreferrer",
      className: "px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-700 text-xs font-semibold transition flex items-center gap-1.5 shadow-2xs",
      title: "Opens a real instant Google Meet video call in a new tab"
    },
    /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-arrow-up-right-from-square text-xs" }),
    " Google Meet (Live)"
  ))))), /* @__PURE__ */ React.createElement("div", { className: "mt-4 p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-[11px] text-indigo-900 flex items-center gap-2" }, /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-info-circle text-indigo-600" }), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("strong", null, "Pro Tip for Recruiters:"), ' "In-App Room" launches the live video assessment console with candidate scorecards, while "Google Meet (Live)" opens an instant live meeting directly on Google Meet.'))))), activeTab === "tester" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6 animate-fade-in" }, /* @__PURE__ */ React.createElement("div", { className: "p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-indigo-600 uppercase tracking-wider" }, "Semantic Simulation Sandbox"), /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-extrabold text-slate-900" }, "Live Resume Match Test Bench"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 mt-0.5" }, "Paste or edit any resume text to compute match scores, extract skills & generate AI questions")), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setSandboxResume(
        `ALEX RIVERA | alex.rivera@techmail.com | (555) 019-2834
Staff Full-Stack Software Engineer with 6 years experience.
SKILLS: React, Node.js, Express, MongoDB, TypeScript, Docker, AWS, Microservices.
EXPERIENCE:
- CloudScale Inc (2022-Present): Architected Node.js/MongoDB microservices handling 12M daily requests.
- DataLab (2019-2022): Built full-stack React dashboards with real-time WebSockets.`
      ),
      className: "px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-xs text-slate-700 border border-slate-300 shadow-sm transition"
    },
    "Load MERN Sample"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setSandboxResume(
        `DR. ELENA VANCE | elena@ai-eng.io | (555) 948-2311
Lead AI & Machine Learning Scientist with 6 years experience.
SKILLS: Python, Machine Learning, PyTorch, Docker, PostgreSQL, NLP, Kubernetes, AWS.
EXPERIENCE:
- Cognitive Labs (2021-Present): Built transformer embedding pipelines with 94% precision.
- Vector Systems (2018-2021): Scaled GPU inference microservices with FastAPI & Docker.`
      ),
      className: "px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-xs text-slate-700 border border-slate-300 shadow-sm transition"
    },
    "Load AI/ML Sample"
  ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4" }, /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-slate-900 text-base flex items-center gap-2" }, /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-file-lines text-indigo-600" }), " Candidate Resume Text"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      rows: 12,
      value: sandboxResume,
      onChange: (e) => setSandboxResume(e.target.value),
      className: "w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 font-mono text-xs leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
    }
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: runSandboxScreening,
      disabled: isScreening,
      className: "w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-2"
    },
    isScreening ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-spinner fa-spin" }), " Extracting Entities & Scoring...") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-wand-magic-sparkles" }), " Run AI Semantic Screening")
  )), /* @__PURE__ */ React.createElement("div", { className: "p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-slate-900 text-base mb-4 flex items-center gap-2" }, /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-square-poll-vertical text-emerald-600" }), " Live AI Evaluation Dossier"), sandboxResult ? /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-500 font-semibold" }, "Overall Match Score"), /* @__PURE__ */ React.createElement("h4", { className: "text-3xl font-extrabold text-slate-900 mt-0.5" }, sandboxResult.score, "%")), /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("span", { className: "px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold" }, "Candidate Shortlisted"), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-500 block mt-1" }, "Detected Exp: ", sandboxResult.detectedExp, " yrs"))), /* @__PURE__ */ React.createElement("div", { className: "space-y-2 text-xs" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-slate-600 font-semibold block mb-1" }, "Matched Skills:"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-1.5" }, sandboxResult.matched.map((s, i) => /* @__PURE__ */ React.createElement("span", { key: i, className: "px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[11px]" }, "&check; ", s)))), sandboxResult.missing.length > 0 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-slate-600 font-semibold block mb-1" }, "Missing / Gap Skills:"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-1.5" }, sandboxResult.missing.map((s, i) => /* @__PURE__ */ React.createElement("span", { key: i, className: "px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 font-mono text-[11px]" }, "\xD7 ", s))))), /* @__PURE__ */ React.createElement("div", { className: "p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-slate-700" }, /* @__PURE__ */ React.createElement("span", { className: "text-indigo-700 font-bold block mb-1" }, "AI Contextual Assessment:"), sandboxResult.rationale), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-slate-500 text-xs font-bold uppercase tracking-wider block mb-2" }, "Custom AI Interview Questions:"), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, sandboxResult.questions.map((q, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700" }, i + 1, ". ", q))))) : /* @__PURE__ */ React.createElement("div", { className: "h-80 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-6 text-slate-400" }, /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-microchip text-4xl mb-3 text-slate-300" }), /* @__PURE__ */ React.createElement("p", { className: "text-sm font-semibold text-slate-600" }, "Ready to Evaluate"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-400 mt-1 max-w-xs" }, 'Click "Run AI Semantic Screening" to test entity extraction and score ranking.')))))), activeTab === "database" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6 animate-fade-in" }, /* @__PURE__ */ React.createElement("div", { className: "p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-indigo-600 uppercase tracking-wider" }, "Relational Database Engine"), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200" }, "PostgreSQL \u2022 SQLite Active")), /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-extrabold text-slate-900 mt-1" }, "SQL Relational Database Explorer"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 mt-0.5" }, "3NF normalized relational data storing all applicant records, requisitions, interview schedules & scorecards")), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center gap-2" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        const blob = new Blob([RAW_SEED_SQL], { type: "text/sql" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "seed.sql";
        a.click();
        URL.revokeObjectURL(url);
        showToast("seed.sql downloaded!");
      },
      className: "px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
    },
    /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-database text-purple-600" }),
    " Download seed.sql"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        navigator.clipboard.writeText(RAW_SEED_SQL);
        setSqlCopyStatus(true);
        setTimeout(() => setSqlCopyStatus(false), 3e3);
        showToast("SQL insert dump copied to clipboard!");
      },
      className: "px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
    },
    /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-copy" }),
    " ",
    sqlCopyStatus ? "Copied!" : "Copy SQL Dump"
  ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-semibold text-slate-500 uppercase tracking-wider" }, "jobs Table"), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-extrabold text-slate-900 mt-1" }, jobs.length, " Rows"), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-indigo-600 font-semibold mt-1" }, "Requisitions indexed")), /* @__PURE__ */ React.createElement("div", { className: "p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-semibold text-slate-500 uppercase tracking-wider" }, "candidates Table"), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-extrabold text-slate-900 mt-1" }, candidates.length, " Rows"), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-emerald-600 font-semibold mt-1" }, "AI-scored applicant profiles")), /* @__PURE__ */ React.createElement("div", { className: "p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-semibold text-slate-500 uppercase tracking-wider" }, "interviews Table"), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-extrabold text-slate-900 mt-1" }, interviews.length, " Rows"), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-purple-600 font-semibold mt-1" }, "Confirmed video meetings")), /* @__PURE__ */ React.createElement("div", { className: "p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-semibold text-slate-500 uppercase tracking-wider" }, "interview_scorecards"), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-extrabold text-slate-900 mt-1" }, "1 Row"), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-amber-600 font-semibold mt-1" }, "In-app assessment rubrics"))), /* @__PURE__ */ React.createElement("div", { className: "p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center justify-between pb-3 border-b border-slate-200 gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/80" }, [
    { id: "candidates", label: "candidates" },
    { id: "jobs", label: "jobs" },
    { id: "interviews", label: "interviews" },
    { id: "scorecards", label: "interview_scorecards" }
  ].map((t) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: t.id,
      onClick: () => setSqlTable(t.id),
      className: `px-3 py-1.5 rounded-lg text-xs font-semibold transition ${sqlTable === t.id ? "bg-white text-indigo-600 shadow-sm font-bold" : "text-slate-600 hover:text-slate-900"}`
    },
    t.label
  ))), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-500 font-mono" }, "Dialect: PostgreSQL / MySQL / SQLite Compatible")), sqlTable === "candidates" && /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full text-left text-xs border-collapse" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { className: "bg-slate-50 text-slate-700 font-bold border-b border-slate-200" }, /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "id (PK)"), /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "name"), /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "email"), /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "current_title"), /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "experience"), /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "ai_score"), /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "stage"), /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "job_id (FK)"))), /* @__PURE__ */ React.createElement("tbody", { className: "divide-y divide-slate-100" }, candidates.map((c) => /* @__PURE__ */ React.createElement("tr", { key: c._id, className: "hover:bg-slate-50/60" }, /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 font-mono text-indigo-600" }, c._id), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 font-semibold text-slate-900" }, c.name), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 text-slate-600" }, c.email), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 text-slate-600" }, c.currentTitle), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 text-slate-600" }, c.experienceYears, " yrs"), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 font-bold text-emerald-600" }, c.aiScore, "%"), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3" }, /* @__PURE__ */ React.createElement("span", { className: "px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-semibold border border-indigo-200" }, c.stage)), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 font-mono text-slate-500" }, c.jobId || "job_101")))))), sqlTable === "jobs" && /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full text-left text-xs border-collapse" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { className: "bg-slate-50 text-slate-700 font-bold border-b border-slate-200" }, /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "id (PK)"), /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "title"), /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "department"), /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "location"), /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "salary"), /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "min_exp"), /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "required_skills"))), /* @__PURE__ */ React.createElement("tbody", { className: "divide-y divide-slate-100" }, jobs.map((j) => /* @__PURE__ */ React.createElement("tr", { key: j._id, className: "hover:bg-slate-50/60" }, /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 font-mono text-indigo-600" }, j._id), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 font-semibold text-slate-900" }, j.title), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 text-slate-600" }, j.department), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 text-slate-600" }, j.location), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 font-semibold text-slate-800" }, j.salary), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 text-slate-600" }, j.minExperienceYears, " yrs"), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 font-mono text-[11px] text-indigo-600" }, j.requiredSkills.join(", "))))))), sqlTable === "interviews" && /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full text-left text-xs border-collapse" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { className: "bg-slate-50 text-slate-700 font-bold border-b border-slate-200" }, /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "id (PK)"), /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "candidate_name"), /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "job_title"), /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "interviewer"), /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "scheduled_date"), /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "time_slot"), /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "type"), /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "status"))), /* @__PURE__ */ React.createElement("tbody", { className: "divide-y divide-slate-100" }, interviews.map((i) => /* @__PURE__ */ React.createElement("tr", { key: i._id, className: "hover:bg-slate-50/60" }, /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 font-mono text-indigo-600" }, i._id), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 font-semibold text-slate-900" }, i.candidateName), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 text-slate-600" }, i.jobTitle), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 text-slate-600" }, i.interviewerName), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 font-mono text-indigo-600" }, i.scheduledDate), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 text-slate-600" }, i.timeSlot), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 text-slate-600" }, i.type), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3" }, /* @__PURE__ */ React.createElement("span", { className: "px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200" }, i.status || "Confirmed"))))))), sqlTable === "scorecards" && /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full text-left text-xs border-collapse" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { className: "bg-slate-50 text-slate-700 font-bold border-b border-slate-200" }, /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "id (PK)"), /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "interview_id (FK)"), /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "candidate_id (FK)"), /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "interviewer"), /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "technical"), /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "problem_solving"), /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "culture_fit"), /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "recommendation"), /* @__PURE__ */ React.createElement("th", { className: "py-2.5 px-3" }, "notes"))), /* @__PURE__ */ React.createElement("tbody", { className: "divide-y divide-slate-100" }, /* @__PURE__ */ React.createElement("tr", { className: "hover:bg-slate-50/60" }, /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 font-mono text-indigo-600" }, "sc_01"), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 font-mono text-slate-500" }, "iv_01"), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 font-mono text-slate-500" }, "cand_01"), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 text-slate-600" }, "Alex Rivera (Tech Lead)"), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 font-bold text-emerald-600" }, "5 / 5"), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 font-bold text-emerald-600" }, "5 / 5"), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 font-bold text-indigo-600" }, "4 / 5"), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3" }, /* @__PURE__ */ React.createElement("span", { className: "px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200" }, "Strong Hire")), /* @__PURE__ */ React.createElement("td", { className: "py-2.5 px-3 text-slate-600" }, "Superb understanding of event loops, distributed caching, and state management.")))))))), showHelpGuide && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto animate-fade-in text-slate-800" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between pb-3 border-b border-slate-100" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-xl" }, /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-compass" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-bold text-slate-900" }, "Complete Recruiter Guidance & Tour"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500" }, "How to use TalentAI to accelerate hiring from days to hours"))), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowHelpGuide(false),
      className: "w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-800 flex items-center justify-center text-base transition"
    },
    "\xD7"
  )), /* @__PURE__ */ React.createElement("div", { className: "space-y-4 text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold flex items-center justify-center shrink-0 mt-0.5" }, "1"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-slate-900 text-sm" }, "Step 1: Set Up or Select Job Requisitions"), /* @__PURE__ */ React.createElement("p", { className: "text-slate-600 mt-1 leading-relaxed" }, "In the ", /* @__PURE__ */ React.createElement("strong", null, "AI Screening"), " tab, select your target role (e.g. Senior MERN Engineer) or click ", /* @__PURE__ */ React.createElement("strong", null, '"+ Post New Job"'), ". The AI instantly loads the required technology stack, minimum experience threshold, and salary benchmark."))), /* @__PURE__ */ React.createElement("div", { className: "p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-7 h-7 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 font-bold flex items-center justify-center shrink-0 mt-0.5" }, "2"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-slate-900 text-sm" }, "Step 2: Review AI Candidate Rankings & Scores"), /* @__PURE__ */ React.createElement("p", { className: "text-slate-600 mt-1 leading-relaxed" }, "Candidates are automatically scored from 0% to 100% using a weighted algorithm: ", /* @__PURE__ */ React.createElement("strong", null, "45% Skills Fit + 30% Experience Seniority + 15% Domain Relevance + 10% Credentials"), ". Use the search bar to filter by skill or minimum score (\u226590%)."))), /* @__PURE__ */ React.createElement("div", { className: "p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-7 h-7 rounded-lg bg-pink-50 border border-pink-200 text-pink-700 font-bold flex items-center justify-center shrink-0 mt-0.5" }, "3"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-slate-900 text-sm" }, "Step 3: Inspect Candidate Dossier & Cheat-Sheet"), /* @__PURE__ */ React.createElement("p", { className: "text-slate-600 mt-1 leading-relaxed" }, "Click ", /* @__PURE__ */ React.createElement("strong", null, '"Dossier"'), " on any candidate. The AI reveals exact matched skills, missing prerequisite gaps, career tenure, and generates custom tailored technical interview questions to ask during the call!"))), /* @__PURE__ */ React.createElement("div", { className: "p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold flex items-center justify-center shrink-0 mt-0.5" }, "4"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-slate-900 text-sm" }, "Step 4: Smart Scheduling & Live Interview Room"), /* @__PURE__ */ React.createElement("p", { className: "text-slate-600 mt-1 leading-relaxed" }, "Click ", /* @__PURE__ */ React.createElement("strong", null, '"Schedule"'), " to dispatch calendar bookings. For the interview, click ", /* @__PURE__ */ React.createElement("strong", null, '"In-App Room"'), " to run a live session with integrated candidate resume notes and scorecard ratings, or click ", /* @__PURE__ */ React.createElement("strong", null, '"Google Meet (Live)"'), " to launch a real instant Google Meet video call."))), /* @__PURE__ */ React.createElement("div", { className: "p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 font-bold flex items-center justify-center shrink-0 mt-0.5" }, "5"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-slate-900 text-sm" }, "Step 5: Visual ATS Pipeline (Kanban)"), /* @__PURE__ */ React.createElement("p", { className: "text-slate-600 mt-1 leading-relaxed" }, "Track applicants visually across 6 stages (*Applied \u2192 AI Screened \u2192 Interview Scheduled \u2192 Technical Evaluation \u2192 Offer \u2192 Hired*). Click ", /* @__PURE__ */ React.createElement("strong", null, '"Advance \u2192"'), " to progress top candidates seamlessly.")))), /* @__PURE__ */ React.createElement("div", { className: "flex justify-end pt-2" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowHelpGuide(false),
      className: "px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition"
    },
    "Got it, Let's Start Hiring!"
  )))), activeInterviewRoom && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 space-y-5 animate-fade-in text-slate-800" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between pb-3 border-b border-slate-100" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("span", { className: "w-3 h-3 rounded-full bg-emerald-500 animate-ping" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "text-base font-bold text-slate-900" }, "Live Interview Room: ", activeInterviewRoom.candidateName), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500" }, activeInterviewRoom.jobTitle, " \u2022 ", activeInterviewRoom.type))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "https://meet.google.com/new",
      target: "_blank",
      rel: "noopener noreferrer",
      className: "px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-700 text-xs font-semibold flex items-center gap-1.5 transition shadow-2xs"
    },
    /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-arrow-up-right-from-square text-xs" }),
    " Open Google Meet (New Tab)"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setActiveInterviewRoom(null),
      className: "w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition"
    },
    "\xD7"
  ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-5" }, /* @__PURE__ */ React.createElement("div", { className: "bg-slate-900 rounded-2xl border border-slate-800 p-4 flex flex-col justify-between min-h-[300px]" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-xs text-slate-400" }, /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1.5 text-emerald-400 font-semibold" }, /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-circle text-[8px]" }), " Candidate Video Connected"), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-slate-500" }, "HD 1080p \u2022 00:14:28")), /* @__PURE__ */ React.createElement("div", { className: "my-auto flex flex-col items-center justify-center text-center space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-xl shadow-indigo-500/20" }, activeInterviewRoom.candidateName.split(" ").map((n) => n[0]).join("")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-white text-sm" }, activeInterviewRoom.candidateName), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-400" }, "Candidate Audio Active (Microphone on)"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center gap-3 pt-3 border-t border-slate-800/80" }, /* @__PURE__ */ React.createElement("button", { className: "w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center text-xs" }, /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-microphone" })), /* @__PURE__ */ React.createElement("button", { className: "w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center text-xs" }, /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-video" })), /* @__PURE__ */ React.createElement("button", { className: "w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center text-xs" }, /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-display" })), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        showToast(`Interview notes saved and candidate advanced!`);
        setActiveInterviewRoom(null);
      },
      className: "px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5"
    },
    /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-phone-slash" }),
    " Complete & End"
  ))), /* @__PURE__ */ React.createElement("div", { className: "bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-4 text-xs" }, /* @__PURE__ */ React.createElement("h4", { className: "font-bold text-slate-900 text-sm flex items-center gap-2" }, /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-clipboard-check text-indigo-600" }), " Recruiter Live Scorecard"), /* @__PURE__ */ React.createElement("div", { className: "space-y-2.5" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-slate-700 font-medium" }, "Technical Architecture:"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-1 text-amber-400" }, /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-star" }), /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-star" }), /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-star" }), /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-star" }), /* @__PURE__ */ React.createElement("i", { className: "fa-regular fa-star text-slate-300" }))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-slate-700 font-medium" }, "Problem Solving & Speed:"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-1 text-amber-400" }, /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-star" }), /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-star" }), /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-star" }), /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-star" }), /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-star" }))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-slate-700 font-medium" }, "Communication & Culture:"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-1 text-amber-400" }, /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-star" }), /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-star" }), /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-star" }), /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-star" }), /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-star" })))), /* @__PURE__ */ React.createElement("div", { className: "p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-[11px] text-slate-700" }, /* @__PURE__ */ React.createElement("strong", { className: "text-indigo-700 block mb-1" }, "AI Prompt for Interviewer:"), '"Ask the candidate how they handle schema migrations and caching invalidation in MongoDB under high-traffic microservices."'), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-slate-600 font-semibold block mb-1" }, "Interviewer Private Notes"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      rows: 3,
      defaultValue: "Strong candidate with deep grasp of distributed microservices. Expressed clear motivation for our mission. Recommend fast-tracking to final team match.",
      className: "w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex justify-end gap-2 pt-1" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        showToast("Interview scorecard submitted successfully!");
        setActiveInterviewRoom(null);
      },
      className: "w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition"
    },
    "Submit Evaluation Scorecard"
  )))))), selectedCandidate && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 space-y-5 animate-fade-in max-h-[90vh] overflow-y-auto text-slate-800" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between pb-3 border-b border-slate-100" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-indigo-600 uppercase tracking-wider" }, "Candidate Dossier & AI Analysis"), /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-bold text-slate-900 mt-0.5" }, selectedCandidate.name), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500" }, selectedCandidate.currentTitle, " \u2022 ", selectedCandidate.email, " \u2022 ", selectedCandidate.phone)), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setSelectedCandidate(null),
      className: "w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center text-sm transition"
    },
    "\xD7"
  )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-4 gap-2.5 text-center" }, /* @__PURE__ */ React.createElement("div", { className: "p-3 rounded-xl bg-slate-50 border border-slate-200" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-500 block mb-1" }, "Overall Match"), /* @__PURE__ */ React.createElement("span", { className: "text-xl font-extrabold text-emerald-600" }, selectedCandidate.aiScore, "%")), /* @__PURE__ */ React.createElement("div", { className: "p-3 rounded-xl bg-slate-50 border border-slate-200" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-500 block mb-1" }, "Skills Overlap"), /* @__PURE__ */ React.createElement("span", { className: "text-xl font-extrabold text-indigo-600" }, selectedCandidate.scoreBreakdown?.skills || 92, "%")), /* @__PURE__ */ React.createElement("div", { className: "p-3 rounded-xl bg-slate-50 border border-slate-200" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-500 block mb-1" }, "Seniority Match"), /* @__PURE__ */ React.createElement("span", { className: "text-xl font-extrabold text-purple-600" }, selectedCandidate.scoreBreakdown?.experience || 90, "%")), /* @__PURE__ */ React.createElement("div", { className: "p-3 rounded-xl bg-slate-50 border border-slate-200" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-500 block mb-1" }, "Domain Fit"), /* @__PURE__ */ React.createElement("span", { className: "text-xl font-extrabold text-pink-600" }, selectedCandidate.scoreBreakdown?.domain || 88, "%"))), /* @__PURE__ */ React.createElement("div", { className: "p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-slate-700" }, /* @__PURE__ */ React.createElement("strong", { className: "text-indigo-700 block mb-1" }, "\u2022 AI Contextual Evaluation:"), selectedCandidate.rationale), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { className: "text-xs font-bold text-slate-700 uppercase tracking-wider mb-2" }, "Custom AI Interview Questions (Probing Depth & Gaps):"), /* @__PURE__ */ React.createElement("ul", { className: "space-y-2 text-xs text-slate-700" }, /* @__PURE__ */ React.createElement("li", { className: "p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-indigo-600 font-bold" }, "1."), /* @__PURE__ */ React.createElement("span", null, "How have you resolved high latency and indexing bottlenecks in MongoDB production collections under heavy load?")), /* @__PURE__ */ React.createElement("li", { className: "p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-indigo-600 font-bold" }, "2."), /* @__PURE__ */ React.createElement("span", null, "Can you explain your containerization and zero-downtime deployment strategy with Docker and CI/CD pipelines?")))), /* @__PURE__ */ React.createElement("div", { className: "flex justify-end gap-3 pt-2" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setSelectedCandidate(null),
      className: "px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition"
    },
    "Close"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        const cand = selectedCandidate;
        setSelectedCandidate(null);
        setInterviewForm({
          ...interviewForm,
          candidateName: cand.name,
          candidateEmail: cand.email,
          jobTitle: activeJob.title
        });
        setActiveTab("scheduler");
      },
      className: "px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition"
    },
    "Proceed to Schedule Interview"
  )))), showNewJobModal && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 space-y-4 animate-fade-in text-slate-800" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between pb-2 border-b border-slate-100" }, /* @__PURE__ */ React.createElement("h3", { className: "text-base font-bold text-slate-900 flex items-center gap-2" }, /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-briefcase text-indigo-600" }), " Post New Job Requisition"), /* @__PURE__ */ React.createElement("button", { onClick: () => setShowNewJobModal(false), className: "text-slate-400 hover:text-slate-700 text-lg" }, "\xD7")), /* @__PURE__ */ React.createElement("form", { onSubmit: handleCreateJob, className: "space-y-3 text-xs" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-slate-600 font-semibold block mb-1" }, "Job Title"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      required: true,
      placeholder: "e.g. Senior DevOps / Cloud Architect",
      value: newJobForm.title,
      onChange: (e) => setNewJobForm({ ...newJobForm, title: e.target.value }),
      className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-slate-600 font-semibold block mb-1" }, "Department"), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: newJobForm.department,
      onChange: (e) => setNewJobForm({ ...newJobForm, department: e.target.value }),
      className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none"
    },
    /* @__PURE__ */ React.createElement("option", { value: "Engineering" }, "Engineering"),
    /* @__PURE__ */ React.createElement("option", { value: "Data & AI" }, "Data & AI"),
    /* @__PURE__ */ React.createElement("option", { value: "Product" }, "Product"),
    /* @__PURE__ */ React.createElement("option", { value: "Design" }, "Design")
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-slate-600 font-semibold block mb-1" }, "Min Experience"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      value: newJobForm.minExperienceYears,
      onChange: (e) => setNewJobForm({ ...newJobForm, minExperienceYears: e.target.value }),
      className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none"
    }
  ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-slate-600 font-semibold block mb-1" }, "Required Skills (Comma separated)"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      required: true,
      placeholder: "e.g. docker, kubernetes, terraform, aws, python",
      value: newJobForm.requiredSkills,
      onChange: (e) => setNewJobForm({ ...newJobForm, requiredSkills: e.target.value }),
      className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-slate-600 font-semibold block mb-1" }, "Location"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: newJobForm.location,
      onChange: (e) => setNewJobForm({ ...newJobForm, location: e.target.value }),
      className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-slate-600 font-semibold block mb-1" }, "Salary Range"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: newJobForm.salary,
      onChange: (e) => setNewJobForm({ ...newJobForm, salary: e.target.value }),
      className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none"
    }
  ))), /* @__PURE__ */ React.createElement("div", { className: "flex justify-end gap-2 pt-2" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => setShowNewJobModal(false),
      className: "px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition"
    },
    "Cancel"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "submit",
      className: "px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition"
    },
    "Publish Requisition"
  ))))), showNewCandidateModal && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 space-y-4 animate-fade-in text-slate-800" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between pb-2 border-b border-slate-100" }, /* @__PURE__ */ React.createElement("h3", { className: "text-base font-bold text-slate-900 flex items-center gap-2" }, /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-user-plus text-indigo-600" }), " Add Candidate to Pipeline"), /* @__PURE__ */ React.createElement("button", { onClick: () => setShowNewCandidateModal(false), className: "text-slate-400 hover:text-slate-700 text-lg" }, "\xD7")), /* @__PURE__ */ React.createElement("form", { onSubmit: handleCreateCandidate, className: "space-y-3 text-xs" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-slate-600 font-semibold block mb-1" }, "Full Name"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      required: true,
      placeholder: "e.g. Jason Thorne",
      value: newCandForm.name,
      onChange: (e) => setNewCandForm({ ...newCandForm, name: e.target.value }),
      className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-slate-600 font-semibold block mb-1" }, "Email"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "email",
      required: true,
      placeholder: "jason@example.com",
      value: newCandForm.email,
      onChange: (e) => setNewCandForm({ ...newCandForm, email: e.target.value }),
      className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-slate-600 font-semibold block mb-1" }, "Years of Exp"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      value: newCandForm.experienceYears,
      onChange: (e) => setNewCandForm({ ...newCandForm, experienceYears: e.target.value }),
      className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none"
    }
  ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-slate-600 font-semibold block mb-1" }, "Current Job Title"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "e.g. Full-Stack Engineer",
      value: newCandForm.currentTitle,
      onChange: (e) => setNewCandForm({ ...newCandForm, currentTitle: e.target.value }),
      className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-slate-600 font-semibold block mb-1" }, "Target Requisition"), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: newCandForm.jobId,
      onChange: (e) => setNewCandForm({ ...newCandForm, jobId: e.target.value }),
      className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none"
    },
    jobs.map((j) => /* @__PURE__ */ React.createElement("option", { key: j._id, value: j._id }, j.title))
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-slate-600 font-semibold block mb-1" }, "Extracted / Verified Skills (Comma separated)"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "e.g. react, node.js, mongodb, typescript, docker",
      value: newCandForm.skills,
      onChange: (e) => setNewCandForm({ ...newCandForm, skills: e.target.value }),
      className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex justify-end gap-2 pt-2" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => setShowNewCandidateModal(false),
      className: "px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition"
    },
    "Cancel"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "submit",
      className: "px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition"
    },
    "Add & Evaluate Candidate"
  ))))), /* @__PURE__ */ React.createElement("footer", { className: "border-t border-slate-200 bg-white px-6 py-4 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2 shadow-2xs" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("img", { src: "college_crest_square.png", alt: "Easwari Crest", className: "w-5 h-5 object-contain" }), /* @__PURE__ */ React.createElement("span", { className: "font-semibold text-slate-700" }, "TalentAI"), /* @__PURE__ */ React.createElement("span", null, "\u2022"), /* @__PURE__ */ React.createElement("span", null, "Easwari Engineering College"), /* @__PURE__ */ React.createElement("span", null, "\u2022"), /* @__PURE__ */ React.createElement("span", null, "Full-Stack Architecture \u2022 React \u2022 Node.js \u2022 Express \u2022 Relational SQL Database")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4 text-slate-500" }, /* @__PURE__ */ React.createElement("button", { onClick: () => setShowHelpGuide(true), className: "hover:text-indigo-600 transition flex items-center gap-1 font-medium" }, /* @__PURE__ */ React.createElement("i", { className: "fa-solid fa-compass" }), " Recruiter Guide"), /* @__PURE__ */ React.createElement("span", null, "\u2022"), /* @__PURE__ */ React.createElement("span", null, "High-Velocity Talent Acquisition"))));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
