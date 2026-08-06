"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { logoutUser } from "../lib/auth";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/landing");
  };

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">

      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">PrimeHealth</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Nigeria's leading digital healthcare platform. Connecting patients with verified doctors, pharmacies and health services.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition">
                <Facebook size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-sky-500 flex items-center justify-center transition">
                <Twitter size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-pink-600 flex items-center justify-center transition">
                <Instagram size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-blue-700 flex items-center justify-center transition">
                <Linkedin size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center transition">
                <Youtube size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/doctors" className="hover:text-white transition">Find a Doctor</Link></li>
              <li><Link href="/pharmacy" className="hover:text-white transition">Pharmacy</Link></li>
              <li><Link href="/appointments" className="hover:text-white transition">Book Appointment</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition">My Dashboard</Link></li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition">NDPR Compliance</a></li>
              <li><a href="#" className="hover:text-white transition">Medical Disclaimer</a></li>
              <li><a href="#" className="hover:text-white transition">Accessibility</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone size={14} className="text-green-500 mt-0.5 shrink-0" />
                <span>+234 800 000 0000</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={14} className="text-blue-500 mt-0.5 shrink-0" />
                <span>support@primehealth.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-red-500 mt-0.5 shrink-0" />
                <span>123 Health Avenue, Victoria Island, Lagos, Nigeria</span>
              </li>
            </ul>

            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-2">Emergency Helpline</p>
              <a href="tel:112" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition">
                🚨 Call 112
              </a>
            </div>
          </div>

        </div>

        {/* Certifications & Trust Badges */}
        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            {[
              "🔒 NDPR Compliant",
              "✅ Verified Doctors",
              "🏥 Licensed Platform",
              "🔐 SSL Encrypted",
              "⚕️ Medical Council Registered",
            ].map((badge, i) => (
              <span key={i} className="text-xs bg-gray-800 text-gray-300 px-3 py-1.5 rounded-full border border-gray-700">
                {badge}
              </span>
            ))}
          </div>

          <p className="text-center text-xs text-gray-500 leading-relaxed max-w-2xl mx-auto">
            ⚕️ <strong className="text-gray-400">Medical Disclaimer:</strong> PrimeHealth is a healthcare technology platform and does not provide direct medical advice, diagnosis or treatment. Always consult a qualified healthcare professional for medical concerns.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} PrimeHealth Technologies Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>🇳🇬 Made in Nigeria</span>
            <button onClick={handleLogout} className="hover:text-red-400 transition font-medium">
              Log Out
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
}