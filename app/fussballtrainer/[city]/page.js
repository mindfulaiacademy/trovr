import { getCoachesByCity, getAllCities } from '@/lib/coaches';
import Nav from '@/components/Nav';
import CoachListing from '@/components/CoachListing';

export async function generateStaticParams() {
  return getAllCities().map(city => ({ city }));
}

export async function generateMetadata({ params }) {
  const { city } = await params;
  const cityLabel = city.charAt(0).toUpperCase() + city.slice(1);
  return {
    title: `Fußballtrainer ${cityLabel} — Geprüfte Jugendtrainer finden | Trovr`,
    description: `Finde geprüfte Fußballtrainer in ${cityLabel} für dein Kind. Alle Trainer mit DFB-Lizenz und Führungszeugnis verifiziert. Kostenlos auf Trovr suchen.`,
    robots: { index: false, follow: false },
  };
}

export default async function CityListingPage({ params }) {
  const { city } = await params;
  const coaches = getCoachesByCity(city);
  const cityLabel = city.charAt(0).toUpperCase() + city.slice(1);

  return (
    <>
      <Nav listingLinks />
      <CoachListing coaches={coaches} city={city} cityLabel={cityLabel} />
    </>
  );
}
