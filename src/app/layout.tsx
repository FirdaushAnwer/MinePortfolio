import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Md Firdaush — Computer Science & Engineering Student",
  description:
    "Md Firdaush is a Computer Science & Engineering student, developer and student leader interested in software development, hackathons, problem solving and technology.",
  keywords: [
    "Md Firdaush",
    "Computer Science and Engineering",
    "SSSE",
    "Sri Siddhartha School of Engineering",
    "Developer Portfolio",
    "Student Leader",
    "Code Crackers",
    "Hackathons",
    "Software Engineering",
  ],
  authors: [{ name: "Md Firdaush" }],
  creator: "Md Firdaush",
  openGraph: {
    title: "Md Firdaush — Computer Science & Engineering Student",
    description:
      "Md Firdaush is a Computer Science & Engineering student, developer and student leader interested in software development, hackathons, problem solving and technology.",
    siteName: "Md Firdaush Portfolio",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#050505] text-[#FFFFFF] antialiased selection:bg-[#E31B23] selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
