"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../components/ProtectedRoute";
import { User, Calendar, Settings, Stethoscope, Pill, LogOut } from "lucide-react";
import toast from "react-hot-toast";

const mockAppointments = [
  { id: 1, doctor: "Dr. Adebayo", specialty: "Cardiologist", date: "2026-04-10", status: "Upcoming" },
  { id: 2, doctor: "Dr. Chukwu", specialty: "Dermatologist", date: "2026-03-28", status: "Completed" },
  { id: 3, doctor: "Dr. Ibrahim", specialty: "Neurologist", date: "2026-03-15", status: "Completed" },
  { id: 4, doctor: "Dr. Johnson", specialty: "Pediatrician", date: "2026-04-22", status: "Upcoming" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+234 800 000 0000",
    bloodGroup: "O+",
  });
  const [editing, setEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);

  const handleSave = () => {
    setProfile(tempProfile);
    setEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    router.replace("/auth");
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: <User size={16} /> },
    { id: "appointments", label: "Appointments", icon: <Calendar size={16} /> },
    { id: "quicklinks", label: "Quick Links", icon: <Stethoscope size={16} /> },
    { id: "settings", label: "Settings", icon: <Settings size={16} /> },
  ];

  return (
    <ProtectedRoute>
      <div className="space-y-6 px-4 md:px-0">

        {/* Header */}
        <section>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
            My Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Manage your profile, appointments and settings.
          </p>
        </section>

        {/* Tabs */}
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

            {/* Avatar */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-2xl font-bold text-blue-600">
                {profile.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{profile.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{profile.email}</p>
              </div>
            </div>

            {/* Fields */}
            <div className="space-y-4">
              {[
                { label: "Full Name", key: "name", type: "text" },
                { label: "Email", key: "email", type: "email" },
                { label: "Phone", key: "phone", type: "tel" },
                { label: "Blood Group", key: "bloodGroup", type: "text" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    {field.label}
                  </label>
                  {editing ? (
                    <input
                      type={field.type}
                      value={tempProfile[field.key]}
                      onChange={(e) => setTempProfile({ ...tempProfile, [field.key]: e.target.value })}
                      className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-[#0f172a] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  ) : (
                    <p className="text-sm text-gray-900 dark:text-white px-4 py-2 bg-gray-50 dark:bg-[#0f172a] rounded-lg">
                      {profile[field.key]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              {editing ? (
                <>
                  <button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition">
                    Save Changes
                  </button>
                  <button onClick={() => { setEditing(false); setTempProfile(profile); }} className="flex-1 border border-gray-300 dark:border-slate-600 text-gray-600 dark:text-gray-400 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 transition">
                    Cancel
                  </button>
                </>
              ) : (
                <button onClick={() => setEditing(true)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition">
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === "appointments" && (
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Appointment History</h2>
            <div className="space-y-3">
              {mockAppointments.map((appt) => (
                <div key={appt.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#0f172a] rounded-xl border border-gray-100 dark:border-slate-700">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{appt.doctor}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{appt.specialty}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{appt.date}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${appt.status === "Upcoming" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"}`}>
                    {appt.status}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => router.push("/appointments")}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-semibold transition"
            >
              Book New Appointment
            </button>
          </div>
        )}

        {/* Quick Links Tab */}
        {activeTab === "quicklinks" && (
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Links</h2>
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
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Account Settings</h2>

            {[
              { label: "Email Notifications", desc: "Receive appointment reminders via email" },
              { label: "SMS Notifications", desc: "Receive updates via text message" },
              { label: "Two Factor Authentication", desc: "Add an extra layer of security" },
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
              Log Out
            </button>
          </div>
        )}

      </div>
    </ProtectedRoute>
  );
}