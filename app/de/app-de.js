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
    const res = await fetch('../data/coaches-superprof.json');
    const data = await res.json();
    // Only display Berlin coaches
    coachesData = data.coaches.filter(c => c.city === 'Berlin');
    return coachesData;
  } catch (err) {
    console.error('Fehler beim Laden der Trainer:', err);
    return [];
  }
}

// ---- CHIP FILTER HELPERS ----
function getSelectedChips(groupId) {
  const group = document.getElementById(groupId);
  if (!group) return [];
  const checked = [...group.querySelectorAll('input[type="checkbox"]:checked')]
    .filter(cb => cb.value !== '')
    .map(cb => cb.value);
  // Also check extra chips container (for district overflow)
  const extra = document.getElementById(groupId + '-extra');
  if (extra) {
    extra.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
      if (cb.value) checked.push(cb.value);
    });
  }
  return checked;
}

function initChipGroup(groupId) {
  const group = document.getElementById(groupId);
  if (!group) return;
  const chips = group.querySelectorAll('.chip');
  const allChip = group.querySelector('input[value=""]');

  group.addEventListener('change', (e) => {
    const cb = e.target;
    if (cb.value === '') {
      // "Alle" clicked — uncheck all others
      chips.forEach(chip => {
        const input = chip.querySelector('input');
        if (input.value !== '') { input.checked = false; chip.classList.remove('active'); }
      });
      cb.checked = true;
      cb.closest('.chip').classList.add('active');
    } else {
      // Specific chip clicked — uncheck "Alle"
      if (allChip) { allChip.checked = false; allChip.closest('.chip').classList.remove('active'); }
      cb.closest('.chip').classList.toggle('active', cb.checked);

      // If nothing selected, re-check "Alle"
      const anyChecked = [...group.querySelectorAll('input[value]:not([value=""])')].some(i => i.checked);
      if (!anyChecked && allChip) {
        allChip.checked = true;
        allChip.closest('.chip').classList.add('active');
      }
    }
  });

  // Set initial "Alle" active state
  if (allChip && allChip.checked) allChip.closest('.chip').classList.add('active');
}

// ---- SEARCH & FILTER ----
function filterCoaches(coaches, sport, age, districts, specialties) {
  let filtered = [...coaches];

  if (sport) {
    filtered = filtered.filter(c => c.sport === sport);
  }

  if (age) {
    const ageNum = parseInt(age);
    filtered = filtered.filter(c => ageNum >= c.ageRangeMin && ageNum <= c.ageRangeMax);
  }

  if (districts.length > 0) {
    filtered = filtered.filter(c => districts.includes(c.district));
  }

  if (specialties.length > 0) {
    filtered = filtered.filter(c => c.specialties && specialties.some(s => c.specialties.includes(s)));
  }

  // Default sort: best rating
  filtered.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);

  return filtered;
}

// ---- RENDER COACH CARD ----
function renderCoachCard(coach) {
  const color = getAvatarColor(coach.id);
  const topCredentials = coach.credentials.filter(c => c.verified).slice(0, 2);

  const avatarHtml = coach.photo
    ? `<img class="card-avatar-img" src="../${coach.photo}" alt="${coach.firstName} ${coach.lastName}">`
    : `<div class="card-avatar" style="background:${color};">${coach.initials}</div>`;

  return `
    <a href="coach.html?id=${coach.id}" class="coach-card">
      <div class="card-top">
        ${avatarHtml}
        <div class="card-info">
          <h3>${coach.firstName} ${coach.lastName}</h3>
          <div class="card-meta">
            <span class="sport-tag">Fußball</span>
            <span class="sport-tag">Alter ${coach.ageRangeMin}–${coach.ageRangeMax}</span>
            <span class="card-rating">&#9733; ${coach.rating} (${coach.reviewCount})</span>
          </div>
          <span class="card-location">${coach.district || coach.city}, Berlin</span>
          ${coach.languages && coach.languages !== 'Deutsch' ? `<span class="lang-tag">${coach.languages}</span>` : ''}
        </div>
      </div>
      <div class="card-badges">
        <span class="badge"><span class="check">&#10003;</span> Führungszeugnis</span>
        ${topCredentials.map(c => `<span class="badge"><span class="check">&#10003;</span> ${c.name}</span>`).join('')}
      </div>
      ${coach.specialties && coach.specialties.length ? `<div class="card-specialties">${coach.specialties.map(s => `<span class="specialty-tag">${s}</span>`).join('')}</div>` : ''}
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
    titleEl.textContent = 'Alle Fußballtrainer';
  }
}

