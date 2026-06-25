"use client";

import Navbar from "../components/Navbar";
import MedicalBackground from "../components/MedicalBackground";
import FAQPanel from "../components/FAQPanel";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import CartPanel from "../components/CartPanel";
import BackToTop from "../components/BackToTop";
import ChatBot from "../components/ChatBot";
import Onboarding from "../components/Onboarding";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";

export default function MainLayout({ children }) {
  const [faqOpen, setFaqOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const pathname = usePathname();

  const isPharmacy = pathname === "/pharmacy";
  const isDoctors = pathname === "/doctors";
  const isDashboard = pathname === "/dashboard";

  const showFAQ = (!isPharmacy && !isDoctors) || isDashboard;
  const showCart = isPharmacy;

  useEffect(() => {
    const isOnboarded = localStorage.getItem("onboarded");
    const isAuth = localStorage.getItem("authUser");
    if (isAuth && !isOnboarded) setShowOnboarding(true);
  }, []);

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
          style: { borderRadius: "10px", fontSize: "14px" },
          success: { style: { background: "#f0fdf4", color: "#166534", border: "1px solid #bbf7d0" } },
          error: { style: { background: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca" } },
        }}
      />

      {showOnboarding && <Onboarding onComplete={() => setShowOnboarding(false)} />}

      <FAQPanel open={faqOpen} onClose={() => setFaqOpen(false)} />
      <CartPanel open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* FAQ Button */}
      {showFAQ && !faqOpen && (
        <div className="fixed bottom-6 left-6 z-[9998]">
          <button
            onClick={() => setFaqOpen(true)}
            className="bg-white border-2 border-green-600 text-black font-bold text-sm w-12 h-12 rounded-md shadow-md hover:bg-green-50 transition"
          >
            FAQ
          </button>
        </div>
      )}

      {/* Cart Button */}
      {showCart && (
        <div className="fixed bottom-6 left-6 z-[9998]">
          <button
            onClick={() => setCartOpen(true)}
            className="bg-white border-2 border-blue-600 text-blue-600 font-bold text-sm w-12 h-12 rounded-md shadow-md hover:bg-blue-50 transition flex items-center justify-center relative"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      )}

      <BackToTop />
      <ChatBot />

      <main className="relative z-10 pt-32 px-4 sm:px-6 max-w-7xl mx-auto">
        <PageTransition>
          {children}
        </PageTransition>
      </main>

      <Footer />
    </>
  );
}