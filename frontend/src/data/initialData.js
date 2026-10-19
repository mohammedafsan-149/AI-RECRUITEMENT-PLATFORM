// TalentAI Initial Enterprise Mock Datasets
// Provides instant offline resilience and initial state for React frontend

export const INITIAL_JOBS = [
  {
    _id: 'job_101',
    id: 'job_101',
    title: 'Senior Full-Stack Engineer (MERN)',
    department: 'Engineering',
    location: 'Remote / Global',
    type: 'Full-Time',
    requiredSkills: ['react', 'node.js', 'mongodb', 'typescript', 'docker'],
    preferredSkills: ['aws', 'redis', 'graphql'],
    minExperienceYears: 5,
    openings: 2,
    salary: '$140k - $175k',
    salary_range: '$135k - $165k',
    status: 'Open'
  },
  {
    _id: 'job_102',
    id: 'job_102',
    title: 'AI / Machine Learning Engineer',
    department: 'Data & AI',
    location: 'San Francisco / Hybrid',
    type: 'Full-Time',
    requiredSkills: ['python', 'machine learning', 'docker', 'postgresql'],
    preferredSkills: ['pytorch', 'huggingface', 'aws'],
    minExperienceYears: 4,
    openings: 1,
    salary: '$160k - $210k',
    salary_range: '$160k - $210k',
    status: 'Open'
  },
  {
    _id: 'job_103',
    id: 'job_103',
    title: 'Technical Product Manager (Platform)',
    department: 'Product',
    location: 'New York / Hybrid',
    type: 'Full-Time',
    requiredSkills: ['agile', 'scrum', 'system design', 'apis'],
    preferredSkills: ['jira', 'sql', 'analytics'],
    minExperienceYears: 4,
    openings: 1,
    salary: '$140k - $175k',
    salary_range: '$140k - $175k',
    status: 'Open'
  }
];

