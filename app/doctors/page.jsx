"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import DoctorCard from "../components/DoctorCard";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 FETCH DOCTORS FROM MOCKAPI
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(
          "https://69710db778fec16a63ffe6bd.mockapi.io/doctors"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch doctors");
        }

        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // 🔹 GET UNIQUE SPECIALTIES
  const specialties = [
    "All",
    ...new Set(doctors.map((d) => d.specialty)),
  ];

  // 🔹 FILTER LOGIC
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesName = doctor.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesSpecialty =
      specialty === "All" || doctor.specialty === specialty;

    return matchesName && matchesSpecialty;
  });

  // 🔹 SEARCH SUBMIT (button or enter)
  const handleSearch = () => {
    // filtering already reacts to state
    // no extra logic needed
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="doctors-header">
        <h1 className="text-3xl font-bold text-gray-900">
          Find a Doctor
        </h1>
        <p className="text-gray-600 mt-1">
          Search and filter doctors by specialty.
        </p>
      </header>

      {/* Search & Filter */}
      <section className="flex flex-col sm:flex-row gap-4">
        {/* SEARCH INPUT WITH ICON */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="relative w-full sm:w-2/3"
        >
          <input
            type="text"
            placeholder="Search doctor by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-4 pr-12 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2
                       text-gray-400 hover:text-blue-600 transition"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
        </form>

        {/* SPECIALTY FILTER */}
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="w-full sm:w-1/3
             border border-gray-300 rounded-lg
             px-4 py-2
             bg-white
             text-gray-900
             focus:outline-none focus:ring-2 focus:ring-blue-500"
        >

          {specialties.map((spec) => (
            <option
              key={spec}
              value={spec}
              className="text-gray-900 bg-white"
            >
              {spec}
            </option>

          ))}
        </select>
      </section>

      {/* Doctors Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && <p className="text-gray-500">Loading doctors...</p>}

        {error && (
          <p className="text-red-500">
            Error: {error}
          </p>
        )}

        {!loading && !error && filteredDoctors.length > 0 &&
          filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              name={doctor.name}
              specialty={doctor.specialty}
              hospital={doctor.hospital}
              rating={doctor.rating}
              available={doctor.available}
              avatar={doctor.avatar}
            />
          ))
        }

        {!loading && !error && filteredDoctors.length === 0 && (
          <p className="text-gray-500">
            No doctors found.
          </p>
        )}
      </section>
    </div>
  );
}
