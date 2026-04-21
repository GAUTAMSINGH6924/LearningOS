"use client";

import { useState } from "react";

type Credential = {
  provider: string;
  title: string;
  image: string;
  link: string;
  description: string;
  hours: string;
  benefits: string;
  category: string;
};

const categories = [
  "All",
  "AI",
  "Data",
  "Cloud",
  "Development",
  "Security",
  "Design",
  "Business",
];

const credentials: Credential[] = [
  // 🔵 IBM
  {
    provider: "IBM",
    title: "IBM Data Science Professional Certificate",
    image: "/ibm.png",
    link: "https://www.coursera.org/professional-certificates/ibm-data-science",
    description: "Learn data science, Python, and ML projects.",
    hours: "120 hours",
    benefits: "IBM Badge + Portfolio",
    category: "Data",
  },
  {
    provider: "IBM",
    title: "IBM AI Engineering",
    image: "/ibm.png",
    link: "https://www.coursera.org/professional-certificates/ai-engineer",
    description: "Build AI models using ML & deep learning.",
    hours: "150 hours",
    benefits: "AI Certification + Projects",
    category: "AI",
  },
  {
    provider: "IBM",
    title: "IBM Cybersecurity Analyst",
    image: "/ibm.png",
    link: "https://www.coursera.org/professional-certificates/ibm-cybersecurity-analyst",
    description: "Learn cyber threats, tools & defense.",
    hours: "130 hours",
    benefits: "Security Certification",
    category: "Security",
  },
  {
    provider: "IBM",
    title: "IBM Full Stack Developer",
    image: "/ibm.png",
    link: "https://www.coursera.org/professional-certificates/ibm-full-stack-cloud-developer",
    description: "Build full stack cloud apps.",
    hours: "140 hours",
    benefits: "Dev Certification + Projects",
    category: "Development",
  },
  {
    provider: "IBM",
    title: "IBM Data Analyst",
    image: "/ibm.png",
    link: "https://www.coursera.org/professional-certificates/ibm-data-analyst",
    description: "Analyze data using SQL, Python & Excel.",
    hours: "100 hours",
    benefits: "Data Badge",
    category: "Data",
  },
  {
    provider: "IBM",
    title: "IBM DevOps Engineer",
    image: "/ibm.png",
    link: "https://www.coursera.org/professional-certificates/devops-and-software-engineering",
    description: "CI/CD, Docker & Kubernetes mastery.",
    hours: "160 hours",
    benefits: "DevOps Certification",
    category: "Development",
  },
  {
    provider: "IBM",
    title: "IBM Machine Learning",
    image: "/ibm.png",
    link: "https://www.coursera.org/professional-certificates/ibm-machine-learning",
    description: "Learn ML algorithms and models.",
    hours: "110 hours",
    benefits: "ML Projects",
    category: "AI",
  },
  {
    provider: "IBM",
    title: "IBM IT Support",
    image: "/ibm.png",
    link: "https://www.coursera.org/professional-certificates/ibm-technical-support",
    description: "Understand IT systems & troubleshooting.",
    hours: "90 hours",
    benefits: "IT Certification",
    category: "Development",
  },
  {
    provider: "IBM",
    title: "IBM Blockchain Developer",
    image: "/ibm.png",
    link: "https://www.coursera.org/professional-certificates/ibm-blockchain",
    description: "Build blockchain apps.",
    hours: "120 hours",
    benefits: "Blockchain Badge",
    category: "Development",
  },
  {
    provider: "IBM",
    title: "IBM Applied AI",
    image: "/ibm.png",
    link: "https://www.coursera.org/professional-certificates/applied-ai",
    description: "Apply AI with real tools.",
    hours: "100 hours",
    benefits: "AI Badge",
    category: "AI",
  },

  // 🔴 GOOGLE
  {
    provider: "Google",
    title: "Google Data Analytics",
    image: "/google.png",
    link: "https://www.coursera.org/professional-certificates/google-data-analytics",
    description: "Analyze and visualize data.",
    hours: "180 hours",
    benefits: "Google Certificate",
    category: "Data",
  },
  {
    provider: "Google",
    title: "Google UX Design",
    image: "/google.png",
    link: "https://www.coursera.org/professional-certificates/google-ux-design",
    description: "Design user experiences.",
    hours: "200 hours",
    benefits: "UX Portfolio",
    category: "Design",
  },
  {
    provider: "Google",
    title: "Google IT Support",
    image: "/google.png",
    link: "https://www.coursera.org/professional-certificates/google-it-support",
    description: "Learn IT fundamentals.",
    hours: "100 hours",
    benefits: "IT Career Prep",
    category: "Development",
  },
  {
    provider: "Google",
    title: "Google Cybersecurity",
    image: "/google.png",
    link: "https://www.coursera.org/professional-certificates/google-cybersecurity",
    description: "Protect systems & networks.",
    hours: "140 hours",
    benefits: "Security Certificate",
    category: "Security",
  },
  {
    provider: "Google",
    title: "Google Project Management",
    image: "/google.png",
    link: "https://www.coursera.org/professional-certificates/google-project-management",
    description: "Manage Agile projects.",
    hours: "160 hours",
    benefits: "PM Certification",
    category: "Business",
  },
  {
    provider: "Google",
    title: "Google Digital Marketing",
    image: "/google.png",
    link: "https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce",
    description: "SEO, Ads & e-commerce.",
    hours: "120 hours",
    benefits: "Marketing Certificate",
    category: "Business",
  },
  {
    provider: "Google",
    title: "Google Advanced Data Analytics",
    image: "/google.png",
    link: "https://www.coursera.org/professional-certificates/google-advanced-data-analytics",
    description: "Advanced data & ML tools.",
    hours: "150 hours",
    benefits: "Advanced Certificate",
    category: "Data",
  },
  {
    provider: "Google",
    title: "Google Business Intelligence",
    image: "/google.png",
    link: "https://www.coursera.org/professional-certificates/google-business-intelligence",
    description: "Build dashboards & reports.",
    hours: "110 hours",
    benefits: "BI Certificate",
    category: "Data",
  },
  {
    provider: "Google",
    title: "Google Cloud Digital Leader",
    image: "/google.png",
    link: "https://www.coursera.org/professional-certificates/google-cloud-digital-leader-training",
    description: "Learn cloud fundamentals.",
    hours: "60 hours",
    benefits: "Cloud Certification",
    category: "Cloud",
  },
  {
    provider: "Google",
    title: "Google IT Automation with Python",
    image: "/google.png",
    link: "https://www.coursera.org/professional-certificates/google-it-automation",
    description: "Automate tasks using Python.",
    hours: "120 hours",
    benefits: "Python Certification",
    category: "Development",
  },
  {
    provider: "Google",
    title: "Google AI Essentials",
    image: "/google.png",
    link: "https://www.coursera.org/learn/google-ai-essentials",
    description: "Basics of AI tools.",
    hours: "40 hours",
    benefits: "AI Certificate",
    category: "AI",
  },
  {
    provider: "Google",
    title: "Google Prompting Essentials",
    image: "/google.png",
    link: "https://www.coursera.org/learn/google-prompting-essentials",
    description: "Prompt engineering for AI.",
    hours: "20 hours",
    benefits: "AI Skill Badge",
    category: "AI",
  },
  {
    provider: "Google",
    title: "Google Android Developer",
    image: "/google.png",
    link: "https://developer.android.com/courses",
    description: "Build Android apps.",
    hours: "150 hours",
    benefits: "Android Skills",
    category: "Development",
  },
  {
    provider: "Google",
    title: "Google TensorFlow Developer",
    image: "/google.png",
    link: "https://www.tensorflow.org/certificate",
    description: "Create ML models with TensorFlow.",
    hours: "100 hours",
    benefits: "ML Certification",
    category: "AI",
  },
  {
    provider: "Google",
    title: "Google Cloud Engineer",
    image: "/google.png",
    link: "https://cloud.google.com/certification/cloud-engineer",
    description: "Deploy apps on cloud.",
    hours: "120 hours",
    benefits: "Cloud Certification",
    category: "Cloud",
  },
];

