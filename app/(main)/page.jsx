"use client";

import ProtectedRoute from "../components/ProtectedRoute";

export default function HomePage() {
  return (
    <ProtectedRoute>
      <div className="space-y-10">

        {/* Hero Section */}
        <section
          className="text-center py-12 sm:py-20 rounded-lg px-4"
          style={{
            background: "linear-gradient(135deg, #ffffff 50%, #4ade80 100%)",
            boxShadow: "0 8px 32px rgba(34, 197, 94, 0.25), 0 2px 8px rgba(34, 197, 94, 0.15), inset 0 1px 0 rgba(255,255,255,0.8)"
          }}
        >
          <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-black">
            Welcome to PrimeHealth
          </h1>
          <p className="text-black mb-6 max-w-2xl mx-auto text-sm sm:text-base">
            Find doctors, book appointments, and access pharmacy drugs easily.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <a href="/doctors" className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base">
              Find a Doctor
            </a>
            <a href="/pharmacy" className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition text-sm sm:text-base">
              Browse Pharmacy
            </a>
          </div>
        </section>

        {/* Medical Tips */}
        <section className="px-4">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Medical Tips
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Daily health tips will appear here using a medical tips API later.
          </p>
        </section>

      </div>
    </ProtectedRoute>
  );
}