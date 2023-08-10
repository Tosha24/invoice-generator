import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'EZ-Invoice',
  description: 'A free and simple invoice generator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Sans+JP:wght@300&display=swap" rel="stylesheet"/>
      </head>
      <body>
        <div><Toaster/></div>
        {children}
      </body>
    </html>
  )
}
