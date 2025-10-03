import type { Metadata } from 'next';
import { Geist, Geist_Mono, Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import Providers from '@/components/providers';
import NextTopLoader from 'nextjs-toploader';

const poppins = Poppins({
  weight: ['200', '300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Portfolio | Blog',
  description: 'My personal portfolio and a blog demonstration',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${poppins.className}  antialiased`}>
        <Providers>
          <Toaster />
          <NextTopLoader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
