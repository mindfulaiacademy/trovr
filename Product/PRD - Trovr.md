# Product Requirements Document: Trovr

**Product:** Trovr — Youth Sports Coach Directory with Verified Credentials
**Owner:** Solo Founder
**Status:** Draft
**Last Updated:** 2026-03-17

---

## 1. Executive Summary

### Product Vision
Trovr is a web-based directory and booking platform where youth sports coaches build verified profiles and parents find, compare, and book them. It replaces the broken word-of-mouth and generic marketplace discovery process with a sport-specific, trust-first experience backed by background checks, credential verification, session history, and real parent reviews.

**Target Users:** Parents of youth athletes (ages 6–18) and independent youth sports coaches
**Key Differentiator:** Every coach is background-checked and credential-verified before appearing on the platform — no self-reporting, no fakes
**Success Definition:** 50 verified coaches, 200 registered parents, and 500 completed bookings within the first 90 days in one metro (Austin, TX)

### Strategic Alignment

| Objective | How Trovr Supports It |
|---|---|
| Revenue generation | Coach subscriptions ($15–$25/mo) + 7% booking fee |
| User growth | Free parent access creates demand-side pull; referral loops drive organic growth |
| Market opportunity | $23.8B coaching industry by 2030, 9.3% CAGR; no sport-specific verified directory exists |
| Competitive advantage | Thumbtack, Care.com, CoachUp lack sport-specific credentials, verified background checks, and video portfolios in one place |

### Resource Requirements
- **Team:** Solo founder with AI tools
- **Budget:** $0–$10K
- **MVP Timeline:** 1–2 weeks
- **Key Milestones:**
  - Week 1: Core platform (profiles, search, booking)
  - Week 2: Reviews, payments, coach dashboard
  - Week 3–4: Manual coach onboarding + first bookings
  - Day 90: 500 completed bookings target

---

## 2. Problem Statement & Opportunity

### Problem Definition

**For Parents:**
The best youth sports coaches are invisible beyond their immediate neighborhood. Parents rely on Facebook group recommendations, outdated Google results, and generic service platforms (Thumbtack, Craigslist) that treat coaching like any other gig. There is no way to verify a coach's credentials, background, or track record before trusting them with your child.

- **63% of parents** in youth sports communities report difficulty finding qualified coaches (Facebook group survey data)
- **Zero platforms** offer sport-specific credential verification combined with background checks
- Parents spend an average of **2–4 weeks** searching through word of mouth before booking a private coach
- **Trust is the #1 barrier** — parents won't book without verified credentials and reviews from other parents

**For Coaches:**
Talented, experienced coaches are terrible at marketing. A coach who spent a decade developing collegiate athletes has the same online visibility as a weekend hobbyist. Their reputation travels by word of mouth and stops at the edge of their neighborhood. Coaches two miles away from families who need exactly what they offer have no way to reach them.

- Coaches lose an estimated **40–60% of potential clients** due to lack of discoverability
- No platform lets coaches build a verified, portable track record
- Generic platforms don't surface sport-specific context (licenses, athlete outcomes, training style)

### Opportunity Analysis

| Metric | Value |
|---|---|
| Total Addressable Market | $23.8B U.S. coaching industry by 2030 |
| Serviceable Market | ~$2.4B youth sports private coaching |
| Initial Target | Austin, TX metro — est. 500+ independent youth coaches |
| Revenue Model | Coach subscriptions + booking fees |
| 12-Month ARR Target | $120K–$360K (100–300 paying coaches) |

### Success Criteria

**Primary Metrics (90-day targets):**
| Metric | Target |
|---|---|
| Verified coaches on platform | 50 |
| Registered parents | 200 |
| Completed bookings | 500 |
| Average coach rating | 4.5+ stars |
| Parent rebook rate | 70%+ |

**Secondary Metrics:**
| Metric | Target |
|---|---|
| Coach subscription conversion (free → paid) | 25% |
| Parent referral rate | 15% |
| Average bookings per coach per month | 10+ |
| Customer acquisition cost (parent) | < $15 |
| Coach churn rate | < 15% monthly |

