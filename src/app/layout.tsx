import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { CartProvider } from "@/lib/cart-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Emmdra Empire - Fashion, Beauty, DIY & Lifestyle",
  description: "Discover your complete lifestyle destination at Emmdra Empire. From trendy fashion and beauty secrets to creative DIY projects and family activities - we have everything to make your world more beautiful.",
  keywords: "fashion, beauty, DIY, lifestyle, family activities, shopping, Nigerian lifestyle, Emmdra Empire",
  authors: [{ name: "Emmdra Empire" }],
  creator: "Emmdra Empire & Lifestyle",
  publisher: "Emmdra Empire",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://emmdra-empire.vercel.app'),
  openGraph: {
    title: "Emmdra Empire - Your Complete Lifestyle Destination",
    description: "Fashion, Beauty, DIY, Lifestyle, and Family - all in one place. Discover, create, and live beautifully with Emmdra Empire.",
    url: "https://emmdra-empire.vercel.app",
    siteName: "Emmdra Empire",
    images: [
      {
        url: "/images/EmmdraLogo.png",
        width: 1200,
        height: 630,
        alt: "Emmdra Empire Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emmdra Empire - Fashion, Beauty, DIY & Lifestyle",
    description: "Your complete lifestyle destination for fashion, beauty, DIY projects, and family activities.",
    images: ["/images/EmmdraLogo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <Navigation />
          <main className="relative">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
