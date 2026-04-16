"use client";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import SparklesPreview from "./welcome/page";

// Dynamic imports for heavy components to improve initial load time
const HeroSection = dynamic(() => import("./hero/page"), { loading: () => <div className="h-screen bg-background" /> });
const ImgSection = dynamic(() => import("./img/page"), { loading: () => <div className="h-[55dvh]" /> });
const SkillsPage = dynamic(() => import("./skills/page"), { loading: () => <div className="h-96 bg-background" /> });
const DraggableCardDemoComponent = dynamic(() => import("./project/page").then(mod => ({ default: mod.DraggableCardDemo })), { loading: () => <div className="h-96 bg-background" /> });
const ProgressWithLabel = dynamic(() => import("./skillspro/page"), { loading: () => <div className="h-96 bg-background" /> });
const SignupPage = dynamic(() => import("./signup/page"), { loading: () => <div className="h-96 bg-background" /> });
const PointerHighlightDemo = dynamic(() => import("./whoiam/page"), { loading: () => <div className="h-96 bg-background" /> });
const TypewriterEffectDemo = dynamic(() => import("./reviwe/page").then(mod => ({ default: mod.TypewriterEffectDemo })), { loading: () => <div className="h-96 bg-background" /> });

export default function FloatingNavDemo() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setShowWelcome(false);
    }, 2500);

    return () => clearTimeout(timerId);
  }, []);

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "About",
      link: "#about",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Skills",
      link: "#skills",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: "Projects",
      link: "#projects",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: "Contact",
      link: "#contact",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    
  ];

  if (showWelcome) {
    return <SparklesPreview />;
  }

  return (
    <div className="relative min-h-screen w-full translate-z-0 bg-background text-foreground">
      <FloatingNav navItems={navItems} />
      <Suspense fallback={<div className="h-[55dvh] bg-background" />}>
        <ImgSection/>
      </Suspense>
      <Suspense fallback={<div className="h-screen bg-background" />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<div className="h-96 bg-background" />}>
        <SkillsPage/>
      </Suspense>
      <Suspense fallback={<div className="h-96 bg-background" />}>
        <ProgressWithLabel/>
      </Suspense>
      <Suspense fallback={<div className="h-96 bg-background" />}>
        <PointerHighlightDemo/>
      </Suspense>
      <Suspense fallback={<div className="h-96 bg-background" />}>
        <TypewriterEffectDemo/>
      </Suspense>
      <Suspense fallback={<div className="h-96 bg-background" />}>
        <DraggableCardDemoComponent/>
      </Suspense>
      <Suspense fallback={<div className="h-96 bg-background" />}>
        <SignupPage/>
      </Suspense>

      <footer className="relative mt-16 border-t border-border bg-linear-to-b from-muted/40 to-background px-6 py-14 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-3">
            <p className="text-xs font-medium tracking-[0.24em] text-muted-foreground uppercase">
              Let us build something meaningful
            </p>
            <h2 className="max-w-3xl text-3xl leading-tight font-semibold md:text-4xl">
              Clean code, strong UI, and products users remember.
            </h2>
          </div>

          <div className="grid gap-8 border-y border-border py-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="mb-3 text-sm font-semibold">Pages</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#about" className="hover:text-foreground">About</a></li>
                <li><a href="#skills" className="hover:text-foreground">Skills</a></li>
                <li><a href="#projects" className="hover:text-foreground">Projects</a></li>
                <li><a href="#contact" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold">Feedback</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/reviwe" className="hover:text-foreground">
                    Send Feedback
                  </Link>
                </li>
                <li>
                  <Link href="/feedbachtemp" className="hover:text-foreground">
                    View Feedback
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold">Social</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-foreground"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-foreground"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-foreground"
                  >
                    X (Twitter)
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold">Reach Out</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="mailto:sanketkhule5@gmail.com" className="hover:text-foreground">
                    sanketkhule5@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+917887636352" className="hover:text-foreground">
                    +91 78876 36352
                  </a>
                </li>
                <li>Chhatrapati Sambhaji Nagar, Maharashtra</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Sanket Khule. All rights reserved.</p>
            <p>Built with Next.js + Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