// ---- BUILD FILTER CHIPS FROM DATA ----
function buildFilterChips(coaches) {
  // Count districts with trainers, sorted by count
  const districtCounts = {};
  const specialtyCounts = {};
  coaches.forEach(c => {
    if (c.district) districtCounts[c.district] = (districtCounts[c.district] || 0) + 1;
    if (c.specialties) c.specialties.forEach(s => { specialtyCounts[s] = (specialtyCounts[s] || 0) + 1; });
  });

  const districtsSorted = Object.entries(districtCounts).sort((a, b) => b[1] - a[1]);
  const specialtiesSorted = Object.entries(specialtyCounts).sort((a, b) => b[1] - a[1]);

  const MAX_VISIBLE = 6;

  // Build district chips
  const districtGroup = document.getElementById('district-chips');
  if (districtGroup) {
    districtsSorted.forEach(([name], i) => {
      const label = document.createElement('label');
      label.className = 'chip' + (i >= MAX_VISIBLE ? ' chip-hidden' : '');
      if (i >= MAX_VISIBLE) label.style.display = 'none';
      label.innerHTML = `<input type="checkbox" value="${name}"> ${name}`;
      districtGroup.appendChild(label);
    });
    if (districtsSorted.length > MAX_VISIBLE) {
      const moreBtn = document.createElement('button');
      moreBtn.type = 'button';
      moreBtn.className = 'chip-more';
      moreBtn.textContent = `+${districtsSorted.length - MAX_VISIBLE} mehr`;
      moreBtn.addEventListener('click', () => {
        districtGroup.querySelectorAll('.chip-hidden').forEach(el => {
          el.style.display = '';
          el.classList.remove('chip-hidden');
        });
        districtGroup.classList.remove('chip-group-nowrap');
        moreBtn.remove();
      });
      districtGroup.appendChild(moreBtn);
    }
  }

  // Build specialty chips
  const specialtyGroup = document.getElementById('specialty-chips');
  if (specialtyGroup) {
    specialtiesSorted.forEach(([name]) => {
      const label = document.createElement('label');
      label.className = 'chip';
      label.innerHTML = `<input type="checkbox" value="${name}"> ${name}`;
      specialtyGroup.appendChild(label);
    });
  }
}

