import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/app/providers";

const montserrat = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ricaleen",
  description: "Metal Trading Company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${montserrat.variable} antialiased`}
      suppressHydrationWarning
    >
      <meta name="apple-mobile-web-app-title" content="Ricaleen" />
      <body>
        <Providers>
          <Toaster position="top-right" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
