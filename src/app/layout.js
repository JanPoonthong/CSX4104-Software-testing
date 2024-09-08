import '@/app/ui/global.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ads Management',
  description:
    'The Ads Management System is a comprehensive platform designed to streamline the management of advertising campaigns, offering a user-friendly interface for selecting specific dates, times, and locations for ad displays on designated monitors.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/107806435.png" sizes="32x32" />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
