import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, Fraunces, JetBrains_Mono, Archivo, Hanken_Grotesk } from "next/font/google";
import NavigationErrorSuppressor from "@/components/NavigationErrorSuppressor";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-hero",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ME Energia Solar",
  description:
    "Gere sua própria energia com o poder do sol. Economia imediata e sustentabilidade para sua casa ou empresa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${jakarta.variable} ${fraunces.variable} ${mono.variable} ${archivo.variable} ${hanken.variable} h-full antialiased`}
    >
      <body className="min-h-full" suppressHydrationWarning>
        <NavigationErrorSuppressor />
        {children}
      </body>
    </html>
  );
}
