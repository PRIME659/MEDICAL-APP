"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";

function generateRef() {
  return "PH-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [ref] = useState(generateRef());

  const name = searchParams.get("name");
  const doctor = searchParams.get("doctor");
  const date = searchParams.get("date");
  const email = searchParams.get("email");

  useEffect(() => {
    if (!name || !doctor || !date) {
      router.replace("/appointments");
    }
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-2xl w-full max-w-md p-8 text-center border border-gray-100 dark:border-slate-700">

          {/* Success icon */}
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✅</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Appointment Confirmed!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            Your appointment has been successfully booked.
          </p>

          {/* Reference number */}
          <div className="bg-blue-50 dark:bg-[#0f172a] rounded-xl p-4 mb-6">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Reference Number</p>
            <p className="text-2xl font-bold text-blue-600 tracking-widest">{ref}</p>
          </div>

          {/* Booking details */}
          <div className="space-y-3 text-left mb-8">
            <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-slate-700">
              <span className="text-sm text-gray-500 dark:text-gray-400">Patient</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{name}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-slate-700">
              <span className="text-sm text-gray-500 dark:text-gray-400">Doctor</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{doctor}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-slate-700">
              <span className="text-sm text-gray-500 dark:text-gray-400">Date</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{date}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Email</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{email}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => router.push("/appointments")}
              className="flex-1 py-2.5 rounded-xl border border-blue-600 text-blue-600 dark:text-blue-400 font-semibold text-sm hover:bg-blue-50 dark:hover:bg-slate-700 transition"
            >
              Book Another
            </button>
            <button
              onClick={() => router.push("/")}
              className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition"
            >
              Go Home
            </button>
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}