import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Url Shorten",
  description: "Streamline your web links with Gaurav Singh's cutting-edge URL Shortener, crafted using Next.js and Hono.js. Deployed on Vercel, this fast and efficient tool not only shortens URLs but also tracks visits, making it ideal for modern web developers and digital marketers. Experience seamless link management with a user-friendly interface designed for optimal performance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar/>
        {children}
        </body>
    </html>
  );
}
