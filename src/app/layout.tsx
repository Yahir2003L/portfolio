import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist ({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Yahir López De Santiago - Full Stack Developer",
  description: "Portafolio de Yahir López De Santiago, Ingeniero en Sistemas Computacionales y Desarrollador especializado en Frontend.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="bg-white text-black antialiased">
        {children}
      </body>
    </html>
  );
}
