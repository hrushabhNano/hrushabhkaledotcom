import React from "react";
import Link from "next/link";
import { Subheading } from "./subheading";
import { cn } from "@/lib/utils";
import {
  IconActivity,
  IconShieldLock,
  IconBrain,
  IconMessageChatbot,
  IconShoppingCart,
} from "@tabler/icons-react";

const workItems = [
  {
    name: "nPharma",
    description:
      "Multi-country React Native platform for pharmaceutical MRs — tour plans, expense management, doctor masters",
    stack: ["React Native", "Node.js", "PostgreSQL"],
    icon: <IconActivity className="size-4 text-white" stroke={2} />,
    bg: "from-cyan-500 to-cyan-600 ring-cyan-500/30",
    href: null,
  },
  {
    name: "nAuth.app",
    description:
      "In-house 2FA authenticator with TOTP-based authentication and modern encryption",
    stack: ["React", "Node.js"],
    icon: <IconShieldLock className="size-4 text-white" stroke={2} />,
    bg: "from-rose-500 to-rose-600 ring-rose-500/30",
    href: "https://nauth.app",
  },
  {
    name: "Career Mantrana AI",
    description:
      "AI-powered career guidance platform — personal side project built on LangGraph and Claude",
    stack: ["Next.js", "LangGraph", "Claude API"],
    icon: <IconBrain className="size-4 text-white" stroke={2} />,
    bg: "from-fuchsia-500 to-fuchsia-600 ring-fuchsia-500/30",
    href: null,
  },
  {
    name: "ChatQLM",
    description:
      "AI-powered chat platform with LLM integration for enterprise client workflows",
    stack: ["React", "LangGraph", "Node.js"],
    icon: <IconMessageChatbot className="size-4 text-white" stroke={2} />,
    bg: "from-amber-500 to-amber-600 ring-amber-500/30",
    href: null,
  },
  {
    name: "Jubilant Foodworks B2B Commerce",
    description:
      "Full-stack React PWA with Salesforce B2B Commerce Cloud + SAP ERP integration, eKYC, and multi-gateway payments",
    stack: ["React", "Node.js", "Salesforce", "SAP"],
    icon: <IconShoppingCart className="size-4 text-white" stroke={2} />,
    bg: "from-teal-500 to-teal-600 ring-teal-500/30",
    href: null,
  },
];

export const Work = () => {
  return (
    <div>
      <Subheading>Things I build</Subheading>
      <div className="mt-4 flex flex-col gap-6 md:gap-4">
        {workItems.map((item) => {
          const content = (
            <>
              <div
                className={cn(
                  "mr-4 flex size-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-b shadow-sm ring-1 ring-white/20 ring-inset",
                  item.bg,
                )}
              >
                {item.icon}
              </div>
              <div className="flex flex-1 flex-col md:flex-row md:items-center md:gap-2">
                <span className="text-foreground font-medium">{item.name}</span>
                <span className="hidden size-1 rounded-full bg-neutral-300 md:block dark:bg-neutral-700"></span>
                <span className="text-foreground/70 text-sm leading-relaxed">
                  {item.description}
                </span>
              </div>
            </>
          );

          if (item.href) {
            return (
              <Link
                key={item.name}
                href={item.href}
                target="_blank"
                className="-m-2 flex cursor-pointer flex-col items-start gap-1 rounded-lg p-2 transition-colors hover:bg-neutral-100 md:flex-row md:items-center dark:hover:bg-neutral-800/40"
              >
                {content}
                <span className="text-primary ml-auto font-mono text-xs md:pl-2">
                  ↗ Link
                </span>
              </Link>
            );
          }

          return (
            <div
              key={item.name}
              className="-m-2 flex flex-col items-start gap-1 rounded-lg p-2 md:flex-row md:items-center"
            >
              {content}
              <span className="text-foreground/30 ml-auto font-mono text-xs select-none md:pl-2">
                Internal
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
