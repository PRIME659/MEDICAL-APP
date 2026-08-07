"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Stethoscope, Pill, Calendar, Shield, Clock, Star, ChevronDown, ArrowRight, Activity, Heart, Users, CheckCircle, X } from "lucide-react";

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-20 animate-float"
          style={{
            width: `${Math.random() * 10 + 4}px`,
            height: `${Math.random() * 10 + 4}px`,
            background: i % 3 === 0 ? "#3b82f6" : i % 3 === 1 ? "#10b981" : "#6366f1",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${Math.random() * 8 + 6}s`,
          }}
        />
      ))}
    </div>
  );
}

function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`relative rounded-2xl border border-white/20 ${className}`}
      style={{
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2)",
      }}
    >
      {children}
    </div>
  );
}

function NeuCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl ${className}`}
      style={{
        background: "#f0f4f8",
        boxShadow: "8px 8px 20px rgba(163,177,198,0.6), -8px -8px 20px rgba(255,255,255,0.9)",
      }}
    >
      {children}
    </div>
  );
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

export default function LandingPage() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState(null);
  const [servicesRef, servicesVisible] = useReveal();
  const [stepsRef, stepsVisible] = useReveal();
  const [statsRef, statsVisible] = useReveal();
  const [testimonialsRef, testimonialsVisible] = useReveal();
  const [faqRef, faqVisible] = useReveal();
  const [comparisonRef, comparisonVisible] = useReveal();
  const [doctorsRef, doctorsVisible] = useReveal();

  const services = [
    { icon: <Stethoscope size={28} />, title: "Find a Doctor", desc: "Browse verified specialists across all medical fields. Filter by specialty, availability, and location.", color: "#3b82f6", bg: "rgba(59,130,246,0.1)", href: "/auth" },
    { icon: <Pill size={28} />, title: "Browse Pharmacy", desc: "Access a wide catalog of medications. Search, compare, and order essential drugs with ease.", color: "#10b981", bg: "rgba(16,185,129,0.1)", href: "/auth" },
    { icon: <Calendar size={28} />, title: "Book Appointments", desc: "Schedule in-person or virtual consultations in seconds. Get instant confirmation and reminders.", color: "#6366f1", bg: "rgba(99,102,241,0.1)", href: "/auth" },
    { icon: <Shield size={28} />, title: "Secure Health Records", desc: "Your medical history stored safely and accessible only to you and your care providers.", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", href: "/auth" },
    { icon: <Clock size={28} />, title: "24/7 Emergency Care", desc: "Round-the-clock emergency support and telemedicine consultations whenever you need them.", color: "#ef4444", bg: "rgba(239,68,68,0.1)", href: "/auth" },
    { icon: <Activity size={28} />, title: "Health Monitoring", desc: "Track your vitals, appointments, and prescriptions all in one unified dashboard.", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", href: "/auth" },
  ];

  const steps = [
    { num: "01", title: "Create Your Account", desc: "Sign up in under a minute. No paperwork, no queues — just a quick and secure registration." },
    { num: "02", title: "Find Your Doctor", desc: "Search by name, specialty, or condition. Read reviews and check real-time availability." },
    { num: "03", title: "Book & Get Care", desc: "Confirm your appointment, receive a reminder, and get the care you deserve." },
  ];

  const stats = [
    { icon: <Stethoscope size={22} />, value: "500+", label: "Verified Doctors" },
    { icon: <Users size={22} />, value: "10,000+", label: "Happy Patients" },
    { icon: <Clock size={22} />, value: "24/7", label: "Support Available" },
    { icon: <Heart size={22} />, value: "98%", label: "Satisfaction Rate" },
  ];

  const testimonials = [
    { name: "Amara Okonkwo", role: "Patient", quote: "PrimeHealth made booking a specialist so easy. I found a cardiologist and got an appointment the same day.", stars: 5 },
    { name: "Chidi Nwachukwu", role: "Patient", quote: "The pharmacy section is a game changer. I can search for medications and know exactly what I'm taking.", stars: 5 },
    { name: "Fatima Bello", role: "Patient", quote: "I love how my health records are all in one place. The dashboard is clean and easy to navigate.", stars: 4 },
  ];

  const faqs = [
    { q: "How do I book an appointment?", a: "Simply sign up, search for a doctor by specialty or name, and click Book Appointment. You'll receive an instant confirmation." },
    { q: "Is my health data secure?", a: "Yes. All data is encrypted and stored securely. Only you and your authorized care providers can access your records." },
    { q: "Can I use PrimeHealth on my phone?", a: "Absolutely. PrimeHealth is fully responsive and works seamlessly on all screen sizes including mobile and tablet." },
    { q: "How do I order medications?", a: "Go to the Pharmacy section, search for your medication, add it to your cart and checkout. Your order will be processed immediately." },
    { q: "What happens if I need to cancel?", a: "You can cancel or reschedule any upcoming appointment from your dashboard up to 2 hours before the scheduled time." },
    { q: "Are the doctors verified?", a: "Yes. All doctors on PrimeHealth are verified medical professionals with valid licenses and credentials." },
  ];

  const featuredDoctors = [
    { name: "Adebayo Okonkwo", specialty: "Cardiologist", hospital: "LUTH", rating: 4.8, available: true },
    { name: "Ngozi Chukwu", specialty: "Dermatologist", hospital: "National Hospital", rating: 4.6, available: true },
    { name: "Ibrahim Musa", specialty: "Neurologist", hospital: "AKTH", rating: 4.9, available: false },
    { name: "Chiamaka Johnson", specialty: "Pediatrician", hospital: "UNTH", rating: 4.7, available: true },
  ];

  const comparisonPoints = [
    { feature: "Book appointment", primehealth: true, traditional: false },
    { feature: "24/7 availability", primehealth: true, traditional: false },
    { feature: "Online pharmacy", primehealth: true, traditional: false },
    { feature: "Digital health records", primehealth: true, traditional: false },
    { feature: "No waiting rooms", primehealth: true, traditional: false },
    { feature: "Instant confirmation", primehealth: true, traditional: false },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: "'Playpen Sans', cursive" }}>


      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 40%, #0d2818 100%)" }}
      >
        <Particles />
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }} />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #10b981, transparent)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <GlassCard className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm text-emerald-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Nigeria's Modern Healthcare Platform
          </GlassCard>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight" style={{ color: "#6366f1", textShadow: "0 0 80px rgba(59,130,246,0.3)" }}>
            Your Health,{" "}
            <span style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Reimagined
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Connect with verified doctors, manage your prescriptions, and take full control of your health journey — all from one beautiful platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => router.push("/auth")}
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)", boxShadow: "0 8px 32px rgba(59,130,246,0.4)" }}
            >
              Get Started Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById("services").scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white border border-white/20 hover:bg-white/10 transition-all duration-300"
            >
              Explore Services
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {stats.map((s, i) => (
              <GlassCard key={i} className="flex items-center gap-3 px-5 py-3">
                <span style={{ color: "#10b981" }}>{s.icon}</span>
                <div className="text-left">
                  <p className="text-white font-bold text-lg leading-none">{s.value}</p>
                  <p className="text-slate-400 text-xs">{s.label}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={24} className="text-white/40" />
        </div>
      </section>

      {/* ───────── PRIMEHEALTH CINEMATIC SHOWCASE ───────── */}
      <section
        className="relative py-16 md:py-24 px-4 sm:px-6 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #f0f4f8 0%, #ffffff 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-12">
            <span className="text-emerald-600 font-semibold uppercase tracking-[0.25em] text-sm">
              Experience PrimeHealth
            </span>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-5"
              style={{
                background:
                  "linear-gradient(135deg,#2563eb,#10b981)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Healthcare, Without the Wait
            </h2>

            <p className="max-w-2xl mx-auto text-gray-500 leading-relaxed text-base md:text-lg">
              See how PrimeHealth connects patients with verified doctors,
              pharmacies and digital healthcare in just a few seconds.
            </p>
          </div>

          {/* Video */}
          <div
            className="relative overflow-hidden rounded-2xl md:rounded-[32px]"
            style={{
              background: "rgba(255,255,255,.08)",
              backdropFilter: "blur(20px)",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full aspect-video object-cover scale-[1.02] animate-videoZoom"
            >
              <source
                src="/videos/primehealth-promo.mp4"
                type="video/mp4"
              />
            </video>

            {/* Gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(15,23,42,.75), rgba(15,23,42,.15), transparent)",
              }}
            />
          </div>

          {/* Bottom Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="font-bold text-lg mb-2">
                Verified Doctors
              </h4>
              <p className="text-gray-500 text-sm">
                Connect instantly with trusted medical professionals across Nigeria.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="font-bold text-lg mb-2">
                Digital Healthcare
              </h4>
              <p className="text-gray-500 text-sm">
                Appointments, pharmacy and medical records in one secure platform.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="font-bold text-lg mb-2">
                Available Anytime
              </h4>
              <p className="text-gray-500 text-sm">
                Access healthcare whenever you need it from wherever you are.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" ref={servicesRef} className="py-24 px-6" style={{ background: "#f0f4f8" }}>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-widest">What We Offer</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Everything You Need for Better Health
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              From finding specialists to managing medications — PrimeHealth covers every aspect of your healthcare journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <NeuCard
                key={i}
                className={`p-6 cursor-pointer group hover:scale-105 transition-all duration-500 ${servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ background: s.bg, color: s.color }}>
                  {s.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                <button
                  onClick={() => router.push(s.href)}
                  className="flex items-center gap-1 mt-4 font-semibold text-sm transition-colors hover:underline"
                  style={{ color: s.color }}
                >
                  Learn more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </NeuCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED DOCTORS ── */}
      <section
        ref={doctorsRef}
        className="py-24 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0d2818 100%)" }}
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <div className={`text-center mb-16 transition-all duration-700 ${doctorsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-emerald-400 font-semibold text-sm uppercase tracking-widest">Our Specialists</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4" style={{ color: "#6366f1" }}>
              Meet Our Top Doctors
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              All doctors on PrimeHealth are verified medical professionals with valid licenses and credentials.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {featuredDoctors.map((doc, i) => (
              <GlassCard
                key={i}
                className={`p-5 text-center cursor-pointer hover:scale-105 transition-all duration-500 ${doctorsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
                onClick={() => router.push("/auth")}
              >
                <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-white" style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)" }}>
                  {doc.name.charAt(0)}
                </div>
                <p className="text-sm font-bold mb-0.5" style={{ color: "#4dffa6" }}>Dr. {doc.name.split(" ")[0]}</p>
                <p className="text-xs mb-1" style={{ color: "#00cfff" }}>{doc.specialty}</p>
                <p className="text-xs text-slate-400 mb-2">{doc.hospital}</p>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-xs text-white">{doc.rating}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${doc.available ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}>
                  {doc.available ? "Available" : "Busy"}
                </span>
              </GlassCard>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => router.push("/auth")}
              className="group flex items-center gap-2 px-8 py-3 rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-105 mx-auto"
              style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)" }}
            >
              View All Doctors
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section ref={stepsRef} className="py-24 px-6" style={{ background: "#f0f4f8" }}>
        <div className="max-w-5xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-widest">Simple Process</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4" style={{ color: "#6366f1" }}>
              How PrimeHealth Works
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">Getting the care you need has never been simpler.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <NeuCard
                key={i}
                className={`p-8 text-center transition-all duration-700 ${stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="text-5xl font-bold mb-4 block" style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </NeuCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section
        ref={comparisonRef}
        className="py-24 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1a2744 100%)" }}
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <div className={`text-center mb-16 transition-all duration-700 ${comparisonVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-emerald-400 font-semibold text-sm uppercase tracking-widest">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4" style={{ color: "#6366f1" }}>
              PrimeHealth vs Traditional Healthcare
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">See why thousands of Nigerians are switching to PrimeHealth.</p>
          </div>

          <div className={`transition-all duration-700 ${comparisonVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div />
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)" }}>
                  PrimeHealth
                </div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-slate-400 border border-white/10">
                  Traditional
                </div>
              </div>
            </div>

            <GlassCard className="overflow-hidden">
              {comparisonPoints.map((point, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-3 gap-4 px-6 py-4 ${i !== comparisonPoints.length - 1 ? "border-b border-white/10" : ""}`}
                >
                  <p className="text-slate-300 text-sm font-medium">{point.feature}</p>
                  <div className="flex justify-center">
                    {point.primehealth ? (
                      <CheckCircle size={20} className="text-emerald-400" />
                    ) : (
                      <X size={20} className="text-red-400" />
                    )}
                  </div>
                  <div className="flex justify-center">
                    {point.traditional ? (
                      <CheckCircle size={20} className="text-emerald-400" />
                    ) : (
                      <X size={20} className="text-red-400" />
                    )}
                  </div>
                </div>
              ))}
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section ref={statsRef} className="py-16 px-6" style={{ background: "#f0f4f8" }}>
        <div className="max-w-5xl mx-auto">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 ${statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {stats.map((s, i) => (
              <NeuCard key={i} className="p-6 text-center" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl mx-auto mb-3" style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6" }}>
                  {s.icon}
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{s.value}</p>
                <p className="text-gray-500 text-sm">{s.label}</p>
              </NeuCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section
        ref={testimonialsRef}
        className="py-24 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1a2744 100%)" }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className={`text-center mb-16 transition-all duration-700 ${testimonialsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-emerald-400 font-semibold text-sm uppercase tracking-widest">Patient Stories</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4" style={{ color: "#6366f1" }}>
              What Our Patients Say
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">Real experiences from real people who trust PrimeHealth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <GlassCard
                key={i}
                className={`p-6 transition-all duration-700 ${testimonialsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)" }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section ref={faqRef} className="py-24 px-6" style={{ background: "#f0f4f8" }}>
        <div className="max-w-3xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-700 ${faqVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-widest">Got Questions?</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-500">Here are a few things people often ask about PrimeHealth.</p>
          </div>

          <div className={`space-y-4 transition-all duration-700 ${faqVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {faqs.map((faq, i) => (
              <NeuCard key={i} className="overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className="text-gray-400 shrink-0 transition-transform duration-300"
                    style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-gray-500 text-sm leading-relaxed border-t border-gray-200">
                    <p className="pt-3">{faq.a}</p>
                  </div>
                )}
              </NeuCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section
        className="py-24 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0d2818 100%)" }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }} />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, #10b981, transparent)" }} />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight" style={{ color: "#6366f1" }}>
            Ready to Take Control of{" "}
            <span style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Your Health?
            </span>
          </h2>
          <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto">
            Join thousands of patients who trust PrimeHealth for smarter, faster, and more personalized healthcare.
          </p>
          <button
            onClick={() => router.push("/auth")}
            className="group inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-white text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)", boxShadow: "0 8px 40px rgba(59,130,246,0.5)" }}
          >
            Get Started — It's Free
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-slate-500 text-sm mt-4">No credit card required. Cancel anytime.</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">PrimeHealth</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Nigeria's leading digital healthcare platform. Connecting patients with verified doctors, pharmacies and health services.
              </p>
              <div className="flex gap-3 mt-4">
                {["f", "t", "in", "yt", "ig"].map((s, i) => (
                  <a key={i} href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition text-xs font-bold">
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Services</h4>
              <ul className="space-y-2 text-sm">
                {["Find a Doctor", "Browse Pharmacy", "Book Appointment", "Health Records", "Emergency Care", "Health Monitoring"].map((item, i) => (
                  <li key={i}><a href="/auth" className="hover:text-white transition">{item}</a></li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Legal</h4>
              <ul className="space-y-2 text-sm">
                {["Privacy Policy", "Terms of Service", "Cookie Policy", "NDPR Compliance", "Medical Disclaimer", "Accessibility"].map((item, i) => (
                  <li key={i}><a href="#" className="hover:text-white transition">{item}</a></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 shrink-0">📞</span>
                  <span>+234 800 000 0000</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 shrink-0">✉️</span>
                  <span>support@primehealth.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 shrink-0">📍</span>
                  <span>123 Health Avenue, Victoria Island, Lagos, Nigeria</span>
                </li>
              </ul>
              <a href="tel:112" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition mt-2">
                🚨 Emergency: Call 112
              </a>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="border-t border-gray-800 mt-10 pt-8">
            <div className="flex flex-wrap gap-3 justify-center mb-6">
              {["🔒 NDPR Compliant", "✅ Verified Doctors", "🏥 Licensed Platform", "🔐 SSL Encrypted", "⚕️ MCN Registered"].map((badge, i) => (
                <span key={i} className="text-xs bg-gray-800 text-gray-300 px-3 py-1.5 rounded-full border border-gray-700">
                  {badge}
                </span>
              ))}
            </div>
            <p className="text-center text-xs text-gray-500 leading-relaxed max-w-2xl mx-auto">
              ⚕️ <strong className="text-gray-400">Medical Disclaimer:</strong> PrimeHealth is a healthcare technology platform and does not provide direct medical advice, diagnosis or treatment. Always consult a qualified healthcare professional for medical concerns.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-4 px-6">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} PrimeHealth Technologies Ltd. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>🇳🇬 Made in Nigeria</span>
              <button onClick={() => router.push("/auth")} className="hover:text-white transition">Login</button>
              <button onClick={() => router.push("/auth")} className="hover:text-white transition">Sign Up</button>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.2; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 0.35; }
        }
        .animate-float { animation: float linear infinite; }
      `}</style>

    </div>
  );
}