---

## 3. User Requirements & Stories

### Primary User Personas

#### Persona 1: Sarah — The Searching Parent
- **Age:** 34–45
- **Context:** Has a 9-year-old son who plays recreational soccer and wants to improve enough for select tryouts
- **Tech-savviness:** Uses apps daily (Uber, Amazon, Instagram); comfortable with online booking
- **Goals:** Find a qualified, trustworthy soccer coach within 15 minutes of home; see proof of results before committing
- **Pain Points:** Spent 3 weeks asking in Facebook groups; got conflicting recommendations; can't verify any coach's actual credentials; worried about background safety
- **Success Criteria:** Finds and books a verified coach in under 10 minutes; sees improvement in her son within a month; refers the coach to two other parents

#### Persona 2: Coach Marcus — The Invisible Expert
- **Age:** 30–55
- **Context:** USSF-licensed soccer coach with 12 years of experience; has developed 28 athletes to select/club level; runs 15–20 sessions per week
- **Tech-savviness:** Basic — uses phone for texts and social media; no website; no marketing skills
- **Goals:** Get discovered by more families outside his immediate neighborhood; build a verified online reputation; grow from 15 to 30 sessions per week
- **Pain Points:** All clients come from word of mouth; can't reach families 2+ miles away; Thumbtack buries him among generalists; no way to showcase his credentials and results
- **Success Criteria:** Gets 10+ new families in first month; doubles his weekly sessions within 3 months; spends zero time on marketing

### User Journey Mapping

#### Parent Journey — Current State
1. Asks friends at practice/games for coach recommendations → limited to who they know
2. Posts in Facebook group → gets 15 conflicting suggestions with no verification
3. Googles "youth soccer coach near me" → finds Thumbtack generalists and dead listings
4. Texts/calls 3–5 coaches → no way to compare; inconsistent information
5. Books based on gut feeling → hopes it works out
6. **Time to first session: 2–4 weeks**

#### Parent Journey — Trovr Future State
1. Goes to Trovr → searches by sport, zip code, child's age
2. Browses verified coach profiles → sees background check status, credentials, video intros, parent reviews
3. Compares 2–3 coaches side by side → filters by availability, distance, price
4. Books a session online → pays securely through platform
5. Attends session → leaves a verified review
6. Refers Trovr to 2–3 parents in the league
7. **Time to first session: under 10 minutes**

#### Coach Journey — Trovr Future State
1. Applies to Trovr → submits credentials and consents to background check
2. Trovr verifies credentials and runs background check (1–3 business days)
3. Profile goes live → coach adds video intro, session clips, bio
4. Parents discover coach through search → booking requests come in
5. Coach confirms bookings → conducts sessions → gets reviewed
6. Track record grows → more parents find and book → referral loop kicks in

### Core User Stories

#### Epic 1: Coach Discovery (Parent)
**Story 1.1:** As a parent, I want to search for coaches by sport, location, and my child's age so that I only see relevant results.
- AC1: Search accepts sport type, zip code/city, and age range
- AC2: Results are sorted by relevance (distance, rating, availability)
- AC3: Results display coach name, photo, sport, rating, distance, price, and verification badges
- AC4: Search returns results in under 2 seconds
- **Priority:** Must Have

**Story 1.2:** As a parent, I want to view a coach's full profile so that I can evaluate their qualifications before booking.
- AC1: Profile displays verified credentials, background check status, certifications
- AC2: Profile shows parent reviews with star ratings
- AC3: Profile includes video intro and/or session clips (if Complete Showcase tier)
- AC4: Profile shows session history count, years of experience, athlete age range
- AC5: Profile displays pricing and availability
- **Priority:** Must Have

