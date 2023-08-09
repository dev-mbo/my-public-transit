import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Map from './components/map'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My public transit',
  description: 'my public transit allows you to add your favorite bus/tram and train lines and display the route of each on a map',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
