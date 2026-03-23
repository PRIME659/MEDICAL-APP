"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function AppointmentsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    doctor: "",
    date: "",
    description: "",
  });

  const doctors = ["Dr. Adebayo", "Dr. Chukwu", "Dr. Ibrahim", "Dr. Johnson"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.doctor) {
      toast.error("Please select a doctor.");
      return;
    }
    if (!formData.date) {
      toast.error("Please select a date.");
      return;
    }

    toast.success(
      `Appointment with ${formData.doctor} on ${formData.date} booked!`,
      { duration: 3000 }
    );

    setTimeout(() => {
      router.push(
        `/confirmation?name=${encodeURIComponent(formData.name)}&doctor=${encodeURIComponent(formData.doctor)}&date=${encodeURIComponent(formData.date)}&email=${encodeURIComponent(formData.email)}`
      );
    }, 1500);

    setFormData({ name: "", email: "", doctor: "", date: "", description: "" });
  };

  return (
    <ProtectedRoute>
      <div className="space-y-6 px-4 md:px-0">

        <section>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2 appointments-header">
            Book an Appointment
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Fill out the form below to schedule an appointment with a doctor.
          </p>
        </section>

        <section className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-xl shadow-md">
          <form className="space-y-4" onSubmit={handleSubmit}>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="">Select Doctor</option>
                {doctors.map((doc) => (
                  <option key={doc} value={doc}>{doc}</option>
                ))}
              </select>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <textarea
              name="description"
              placeholder="Describe the problem"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
              rows={4}
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition text-sm sm:text-base"
            >
              Book Appointment
            </button>
          </form>
        </section>

        <div className="flex justify-center mt-10">
          <Link href="/" className="text-blue-700 text-base font-medium hover:underline">
            Home
          </Link>
        </div>

      </div>
    </ProtectedRoute>
  );
}