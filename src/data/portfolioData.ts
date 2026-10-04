export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  overview: string;
  problem: string;
  solution: string;
  tags: string[];
  technologies: string[];
  image: string;
  githubUrl: string;
}

export interface SkillItem {
  name: string;
  category: "languages" | "web-mobile" | "tools-dsa";
  iconName: string;
  description: string;
}

export interface LeadershipItem {
  year: string;
  role: string;
  organization?: string;
  description: string;
  highlights: string[];
  isHighlighted?: boolean;
}

export interface AchievementItem {
  category: string;
  metric: string;
  title: string;
  description: string;
  badge: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  platform: string;
  skill: string;
  description: string;
  topics: string[];
  issuerBadge: string;
}

export const PERSONAL_INFO = {
  name: "Md Firdaush",
  brand: "MF.",
  role: "Computer Science & Engineering Student",
  degree: "Bachelor of Engineering (B.E.) in Computer Science and Engineering",
  college: "Sri Siddhartha School of Engineering (SSSE), Tumakuru, Karnataka",
  period: "2024–2028",
  expectedGraduation: "2028",
  tagline: "I BUILD. I LEAD. I INNOVATE.",
  supportingLine:
    "Computer Science student building practical technology and leading student communities.",
  heroBio:
    "I'm Md Firdaush — a Computer Science & Engineering student at Sri Siddhartha School of Engineering, focused on software, practical problem-solving, hackathons and student leadership.",
  aboutBio:
    "I’m pursuing a B.E. in Computer Science & Engineering and enjoy turning ideas into practical software. My interests span full-stack development, Android, problem solving, hackathons and student-led technical communities.",
  githubUsername: "FirdaushAnwer",
  githubUrl: "https://github.com/FirdaushAnwer",
  linkedinUrl: "https://www.linkedin.com/in/mdfirdaush",
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "kisanswap",
    number: "01",
    title: "KisanSwap",
    shortDesc:
      "A student-built platform concept focused on connecting agricultural needs and opportunities through technology.",
    overview:
      "KisanSwap addresses inefficiencies in agricultural supply logistics by providing direct transparent communication between agricultural producers, storage hubs, and buyers.",
    problem:
      "Farmers often face middlemen bottlenecks, opaque transport pricing, and delayed market access, reducing operational margins and causing produce spoilage.",
    solution:
      "A streamlined digital exchange interface integrating real-time telemetry, transparent trade routes, transit graphs, and simplified crop listing management.",
    tags: ["Web", "Innovation", "GitHub"],
    technologies: ["Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS"],
    image: "/projects/kisanswap.jpg",
    githubUrl: "https://github.com/FirdaushAnwer",
  },
  {
    id: "route-optimizer",
    number: "02",
    title: "AI-Driven Emergency Route Optimizer",
    shortDesc:
      "An AI-oriented routing concept exploring smarter paths and emergency-style route optimization.",
    overview:
      "A smart municipal emergency dispatch simulation that evaluates traffic density heatmaps, incident telemetry, and shortest path graph algorithms to route first responders faster.",
    problem:
      "Standard commercial GPS navigation apps prioritize average consumer vehicles and lack emergency clearance telemetry, causing critical response delays in dense traffic.",
    solution:
      "Simulates dynamic routing algorithms that compute priority corridors, dynamic hazard re-routing, and multi-vehicle dispatch coordination.",
    tags: ["AI", "Routing", "Simulation"],
    technologies: ["Python", "DSA Graph Algorithms", "FastAPI", "React", "Vector Maps"],
    image: "/projects/route-optimizer.jpg",
    githubUrl: "https://github.com/FirdaushAnwer",
  },
  {
    id: "attendance-tracker",
    number: "03",
    title: "Attendance Tracker",
    shortDesc:
      "A practical student-focused web project designed to make attendance tracking simpler and more accessible.",
    overview:
      "A high-utility web portal designed for engineering students to monitor lecture attendances, evaluate semester thresholds, and plan leaves without falling below compliance norms.",
    problem:
      "Students struggle to track attendance across changing timetables, unexpected faculty cancellations, and strict minimum threshold criteria.",
    solution:
      "Clear percentage dials, predictive attendance calculations, timetable calendars, and automated alerts when courses approach critical thresholds.",
    tags: ["Web", "Students"],
    technologies: ["JavaScript", "HTML5", "CSS3", "LocalStorage / IndexedDB", "Chart.js"],
    image: "/projects/attendance-tracker.jpg",
    githubUrl: "https://github.com/FirdaushAnwer",
  },
  {
    id: "green-meter",
    number: "04",
    title: "Green-Meter",
    shortDesc:
      "A sustainability-oriented project concept built around making environmental information more actionable.",
    overview:
      "Green-Meter translates complex environmental impact factors into accessible daily metrics, enabling organizations and student hubs to measure and reduce carbon footprints.",
    problem:
      "Sustainability metrics are typically hidden inside dense technical auditing spreadsheets that lack immediate actionable visibility.",
    solution:
      "An interactive sustainability dashboard featuring daily emission breakdowns, renewable energy utilization gauges, and milestone-based eco-targets.",
    tags: ["Sustainability", "Technology"],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Data Analytics"],
    image: "/projects/green-meter.jpg",
    githubUrl: "https://github.com/FirdaushAnwer",
  },
  {
    id: "codecollab",
    number: "05",
    title: "CodeCollab",
    shortDesc:
      "A collaborative coding platform concept aimed at helping students learn, build and work together.",
    overview:
      "A synchronized collaborative workspace enabling peer code review, paired debugging, and interactive technical workshops for engineering study circles.",
    problem:
      "Distributed peer learning is frequently hindered by tedious screen-sharing latency, mismatched local toolchains, and lack of real-time multi-cursor collaboration.",
    solution:
      "Lightweight in-browser code editor with operational transform synchronization, integrated terminal simulation, and real-time cursor indicators.",
    tags: ["Coding", "Collaboration"],
    technologies: ["WebSockets", "Monaco Editor", "Node.js", "Express", "React"],
    image: "/projects/codecollab.jpg",
    githubUrl: "https://github.com/FirdaushAnwer",
  },
  {
    id: "staff-tracker",
    number: "06",
    title: "Staff Tracker",
    shortDesc:
      "A management-oriented application concept for organizing staff-related information and workflows.",
    overview:
      "An administrative management portal streamlining duty shifts, availability heatmaps, department task allocations, and institutional staff directory coordination.",
    problem:
      "Manual scheduling on noticeboards and fragmented messaging channels leads to shift collisions, delayed notifications, and administrative friction.",
    solution:
      "Intuitive weekly schedule heatmaps, real-time duty status badges, shift request workflows, and instant departmental lookup tools.",
    tags: ["Management", "Application"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL / Prisma"],
    image: "/projects/staff-tracker.jpg",
    githubUrl: "https://github.com/FirdaushAnwer",
  },
];

