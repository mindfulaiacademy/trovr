import { getCoachesByCity, getAllCities } from '@/lib/coaches';
import Nav from '@/components/Nav';
import CoachListing from '@/components/CoachListing';

export async function generateStaticParams() {
  return getAllCities().map(city => ({ city }));
}

export async function generateMetadata({ params }) {
  const { city } = await params;
  const cityLabel = city.charAt(0).toUpperCase() + city.slice(1);
  const title = `Fußballtrainer:innen ${cityLabel} — Geprüfte Jugendtrainer:innen finden | Trovr`;
  const description = `Finde geprüfte Fußballtrainer:innen in ${cityLabel} für dein Kind. Alle Trainer:innen mit DFB-Lizenz und Führungszeugnis verifiziert. Kostenlos auf Trovr suchen.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://trovr-football.vercel.app/fussballtrainer/${city}/`,
      siteName: 'Trovr',
      locale: 'de_DE',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export default async function CityListingPage({ params }) {
  const { city } = await params;
  const coaches = getCoachesByCity(city);
  const cityLabel = city.charAt(0).toUpperCase() + city.slice(1);

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Trovr — Fußballtrainer ${cityLabel}`,
    description: `Geprüfte Jugend-Fußballtrainer in ${cityLabel} finden. DFB-Lizenz und Führungszeugnis verifiziert.`,
    url: `https://trovr-football.vercel.app/fussballtrainer/${city}/`,
    areaServed: { '@type': 'City', name: cityLabel },
    serviceType: 'Fußballtraining für Kinder und Jugendliche',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Fußballtrainer in ${cityLabel}`,
      numberOfItems: coaches.length,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Nav listingLinks />
      <CoachListing coaches={coaches} city={city} cityLabel={cityLabel} />
    </>
  );
}
