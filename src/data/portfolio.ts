export const profile = {
  name: "Prasad Vitthal Neje",
  shortName: "Prasad Neje",
  roles: ["AI Engineer", "ML Engineer", "GenAI Developer"],
  tagline: "I build intelligent systems that turn data into decisions.",
  summary:
    "B.Tech CSE (Artificial Intelligence) student at Vishwakarma Institute of Technology, Pune. I work across machine learning, LLM-powered applications and full-stack engineering — designing microservice architectures, training predictive models and shipping AI products end to end.",
  location: "Pune, Maharashtra, India",
  email: "prasadvitthalneje26@gmail.com",
  collegeEmail: "prasad.neje@vit.edu",
  phone: "+91 77986 36226",
  github: "https://github.com/prasadneje26",
  githubUser: "prasadneje26",
  leetcodeUser: "parshyaneje26",
  leetcode: "https://leetcode.com/u/parshyaneje26/",
  linkedin: "https://www.linkedin.com/in/prasad-neje-9a905a332",
  photo: "/prasad-headshot.png",
  resumeUrl: "/prasad-cv.pdf",
};

export const stats = [
  { value: "8.65", label: "CGPA — B.Tech CSE (AI)" },
  { value: "4+", label: "AI / Full-stack projects" },
  { value: "1", label: "IEEE publication" },
  { value: "97.97", label: "MHT-CET percentile" },
];

