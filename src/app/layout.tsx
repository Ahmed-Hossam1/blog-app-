import { Session } from "@/providers/Session";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import ReduxProvider from "@/providers/Redux";


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
          <ReduxProvider>
            <ThemeProvider attribute="class" enableSystem defaultTheme="system">
              {children}
            </ThemeProvider>
          </ReduxProvider>
          <ToastContainer
            position="bottom-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Session>
      </body>
    </html>
  );
}
