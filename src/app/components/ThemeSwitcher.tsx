"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid"; // Import icon

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Don't render anything until mounted

  return (
    <div className="flex space-x-6">
      {/* Render Light Mode button only if the current theme is dark */}
      {theme === "dark" ? (
        <button
          onClick={() => setTheme("light")}
          className="p-3 text-white rounded-full transition-transform transform hover:scale-125"
        >
          <SunIcon className="h-6 w-6" />
        </button>
      ) : (
        // Render Dark Mode button only if the current theme is light
        <button
          onClick={() => setTheme("dark")}
          className="p-3 text-dark rounded-full transition-transform transform hover:scale-125"
        >
          <MoonIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
