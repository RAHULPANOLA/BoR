import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { DataProvider } from '@/context/DataContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { ToastProvider } from '@/context/ToastContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'BikeRent - Hourly & Daily Bike Rental Platform',
  description: 'Rent premium motorbikes, cruisers, electric scooters, and sports bikes by the hour or day across India with instant verification and full insurance.',
  keywords: ['bike rental', 'motorbike rent', 'scooter rental', 'Royal Enfield rental', 'hourly bike rental', 'BikeRent'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased flex flex-col min-h-screen selection:bg-emerald-500 selection:text-slate-950">
        <ThemeProvider>
          <DataProvider>
            <FavoritesProvider>
              <ToastProvider>
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </ToastProvider>
            </FavoritesProvider>
          </DataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
