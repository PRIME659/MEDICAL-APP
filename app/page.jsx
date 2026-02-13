export default function HomePage() {
  return (
    <div className="space-y-10 pt-32">
      {/* Hero Section */}
      <section
        className="text-center py-20 rounded-lg"
        style={{
          background: "linear-gradient(135deg, #ffffff 70%, #bbf7d0 30%)",
        }}

      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Welcome to PrimeHealth
        </h1>

        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Find doctors, book appointments, and access pharmacy drugs easily.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/doctors"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Find a Doctor
          </a>

          <a
            href="/pharmacy"
            className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition"
          >
            Browse Pharmacy
          </a>
        </div>
      </section>

      {/* Medical Tips */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          Medical Tips
        </h2>
        <p className="text-gray-600">
          Daily health tips will appear here using a medical tips API later.
        </p>
      </section>
    </div>
  );
}
