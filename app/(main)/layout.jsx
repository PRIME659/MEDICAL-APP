"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import MedicalBackground from "../components/MedicalBackground";
import FAQPanel from "../components/FAQPanel";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import CartPanel from "../components/CartPanel";
import BackToTop from "../components/BackToTop";
import { Toaster } from "react-hot-toast";
import { ShoppingCart } from "lucide-react";

export default function MainLayout({ children }) {
  const [faqOpen, setFaqOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
    const handleAddToCart = (e) => addToCart(e.detail);
    window.addEventListener("addToCart", handleAddToCart);
    return () => window.removeEventListener("addToCart", handleAddToCart);
  }, []);

  const addToCart = (drug) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.name === drug.name);
      if (existing) {
        return prev.map((i) => i.name === drug.name ? { ...i, quantity: i.quantity + drug.quantity } : i);
      }
      return [...prev, drug];
    });
  };

  const increaseQty = (name) => {
    setCartItems((prev) => prev.map((i) => i.name === name ? { ...i, quantity: i.quantity + 1 } : i));
  };

  const decreaseQty = (name) => {
    setCartItems((prev) => prev.map((i) => i.name === name
      ? i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i
      : i
    ).filter((i) => i.quantity > 0));
  };

  const removeFromCart = (name) => {
    setCartItems((prev) => prev.filter((i) => i.name !== name));
  };



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

      <FAQPanel open={faqOpen} onClose={() => setFaqOpen(false)} />
      <CartPanel
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        onRemove={removeFromCart}
      />

      {/* FAQ Button */}
      {!faqOpen && !cartOpen && (
        <div className="fixed bottom-6 left-6 z-[9999]">
          <button
            onClick={() => setFaqOpen(true)}
            className="bg-white border-2 border-green-600 text-black font-bold text-sm w-12 h-12 rounded-md shadow-md hover:bg-green-50 transition"
          >
            FAQ
          </button>
        </div>
      )}

      {/* Cart Button */}
      <div className="fixed bottom-6 left-24 z-[9999]">
        <button
          onClick={() => setCartOpen(true)}
          className="bg-white border-2 border-blue-600 text-blue-600 font-bold text-sm w-12 h-12 rounded-md shadow-md hover:bg-blue-50 transition flex items-center justify-center relative"
        >
          <ShoppingCart size={20} />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>

      <BackToTop />

      <main className="relative z-10 pt-32 px-4 sm:px-6 max-w-7xl mx-auto">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
    </>
  );
}