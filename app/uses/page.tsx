import type { Metadata } from "next";
import Container from "@/components/container";
import { Subheading } from "@/components/subheading";
import Divider from "@/components/divider";
import { cn } from "@/lib/utils";
import {
  IconCode,
  IconTerminal2,
  IconBrandGithub,
  IconApiApp,
  IconDatabase,
  IconBrandReact,
  IconBrowser,
  IconDeviceMobile,
  IconServer,
  IconBox,
  IconCloud,
  IconBrain,
  IconApi,
  IconCursorText,
  IconNotebook,
  IconMessageCircle,
  IconDeviceLaptop,
  IconSettings,
  IconStack3,
  IconSparkles,
  IconCpu,
} from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Stack & Setup",
  description: "The tools, stack, and setup I actually use day to day.",
  alternates: {
    canonical: "/uses",
  },
};

const setupItems = [
  {
    name: "Editor",
    value: "VS Code (primary), Cursor (AI-assisted)",
    icon: <IconCode className="size-5 text-white" stroke={1.8} />,
    bg: "from-blue-500 to-blue-600 ring-blue-500/30",
  },
  {
    name: "Terminal",
    value: "Warp",
    icon: <IconTerminal2 className="size-5 text-white" stroke={1.8} />,
    bg: "from-stone-500 to-stone-600 ring-stone-500/30",
  },
  {
    name: "Version Control",
    value: "Git & GitHub",
    icon: <IconBrandGithub className="size-5 text-white" stroke={1.8} />,
    bg: "from-neutral-700 to-neutral-800 ring-neutral-700/30",
  },
  {
    name: "API testing",
    value: "Postman, bruno",
    icon: <IconApiApp className="size-5 text-white" stroke={1.8} />,
    bg: "from-orange-500 to-orange-600 ring-orange-500/30",
  },
  {
    name: "Database GUI",
    value: "TablePlus",
    icon: <IconDatabase className="size-5 text-white" stroke={1.8} />,
    bg: "from-teal-500 to-teal-600 ring-teal-500/30",
  },
  {
    name: "React Native Setup",
    value: "Expo for quick prototyping, Bare React Native otherwise",
    icon: <IconBrandReact className="size-5 text-white" stroke={1.8} />,
    bg: "from-cyan-500 to-cyan-600 ring-cyan-500/30",
  },
];

const techStackItems = [
  {
    name: "Frontend",
    value: "Next.js (App Router), React",
    icon: <IconBrowser className="size-5 text-white" stroke={1.8} />,
    bg: "from-indigo-500 to-indigo-600 ring-indigo-500/30",
  },
  {
    name: "Mobile",
    value: "React Native (Expo)",
    icon: <IconDeviceMobile className="size-5 text-white" stroke={1.8} />,
    bg: "from-violet-500 to-violet-600 ring-violet-500/30",
  },
  {
    name: "Backend",
    value: "Node.js, Express",
    icon: <IconServer className="size-5 text-white" stroke={1.8} />,
    bg: "from-emerald-500 to-emerald-600 ring-emerald-500/30",
  },
  {
    name: "Database",
    value: "PostgreSQL (pgvector for AI search projects)",
    icon: <IconDatabase className="size-5 text-white" stroke={1.8} />,
    bg: "from-emerald-600 to-emerald-700 ring-emerald-600/30",
  },
  {
    name: "ORM",
    value: "Prisma",
    icon: <IconBox className="size-5 text-white" stroke={1.8} />,
    bg: "from-blue-500 to-blue-600 ring-blue-500/30",
  },
  {
    name: "Hosting & Cloud",
    value:
      "Heroku (enterprise projects), Vercel (frontends), GCP (databases & Cloud Run)",
    icon: <IconCloud className="size-5 text-white" stroke={1.8} />,
    bg: "from-sky-500 to-sky-600 ring-sky-500/30",
  },
];

