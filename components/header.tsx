import React from "react";
import { LinkPreview } from "./link-preview";

export const Header = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-foreground text-base leading-relaxed">
        I&apos;m a Full Stack Engineer and Tech Lead at{" "}
        <LinkPreview url="https://nanostuffs.com">
          Nanostuffs Technologies
        </LinkPreview>{" "}
        in Pune, where I&apos;ve spent the last four years building AI-first
        systems for enterprise clients. My day job involves WhatsApp automation
        platforms, LangGraph-powered AI assistants, React Native apps across
        multiple countries, and Heroku architectures that need to stay up when
        things get busy. I lead a team, own delivery end-to-end, and I&apos;m
        the person who gets called when something breaks in production.
      </div>
      <div className="text-foreground text-base leading-relaxed">
        Before Nanostuffs, I interned at{" "}
        <LinkPreview url="https://ycombinator.com/companies/fountain9">
          Fountain9
        </LinkPreview>{" "}
        — a YC W21-backed startup — working on Kronoscope, an ML-driven
        inventory and supply chain platform. Before that, I spent seven months
        as an ML research intern at the University of Limerick in Ireland, which
        ended with a paper published at SMARTGREENS-2022. I&apos;m from
        Aurangabad, did my engineering at Government College there, and landed
        in Pune in 2021. That arc — Tier 2 city government college to
        international research publication to leading a team at an AI startup —
        is the kind of thing I try to write about honestly, because I never saw
        many people talk about it openly when I was figuring it out.
      </div>
      <div className="text-foreground text-base leading-relaxed">
        I write about building with AI, making real architectural decisions
        under startup constraints, and what technical leadership actually looks
        like in practice. Not the polished version. The real one — scope creep,
        production fires, the decisions that felt obvious only in hindsight. If
        any of that sounds useful, the{" "}
        <a
          href="/blog"
          className="hover:text-primary font-medium underline transition-colors"
        >
          writing section
        </a>{" "}
        is the place to start.
      </div>
    </div>
  );
};