export const SKILLS: SkillItem[] = [
  {
    name: "C Programming",
    category: "languages",
    iconName: "Code2",
    description: "Core systems programming, pointers, memory management, and structured algorithms.",
  },
  {
    name: "Java",
    category: "languages",
    iconName: "Coffee",
    description: "Object-oriented design, collections framework, multi-threading, and backend systems.",
  },
  {
    name: "JavaScript",
    category: "languages",
    iconName: "FileCode2",
    description: "Modern ES6+, asynchronous programming, DOM manipulation, and dynamic engines.",
  },
  {
    name: "HTML",
    category: "web-mobile",
    iconName: "Layout",
    description: "Semantic HTML5 architecture, accessibility standards, and SEO best practices.",
  },
  {
    name: "CSS",
    category: "web-mobile",
    iconName: "Palette",
    description: "Modern CSS layout models, animations, CSS variables, and responsive design.",
  },
  {
    name: "Full-Stack Web Development",
    category: "web-mobile",
    iconName: "Globe",
    description: "End-to-end architecture connecting modern frontends with REST APIs and databases.",
  },
  {
    name: "Android Development",
    category: "web-mobile",
    iconName: "Smartphone",
    description: "Mobile application workflows, activity lifecycles, UI layouts, and device integration.",
  },
  {
    name: "DSA / Problem Solving",
    category: "tools-dsa",
    iconName: "Binary",
    description: "Algorithmic thinking, data structures (arrays, trees, graphs), and time-space optimization.",
  },
  {
    name: "Git",
    category: "tools-dsa",
    iconName: "GitBranch",
    description: "Version control, branching strategies, collaborative merging, and repository hygiene.",
  },
  {
    name: "GitHub",
    category: "tools-dsa",
    iconName: "Github",
    description: "Open source collaboration, repository management, releases, and CI/CD pipelines.",
  },
  {
    name: "MongoDB",
    category: "tools-dsa",
    iconName: "Database",
    description: "Document databases, schema structuring, aggregation pipelines, and JSON storage.",
  },
  {
    name: "VS Code",
    category: "tools-dsa",
    iconName: "Terminal",
    description: "Primary development workspace, debugging tooling, terminal workflows, and extensions.",
  },
];

