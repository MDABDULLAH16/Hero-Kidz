import {  Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar/Navbar";
import Footer from "@/components/layouts/Footer/Footer";
import localFont from "next/font/local";

const poppins = Poppins({
  weight: ["100", "200", "400", "500", "600", "800"],
});

export const fontBangla = localFont({
  src: "./../fonts/mayaboti-normal.ttf",
});
export const metadata = {
  metadataBase: new URL("https://herokidz-sage.vercel.app"),

  title: {
    default: "HeroKidz | Fun & Educational Toys for Kids",
    template: "%s | HeroKidz",
  },

  description:
    "HeroKidz is your trusted toy shop for fun, safe, and educational toys for kids. Discover exciting toys that inspire creativity and learning.",

  keywords: [
    "kids toys",
    "toy shop online",
    "educational toys",
    "baby toys",
    "kids learning toys",
    "HeroKidz toys",
    "buy toys online",
  ],

  authors: [{ name: "HeroKidz Team" }],
  creator: "HeroKidz",
  publisher: "HeroKidz",

  icons: {
    icon: "https://i.ibb.co.com/XZxk7JH8/logo.webp",
    shortcut: "https://i.ibb.co.com/XZxk7JH8/logo.webp",
    apple: "https://i.ibb.co.com/XZxk7JH8/logo.webp",
  },

  openGraph: {
    title: "HeroKidz | Toy Shop for Kids",
    description:
      "Explore fun, safe, and educational toys for kids at HeroKidz. Perfect for learning and play!",
    url: "https://herokidz-sage.vercel.app",
    siteName: "HeroKidz",
    images: [
      {
        url: "https://i.ibb.co.com/7t1LzRX2/image.png", // home preview
        width: 1200,
        height: 630,
        alt: "HeroKidz Home Page",
      },
      {
        url: "https://i.ibb.co.com/Kz814wYP/image.png", // products preview
        width: 1200,
        height: 630,
        alt: "HeroKidz Products Page",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "HeroKidz | Kids Toy Store",
    description: "Buy fun and educational toys for kids from HeroKidz.",
    images: ["https://i.ibb.co.com/7t1LzRX2/image.png"],
    creator: "@your_twitter_handle",
  },

  alternates: {
    canonical: "https://herokidz-sage.vercel.app",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  category: "ecommerce",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <header className="py-2 md:w-11/12 mx-auto">
          <Navbar />
        </header>
        <main className="py-2 md:w-11/12 mx-auto ">{children}</main>
        <footer className="py-2 md:w-11/12 mx-auto">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
