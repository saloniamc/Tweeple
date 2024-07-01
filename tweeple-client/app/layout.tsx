import type { Metadata } from "next";
import { GoogleOAuthProvider} from '@react-oauth/google';
import { Inter } from "next/font/google";
import "./globals.css";
import { Component } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body>
      <GoogleOAuthProvider clientId="184963393024-1ml9n2g5ufu65ha738fgi7o6nlu3pgpq.apps.googleusercontent.com">
          <div className={inter.className}>{children}</div>
        </GoogleOAuthProvider>
    </body>    
    </html>
  );
}
