import type { Metadata } from 'next';
import { Londrina_Solid } from 'next/font/google';
import './globals.css';

import { QueryProvider } from '@/providers/QueryProvider';

const font = Londrina_Solid({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'Crit Happens',
  description: 'Crit Happens'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
