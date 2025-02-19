import { Toaster } from "@/components/ui/sonner"
import type { Metadata } from "next"
import Footer from "./(components)/footer"
import Header from "./(components)/header"
import "./globals.css"

export const metadata: Metadata = {
  title: "RPE - Inscription Newsletter",
  description:
    "Inscription à la newsletter des représentants des parents d'élèves de l'école Achard",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
        <Footer />
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  )
}
