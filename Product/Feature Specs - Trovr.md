# Feature Specifications: Trovr MVP

**Product:** Trovr — Youth Sports Coach Directory
**Reference:** PRD - Trovr.md
**Last Updated:** 2026-03-17

---

## Feature 1: Coach Search & Discovery

### Overview
| Field | Value |
|---|---|
| Feature Name | Coach Search & Discovery |
| Category | Core |
| Priority | Must Have |
| Target Release | MVP (Week 1) |
| Problem Statement | Parents have no efficient way to find qualified youth sports coaches near them with verified credentials |
| Success Criteria | 40%+ of searches result in a profile view; search returns results in under 2 seconds |
| User Impact | Parents (primary); reduces coach discovery from 2–4 weeks to under 10 minutes |

### User Personas & Use Cases

**Primary: Sarah (Searching Parent)**
- Opens Trovr on her phone during lunch break
- Enters "Soccer", her zip code, and her son's age (9)
- Wants to see only coaches within 10 miles who work with kids ages 6–12
- Needs to quickly scan results and identify the best options by rating, credentials, and price

**Secondary: New-to-Area Parent**
- Just moved to Austin; knows no one
- Needs to find a basketball coach for her 12-year-old immediately
- Trusts verification badges more than word of mouth since she has no local network

**Edge Cases:**
- No coaches match the search criteria → show "No coaches found" with suggestion to expand radius or try a different sport
- Coach is fully booked → still show in results with "Waitlist" option
- Parent searches without creating an account → allow browsing; require account for booking

### Detailed User Stories

**Story 1.1: Basic Search**
- **As a** parent
- **I want** to search for coaches by sport, location, and my child's age
- **So that** I only see relevant coaches near me

**Acceptance Criteria:**
- Given a parent is on the home page, when they enter sport, zip code, and child's age and hit "Search", then results display within 2 seconds
- Given no coaches match, when results load, then a friendly "No coaches found" message appears with suggestions to expand search
- Given the parent hasn't created an account, when they search, then results still display (no login required to browse)

**Story 1.2: Search Results Display**
- **As a** parent
- **I want** to see key information about each coach in search results
- **So that** I can quickly decide which profiles to explore

**Acceptance Criteria:**
- Each result card shows: profile photo, name, sport tags, star rating, review count, distance, session price, and verification badges (background check, credentials)
- Cards are sorted by relevance (combination of distance, rating, and review count)
- Mobile: single column cards; Desktop: 2–3 column grid

**Story 1.3: Filters and Sorting**
- **As a** parent
- **I want** to filter and sort results
- **So that** I can narrow to the best options faster

**Acceptance Criteria:**
- Filter by: distance (5/10/15/25 mi), price range ($–$$$$), availability (day/time), minimum rating (4+, 4.5+)
- Sort by: relevance (default), rating, distance, price (low-high, high-low), most reviews
- Filters persist during the session; reset button clears all
- Mobile: filters accessible via bottom sheet or slide-out panel

### Functional Requirements

**Search Input:**
- Input: sport (dropdown or autocomplete), zip code or city (text), child's age (number)
- Processing: geocode zip → lat/lng; query coaches within default 15mi radius matching sport and age range
- Output: paginated list of coach cards (20 per page)
- Validation: sport is required; zip must be valid 5-digit US zip; age must be 3–18

**Geolocation Search:**
- Use PostGIS or Haversine formula to calculate distance from parent's zip to coach location
- Default radius: 15 miles
- Calculate and display distance on each result card (e.g., "3.2 mi away")

**Result Ranking Algorithm (MVP):**
```
score = (rating × 0.4) + (review_count_normalized × 0.3) + (inverse_distance_normalized × 0.2) + (has_video × 0.1)
```

**Business Rules:**
- Only coaches with `background_check_status = passed` and `is_active = true` appear in results
- Coaches with expired credentials show a "Renewal Pending" badge instead of verified badge
- Free-tier coaches and paid-tier coaches both appear; paid-tier coaches with video get a slight ranking boost

