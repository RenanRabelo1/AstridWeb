import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "General A. — Arquivo Classificado",
  description: "Um dossiê ficcional de espionagem sobre Astrid, em um terminal militar de 1943.",
  openGraph: {
    title: "General A. — Arquivo Classificado",
    description: "Dossiê ficcional de espionagem em um terminal de 1943.",
    images: [{ url: "/og.png", width: 1680, height: 941, alt: "General A. — Classified Archive 1943" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "General A. — Arquivo Classificado",
    description: "Dossiê ficcional de espionagem em um terminal de 1943.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