export const INITIAL_CANDIDATES = [
  {
    _id: 'cand_01',
    id: 'cand_01',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    phone: '(555) 234-8901',
    currentTitle: 'Senior Full-Stack Developer',
    experienceYears: 6,
    appliedJobId: 'job_101',
    job_id: 'job_101',
    aiScore: 94,
    stage: 'AI Screened',
    extractedSkills: [
      { name: 'react', level: 'Expert', isRequirement: true },
      { name: 'node.js', level: 'Expert', isRequirement: true },
      { name: 'mongodb', level: 'Advanced', isRequirement: true },
      { name: 'typescript', level: 'Advanced', isRequirement: true },
      { name: 'docker', level: 'Intermediate', isRequirement: true }
    ],
    aiRationale: 'Exceptional candidate with 6 years hands-on experience in MERN stack microservices, distributed caching, and React state architecture. Fully satisfies all 5 core stack criteria.'
  },
  {
    _id: 'cand_02',
    id: 'cand_02',
    name: 'Marcus Vance',
    email: 'm.vance@example.com',
    phone: '(555) 781-4432',
    currentTitle: 'Full-Stack Software Engineer',
    experienceYears: 4,
    appliedJobId: 'job_101',
    job_id: 'job_101',
    aiScore: 86,
    stage: 'Interview Scheduled',
    extractedSkills: [
      { name: 'react', level: 'Advanced', isRequirement: true },
      { name: 'node.js', level: 'Intermediate', isRequirement: true },
      { name: 'mongodb', level: 'Intermediate', isRequirement: true },
      { name: 'postgresql', level: 'Advanced', isRequirement: false }
    ],
    aiRationale: 'Strong full-stack foundations with solid PostgreSQL and React experience. Slight gap in container orchestration (Docker), but highly capable of ramping up quickly.'
  },
  {
    _id: 'cand_03',
    id: 'cand_03',
    name: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    phone: '(555) 912-3341',
    currentTitle: 'Lead AI Engineer',
    experienceYears: 7,
    appliedJobId: 'job_102',
    job_id: 'job_102',
    aiScore: 96,
    stage: 'Technical Evaluation',
    extractedSkills: [
      { name: 'python', level: 'Expert', isRequirement: true },
      { name: 'machine learning', level: 'Expert', isRequirement: true },
      { name: 'docker', level: 'Advanced', isRequirement: true },
      { name: 'postgresql', level: 'Advanced', isRequirement: true },
      { name: 'aws', level: 'Advanced', isRequirement: false }
    ],
    aiRationale: 'Outstanding deep-learning specialist with production experience deploying transformer models and GPU inference clusters. Perfect alignment with requisition criteria.'
  },
  {
    _id: 'cand_04',
    id: 'cand_04',
    name: 'David Kim',
    email: 'david.k@example.com',
    phone: '(555) 441-2983',
    currentTitle: 'Junior Frontend Engineer',
    experienceYears: 2,
    appliedJobId: 'job_101',
    job_id: 'job_101',
    aiScore: 62,
    stage: 'Applied',
    extractedSkills: [
      { name: 'react', level: 'Intermediate', isRequirement: true },
      { name: 'typescript', level: 'Beginner', isRequirement: true }
    ],
    aiRationale: 'Demonstrates clear potential in client-side React UI development, but lacks the 5+ years seniority requirement and backend Node.js / MongoDB database experience.'
  },
  {
    _id: 'cand_05',
    id: 'cand_05',
    name: 'Amina Al-Mansoor',
    email: 'amina.m@example.com',
    phone: '(555) 602-1194',
    currentTitle: 'Senior Product Manager',
    experienceYears: 6,
    appliedJobId: 'job_103',
    job_id: 'job_103',
    aiScore: 92,
    stage: 'Offer',
    extractedSkills: [
      { name: 'agile', level: 'Expert', isRequirement: true },
      { name: 'scrum', level: 'Expert', isRequirement: true },
      { name: 'system design', level: 'Advanced', isRequirement: true }
    ],
    aiRationale: 'Proven product leader who has spearheaded multiple platform API initiatives and developer tools from concept to general availability.'
  },
  {
    _id: 'cand_06',
    id: 'cand_06',
    name: 'Alex Rivera',
    email: 'alex.rivera@techmail.com',
    phone: '(555) 019-2834',
    currentTitle: 'Staff Full-Stack Software Engineer',
    experienceYears: 6,
    appliedJobId: 'job_101',
    job_id: 'job_101',
    aiScore: 94,
    stage: 'Applied',
    extractedSkills: [
      { name: 'react', level: 'Expert', isRequirement: true },
      { name: 'node.js', level: 'Expert', isRequirement: true },
      { name: 'mongodb', level: 'Advanced', isRequirement: true },
      { name: 'typescript', level: 'Advanced', isRequirement: true },
      { name: 'docker', level: 'Advanced', isRequirement: true }
    ],
    aiRationale: 'Top-tier senior engineer with 6 years experience architecting high-scale distributed Node.js/MongoDB microservices (15M daily requests) and modern React 18 dashboards.'
  }
];

export const INITIAL_INTERVIEWS = [
  {
    _id: 'iv_01',
    id: 'iv_01',
    candidateName: 'Sarah Chen',
    candidateEmail: 'sarah.chen@example.com',
    jobTitle: 'Senior Full-Stack Engineer (MERN)',
    interviewerName: 'Alex Rivera (Tech Lead)',
    scheduledDate: '2026-10-24',
    timeSlot: '10:00 AM - 10:45 AM',
    type: 'Technical System Design',
    meetingLink: 'https://meet.google.com/new',
    status: 'Confirmed'
  },
  {
    _id: 'iv_02',
    id: 'iv_02',
    candidateName: 'Elena Rostova',
    candidateEmail: 'elena.rostova@example.com',
    jobTitle: 'Lead AI & Machine Learning Scientist',
    interviewerName: 'Dr. Marcus Vance (VP AI)',
    scheduledDate: '2026-10-25',
    timeSlot: '02:30 PM - 03:15 PM',
    type: 'Architecture Deep-Dive',
    meetingLink: 'https://meet.google.com/new',
    status: 'Confirmed'
  },
  {
    _id: 'iv_03',
    id: 'iv_03',
    candidateName: 'Amina Al-Mansoor',
    candidateEmail: 'amina.m@example.com',
    jobTitle: 'Technical Product Manager (Platform)',
    interviewerName: 'Elena Rostova (Staff PM)',
    scheduledDate: '2026-10-26',
    timeSlot: '11:00 AM - 11:45 AM',
    type: 'Leadership & Culture Fit',
    meetingLink: 'https://meet.google.com/new',
    status: 'Confirmed'
  }
];
