import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { MusicProvider } from '@/lib/music-context'
import { LyricsProvider } from '@/lib/lyrics-context'
import { MusicPlayer } from '@/components/music-player'
import './globals.css'

export const metadata: Metadata = {
  title: 'An Kun Studio | Digital Music Distribution',
  description: 'Biến giấc mơ thành hiện thực. Chúng tôi hỗ trợ nghệ sĩ, nhạc sĩ, nhà sản xuất và tất cả những người làm âm nhạc',
  generator: 'ankun.dev',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MusicProvider>
            <LyricsProvider>
              {children}
              <MusicPlayer />
            </LyricsProvider>
          </MusicProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
