"use client";

import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import SkeletonCard from "../../components/SkeletonCard";
import PharmacyModal from "../../components/PharmacyModal";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function PharmacyPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState(null);

  const handleAddToCart = (drug) => {
    window.dispatchEvent(new CustomEvent("addToCart", { detail: drug }));
  };

  useEffect(() => {
    setLoading(true);
    fetch("https://api.fda.gov/drug/label.json?limit=20")
      .then((res) => res.json())
      .then((data) => {
        const formattedDrugs = data.results.map((item) => ({
          name: item.openfda?.brand_name?.[0] || "Unknown Drug",
          category: item.openfda?.pharm_class_epc?.[0] || "General",
          price: "₦—",
          available: true,
        }));
        setDrugs(formattedDrugs);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const categories = ["All", ...new Set(drugs.map((d) => d.category))];

  const filteredDrugs = drugs.filter((drug) => {
    const matchesName = drug.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || drug.category === category;
    return matchesName && matchesCategory;
  });

  return (
    <ProtectedRoute>
      <div className="space-y-8">

        {/* Header */}
        <section className="pharmacy-header">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Pharmacy
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Browse and purchase essential medications easily.
          </p>
        </section>

        {/* Search & Filter */}
        <section className="flex flex-col sm:flex-row gap-4">
          <form onSubmit={(e) => e.preventDefault()} className="relative w-full sm:w-2/3">
            <input
              type="text"
              placeholder="Search drug by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg pl-4 pr-12 py-2 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition">
              <Search size={18} />
            </button>
          </form>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full sm:w-1/3 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </section>

        {/* Drugs Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {loading && Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

          {!loading && filteredDrugs.length > 0 &&
            filteredDrugs.map((drug, index) => (
              <div
                key={index}
                onClick={() => setSelectedDrug(drug)}
                className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between cursor-pointer"
              >
                <div className="w-full h-32 bg-blue-50 dark:bg-[#0f172a] rounded-lg flex items-center justify-center mb-4">
                  <span className="text-4xl">💊</span>
                </div>
                <h3 className="font-semibold text-base text-slate-900 dark:text-white">{drug.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{drug.category}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-bold text-green-600">{drug.price}</span>
                  <span className="text-xs px-2 py-1 rounded-full font-medium bg-green-100 text-green-700">
                    In Stock
                  </span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedDrug(drug); }}
                  className="mt-4 w-full py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  View Details
                </button>
              </div>
            ))
          }

          {!loading && filteredDrugs.length === 0 && (
            <div className="col-span-full text-center py-16">
              <p className="text-4xl mb-3">💊</p>
              <p className="text-gray-500 dark:text-gray-400 font-medium">No drugs found.</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Try a different name or category.</p>
            </div>
          )}

        </section>

        {/* Pharmacy Modal */}
        {selectedDrug && (
          <PharmacyModal
            drug={selectedDrug}
            onClose={() => setSelectedDrug(null)}
            onAddToCart={handleAddToCart}
          />
        )}

      </div>
    </ProtectedRoute>
  );
}