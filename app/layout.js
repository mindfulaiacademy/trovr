import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata = {
  title: 'Trovr — Geprüfte Jugend-Fußballtrainer finden',
  description: 'Finde geprüfte Fußballtrainer für dein Kind. DFB-Lizenz und Führungszeugnis verifiziert.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className={inter.className}>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0RRHT0YV1S"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          if (localStorage.getItem('trovr_cookies') === 'accepted') {
            gtag('js', new Date());
            gtag('config', 'G-0RRHT0YV1S', { anonymize_ip: true });
          }
        `}</Script>
      </body>
    </html>
  );
}
