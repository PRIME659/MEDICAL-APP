"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { logoutUser } from "../lib/auth";

export default function Footer() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/landing");
  };

  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 py-8 mt-16 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} PrimeHealth. All rights reserved.</p>
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <Link href="/doctors" className="hover:text-blue-600 transition">Doctors</Link>
          <Link href="/pharmacy" className="hover:text-blue-600 transition">Pharmacy</Link>
          <Link href="/appointments" className="hover:text-blue-600 transition">Appointments</Link>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 hover:scale-105 transition text-sm"
        >
          Log Out
        </button>
      </div>
    </footer>
  );
}