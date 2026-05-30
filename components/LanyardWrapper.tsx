"use client";

import dynamic from "next/dynamic";

const Lanyard = dynamic(() => import("./lanyard"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full animate-pulse rounded-lg bg-neutral-50 md:h-[500px] dark:bg-neutral-900/50" />
  ),
});

export default function LanyardWrapper() {
  return <Lanyard />;
}
