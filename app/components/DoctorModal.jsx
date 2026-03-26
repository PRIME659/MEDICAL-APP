"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, MapPin, Star, Clock, Building2 } from "lucide-react";

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
];

export default function DoctorModal({ doctor, onClose }) {
  const modalRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("modalOpen", { detail: { open: true } }));
    document.body.style.overflow = "hidden";
    return () => {
      window.dispatchEvent(new CustomEvent("modalOpen", { detail: { open: false } }));
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >

        {/* Header image */}
        <div className="relative w-full h-48 bg-blue-50 dark:bg-[#0f172a] rounded-t-2xl overflow-hidden">
          {doctor.avatar ? (
            <Image src={doctor.avatar} alt={doctor.name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-blue-300 text-sm">No Image</span>
            </div>
          )}
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-white/80 dark:bg-[#1e293b]/80 hover:bg-white dark:hover:bg-[#1e293b] text-gray-700 dark:text-white rounded-full p-1.5 transition"
          >
            <X size={18} />
          </button>
          {/* Availability badge */}
          <div className="absolute bottom-3 left-3">
            <span className={`text-xs px-3 py-1 rounded-full font-semibold ${doctor.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {doctor.available ? "Available" : "Busy"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">

          {/* Name & Specialty */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{doctor.name}</h2>
            <p className="text-blue-600 text-sm font-medium mt-0.5">{doctor.specialty}</p>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#0f172a] rounded-lg p-3">
              <Star size={16} className="text-yellow-500 shrink-0" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Rating</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{doctor.rating} / 5.0</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#0f172a] rounded-lg p-3">
              <Building2 size={16} className="text-blue-500 shrink-0" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Hospital</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{doctor.hospital}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#0f172a] rounded-lg p-3 col-span-2">
              <MapPin size={16} className="text-red-500 shrink-0" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{doctor.hospital}, Nigeria</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">About</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {doctor.name} is a highly experienced {doctor.specialty} specialist with a proven track record of delivering quality patient care. They are dedicated to providing compassionate, evidence-based treatment tailored to each patient's unique needs.
            </p>
          </div>

          {/* Reviews */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Patient Reviews</h3>
            <div className="space-y-3">
              {[
                { name: "Amara O.", review: "Very professional and attentive. Highly recommend!", stars: 5 },
                { name: "Chidi N.", review: "Explained everything clearly. Great experience.", stars: 4 },
                { name: "Fatima B.", review: "Very thorough and kind. Will visit again.", stars: 5 },
              ].map((r, i) => (
                <div key={i} className="bg-gray-50 dark:bg-[#0f172a] rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{r.name}</p>
                    <span className="text-yellow-500 text-xs">{"⭐".repeat(r.stars)}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{r.review}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Clock size={15} /> Available Time Slots
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot, i) => (
                <button
                  key={i}
                  disabled={!doctor.available}
                  className={`text-xs py-2 px-3 rounded-lg border transition font-medium
                    ${doctor.available
                      ? "border-blue-200 dark:border-slate-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700"
                      : "border-gray-200 dark:border-slate-700 text-gray-400 cursor-not-allowed"
                    }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Book Button */}
          <button
            disabled={!doctor.available}
            onClick={() => { onClose(); router.push("/appointments"); }}
            className={`w-full py-3 rounded-xl text-sm font-semibold transition ${doctor.available ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed"}`}
          >
            {doctor.available ? "Book Appointment" : "Currently Unavailable"}
          </button>

        </div>
      </div>
    </div>
  );
}