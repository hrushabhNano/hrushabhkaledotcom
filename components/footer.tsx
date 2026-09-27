"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Container from "./container";
import { LinkPreview } from "./link-preview";
import { Signature } from "./signature";

export const Footer = () => {
  const isHome = usePathname() === "/";

  return (
    <Container className="pb-10">
      <footer className="my-8 flex flex-col items-center gap-4">
        <Signature />
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-foreground/40 text-center text-sm text-balance">
            Hrushabh Kale &middot; Pune, India &middot; 2026
          </p>
          {isHome ? (
            <p className="text-foreground/40 text-center text-sm text-balance">
              Inspired by{" "}
              <LinkPreview url="https://manuarora.in">Manu Arora</LinkPreview>{" "}
              and{" "}
              <LinkPreview url="https://designerdada.com">
                Akash Bhadange
              </LinkPreview>
              .
            </p>
          ) : null}
        </div>
      </footer>
    </Container>
  );
};
