"use client";

import { useState } from "react";
import Link from "next/link";

export default function AppointmentsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    doctor: "",
    date: "",
    description: "",
  });
  const [confirmation, setConfirmation] = useState("");

  const doctors = ["Dr. Adebayo", "Dr. Chukwu", "Dr. Ibrahim", "Dr. Johnson"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Show confirmation message
    setConfirmation(
      `✅ Thank you, ${formData.name}! Your appointment with ${formData.doctor} on ${formData.date} has been booked.\nA detailed schedule will be sent to ${formData.email}.`
    );

    // Clear form
    setFormData({ name: "", email: "", doctor: "", date: "", description: "" });

    // Hide confirmation after 7 seconds
    setTimeout(() => setConfirmation(""), 7000);
  };

  return (
    <div className="space-y-6 px-4 md:px-0">
      {/* Navbar-safe spacing */}
      <div className="h-16 md:h-20" />

      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Book an Appointment
        </h1>
        <p className="text-slate-600">
          Fill out the form below to schedule an appointment with a doctor.
        </p>
      </section>

      {/* Confirmation Message */}
      {confirmation && (
        <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg whitespace-pre-line font-medium">
          {confirmation}
        </div>
      )}

      {/* Appointment Form */}
      <section className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name & Email */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full sm:w-2/3 border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full sm:w-2/3 border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Doctor & Date */}
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              required
              className="w-full sm:w-2/3 border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Doctor</option>
              {doctors.map((doc) => (
                <option key={doc} value={doc}>
                  {doc}
                </option>
              ))}
            </select>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full sm:w-2/3 border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <textarea
              name="description"
              placeholder="Describe the problem"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Book Appointment
          </button>
        </form>
      </section>

      {/* Back to Home Arrow */}
      <div className="flex justify-center mt-10">
        <Link href="/" className="text-blue-700 text-3xl font-bold animate-bounce">
          ⬆ Back to Home
        </Link>
      </div>
    </div>
  );
}
