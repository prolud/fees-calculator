import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Compound Interest Calculator',
  description: 'Calculate compound interest with monthly contributions',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <body className="dark min-h-screen" style={{ backgroundColor: '#121212' }}>
        {children}
      </body>
    </html>
  );
}
