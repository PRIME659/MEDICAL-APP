"use client";

import { X, Plus, Minus, ShoppingCart, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function CartPanel({ open, onClose, cartItems, onIncrease, onDecrease, onRemove }) {
  const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    toast.success("Order placed successfully! We will contact you shortly.", { duration: 5000 });
    cartItems.forEach((item) => onRemove(item.name));
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div className="fixed inset-0 z-[9998] bg-black/30 backdrop-blur-sm" onClick={onClose} />
      )}

      {/* Sliding Panel */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-full z-[9999] bg-white dark:bg-[#0f172a] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col
        ${open ? "translate-x-0" : "translate-x-full"}
      `}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} className="text-blue-600" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Your Cart</h2>
            {cartItems.length > 0 && (
              <span className="bg-blue-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-white text-xl font-bold">
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <ShoppingCart size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 font-medium">Your cart is empty</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Add medications from the pharmacy</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.name} className="bg-gray-50 dark:bg-[#1e293b] rounded-xl border border-gray-100 dark:border-slate-700 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-sm font-semibold dark:text-white" style={{ color: "#4dffa6", textShadow: "0 0 10px rgba(77,255,166,0.3)" }}>
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.category}</p>
                    <p className="text-sm font-bold text-green-600 mt-1">{item.price}</p>
                  </div>
                  <button
                    onClick={() => onRemove(item.name)}
                    className="text-red-400 hover:text-red-600 transition ml-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Quantity controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onDecrease(item.name)}
                    className="w-8 h-8 rounded-full flex items-center justify-center border border-red-400 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-bold text-gray-900 dark:text-white w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onIncrease(item.name)}
                    className="w-8 h-8 rounded-full flex items-center justify-center border border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition"
                  >
                    <Plus size={14} />
                  </button>
                  <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">
                    {item.quantity} {item.quantity === 1 ? "pack" : "packs"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total items</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">{total} packs</p>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => { cartItems.forEach((item) => onRemove(item.name)); }}
              className="w-full border border-red-400 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-semibold py-2.5 rounded-xl text-sm transition"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}