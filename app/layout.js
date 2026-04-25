import { Inter } from 'next/font/google';
import CookieBanner from '@/components/CookieBanner';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata = {
  title: 'Trovr — Geprüfte Jugend-Fußballtrainer finden',
  description: 'Finde geprüfte Fußballtrainer für dein Kind. DFB-Lizenz und Führungszeugnis verifiziert.',
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className={inter.className}>
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
