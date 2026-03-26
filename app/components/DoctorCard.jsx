import Image from "next/image";

const neonGreen = { color: "#4dffa6", textShadow: "0 0 15px rgba(77,255,166,0.4), 0 0 30px rgba(59,130,246,0.3)" };
const neonBlue = { color: "#00cfff", textShadow: "0 0 10px rgba(0,207,255,0.4)" };

export default function DoctorCard({ name, specialty, hospital, rating, available, avatar, onClick }) {
  return (
    <div className="doctor-card bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5 hover:shadow-md transition flex flex-col cursor-pointer" onClick={onClick}>

      <div className="doctor-image relative w-full h-36 sm:h-40 rounded-lg overflow-hidden mb-4 bg-blue-50 dark:bg-gray-700">
        {avatar ? (
          <Image src={avatar} alt={name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-blue-300 text-sm">No Image</span>
          </div>
        )}
      </div>

      {/* Name in neon green */}
      <h3 className="font-semibold text-base sm:text-lg mb-1" style={neonGreen}>{name}</h3>

      {/* Specialty in neon blue */}
      <p className="text-sm font-medium" style={neonBlue}>{specialty}</p>

      {/* Hospital */}
      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">{hospital}</p>

      <div className="flex items-center justify-between mt-3">
        <span className="text-sm text-yellow-500 font-medium">⭐ {rating}</span>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${available ? "badge-available bg-green-100 text-green-700" : "badge-busy bg-red-100 text-red-700"}`}>
          {available ? "Available" : "Busy"}
        </span>
      </div>

      <button
        disabled={!available}
        onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
        className={`mt-4 w-full py-2 rounded-lg text-sm transition ${available ? "book-btn-available bg-blue-600 text-white hover:bg-blue-700" : "book-btn-disabled bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400 cursor-not-allowed"}`}
      >
        Book Appointment
      </button>
    </div>
  );
}