**Story 1.3:** As a parent, I want to filter and sort search results so that I can narrow down my options.
- AC1: Filter by distance (5, 10, 15, 25 miles)
- AC2: Filter by price range
- AC3: Filter by availability (day of week, time of day)
- AC4: Filter by rating (4+ stars, 4.5+ stars)
- AC5: Sort by rating, distance, price, or number of reviews
- **Priority:** Should Have

#### Epic 2: Booking & Payment (Parent)
**Story 2.1:** As a parent, I want to book a session with a coach online so that I don't have to call or text back and forth.
- AC1: Parent can view available time slots on a calendar
- AC2: Parent can select a slot and confirm booking
- AC3: Both parent and coach receive confirmation via email/SMS
- AC4: Parent can cancel/reschedule with 24-hour notice
- **Priority:** Must Have

**Story 2.2:** As a parent, I want to pay securely through the platform so that I don't have to handle cash or Venmo.
- AC1: Payment is processed via Stripe at time of booking
- AC2: Coach receives payout after session is completed (minus 7% platform fee)
- AC3: Parent receives a receipt via email
- AC4: Refund is issued if coach cancels
- **Priority:** Must Have

#### Epic 3: Coach Profile Management (Coach)
**Story 3.1:** As a coach, I want to create and manage my profile so that parents can find and evaluate me.
- AC1: Coach can input bio, experience, sport specialties, age ranges served
- AC2: Coach can upload a profile photo
- AC3: Coach can set session pricing and availability
- AC4: Coach can view and respond to reviews
- **Priority:** Must Have

**Story 3.2:** As a coach, I want to upload video content so that parents can see my coaching style.
- AC1: Coach can upload a video intro (max 3 minutes)
- AC2: Coach can upload session highlight clips (max 5 clips, 1 min each)
- AC3: Videos are hosted and streamed within the profile
- AC4: Available on Complete Showcase tier ($25/mo) only
- **Priority:** Should Have

#### Epic 4: Reviews & Reputation (Both)
**Story 4.1:** As a parent, I want to leave a review after a session so that other parents can benefit from my experience.
- AC1: Review prompt is sent 24 hours after a completed session
- AC2: Review includes star rating (1–5) and written feedback
- AC3: Review is tied to a verified, completed booking (no fake reviews)
- AC4: Review appears on coach's profile within 24 hours
- **Priority:** Must Have

**Story 4.2:** As a coach, I want to see my reviews and ratings so that I can understand my reputation and improve.
- AC1: Coach dashboard shows aggregate rating and individual reviews
- AC2: Coach can respond to reviews publicly
- AC3: Coach can flag inappropriate reviews for moderation
- **Priority:** Must Have

#### Epic 5: Verification & Trust (Platform)
**Story 5.1:** As the platform, I need to verify coach credentials so that parents can trust the directory.
- AC1: Coach submits credentials during onboarding (license numbers, certifications)
- AC2: Platform independently verifies credentials with issuing organizations
- AC3: Verified credentials display as badges on profile (e.g., "USSF Licensed", "CPR Certified")
- AC4: Verification status is updated annually
- **Priority:** Must Have

**Story 5.2:** As the platform, I need to run background checks on all coaches so that child safety is guaranteed.
- AC1: Background check is initiated during coach onboarding
- AC2: Coach must pass background check before profile goes live
- AC3: Background check is renewed annually
- AC4: Background check badge is prominently displayed on profile
- **Priority:** Must Have

#### Epic 6: Referral System (Both)
**Story 6.1:** As a parent, I want to refer Trovr to other parents so that they can find great coaches too.
- AC1: Parent can generate a unique referral link
- AC2: Parent earns a credit ($10) when referred parent completes first booking
- AC3: Referred parent gets $10 off first session
- AC4: Referral tracking is visible in parent dashboard
- **Priority:** Could Have (post-MVP)

---

## 4. Functional Requirements

### Core Features (Must Have — MVP)

