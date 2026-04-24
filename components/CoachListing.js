'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const avatarColors = [
  '#1B6B4A', '#2563EB', '#7C3AED', '#DC2626', '#D97706',
  '#0891B2', '#4F46E5', '#059669', '#E11D48', '#7C3AED',
];

function getAvatarColor(id) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

export default function CoachListing({ coaches, city, cityLabel }) {
  const [age, setAge] = useState('');
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [filtersVisible, setFiltersVisible] = useState(false);

  const districts = [...new Set(coaches.map(c => c.district).filter(Boolean))];
  const specialties = [...new Set(coaches.flatMap(c => c.specialties || []))];

  const filtered = coaches.filter(c => {
    if (age && (parseInt(age) < c.ageRangeMin || parseInt(age) > c.ageRangeMax)) return false;
    if (selectedDistricts.length > 0 && !selectedDistricts.includes(c.district)) return false;
    if (selectedSpecialties.length > 0 && !selectedSpecialties.some(s => c.specialties?.includes(s))) return false;
    return true;
  });

  function toggleDistrict(d) {
    setSelectedDistricts(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
  }

  function toggleSpecialty(s) {
    setSelectedSpecialties(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  }

  function clearFilters() {
    setAge('');
    setSelectedDistricts([]);
    setSelectedSpecialties([]);
  }

  return (
    <>
      {/* Hero */}
      <section className="hero hero-compact">
        <div className="container">
          <div className="hero-content">
            <div className="trust-strip-inline">
              <span className="trust-chip">🔒 100% Führungszeugnis geprüft</span>
              <span className="trust-chip">✅ Lizenzen verifiziert</span>
              <span className="trust-chip">⭐ 4.8 Bewertung</span>
              <span className="trust-chip">👥 200+ Zufriedene Eltern</span>
            </div>
            <h1>Finde die besten Fußballtrainer:innen {cityLabel}s für dein junges Talent</h1>
            <p className="hero-sub">
              Alle Trainer:innen verfügen über Führungszeugnis und DFB-Lizenzen. Buche dein privates Training mit einem sicheren Gefühl.
            </p>
          </div>
          <div className="search-bar">
            <div className="search-bar-row">
              <div className="search-bar-field">
                <label htmlFor="age-input">Wie alt ist dein Kind?</label>
                <input
                  type="number"
                  id="age-input"
                  placeholder="z.B. 10"
                  min="3"
                  max="18"
                  value={age}
                  onChange={e => setAge(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })}
                />
              </div>
              <button
                className="btn-search"
                onClick={() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Suchen
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="results-section" id="results">
        <div className="container">
          <div className="results-header">
            <div className="results-title-row">
              <h2 id="results-title">
                {age ? `Fußballtrainer für Alter ${age}` : 'Alle Fußballtrainer:innen'}
              </h2>
              <button
                className={`btn-toggle-filters${filtersVisible ? ' active' : ''}`}
                onClick={() => setFiltersVisible(v => !v)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                Filtern
              </button>
            </div>
            <p className="results-count">
              {filtered.length} geprüfte{filtered.length !== 1 ? '' : 'r'} Trainer gefunden
            </p>

            {filtersVisible && (
              <div className="results-filters">
                {districts.length > 0 && (
                  <div className="filter-row">
                    <label className="filter-label">Bezirk</label>
                    <div className="chip-group">
                      <button
                        className={`chip${selectedDistricts.length === 0 ? ' active' : ''}`}
                        onClick={() => setSelectedDistricts([])}
                      >
                        Alle
                      </button>
                      {districts.map(d => (
                        <button
                          key={d}
                          className={`chip${selectedDistricts.includes(d) ? ' active' : ''}`}
                          onClick={() => toggleDistrict(d)}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {specialties.length > 0 && (
                  <div className="filter-row">
                    <label className="filter-label">Schwerpunkt</label>
                    <div className="chip-group">
                      <button
                        className={`chip${selectedSpecialties.length === 0 ? ' active' : ''}`}
                        onClick={() => setSelectedSpecialties([])}
                      >
                        Alle
                      </button>
                      {specialties.map(s => (
                        <button
                          key={s}
                          className={`chip${selectedSpecialties.includes(s) ? ' active' : ''}`}
                          onClick={() => toggleSpecialty(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>Keine Trainer gefunden</h3>
              <p>Versuche, deine Filter anzupassen — ändere das Alter oder setze die Suche zurück.</p>
              <button className="btn-clear" onClick={clearFilters}>Filter zurücksetzen</button>
            </div>
          ) : (
            <div className="coach-grid">
              {filtered.map(coach => {
                const color = getAvatarColor(coach.id);
                const topCredentials = coach.credentials.filter(c => c.verified).slice(0, 2);
                return (
                  <Link key={coach.id} href={`/fussballtrainer/${city}/${coach.id}/`} className="coach-card">
                    <div className="card-top">
                      {coach.photo
                        ? <Image className="card-avatar-img" src={`/${coach.photo}`} alt={`Fußballtrainer ${coach.firstName} ${coach.lastName} in ${cityLabel}`} width={80} height={80} />
                        : <div className="card-avatar" style={{ background: color }}>{coach.initials}</div>
                      }
                      <div className="card-info">
                        <h3>{coach.firstName} {coach.lastName}</h3>
                        <div className="card-meta">
                          <span className="sport-tag">Alter {coach.ageRangeMin}–{coach.ageRangeMax}</span>
                          <span className="card-rating">★ {coach.rating} ({coach.reviewCount})</span>
                        </div>
                        <span className="card-location">{coach.district || coach.city}, Berlin</span>
                      </div>
                    </div>
                    <div className="card-badges">
                      <span className="badge"><span className="check">✓</span> Führungszeugnis</span>
                      {topCredentials.map(c => (
                        <span key={c.name} className="badge"><span className="check">✓</span> {c.name}</span>
                      ))}
                    </div>
                    {coach.specialties?.length > 0 && (
                      <div className="card-specialties">
                        {coach.specialties.map(s => <span key={s} className="specialty-tag">{s}</span>)}
                      </div>
                    )}
                    <div className="card-bio">{coach.bio}</div>
                    <div className="card-bottom">
                      <div className="card-price">€{coach.sessionPrice}<span>/Einheit</span></div>
                      <div className="card-stats">{coach.totalSessions} Einheiten · {coach.yearsExperience} J. Erf.</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="how-section" id="how-it-works">
        <div className="container">
          <h2 className="section-title">So funktioniert Trovr</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-num">1</div>
              <h3>Suchen</h3>
              <p>Gib das Alter deines Kindes ein. Wir zeigen dir jeden geprüften Fußballtrainer in {cityLabel}.</p>
            </div>
            <div className="step-card">
              <div className="step-num">2</div>
              <h3>Vergleichen</h3>
              <p>Sieh dir Lizenzen, Führungszeugnisse, Elternbewertungen und Preise an. Alles verifiziert — kein Rätselraten.</p>
            </div>
            <div className="step-card">
              <div className="step-num">3</div>
              <h3>Kontaktieren</h3>
              <p>Kontaktiere den Trainer direkt, um deine erste Einheit zu buchen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container footer-inner">
          <div className="footer-brand">
            <Link href="/fussballtrainer/berlin/" className="logo">trovr<span>.</span></Link>
            <p>Das Verzeichnis für geprüfte Jugend-Fußballtrainer in {cityLabel}. Überprüft, mit verifizierter DFB-Lizenz.</p>
          </div>
          <div className="footer-links">
            <Link href="/impressum.html">Impressum</Link>
            <Link href="/privacy.html">Datenschutz</Link>
            <Link href="/fuer-trainer">Für Trainer</Link>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Trovr. Alle Rechte vorbehalten.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
