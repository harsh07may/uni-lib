import type { Metadata } from "next";

import "./globals.css";

import { ReactNode } from "react";
import localFont from "next/font/local";

import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

import { Toaster } from "@/components/ui/sonner";

// prettier-ignore
const ibmPlexSans = localFont({
  src: [
    { path: "/fonts/IBMPlexSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "/fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "/fonts/IBMPlexSans-SemiBold.ttf",weight: "600",style: "normal",},
    { path: "/fonts/IBMPlexSans-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const BebasNeueRegular = localFont({
  src: [
    { path: "/fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--bebas-neue",
});

export const metadata: Metadata = {
  title: "BookWise",
  description: "BookWise is a library management platform.",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${ibmPlexSans.className} ${BebasNeueRegular.variable} antialiased`}
        >
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
