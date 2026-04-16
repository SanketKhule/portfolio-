"use client";
import React, { useState } from "react";
import type { JSX } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";

export const FloatingNav = ({
  navItems,
  className,
}: {  
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "fixed inset-x-0 top-3 z-50 flex w-full items-center justify-center px-2 sm:top-5",
          className
        )}
      >
        <div className="bg-black flex w-full max-w-[calc(100vw-1rem)] items-center justify-center gap-2 overflow-x-auto rounded-full border border-white/10 px-2 py-1.5 shadow-lg shadow-black/10 backdrop-blur-md sm:w-auto sm:max-w-fit">
          {/* Nav items container */}
          <div className="flex min-w-max items-center gap-1">
            {navItems.map((navItem, idx: number) => (
              <a
                key={`link-${idx}`}
                href={navItem.link}
                className={cn(
                  "relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
                )}
              >
                <span className="block sm:hidden">{navItem.icon}</span>
                <span className="hidden sm:block">{navItem.name}</span>
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden h-5 w-px bg-white/10 sm:block" />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Divider */}
          <div className="hidden h-5 w-px bg-neutral-200 sm:block dark:bg-white/10" />

          {/* CTA Button */}
          <Link href="https://wa.me/917887636352" className="relative hidden rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-neutral-800 hover:shadow-lg hover:shadow-neutral-900/20 sm:block">
            Hire Me
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
