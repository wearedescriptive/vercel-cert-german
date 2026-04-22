import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import { geistSans, geistMono } from "./fonts";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getPublicationConfig } from "@/lib/api";

export async function generateMetadata() {
  const config = await getPublicationConfig();
  const seo = config?.data.seo;

  const titleTemplate = seo?.titleTemplate ?? "%s | Vercel Daily News";
  const defaultTitle = seo?.defaultTitle ?? "Vercel Daily News";
  const defaultDescription =
    seo?.defaultDescription ??
    "The latest news, tutorials, and insights for modern web developers. Covering web development, AI, cloud, and developer experience.";

  return {
    metadataBase: new URLSearchParams(process.env.VERCEL_URL)
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:300`,
    title: {
      template: titleTemplate,
      default: defaultTitle,
    },
    description: defaultDescription,
    openGraph: {
      siteName: defaultTitle,
      locale: "en_US",
      type: "website",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans flex min-h-screen flex-col`}
      >
        <Header />
        <div className="flex-1">{children}</div>
        <Analytics />
        <SpeedInsights />
        <Footer />
      </body>
    </html>
  );
}
