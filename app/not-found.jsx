import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-white dark:bg-gray-900">

      {/* Big 404 */}
      <h1 className="text-8xl sm:text-9xl font-bold text-blue-600 mb-4">
        404
      </h1>

      {/* Icon */}
      <p className="text-5xl mb-6">🏥</p>

      {/* Message */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
        Page Not Found
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-md mb-8">
        The page you are looking for does not exist or has been moved. Let us take you back to safety.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition text-sm"
        >
          Back to Home
        </Link>
        <Link
          href="/doctors"
          className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-semibold px-6 py-2.5 rounded-lg transition text-sm"
        >
          Find a Doctor
        </Link>
      </div>

    </div>
  );
}