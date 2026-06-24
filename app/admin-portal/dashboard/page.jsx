"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminProtectedRoute from "../../components/AdminProtectedRoute";
import {
  LayoutDashboard, Users, Stethoscope, Calendar, Pill,
  LogOut, TrendingUp, AlertTriangle, ToggleLeft, ToggleRight,
  Plus, Trash2, Edit
} from "lucide-react";
import toast from "react-hot-toast";
import { adminAPI } from "../../lib/api";
import { logoutUser } from "../../lib/auth";

const neonGreen = { color: "#4dffa6", textShadow: "0 0 15px rgba(77,255,166,0.4), 0 0 30px rgba(59,130,246,0.3)" };
const neonBlue = { color: "#00cfff", textShadow: "0 0 10px rgba(0,207,255,0.4)" };

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [tips, setTips] = useState([]);
  const [userSearch, setUserSearch] = useState("");

  const fetchDashboard = async () => {
    try {
      const data = await adminAPI.dashboard();
      setDashboard(data);
    } catch (err) { console.error(err); }
  };

  const fetchAnalytics = async () => {
    try {
      const data = await adminAPI.analytics();
      setAnalytics(data);
    } catch (err) { console.error(err); }
  };

  const fetchUsers = async (search = "") => {
    try {
      const data = await adminAPI.users(search ? { search } : {});
      setUsers(data);
    } catch (err) { console.error(err); }
  };

  const fetchAppointments = async () => {
    try {
      const data = await adminAPI.appointments();
      setAppointments(data);
    } catch (err) { console.error(err); }
  };

  const fetchTips = async () => {
    try {
      const data = await adminAPI.dashboard ? null : null;
    } catch (err) {}
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([fetchDashboard(), fetchAnalytics(), fetchUsers(), fetchAppointments()]);
      setLoading(false);
    };
    init();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/landing");
  };

  const handleToggleUser = async (id) => {
    try {
      const result = await adminAPI.toggleUser(id);
      toast.success(result.message);
      fetchUsers(userSearch);
    } catch (err) {
      toast.error(err.data?.error || "Failed to update user.");
    }
  };

  const handleUpdateAppointment = async (id, status) => {
    try {
      await adminAPI.updateAppointment(id, { status });
      toast.success("Appointment updated.");
      fetchAppointments();
      fetchDashboard();
    } catch (err) {
      toast.error(err.data?.error || "Failed to update appointment.");
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={16} /> },
    { id: "users", label: "Users", icon: <Users size={16} /> },
    { id: "appointments", label: "Appointments", icon: <Calendar size={16} /> },
    { id: "analytics", label: "Analytics", icon: <TrendingUp size={16} /> },
  ];

  if (loading) {
    return (
      <AdminProtectedRoute>
        <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f172a" }}>
          <p className="text-slate-400">Loading dashboard...</p>
        </div>
      </AdminProtectedRoute>
    );
  }

  return (
    <AdminProtectedRoute>
      <div className="min-h-screen" style={{ background: "#0f172a" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">

          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold" style={neonGreen}>
                Admin Dashboard
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                PrimeHealth Administration Panel
              </p>
            </div>
            <div className="flex gap-2">
              
              <a href="http://127.0.0.1:8000/admin/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 text-sm font-semibold transition"
              >
                Django Admin
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition"
              >
                <LogOut size={16} />
                Log Out
              </button>
            </div>
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Total Patients", value: dashboard.stats.total_users, icon: <Users size={20} /> },
                  { label: "Total Doctors", value: dashboard.stats.total_doctors, icon: <Stethoscope size={20} /> },
                  { label: "Total Appointments", value: dashboard.stats.total_appointments, icon: <Calendar size={20} /> },
                  { label: "Today's Appointments", value: dashboard.stats.today_appointments, icon: <Calendar size={20} /> },
                  { label: "Total Drugs", value: dashboard.stats.total_drugs, icon: <Pill size={20} /> },
                  { label: "Pending Appointments", value: dashboard.stats.pending_appointments, icon: <AlertTriangle size={20} /> },
                  { label: "Completed Appointments", value: dashboard.stats.completed_appointments, icon: <Calendar size={20} /> },
                  { label: "Cancelled Appointments", value: dashboard.stats.cancelled_appointments, icon: <Calendar size={20} /> },
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

              {/* Recent appointments */}
              <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 className="text-sm font-bold mb-4" style={neonBlue}>Recent Appointments</h3>
                {dashboard.recent_appointments.length > 0 ? (
                  <div className="space-y-2">
                    {dashboard.recent_appointments.slice(0, 5).map((appt) => (
                      <div key={appt.id} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                        <div>
                          <p className="text-sm font-semibold text-white">{appt.user?.first_name} {appt.user?.last_name} → Dr. {appt.doctor?.name}</p>
                          <p className="text-xs text-slate-400">{appt.date} at {appt.time}</p>
                        </div>
                        <span className="text-xs px-3 py-1 rounded-full font-medium capitalize bg-blue-900/30 text-blue-400">
                          {appt.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm">No appointments yet.</p>
                )}
              </div>

              {/* Recent users */}
              <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 className="text-sm font-bold mb-4" style={neonBlue}>Recently Joined Patients</h3>
                {dashboard.recent_users.length > 0 ? (
                  <div className="space-y-2">
                    {dashboard.recent_users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                        <div>
                          <p className="text-sm font-semibold text-white">{user.first_name} {user.last_name}</p>
                          <p className="text-xs text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm">No recent users.</p>
                )}
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && fetchUsers(userSearch)}
                  className="flex-1 rounded-lg px-3 py-2 text-sm bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => fetchUsers(userSearch)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition"
                  style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)" }}
                >
                  Search
                </button>
              </div>

              <div className="space-y-2">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div>
                      <p className="text-sm font-semibold text-white">{user.first_name} {user.last_name}</p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium capitalize bg-blue-900/30 text-blue-400 mt-1 inline-block">
                        {user.profile?.role}
                      </span>
                    </div>
                    <button
                      onClick={() => handleToggleUser(user.id)}
                      className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition"
                    >
                      {user.is_active !== false ? (
                        <>
                          <ToggleRight size={28} className="text-green-500" />
                          <span className="text-green-400">Active</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft size={28} className="text-red-500" />
                          <span className="text-red-400">Inactive</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
                {users.length === 0 && (
                  <p className="text-slate-400 text-sm text-center py-8">No users found.</p>
                )}
              </div>
            </div>
          )}

          {/* Appointments Tab */}
          {activeTab === "appointments" && (
            <div className="space-y-3">
              {appointments.length > 0 ? (
                appointments.map((appt) => (
                  <div key={appt.id} className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {appt.user?.first_name} {appt.user?.last_name} → Dr. {appt.doctor?.name}
                        </p>
                        <p className="text-xs text-slate-400">{appt.date} at {appt.time} • Ref: {appt.reference_number}</p>
                      </div>
                      <span className="text-xs px-3 py-1 rounded-full font-medium capitalize bg-blue-900/30 text-blue-400">
                        {appt.status}
                      </span>
                    </div>
                    <div className="flex gap-2 flex-wrap mt-2">
                      {["pending", "confirmed", "completed", "cancelled"].map((s) => (
                        <button
                          key={s}
                          onClick={() => handleUpdateAppointment(appt.id, s)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition ${
                            appt.status === s ? "text-white" : "text-slate-400 border border-white/10 hover:bg-white/5"
                          }`}
                          style={appt.status === s ? { background: "linear-gradient(135deg, #3b82f6, #10b981)" } : {}}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-sm text-center py-8">No appointments yet.</p>
              )}
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && analytics && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <h3 className="text-sm font-bold mb-3" style={neonBlue}>Appointments Trend</h3>
                  <div className="flex justify-between text-sm text-slate-300">
                    <span>Last 7 days</span>
                    <span className="font-bold text-white">{analytics.appointments.last_7_days}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-300 mt-2">
                    <span>Last 30 days</span>
                    <span className="font-bold text-white">{analytics.appointments.last_30_days}</span>
                  </div>
                </div>

                <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <h3 className="text-sm font-bold mb-3" style={neonBlue}>New Patients</h3>
                  <div className="flex justify-between text-sm text-slate-300">
                    <span>Last 7 days</span>
                    <span className="font-bold text-white">{analytics.users.new_last_7_days}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-300 mt-2">
                    <span>Last 30 days</span>
                    <span className="font-bold text-white">{analytics.users.new_last_30_days}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 className="text-sm font-bold mb-4" style={neonBlue}>Appointments by Status</h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {Object.entries(analytics.appointments.by_status).map(([key, value]) => (
                    <div key={key} className="text-center p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                      <p className="text-2xl font-bold text-white">{value}</p>
                      <p className="text-xs text-slate-400 capitalize mt-1">{key}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 className="text-sm font-bold mb-4" style={neonBlue}>Top Doctors</h3>
                {analytics.top_doctors.length > 0 ? (
                  <div className="space-y-2">
                    {analytics.top_doctors.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                        <p className="text-sm text-white">Dr. {doc.name} — {doc.specialty}</p>
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-900/30 text-blue-400 font-semibold">
                          {doc.appointment_count || 0} appointments
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm">No data yet.</p>
                )}
              </div>

              <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: "#ef4444" }}>
                  <AlertTriangle size={16} /> Low Stock Drugs
                </h3>
                {analytics.low_stock_drugs.length > 0 ? (
                  <div className="space-y-2">
                    {analytics.low_stock_drugs.map((drug) => (
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
            </div>
          )}

        </div>
      </div>
    </AdminProtectedRoute>
  );
}