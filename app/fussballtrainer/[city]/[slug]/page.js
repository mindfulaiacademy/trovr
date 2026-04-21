import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getCoach, getCoachesByCity, getAllCities } from '@/lib/coaches';
import Nav from '@/components/Nav';
import ContactSection from '@/components/ContactSection';

const avatarColors = [
  '#1B6B4A', '#2563EB', '#7C3AED', '#DC2626', '#D97706',
  '#0891B2', '#4F46E5', '#059669', '#E11D48', '#7C3AED',
];

function getAvatarColor(id) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('de-DE', { day: 'numeric', month: 'short', year: 'numeric' });
}

export async function generateStaticParams() {
  const params = [];
  for (const city of getAllCities()) {
    for (const coach of getCoachesByCity(city)) {
      params.push({ city, slug: coach.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { city, slug } = await params;
  const coach = getCoach(city, slug);
  if (!coach) return {};
  const cityLabel = city.charAt(0).toUpperCase() + city.slice(1);
  const title = `${coach.firstName} ${coach.lastName} — Fußballtrainer ${cityLabel} | Trovr`;
  const description = coach.bio.slice(0, 155) + '...';
  const imageUrl = coach.photo ? `https://trovr-football.vercel.app/${coach.photo}` : null;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://trovr-football.vercel.app/fussballtrainer/${city}/${slug}/`,
      siteName: 'Trovr',
      locale: 'de_DE',
      type: 'profile',
      ...(imageUrl && { images: [{ url: imageUrl, alt: `Fußballtrainer ${coach.firstName} ${coach.lastName} in ${cityLabel}` }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}

export default async function CoachProfilePage({ params }) {
  const { city, slug } = await params;
  const coach = getCoach(city, slug);
  if (!coach) notFound();

  const color = getAvatarColor(coach.id);
  const cityLabel = city.charAt(0).toUpperCase() + city.slice(1);

  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: `${coach.firstName} ${coach.lastName}`,
    jobTitle: 'Fußballtrainer',
    description: coach.bio,
    image: coach.photo ? `https://trovr-football.vercel.app/${coach.photo}` : undefined,
    address: { '@type': 'PostalAddress', addressLocality: cityLabel, addressCountry: 'DE' },
    knowsAbout: coach.specialties,
    ...(coach.rating && coach.reviewCount && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: String(coach.rating),
        reviewCount: String(coach.reviewCount),
        bestRating: '5',
        worstRating: '1',
      },
    }),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Trovr', item: 'https://trovr-football.vercel.app/' },
      { '@type': 'ListItem', position: 2, name: `Fußballtrainer ${cityLabel}`, item: `https://trovr-football.vercel.app/fussballtrainer/${city}/` },
      { '@type': 'ListItem', position: 3, name: `${coach.firstName} ${coach.lastName}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Nav backLink={{ href: `/fussballtrainer/${city}/`, label: `← Alle Fußballtrainer in ${cityLabel}` }} />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li><a href={`/fussballtrainer/${city}/`}>Fußballtrainer {cityLabel}</a></li>
          <li aria-current="page">{coach.firstName} {coach.lastName}</li>
        </ol>
      </nav>

      <main className="profile-page">
        <div className="container">

          {/* Header */}
          <div className="profile-header">
            {coach.photo
              ? <Image className="profile-avatar-img" src={`/${coach.photo}`} alt={`Fußballtrainer ${coach.firstName} ${coach.lastName} in ${cityLabel}`} width={120} height={120} />
              : <div className="profile-avatar" style={{ background: color }}>{coach.initials}</div>
            }
            <div>
              <h1 className="profile-name">{coach.firstName} {coach.lastName}</h1>
              <div className="profile-headline">
                <span className="sport-tag">Fußball</span>
                <span className="sport-tag">Alter {coach.ageRangeMin}–{coach.ageRangeMax}</span>
                <span className="profile-rating">★ {coach.rating} ({coach.reviewCount} Bewertungen)</span>
              </div>
              <div className="profile-location">
                {coach.district || coach.city}, {cityLabel} · {coach.yearsExperience} Jahre Erfahrung · Sprache: {coach.languages || 'Deutsch'}
              </div>
              {coach.outcome && <p className="profile-outcome">{coach.outcome}</p>}
            </div>
          </div>

          <div className="profile-grid">
            {/* Main content */}
            <div className="profile-main">

              {/* Video */}
              <div className="profile-section profile-video-section">
                {coach.videoUrl ? (
                  <div className="video-wrapper">
                    <iframe src={coach.videoUrl} frameBorder="0" allowFullScreen />
                  </div>
                ) : (
                  <div className="video-placeholder">
                    <div className="video-placeholder-inner">
                      <div className="video-play-icon">▶</div>
                      <div className="video-placeholder-text">
                        <strong>{coach.firstName} stellt sich vor</strong>
                        <span>Video folgt in Kürze</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* About */}
              {coach.philosophy ? (
                <div className="profile-section">
                  <h2>Über mich</h2>
                  <h3 className="profile-subsection-title">Meine Trainingsphilosophie</h3>
                  <p className="profile-bio">{coach.philosophy}</p>
                  <h3 className="profile-subsection-title">Mein Ansatz mit jungen Talenten</h3>
                  <ul className="profile-method-list">
                    {coach.methodology.map((m, i) => <li key={i}>{m}</li>)}
                  </ul>
                  <h3 className="profile-subsection-title">Eine typische Einheit (60 Minuten)</h3>
                  <div className="session-walkthrough">
                    {coach.sessionWalkthrough.map((s, i) => (
                      <div key={i} className="session-step">
                        <div className="session-time">{s.time}</div>
                        <div className="session-body">
                          <div className="session-title">{s.title}</div>
                          <div className="session-desc">{s.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <h3 className="profile-subsection-title">Mein Weg</h3>
                  {coach.career.split('\n\n').map((p, i) => (
                    <p key={i} className="profile-bio" style={{ marginTop: i > 0 ? '10px' : 0 }}>{p}</p>
                  ))}
                </div>
              ) : (
                <div className="profile-section">
                  <h2>Über mich</h2>
                  <p className="profile-bio">{coach.bio}</p>
                  {coach.aboutMe && <p className="profile-bio" style={{ marginTop: '12px' }}>{coach.aboutMe}</p>}
                </div>
              )}

              {/* Specialties */}
              {coach.specialties?.length > 0 && (
                <div className="profile-section">
                  <h2>Schwerpunkte</h2>
                  <div className="specialty-list">
                    {coach.specialties.map(s => <span key={s} className="specialty-tag">{s}</span>)}
                  </div>
                </div>
              )}

              {/* Credentials */}
              <div className="profile-section">
                <h2>Verifizierte Lizenzen</h2>
                <div className="cred-list">
                  <span className="bg-badge"><span className="check">✓</span> Führungszeugnis</span>
                  {coach.credentials.filter(c => c.verified).map(c => (
                    <span key={c.name} className="cred-badge"><span className="check">✓</span> {c.name}</span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="profile-section">
                <h2>Statistiken</h2>
                <div className="stats-row">
                  <div className="stat-item">
                    <div className="stat-num">{coach.totalSessions}+</div>
                    <div className="stat-label">Einheiten</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-num">{coach.activeAthletes}</div>
                    <div className="stat-label">Spieler</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-num">{coach.yearsExperience}</div>
                    <div className="stat-label">Jahre Erf.</div>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div className="profile-section">
                <h2>Elternbewertungen</h2>
                <div className="reviews-summary">
                  <div className="reviews-big-num">{coach.rating}</div>
                  <div>
                    <div className="reviews-stars">{'★'.repeat(Math.floor(coach.rating))}</div>
                    <div className="reviews-count">{coach.reviewCount} verifizierte Bewertungen</div>
                  </div>
                </div>
                {coach.reviews.map((r, i) => (
                  <div key={i} className="review-card">
                    <div className="review-top">
                      <span className="review-author">{r.parentName}</span>
                      <span className="review-date">{formatDate(r.date)}</span>
                    </div>
                    <div className="review-stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                    <p className="review-text">{r.comment}</p>
                    <div className="review-verified"><span className="check">✓</span> Verifizierte Einheit</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="profile-sidebar">
              <div className="sidebar-card">
                <div className="sidebar-price">€{coach.sessionPrice}<span>/Einheit</span></div>
                {coach.valueIncludes && (
                  <ul className="sidebar-value-stack">
                    {coach.valueIncludes.map(v => (
                      <li key={v}><span className="check">✓</span> {v}</li>
                    ))}
                  </ul>
                )}
                {coach.availability && coach.availability !== 'TBD' && (
                  <div className="sidebar-avail"><strong>Verfügbarkeit:</strong><br />{coach.availability}</div>
                )}
                {coach.responseTime && coach.responseTime !== 'TBD' && (
                  <div className="sidebar-response">● Antwortet meist innerhalb {coach.responseTime}</div>
                )}

                {/* Contact button + modal + mobile bar — all managed by one client component */}
                <ContactSection coach={coach} />

                <div className="sidebar-risk">
                  Nicht zufrieden nach der ersten Einheit? Sprich den Trainer direkt an — gemeinsam findet ihr eine Lösung.
                </div>
                <div className="sidebar-trust">
                  <div className="sidebar-trust-item"><span className="check">✓</span> Führungszeugnis</div>
                  {coach.credentials.filter(c => c.verified).map(c => (
                    <div key={c.name} className="sidebar-trust-item"><span className="check">✓</span> {c.name}</div>
                  ))}
                  <div className="sidebar-trust-item"><span className="check">✓</span> {coach.reviewCount} verifizierte Bewertungen</div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
