import React from "react";
import { LinkPreview } from "./link-preview";

export const Header = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-foreground text-base leading-[1.75] tracking-[0.015em]">
        I&apos;m a Full Stack Engineer and Tech Lead at{" "}
        <LinkPreview url="https://nanostuffs.com">
          Nanostuffs Technologies
        </LinkPreview>{" "}
        in Pune. Most of my work is enterprise software with an AI layer:
        WhatsApp automation, LangGraph agents, React Native apps running across
        multiple countries. I care a lot about the parts of a system that
        aren&apos;t visible until they break.
      </div>
      <div className="text-foreground text-base leading-[1.75] tracking-[0.015em]">
        I write about building with AI, the calls you make under real constraints,
        and what running a tech team at an Indian startup actually looks like from
        the inside.
      </div>
      <div className="text-foreground text-base leading-[1.75] tracking-[0.015em]">
        Open to conversations about AI systems, architecture, and speaking at
        meetups. Say hello or find me on{" "}
        <LinkPreview url="https://www.linkedin.com/in/hrushabh-kale/">
          LinkedIn
        </LinkPreview>{" "}
        and{" "}
        <LinkPreview url="https://x.com/hrushabh__k">
          X
        </LinkPreview>
        .
      </div>
    </div>
  );
};
