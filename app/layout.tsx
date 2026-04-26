import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Compound Interest Calculator',
  description: 'Calculate compound interest with monthly contributions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">{children}</body>
    </html>
  );
}
