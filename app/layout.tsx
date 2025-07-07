import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'X-code Crack UI',
  description: 'Crack hash online via API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
