"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DoctorProtectedRoute from "../../components/DoctorProtectedRoute";
import {
  LayoutDashboard, Calendar, Clock, User, LogOut,
  CheckCircle, XCircle, FileText, Activity
} from "lucide-react";
import toast from "react-hot-toast";
import { doctorPortalAPI } from "../../lib/api";
import { logoutUser } from "../../lib/auth";

const neonGreen = { color: "#4dffa6", textShadow: "0 0 15px rgba(77,255,166,0.4), 0 0 30px rgba(59,130,246,0.3)" };
const neonBlue = { color: "#00cfff", textShadow: "0 0 10px rgba(0,207,255,0.4)" };

export default function DoctorDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [notes, setNotes] = useState({});

  const fetchDashboard = async () => {
    try {
      const data = await doctorPortalAPI.dashboard();
      setDashboard(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAppointments = async () => {
    try {
      const data = await doctorPortalAPI.appointments();
      setAppointments(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTimeSlots = async () => {
    try {
      const data = await doctorPortalAPI.getTimeSlots();
      setTimeSlots(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([fetchDashboard(), fetchAppointments(), fetchTimeSlots()]);
      setLoading(false);
    };
    init();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/landing");
  };

  const handleAvailabilityChange = async (availability) => {
    try {
      await doctorPortalAPI.updateAvailability(availability);
      toast.success(`Availability set to ${availability}.`);
      fetchDashboard();
    } catch (err) {
      toast.error(err.data?.error || "Failed to update availability.");
    }
  };

  const handleAppointmentStatus = async (id, status) => {
    try {
      await doctorPortalAPI.updateAppointment(id, { status });
      toast.success(`Appointment marked as ${status}.`);
      fetchAppointments();
      fetchDashboard();
    } catch (err) {
      toast.error(err.data?.error || "Failed to update appointment.");
    }
  };

  const handleSaveNote = async (appointmentId) => {
    const note = notes[appointmentId];
    if (!note) return;

    try {
      await doctorPortalAPI.addNote(appointmentId, note);
      toast.success("Clinical note saved.");
    } catch (err) {
      toast.error(err.data?.error || "Failed to save note.");
    }
  };

  const handleAddTimeSlot = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      day: form.day.value,
      start_time: form.start_time.value,
      end_time: form.end_time.value,
    };

    try {
      await doctorPortalAPI.addTimeSlot(data);
      toast.success("Time slot added.");
      fetchTimeSlots();
      form.reset();
    } catch (err) {
      toast.error(err.data?.error || "Failed to add time slot.");
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={16} /> },
    { id: "appointments", label: "Appointments", icon: <Calendar size={16} /> },
    { id: "schedule", label: "Schedule", icon: <Clock size={16} /> },
    { id: "profile", label: "Profile", icon: <User size={16} /> },
  ];

  if (loading) {
    return (
      <DoctorProtectedRoute>
        <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f172a" }}>
          <p className="text-slate-400">Loading dashboard...</p>
        </div>
      </DoctorProtectedRoute>
    );
  }

  return (
    <DoctorProtectedRoute>
      <div className="min-h-screen" style={{ background: "#0f172a" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">

          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold" style={neonGreen}>
                Doctor Dashboard
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Welcome back, Dr. {dashboard?.doctor?.name}
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
                  ${activeTab === tab.id
                    ? "text-white"
                    : "text-slate-400 border border-white/10 hover:bg-white/5"
                  }`}
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
                  { label: "Total Appointments", value: dashboard.stats.total_appointments, icon: <Calendar size={20} /> },
                  { label: "Today", value: dashboard.stats.today_appointments, icon: <Clock size={20} /> },
                  { label: "Pending", value: dashboard.stats.pending_appointments, icon: <Activity size={20} /> },
                  { label: "Completed", value: dashboard.stats.completed_appointments, icon: <CheckCircle size={20} /> },
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

              {/* Availability toggle */}
              <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 className="text-sm font-bold mb-3" style={neonBlue}>Current Availability</h3>
                <div className="flex gap-2 flex-wrap">
                  {["available", "busy", "unavailable"].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleAvailabilityChange(status)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition ${
                        dashboard.doctor.availability === status
                          ? "text-white"
                          : "text-slate-400 border border-white/10 hover:bg-white/5"
                      }`}
                      style={dashboard.doctor.availability === status
                        ? { background: status === "available" ? "#10b981" : status === "busy" ? "#f59e0b" : "#ef4444" }
                        : {}}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upcoming appointments */}
              <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 className="text-sm font-bold mb-4" style={neonBlue}>Upcoming Appointments</h3>
                {dashboard.upcoming_appointments.length > 0 ? (
                  <div className="space-y-3">
                    {dashboard.upcoming_appointments.map((appt) => (
                      <div key={appt.id} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                        <div>
                          <p className="text-sm font-semibold text-white">{appt.user?.first_name} {appt.user?.last_name}</p>
                          <p className="text-xs text-slate-400">{appt.date} at {appt.time}</p>
                        </div>
                        <span className="text-xs px-3 py-1 rounded-full font-medium capitalize bg-blue-900/30 text-blue-400">
                          {appt.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm">No upcoming appointments.</p>
                )}
              </div>
            </div>
          )}

          {/* Appointments Tab */}
          {activeTab === "appointments" && (
            <div className="space-y-4">
              {appointments.length > 0 ? (
                appointments.map((appt) => (
                  <div key={appt.id} className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                      <div>
                        <p className="text-sm font-semibold text-white">{appt.user?.first_name} {appt.user?.last_name}</p>
                        <p className="text-xs text-slate-400">{appt.user?.email}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{appt.date} at {appt.time}</p>
                        <p className="text-xs text-slate-500 mt-0.5">Ref: {appt.reference_number}</p>
                      </div>
                      <span className="text-xs px-3 py-1 rounded-full font-medium capitalize bg-blue-900/30 text-blue-400">
                        {appt.status}
                      </span>
                    </div>

                    {appt.description && (
                      <div className="mb-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                        <p className="text-xs font-semibold mb-1" style={neonBlue}>Patient Notes</p>
                        <p className="text-sm text-slate-300">{appt.description}</p>
                      </div>
                    )}

                    {(appt.status === "pending" || appt.status === "confirmed" || appt.status === "rescheduled") && (
                      <div className="flex gap-2 mb-3 flex-wrap">
                        {appt.status === "pending" && (
                          <button
                            onClick={() => handleAppointmentStatus(appt.id, "confirmed")}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-blue-500 text-blue-400 hover:bg-blue-900/20 transition"
                          >
                            <CheckCircle size={14} /> Confirm
                          </button>
                        )}
                        <button
                          onClick={() => handleAppointmentStatus(appt.id, "completed")}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-green-500 text-green-400 hover:bg-green-900/20 transition"
                        >
                          <CheckCircle size={14} /> Mark Completed
                        </button>
                        <button
                          onClick={() => handleAppointmentStatus(appt.id, "cancelled")}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-red-500 text-red-400 hover:bg-red-900/20 transition"
                        >
                          <XCircle size={14} /> Cancel
                        </button>
                      </div>
                    )}

                    {/* Clinical note */}
                    <details className="group">
                      <summary className="flex items-center gap-2 text-xs font-semibold cursor-pointer" style={neonBlue}>
                        <FileText size={14} /> Add Clinical Note
                      </summary>
                      <div className="mt-3 space-y-2">
                        <textarea
                          placeholder="Diagnosis"
                          rows={2}
                          onChange={(e) => setNotes({ ...notes, [appt.id]: { ...notes[appt.id], diagnosis: e.target.value } })}
                          className="w-full rounded-lg px-3 py-2 text-sm bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                        <textarea
                          placeholder="Prescription"
                          rows={2}
                          onChange={(e) => setNotes({ ...notes, [appt.id]: { ...notes[appt.id], prescription: e.target.value } })}
                          className="w-full rounded-lg px-3 py-2 text-sm bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                        <textarea
                          placeholder="Additional notes"
                          rows={2}
                          onChange={(e) => setNotes({ ...notes, [appt.id]: { ...notes[appt.id], notes: e.target.value } })}
                          className="w-full rounded-lg px-3 py-2 text-sm bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                        <button
                          onClick={() => handleSaveNote(appt.id)}
                          className="px-4 py-2 rounded-lg text-xs font-semibold text-white transition"
                          style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)" }}
                        >
                          Save Note
                        </button>
                      </div>
                    </details>
                  </div>
                ))
              ) : (
                <div className="text-center py-16">
                  <p className="text-slate-400">No appointments yet.</p>
                </div>
              )}
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === "schedule" && (
            <div className="space-y-6">
              <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 className="text-sm font-bold mb-4" style={neonBlue}>Add Time Slot</h3>
                <form onSubmit={handleAddTimeSlot} className="flex flex-col sm:flex-row gap-3">
                  <select name="day" required className="flex-1 rounded-lg px-3 py-2 text-sm bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Day</option>
                    {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                      <option key={day} value={day} className="bg-[#0f172a]">{day.charAt(0).toUpperCase() + day.slice(1)}</option>
                    ))}
                  </select>
                  <input type="time" name="start_time" required className="flex-1 rounded-lg px-3 py-2 text-sm bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="time" name="end_time" required className="flex-1 rounded-lg px-3 py-2 text-sm bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <button type="submit" className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition" style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)" }}>
                    Add Slot
                  </button>
                </form>
              </div>

              <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 className="text-sm font-bold mb-4" style={neonBlue}>Your Time Slots</h3>
                {timeSlots.length > 0 ? (
                  <div className="space-y-2">
                    {timeSlots.map((slot) => (
                      <div key={slot.id} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                        <p className="text-sm text-white capitalize">{slot.day}</p>
                        <p className="text-sm text-slate-400">{slot.start_time} - {slot.end_time}</p>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${slot.is_available ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}>
                          {slot.is_available ? "Available" : "Unavailable"}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm">No time slots added yet.</p>
                )}
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && dashboard && (
            <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 className="text-sm font-bold mb-4" style={neonBlue}>Doctor Profile</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Name</p>
                  <p className="text-sm text-white px-3 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>Dr. {dashboard.doctor.name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Specialty</p>
                  <p className="text-sm text-white px-3 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>{dashboard.doctor.specialty}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Hospital</p>
                  <p className="text-sm text-white px-3 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>{dashboard.doctor.hospital}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Consultation Fee</p>
                  <p className="text-sm text-white px-3 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>₦{dashboard.doctor.consultation_fee}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Bio</p>
                  <p className="text-sm text-white px-3 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>{dashboard.doctor.bio || "No bio added yet."}</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </DoctorProtectedRoute>
  );
}