// ---- SEARCH PAGE INIT ----
function initSearchPage() {
  const searchBtn = document.getElementById('search-btn');
  const clearBtn = document.getElementById('clear-btn');
  const ageInput = document.getElementById('age-input');
  if (!searchBtn) return;

  function doSearch() {
    const sport = 'Football';
    const age = ageInput.value;
    const districts = getSelectedChips('district-chips');
    const specialties = getSelectedChips('specialty-chips');
    const filtered = filterCoaches(coachesData, sport, age, districts, specialties);
    renderResults(filtered);
  }

  // Init chip groups — auto-filter on change
  initChipGroup('district-chips');
  initChipGroup('specialty-chips');

  document.getElementById('district-chips')?.addEventListener('change', doSearch);
  document.getElementById('specialty-chips')?.addEventListener('change', doSearch);

  searchBtn.addEventListener('click', () => {
    doSearch();
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
  });

  // Allow Enter key to trigger search
  ageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      doSearch();
      document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
    }
  });

  clearBtn?.addEventListener('click', () => {
    ageInput.value = '';
    document.querySelectorAll('#district-chips .chip, #specialty-chips .chip').forEach(chip => {
      const input = chip.querySelector('input');
      if (input.value === '') { input.checked = true; chip.classList.add('active'); }
      else { input.checked = false; chip.classList.remove('active'); }
    });
    renderResults(coachesData);
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
  document.title = `${coach.firstName} ${coach.lastName} — Trovr`;

  const color = getAvatarColor(coach.id);

  // Header
  const profileAvatarHtml = coach.photo
    ? `<img class="profile-avatar-img" src="../${coach.photo}" alt="${coach.firstName} ${coach.lastName}">`
    : `<div class="profile-avatar" style="background:${color};">${coach.initials}</div>`;

  document.getElementById('profile-header').innerHTML = `
    ${profileAvatarHtml}
    <div>
      <h1 class="profile-name">${coach.firstName} ${coach.lastName}</h1>
      <div class="profile-headline">
        <span class="sport-tag">Fußball</span>
        <span class="sport-tag">Alter ${coach.ageRangeMin}–${coach.ageRangeMax}</span>
        <span class="profile-rating">&#9733; ${coach.rating} (${coach.reviewCount} Bewertungen)</span>
      </div>
      <div class="profile-location">${coach.district || coach.city}, Berlin &bull; ${coach.yearsExperience} Jahre Erfahrung &bull; Sprache: ${coach.languages || 'Deutsch'}</div>
      ${coach.outcome ? `<p class="profile-outcome">${coach.outcome}</p>` : ''}
    </div>
  `;

  // Populate mobile booking bar
  const mobileBar = document.getElementById('mobile-booking-bar');
  const mobilePriceEl = document.getElementById('mobile-price');
  if (mobileBar) mobileBar.style.display = '';
  if (mobilePriceEl) mobilePriceEl.textContent = '\u20AC' + coach.sessionPrice;

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

  // Build the "Über mich" section — rich if new fields exist, fallback for other coaches
  const aboutSection = coach.philosophy ? `
    <div class="profile-section">
      <h2>Über mich</h2>

      <h3 class="profile-subsection-title">Meine Trainingsphilosophie</h3>
      <p class="profile-bio">${coach.philosophy}</p>

      <h3 class="profile-subsection-title">Mein Ansatz mit jungen Talenten</h3>
      <ul class="profile-method-list">
        ${coach.methodology.map(m => `<li>${m}</li>`).join('')}
      </ul>

      <h3 class="profile-subsection-title">Eine typische Einheit (60 Minuten)</h3>
      <div class="session-walkthrough">
        ${coach.sessionWalkthrough.map(s => `
          <div class="session-step">
            <div class="session-time">${s.time}</div>
            <div class="session-body">
              <div class="session-title">${s.title}</div>
              <div class="session-desc">${s.description}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <h3 class="profile-subsection-title">Mein Weg</h3>
      ${coach.career.split('\n\n').map(p => `<p class="profile-bio" style="margin-top:10px;">${p}</p>`).join('')}
    </div>
  ` : `
    <div class="profile-section">
      <h2>Über mich</h2>
      <p class="profile-bio">${coach.bio}</p>
      ${coach.aboutMe ? `<p class="profile-bio" style="margin-top:12px;">${coach.aboutMe}</p>` : ''}
    </div>
  `;

  const videoSection = coach.videoUrl
    ? `<div class="profile-section profile-video-section">
        <div class="video-wrapper">
          <iframe src="${coach.videoUrl}" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>`
    : `<div class="profile-section profile-video-section">
        <div class="video-placeholder">
          <div class="video-placeholder-inner">
            <div class="video-play-icon">&#9654;</div>
            <div class="video-placeholder-text">
              <strong>${coach.firstName} stellt sich vor</strong>
              <span>Video folgt in Kürze</span>
            </div>
          </div>
        </div>
      </div>`;

  document.getElementById('profile-main').innerHTML = `
    ${videoSection}
    ${aboutSection}

    ${coach.specialties && coach.specialties.length ? `
    <div class="profile-section">
      <h2>Schwerpunkte</h2>
      <div class="specialty-list">${coach.specialties.map(s => `<span class="specialty-tag">${s}</span>`).join('')}</div>
    </div>` : ''}

    <div class="profile-section">
      <h2>Verifizierte Lizenzen</h2>
      <div class="cred-list">
        <span class="bg-badge"><span class="check">&#10003;</span> Führungszeugnis</span>
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

      ${coach.valueIncludes ? `
      <ul class="sidebar-value-stack">
        ${coach.valueIncludes.map(v => `<li><span class="check">&#10003;</span> ${v}</li>`).join('')}
      </ul>` : ''}

      <div class="sidebar-avail">
        <strong>Verfügbarkeit:</strong><br>${coach.availability}
      </div>

      ${coach.responseTime ? `<div class="sidebar-response">&#9679; Antwortet meist innerhalb ${coach.responseTime}</div>` : ''}

      <button class="btn-contact" onclick="openContact()">Trainer kontaktieren</button>

      <div class="sidebar-risk">Nicht zufrieden nach der ersten Einheit? Sprich Marc direkt an — gemeinsam findet ihr eine Lösung.</div>

      <div class="sidebar-trust">
        <div class="sidebar-trust-item"><span class="check">&#10003;</span> Führungszeugnis</div>
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
        <h2>${coach.firstName} kontaktieren</h2>
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
            <div class="value">
              <span id="phone-masked">+49 *** *** ****</span>
              <a id="phone-reveal" href="#" onclick="revealPhone(event, '${coach.contactPhone || ''}'); return false;" style="margin-left:8px; font-size:0.85rem; color:var(--primary); text-decoration:underline;">Anzeigen</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function openContact() {
  document.getElementById('contact-modal').classList.add('active');
}

function revealPhone(e, phone) {
  const masked = document.getElementById('phone-masked');
  const link = document.getElementById('phone-reveal');
  if (!masked || !link || !phone) return;
  const digits = phone.replace(/\D/g, '');
  masked.innerHTML = `<a href="tel:${digits}">${phone}</a>`;
  link.remove();
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
