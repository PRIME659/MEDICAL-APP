"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Stethoscope, Pill, Calendar, Home } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const navRef = useRef(null);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

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
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        className={`flex items-center gap-6 fixed transition-all duration-300 ease-in-out
          ${scrolled
            ? "top-4 right-16 md:right-20 left-auto"
            : "top-4 left-1/2 -translate-x-1/2"}
        `}
      >
        <div
          className={`flex items-center gap-6 px-6 py-3 rounded-full shadow-lg
            backdrop-blur-md transition-all duration-300
            ${scrolled && !expanded
              ? "w-auto px-4 justify-center"
              : "w-[75vw] justify-between max-w-5xl"}
          `}
          style={{
            background: "rgba(245, 247, 250, 0.65)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(180, 180, 180, 0.35)",
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {scrolled && !expanded ? (
              <Home size={20} className="text-blue-700" />
            ) : (
              <>
                <Image
                  src="/PRIMEHEALTH2.png"
                  alt="PrimeHealth Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
                <span className="font-bold text-blue-700">
                  PrimeHealth
                </span>
              </>
            )}
          </Link>

          {/* Nav Items */}
          <div className="flex items-center gap-5">
            {navItems.map((item) => (
              <MobileNavItem key={item.href} {...item} />
            ))}
          </div>
        </div>
      </nav>

      {/* Standalone Dark Mode Toggle */}
      <div
        onClick={() => setDarkMode(!darkMode)}
        className="
          fixed
          top-6
          right-4
          cursor-pointer
          w-10
          h-10
          flex
          items-center
          justify-center
          transition-transform
          duration-300
          hover:scale-110
          active:scale-95
          z-50
        "
      >
        <Image
          src="/yin_yang_moon-removebg-preview.png"
          alt="Toggle Dark Mode"
          width={40}
          height={40}
          className="object-contain"
        />
      </div>

    </div>
  );
}

// MobileNavItem
function MobileNavItem({ href, icon }) {
  return (
    <Link
      href={href}
      className="text-blue-700 flex items-center justify-center"
    >
      {icon}
    </Link>
  );
}
