"use client";

import { useState, useEffect, useRef } from "react";

const faqs = [
  { q: "How do I book an appointment?", a: "You can book an appointment through our online booking system on the website, by calling our reception desk, or by visiting the hospital in person." },
  { q: "What medical services do you provide?", a: "We provide a wide range of services including general consultations, laboratory testing, radiology, surgery, emergency care, and specialist treatments." },
  { q: "Do you offer emergency services?", a: "Yes. Our emergency department operates 24 hours a day, 7 days a week to handle urgent medical situations." },
  { q: "What should I bring to my appointment?", a: "Please bring a valid ID, your medical records (if available), referral documents (if required), and your insurance information." },
  { q: "What are the visiting hours?", a: "Visiting hours are usually between 10:00 AM and 8:00 PM, but may vary depending on the ward or department." },
  { q: "Is parking available at the hospital?", a: "Yes. Parking is available on hospital premises for patients and visitors." },
  { q: "Do you offer telemedicine or virtual consultations?", a: "Yes. Patients can schedule virtual consultations with selected doctors through our telehealth platform." },
  { q: "How do I know which specialist I need?", a: "If you are unsure, you can schedule an appointment with a general practitioner who will evaluate your condition and refer you to the appropriate specialist." },
  { q: "How long will my appointment take?", a: "Most consultations last between 20–45 minutes, depending on the nature of the visit." },
  { q: "Can I request a second medical opinion?", a: "Yes. Patients are welcome to request a second opinion from another specialist within the hospital." },
  { q: "How long does it take to receive lab results?", a: "Most laboratory results are available within 24–72 hours. Some specialized tests may take longer." },
  { q: "What happens when I am admitted to the hospital?", a: "Once admitted, our staff will guide you through registration, room assignment, and initial medical evaluation." },
  { q: "What should I bring if I am staying overnight?", a: "Patients are advised to bring personal items such as clothing, toiletries, identification documents, and necessary medications." },
  { q: "Can family members stay with patients?", a: "In certain wards, one family member may be allowed to stay with the patient depending on hospital policies." },
  { q: "How do I contact the hospital?", a: "You can contact us via phone, email, or the contact form available on our website." },
];

function FAQItem({ faq, isLarge }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  const isVisible = isLarge ? hovered || open : open;

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setOpen(false);
        setHovered(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div
      ref={cardRef}
      onClick={() => setOpen(!open)}
      onMouseEnter={() => isLarge && setHovered(true)}
      onMouseLeave={() => isLarge && !open && setHovered(false)}
      className="cursor-pointer rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-all duration-200 hover:shadow-md"
    >
      <div className="px-4 py-3 flex justify-between items-center">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          {faq.q}
        </p>
        <span className="text-green-600 text-lg ml-2">
          {isVisible ? "−" : "+"}
        </span>
      </div>

      {isVisible && (
        <div className="px-4 pb-3 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700 pt-2">
          {faq.a}
        </div>
      )}
    </div>
  );
}

export default function FAQPanel({ open, onClose }) {
  const [showAll, setShowAll] = useState(false);
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const check = () => setIsLarge(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Reset showAll when panel closes
  useEffect(() => {
    if (!open) setShowAll(false);
  }, [open]);

  const displayed = showAll ? faqs : faqs.slice(0, 5);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[9998] bg-black/30 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sliding Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-full z-[9999] bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-white text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Questions */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {displayed.map((faq, i) => (
            <FAQItem key={i} faq={faq} isLarge={isLarge} />
          ))}

          {!showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="w-full text-center text-sm text-green-600 font-semibold hover:underline pt-2"
            >
              See more
            </button>
          )}
        </div>
      </div>
    </>
  );
}