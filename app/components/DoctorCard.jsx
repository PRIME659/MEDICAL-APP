import Image from "next/image";

export default function DoctorCard({
  name,
  specialty,
  hospital,
  rating,
  available,
  avatar,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition flex flex-col">
      
      {/* Doctor Image */}
      <div className="relative w-full h-40 rounded-lg overflow-hidden mb-4 bg-blue-50">
        {avatar ? (
          <Image
            src={avatar}
            alt={name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-blue-300 text-sm">No Image</span>
          </div>
        )}
      </div>

      {/* Info */}
      <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
      <p className="text-sm text-blue-600">{specialty}</p>
      <p className="text-sm text-gray-500">{hospital}</p>

      {/* Rating & Availability */}
      <div className="flex items-center justify-between mt-3">
        <span className="text-sm text-yellow-500 font-medium">
          ⭐ {rating}
        </span>

        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            available
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {available ? "Available" : "Busy"}
        </span>
      </div>

      {/* CTA */}
      <button
        disabled={!available}
        className={`mt-4 w-full py-2 rounded-lg text-sm transition ${
          available
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
      >
        Book Appointment
      </button>
    </div>
  );
}
