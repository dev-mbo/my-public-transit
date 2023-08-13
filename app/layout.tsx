import './globals.css'
import 'bulma/css/bulma.css'
import 'bulma-tooltip/dist/css/bulma-tooltip.min.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

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
        <section className="section">
          <div className="container">

            <div className="columns is-centered">
              <h1 className="title is-uppercase mb-2">My public transit:</h1>
            </div>

            <div className="columns">
              <div className="column is-full">
                {children}
              </div>
            </div>

          </div>
        </section>
      </body>
    </html>
  )
}
