"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Stethoscope, Pill, Calendar, Shield, Clock, Star, ChevronDown, ArrowRight, Activity, Heart, Users } from "lucide-react";

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

  const services = [
    {
      icon: <Stethoscope size={28} />,
      title: "Find a Doctor",
      desc: "Browse verified specialists across all medical fields. Filter by specialty, availability, and location.",
      color: "#3b82f6",
      bg: "rgba(59,130,246,0.1)",
      href: "/auth",
    },
    {
      icon: <Pill size={28} />,
      title: "Browse Pharmacy",
      desc: "Access a wide catalog of medications. Search, compare, and order essential drugs with ease.",
      color: "#10b981",
      bg: "rgba(16,185,129,0.1)",
      href: "/auth",
    },
    {
      icon: <Calendar size={28} />,
      title: "Book Appointments",
      desc: "Schedule in-person or virtual consultations in seconds. Get instant confirmation and reminders.",
      color: "#6366f1",
      bg: "rgba(99,102,241,0.1)",
      href: "/auth",
    },
    {
      icon: <Shield size={28} />,
      title: "Secure Health Records",
      desc: "Your medical history stored safely and accessible only to you and your care providers.",
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.1)",
      href: "/auth",
    },
    {
      icon: <Clock size={28} />,
      title: "24/7 Emergency Care",
      desc: "Round-the-clock emergency support and telemedicine consultations whenever you need them.",
      color: "#ef4444",
      bg: "rgba(239,68,68,0.1)",
      href: "/auth",
    },
    {
      icon: <Activity size={28} />,
      title: "Health Monitoring",
      desc: "Track your vitals, appointments, and prescriptions all in one unified dashboard.",
      color: "#8b5cf6",
      bg: "rgba(139,92,246,0.1)",
      href: "/auth",
    },
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
  ];

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: "'Playpen Sans', cursive" }}>

      {/* ── HERO ──────────────────────────────────────────── */}
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
            Modern Healthcare Platform
          </GlassCard>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight" style={{ textShadow: "0 0 80px rgba(59,130,246,0.3)" }}>
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

      {/* ── SERVICES ──────────────────────────────────────── */}
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

      {/* ── HOW IT WORKS ──────────────────────────────────── */}
      <section
        ref={stepsRef}
        className="py-24 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0d2818 100%)" }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-96 h-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }} />
          <div className="absolute bottom-10 left-20 w-80 h-80 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, #10b981, transparent)" }} />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className={`text-center mb-16 transition-all duration-700 ${stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-emerald-400 font-semibold text-sm uppercase tracking-widest">Simple Process</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">How PrimeHealth Works</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Getting the care you need has never been simpler.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <GlassCard
                key={i}
                className={`p-8 text-center transition-all duration-700 ${stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div
                  className="text-5xl font-bold mb-4 block"
                  style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────── */}
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

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">What Our Patients Say</h2>
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

      {/* ── FAQ TEASER ────────────────────────────────────── */}
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

          <div className="text-center mt-8">
            <button
              onClick={() => router.push("/auth")}
              className="text-blue-600 font-semibold text-sm hover:underline"
            >
              See all FAQs →
            </button>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────── */}
      <section
        className="py-24 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0d2818 100%)" }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }} />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, #10b981, transparent)" }} />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 leading-tight">
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

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="py-8 px-6 border-t border-gray-200" style={{ background: "#f0f4f8" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p className="font-bold text-gray-900">PrimeHealth</p>
          <p>© {new Date().getFullYear()} PrimeHealth. All rights reserved.</p>
          <div className="flex gap-4">
            <button onClick={() => router.push("/auth")} className="hover:text-blue-600 transition">Login</button>
            <button onClick={() => router.push("/auth")} className="hover:text-blue-600 transition">Sign Up</button>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.2; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 0.35; }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>

    </div>
  );
}