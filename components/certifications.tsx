import React from "react";
import Image from "next/image";
import { Subheading } from "./subheading";
import { cn } from "@/lib/utils";

const certItems = [
  {
    name: "SnowPro Core Certification",
    issuer: "Snowflake",
    image: "/certifications/snowflake.png",
  },
  {
    name: "Professional Cloud Database Engineer",
    issuer: "Google",
    image: "/certifications/google.png",
  },
  {
    name: "CI/CD With GitHub Actions",
    issuer: "codedamn",
    image: "/certifications/codedamn.png",
  },
  {
    name: "Applied Machine Learning in Python",
    issuer: "Coursera",
    image: "/certifications/coursera.png",
  },
  {
    name: "Applied Plotting, Charting & Data Representation in Python",
    issuer: "Coursera",
    image: "/certifications/coursera.png",
  },
  {
    name: "Introduction to Data Science in Python",
    issuer: "Coursera",
    image: "/certifications/coursera.png",
  },
];

export const Certifications = () => {
  return (
    <div>
      <Subheading>What I&apos;ve Learned</Subheading>
      <div className="mt-4 flex flex-col gap-6 md:gap-4">
        {certItems.map((item, idx) => {
          return (
            <div
              key={item.name + idx}
              className="-m-2 flex flex-col items-start gap-1 rounded-lg p-2 md:flex-row md:items-start"
            >
              <div className="mr-4 flex size-8 shrink-0 items-center justify-center rounded-lg shadow-sm ring-1 ring-neutral-200/50 ring-inset dark:ring-white/10 overflow-hidden bg-white">
                <Image 
                  src={item.image}
                  alt={item.issuer}
                  width={32}
                  height={32}
                  className="size-full object-contain"
                />
              </div>
              <div className="flex flex-1 flex-col md:grid md:grid-cols-[220px_1fr] md:items-start md:gap-4">
                <span className="text-foreground leading-snug font-medium md:pt-1">
                  {item.name}
                </span>
                <span className="text-foreground/70 text-sm leading-relaxed md:pt-1">
                  {item.issuer}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
