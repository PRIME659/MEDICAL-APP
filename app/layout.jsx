import "./globals.css";
import { Playpen_Sans } from "next/font/google";

const playpen = Playpen_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playpen",
});

export const metadata = {
  title: "PrimeHealth — Modern Healthcare Platform",
  description: "Find verified doctors, book appointments, and access pharmacy services easily with PrimeHealth.",
  keywords: ["healthcare", "doctors", "appointments", "pharmacy", "medical", "Nigeria"],
  authors: [{ name: "PrimeHealth" }],
  openGraph: {
    title: "PrimeHealth — Modern Healthcare Platform",
    description: "Find verified doctors, book appointments, and access pharmacy services easily with PrimeHealth.",
    url: "https://medical-app-teal-sigma.vercel.app/",
    siteName: "PrimeHealth",
    images: [
      {
        url: "/PRIMEHEALTH2.png",
        width: 800,
        height: 600,
        alt: "PrimeHealth Logo",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PrimeHealth — Modern Healthcare Platform",
    description: "Find verified doctors, book appointments, and access pharmacy services easily.",
    images: ["/PRIMEHEALTH2.png"],
  },
  icons: {
    icon: "/PRIMEHEALTH2.png",
    apple: "/PRIMEHEALTH2.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={playpen.variable}>
      <body className="min-h-screen transition-colors duration-300 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}