"use client";

import { useTheme } from "./theme-provider";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative inline-flex h-9 w-16 items-center rounded-full border border-white/10 bg-neutral-200 dark:bg-white/10 px-2 transition-colors hover:bg-neutral-300 dark:hover:bg-white/20"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-between px-2"
        animate={{}}
      >
        <Sun className="h-4 w-4 text-yellow-500" />
        <Moon className="h-4 w-4 text-blue-400" />
      </motion.div>

      <motion.div
        className="absolute h-7 w-7 rounded-full bg-white shadow-md dark:bg-neutral-900"
        animate={{
          x: theme === "dark" ? 24 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      />

      <div className="relative flex w-full items-center justify-between px-1">
        <span
          className={`text-xs font-medium ${
            theme === "light" ? "text-yellow-600" : "text-neutral-400"
          }`}
        >
          {theme === "light" ? "☀️" : ""}
        </span>
        <span
          className={`text-xs font-medium ${
            theme === "dark" ? "text-blue-300" : "text-neutral-400"
          }`}
        >
          {theme === "dark" ? "🌙" : ""}
        </span>
      </div>
    </motion.button>
  );
}