### Technical Specifications

**Frontend:**
- Search bar component (sport dropdown, zip input, age input, search button)
- Search results grid component (responsive: 1 col mobile, 2–3 col desktop)
- Coach card component (photo, name, badges, rating, price, distance, CTA)
- Filter/sort panel component (collapsible on mobile)
- Pagination component
- Empty state component
- Loading skeleton component

**Backend:**
```
GET /api/coaches/search
  Query params:
    sport (string, required)
    zip (string, required) — or lat, lng
    age (integer, required)
    radius (integer, optional, default 15, max 50) — miles
    min_rating (float, optional)
    min_price (integer, optional) — cents
    max_price (integer, optional) — cents
    day_of_week (integer[], optional) — 0=Sun, 6=Sat
    sort (string, optional) — relevance|rating|distance|price_asc|price_desc|reviews
    page (integer, optional, default 1)
    limit (integer, optional, default 20, max 50)

  Response (200):
    {
      coaches: [{
        id, first_name, last_name, profile_photo_url,
        sports: [], age_range_min, age_range_max,
        avg_rating, review_count, session_price_cents,
        distance_miles, years_experience,
        background_check_passed: boolean,
        credentials: [{ name, verified: boolean }],
        has_video: boolean,
        subscription_tier
      }],
      total_count: integer,
      page: integer,
      total_pages: integer
    }

  Response (400): { error: "Invalid zip code" }
```

**Database Query (simplified):**
```sql
SELECT cp.*,
  AVG(r.rating) as avg_rating,
  COUNT(r.id) as review_count,
  ST_Distance(cp.location::geography, ST_MakePoint($lng, $lat)::geography) / 1609.34 as distance_miles
FROM coach_profiles cp
LEFT JOIN reviews r ON r.coach_profile_id = cp.id
WHERE cp.is_active = true
  AND cp.background_check_status = 'passed'
  AND $sport = ANY(cp.sports)
  AND cp.age_range_min <= $age
  AND cp.age_range_max >= $age
  AND ST_DWithin(cp.location::geography, ST_MakePoint($lng, $lat)::geography, $radius_meters)
GROUP BY cp.id
ORDER BY <sort_expression>
LIMIT $limit OFFSET $offset;
```

### Performance Requirements
| Metric | Target |
|---|---|
| Search response time | < 2 seconds (including geocoding) |
| Results rendering | < 500ms after data received |
| Geocoding cache | Cache zip → lat/lng lookups for 30 days |

---

## Feature 2: Coach Profile Page

### Overview
| Field | Value |
|---|---|
| Feature Name | Coach Profile Page |
| Category | Core |
| Priority | Must Have |
| Target Release | MVP (Week 1) |
| Problem Statement | Parents need a comprehensive view of a coach's qualifications, experience, reviews, and availability to make a confident booking decision |
| Success Criteria | 15%+ of profile views result in a booking; average time on profile page > 90 seconds |
| User Impact | Parents can evaluate coaches thoroughly; coaches get a professional showcase without building their own website |

### Detailed User Stories

**Story 2.1: View Coach Profile**
- **As a** parent
- **I want** to see a coach's full profile with credentials, reviews, and availability
- **So that** I can decide if they're the right fit for my child

**Acceptance Criteria:**
- Profile displays: photo, name, bio, sports, age range, years of experience, session price
- Verification section shows: background check badge (passed/pending), each verified credential with badge
- Reviews section shows: aggregate rating, total count, individual reviews sorted by newest
- Availability section shows: weekly calendar with open time slots
- "Book a Session" CTA is always visible (sticky on mobile)
- Page loads in under 1.5 seconds

**Story 2.2: View Video Content (Showcase Tier)**
- **As a** parent
- **I want** to watch a coach's video intro and session clips
- **So that** I can see their coaching style before booking

