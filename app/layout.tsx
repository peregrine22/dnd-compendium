import type { Metadata } from 'next';
import { Londrina_Solid } from 'next/font/google';
import './globals.scss';

import { QueryProvider } from '@/providers/QueryProvider';

const font = Londrina_Solid({ subsets: ['latin'], weight: '300' });

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
        <main className="px-4 md:px-20 py-10">
          <div className="text-5xl">{`Crit Happens`}</div>
          <hr className="my-5 h-0.5 border-t-4 border-zinc-600 opacity-100 dark:opacity-50 dark:bg-indigo-700" />
          <QueryProvider>{children}</QueryProvider>
        </main>
      </body>
    </html>
  );
}
