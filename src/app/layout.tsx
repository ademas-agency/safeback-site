import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // `metadataBase` rend ABSOLUES les URL des images de partage. Sans elle, un
  // aperçu WhatsApp ou LinkedIn reçoit un chemin relatif qu'il ne sait pas
  // résoudre : le lien s'affiche nu, sans image ni description.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SafeBack — Sortez l'esprit léger",
    template: "%s · SafeBack",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "SafeBack — Sortez l'esprit léger",
    description: SITE_DESCRIPTION,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "SafeBack" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SafeBack — Sortez l'esprit léger",
    description: SITE_DESCRIPTION,
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

// Couleur de la barre système sur mobile : sans elle, Safari et Chrome affichent
// une barre blanche au-dessus d'un site sombre.
export const viewport: Viewport = {
  themeColor: "#0B1230",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
