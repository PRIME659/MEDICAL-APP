"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Stethoscope, Pill, Calendar, Home } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const navRef = useRef(null);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setDarkMode(saved);
  }, []);

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Cursor reflection tracking
  const handleMouseMove = (e) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPos({ x, y });
  };

  const navItems = [
    { href: "/doctors", icon: <Stethoscope size={18} /> },
    { href: "/pharmacy", icon: <Pill size={18} /> },
    { href: "/appointments", icon: <Calendar size={18} /> },

  ];

  return (
    <div className="relative z-50">

      {/* Navbar */}
      <nav
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        className={`flex items-center gap-6 fixed overflow-visible rounded-full transition-all duration-300 ease-in-out
          ${scrolled
            ? "top-6 right-16 md:right-20 left-auto"
            : "top-6 left-1/2 -translate-x-1/2"}
        `}
      >
        <div
          className={`relative overflow-visible flex items-center gap-6 px-6 py-3 rounded-full
            transition-all duration-300
            ${scrolled && !expanded
              ? "w-auto px-4 justify-center"
              : "w-[75vw] justify-between max-w-5xl"}
          `}
          style={{
            background: `linear-gradient(180deg, rgba(245,245,245,0.9) 0%, rgba(230,230,230,0.95) 100%)`,
            backdropFilter: "blur(22px)",
            WebkitBackdropFilter: "blur(22px)",
            border: "1px solid rgba(255,255,255,0.55)",
            boxShadow: `
              0 8px 10px rgba(0,0,0,0.12),
              0 22px 30px rgba(0,0,0,0.16),
              0 40px 70px rgba(0,0,0,0.18),
              0 80px 140px rgba(0,0,0,0.14),
              inset 0 1px 0 rgba(255,255,255,0.7)
            `
          }}
        >
          {/* Cursor reflection */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${cursorPos.x}px ${cursorPos.y}px,
                rgba(255,255,255,0.65),
                transparent 45%)`,
              filter: "blur(32px)",
              opacity: 0.75
            }}
          />

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 relative z-10">
            {scrolled && !expanded ? (
              <Home size={20} className="text-blue-700" />
            ) : (
              <>
                <Image
                  src="/PRIMEHEALTH2.png"
                  alt="PrimeHealth Logo"
                  width={28}
                  height={28}
                />
                <span className="font-bold text-blue-700">
                  PrimeHealth
                </span>
              </>
            )}
          </Link>

          {/* Nav icons */}
          <div className="flex items-center gap-5 relative z-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="
                  text-blue-700
                  flex items-center justify-center
                  transition-all duration-200
                  hover:scale-110
                  hover:text-emerald-500
                "
              >
                {item.icon}
              </Link>
            ))}

            <Link
              href="/auth"
              className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-full transition-all duration-200"
            >
              Login
            </Link>
            
          </div>
        </div>
      </nav>

      {/* Dark mode toggle */}
      <div
        onClick={() => {
          const newMode = !darkMode;
          setDarkMode(newMode);
          localStorage.setItem("darkMode", String(newMode));
        }}
        className="
    fixed
    bottom-6 right-4
    md:top-6 md:bottom-auto
    cursor-pointer
    w-10
    h-10
    flex
    items-center
    justify-center
    rounded-full
    bg-[#2d2d2d]
    hover:bg-[#333]
    transition-transform
    duration-300
    hover:scale-110
    active:scale-95
    z-50
  "
      >
        🌙
      </div>

    </div>
  );
}