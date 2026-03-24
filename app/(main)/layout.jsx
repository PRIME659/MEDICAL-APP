"use client";

import Navbar from "../components/Navbar";
import MedicalBackground from "../components/MedicalBackground";
import FAQPanel from "../components/FAQPanel";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import BackToTop from "../components/BackToTop";

export default function MainLayout({ children }) {
  const [faqOpen, setFaqOpen] = useState(false);

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <MedicalBackground />
      </div>
      <Navbar />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "10px",
            fontSize: "14px",
          },
          success: {
            style: {
              background: "#f0fdf4",
              color: "#166534",
              border: "1px solid #bbf7d0",
            },
          },
          error: {
            style: {
              background: "#fef2f2",
              color: "#991b1b",
              border: "1px solid #fecaca",
            },
          },
        }}
      />

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

      <BackToTop/>

      <main className="relative z-10 pt-32 px-4 sm:px-6 max-w-7xl mx-auto">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
    </>
  );
}