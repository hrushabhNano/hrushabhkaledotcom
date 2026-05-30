"use client";
import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { GENERAL_VARIANT, SPRING_CONFIG } from "@/lib/motion-config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DottedUnderline } from "./dotted-underline";

import { useTheme } from "next-themes";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { useEffect, useState } from "react";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const links = [
  { title: "Home", href: "/" },
  { title: "Blog", href: "/blog" },
  { title: "Uses", href: "/uses" },
  { title: "Favorites", href: "/favorites" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="mx-auto flex max-w-3xl flex-col items-start gap-4 px-4 pt-4 md:pt-8">
      <div className="flex items-center gap-2 perspective-distant">
        <motion.div
          variants={GENERAL_VARIANT}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={SPRING_CONFIG}
          className="rounded-md bg-white shadow-md dark:bg-neutral-800"
        >
          <Image
            src="/avatar.png"
            alt="Hrushabh Kale Avatar"
            width={40}
            height={40}
            className="aspect-square size-6 rounded-md shadow-2xl"
          />
        </motion.div>
        <h1 className="text-foreground text-xl font-medium tracking-tight md:text-2xl">
          Hrushabh Kale
        </h1>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          {links.map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative transition-colors",
                  active
                    ? "text-primary"
                    : "text-foreground/70 hover:text-primary",
                )}
              >
                {link.title}
                <DottedUnderline
                  className={cn(
                    "mask-x-from-90% transition-opacity duration-300",
                    active
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100",
                  )}
                />
              </Link>
            );
          })}
        </div>
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-foreground/70 hover:text-primary border-border bg-card/50 rounded-lg border p-1.5 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <IconSun size={16} /> : <IconMoon size={16} />}
          </button>
        )}
      </div>
    </nav>
  );
};