export type SkillGroup = { category: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    category: "AI & Machine Learning",
    items: [
      "Machine Learning",
      "Model Evaluation",
      "Explainable AI",
      "LLM / GenAI APIs",
      "RAG Pipelines",
      "Data Visualization",
    ],
  },
  {
    category: "Languages",
    items: ["Python", "C++", "C", "TypeScript", "SQL"],
  },
  {
    category: "Backend & Data",
    items: ["FastAPI", "Node.js", "Express.js", "PostgreSQL", "SQLite", "SQLAlchemy", "DBMS"],
  },
  {
    category: "Frontend",
    items: ["React", "Vite", "TypeScript", "TailwindCSS", "Zustand", "Recharts", "Flutter"],
  },
  {
    category: "Engineering Foundations",
    items: [
      "Data Structures & Algorithms (C++)",
      "OOP in C++",
      "Computer Networks",
      "Docker",
      "Nginx",
      "JWT / RBAC",
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  kind: string;
  featured: boolean;
  summary: string;
  problem: string;
  approach: string[];
  architecture: string[];
  outcomes: string[];
  stack: string[];
  repo?: string;
};

export const projects: Project[] = [
  {
    slug: "ai-college-cap-counseling",
    title: "AI College CAP Counseling Platform",
    kind: "AI Product · Web + Mobile",
    featured: true,
    summary:
      "AI-powered platform for Maharashtra engineering CAP counseling: predicts admission chances, forecasts cutoffs and recommends colleges from CET score, category and preferences.",
    problem:
      "Every year lakhs of students navigate Maharashtra's CAP counseling with fragmented cutoff PDFs and guesswork. There is no single place to estimate admission probability or to get guidance grounded in a student's own score and category.",
    approach: [
      "Modelled historical cutoff data per college, branch, category and CAP round to forecast next-cycle closing scores.",
      "Built an admission-probability estimator that maps a student's CET score and category to a likelihood band per preference.",
      "Added an LLM-powered counseling chatbot so students can ask free-form questions about branches, colleges and the CAP process.",
      "Generated downloadable PDF preference reports and enabled mentorship booking with role-based accounts.",
    ],
    architecture: [
      "React web app + Flutter mobile client sharing one API contract.",
      "Node.js / Express gateway handling auth, users, bookings and reports.",
      "FastAPI AI engine serving cutoff prediction, probability estimation and the LLM chatbot.",
      "PostgreSQL for persistence, Docker + Nginx for containerised deployment, JWT for role-based authentication.",
    ],
    outcomes: [
      "Microservice split keeps the ML workload isolated from the transactional API.",
      "One recommendation flow serves both web and mobile from a single engine.",
      "Role-based access separates students, mentors and administrators.",
    ],
    repo: "https://github.com/prasadneje26/CAP-List-AI",
    stack: [
      "React",
      "Flutter",
      "Node.js",
      "Express.js",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "Docker",
      "Nginx",
      "JWT",
      "Machine Learning",
      "LLM APIs",
    ],
  },
  {
    slug: "lawyer-ai-2",
    title: "Lawyer-AI 2.0",
    kind: "Legal Intelligence Platform",
    featured: true,
    summary:
      "Professional AI legal platform for lawyers and firms: semantic case search, case-outcome prediction, legal document generation and judgment summarisation.",
    problem:
      "Legal research is slow and repetitive. Lawyers spend hours locating comparable judgments, drafting standard documents and distilling long rulings into usable summaries.",
    approach: [
      "Implemented semantic case search so queries match meaning rather than exact keywords.",
      "Built decision models that estimate case-outcome probability from structured case attributes.",
      "Created a template-driven generator for standard legal documents.",
      "Added an automated judgment summarisation parser for long judicial texts.",
    ],
    architecture: [
      "Decoupled architecture: FastAPI backend service and a React + Vite + TypeScript client.",
      "Secure API proxying with persistent local session state via Zustand.",
      "SQLite + SQLAlchemy persistence, JWT (python-jose) and bcrypt for auth.",
      "RBAC separating Lawyer and Admin roles, with system-wide audit logging.",
    ],
    outcomes: [
      "Research, drafting and summarisation live behind one authenticated workspace.",
      "Audit logging makes every privileged action traceable.",
      "Recharts dashboards surface case and usage analytics.",
    ],
    repo: "https://github.com/prasadneje26/Lawer-AI",
    stack: [
      "React",
      "Vite",
      "TypeScript",
      "TailwindCSS",
      "Zustand",
      "Axios",
      "Recharts",
      "FastAPI",
      "Python",
      "SQLite",
      "SQLAlchemy",
      "JWT",
      "bcrypt",
    ],
  },
  {
    slug: "rajmudra-student-management",
    title: "Rajmudra Student Management Platform",
    kind: "Industry Project",
    featured: true,
    summary:
      "An industry-facing student management platform covering institutional records, academic tracking and administrative workflows.",
    problem:
      "Institutions rely on scattered spreadsheets for student records, attendance and academic progress, which makes reporting slow and error-prone.",
    approach: [
      "Centralised student, academic and administrative records behind a single data model.",
      "Designed role-separated workflows for administrators and staff.",
      "Focused on reliable CRUD, reporting and data integrity over feature sprawl.",
    ],
    architecture: [
      "Full-stack web application with a relational data layer.",
      "Authenticated, role-scoped access to records and reports.",
    ],
    outcomes: [
      "Delivered as an industry engagement rather than a coursework exercise.",
      "Replaces manual record keeping with structured, queryable data.",
    ],
    repo: "https://github.com/prasadneje26/Rajmudra_Student_data_handling",
    stack: ["Full-stack Web", "Relational Database", "Authentication"],
  },
  {
    slug: "explainable-ai-for-dl-models",
    title: "Explainable AI for Deep Learning Models",
    kind: "Research Engineering",
    featured: true,
    summary:
      "Interpretability work on deep learning models — making predictions inspectable instead of accepting a black box.",
    problem:
      "Deep models perform well but give little insight into why a prediction was made, which blocks adoption in high-stakes domains.",
    approach: [
      "Applied model-agnostic and gradient-based explanation techniques to trained deep networks.",
      "Compared explanations across methods to check consistency of attributed features.",
      "Visualised attributions to make model behaviour legible to non-ML reviewers.",
    ],
    architecture: [
      "Python experimentation stack with reproducible notebooks and evaluation scripts.",
      "Visualisation layer for per-sample attribution inspection.",
    ],
    outcomes: [
      "Explanations turn model output into reviewable evidence.",
      "Directly informed my interest in trustworthy, auditable AI systems.",
    ],
    repo: "https://github.com/prasadneje26/Explainable-AI-for-DL-Models",
    stack: ["Python", "Deep Learning", "Explainable AI", "Data Visualization"],
  },
];

export const research = {
  title: "IEEE Conference Publication",
  venue:
    "2026 2nd International Conference on Computing, Communication and Green Engineering (CCGE)",
  publisher: "IEEE",
  doi: "10.1109/CCGE67142.2026.11581630",
  doiUrl: "https://doi.org/10.1109/CCGE67142.2026.11581630",
  description:
    "Peer-reviewed work presented at CCGE 2026 and published by IEEE, covering applied computing and intelligent systems research.",
};

export const education = [
  {
    period: "2024 — 2028",
    institution: "Vishwakarma Institute of Technology, Pune",
    detail: "B.Tech, Computer Science and Engineering (Artificial Intelligence)",
    score: "CGPA 8.65",
  },
  {
    period: "2023 — 2024",
    institution: "Dr. Mane Mahavidyalaya, Kagal",
    detail: "HSC (Higher Secondary Certificate)",
    score: "74.33% · MHT-CET 97.97 percentile",
  },
  {
    period: "2021 — 2022",
    institution: "New English School and Jr. College, Rendal",
    detail: "SSC (Secondary School Certificate)",
    score: "90.40%",
  },
];

export const experience = [
  {
    period: "40 hours",
    title: "AI Bootcamp — Participant",
    org: "VIT Pune × C-DAC ACTS Pune × FutureSkills Prime (MeitY & NASSCOM)",
    points: [
      "Completed an intensive 40-hour Artificial Intelligence bootcamp conducted by Vishwakarma Institute of Technology, Pune.",
      "Delivered in collaboration with C-DAC ACTS Pune and FutureSkills Prime, an initiative by MeitY and NASSCOM.",
      "Covered applied AI foundations, model building workflows and practical tooling.",
    ],
  },
];

export const softSkills = [
  "Problem-solving & analytical thinking",
  "Curiosity and willingness to learn",
  "Team collaboration & communication",
  "Time management & adaptability",
];

export type Certification = {
  title: string;
  issuer: string;
  period: string;
  credential: string;
  points: string[];
};

export const certifications: Certification[] = [
  {
    title: "Artificial Intelligence Bootcamp (40 hours)",
    issuer: "VIT Pune x C-DAC ACTS Pune x FutureSkills Prime (MeitY & NASSCOM)",
    period: "40-hour intensive program",
    credential: "Completion certificate",
    points: [
      "Applied AI foundations: data preparation, model building and evaluation workflows.",
      "Hands-on sessions delivered by C-DAC ACTS Pune trainers.",
      "Government-backed FutureSkills Prime track under MeitY and NASSCOM.",
    ],
  },
  {
    title: "IEEE Conference Publication — CCGE 2026",
    issuer: "IEEE",
    period: "2026",
    credential: "DOI 10.1109/CCGE67142.2026.11581630",
    points: [
      "Peer-reviewed paper accepted and published by IEEE.",
      "Presented at the 2nd International Conference on Computing, Communication and Green Engineering.",
    ],
  },
  {
    title: "MHT-CET — 97.97 Percentile",
    issuer: "State CET Cell, Maharashtra",
    period: "2024",
    credential: "Scorecard",
    points: [
      "Top 3 percentile statewide, securing admission into CSE (AI) at VIT Pune.",
      "HSC 74.33% and SSC 90.40% academic record.",
    ],
  },
];

export type Post = {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  tag: string;
  excerpt: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "microservices-for-ml-products",
    title: "Why I split the ML engine out of the API gateway",
    date: "2026-05-18",
    readingTime: "5 min read",
    tag: "Architecture",
    excerpt:
      "Building the CAP counseling platform taught me that model inference and CRUD traffic have completely different failure profiles.",
    body: [
      "When I started the AI College CAP Counseling Platform, everything lived in one backend. Auth, bookings, PDF reports and cutoff prediction all shared one process. It worked until the prediction endpoint got slow, and suddenly login requests were queueing behind matrix math.",
      "Splitting the system into a Node.js/Express gateway and a FastAPI AI engine fixed that. The gateway owns users, sessions, mentorship bookings and reports. The AI engine owns cutoff forecasting, admission probability and the LLM counseling chatbot. They talk over a narrow, versioned HTTP contract.",
      "The practical wins were immediate: the ML service can be scaled or restarted independently, Python stays where the ML ecosystem is strongest, and the web and Flutter clients consume one stable contract regardless of what happens behind it.",
      "The lesson I keep reusing: draw the service boundary where the workload characteristics change, not where the code files happen to sit.",
    ],
  },
  {
    slug: "explainability-before-deployment",
    title: "A model you cannot explain is a model you cannot ship",
    date: "2026-03-02",
    readingTime: "4 min read",
    tag: "Explainable AI",
    excerpt:
      "Notes from my Explainable AI work: attribution methods turn a black-box prediction into reviewable evidence.",
    body: [
      "Accuracy is a starting point, not a finish line. In my Explainable AI for Deep Learning Models work, the interesting question was never 'how well does it score' but 'can a reviewer see why it decided that'.",
      "I applied model-agnostic and gradient-based attribution techniques to trained networks, then compared them against each other. Where two independent methods highlighted the same features, confidence went up. Where they disagreed, that was a signal to look harder at the data.",
      "Visualising attributions mattered more than I expected. Once a non-ML reviewer can point at what the model looked at, the conversation moves from trust-me to let-us-check.",
      "That work is the reason I care about auditability in every system I build now: RBAC, audit logs and explanations are the same idea applied at different layers.",
    ],
  },
  {
    slug: "rag-that-actually-answers",
    title: "Grounding an LLM assistant in a small, curated corpus",
    date: "2026-01-20",
    readingTime: "4 min read",
    tag: "GenAI",
    excerpt:
      "Retrieval quality, not model size, is what decides whether an assistant is useful or confidently wrong.",
    body: [
      "Both my counseling chatbot and the assistant on this site follow the same rule: the model only answers from a corpus I control, and it says so when it does not know.",
      "Small, curated context beats a large messy one. Chunking at a meaningful granularity, deduplicating near-identical text and keeping every chunk under the embedding token cap gave better answers than simply feeding in more documents.",
      "The second rule is refusal. An assistant that admits a gap and points the user to a real contact channel is more useful than one that improvises a plausible-sounding answer.",
      "Legal search in Lawyer-AI 2.0 pushed this further: there, a wrong citation is worse than no citation, so semantic retrieval is paired with the actual source judgment every time.",
    ],
  },
];