| # | Feature | Description |
|---|---|---|
| F1 | Coach Search | Search by sport, location (zip), and child age; return ranked results with verification badges |
| F2 | Coach Profiles | Verified profiles with bio, credentials, background check status, reviews, pricing, availability |
| F3 | Online Booking | Calendar-based booking with real-time availability; confirmation via email/SMS |
| F4 | Secure Payments | Stripe integration; parent pays at booking; coach receives payout minus 7% after session |
| F5 | Parent Reviews | Post-session review tied to completed booking; star rating + written feedback |
| F6 | Background Checks | Integrated background check during coach onboarding; must pass before profile goes live |
| F7 | Credential Verification | Platform verifies coaching licenses and certifications independently |
| F8 | Coach Dashboard | View bookings, earnings, reviews, profile analytics |
| F9 | Parent Dashboard | View upcoming/past bookings, saved coaches, reviews written |
| F10 | User Authentication | Email/password registration and login for both parents and coaches |

### Secondary Features (Should Have — V1.1)

| # | Feature | Description |
|---|---|---|
| S1 | Video Portfolios | Coach uploads video intro and session clips (Complete Showcase tier) |
| S2 | Advanced Filters | Filter by distance, price, availability, rating |
| S3 | Coach Messaging | In-app messaging between parent and coach pre-booking |
| S4 | Email Notifications | Booking confirmations, reminders, review prompts, referral updates |
| S5 | Coach Analytics | Session count trends, revenue tracking, profile view counts |

### Future Features (Could Have — V2.0)

| # | Feature | Description |
|---|---|---|
| C1 | Referral Program | Parent referral links with credits for both referrer and referee |
| C2 | Multi-Sport Expansion | Add sports beyond soccer/basketball |
| C3 | League Partnerships | Bulk coach profiles for youth league organizations |
| C4 | AI Review Authentication | Flag suspicious review patterns |
| C5 | Coach Branding Suite | Custom branded profiles with advanced marketing tools ($10K/yr tier) |
| C6 | Mobile App | Native iOS/Android app |

### Feature Prioritization (MoSCoW)

| Priority | Features |
|---|---|
| **Must Have** | F1–F10 (Search, Profiles, Booking, Payments, Reviews, Background Checks, Credential Verification, Dashboards, Auth) |
| **Should Have** | S1–S5 (Video, Filters, Messaging, Notifications, Analytics) |
| **Could Have** | C1–C3 (Referrals, Multi-Sport, League Partnerships) |
| **Won't Have (yet)** | C4–C6 (AI Review Auth, Branding Suite, Mobile App) |

---

## 5. Technical Requirements

### Architecture Specifications

**Technology Stack:**

| Layer | Technology | Rationale |
|---|---|---|
| Frontend | Next.js (React) | Fast SSR for SEO; component-based UI; great developer ecosystem |
| Backend | Next.js API Routes or Node.js/Express | Unified JS stack; fast development for solo founder |
| Database | PostgreSQL (via Supabase or Neon) | Relational data model fits coach/parent/booking relationships; managed hosting reduces ops |
| Authentication | Supabase Auth or NextAuth.js | Built-in email/password + OAuth; role-based access (parent vs coach) |
| Payments | Stripe Connect | Marketplace payment splitting; handles coach payouts minus platform fee |
| File Storage | Cloudflare R2 or AWS S3 | Video and image hosting for coach profiles |
| Search | PostgreSQL full-text search (MVP) → Algolia (scale) | Simple to start; upgrade path when search volume grows |
| Hosting | Vercel | Zero-config Next.js deployment; global CDN; auto-scaling |
| Background Checks | Checkr API | Industry-standard background check provider with API integration |
| Email/SMS | Resend (email) + Twilio (SMS) | Transactional notifications for bookings and reviews |

### Data Model (Key Entities)