const aiToolsItems = [
  {
    name: "Claude (claude.ai)",
    value:
      "Primary AI assistant for reasoning, code blocks, copy editing, and technical brainstorming.",
    icon: <IconBrain className="size-5 text-white" stroke={1.8} />,
    bg: "from-fuchsia-500 to-fuchsia-600 ring-fuchsia-500/30",
  },
  {
    name: "Claude Code",
    value:
      "Terminal CLI tool for AI-assisted coding directly inside workspace codebases.",
    icon: <IconTerminal2 className="size-5 text-white" stroke={1.8} />,
    bg: "from-purple-500 to-purple-600 ring-purple-500/30",
  },
  {
    name: "Cursor",
    value:
      "AI code editor for mid-sized changes, context-aware editing, and inline suggestions.",
    icon: <IconCursorText className="size-5 text-white" stroke={1.8} />,
    bg: "from-slate-600 to-slate-700 ring-slate-600/30",
  },
  {
    name: "Anthropic APIs",
    value:
      "Used directly for LangGraph workflows, RAG pipelines, and enterprise automation setups.",
    icon: <IconApi className="size-5 text-white" stroke={1.8} />,
    bg: "from-amber-500 to-amber-600 ring-amber-500/30",
  },
];

const hardwareItems = [
  {
    name: "Notes & Tasks",
    value:
      "Notion (team orchestration), Apple Notes (quick capture), Linear (issue tracking)",
    icon: <IconNotebook className="size-5 text-white" stroke={1.8} />,
    bg: "from-yellow-500 to-yellow-600 ring-yellow-500/30",
  },
  {
    name: "Communication",
    value:
      "Slack for internal communication, WhatsApp for client collaborations in India",
    icon: <IconMessageCircle className="size-5 text-white" stroke={1.8} />,
    bg: "from-green-500 to-green-600 ring-green-500/30",
  },
  {
    name: "Hardware Setup",
    value:
      "MacBook Pro (M-series Apple Silicon), Android daily driver (React Native and mobile testing)",
    icon: <IconDeviceLaptop className="size-5 text-white" stroke={1.8} />,
    bg: "from-zinc-500 to-zinc-600 ring-zinc-500/30",
  },
];

const ItemCard = ({ item }: { item: any }) => (
  <div className="group flex items-start gap-4 rounded-xl border border-transparent p-3 transition-all duration-200 hover:border-neutral-200/50 hover:bg-neutral-100/60 dark:hover:border-neutral-700/30 dark:hover:bg-neutral-800/30">
    <div
      className={cn(
        "mt-0.5 flex size-10 shrink-0 transform items-center justify-center rounded-xl bg-linear-to-b shadow-xs ring-1 ring-white/20 transition-transform duration-200 ring-inset group-hover:scale-[1.03]",
        item.bg,
      )}
    >
      {item.icon}
    </div>
    <div className="flex flex-col gap-0.5">
      <span className="text-foreground text-sm leading-snug font-semibold tracking-tight">
        {item.name}
      </span>
      <span className="text-foreground/70 text-xs leading-relaxed">
        {item.value}
      </span>
    </div>
  </div>
);

const SectionCard = ({
  title,
  items,
  icon,
}: {
  title: string;
  items: any[];
  icon: React.ReactNode;
}) => (
  <div className="flex flex-col rounded-2xl border border-neutral-200/50 bg-neutral-50/30 p-5 shadow-xs transition-all duration-300 hover:border-neutral-300/50 hover:shadow-xs dark:border-neutral-800/80 dark:bg-neutral-900/10 dark:hover:border-neutral-700/80">
    <div className="mb-5 flex items-center gap-2.5 px-3">
      <div className="text-foreground/40">{icon}</div>
      <h2 className="text-foreground font-mono text-xs font-semibold tracking-widest uppercase">
        {title}
      </h2>
    </div>
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <ItemCard key={item.name} item={item} />
      ))}
    </div>
  </div>
);

export default function UsesPage() {
  return (
    <Container className="min-h-screen">
      <Subheading className="mt-4">Stack & Setup</Subheading>
      <p className="text-foreground/80 max-w-2xl pt-4 text-base leading-relaxed">
        What I use to build things. Updated when something changes in my
        workflow.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <SectionCard
          title="Development Setup"
          items={setupItems}
          icon={<IconSettings className="size-5" stroke={1.5} />}
        />

        <SectionCard
          title="Tech Stack I Reach For"
          items={techStackItems}
          icon={<IconStack3 className="size-5" stroke={1.5} />}
        />

        <SectionCard
          title="AI Tools — Daily Use"
          items={aiToolsItems}
          icon={<IconSparkles className="size-5" stroke={1.5} />}
        />

        <SectionCard
          title="Productivity & Hardware"
          items={hardwareItems}
          icon={<IconCpu className="size-5" stroke={1.5} />}
        />
      </div>

      <Divider />
    </Container>
  );
}
