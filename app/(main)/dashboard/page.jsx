"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../components/ProtectedRoute";
import { User, Calendar, Settings, Stethoscope, Pill, LogOut } from "lucide-react";
import { toast } from "react-hot-toast";
import { authAPI, appointmentsAPI } from "../../lib/api";
import { logoutUser } from "../../lib/auth";

const neonStyle = { color: "#4dffa6", textShadow: "0 0 15px rgba(77,255,166,0.4), 0 0 30px rgba(59,130,246,0.3)" };

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState({});
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await authAPI.getProfile();
        if (!profileData) return;
        setProfile(profileData);
        setTempProfile({
          first_name: profileData.first_name || "",
          last_name: profileData.last_name || "",
          phone: profileData.profile?.phone || "",
          blood_group: profileData.profile?.blood_group || "",
        });

        const appts = await appointmentsAPI.list();
        setAppointments(Array.isArray(appts) ? appts : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const result = await authAPI.updateProfile(tempProfile);
      setProfile(result.user);
      setEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile.");
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/landing");
  };

  const handleReschedule = async (id, date, time) => {
    try {
      await appointmentsAPI.reschedule(id, { date, time });
      toast.success("Appointment rescheduled. We will confirm shortly.");
      const appts = await appointmentsAPI.list();
      setAppointments(appts);
    } catch (err) {
      toast.error(err.data?.error || "Failed to reschedule.");
    }
  };

  const handleCancel = async (id) => {
    try {
      await appointmentsAPI.cancel(id);
      toast.success("Appointment cancelled.");
      const appts = await appointmentsAPI.list();
      setAppointments(appts);
    } catch (err) {
      toast.error(err.data?.error || "Failed to cancel.");
    }
  };

  const tabs = [
    { id: "profile", label: t("profile"), icon: <User size={16} /> },
    { id: "appointments", label: t("appointments"), icon: <Calendar size={16} /> },
    { id: "quicklinks", label: t("quickLinks"), icon: <Stethoscope size={16} /> },
    { id: "settings", label: t("settings"), icon: <Settings size={16} /> },
  ];

  if (loading || !profile) {
    return (
      <ProtectedRoute>
        <div className="flex items-center justify-center py-32">
          <p className="text-gray-500 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </ProtectedRoute>
    );
  }

  const fullName = `${profile.first_name} ${profile.last_name}`.trim();

  return (
    <ProtectedRoute>
      <div className="space-y-6 px-4 md:px-0">

        <section>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {t("myDashboard")}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {t("manageProfile, appointments, and settings")}
          </p>
        </section>

        <div className="flex gap-2 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition
                ${activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700"
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-2xl font-bold text-blue-600">
                {fullName.charAt(0)}
              </div>
              <div>
                <h2 className="text-lg font-bold" style={neonStyle}>{fullName}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{profile.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">First Name</label>
                {editing ? (
                  <input
                    type="text"
                    value={tempProfile.first_name}
                    onChange={(e) => setTempProfile({ ...tempProfile, first_name: e.target.value })}
                    className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-[#0f172a] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                ) : (
                  <p className="text-sm text-gray-900 dark:text-white px-4 py-2 bg-gray-50 dark:bg-[#0f172a] rounded-lg">{profile.first_name}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Last Name</label>
                {editing ? (
                  <input
                    type="text"
                    value={tempProfile.last_name}
                    onChange={(e) => setTempProfile({ ...tempProfile, last_name: e.target.value })}
                    className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-[#0f172a] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                ) : (
                  <p className="text-sm text-gray-900 dark:text-white px-4 py-2 bg-gray-50 dark:bg-[#0f172a] rounded-lg">{profile.last_name}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Email</label>
                <p className="text-sm text-gray-900 dark:text-white px-4 py-2 bg-gray-50 dark:bg-[#0f172a] rounded-lg">{profile.email}</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Phone</label>
                {editing ? (
                  <input
                    type="tel"
                    value={tempProfile.phone}
                    onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
                    className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-[#0f172a] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                ) : (
                  <p className="text-sm text-gray-900 dark:text-white px-4 py-2 bg-gray-50 dark:bg-[#0f172a] rounded-lg">{profile.profile?.phone || "Not set"}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Blood Group</label>
                {editing ? (
                  <input
                    type="text"
                    value={tempProfile.blood_group}
                    onChange={(e) => setTempProfile({ ...tempProfile, blood_group: e.target.value })}
                    className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-[#0f172a] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                ) : (
                  <p className="text-sm text-gray-900 dark:text-white px-4 py-2 bg-gray-50 dark:bg-[#0f172a] rounded-lg">{profile.profile?.blood_group || "Not set"}</p>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              {editing ? (
                <>
                  <button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition">
                    {t("save Changes")}
                  </button>
                  <button onClick={() => setEditing(false)} className="flex-1 border border-gray-300 dark:border-slate-600 text-gray-600 dark:text-gray-400 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 transition">
                    {t("cancel")}
                  </button>
                </>
              ) : (
                <button onClick={() => setEditing(true)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition">
                  {t("editProfile")}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === "appointments" && (
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
            <h2 className="text-lg font-bold mb-4" style={neonStyle}>{t("Appointment History")}</h2>

            {appointments.length > 0 ? (
              <div className="space-y-3">
                {appointments.map((appt) => (
                  <div key={appt.id} className="p-4 bg-gray-50 dark:bg-[#0f172a] rounded-xl border border-gray-100 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Dr. {appt.doctor.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{appt.doctor.specialty}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{appt.date} at {appt.time}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">Ref: {appt.reference_number}</p>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${appt.status === "pending" || appt.status === "confirmed"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        : appt.status === "completed"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
                        {appt.status}
                      </span>
                    </div>

                    {(appt.status === "pending" || appt.status === "confirmed" || appt.status === "rescheduled") && (
                      <RescheduleControls appt={appt} onReschedule={handleReschedule} onCancel={handleCancel} />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 rounded-full bg-blue-50 dark:bg-[#0f172a] flex items-center justify-center mb-4">
                  <Calendar size={36} className="text-blue-300 dark:text-blue-500" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">No Appointments Yet</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mb-6">
                  You haven't booked any appointments yet. Find a doctor and schedule your first visit.
                </p>
                <button
                  onClick={() => router.push("/doctors")}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition"
                >
                  <Stethoscope size={16} />
                  Find a Doctor
                </button>
              </div>
            )}

            {appointments.length > 0 && (
              <button
                onClick={() => router.push("/appointments")}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-semibold transition"
              >
                {t("Book New Appointment")}
              </button>
            )}
          </div>
        )}

        {/* Quick Links Tab */}
        {activeTab === "quicklinks" && (
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
            <h2 className="text-lg font-bold mb-4" style={neonStyle}>{t("Quick Links")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Find a Doctor", desc: "Browse and filter doctors by specialty", icon: <Stethoscope size={20} className="text-blue-600" />, href: "/doctors" },
                { label: "Browse Pharmacy", desc: "Search and purchase medications", icon: <Pill size={20} className="text-green-600" />, href: "/pharmacy" },
                { label: "Book Appointment", desc: "Schedule a visit with a doctor", icon: <Calendar size={20} className="text-purple-600" />, href: "/appointments" },
                { label: "FAQ", desc: "Get answers to common questions", icon: <span className="text-lg">❓</span>, href: "#" },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => router.push(link.href)}
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-[#0f172a] rounded-xl border border-gray-100 dark:border-slate-700 hover:shadow-md transition text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-[#1e293b] flex items-center justify-center shadow-sm">
                    {link.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{link.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{link.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 space-y-4">
            <h2 className="text-lg font-bold mb-4" style={neonStyle}>{t("Settings")}</h2>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#0f172a] rounded-xl border border-gray-100 dark:border-slate-700">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{t("language")}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t("Choose Language")}</p>
              </div>
              <LanguageToggle inline={true} />
            </div>

            {[
              // Settings labels
              { label: t("emailNotifications"), desc: "Receive appointment reminders via email" },
              { label: t("smsNotifications"), desc: "Receive updates via text message" },
              { label: t("twoFactor"), desc: "Add an extra layer of security" },
            ].map((setting) => (
              <div key={setting.label} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#0f172a] rounded-xl border border-gray-100 dark:border-slate-700">
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{setting.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{setting.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-10 h-5 bg-gray-300 dark:bg-gray-600 peer-checked:bg-blue-600 rounded-full peer transition-colors duration-200 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                </label>
              </div>
            ))}

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 mt-4 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl text-sm font-semibold transition"
            >
              <LogOut size={16} />
              {t("Logout")}
            </button>
          </div>
        )}

      </div>
    </ProtectedRoute>
  );
}

function RescheduleControls({ appt, onReschedule, onCancel }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  return (
    <div className="space-y-2 mt-2">
      <div className="flex gap-2">
        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="flex-1 border border-blue-400 dark:border-blue-500 rounded-lg px-3 py-1.5 text-xs text-gray-900 dark:text-white dark:bg-[#0f172a] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="flex-1 border border-blue-400 dark:border-blue-500 rounded-lg px-3 py-1.5 text-xs text-gray-900 dark:text-white dark:bg-[#0f172a] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => {
            if (!date || !time) return;
            onReschedule(appt.id, date, time);
          }}
          className="flex-1 py-1.5 rounded-lg text-xs font-semibold border border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
        >
          Confirm Reschedule
        </button>
        <button
          onClick={() => onCancel(appt.id)}
          className="flex-1 py-1.5 rounded-lg text-xs font-semibold border border-red-400 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
        >
          Cancel
        </button>
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
        Subject to doctor availability — we will confirm shortly.
      </p>
    </div>
  );
}