```
Users
├── id (UUID)
├── email
├── password_hash
├── role (parent | coach | admin)
├── first_name, last_name
├── phone
├── created_at

Coach_Profiles
├── id (UUID)
├── user_id (FK → Users)
├── bio
├── sports[] (e.g., ["soccer", "basketball"])
├── age_range_min, age_range_max
├── years_experience
├── session_price_cents
├── location_lat, location_lng
├── location_city, location_state, location_zip
├── subscription_tier (verified | showcase)
├── background_check_status (pending | passed | failed)
├── background_check_date
├── profile_photo_url
├── video_intro_url
├── is_active
├── created_at

Credentials
├── id (UUID)
├── coach_profile_id (FK → Coach_Profiles)
├── credential_type (license | certification)
├── credential_name (e.g., "USSF C License")
├── issuing_organization
├── verification_status (pending | verified | rejected)
├── verified_date
├── expiry_date

Availability
├── id (UUID)
├── coach_profile_id (FK → Coach_Profiles)
├── day_of_week (0–6)
├── start_time, end_time
├── location_name (e.g., "Zilker Park Field 3")

Bookings
├── id (UUID)
├── parent_user_id (FK → Users)
├── coach_profile_id (FK → Coach_Profiles)
├── session_date, session_time
├── duration_minutes
├── price_cents
├── platform_fee_cents
├── status (pending | confirmed | completed | cancelled)
├── stripe_payment_intent_id
├── created_at

Reviews
├── id (UUID)
├── booking_id (FK → Bookings)
├── parent_user_id (FK → Users)
├── coach_profile_id (FK → Coach_Profiles)
├── rating (1–5)
├── comment
├── coach_response
├── created_at

Video_Clips
├── id (UUID)
├── coach_profile_id (FK → Coach_Profiles)
├── title
├── url
├── duration_seconds
├── type (intro | session_clip)
├── created_at
```

### API Endpoints (Core)

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register new user (parent or coach) |
| POST | /api/auth/login | Authenticate user |
| GET | /api/coaches/search?sport=&zip=&age=&radius= | Search coaches with filters |
| GET | /api/coaches/:id | Get full coach profile |
| POST | /api/coaches/profile | Create/update coach profile |
| GET | /api/coaches/:id/availability | Get coach availability |
| POST | /api/bookings | Create a new booking |
| PATCH | /api/bookings/:id | Update booking status (confirm/cancel) |
| GET | /api/bookings?user_id= | List bookings for a user |
| POST | /api/reviews | Submit a review for a completed booking |
| GET | /api/coaches/:id/reviews | Get reviews for a coach |
| POST | /api/payments/checkout | Create Stripe checkout session |
| POST | /api/webhooks/stripe | Handle Stripe payment webhooks |

### Performance Specifications

| Metric | Target |
|---|---|
| Search results load time | < 2 seconds |
| Profile page load time | < 1.5 seconds |
| Booking confirmation | < 3 seconds |
| Video playback start | < 2 seconds |
| Uptime | 99.5% |
| Concurrent users supported | 500 (MVP) |
| Database query time | < 200ms (95th percentile) |

### Security Requirements

| Requirement | Implementation |
|---|---|
| Authentication | JWT tokens with refresh rotation; bcrypt password hashing |
| Authorization | Role-based access control (parent, coach, admin) |
| Payment data | PCI compliant via Stripe (no card data stored on platform) |
| Personal data | Encrypted at rest; HTTPS enforced; COPPA compliance for child-related data |
| Background check data | Stored securely; access restricted to admin; not displayed to parents beyond pass/fail |
| Data privacy | Privacy policy and terms of service; GDPR-style data deletion on request |

---

## 6. User Experience Requirements

### Design Principles
1. **Trust-first:** Verification badges, background check status, and real reviews should be the most prominent elements on every coach profile
2. **Simple and fast:** A parent should go from search to booked session in under 5 minutes
3. **Mobile-first:** 70%+ of parents will access on mobile; design for small screens first
4. **Sport-specific context:** Show the information that matters to sports parents (licenses, athlete outcomes, training style) — not generic marketplace fields

### Key Screens

