import { Geist, JetBrains_Mono } from "next/font/google"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@workspace/ui/lib/utils"
import { Metadata } from "next"
import { SiteNav } from "@/components/site-nav"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Chance Journey",
  description: "CJ changes the world.",
  icons: {
    icon: [
      {
        url: "/brand/favicon.ico",
      },
      {
        media: "(prefers-color-scheme: light)",
        url: "/brand/favicon-light.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/brand/favicon-dark.svg",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontSans.variable,
        "font-mono",
        jetbrainsMono.variable
      )}
    >
      <body>
        <ThemeProvider>
          <main>
            <SiteNav />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
