import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/app/components/theme-provider"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Smoking Aces Stats',
  description: 'Smoking Aces Stats',
  openGraph: {
    title: 'Smoking Aces Stats',
    description: 'View your stats across all Smoking Aces servers',
    url: 'https://stats.twothreexray.com',
    images: 'https://stats.twothreexray.com/smokey.png'
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
    </html>
  )
}