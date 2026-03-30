"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageContext";
import { Globe } from "lucide-react";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "yo", label: "Yorùbá", flag: "🇳🇬" },
  { code: "ha", label: "Hausa", flag: "🇳🇬" },
  { code: "ig", label: "Igbo", flag: "🇳🇬" },
];

export default function LanguageToggle({ inline = false }) {
  const { language, changeLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const current = languages.find((l) => l.code === language);

  return (
    <div className={`relative ${inline ? "" : "fixed bottom-20 right-4 md:top-6 md:bottom-auto md:right-28 z-50"}`}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 rounded-full bg-[#2d2d2d] hover:bg-[#333] text-white text-xs font-medium transition-all duration-200 hover:scale-105
          ${inline ? "px-4 py-2" : "w-10 h-10 justify-center"}`}
      >
        <Globe size={16} />
        {inline && <span>{current?.flag} {current?.label}</span>}
      </button>

      {open && (
        <div className={`absolute ${inline ? "top-12 left-0" : "bottom-12 right-0 md:bottom-auto md:top-12"} bg-white dark:bg-[#1e293b] rounded-xl shadow-2xl border border-gray-100 dark:border-slate-700 py-2 w-44 z-[9999] animate-dropdown`}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => { changeLanguage(lang.code); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition hover:bg-gray-50 dark:hover:bg-slate-700
                ${language === lang.code ? "text-emerald-500 font-semibold" : "text-gray-700 dark:text-gray-300"}`}
            >
              <span>{lang.flag}</span>
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}