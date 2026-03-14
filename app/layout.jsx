import "./globals.css";
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
      <body className="min-h-screen transition-colors duration-300 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}