"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import { Printer } from "lucide-react";

function generateRef() {
  return "PH-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [ref] = useState(generateRef());
  const printRef = useRef(null);

  const name = searchParams.get("name");
  const doctor = searchParams.get("doctor");
  const date = searchParams.get("date");
  const email = searchParams.get("email");

  useEffect(() => {
    if (!name || !doctor || !date) {
      router.replace("/appointments");
    }
  }, []);

  const handlePrint = () => {
    const content = printRef.current;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Appointment Confirmation - ${ref}</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #1f2937; }
            h1 { color: #2563eb; font-size: 24px; margin-bottom: 8px; }
            p { color: #6b7280; font-size: 14px; margin-bottom: 24px; }
            .ref-box { background: #eff6ff; border-radius: 12px; padding: 16px; text-align: center; margin-bottom: 24px; }
            .ref-number { font-size: 28px; font-weight: bold; color: #2563eb; letter-spacing: 4px; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
            .label { color: #6b7280; }
            .value { font-weight: 600; color: #1f2937; }
            .footer { margin-top: 32px; text-align: center; font-size: 12px; color: #9ca3af; }
          </style>
        </head>
        <body>
          <h1>✅ Appointment Confirmed</h1>
          <p>Your appointment has been successfully booked with PrimeHealth.</p>
          <div class="ref-box">
            <div style="font-size:12px;color:#6b7280;margin-bottom:4px">Reference Number</div>
            <div class="ref-number">${ref}</div>
          </div>
          <div class="detail-row"><span class="label">Patient</span><span class="value">${name}</span></div>
          <div class="detail-row"><span class="label">Doctor</span><span class="value">${doctor}</span></div>
          <div class="detail-row"><span class="label">Date</span><span class="value">${date}</span></div>
          <div class="detail-row"><span class="label">Email</span><span class="value">${email}</span></div>
          <div class="footer">PrimeHealth © ${new Date().getFullYear()} — Keep this document for your records.</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div ref={printRef} className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-2xl w-full max-w-md p-8 text-center border border-gray-100 dark:border-slate-700">

          {/* Success icon */}
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✅</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Appointment Confirmed!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            Your appointment has been successfully booked.
          </p>

          {/* Reference number */}
          <div className="bg-blue-50 dark:bg-[#0f172a] rounded-xl p-4 mb-6">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Reference Number</p>
            <p className="text-2xl font-bold text-blue-600 tracking-widest">{ref}</p>
          </div>

          {/* Booking details */}
          <div className="space-y-3 text-left mb-8">
            <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-slate-700">
              <span className="text-sm text-gray-500 dark:text-gray-400">Patient</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{name}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-slate-700">
              <span className="text-sm text-gray-500 dark:text-gray-400">Doctor</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{doctor}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-slate-700">
              <span className="text-sm text-gray-500 dark:text-gray-400">Date</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{date}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Email</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{email}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => router.push("/appointments")}
              className="flex-1 py-2.5 rounded-xl border border-blue-600 text-blue-600 dark:text-blue-400 font-semibold text-sm hover:bg-blue-50 dark:hover:bg-slate-700 transition"
            >
              Book Another
            </button>
            <button
              onClick={handlePrint}
              className="flex-1 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-sm transition flex items-center justify-center gap-2"
            >
              <Printer size={15} />
              Print / Save
            </button>
            <button
              onClick={() => router.push("/")}
              className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition"
            >
              Go Home
            </button>
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}