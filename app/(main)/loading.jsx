export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900">

      {/* Logo */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          {/* Spinning ring */}
          <div className="absolute inset-0 rounded-full border-4 border-blue-100 dark:border-gray-700" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin" />
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">🏥</span>
          </div>
        </div>

        {/* Brand name */}
        <h2 className="text-xl font-bold text-blue-600">PrimeHealth</h2>

        {/* Animated dots */}
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0ms]" />
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:150ms]" />
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:300ms]" />
        </div>

        <p className="text-gray-400 dark:text-gray-500 text-sm">
          Loading, please wait...
        </p>
      </div>

    </div>
  );
}