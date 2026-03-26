"use client";

import { useEffect, useRef, useState } from "react";
import { X, Plus, Minus, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

export default function PharmacyModal({ drug, onClose, onAddToCart }) {
  const modalRef = useRef(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("modalOpen", { detail: { open: true } }));
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.dispatchEvent(new CustomEvent("modalOpen", { detail: { open: false } }));
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  if (!drug) return null;

  const handleAddToCart = () => {
    setAdding(true);
    onAddToCart({ ...drug, quantity });
    toast.success(`${quantity}x ${drug.name} added to cart!`, { duration: 3000 });
    setTimeout(() => setAdding(false), 600);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div ref={modalRef} className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">

        {/* Header image */}
        <div className="relative w-full h-44 bg-blue-50 dark:bg-[#0f172a] rounded-t-2xl flex items-center justify-center">
          <span className="text-6xl">💊</span>
          <button onClick={onClose} className="absolute top-3 right-3 bg-white/80 dark:bg-[#1e293b]/80 hover:bg-white dark:hover:bg-[#1e293b] text-gray-700 dark:text-white rounded-full p-1.5 transition">
            <X size={18} />
          </button>
          <div className="absolute bottom-3 left-3">
            <span className="text-xs px-3 py-1 rounded-full font-semibold bg-green-100 text-green-700">In Stock</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">

          {/* Name & Category */}
          <div>
            <h2 className="text-xl font-bold" style={{ color: "#4dffa6", textShadow: "0 0 15px rgba(77,255,166,0.4), 0 0 30px rgba(59,130,246,0.3)" }}>
              {drug.name}
            </h2>
            <p className="text-sm font-medium mt-0.5" style={{ color: "#00cfff" }}>{drug.category}</p>
          </div>

          {/* Price */}
          <div className="bg-gray-50 dark:bg-[#0f172a] rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Price</p>
              <p className="text-2xl font-bold text-green-600">{drug.price}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Category</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{drug.category}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold mb-2" style={{ color: "#00cfff" }}>Description</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {drug.name} is a pharmaceutical product classified under {drug.category}. It is used in the treatment and management of related medical conditions. Always consult your doctor or pharmacist before use.
            </p>
          </div>

          {/* Dosage */}
          <div>
            <h3 className="text-sm font-bold mb-2" style={{ color: "#00cfff" }}>Dosage Information</h3>
            <div className="space-y-2">
              {[
                { label: "Adults", value: "1-2 tablets every 8 hours or as prescribed" },
                { label: "Children", value: "Consult a physician before administering" },
                { label: "Max Daily Dose", value: "Do not exceed 6 tablets per day" },
                { label: "Storage", value: "Store below 25°C away from sunlight" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 bg-gray-50 dark:bg-[#0f172a] rounded-lg p-3">
                  <span className="text-xs font-semibold w-24 shrink-0" style={{ color: "#00cfff" }}>{item.label}</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity selector */}
          <div>
            <h3 className="text-sm font-bold mb-3" style={{ color: "#00cfff" }}>Quantity</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-full border flex items-center justify-center transition border-red-400 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Minus size={14} />
              </button>
              <span className="text-lg font-bold text-gray-900 dark:text-white w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 rounded-full border flex items-center justify-center transition border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
              >
                <Plus size={14} />
              </button>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                {quantity} {quantity === 1 ? "pack" : "packs"} selected
              </span>
            </div>
          </div>

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-3 rounded-xl text-white font-semibold text-sm transition flex items-center justify-center gap-2 ${adding ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            <ShoppingCart size={16} />
            {adding ? "Added!" : `Add ${quantity} to Cart`}
          </button>

        </div>
      </div>
    </div>
  );
}