**Acceptance Criteria:**
- Video intro plays inline on the profile page (not a new tab)
- Session clips display as a scrollable gallery below the intro
- Videos show only for coaches on Complete Showcase tier ($25/mo)
- Coaches on Verified tier ($15/mo) show an "Upgrade to see video" prompt to the coach (not visible to parents)

**Story 2.3: Read Reviews**
- **As a** parent
- **I want** to read other parents' reviews of this coach
- **So that** I can learn from their experience

**Acceptance Criteria:**
- Reviews show star rating, parent first name + last initial, date, and written comment
- Coach's response (if any) shows below the review
- "Verified Session" badge appears on each review (since all reviews are tied to bookings)
- Reviews paginate (10 per page)
- Overall rating breakdown (5-star, 4-star, etc.) shown as bar chart

### Functional Requirements

**Profile Sections (in order):**
1. **Header:** Photo, name, sport tags, location (city), rating, review count, price, "Book Now" button
2. **Verification Strip:** Background check badge, credential badges (USSF Licensed, CPR Certified, etc.)
3. **About:** Bio text, years of experience, athlete age range, training philosophy
4. **Video** (Showcase tier only): Video intro, session clips gallery
5. **Stats:** Total sessions completed, active athletes, years on platform
6. **Reviews:** Aggregate rating, breakdown chart, individual reviews with pagination
7. **Availability:** Weekly calendar view with bookable time slots
8. **Location:** Map showing general area (zip-level, not exact address)

**Business Rules:**
- Profile is only viewable if `background_check_status = passed` and `is_active = true`
- Coach's exact address is never shown; only city/zip and a general area map
- Reviews cannot be edited by the parent after 48 hours
- Coach can respond to reviews once per review

### Technical Specifications

**Frontend Components:**
- ProfileHeader (photo, name, badges, rating, price, book CTA)
- VerificationStrip (background check + credential badges)
- AboutSection (bio, experience, philosophy)
- VideoGallery (video player + clip thumbnails) — conditional on tier
- StatsBar (sessions, athletes, years)
- ReviewSection (aggregate rating, breakdown chart, review list with pagination)
- AvailabilityCalendar (weekly view with bookable slots)
- LocationMap (embedded map at zip level)
- StickyBookCTA (mobile: fixed bottom bar with price + "Book Now")

**Backend:**
```
GET /api/coaches/:id
  Response (200):
    {
      id, first_name, last_name, profile_photo_url, bio,
      sports: [], age_range_min, age_range_max,
      years_experience, session_price_cents,
      location_city, location_state, location_zip,
      location_lat, location_lng, // zip centroid, not exact
      subscription_tier,
      background_check: { status, date },
      credentials: [{ name, organization, status, verified_date }],
      stats: { total_sessions, active_athletes, months_on_platform },
      avg_rating, review_count,
      rating_breakdown: { 5: count, 4: count, 3: count, 2: count, 1: count },
      videos: [{ id, title, url, type, duration_seconds }], // empty if not showcase tier
      availability: [{ day_of_week, start_time, end_time, location_name }]
    }

  Response (404): { error: "Coach not found" }

GET /api/coaches/:id/reviews?page=1&limit=10
  Response (200):
    {
      reviews: [{
        id, rating, comment, coach_response,
        parent_name: "Sarah T.",
        verified_session: true,
        created_at
      }],
      total_count, page, total_pages
    }
```

---

## Feature 3: Booking & Payment

### Overview
| Field | Value |
|---|---|
| Feature Name | Booking & Payment System |
| Category | Core |
| Priority | Must Have |
| Target Release | MVP (Week 2) |
| Problem Statement | Parents and coaches currently coordinate sessions via text/phone, leading to back-and-forth, no-shows, and payment awkwardness |
| Success Criteria | 80%+ of bookings complete payment successfully; < 5% cancellation rate |
| User Impact | Parents book in under 3 minutes; coaches get guaranteed payment; platform earns 7% fee |

### Detailed User Stories

**Story 3.1: Book a Session**
- **As a** parent
- **I want** to select an available time slot and book a session with a coach
- **So that** I can secure a training session for my child

