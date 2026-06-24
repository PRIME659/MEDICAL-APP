"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, Printer } from "lucide-react";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const doctor = searchParams.get("doctor");
  const date = searchParams.get("date");
  const ref = searchParams.get("ref");

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center space-y-6">

        <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <CheckCircle size={40} className="text-green-600" />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Appointment Confirmed!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-md">
            Your appointment has been booked successfully. A confirmation has been sent and the doctor will review your request shortly.
          </p>
        </div>

        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 w-full max-w-md text-left space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Doctor</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Dr. {doctor}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Date</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{date}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Reference Number</span>
            <span className="text-sm font-bold" style={{ color: "#4dffa6", textShadow: "0 0 10px rgba(77,255,166,0.3)" }}>
              {ref}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <button
            onClick={() => window.print()}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 transition"
          >
            <Printer size={16} />
            Print
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-semibold transition"
          >
            Go to Dashboard
          </button>
        </div>

      </div>
    </ProtectedRoute>
  );
}