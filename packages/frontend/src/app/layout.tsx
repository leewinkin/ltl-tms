import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'LTL TMS - Transportation Management System',
  description: 'Manage your LTL shipments with ease',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen bg-gray-100">
          {children}
        </main>
      </body>
    </html>
  );
}