| Screen | Purpose | Key Elements |
|---|---|---|
| Home / Search | Entry point; search for coaches | Search bar (sport, zip, age), featured coaches, trust indicators |
| Search Results | Browse matching coaches | Coach cards with photo, name, sport, rating, distance, price, verification badges |
| Coach Profile | Evaluate a specific coach | Full bio, credentials, background check badge, reviews, video, availability calendar, "Book Now" CTA |
| Booking Flow | Select time and pay | Calendar picker, session details, Stripe payment form, confirmation |
| Parent Dashboard | Manage bookings and reviews | Upcoming sessions, past sessions, review prompts, saved coaches |
| Coach Dashboard | Manage profile and business | Upcoming bookings, earnings summary, reviews, profile editor, analytics |
| Coach Onboarding | Get verified and set up profile | Step-by-step: personal info → credentials → background check consent → profile setup → pricing/availability |

### Responsive Design Requirements
- **Mobile (< 768px):** Single column layout; bottom navigation; thumb-friendly tap targets (44px min); collapsible filters
- **Tablet (768–1024px):** Two-column search results; side-by-side profile sections
- **Desktop (> 1024px):** Three-column search results; full profile layout with video and reviews visible without scrolling

### Accessibility
- WCAG 2.1 AA compliance
- Semantic HTML with proper heading hierarchy
- Alt text on all images
- Keyboard navigable
- Color contrast ratio 4.5:1 minimum

---

## 7. Non-Functional Requirements

### Reliability
- **Uptime target:** 99.5% (allows ~3.6 hours downtime/month)
- **Backup:** Daily automated database backups with 30-day retention
- **Error handling:** Graceful error pages; no raw error messages shown to users
- **Monitoring:** Vercel analytics + Sentry error tracking

### Scalability
- **Phase 1 (0–6 months):** Single metro, 50–100 coaches, 500–2,000 parents → PostgreSQL on managed hosting handles this easily
- **Phase 2 (6–12 months):** 3–5 metros, 300–500 coaches, 5,000–10,000 parents → Add read replicas; upgrade search to Algolia
- **Phase 3 (12–24 months):** 10+ metros, 1,000+ coaches → Consider microservices for booking/payment; add CDN for video delivery

### Compliance
- **COPPA:** No direct data collection from children under 13; parent accounts only
- **PCI DSS:** Handled by Stripe; no card data touches platform servers
- **State coaching regulations:** Verify compliance with state-specific youth coaching requirements per metro
- **Background check laws:** Follow FCRA requirements for background check usage and disclosure

---

## 8. Success Metrics & Analytics

### Key Performance Indicators

**Acquisition:**
| KPI | Target (90 days) | Measurement |
|---|---|---|
| Coaches onboarded | 50 | Coach registrations with completed verification |
| Parents registered | 200 | Parent account creations |
| Organic search traffic | 1,000 visits/mo | Google Analytics |
| Referral signups | 30 | Referral link tracking |

**Engagement:**
| KPI | Target | Measurement |
|---|---|---|
| Search-to-profile view rate | 40%+ | Event tracking |
| Profile-to-booking rate | 15%+ | Funnel analytics |
| Average bookings per parent per month | 2+ | Booking data |
| Review completion rate | 60%+ | Post-session review submissions |

**Revenue:**
| KPI | Target (90 days) | Measurement |
|---|---|---|
| Monthly recurring revenue (coach subs) | $750–$1,250 | Stripe dashboard |
| Booking fee revenue | $1,750+ | 500 bookings × $50 avg × 7% |
| Total revenue (90 days) | $4,000–$5,500 | Combined |
| Coach lifetime value | $180+ (12 months × $15/mo) | Cohort analysis |

**Retention:**
| KPI | Target | Measurement |
|---|---|---|
| Parent rebook rate | 70%+ | Repeat booking tracking |
| Coach monthly retention | 85%+ | Subscription churn tracking |
| Net Promoter Score (parents) | 50+ | Quarterly survey |

