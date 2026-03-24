"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ErrorBoundary({ error, reset }) {
  const router = useRouter();

  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-white dark:bg-gray-900">
      
      {/* Icon */}
      <p className="text-6xl mb-6">🏥</p>

      {/* Message */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Something Went Wrong
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-md mb-8">
        An unexpected error occurred. Our team has been notified. Please try again or go back to the homepage.
      </p>

      {/* Error details */}
      {error?.message && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-6 py-3 mb-8 max-w-md">
          <p className="text-red-600 dark:text-red-400 text-xs font-mono">{error.message}</p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={reset}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition text-sm"
        >
          Try Again
        </button>
        <button
          onClick={() => router.push("/")}
          className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-semibold px-6 py-2.5 rounded-lg transition text-sm"
        >
          Go Home
        </button>
      </div>

    </div>
  );
}