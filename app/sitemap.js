import { getAllCities, getCoachesByCity } from '@/lib/coaches';

const BASE_URL = 'https://trovr-football.vercel.app';

export default function sitemap() {
  const entries = [];

  for (const city of getAllCities()) {
    entries.push({
      url: `${BASE_URL}/fussballtrainer/${city}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    for (const coach of getCoachesByCity(city)) {
      entries.push({
        url: `${BASE_URL}/fussballtrainer/${city}/${coach.id}/`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
