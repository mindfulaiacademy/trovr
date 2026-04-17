import fs from 'fs';
import path from 'path';

function readData() {
  const filePath = path.join(process.cwd(), 'data', 'coaches-trovr.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function getAllCities() {
  const { coaches } = readData();
  return [...new Set(
    coaches.filter(c => c.status === 'published').map(c => c.city.toLowerCase())
  )];
}

export function getCoachesByCity(city) {
  const { coaches } = readData();
  return coaches
    .filter(c => c.status === 'published' && c.city.toLowerCase() === city.toLowerCase())
    .sort((a, b) => (b.scrapedDate || '').localeCompare(a.scrapedDate || ''));
}

export function getCoach(city, slug) {
  return getCoachesByCity(city).find(c => c.id === slug) || null;
}
