"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PharmacistProtectedRoute from "../../components/PharmacistProtectedRoute";
import {
  LayoutDashboard, Pill, Package, AlertTriangle,
  LogOut, ShoppingBag, Search
} from "lucide-react";
import toast from "react-hot-toast";
import { pharmacistAPI } from "../../lib/api";
import { logoutUser } from "../../lib/auth";

const neonGreen = { color: "#4dffa6", textShadow: "0 0 15px rgba(77,255,166,0.4), 0 0 30px rgba(59,130,246,0.3)" };
const neonBlue = { color: "#00cfff", textShadow: "0 0 10px rgba(0,207,255,0.4)" };

export default function PharmacistDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);
  const [drugs, setDrugs] = useState([]);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [stockEdits, setStockEdits] = useState({});

  const fetchDashboard = async () => {
    try {
      const data = await pharmacistAPI.dashboard();
      setDashboard(data);
    } catch (err) { console.error(err); }
  };

  const fetchDrugs = async (searchTerm = "") => {
    try {
      const data = await pharmacistAPI.drugs(searchTerm ? { search: searchTerm } : {});
      setDrugs(data);
    } catch (err) { console.error(err); }
  };

  const fetchOrders = async () => {
    try {
      const data = await pharmacistAPI.orders();
      setOrders(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([fetchDashboard(), fetchDrugs(), fetchOrders()]);
      setLoading(false);
    };
    init();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/landing");
  };

  const handleStockUpdate = async (drugId) => {
    const newStock = stockEdits[drugId];
    if (newStock === undefined || newStock === "") return;

    try {
      await pharmacistAPI.updateStock(drugId, parseInt(newStock));
      toast.success("Stock updated successfully.");
      fetchDrugs(search);
      fetchDashboard();
      setStockEdits({ ...stockEdits, [drugId]: undefined });
    } catch (err) {
      toast.error(err.data?.error || "Failed to update stock.");
    }
  };

  const handleOrderUpdate = async (orderId, status) => {
    try {
      await pharmacistAPI.updateOrder(orderId, { status });
      toast.success(`Order marked as ${status}.`);
      fetchOrders();
      fetchDashboard();
      fetchDrugs(search);
    } catch (err) {
      toast.error(err.data?.error || "Failed to update order.");
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={16} /> },
    { id: "inventory", label: "Inventory", icon: <Pill size={16} /> },
    { id: "orders", label: "Orders", icon: <ShoppingBag size={16} /> },
  ];

  if (loading) {
    return (
      <PharmacistProtectedRoute>
        <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f172a" }}>
          <p className="text-slate-400">Loading dashboard...</p>
        </div>
      </PharmacistProtectedRoute>
    );
  }

  return (
    <PharmacistProtectedRoute>
      <div className="min-h-screen" style={{ background: "#0f172a" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">

          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold" style={neonGreen}>
                Pharmacist Dashboard
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Manage inventory and drug orders
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition"
            >
              <LogOut size={16} />
              Log Out
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition
                  ${activeTab === tab.id ? "text-white" : "text-slate-400 border border-white/10 hover:bg-white/5"}`}
                style={activeTab === tab.id ? { background: "linear-gradient(135deg, #3b82f6, #10b981)" } : {}}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && dashboard && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: "Total Drugs", value: dashboard.stats.total_drugs, icon: <Pill size={20} /> },
                  { label: "Low Stock", value: dashboard.stats.low_stock, icon: <AlertTriangle size={20} /> },
                  { label: "Out of Stock", value: dashboard.stats.out_of_stock, icon: <AlertTriangle size={20} /> },
                  { label: "Pending Orders", value: dashboard.stats.pending_orders, icon: <ShoppingBag size={20} /> },
                  { label: "Processing Orders", value: dashboard.stats.processing_orders, icon: <Package size={20} /> },
                  { label: "Dispensed Orders", value: dashboard.stats.dispensed_orders, icon: <ShoppingBag size={20} /> },
                ].map((stat, i) => (
                  <div key={i} className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="flex items-center justify-between mb-2">
                      <span style={{ color: "#00cfff" }}>{stat.icon}</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Low stock alert */}
              <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: "#ef4444" }}>
                  <AlertTriangle size={16} /> Low Stock Drugs
                </h3>
                {dashboard.low_stock_drugs.length > 0 ? (
                  <div className="space-y-2">
                    {dashboard.low_stock_drugs.map((drug) => (
                      <div key={drug.id} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                        <p className="text-sm text-white">{drug.name}</p>
                        <span className="text-xs px-2 py-1 rounded-full bg-red-900/30 text-red-400 font-semibold">
                          {drug.stock} left
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm">All drugs well stocked.</p>
                )}
              </div>

              {/* Recent orders */}
              <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 className="text-sm font-bold mb-4" style={neonBlue}>Recent Orders</h3>
                {dashboard.recent_orders.length > 0 ? (
                  <div className="space-y-2">
                    {dashboard.recent_orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                        <div>
                          <p className="text-sm font-semibold text-white">Order #{order.id} — {order.user_name}</p>
                          <p className="text-xs text-slate-400">₦{order.total_amount}</p>
                        </div>
                        <span className="text-xs px-3 py-1 rounded-full font-medium capitalize bg-blue-900/30 text-blue-400">
                          {order.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm">No orders yet.</p>
                )}
              </div>
            </div>
          )}

          {/* Inventory Tab */}
          {activeTab === "inventory" && (
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search drugs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && fetchDrugs(search)}
                    className="w-full rounded-lg pl-9 pr-3 py-2 text-sm bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                </div>
                <button
                  onClick={() => fetchDrugs(search)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition"
                  style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)" }}
                >
                  Search
                </button>
              </div>

              <div className="space-y-2">
                {drugs.map((drug) => (
                  <div key={drug.id} className="flex items-center justify-between p-4 rounded-xl flex-wrap gap-3" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#4dffa6" }}>{drug.name}</p>
                      <p className="text-xs" style={{ color: "#00cfff" }}>{drug.category}</p>
                      <p className="text-xs text-slate-400 mt-0.5">₦{drug.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${drug.stock <= 10 ? "bg-red-900/30 text-red-400" : "bg-green-900/30 text-green-400"}`}>
                        {drug.stock} in stock
                      </span>
                      <input
                        type="number"
                        min="0"
                        placeholder="New stock"
                        value={stockEdits[drug.id] ?? ""}
                        onChange={(e) => setStockEdits({ ...stockEdits, [drug.id]: e.target.value })}
                        className="w-24 rounded-lg px-2 py-1.5 text-sm bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => handleStockUpdate(drug.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition"
                        style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)" }}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                ))}
                {drugs.length === 0 && (
                  <p className="text-slate-400 text-sm text-center py-8">No drugs found.</p>
                )}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-3">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order.id} className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                      <div>
                        <p className="text-sm font-semibold text-white">Order #{order.id} — {order.user_name}</p>
                        <p className="text-xs text-slate-400">₦{order.total_amount} • {new Date(order.created_at).toLocaleDateString()}</p>
                        {order.prescription_ref && (
                          <p className="text-xs text-slate-500">Prescription: {order.prescription_ref}</p>
                        )}
                      </div>
                      <span className="text-xs px-3 py-1 rounded-full font-medium capitalize bg-blue-900/30 text-blue-400">
                        {order.status}
                      </span>
                    </div>

                    {/* Items */}
                    <div className="mb-3 p-3 rounded-xl space-y-1" style={{ background: "rgba(255,255,255,0.03)" }}>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm text-slate-300">
                          <span>{item.drug_name} x{item.quantity}</span>
                          <span>₦{item.total}</span>
                        </div>
                      ))}
                    </div>

                    {(order.status === "pending" || order.status === "processing") && (
                      <div className="flex gap-2 flex-wrap">
                        {order.status === "pending" && (
                          <button
                            onClick={() => handleOrderUpdate(order.id, "processing")}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-blue-500 text-blue-400 hover:bg-blue-900/20 transition"
                          >
                            Mark Processing
                          </button>
                        )}
                        <button
                          onClick={() => handleOrderUpdate(order.id, "dispensed")}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-green-500 text-green-400 hover:bg-green-900/20 transition"
                        >
                          Mark Dispensed
                        </button>
                        <button
                          onClick={() => handleOrderUpdate(order.id, "cancelled")}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-red-500 text-red-400 hover:bg-red-900/20 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-sm text-center py-8">No orders yet.</p>
              )}
            </div>
          )}

        </div>
      </div>
    </PharmacistProtectedRoute>
  );
}