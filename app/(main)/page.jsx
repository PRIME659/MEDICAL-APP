"use client";

import ProtectedRoute from "../components/ProtectedRoute";
import { useLanguage } from "../components/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <ProtectedRoute>
      <div className="space-y-16">

        {/* Hero Section */}
        <section
          className="text-center py-12 sm:py-20 rounded-lg px-4"
          style={{
            background: "linear-gradient(135deg, #ffffff 50%, #4ade80 100%)",
            boxShadow: "0 8px 32px rgba(34, 197, 94, 0.25), 0 2px 8px rgba(34, 197, 94, 0.15), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
        >
          <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-black">
            {t("welcome")}
          </h1>
          <p className="text-black mb-6 max-w-2xl mx-auto text-sm sm:text-base">
            {t("tagline")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <a href="/doctors" className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
              {t("findDoctor")}
            </a>
            <a href="/pharmacy" className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition">
              {t("browsePharmacy")}
            </a>
          </div>
        </section>

        {/* 1. General Consultation */}
        <section className="grid md:grid-cols-2 gap-8 items-center px-4">
          <div className="relative group overflow-hidden rounded-2xl">
            <img
              src="/images/consultation.png"
              alt="General Consultation"
              className="w-full h-[300px] object-cover rounded-2xl transition duration-500 group-hover:scale-105 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/10 backdrop-blur-sm border-t border-white/20 rounded-b-2xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              General Consultation
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Connect with experienced doctors for accurate diagnosis and personalized care.
            </p>
          </div>
        </section>

        {/* 2. Eye Care */}
        <section className="grid md:grid-cols-2 gap-8 items-center px-4">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              Eye Care & Vision Testing
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Advanced eye testing and vision care with modern equipment.
            </p>
          </div>
          <div className="relative group overflow-hidden rounded-2xl order-1 md:order-2">
            <img
              src="/images/eye-care.png"
              alt="Eye Care"
              className="w-full h-[300px] object-cover rounded-2xl transition duration-500 group-hover:scale-105 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/10 backdrop-blur-sm border-t border-white/20 rounded-b-2xl" />
          </div>
        </section>

        {/* 3. Therapy */}
        <section className="grid md:grid-cols-2 gap-8 items-center px-4">
          <div className="relative group overflow-hidden rounded-2xl">
            <img
              src="/images/therapy.png"
              alt="Therapy"
              className="w-full h-[300px] object-cover rounded-2xl transition duration-500 group-hover:scale-105 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/10 backdrop-blur-sm border-t border-white/20 rounded-b-2xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
              Therapy & Mental Wellness
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Professional therapy sessions in a safe and supportive environment.
            </p>
          </div>
        </section>

        {/* 4. Laboratory */}
        <section className="grid md:grid-cols-2 gap-8 items-center px-4">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-green-600 bg-clip-text text-transparent">
              Laboratory Testing
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Fast and accurate lab tests including blood and sugar diagnostics.
            </p>
          </div>
          <div className="relative group overflow-hidden rounded-2xl order-1 md:order-2">
            <img
              src="/images/lab.png"
              alt="Laboratory"
              className="w-full h-[300px] object-cover rounded-2xl transition duration-500 group-hover:scale-105 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/10 backdrop-blur-sm border-t border-white/20 rounded-b-2xl" />
          </div>
        </section>

        {/* Medical Tips */}
        <section className="px-4">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            {t("medicalTips")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            {t("medicalTipsDesc")}
          </p>
        </section>

      </div>
    </ProtectedRoute>
  );
}