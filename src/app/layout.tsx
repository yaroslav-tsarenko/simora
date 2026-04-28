import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { AppProvider } from '@/hooks/AppProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import '@/styles/globals.css';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: { default: 'simora — eSIM Marketplace', template: '%s | simora' },
  description: 'Stay connected worldwide with affordable eSIM data plans. Browse 190+ countries, buy instantly, and get online in minutes.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white">
        <AppProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
