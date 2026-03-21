// ========================================
// TROVR — MVP App Logic (German / Deutsch)
// ========================================

let coachesData = [];

// Color palette for avatars
const avatarColors = [
  '#1B6B4A', '#2563EB', '#7C3AED', '#DC2626', '#D97706',
  '#0891B2', '#4F46E5', '#059669', '#E11D48', '#7C3AED'
];

function getAvatarColor(id) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  return '&#9733;'.repeat(full) + (half ? '&#9734;' : '') + ` ${rating}`;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('de-DE', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ---- LOAD DATA ----
async function loadCoaches() {
  try {
    const res = await fetch('../data/coaches.json');
    const data = await res.json();
    coachesData = data.coaches;
    return coachesData;
  } catch (err) {
    console.error('Fehler beim Laden der Trainer:', err);
    return [];
  }
}

// ---- SEARCH & FILTER ----
function filterCoaches(coaches, sport, age, sort) {
  let filtered = [...coaches];

  if (sport) {
    filtered = filtered.filter(c => c.sport === sport);
  }

  if (age) {
    const ageNum = parseInt(age);
    filtered = filtered.filter(c => ageNum >= c.ageRangeMin && ageNum <= c.ageRangeMax);
  }

  switch (sort) {
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
      break;
    case 'price-low':
      filtered.sort((a, b) => a.sessionPrice - b.sessionPrice);
      break;
    case 'price-high':
      filtered.sort((a, b) => b.sessionPrice - a.sessionPrice);
      break;
    case 'experience':
      filtered.sort((a, b) => b.yearsExperience - a.yearsExperience);
      break;
    case 'reviews':
      filtered.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    default:
      filtered.sort((a, b) => b.rating - a.rating);
  }

  return filtered;
}

// ---- RENDER COACH CARD ----
function renderCoachCard(coach) {
  const color = getAvatarColor(coach.id);
  const topCredentials = coach.credentials.filter(c => c.verified).slice(0, 2);

  const avatarHtml = coach.photo
    ? `<img class="card-avatar-img" src="../${coach.photo}" alt="Trainer ${coach.firstName} ${coach.lastName}">`
    : `<div class="card-avatar" style="background:${color};">${coach.initials}</div>`;

  return `
    <a href="coach.html?id=${coach.id}" class="coach-card">
      <div class="card-top">
        ${avatarHtml}
        <div class="card-info">
          <h3>Trainer ${coach.firstName} ${coach.lastName}</h3>
          <div class="card-meta">
            <span class="sport-tag">Fußball</span>
            <span class="sport-tag">Alter ${coach.ageRangeMin}–${coach.ageRangeMax}</span>
            <span class="card-rating">&#9733; ${coach.rating} (${coach.reviewCount})</span>
          </div>
          <span class="card-location">${coach.district || coach.city}, Berlin</span>
        </div>
      </div>
      <div class="card-badges">
        <span class="badge"><span class="check">&#10003;</span> Hintergrundprüfung</span>
        ${topCredentials.map(c => `<span class="badge"><span class="check">&#10003;</span> ${c.name}</span>`).join('')}
      </div>
      <div class="card-bio">${coach.bio}</div>
      <div class="card-bottom">
        <div class="card-price">&euro;${coach.sessionPrice}<span>/Einheit</span></div>
        <div class="card-stats">${coach.totalSessions} Einheiten &bull; ${coach.yearsExperience} J. Erf.</div>
      </div>
    </a>
  `;
}

// ---- RENDER SEARCH RESULTS ----
function renderResults(coaches) {
  const grid = document.getElementById('coach-grid');
  const noResults = document.getElementById('no-results');
  const countEl = document.getElementById('results-count');
  const titleEl = document.getElementById('results-title');

  if (!grid) return;

  if (coaches.length === 0) {
    grid.style.display = 'none';
    noResults.style.display = 'block';
    countEl.textContent = '';
    return;
  }

  grid.style.display = 'grid';
  noResults.style.display = 'none';
  grid.innerHTML = coaches.map(renderCoachCard).join('');
  countEl.textContent = `${coaches.length} geprüfte${coaches.length !== 1 ? '' : 'r'} Trainer gefunden`;

  const age = document.getElementById('age-input')?.value;
  if (age) {
    titleEl.textContent = `Fußballtrainer für Alter ${age}`;
  } else {
    titleEl.textContent = 'Alle geprüften Trainer';
  }
}

// ---- SEARCH PAGE INIT ----
function initSearchPage() {
  const searchBtn = document.getElementById('search-btn');
  const clearBtn = document.getElementById('clear-btn');
  const ageInput = document.getElementById('age-input');
  const sortSelect = document.getElementById('sort-select');

  if (!searchBtn) return;

  function doSearch() {
    const sport = 'Football';
    const age = ageInput.value;
    const sort = sortSelect.value;
    const filtered = filterCoaches(coachesData, sport, age, sort);
    renderResults(filtered);

    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
  }

  searchBtn.addEventListener('click', doSearch);

  // Allow Enter key to trigger search
  ageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doSearch();
  });

  // Sort changes apply immediately
  sortSelect.addEventListener('change', doSearch);

  clearBtn?.addEventListener('click', () => {
    ageInput.value = '';
    sortSelect.value = 'rating';
    renderResults(coachesData);
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
  });

  // Initial load — show all
  renderResults(coachesData);
}

// ---- COACH PROFILE ----
function loadCoachProfile(coachId) {
  const coach = coachesData.find(c => c.id === coachId);
  if (!coach) {
    document.querySelector('.profile-page .container').innerHTML = `
      <div style="text-align:center;padding:80px 0;">
        <h2>Trainer nicht gefunden</h2>
        <p style="margin:12px 0 24px;color:var(--g500);">Dieses Trainerprofil existiert nicht.</p>
        <a href="index.html" style="color:var(--primary);font-weight:600;">Zurück zur Suche</a>
      </div>
    `;
    return;
  }

  // Page title
  document.title = `Trainer ${coach.firstName} ${coach.lastName} — Trovr`;

  const color = getAvatarColor(coach.id);

  // Header
  const profileAvatarHtml = coach.photo
    ? `<img class="profile-avatar-img" src="../${coach.photo}" alt="Trainer ${coach.firstName} ${coach.lastName}">`
    : `<div class="profile-avatar" style="background:${color};">${coach.initials}</div>`;

  document.getElementById('profile-header').innerHTML = `
    ${profileAvatarHtml}
    <div>
      <h1 class="profile-name">Trainer ${coach.firstName} ${coach.lastName}</h1>
      <div class="profile-headline">
        <span class="sport-tag">Fußball</span>
        <span class="sport-tag">Alter ${coach.ageRangeMin}–${coach.ageRangeMax}</span>
        <span class="profile-rating">&#9733; ${coach.rating} (${coach.reviewCount} Bewertungen)</span>
      </div>
      <div class="profile-location">${coach.district || coach.city}, Berlin &bull; ${coach.yearsExperience} Jahre Erfahrung</div>
    </div>
  `;

  // Main content
  const credBadges = coach.credentials
    .filter(c => c.verified)
    .map(c => `<span class="cred-badge"><span class="check">&#10003;</span> ${c.name}</span>`)
    .join('');

  const reviewsHtml = coach.reviews.map(r => `
    <div class="review-card">
      <div class="review-top">
        <span class="review-author">${r.parentName}</span>
        <span class="review-date">${formatDate(r.date)}</span>
      </div>
      <div class="review-stars">${'&#9733;'.repeat(r.rating)}${'&#9734;'.repeat(5 - r.rating)}</div>
      <p class="review-text">${r.comment}</p>
      <div class="review-verified"><span class="check">&#10003;</span> Verifizierte Einheit</div>
    </div>
  `).join('');

  document.getElementById('profile-main').innerHTML = `
    <div class="profile-section">
      <h2>Über den Trainer</h2>
      <p class="profile-bio">${coach.bio}</p>
    </div>

    <div class="profile-section">
      <h2>Verifizierte Lizenzen</h2>
      <div class="cred-list">
        <span class="bg-badge"><span class="check">&#10003;</span> Hintergrundprüfung bestanden</span>
        ${credBadges}
      </div>
    </div>

    <div class="profile-section">
      <h2>Statistiken</h2>
      <div class="stats-row">
        <div class="stat-item">
          <div class="stat-num">${coach.totalSessions}+</div>
          <div class="stat-label">Einheiten</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">${coach.activeAthletes}</div>
          <div class="stat-label">Spieler</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">${coach.yearsExperience}</div>
          <div class="stat-label">Jahre Erf.</div>
        </div>
      </div>
    </div>

    <div class="profile-section">
      <h2>Elternbewertungen</h2>
      <div class="reviews-summary">
        <div class="reviews-big-num">${coach.rating}</div>
        <div>
          <div class="reviews-stars">${'&#9733;'.repeat(Math.floor(coach.rating))}</div>
          <div class="reviews-count">${coach.reviewCount} verifizierte Bewertungen</div>
        </div>
      </div>
      ${reviewsHtml}
    </div>
  `;

  // Sidebar
  document.getElementById('profile-sidebar').innerHTML = `
    <div class="sidebar-card">
      <div class="sidebar-price">&euro;${coach.sessionPrice}<span>/Einheit</span></div>
      <div class="sidebar-avail">
        <strong>Verfügbarkeit:</strong><br>${coach.availability}
      </div>
      <button class="btn-contact" onclick="openContact()">Trainer kontaktieren</button>
      <a href="mailto:${coach.contactEmail}" class="btn-contact-secondary">E-Mail senden</a>
      <div class="sidebar-trust">
        <div class="sidebar-trust-item"><span class="check">&#10003;</span> Hintergrundprüfung bestanden</div>
        ${coach.credentials.filter(c => c.verified).map(c =>
          `<div class="sidebar-trust-item"><span class="check">&#10003;</span> ${c.name}</div>`
        ).join('')}
        <div class="sidebar-trust-item"><span class="check">&#10003;</span> ${coach.reviewCount} verifizierte Bewertungen</div>
      </div>
    </div>

    <!-- Contact Modal -->
    <div class="modal-overlay" id="contact-modal">
      <div class="modal">
        <button class="modal-close" onclick="closeContact()">&times;</button>
        <h2>Trainer ${coach.firstName} kontaktieren</h2>
        <p>Nimm Kontakt auf, um deine erste Einheit zu vereinbaren. Erwähne, dass du ihn auf Trovr gefunden hast!</p>
        <div class="contact-row">
          <div>
            <div class="label">E-Mail</div>
            <div class="value"><a href="mailto:${coach.contactEmail}">${coach.contactEmail}</a></div>
          </div>
        </div>
        <div class="contact-row">
          <div>
            <div class="label">Telefon</div>
            <div class="value"><a href="tel:${coach.contactPhone.replace(/\D/g, '')}">${coach.contactPhone}</a></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function openContact() {
  document.getElementById('contact-modal').classList.add('active');
}

function closeContact() {
  document.getElementById('contact-modal').classList.remove('active');
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
  }
});

// ---- INIT ----
document.addEventListener('DOMContentLoaded', async () => {
  await loadCoaches();
  // Only init search page if we're on index.html
  if (document.getElementById('search-btn')) {
    initSearchPage();
  }
});
