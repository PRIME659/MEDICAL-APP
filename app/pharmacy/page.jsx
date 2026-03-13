"use client";

import { Search } from "lucide-react";
import { useState, useEffect } from "react";

export default function PharmacyPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch drugs from OpenFDA
  useEffect(() => {
    setLoading(true);

    fetch("https://api.fda.gov/drug/label.json?limit=20")
      .then((res) => res.json())
      .then((data) => {
        const formattedDrugs = data.results.map((item) => ({
          name: item.openfda?.brand_name?.[0] || "Unknown Drug",
          category: item.openfda?.pharm_class_epc?.[0] || "General",
          price: "₦—", // FDA does NOT provide pricing
          available: true, // FDA does NOT track stock
        }));

        setDrugs(formattedDrugs);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Extract unique categories
  const categories = ["All", ...new Set(drugs.map((d) => d.category))];

  // Filter drugs
  const filteredDrugs = drugs.filter((drug) => {
    const matchesName = drug.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || drug.category === category;
    return matchesName && matchesCategory;
  });

  return (


    <div className="space-y-10">
      {/* Navbar-safe spacing */}
      <div className="h-16 md:h-20" />

      {/* Header */}
      <section className="pharmacy-header">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Pharmacy</h1>
        <p className="text-slate-600 mb-6">
          Browse and purchase essential medications easily.
        </p>
      </section>

      {/* Search & Filter */}
      <section className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* SEARCH INPUT WITH ICON */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative w-full sm:w-2/3"
        >
          <input
            type="text"
            placeholder="Search drug by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg
                 pl-4 pr-12 py-2 placeholder-gray-400 text-gray-900
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

        {/* CATEGORY FILTER */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full sm:w-1/3
             border border-gray-300 rounded-lg
             px-4 py-2
             bg-white
             text-gray-900
             focus:outline-none focus:ring-2 focus:ring-blue-500"
        >

          {categories.map((cat) => (
            <option
              key={cat}
              value={cat}
              className="text-gray-900 bg-white"
            >
              {cat}
            </option>

          ))}
        </select>
      </section>


      {/* Loading State */}
      {loading && <p className="text-gray-500">Loading drugs...</p>}

      {/* Drugs Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading && filteredDrugs.length > 0 ? (
          filteredDrugs.map((drug, index) => (
            <div
              key={index}
              className="pharmacy-card bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              {/* Image placeholder */}
              <div className="drug-image w-full h-32 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <span className="text-blue-300 text-sm">Drug Image</span>
              </div>

              {/* Info */}
              <h3 className="font-semibold text-lg text-slate-900">
                {drug.name}
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                {drug.category}
              </p>

              {/* Price & Availability */}
              <div className="flex items-center justify-between mt-4">
                <span className="font-bold text-green-600">
                  {drug.price}
                </span>
                <span className="stock-badge text-xs px-2 py-1 rounded-full font-medium bg-green-100 text-green-700">
                  In Stock
                </span>
              </div>

              {/* Buy Button */}
              <button
                className="mt-4 w-full py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Buy
              </button>
            </div>
          ))
        ) : (
          !loading && (
            <p className="text-gray-500 col-span-full">
              No drugs found.
            </p>
          )
        )}
      </section>
    </div>
  );
}
