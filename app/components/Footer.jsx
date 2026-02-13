"use client";

import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  const handleLogout = () => {
    try {
      // Remove authentication data
      localStorage.removeItem("authUser");

      // Optional: clear everything if you store more later
      // localStorage.clear();

      // Force redirect and prevent back navigation
      router.replace("/auth");

      // Ensure UI resets properly
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <footer className="bg-[var(--white)] border-t border-[var(--border-light)] py-8 mt-16 transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4 text-sm text-[var(--text-light)]">
        
        <p>
          © {new Date().getFullYear()} HealthCare Booking App
        </p>

        {/* Noticeable Logout Button */}
        <button
          onClick={handleLogout}
          className="
            px-6 py-2
            rounded-lg
            bg-red-600
            text-white
            font-semibold
            shadow-lg
            hover:bg-red-700
            hover:scale-105
            transition
          "
        >
          Log Out
        </button>
      </div>
    </footer>
  );
}
