"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../components/ProtectedRoute";
import { tipsAPI, doctorsAPI } from "../lib/api";
import { ChevronDown, Phone, Mail, Stethoscope, Pill, Calendar, Activity, Heart, Users, Clock, ArrowRight } from "lucide-react";

const faqs = [
  { q: "How do I book an appointment?", a: "Go to the Appointments page, select a doctor, choose a date and time, describe your symptoms and click Book Appointment. You will receive a confirmation with a reference number." },
  { q: "Can I cancel or reschedule my appointment?", a: "Yes. Go to your Dashboard, click the Appointments tab, and use the Reschedule or Cancel buttons on any upcoming appointment." },
  { q: "How do I order medications from the pharmacy?", a: "Go to the Pharmacy page, browse or search for your medication, click View Details, select the quantity and click Add to Cart. Then open your cart and proceed to checkout." },
  { q: "Is my health data secure?", a: "Yes. All data is encrypted and stored securely. Only you and your authorized care providers can access your records." },
  { q: "How do I find a doctor by specialty?", a: "Go to the Doctors page and use the specialty filter dropdown to filter doctors by their field of practice." },
  { q: "What should I do in a medical emergency?", a: "For life-threatening emergencies please call 112 immediately. PrimeHealth is not a substitute for emergency medical services." },
];

const stats = [
  { icon: <Stethoscope size={22} />, value: "500+", label: "Verified Doctors" },
  { icon: <Users size={22} />, value: "10,000+", label: "Happy Patients" },
  { icon: <Clock size={22} />, value: "24/7", label: "Support Available" },
  { icon: <Heart size={22} />, value: "98%", label: "Satisfaction Rate" },
];

