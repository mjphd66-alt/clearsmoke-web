import type { Metadata, Viewport } from 'next'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: '清烟之旅 - 戒烟助手',
  description: '戒烟精灵养成应用，每日打卡，守护健康',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '清烟之旅',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <style>{`
          :root {
            --primary: #4CAF50;
            --secondary: #FF9800;
            --background: #F5F5F5;
            --card: #FFFFFF;
            --text: #333333;
            --text-light: #757575;
            --border: #E0E0E0;
          }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          html, body {
            max-width: 100vw;
            overflow-x: hidden;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--background);
            color: var(--text);
          }
        `}</style>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}