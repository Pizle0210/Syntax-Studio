"use client";
import { useCodeEditorStore } from "@/store/use-code-editor-store";
import { useEffect, useRef, useState } from "react";
import { THEMES } from "../_constants";
import { motion, AnimatePresence } from "framer-motion";
import useMounted from "@/hooks/useMounted";
import { CircleOff, Cloud, Github, Laptop, Moon, Palette, Sun } from "lucide-react";

const THEME_ICONS: Record<string, React.ReactNode> = {
  "vs-dark": <Moon className="size-4" />,
  "vs-light": <Sun className="size-4" />,
  "github-dark": <Github className="size-4" />,
  monokai: <Laptop className="size-4" />,
  "solarized-dark": <Cloud className="size-4" />,
};
export default function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useMounted();
  const { theme, setTheme } = useCodeEditorStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentTheme = THEMES.find((t) => t.id === theme);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;
  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex w-48 items-center gap-2 rounded-lg border border-gray-800/50 bg-[#1e1e2e]/80 px-4 py-2.5 transition-all duration-200 hover:border-gray-700 hover:bg-[#262637]"
      >
        {/* hover state bg decorator */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100" />

        <Palette className="h-4 w-4 text-gray-400 transition-colors group-hover:text-gray-300" />

        <span className="min-w-[80px] text-left text-gray-300 transition-colors group-hover:text-white">
          {currentTheme?.label}
        </span>

        {/* color indicator */}

        <div
          className="relative h-4 w-4 rounded-full border border-gray-600 transition-colors group-hover:border-gray-500"
          style={{ background: currentTheme?.color }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full z-50 mt-2 w-full min-w-[240px] rounded-xl border border-[#313244] bg-[#1e1e2e]/95 py-2 shadow-2xl backdrop-blur-xl"
          >
            <div className="mb-2 border-b border-gray-800/50 px-2 pb-2">
              <p className="px-2 text-xs font-medium text-gray-400">
                Select Theme
              </p>
            </div>

            {THEMES.map((t, index) => (
              <motion.button
                key={t.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`group relative flex w-full items-center gap-3 px-3 py-2.5 transition-all duration-200 hover:bg-[#262637] ${theme === t.id ? "bg-blue-500/10 text-blue-400" : "text-gray-300"} `}
                onClick={() => setTheme(t.id)}
              >
                {/* bg gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100" />

                {/* icon */}
                <div
                  className={`flex size-8 items-center justify-center rounded-lg ${theme === t.id ? "bg-blue-500/10 text-blue-400" : "bg-gray-800/50 text-gray-400"} transition-all duration-200 group-hover:scale-110`}
                >
                  {THEME_ICONS[t.id] || <CircleOff className="h-4 w-4" />}
                </div>
                {/* label */}
                <span className="flex-1 text-left transition-colors group-hover:text-white">
                  {t.label}
                </span>

                {/* color indicator */}
                <div
                  className="relative size-4 rounded-full border border-gray-600 transition-colors group-hover:border-gray-500"
                  style={{ background: t.color }}
                />

                {/* active theme border */}
                {theme === t.id && (
                  <motion.div
                    className="absolute inset-0 rounded-lg border-2 border-blue-500/30"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