export default function CredentialsPage() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? credentials
      : credentials.filter((c) => c.category === active);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">

      {/* TAGLINE */}
      <div className="max-w-3xl mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
          Build Credibility with Verified Credentials
        </h1>

        <p className="text-gray-400 mt-4 leading-relaxed">
          Credentials help you highlight your expertise and accomplishments in a way that is verifiable and recognized.
          Skills are valued globally, making it essential to showcase your expertise effectively for career growth.
        </p>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full text-sm border transition 
              ${
                active === cat
                  ? "bg-purple-500 text-white border-purple-500"
                  : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="space-y-6">
        {filtered.map((cred) => (
          <div
            key={cred.title}
            className="grid md:grid-cols-2 gap-6 items-center bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md"
          >

            {/* CARD */}
            <a
              href={cred.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition"
            >
              <img
                src={cred.image}
                alt={`${cred.provider} logo`}
                className="w-14 h-14 object-contain"
                loading="lazy"
              />

              <div>
                <h2 className="font-semibold text-lg">{cred.title}</h2>
                <p className="text-xs text-gray-400">{cred.provider}</p>
              </div>
            </a>

            {/* DETAILS */}
            <div className="text-sm space-y-2">
              <p className="text-gray-300">{cred.description}</p>
              <p><span className="text-gray-400">⏱ Duration:</span> {cred.hours}</p>
              <p><span className="text-gray-400">🎯 Benefits:</span> {cred.benefits}</p>
            </div>

          </div>
        ))}
      </div>

    </main>
  );
}