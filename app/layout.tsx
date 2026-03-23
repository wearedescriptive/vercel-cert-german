import "./globals.css";
import { geistSans, geistMono } from "./fonts";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getPublicationConfig } from "@/lib/data";

export async function generateMetadata() {
  "use cache";

  const config = await getPublicationConfig();
  const seo = config.data.seo;

  return {
    metadataBase: new URLSearchParams(process.env.VERCEL_URL)
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:300`,
    title: {
      template: seo.titleTemplate,
      default: seo.defaultTitle,
    },
    description: seo.defaultDescription,
    openGraph: {
      siteName: seo.defaultTitle,
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
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
