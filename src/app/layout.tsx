import I18nProvider from "@/providers/I18nProvider";
import { Session } from "@/providers/Session";

import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog App | Modern Blogging Platform",
  description:
    "A full-stack blog application built with Next.js, MongoDB, and Prisma featuring authentication, blog management, and comments.",
  keywords: [
    "blog",
    "nextjs",
    "react",
    "prisma",
    "mongodb",
    "fullstack",
    "blogging",
  ],
  openGraph: {
    title: "Blog App | Modern Blogging Platform",
    description:
      "A full-stack blog application built with Next.js, MongoDB, and Prisma featuring authentication, blog management, and comments.",
    url: "https://nextjs-blog-app.vercel.app/",
    siteName: "Blog App",
    images: [
      {
        url: "/Dark-Logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog App | Modern Blogging Platform",
    description:
      "A full-stack blog application built with Next.js, MongoDB, and Prisma featuring authentication, blog management, and comments.",
    images: ["/Dark-Logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark:bg-surfaceDark dark:text-white transition duration-300"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Session>
          <ThemeProvider attribute="class" enableSystem defaultTheme="system">
            <I18nProvider>{children}</I18nProvider>
          </ThemeProvider>
          <ToastContainer
            position="top-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Session>
      </body>
    </html>
  );
}
