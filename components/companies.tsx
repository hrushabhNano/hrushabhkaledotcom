import React from "react";
import { Subheading } from "./subheading";
import { cn } from "@/lib/utils";
import {
  IconBuildingSkyscraper,
  IconRocket,
  IconSchool,
  IconMicrophone,
  IconCode,
  IconTerminal2,
} from "@tabler/icons-react";

const experiences = [
  {
    company: "Nanostuffs Technologies",
    role: "Technical Lead",
    period: "Jan 2023 — Present",
    location: "Pune, India",
    logo: <IconTerminal2 className="size-5 text-white" stroke={1.5} />,
    bg: "from-indigo-500 to-indigo-600 ring-indigo-500/30",
    stack: [
      "React",
      "React Native",
      "Node.js",
      "PostgreSQL",
      "LangGraph",
      "Salesforce",
      "Heroku",
      "GCP",
    ],
    description:
      "Leading a full-stack team building enterprise systems for pharma, FMCG, and agri clients. Responsible for architecture, delivery, and the company's AI practice.",
    highlights: [
      "Architected Heroku infrastructure handling thousands of concurrent users; zero downtime deployments, Salesforce/Heroku sync pipelines.",
      "Spearheaded nPharma multi-country React Native platform for pharmaceutical Medical Representatives across international markets.",
      "Led AI tooling adoption: RAG-powered assistants, LangGraph workflows, and automations built on Anthropic APIs.",
    ],
  },
  {
    company: "Nanostuffs Technologies",
    role: "Software Engineer",
    period: "Jul 2022 — Dec 2022",
    location: "Pune, India",
    logo: <IconCode className="size-5 text-white" stroke={1.5} />,
    bg: "from-violet-500 to-violet-600 ring-violet-500/30",
    stack: ["React", "Node.js", "React Native", "Salesforce", "Heroku"],
    description:
      "First full-time role. Delivered multiple client projects across web and mobile, and started mentoring junior developers.",
    highlights: [],
  },
  {
    company: "Fountain9 (YC W21)",
    role: "Software Engineer Intern",
    period: "Jan 2022 — Jun 2022",
    location: "Mumbai, India",
    logo: <IconRocket className="size-5 text-white" stroke={1.5} />,
    bg: "from-orange-500 to-orange-600 ring-orange-500/30",
    stack: ["React", "Redux", "Ant Design"],
    description:
      "Frontend engineering on Kronoscope, an ML-based inventory and supply chain SaaS.",
    highlights: [
      "Optimised data table rendering in Ant Design for large inventory datasets; built API integrations for demand-planning workflows.",
    ],
  },
  {
    company: "University of Limerick",
    role: "ML Research Intern",
    period: "Nov 2021 — May 2022",
    location: "Limerick, Ireland (Remote)",
    logo: <IconSchool className="size-5 text-white" stroke={1.5} />,
    bg: "from-emerald-500 to-emerald-600 ring-emerald-500/30",
    stack: ["Python", "Machine Learning", "Predictive Analytics"],
    description:
      "Research collaboration that ended with a paper published at SMARTGREENS-2022. Focused on predicting carbon emissions and EV uptake trends from real Irish transport and wind farm data.",
    highlights: [
      "Published: DECART: Planning for Decarbonising Transport Sector with Predictive Analytics at SMARTGREENS-2022.",
    ],
  },
  {
    company: "TEDxGEC",
    role: "Web Development Team Lead",
    period: "Aug 2021 — Jan 2022",
    location: "Aurangabad, India",
    logo: <IconMicrophone className="size-5 text-white" stroke={1.5} />,
    bg: "from-red-500 to-red-600 ring-red-500/30",
    stack: ["HTML", "CSS", "JavaScript"],
    description:
      "Led a 6-person student team to build and ship the event website — speaker pages, booking platform, and live event coverage.",
    highlights: [],
  },
  {
    company: "Nanostuffs Technologies",
    role: "Full Stack Developer Intern",
    period: "Aug 2021 — Jan 2022",
    location: "Pune, India",
    logo: <IconBuildingSkyscraper className="size-5 text-white" stroke={1.5} />,
    bg: "from-blue-500 to-blue-600 ring-blue-500/30",
    stack: ["React", "Node.js", "Salesforce", "SAP ERP"],
    description:
      "Built the Jubilant Foodworks B2B E-Commerce platform — a React PWA with Salesforce B2B Commerce Cloud and SAP ERP integration, multi-gateway payments, and eKYC via GST/PAN/Aadhaar APIs.",
    highlights: [],
  },
];

export const Companies = () => {
  return (
    <section>
      <Subheading>Experience</Subheading>
      <div className="mt-6 flex flex-col gap-8">
        {experiences.map((exp, idx) => (
          <div
            key={`${exp.company}-${exp.role}-${idx}`}
            className="-m-4 flex flex-col gap-2 rounded-lg p-4 transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/20"
          >
            <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-b shadow-sm ring-1 ring-white/20 ring-inset",
                    exp.bg,
                  )}
                >
                  {exp.logo}
                </div>
                <div>
                  <h3 className="text-foreground text-sm leading-tight font-semibold">
                    {exp.company}
                  </h3>
                  <p className="text-foreground/70 text-xs font-medium">
                    {exp.role}
                  </p>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-foreground/50 font-mono text-xs">
                  {exp.period}
                </span>
                <span className="text-foreground/40 block text-[10px]">
                  {exp.location}
                </span>
              </div>
            </div>

            <p className="text-foreground/80 mt-1 text-sm leading-relaxed text-pretty">
              {exp.description}
            </p>

            {exp.highlights.length > 0 && (
              <ul className="mt-1.5 list-inside list-disc space-y-1">
                {exp.highlights.map((hl, hlIdx) => (
                  <li
                    key={hlIdx}
                    className="text-foreground/60 list-item pl-1 text-xs leading-relaxed text-pretty"
                  >
                    {hl}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-2 flex flex-wrap gap-1.5">
              {exp.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-foreground/70 rounded-md bg-stone-100 px-2 py-0.5 font-mono text-[10px] dark:bg-neutral-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
