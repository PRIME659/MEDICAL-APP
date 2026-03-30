"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Welcome to PrimeHealth! 👋",
    subtitle: "Let's get to know you better",
    icon: "🏥",
  },
  {
    id: 2,
    title: "Your Health Interests",
    subtitle: "Select all that apply to you",
    icon: "💊",
  },
  {
    id: 3,
    title: "Preferred Specialty",
    subtitle: "What type of doctor do you usually see?",
    icon: "🩺",
  },
];

const healthInterests = [
  "General Wellness", "Heart Health", "Mental Health",
  "Nutrition & Diet", "Fitness", "Chronic Disease Management",
  "Women's Health", "Children's Health", "Skin Care", "Eye Care",
];

const specialties = [
  "General Practitioner", "Cardiologist", "Dermatologist",
  "Neurologist", "Pediatrician", "Gynecologist",
  "Orthopedist", "Psychiatrist", "Ophthalmologist", "ENT Specialist",
];

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleComplete = () => {
    localStorage.setItem("onboarded", "true");
    localStorage.setItem("userName", name || "User");
    onComplete();
  };

  const canProceed = () => {
    if (step === 1) return name.trim().length > 0;
    if (step === 2) return selectedInterests.length > 0;
    if (step === 3) return selectedSpecialty !== "";
    return false;
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}>
      <div
        className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: "#0f172a",
          border: "1px solid rgba(77,255,166,0.2)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(77,255,166,0.1)",
        }}
      >

        {/* Progress bar */}
        <div className="h-1 bg-gray-800">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${(step / 3) * 100}%`,
              background: "linear-gradient(135deg, #3b82f6, #10b981)",
            }}
          />
        </div>

        {/* Content */}
        <div className="p-8">

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            {steps.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all duration-300"
                style={{
                  background: step >= s.id ? "linear-gradient(135deg, #3b82f6, #10b981)" : "rgba(255,255,255,0.1)",
                  color: step >= s.id ? "white" : "#64748b",
                }}
              >
                {step > s.id ? <Check size={14} /> : s.id}
              </div>
            ))}
            <span className="text-xs text-slate-500 ml-2">Step {step} of 3</span>
          </div>

          {/* Icon */}
          <p className="text-4xl mb-4">{steps[step - 1].icon}</p>

          {/* Title */}
          <h2 className="text-xl font-bold mb-1" style={{ color: "#4dffa6", textShadow: "0 0 15px rgba(77,255,166,0.4)" }}>
            {steps[step - 1].title}
          </h2>
          <p className="text-slate-400 text-sm mb-6">{steps[step - 1].subtitle}</p>

          {/* Step 1 - Name */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="rounded-xl p-3.5" style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}>
                <label className="block text-xs font-medium text-blue-300 mb-1">Your Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Amara Okonkwo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm"
                  autoFocus
                />
              </div>
              <div className="rounded-xl p-3.5" style={{ background: "rgba(59,130,246,0.05)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <p className="text-xs text-slate-400 leading-relaxed">
                  PrimeHealth connects you with verified doctors, pharmacy services and appointment booking — all in one place. Let's personalize your experience.
                </p>
              </div>
            </div>
          )}

          {/* Step 2 - Health Interests */}
          {step === 2 && (
            <div className="flex flex-wrap gap-2 max-h-52 overflow-y-auto">
              {healthInterests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                  style={{
                    background: selectedInterests.includes(interest)
                      ? "linear-gradient(135deg, #3b82f6, #10b981)"
                      : "rgba(255,255,255,0.06)",
                    border: selectedInterests.includes(interest)
                      ? "1px solid transparent"
                      : "1px solid rgba(255,255,255,0.1)",
                    color: selectedInterests.includes(interest) ? "white" : "#94a3b8",
                  }}
                >
                  {selectedInterests.includes(interest) ? "✓ " : ""}{interest}
                </button>
              ))}
            </div>
          )}

          {/* Step 3 - Specialty */}
          {step === 3 && (
            <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto">
              {specialties.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className="px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-all duration-200"
                  style={{
                    background: selectedSpecialty === spec
                      ? "linear-gradient(135deg, #3b82f6, #10b981)"
                      : "rgba(255,255,255,0.06)",
                    border: selectedSpecialty === spec
                      ? "1px solid transparent"
                      : "1px solid rgba(255,255,255,0.1)",
                    color: selectedSpecialty === spec ? "white" : "#94a3b8",
                  }}
                >
                  {selectedSpecialty === spec ? "✓ " : ""}{spec}
                </button>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white transition border border-white/10 hover:bg-white/5"
              >
                <ArrowLeft size={16} /> Back
              </button>
            )}

            {step < 3 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canProceed()}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)" }}
              >
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={!canProceed()}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)" }}
              >
                Get Started <Check size={16} />
              </button>
            )}
          </div>

          {/* Skip */}
          <button
            onClick={handleComplete}
            className="w-full text-center text-xs text-slate-600 hover:text-slate-400 transition mt-4"
          >
            Skip for now
          </button>

        </div>
      </div>
    </div>
  );
}