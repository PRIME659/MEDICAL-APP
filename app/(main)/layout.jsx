"use client";

import Navbar from "../components/Navbar";
import MedicalBackground from "../components/MedicalBackground";
import FAQPanel from "../components/FAQPanel";
import { useState } from "react";

export default function MainLayout({ children }) {
  const [faqOpen, setFaqOpen] = useState(false);

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <MedicalBackground />
      </div>
      <Navbar />

      <FAQPanel open={faqOpen} onClose={() => setFaqOpen(false)} />

      {!faqOpen && (
        <div className="fixed bottom-6 left-6 z-[9999]">
          <button
            onClick={() => setFaqOpen(true)}
            className="bg-white border-2 border-green-600 text-black font-bold text-sm w-12 h-12 rounded-md shadow-md hover:bg-green-50 transition"
          >
            FAQ
          </button>
        </div>
      )}

      <main className="relative z-10 pt-32 px-6 max-w-7xl mx-auto">
        {children}
      </main>
    </>
  );
}