const quickActions = [
  { label: "Find a Doctor", desc: "Browse verified specialists", icon: <Stethoscope size={24} />, href: "/doctors", color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
  { label: "Buy Medicine", desc: "Order from our pharmacy", icon: <Pill size={24} />, href: "/pharmacy", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  { label: "Book Appointment", desc: "Schedule a consultation", icon: <Calendar size={24} />, href: "/appointments", color: "#6366f1", bg: "rgba(99,102,241,0.1)" },
  { label: "My Dashboard", desc: "View your health records", icon: <Activity size={24} />, href: "/dashboard", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
];

export default function HomePage() {
  const router = useRouter();
  const [tips, setTips] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tipsData, doctorsData] = await Promise.all([
          tipsAPI.list(),
          doctorsAPI.list(),
        ]);
        setTips(Array.isArray(tipsData) ? tipsData.slice(0, 3) : []);
        setDoctors(Array.isArray(doctorsData) ? doctorsData.slice(0, 4) : []);
      } catch (err) {
        console.error("Failed to load data:", err);
        setTips([]);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <ProtectedRoute>
      <div className="space-y-16">

        {/* Hero Section */}
        <section
          className="text-center py-12 sm:py-20 rounded-2xl px-4 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #ffffff 50%, #4ade80 100%)",
            boxShadow: "0 8px 32px rgba(34, 197, 94, 0.25), 0 2px 8px rgba(34, 197, 94, 0.15), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
        >
          <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-black">
            Welcome to PrimeHealth
          </h1>
          <p className="text-black/70 mb-8 max-w-2xl mx-auto text-sm sm:text-base">
            Find doctors, book appointments, and access pharmacy drugs easily.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <a href="/doctors" className="bg-blue-600 text-white py-2.5 px-8 rounded-xl hover:bg-blue-700 transition font-semibold text-sm sm:text-base">
              Find a Doctor
            </a>
            <a href="/pharmacy" className="bg-green-600 text-white py-2.5 px-8 rounded-xl hover:bg-green-700 transition font-semibold text-sm sm:text-base">
              Browse Pharmacy
            </a>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white dark:bg-[#1e293b] rounded-2xl border border-gray-100 dark:border-slate-700 p-5 text-center shadow-sm hover:shadow-md transition">
                <div className="flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600">
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="px-4">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900 dark:text-white">
            What would you like to do?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            Quick access to all PrimeHealth services
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {quickActions.map((action, i) => (
              <button
                key={i}
                onClick={() => router.push(action.href)}
                className="flex flex-col items-center gap-3 p-5 bg-white dark:bg-[#1e293b] rounded-2xl border border-gray-100 dark:border-slate-700 hover:shadow-lg transition text-center group"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition" style={{ background: action.bg, color: action.color }}>
                  {action.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{action.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{action.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Image Sections */}
        <section className="grid md:grid-cols-2 gap-8 items-center px-4">
          <div className="relative group overflow-hidden rounded-2xl">
            <img src="/images/consultation.png" alt="General Consultation" className="w-full h-[300px] object-cover rounded-2xl transition duration-500 group-hover:scale-105 group-hover:brightness-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">General Consultation</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Connect with experienced doctors for accurate diagnosis and personalized care.</p>
            <button onClick={() => router.push("/doctors")} className="mt-4 flex items-center gap-2 text-blue-600 font-semibold text-sm hover:underline">
              Find a Doctor <ArrowRight size={16} />
            </button>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8 items-center px-4">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">Eye Care & Vision Testing</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Advanced eye testing and vision care with modern equipment.</p>
            <button onClick={() => router.push("/appointments")} className="mt-4 flex items-center gap-2 text-blue-600 font-semibold text-sm hover:underline">
              Book Now <ArrowRight size={16} />
            </button>
          </div>
          <div className="relative group overflow-hidden rounded-2xl order-1 md:order-2">
            <img src="/images/eye-care.png" alt="Eye Care" className="w-full h-[300px] object-cover rounded-2xl transition duration-500 group-hover:scale-105 group-hover:brightness-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8 items-center px-4">
          <div className="relative group overflow-hidden rounded-2xl">
            <img src="/images/therapy.png" alt="Therapy" className="w-full h-[300px] object-cover rounded-2xl transition duration-500 group-hover:scale-105 group-hover:brightness-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">Therapy & Mental Wellness</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Professional therapy sessions in a safe and supportive environment.</p>
            <button onClick={() => router.push("/appointments")} className="mt-4 flex items-center gap-2 text-blue-600 font-semibold text-sm hover:underline">
              Book Session <ArrowRight size={16} />
            </button>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8 items-center px-4">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-green-600 bg-clip-text text-transparent">Laboratory Testing</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Fast and accurate lab tests including blood and sugar diagnostics.</p>
            <button onClick={() => router.push("/appointments")} className="mt-4 flex items-center gap-2 text-blue-600 font-semibold text-sm hover:underline">
              Book Test <ArrowRight size={16} />
            </button>
          </div>
          <div className="relative group overflow-hidden rounded-2xl order-1 md:order-2">
            <img src="/images/lab.png" alt="Laboratory" className="w-full h-[300px] object-cover rounded-2xl transition duration-500 group-hover:scale-105 group-hover:brightness-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          </div>
        </section>

        {/* Featured Doctors */}
        <section className="px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Featured Doctors</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Top verified specialists on PrimeHealth</p>
            </div>
            <button onClick={() => router.push("/doctors")} className="flex items-center gap-1 text-blue-600 font-semibold text-sm hover:underline">
              View all <ArrowRight size={16} />
            </button>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-[#1e293b] rounded-xl p-4 animate-pulse">
                  <div className="w-full h-24 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : doctors.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {doctors.map((doctor) => (
                <div key={doctor.id} onClick={() => router.push("/doctors")} className="bg-white dark:bg-[#1e293b] rounded-xl border border-gray-100 dark:border-slate-700 p-4 shadow-sm hover:shadow-md transition cursor-pointer">
                  <div className="w-full h-24 bg-blue-50 dark:bg-[#0f172a] rounded-lg flex items-center justify-center mb-3">
                    <Stethoscope size={32} className="text-blue-300" />
                  </div>
                  <p className="text-sm font-semibold mb-0.5" style={{ color: "#4dffa6" }}>Dr. {doctor.name}</p>
                  <p className="text-xs font-medium mb-2" style={{ color: "#00cfff" }}>{doctor.specialty}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-yellow-500">⭐ {doctor.rating}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${doctor.is_available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {doctor.is_available ? "Available" : "Busy"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </section>

        {/* Medical Tips */}
        <section className="px-4">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-white">Medical Tips</h2>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-[#1e293b] rounded-xl border border-gray-100 dark:border-slate-700 p-5 animate-pulse">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full mb-3" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : tips.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {tips.map((tip) => (
                <div key={tip.id} className="bg-white dark:bg-[#1e293b] rounded-xl border border-gray-100 dark:border-slate-700 p-5 shadow-sm hover:shadow-md transition">
                  <div className="text-3xl mb-3">{tip.icon}</div>
                  <h3 className="font-semibold text-base mb-1" style={{ color: "#4dffa6", textShadow: "0 0 10px rgba(77,255,166,0.3)" }}>{tip.title}</h3>
                  <p className="text-sm font-medium mb-2 capitalize" style={{ color: "#00cfff" }}>
                    {typeof tip.category === "string" ? tip.category.replace("_", " ") : ""}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {typeof tip.content === "string" ? tip.content : ""}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400 text-sm">Daily health tips to keep you healthy.</p>
          )}
        </section>

        {/* How It Works */}
        <section className="px-4">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900 dark:text-white">How PrimeHealth Works</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Getting the care you need has never been simpler</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Create Account", desc: "Sign up in under a minute. No paperwork, no queues.", icon: "👤" },
              { num: "02", title: "Find Your Doctor", desc: "Search by name, specialty or condition and check availability.", icon: "🔍" },
              { num: "03", title: "Book & Get Care", desc: "Confirm your appointment and get the care you deserve.", icon: "✅" },
            ].map((step, i) => (
              <div key={i} className="bg-white dark:bg-[#1e293b] rounded-2xl border border-gray-100 dark:border-slate-700 p-6 text-center shadow-sm">
                <div className="text-4xl mb-3">{step.icon}</div>
                <div className="text-2xl font-bold mb-2" style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {step.num}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-4">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Got questions? We have answers.</p>
          <div className="space-y-3 max-w-3xl">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-[#1e293b] rounded-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white pr-4">{faq.q}</span>
                  <ChevronDown size={18} className="text-gray-400 shrink-0 transition-transform duration-300" style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed border-t border-gray-100 dark:border-slate-700">
                    <p className="pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Customer Care */}
        <section className="px-4">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900 dark:text-white">Need Help?</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Our support team is available 24/7 to assist you.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            <a href="tel:+2348000000000" className="flex items-center gap-4 p-5 bg-white dark:bg-[#1e293b] rounded-xl border border-gray-100 dark:border-slate-700 hover:shadow-md transition group">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center group-hover:scale-110 transition">
                <Phone size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Call Us</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">+234 800 000 0000</p>
                <p className="text-xs text-green-600 mt-0.5">Available 24/7</p>
              </div>
            </a>
            <a href="mailto:support@primehealth.com" className="flex items-center gap-4 p-5 bg-white dark:bg-[#1e293b] rounded-xl border border-gray-100 dark:border-slate-700 hover:shadow-md transition group">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition">
                <Mail size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Email Us</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">support@primehealth.com</p>
                <p className="text-xs text-blue-600 mt-0.5">Response within 24 hours</p>
              </div>
            </a>
          </div>
        </section>

      </div>
    </ProtectedRoute>
  );
}