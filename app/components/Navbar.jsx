"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Stethoscope, Pill, Calendar, Home, LayoutDashboard, X, UserCircle, Moon, Sun, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollMenuOpen, setScrollMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const scrollMenuRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    setScrolled(window.scrollY > 80);
    setMobileMenuOpen(false);
    setScrollMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      if (window.scrollY <= 80) setScrollMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setDarkMode(saved);
    if (saved) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
      if (scrollMenuRef.current && !scrollMenuRef.current.contains(e.target)) {
        setScrollMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleModalOpen = (e) => {
      setModalOpen(e.detail.open);
      if (e.detail.open) {
        setMobileMenuOpen(false);
        setScrollMenuOpen(false);
      }
    };
    window.addEventListener("modalOpen", handleModalOpen);
    return () => window.removeEventListener("modalOpen", handleModalOpen);
  }, []);

  const handleMouseMove = (e) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));
  };

  const navItems = [
    { href: "/", icon: <Home size={18} />, label: "Home" },
    { href: "/doctors", icon: <Stethoscope size={18} />, label: "Doctors" },
    { href: "/pharmacy", icon: <Pill size={18} />, label: "Pharmacy" },
    { href: "/appointments", icon: <Calendar size={18} />, label: "Appointments" },
    { href: "/dashboard", icon: <UserCircle size={18} />, label: "Dashboard" },
  ];

  return (
    <div className="relative z-50">

      {/* ── FULL NAVBAR — shown when not scrolled ── */}
      {!scrolled && (
        <nav
          ref={navRef}
          onMouseMove={handleMouseMove}
          className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 w-[90vw] sm:w-[75vw] max-w-5xl z-50"
        >
          <div
            className="relative flex items-center justify-between px-4 sm:px-6 py-2 sm:py-3 rounded-full"
            style={{
              background: "linear-gradient(180deg, rgba(245,245,245,0.9) 0%, rgba(230,230,230,0.95) 100%)",
              backdropFilter: "blur(22px)",
              WebkitBackdropFilter: "blur(22px)",
              border: "1px solid rgba(255,255,255,0.55)",
              boxShadow: "0 8px 10px rgba(0,0,0,0.12), 0 22px 30px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.7)"
            }}
          >
            {/* Cursor reflection */}
            <div
              className="absolute inset-0 pointer-events-none rounded-full"
              style={{
                background: `radial-gradient(circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(255,255,255,0.65), transparent 45%)`,
                filter: "blur(32px)",
                opacity: 0.75
              }}
            />

            {/* Logo */}
            <div className="flex items-center gap-2 relative z-10">
              <Image src="/PRIMEHEALTH2.png" alt="PrimeHealth Logo" width={24} height={24} />
              <span className="font-bold text-blue-700 text-sm sm:text-base">PrimeHealth</span>
            </div>

            {/* Desktop nav items */}
            <div className="hidden sm:flex items-center gap-3 sm:gap-5 relative z-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex flex-col items-center justify-center transition-all duration-200 hover:scale-110
                    ${pathname === item.href ? "text-emerald-500 scale-110" : "text-blue-700 hover:text-emerald-500"}`}
                >
                  {item.icon}
                  <span className="text-[10px] font-medium leading-none max-h-0 overflow-hidden opacity-0 group-hover:max-h-4 group-hover:opacity-100 transition-all duration-200">
                    {item.label}
                  </span>
                </Link>
              ))}

              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className="flex flex-col items-center justify-center text-blue-700 hover:text-emerald-500 transition-all duration-200 hover:scale-110 group"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                <span className="text-[10px] font-medium leading-none max-h-0 overflow-hidden opacity-0 group-hover:max-h-4 group-hover:opacity-100 transition-all duration-200">
                  {darkMode ? "Light" : "Dark"}
                </span>
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden relative z-10 text-blue-700 hover:text-emerald-500 transition"
            >
              {mobileMenuOpen ? <X size={22} /> : <LayoutDashboard size={22} />}
            </button>
          </div>
        </nav>
      )}

      {/* ── SCROLLED MINI NAVBAR — shows dropdown on click ── */}
      {scrolled && (
        <div ref={scrollMenuRef} className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setScrollMenuOpen(!scrollMenuOpen)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
            style={{
              background: "linear-gradient(180deg, rgba(245,245,245,0.95) 0%, rgba(230,230,230,0.98) 100%)",
              backdropFilter: "blur(22px)",
              WebkitBackdropFilter: "blur(22px)",
              border: "1px solid rgba(255,255,255,0.55)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            }}
          >
            <Image src="/PRIMEHEALTH2.png" alt="Logo" width={20} height={20} />
            <ChevronDown
              size={16}
              className="text-blue-700 transition-transform duration-200"
              style={{ transform: scrollMenuOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>

          {/* Scroll dropdown menu */}
          {scrollMenuOpen && (
            <div className="absolute top-14 right-0 bg-white dark:bg-[#1e293b] rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700 py-3 w-52">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setScrollMenuOpen(false)}
                  className={`flex items-center gap-3 px-5 py-3 text-sm font-medium transition hover:bg-gray-50 dark:hover:bg-slate-700
                    ${pathname === item.href ? "text-emerald-500" : "text-blue-700 dark:text-blue-400"}`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}

              <div className="border-t border-gray-100 dark:border-slate-700 my-2" />

              <button
                onClick={() => { toggleDarkMode(); setScrollMenuOpen(false); }}
                className="flex items-center gap-3 px-5 py-3 text-sm font-medium transition hover:bg-gray-50 dark:hover:bg-slate-700 w-full text-blue-700 dark:text-blue-400"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mobile dropdown — shown when full navbar is visible */}
      {mobileMenuOpen && !scrolled && (
        <div
          ref={mobileMenuRef}
          className="fixed top-20 right-4 z-[9998] bg-white dark:bg-[#1e293b] rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700 py-3 w-52"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-5 py-3 text-sm font-medium transition hover:bg-gray-50 dark:hover:bg-slate-700
                ${pathname === item.href ? "text-emerald-500" : "text-blue-700 dark:text-blue-400"}`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}

          <div className="border-t border-gray-100 dark:border-slate-700 my-2" />

          <button
            onClick={() => { toggleDarkMode(); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 px-5 py-3 text-sm font-medium transition hover:bg-gray-50 dark:hover:bg-slate-700 w-full text-blue-700 dark:text-blue-400"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      )}

    </div>
  );
}