import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../../globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/app/providers";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/app/(public)/[locale]/header";
import { Footer } from "@/app/(public)/[locale]/footer";
import { FloatingWhatsapp } from "@/components/floating-whatsapp";

const montserrat = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PT Ricaleen Persada Jaya · Non-Ferrous Metal Trading Company",
  description: "Metal Trading Company",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html
      lang={locale}
      className={`${montserrat.variable} antialiased`}
      suppressHydrationWarning
    >
      <meta name="apple-mobile-web-app-title" content="Ricaleen" />
      <body className="flex min-h-screen flex-col">
        <FloatingWhatsapp />
        <NextIntlClientProvider>
          <Providers>
            <Toaster position="top-right" />
            <Header />
            <div className="grow">{children}</div>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
