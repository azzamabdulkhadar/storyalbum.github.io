import type { Metadata } from "next";
import { Caveat, DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RevealInit from "@/components/ui/RevealInit";
import SoundToggle from "@/components/ui/SoundToggle";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Her Story — a collection of her moments",
    template: "%s · Her Story",
  },
  description:
    "A cinematic personal storybook: her memories, her smiles, her dreams, and everything that makes her... her.",
  openGraph: {
    title: "Her Story",
    description:
      "Some stories are written in words... hers was written in moments.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${dmSans.variable} ${caveat.variable} font-body`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
        <RevealInit />
        <SoundToggle />
      </body>
    </html>
  );
}