**Acceptance Criteria:**
- Given I'm viewing a coach's profile, when I click "Book a Session", then I see available time slots for the next 14 days
- Given I select a time slot, when I confirm, then I'm taken to the payment step
- Given I complete payment, when the transaction succeeds, then I receive a booking confirmation via email and the slot is removed from availability
- Given I'm not logged in, when I try to book, then I'm prompted to create an account or log in

**Story 3.2: Pay for a Session**
- **As a** parent
- **I want** to pay securely online
- **So that** I don't have to handle cash or coordinate payment separately

**Acceptance Criteria:**
- Payment is processed via Stripe Checkout or Stripe Elements
- Parent is charged the full session price at time of booking
- Coach receives session price minus 7% platform fee after session is completed
- Parent receives an email receipt
- If payment fails, booking is not created; parent sees a clear error message

**Story 3.3: Cancel or Reschedule**
- **As a** parent
- **I want** to cancel or reschedule a session
- **So that** I have flexibility if plans change

**Acceptance Criteria:**
- Cancel with 24+ hours notice → full refund
- Cancel with < 24 hours notice → no refund (coach still receives payment)
- Reschedule with 24+ hours notice → parent picks a new slot; no additional charge
- Coach can cancel at any time → parent receives full refund automatically

**Story 3.4: Coach Booking Management**
- **As a** coach
- **I want** to view and manage incoming bookings
- **So that** I can organize my schedule

**Acceptance Criteria:**
- Coach dashboard shows upcoming bookings with parent name, date, time, location
- Coach receives email/SMS notification for new bookings
- Coach can confirm or decline a booking within 12 hours (auto-decline after)
- After session, booking status changes to "completed" and review prompt is sent to parent

### Functional Requirements