### Analytics Implementation
- **Event tracking:** Search performed, profile viewed, booking started, booking completed, review submitted, referral shared
- **Funnel dashboards:** Search → Profile View → Booking → Completion → Review → Referral
- **A/B testing:** Headlines, CTA copy, search result card layout, pricing page
- **Tools:** Vercel Analytics (traffic), PostHog or Mixpanel (product analytics), Stripe Dashboard (revenue)

---

## 9. Implementation Plan

### Phase 1: Foundation (Days 1–7)
- Project setup (Next.js, Supabase, Stripe Connect)
- Database schema and migrations
- User authentication (parent + coach roles)
- Coach profile CRUD
- Search endpoint with geolocation filtering

### Phase 2: Core Features (Days 8–14)
- Booking flow with calendar UI
- Stripe payment integration
- Review system (post-session)
- Coach and parent dashboards
- Email notifications (booking confirmation, review prompts)

### Phase 3: Trust & Verification (Days 15–21)
- Background check integration (Checkr API or manual process for MVP)
- Credential verification workflow (manual for MVP; admin panel)
- Verification badge display on profiles
- Admin moderation panel

### Phase 4: Polish & Launch Prep (Days 22–30)
- Mobile responsiveness pass
- SEO optimization (meta tags, structured data, sitemap)
- Performance optimization (image compression, lazy loading)
- Error handling and edge case testing
- Analytics implementation
- Landing page connection

### Phase 5: Manual Coach Onboarding (Days 14–45, overlapping)
- Identify and contact 15 coaches in Austin, TX (soccer + basketball)
- Run background checks
- Build profiles with video intros and testimonials from existing clients
- Set pricing and availability

### Phase 6: Soft Launch (Days 30–45)
- Invite first 50 parents from local league communities
- Facilitate first 50 bookings manually
- Collect feedback and iterate
- Monitor all metrics

### Phase 7: Growth (Days 45–90)
- Open registration to public
- Begin local SEO and Facebook group engagement
- Launch referral program
- Scale to 50 coaches and 200 parents
- Hit 500 booking target

---

## 10. Risk Assessment & Mitigation

### Technical Risks

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Stripe Connect setup complexity | Medium | High | Use Stripe's hosted onboarding; follow marketplace quickstart guide |
| Background check API integration delays | Medium | High | Start with manual background checks; automate later |
| Video hosting costs at scale | Low (MVP) | Medium | Use Cloudflare R2 (cheap storage); limit video count per tier |
| Search performance with geolocation | Low | Medium | PostgreSQL PostGIS extension handles this well at MVP scale |

### Business Risks

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Coaches don't sign up (supply problem) | High | Critical | Onboard first 15 by hand; offer 3 months free; build profiles for them |
| Parents don't find the platform (demand problem) | High | Critical | Seed demand through Facebook groups, league partnerships, local SEO |
| Chicken-and-egg marketplace problem | High | Critical | Start with supply (coaches) first; ensure 10+ options before inviting parents |
| Coach quality inconsistency | Medium | High | Strict verification; review monitoring; deactivate low-rated coaches |
| Competition from Thumbtack/CoachUp | Medium | Medium | Differentiate on verification depth, sport-specific context, and video |

### Regulatory Risks

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| COPPA compliance | Medium | High | Never collect data directly from minors; parent-only accounts |
| Background check legal requirements (FCRA) | Medium | High | Use compliant provider (Checkr); follow disclosure and consent requirements |
| State coaching regulations | Low | Medium | Research Austin/TX requirements; build compliance into onboarding |

---

## Quality Checklist

- [x] Problem is clearly defined with evidence
- [x] Solution aligns with user needs and business goals
- [x] Requirements are specific and measurable
- [x] Acceptance criteria are testable
- [x] Technical feasibility is validated (solo founder + AI tools + managed services)
- [x] Success metrics are defined and trackable
- [x] Risks are identified with mitigation plans
- [ ] Stakeholder alignment confirmed (N/A — solo founder)

---

*This PRD serves as the source of truth for Trovr's MVP development. All feature specs and roadmap milestones should reference this document.*