export const assistantContext = `
You are the AI assistant on Prasad Vitthal Neje's portfolio. Answer questions about his professional profile only, in 2-5 concise sentences. If something is not in the profile, say you don't have that detail and suggest contacting him at ${profile.email}.

PROFILE
Name: ${profile.name}. Roles: ${profile.roles.join(", ")}. Location: ${profile.location}.
Email: ${profile.email}. Phone: ${profile.phone}.
Summary: ${profile.summary}

EDUCATION
${education.map((e) => `- ${e.period}: ${e.institution} — ${e.detail} (${e.score})`).join("\n")}

EXPERIENCE
${experience.map((e) => `- ${e.title} at ${e.org}: ${e.points.join(" ")}`).join("\n")}

RESEARCH
${research.title} — ${research.venue}, ${research.publisher}. DOI ${research.doi}. ${research.description}

CERTIFICATIONS
${certifications.map((c) => `- ${c.title} — ${c.issuer} (${c.credential})`).join("\n")}

CODING PROFILES
GitHub: ${profile.github} (username prasadneje26). LeetCode: ${profile.leetcode} (username parshyaneje26).

SKILLS
${skillGroups.map((g) => `${g.category}: ${g.items.join(", ")}`).join("\n")}

PROJECTS
${projects
  .map(
    (p) =>
      `- ${p.title} (${p.kind}): ${p.summary} Problem: ${p.problem} Architecture: ${p.architecture.join(" ")} Stack: ${p.stack.join(", ")}.`,
  )
  .join("\n")}
`;
