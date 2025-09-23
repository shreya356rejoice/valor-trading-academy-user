import { DM_Sans, Geist, Geist_Mono, Lexend } from "next/font/google";
import "./globals.css";
import '../scss/main.scss';
import './theme.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Suspense } from "react";

import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: 'swap',
});


export const metadata = {
  title: "VALOR TRADING ACADEMY",
  description: "VALOR TRADING ACADEMY",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lexend.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        </Suspense>
      </body>
    </html>
  );
}
