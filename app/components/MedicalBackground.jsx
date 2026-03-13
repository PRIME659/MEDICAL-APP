"use client";

export default function MedicalBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">

      {/* Base Gradient */}
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: `var(--bg-gradient, linear-gradient(180deg, #f5f7fa 0%, #edf1f5 40%, #e6ebf0 100%))`
        }}
      />

      {/* Neumorphic Surface 1 */}
      <div
        className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full transition-all duration-300"
        style={{
          background: "var(--surface-1, #eef2f6)",
          boxShadow: `
            -40px -40px 80px rgba(255,255,255,0.9),
            40px 40px 80px rgba(0,0,0,0.08)
          `
        }}
      />

      {/* Neumorphic Surface 2 */}
      <div
        className="absolute bottom-[10%] right-[8%] w-[420px] h-[420px] rounded-full transition-all duration-300"
        style={{
          background: "var(--surface-2, #edf1f5)",
          boxShadow: `
            -35px -35px 70px rgba(255,255,255,0.9),
            35px 35px 70px rgba(0,0,0,0.08)
          `
        }}
      />

      {/* Ambient highlight */}
      <div
        className="absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] opacity-40 transition-all duration-300"
        style={{
          background: "var(--ambient, radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 70%))"
        }}
      />

    </div>
  );
}