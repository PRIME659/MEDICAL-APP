export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 flex flex-col animate-pulse">
      
      {/* Image placeholder */}
      <div className="w-full h-40 rounded-lg bg-gray-200 dark:bg-gray-700 mb-4" />

      {/* Name */}
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
      
      {/* Specialty */}
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2" />
      
      {/* Hospital */}
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4" />

      {/* Rating & Badge */}
      <div className="flex items-center justify-between mt-auto">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16" />
      </div>

      {/* Button */}
      <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded-lg mt-4" />
    </div>
  );
}