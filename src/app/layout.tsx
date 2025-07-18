import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />

        {children}

        <footer className="flex items-center justify-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-400">
          <a
            className="text-gray-500 hover:text-gray-700 transition-colors"
            href="/"
            rel="noopener noreferrer"
          >
            Home
          </a>
        </footer>
      </body>
    </html>
  )
}
