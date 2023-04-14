import './globals.css'

export const metadata = {
  title: 'Raffle',
  description: 'This app is created to make raffles',
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