export const LEADERSHIP: LeadershipItem[] = [
  {
    year: "2026 — Present",
    role: "General Secretary",
    organization: "Sri Siddhartha School of Engineering (SSSE)",
    description:
      "College-level student leadership, coordination and representation across student activities and initiatives.",
    highlights: [
      "Representing student interests in institutional forums and administrative councils.",
      "Spearheading campus-wide technological, cultural, and academic events.",
      "Coordinating student bodies and ensuring seamless inter-departmental collaboration.",
    ],
  },
  {
    year: "2026 — Present",
    role: "Class Representative · 5th Sem A",
    organization: "Dept. of Computer Science & Engineering, SSSE",
    description:
      "Supporting communication between students and faculty, coordinating section activities and collecting student feedback.",
    highlights: [
      "Serving as the direct bridge between faculty leadership and engineering cohorts.",
      "Coordinating academic schedules, laboratory sessions, and curriculum updates.",
      "Resolving academic queries and driving unified student participation.",
    ],
  },
  {
    year: "2026 — Present",
    role: "Coordinator · Code Crackers",
    organization: "Code Crackers Technical Community · SSSE",
    description:
      "Helping build a coding community around hackathons, blind coding, debugging and technical events at SSSE.",
    highlights: [
      "Organizing high-impact blind coding challenges, debugging showdowns, and technical hackathons.",
      "Mentoring junior peers in competitive programming and foundational software engineering.",
      "Fostering an ethical, technical, and forward-thinking campus engineering culture.",
    ],
    isHighlighted: true,
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    category: "Academic",
    metric: "1st Rank",
    title: "Class Academic Excellence",
    description:
      "Achieved first rank in class during the 2nd, 3rd and 4th semesters in Computer Science & Engineering.",
    badge: "Consistent Distinction",
  },
  {
    category: "Projects",
    metric: "6+ Concepts",
    title: "Engineering Innovation",
    description:
      "Engineered diverse project concepts spanning agricultural logistics, AI routing, attendance telemetry, and collaboration tools.",
    badge: "Practical Problem Solving",
  },
  {
    category: "Learning",
    metric: "Continuous",
    title: "Skills & Community Growth",
    description:
      "Continuously exploring development, problem solving, hackathons, and empowering student communities through leadership.",
    badge: "Lifelong Engineering",
  },
];

export const CERTIFICATIONS: CertificateItem[] = [
  {
    id: "c-programming",
    title: "C Programming",
    platform: "HackerRank",
    skill: "Structured Programming & Memory Management",
    description:
      "Verified competency in C language constructs, pointer arithmetic, memory allocation, arrays, and standard I/O libraries.",
    topics: ["Pointers & References", "Dynamic Memory Allocation", "Data Structures in C", "Bitwise Operations"],
    issuerBadge: "Verified Credential",
  },
  {
    id: "java-programming",
    title: "Java Programming",
    platform: "freeCodeCamp",
    skill: "Object-Oriented Programming & Collections",
    description:
      "Comprehensive certification covering Core Java, OOP principles, exception handling, polymorphism, and class architectures.",
    topics: ["Encapsulation & Inheritance", "Java Collections Framework", "Exception Handling", "Interface Design"],
    issuerBadge: "Verified Credential",
  },
  {
    id: "android-dev",
    title: "Android Development",
    platform: "freeCodeCamp",
    skill: "Mobile Architecture & App Development",
    description:
      "Practical mastery of Android application lifecycle, user interface composition, event handling, and mobile software design.",
    topics: ["Activity Lifecycle", "Layouts & UI Widgets", "Event Handling", "Mobile Architecture"],
    issuerBadge: "Verified Credential",
  },
  {
    id: "dsa-problem-solving",
    title: "Problem Solving / DSA",
    platform: "Infosys Springboard",
    skill: "Data Structures & Algorithmic Analysis",
    description:
      "Intensive coursework covering foundational and intermediate algorithms, computational complexity, trees, graphs, and optimization.",
    topics: ["Asymptotic Time/Space Complexity", "Trees & Graphs", "Sorting & Searching", "Dynamic Programming Fundamentals"],
    issuerBadge: "Verified Credential",
  },
];
