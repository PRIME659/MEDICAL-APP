"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import DoctorCard from "../../components/DoctorCard";
import SkeletonCard from "../../components/SkeletonCard";
import DoctorModal from "../../components/DoctorModal";
import ProtectedRoute from "../../components/ProtectedRoute";
import { doctorsAPI } from "../../lib/api";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [specialties, setSpecialties] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const data = await doctorsAPI.specialties();
        setSpecialties(["All", ...data]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSpecialties();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const params = {};
        if (search) params.search = search;
        if (specialty !== "All") params.specialty = specialty;
        const data = await doctorsAPI.list(params);
        setDoctors(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        setError("Failed to load doctors.");
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };
    const debounce = setTimeout(fetchDoctors, 300);
    return () => clearTimeout(debounce);
  }, [search, specialty]);

  return (
    <ProtectedRoute>
      <div className="space-y-8">

        <header className="doctors-header">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Find a Doctor
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
            Search and filter doctors by specialty.
          </p>
        </header>

        <section className="flex flex-col sm:flex-row gap-4">
          <form onSubmit={(e) => e.preventDefault()} className="relative w-full sm:w-2/3">
            <input
              type="text"
              placeholder="Search doctor by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg pl-4 pr-12 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition">
              <Search size={18} />
            </button>
          </form>

          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="w-full sm:w-1/3 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            {specialties.map((spec) => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

          {error && (
            <div className="col-span-full text-center py-16">
              <p className="text-4xl mb-3">⚠️</p>
              <p className="text-red-500 font-medium">Error: {error}</p>
              <p className="text-gray-400 text-sm mt-1">Please try again later.</p>
            </div>
          )}

          {!loading && !error && doctors.length > 0 &&
            doctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                name={doctor.name}
                specialty={doctor.specialty}
                hospital={doctor.hospital}
                rating={doctor.rating}
                available={doctor.is_available}
                avatar={doctor.avatar_url}
                onClick={() => setSelectedDoctor(doctor)}
              />
            ))
          }

          {!loading && !error && doctors.length === 0 && (
            <div className="col-span-full text-center py-16">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-gray-500 dark:text-gray-400 font-medium">No doctors found.</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Try a different name or specialty.</p>
            </div>
          )}
        </section>

        {selectedDoctor && (
          <DoctorModal
            doctor={selectedDoctor}
            onClose={() => setSelectedDoctor(null)}
          />
        )}

      </div>
    </ProtectedRoute>
  );
}