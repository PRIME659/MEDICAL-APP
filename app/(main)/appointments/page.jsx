"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import ProtectedRoute from "../../components/ProtectedRoute";
import { appointmentsAPI, doctorsAPI } from "../../lib/api";

export default function AppointmentsPage() {
  const router = useRouter();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
    time: "",
    description: "",
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await doctorsAPI.list();
        setDoctors(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.doctor) {
      toast.error("Please select a doctor.");
      return;
    }
    if (!formData.date) {
      toast.error("Please select a date.");
      return;
    }
    if (!formData.time) {
      toast.error("Please select a time.");
      return;
    }

    setLoading(true);

    try {
      const result = await appointmentsAPI.book({
        doctor_id: formData.doctor,
        date: formData.date,
        time: formData.time,
        description: formData.description,
      });

      toast.success(result.message, { duration: 3000 });

      const doctor = doctors.find((d) => d.id === parseInt(formData.doctor));

      setTimeout(() => {
        router.push(
          `/confirmation?doctor=${encodeURIComponent(doctor?.name || "")}&date=${encodeURIComponent(formData.date)}&ref=${encodeURIComponent(result.appointment.reference_number)}`
        );
      }, 1500);

      setFormData({ doctor: "", date: "", time: "", description: "" });
    } catch (err) {
      toast.error(err.data?.error || "Failed to book appointment.");
    } finally {
      setLoading(false);
    }
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
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="">Select Doctor</option>
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    Dr. {doc.name} — {doc.specialty}
                  </option>
                ))}
              </select>

              <div className="relative w-full">
                <input
                  type="date"
                  name="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={formData.date}
                  onChange={handleChange}
                  required
                  placeholder="Select appointment date"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            <div className="w-full">
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                Appointment Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                onClick={(e) => e.target.showPicker?.()}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm cursor-pointer"
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
              disabled={loading}
              className="w-full bg-blue-600 disabled:bg-blue-400 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition text-sm sm:text-base"
            >
              {loading ? "Booking..." : "Book Appointment"}
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