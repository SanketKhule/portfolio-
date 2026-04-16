"use client";

import LogoLoop from "@/components/LogoLoop";
import { useTheme } from "@/components/theme-provider";
import {
    IconBrandBootstrap,
    IconBrandCss3,
    IconBrandGithub,
    IconBrandHtml5,
    IconBrandJavascript,
    IconBrandMongodb,
    IconBrandMysql,
    IconBrandNextjs,
    IconBrandNodejs,
    IconBrandPython,
    IconBrandReact,
    IconBrandRedux,
    IconBrandTailwind,
    IconBrandTypescript,
    IconBrandVercel,
    IconBrandVscode,
} from "@tabler/icons-react";

const techLogos = [
    { 
        node: <IconBrandHtml5 size={44} />, 
        title: "HTML5", 
        href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { 
        node: <IconBrandCss3 size={44} />, 
        title: "CSS", 
        href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    { 
        node: <IconBrandJavascript size={44} />, 
        title: "JavaScript", 
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { 
        node: <IconBrandReact size={44} />, 
        title: "React", 
        href: "https://react.dev" },
    { 
        node: <IconBrandRedux size={44} />, 
        title: "Redux", 
        href: "https://redux.js.org" },
    { 
        node: <IconBrandNextjs size={44} />, 
        title: "Next.js", 
        href: "https://nextjs.org" },
    { 
        node: <IconBrandNodejs size={44} />, 
        title: "Node.js", 
        href: "https://nodejs.org" },
    {
        node: <IconBrandTypescript size={44} />,
        title: "TypeScript",
        href: "https://www.typescriptlang.org",
    },
    {
        node: <IconBrandTailwind size={44} />,
        title: "Tailwind CSS",
        href: "https://tailwindcss.com",
    },
    {
        node: <IconBrandBootstrap size={44} />,
        title: "Bootstrap",
        href: "https://getbootstrap.com",
    },
    {
        node: <IconBrandMongodb size={44} />,
        title: "MongoDB",
        href: "https://www.mongodb.com",
    },
    {
        node: <IconBrandPython size={44} />,
        title: "Python",
        href: "https://www.python.org",
    },
    {
        node: <IconBrandGithub size={44} />,
        title: "GitHub",
        href: "https://github.com",
    },
    {
        node: <IconBrandVercel size={44} />,
        title: "Vercel",
        href: "https://vercel.com",
    },
    {
        node: <IconBrandVscode size={44} />,
        title: "VS Code",
        href: "https://code.visualstudio.com/",
    },
];

export default function SkillsPage() {
    const { theme } = useTheme();

    return (
        <section id="skills" className="relative overflow-hidden bg-white py-20 text-black dark:bg-black dark:text-white">
            <div className="max-w-9xl ">
                <div className="relative h-28 overflow-hidden bg-white dark:bg-black">
                    <LogoLoop
                        logos={techLogos}
                        speed={100}
                        direction="left"
                        logoHeight={60}
                        gap={60}
                        hoverSpeed={0}
                        scaleOnHover
                        fadeOut
                        fadeOutColor={theme === "dark" ? "#000000" : "#ffffff"}
                        ariaLabel="Technology skills"
                    />
                </div>
            </div>
        </section>
    );
    
}