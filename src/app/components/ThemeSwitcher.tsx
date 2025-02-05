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
    <div className="transition-all duration-500 ease-in-out">
      <div className="flex space-x-6">
        {/* Render Light Mode button only if the current theme is dark */}
        {theme === "dark" ? (
          <button
            onClick={() => setTheme("light")}
            className="p-3 bg-blue-500 text-white rounded-full transition-transform transform hover:scale-105 hover:bg-blue-600"
          >
            <SunIcon className="h-6 w-6" />
          </button>
        ) : (
          // Render Dark Mode button only if the current theme is light
          <button
            onClick={() => setTheme("dark")}
            className="p-3 bg-gray-800 text-white rounded-full transition-transform transform hover:scale-105 hover:bg-gray-700"
          >
            <MoonIcon className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  );
}
