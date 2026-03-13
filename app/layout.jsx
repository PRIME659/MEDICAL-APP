import "./globals.css";
import Navbar from "./components/Navbar";
import MedicalBackground from "./components/MedicalBackground";
import { Playpen_Sans } from "next/font/google";

const playpen = Playpen_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playpen",
});

export const metadata = {
  title: "PrimeHealth",
  description: "Modern Healthcare Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={playpen.variable}>
      <body
        className="
          min-h-screen
          transition-colors
          duration-300
          overflow-x-hidden
        "
      >
        <div className="fixed inset-0 -z-10">
          <MedicalBackground />
        </div>
        <Navbar />
        <main className="relative z-10 pt-32 px-6 max-w-7xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}