**Booking Flow:**
1. Parent clicks "Book a Session" on coach profile
2. Calendar displays available slots for next 14 days (pulled from coach's availability minus existing bookings)
3. Parent selects a date and time slot
4. Parent reviews booking details (coach name, date, time, location, price)
5. Parent enters payment info (Stripe) and confirms
6. Stripe processes payment → booking created with status "confirmed"
7. Confirmation email/SMS sent to both parent and coach
8. Slot removed from availability

**Payment Flow (Stripe Connect):**
```
Parent pays $50 → Stripe holds $50
Session completed → Stripe releases $46.50 to coach, $3.50 to platform
Coach cancels → Stripe refunds $50 to parent
Parent cancels (24h+) → Stripe refunds $50 to parent
Parent cancels (<24h) → Stripe releases $46.50 to coach, $3.50 to platform
```

**Business Rules:**
- Minimum booking lead time: 4 hours
- Maximum advance booking: 14 days
- Session duration: fixed per coach (typically 60 minutes)
- One booking per time slot per coach
- Parent must have a verified email to book
- Coach must have active subscription to receive bookings

### Technical Specifications

**Backend Endpoints:**
```
GET /api/coaches/:id/slots?start_date=&end_date=
  Returns available booking slots (availability minus existing bookings)
  Response: { slots: [{ date, start_time, end_time, location_name }] }

POST /api/bookings
  Body: { coach_id, date, start_time, duration_minutes }
  Processing: validate slot available → create Stripe checkout → create booking (status: pending)
  Response: { booking_id, stripe_checkout_url }

POST /api/webhooks/stripe
  Handles: checkout.session.completed → update booking status to "confirmed"
  Handles: charge.refunded → update booking status to "cancelled"

PATCH /api/bookings/:id
  Body: { status: "cancelled" | "completed" }
  Processing: check cancellation policy → process refund if applicable → update status
  Response: { booking }

GET /api/bookings?role=parent|coach&status=upcoming|past
  Returns bookings for the current user
  Response: { bookings: [{ id, coach/parent info, date, time, status, price }] }
```

**Stripe Connect Setup:**
- Platform uses Stripe Connect (Standard or Express accounts for coaches)
- Coach onboarding includes Stripe account creation
- Application fee: 7% on each booking
- Payouts: automatic after session completion (T+2 days)

---

## Feature 4: Review System

### Overview
| Field | Value |
|---|---|
| Feature Name | Verified Review System |
| Category | Core |
| Priority | Must Have |
| Target Release | MVP (Week 2) |
| Problem Statement | Parents can't trust reviews on generic platforms because anyone can post without having used the service |
| Success Criteria | 60%+ of completed sessions result in a review; zero fake reviews |
| User Impact | Parents get trustworthy feedback; coaches build verified reputations |

### Detailed User Stories

**Story 4.1: Submit a Review**
- **As a** parent
- **I want** to review a coach after our session
- **So that** other parents can benefit from my experience

**Acceptance Criteria:**
- Review prompt email sent 24 hours after session marked "completed"
- Review form: star rating (1–5, required), written comment (optional, max 1000 chars)
- Review is tied to the specific booking (verified session badge)
- Parent can only submit one review per booking
- Review appears on coach profile within 1 hour

**Story 4.2: Coach Response**
- **As a** coach
- **I want** to respond to parent reviews
- **So that** I can thank parents or address concerns

**Acceptance Criteria:**
- Coach can write one response per review (max 500 chars)
- Response appears below the review on the profile
- Coach receives notification when a new review is posted

### Functional Requirements

**Review Integrity Rules:**
- Only parents with a completed, paid booking can leave a review
- One review per booking
- Reviews cannot be edited after 48 hours
- Reviews cannot be deleted by parents (can be flagged for moderation)
- Coach cannot delete reviews; can flag for moderation
- Admin can remove reviews that violate terms (harassment, spam, off-topic)
- All reviews display "Verified Session" badge

**Backend Endpoints:**
```
POST /api/reviews
  Body: { booking_id, rating, comment }
  Validation: booking must be completed; parent must be booking owner; no existing review for this booking
  Response: { review }

POST /api/reviews/:id/response
  Body: { response }
  Validation: must be the coach for this review; no existing response
  Response: { review }

GET /api/coaches/:id/reviews?page=1&limit=10&sort=newest|highest|lowest
  Response: { reviews, total_count, page, total_pages, avg_rating, rating_breakdown }
```

---

## Feature 5: Coach Profile Management & Dashboard

### Overview
| Field | Value |
|---|---|
| Feature Name | Coach Dashboard & Profile Management |
| Category | Core |
| Priority | Must Have |
| Target Release | MVP (Week 2) |
| Problem Statement | Coaches need to manage their profile, availability, bookings, and earnings in one place without technical skills |
| Success Criteria | 90%+ of coaches complete their profile within 48 hours of onboarding; coaches check dashboard 3+ times per week |

### Detailed User Stories

**Story 5.1: Complete Profile Setup**
- **As a** new coach
- **I want** to set up my profile step by step
- **So that** parents can find and book me

**Acceptance Criteria:**
- Onboarding flow: Personal info → Credentials & certifications → Background check consent → Profile details (bio, photo) → Pricing & availability → Review & publish
- Progress bar shows completion percentage
- Profile goes live only after background check passes
- Coach can save progress and return later

**Story 5.2: Manage Availability**
- **As a** coach
- **I want** to set and update my weekly availability
- **So that** parents only see times I'm actually free

**Acceptance Criteria:**
- Weekly calendar interface: select available blocks per day of week
- Can set recurring weekly availability
- Can block specific dates (vacation, etc.)
- Changes apply immediately to search results and profile

**Story 5.3: View Dashboard**
- **As a** coach
- **I want** to see my upcoming bookings, earnings, and reviews at a glance
- **So that** I can manage my coaching business

**Acceptance Criteria:**
- Dashboard shows: upcoming bookings (next 7 days), total earnings (this month), new reviews, profile views (this week)
- Quick actions: view full schedule, manage availability, edit profile
- Notifications for: new booking, cancellation, new review

### Technical Specifications

**Dashboard Sections:**
1. **Overview Cards:** Upcoming sessions count, monthly earnings, average rating, profile views
2. **Upcoming Bookings:** List with parent name, date, time, location, status
3. **Recent Reviews:** Latest 3 reviews with rating and preview text
4. **Quick Actions:** Edit profile, manage availability, view all bookings, view earnings

**Backend Endpoints:**
```
GET /api/coach/dashboard
  Response: {
    upcoming_bookings: [{ id, parent_name, date, time, status }],
    stats: { monthly_earnings_cents, total_sessions, avg_rating, profile_views_week },
    recent_reviews: [{ id, rating, comment_preview, parent_name, date }]
  }

PUT /api/coach/profile
  Body: { bio, sports, age_range_min, age_range_max, session_price_cents, profile_photo_url }

PUT /api/coach/availability
  Body: { slots: [{ day_of_week, start_time, end_time, location_name }] }

PUT /api/coach/availability/blocks
  Body: { blocked_dates: ["2026-04-15", "2026-04-16"] }
```

---

## Feature 6: Background Check & Credential Verification

### Overview
| Field | Value |
|---|---|
| Feature Name | Coach Verification System |
| Category | Core |
| Priority | Must Have |
| Target Release | MVP (Week 2–3) |
| Problem Statement | Parents need assurance that coaches are safe and qualified; self-reported credentials cannot be trusted |
| Success Criteria | 100% of live coaches have passed background checks; zero coaches with unverified "verified" badges |

### Detailed User Stories

**Story 6.1: Background Check (Coach Onboarding)**
- **As a** coach
- **I want** to complete a background check during signup
- **So that** parents can trust that I'm safe to work with their children

**Acceptance Criteria:**
- Coach consents to background check during onboarding (legal disclosure + signature)
- Background check is initiated via Checkr API (or manual process for MVP)
- Coach profile shows "Background Check: Pending" until results come back
- Profile does NOT go live until background check passes
- If background check fails, coach is notified and cannot create a public profile
- Background check is renewed annually; coach receives reminder 30 days before expiry

**Story 6.2: Credential Verification**
- **As a** coach
- **I want** to submit my coaching licenses and certifications for verification
- **So that** parents can see I'm legitimately qualified

**Acceptance Criteria:**
- Coach enters credential name, issuing organization, and license/cert number during onboarding
- For MVP: admin manually verifies with issuing organization (USSF, USA Basketball, etc.)
- Verified credentials display as green badges on profile
- Pending credentials display as gray "Pending Verification" badges
- Failed verification: credential is not displayed; coach is notified

**MVP Approach (Manual):**
- Background checks: use Checkr's API for automated processing OR manually order through Checkr dashboard
- Credential verification: admin contacts issuing organization by phone/email to confirm; updates status in admin panel
- Target turnaround: 1–3 business days for background check; 3–5 business days for credential verification

**Scale Approach (V2):**
- Fully automated background checks via Checkr API
- Credential verification via API integrations with USSF, USA Basketball, American Red Cross (CPR)
- Automated annual renewal reminders and re-verification

### Technical Specifications

**Backend Endpoints:**
```
POST /api/coach/background-check
  Body: { consent: true, full_legal_name, date_of_birth, ssn_last_4, address }
  Processing: initiate Checkr background check → set status to "pending"
  Response: { status: "pending", estimated_completion: "2026-03-20" }

POST /api/webhooks/checkr
  Handles background check completion → update coach_profile.background_check_status

POST /api/coach/credentials
  Body: { credential_name, issuing_organization, license_number, expiry_date }
  Processing: create credential record with status "pending"
  Response: { credential }

PATCH /api/admin/credentials/:id
  Body: { verification_status: "verified" | "rejected", notes }
  Admin-only endpoint for manual verification
```

**Admin Panel Requirements:**
- List of coaches with pending background checks and credentials
- One-click to mark credential as verified or rejected
- Notes field for verification documentation
- Dashboard showing: pending verifications, average turnaround time, expiring credentials

---

## Feature 7: User Authentication & Accounts

### Overview
| Field | Value |
|---|---|
| Feature Name | User Authentication |
| Category | Core |
| Priority | Must Have |
| Target Release | MVP (Week 1) |
| Problem Statement | Platform needs secure, role-based access for parents, coaches, and admins |
| Success Criteria | < 2% account creation abandonment; zero unauthorized access incidents |

### Detailed User Stories

**Story 7.1: Register**
- **As a** new user
- **I want** to create an account as a parent or coach
- **So that** I can use the platform

**Acceptance Criteria:**
- Registration form: email, password, first name, last name, role (parent or coach)
- Password requirements: 8+ chars, 1 uppercase, 1 number
- Email verification required before booking (parents) or profile creation (coaches)
- Duplicate email → clear error message

**Story 7.2: Login**
- **As a** registered user
- **I want** to log in securely
- **So that** I can access my dashboard and bookings

**Acceptance Criteria:**
- Login via email + password
- "Forgot password" flow with email reset link
- Session persists for 30 days (remember me)
- Failed login → generic error ("Invalid email or password") to prevent email enumeration

### Technical Specifications

**Backend:**
```
POST /api/auth/register
  Body: { email, password, first_name, last_name, role }
  Processing: validate → hash password → create user → send verification email
  Response: { user_id, message: "Check your email to verify" }

POST /api/auth/login
  Body: { email, password }
  Processing: validate → check password → issue JWT + refresh token
  Response: { access_token, refresh_token, user }

POST /api/auth/verify-email
  Body: { token }

POST /api/auth/forgot-password
  Body: { email }

POST /api/auth/reset-password
  Body: { token, new_password }
```

**Security:**
- Passwords hashed with bcrypt (cost factor 12)
- JWT access tokens (15 min expiry) + refresh tokens (30 day expiry)
- Rate limiting: 5 login attempts per minute per IP
- CSRF protection on all state-changing endpoints
- HTTPS enforced

---

## Feature 8: Parent Dashboard

### Overview
| Field | Value |
|---|---|
| Feature Name | Parent Dashboard |
| Category | Core |
| Priority | Must Have |
| Target Release | MVP (Week 2) |
| Problem Statement | Parents need a central place to manage bookings, track sessions, and leave reviews |
| Success Criteria | Parents visit dashboard 2+ times per week |

### User Stories

**Story 8.1: View Dashboard**
- **As a** parent
- **I want** to see my upcoming and past bookings
- **So that** I can manage my child's coaching schedule

**Acceptance Criteria:**
- Dashboard shows: upcoming sessions (with coach name, date, time, location), past sessions, pending reviews
- "Leave a Review" button on past sessions without reviews
- Saved/favorited coaches list
- Quick search bar to find new coaches

**Backend:**
```
GET /api/parent/dashboard
  Response: {
    upcoming_bookings: [{ id, coach_name, coach_photo, date, time, location, sport }],
    past_bookings: [{ id, coach_name, date, has_review }],
    pending_reviews_count: integer,
    saved_coaches: [{ id, name, photo, sport, rating }]
  }
```

---

## Implementation Priority & Dependencies

```
Week 1:
  F7: Authentication ──────┐
  F1: Coach Search ────────┤── No dependencies between these
  F2: Coach Profile ───────┘

Week 2:
  F3: Booking & Payment ──── Depends on F7 (auth) + F2 (profiles)
  F4: Review System ──────── Depends on F3 (bookings)
  F5: Coach Dashboard ────── Depends on F7 (auth) + F3 (bookings)
  F8: Parent Dashboard ───── Depends on F7 (auth) + F3 (bookings)

Week 2-3:
  F6: Verification ────────── Depends on F7 (auth); can run in parallel with F3–F5
```

---

*Each feature spec maps directly to the PRD user stories and acceptance criteria. Development should reference both documents during implementation.*
