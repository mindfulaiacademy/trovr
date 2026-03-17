# 90-Day MVP Development Roadmap: Trovr

**Product:** Trovr — Youth Sports Coach Directory
**Reference:** PRD - Trovr.md, Feature Specs - Trovr.md
**Start Date:** 2026-03-17
**Launch Target:** 2026-04-14 (Day 28 — soft launch)
**90-Day End Date:** 2026-06-15
**Last Updated:** 2026-03-17

---

## 1. MVP Scope & Definition

**Core Value Proposition:** Parents find, compare, and book background-checked, credential-verified youth sports coaches in under 10 minutes.

**Success Metrics (Day 90):**
| Metric | Target |
|---|---|
| Verified coaches on platform | 50 |
| Registered parents | 200 |
| Completed bookings | 500 |
| Average coach rating | 4.5+ |
| Parent rebook rate | 70%+ |

**User Personas:**
1. **Parents** — searching for verified youth sports coaches for their children (ages 6–18)
2. **Coaches** — independent youth sports coaches looking to grow their client base

**Key User Journey:** Parent searches by sport + location + age → views verified coach profiles → books and pays for a session → leaves a review → refers friends

### MVP Boundaries

**What's IN (MVP):**
- Coach search by sport, location, and child's age
- Verified coach profiles (bio, credentials, background check, reviews, pricing, availability)
- Online booking with calendar-based time slot selection
- Stripe payments (parent pays; coach receives minus 7%)
- Post-session review system (tied to completed bookings)
- Background check integration (manual or Checkr API)
- Credential verification (manual admin process)
- Coach dashboard (bookings, earnings, reviews)
- Parent dashboard (bookings, reviews, saved coaches)
- Email notifications (confirmations, reminders, review prompts)
- Responsive design (mobile-first)
- Austin, TX metro launch — soccer + basketball only

**What's OUT (post-MVP):**
- Video portfolios and session clips (V1.1)
- In-app messaging between parents and coaches (V1.1)
- Referral program with credits (V1.2)
- Advanced analytics for coaches (V1.1)
- Multi-sport expansion beyond soccer/basketball (V2)
- Multi-metro expansion (V2)
- Native mobile app (V2)
- AI review authentication (V2)
- Coach Branding Suite ($10K/yr tier) (V3)

**Technical Constraints:**
- Solo founder with AI tools
- Budget: $0–$10K
- No dedicated designer (use component library + AI-generated design)
- Managed services only (no self-hosted infrastructure)

---

## 2. Feature Prioritization Matrix

### Must-Have Features (Core MVP)

| # | Feature | User Value | Technical Effort | Dependencies | Acceptance Criteria |
|---|---|---|---|---|---|
| F1 | Coach Search | Parents find relevant coaches instantly | Medium | Geolocation setup | Results in < 2 seconds; filters by sport, location, age |
| F2 | Coach Profiles | Parents evaluate coaches before booking | Medium | F1 (search returns profiles) | Shows credentials, background check, reviews, pricing, availability |
| F3 | Online Booking | Eliminates phone/text coordination | High | F2, F7 | Calendar UI, slot selection, confirmation emails |
| F4 | Secure Payments | Removes payment friction | High | F3, Stripe setup | Stripe Checkout; 7% fee; coach payouts |
| F5 | Review System | Builds trust through verified feedback | Low | F3 (requires completed booking) | Post-session prompt; 1–5 stars + comment; tied to booking |
| F6 | Background Checks | Guarantees child safety | Medium | F7 (auth) | Must pass before profile goes live; annual renewal |
| F7 | Authentication | Secure access for both user types | Medium | None | Email/password; role-based (parent/coach); email verification |
| F8 | Coach Dashboard | Coaches manage their business | Medium | F3, F7 | Bookings, earnings, reviews, profile editor |
| F9 | Parent Dashboard | Parents manage bookings | Low | F3, F7 | Upcoming/past sessions, review prompts, saved coaches |
| F10 | Email Notifications | Keeps both sides informed | Low | F3 | Booking confirmations, reminders, review prompts |

### Should-Have Features (V1.1 — Days 45–75)

| Feature | Description | Effort |
|---|---|---|
| Video Portfolios | Coach uploads video intro + clips (Showcase tier) | Medium |
| Advanced Filters | Distance, price, availability, rating filters | Low |
| Coach Messaging | Pre-booking in-app chat | Medium |
| Coach Analytics | Profile views, booking trends, earnings charts | Low |
| SEO Pages | City + sport landing pages for organic traffic | Low |

### Could-Have Features (V2 — Days 75–90+)

| Feature | Description | Effort |
|---|---|---|
| Referral Program | Parent referral links with $10 credits | Medium |
| Waitlist Feature | Join waitlist for fully-booked coaches | Low |
| Multi-Sport | Add 3–5 more sports | Low (data, not code) |

---

## 3. Technical Architecture

### Technology Stack

| Layer | Technology | Rationale | Monthly Cost (Est.) |
|---|---|---|---|
| Frontend + Backend | Next.js 14+ (App Router) | Full-stack React; SSR for SEO; API routes | $0 (Vercel free tier) |
| Database | Supabase (PostgreSQL + PostGIS) | Managed Postgres; geolocation; auth built-in; generous free tier | $0–$25 |
| Authentication | Supabase Auth | Email/password + role management; built into DB layer | Included |
| Payments | Stripe Connect (Express) | Marketplace payments; coach onboarding; automated payouts | 2.9% + $0.30 per transaction |
| File Storage | Supabase Storage or Cloudflare R2 | Profile photos; videos (later) | $0–$5 |
| Email | Resend | Transactional emails; generous free tier (3K/mo) | $0 |
| SMS (optional) | Twilio | Booking confirmations via text | ~$0.01/message |
| Background Checks | Checkr | API-based or dashboard; FCRA compliant | ~$30–$50/check |
| Hosting/CDN | Vercel | Auto-deploy from Git; global CDN; analytics | $0–$20 |
| Monitoring | Sentry (free tier) | Error tracking | $0 |
| Analytics | PostHog (free tier) | Product analytics; event tracking | $0 |

**Estimated monthly cost at MVP scale: $25–$100** (excluding background check costs passed to coaches or absorbed)

### Architecture Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Monolith vs Microservices | Monolith (Next.js) | Solo founder; speed of development; simple deployment |
| Database | PostgreSQL with PostGIS | Relational model fits the data; PostGIS handles geolocation search |
| Auth approach | Supabase Auth | Integrated with DB; handles email verification, password reset |
| Payment model | Stripe Connect Express | Handles marketplace splitting; minimal PCI scope |
| Search | PostgreSQL full-text + PostGIS | Sufficient for < 500 coaches; upgrade to Algolia later |
| Styling | Tailwind CSS + shadcn/ui | Rapid UI development; consistent design system; accessible components |

### Technical Risks

| Risk | Mitigation |
|---|---|
| Stripe Connect onboarding complexity | Use Express accounts with hosted onboarding flow; test with sandbox first |
| PostGIS geolocation accuracy | Pre-geocode zip codes during coach onboarding; cache results |
| Supabase free tier limits (500MB DB, 1GB storage) | Sufficient for MVP; upgrade to Pro ($25/mo) before hitting limits |
| Solo founder velocity | Use AI tools aggressively; use component libraries; cut scope ruthlessly |

---

## 4. User Stories & Estimation

### Epic 1: User Authentication (8 hours)
| Story | Estimate |
|---|---|
| 1.1 Email/password registration (parent + coach roles) | 2h |
| 1.2 Email verification flow | 2h |
| 1.3 Login with JWT sessions | 1h |
| 1.4 Forgot/reset password | 1.5h |
| 1.5 Role-based route protection | 1.5h |

### Epic 2: Coach Search & Discovery (12 hours)
| Story | Estimate |
|---|---|
| 2.1 Search form (sport, zip, age) | 2h |
| 2.2 Geolocation query with PostGIS | 3h |
| 2.3 Search results page with coach cards | 3h |
| 2.4 Basic sorting (relevance, rating, distance) | 2h |
| 2.5 Pagination | 1h |
| 2.6 Empty/loading states | 1h |

### Epic 3: Coach Profiles (10 hours)
| Story | Estimate |
|---|---|
| 3.1 Profile page layout and design | 3h |
| 3.2 Verification badge display | 1h |
| 3.3 Review section with aggregate rating | 2h |
| 3.4 Availability calendar display | 2h |
| 3.5 Location map (zip-level) | 1h |
| 3.6 Mobile responsive + sticky Book CTA | 1h |

### Epic 4: Booking System (16 hours)
| Story | Estimate |
|---|---|
| 4.1 Availability slot calculator (availability - existing bookings) | 3h |
| 4.2 Booking calendar UI (14-day view) | 3h |
| 4.3 Booking creation and confirmation | 2h |
| 4.4 Stripe Checkout integration | 4h |
| 4.5 Cancellation/refund flow | 2h |
| 4.6 Email notifications (confirmation, reminder) | 2h |

### Epic 5: Review System (6 hours)
| Story | Estimate |
|---|---|
| 5.1 Review submission form (post-session) | 2h |
| 5.2 Review display on coach profile | 2h |
| 5.3 Coach response to reviews | 1h |
| 5.4 Review prompt email (24h after session) | 1h |

### Epic 6: Coach Dashboard & Profile Management (12 hours)
| Story | Estimate |
|---|---|
| 6.1 Coach onboarding wizard | 3h |
| 6.2 Profile editor (bio, photo, sports, pricing) | 2h |
| 6.3 Availability manager | 2h |
| 6.4 Dashboard overview (bookings, earnings, reviews) | 3h |
| 6.5 Booking management (confirm/decline) | 2h |

### Epic 7: Parent Dashboard (4 hours)
| Story | Estimate |
|---|---|
| 7.1 Upcoming and past bookings view | 2h |
| 7.2 Pending reviews prompt | 1h |
| 7.3 Saved coaches list | 1h |

### Epic 8: Verification System (6 hours)
| Story | Estimate |
|---|---|
| 8.1 Background check consent + data collection | 2h |
| 8.2 Checkr API integration (or manual workflow) | 2h |
| 8.3 Credential submission form | 1h |
| 8.4 Admin panel for manual verification | 1h |

### Epic 9: Admin & Infrastructure (6 hours)
| Story | Estimate |
|---|---|
| 9.1 Admin panel (coach verification queue) | 2h |
| 9.2 Analytics event tracking setup | 2h |
| 9.3 SEO basics (meta tags, sitemap, structured data) | 1h |
| 9.4 Error monitoring setup (Sentry) | 1h |

**Total estimated development: ~80 hours (10 working days)**

---

## 5. 90-Day Sprint Plan

### DAYS 1–14: BUILD SPRINT (March 17 – March 30)

**Week 1 (March 17–23): Foundation + Core**
| Day | Tasks | Output |
|---|---|---|
| 1 | Project setup: Next.js + Supabase + Tailwind + shadcn/ui; DB schema + migrations; deploy to Vercel | Skeleton app deployed |
| 2 | Authentication: registration, login, email verification, role-based routing | Users can sign up and log in |
| 3 | Coach profiles: DB model, API endpoints, profile page UI | Coach profile page renders |
| 4 | Search: PostGIS setup, search API, search results page, coach cards | Parents can search for coaches |
| 5 | Search polish: sorting, empty states, loading skeletons, mobile responsive | Search is production-quality |
| 6–7 | Buffer / catch-up / testing | Week 1 features solid |

**Week 2 (March 24–30): Booking + Payments + Reviews**
| Day | Tasks | Output |
|---|---|---|
| 8 | Stripe Connect setup, coach Stripe onboarding flow | Coaches can connect payment accounts |
| 9 | Booking system: availability slots API, calendar UI, booking creation | Parents can select time slots |
| 10 | Payment flow: Stripe Checkout integration, webhook handlers | Parents can pay; coaches receive payouts |
| 11 | Review system: submission form, display on profiles, coach responses | Reviews work end-to-end |
| 12 | Coach dashboard: bookings view, earnings, reviews, profile editor | Coaches have a functional dashboard |
| 13 | Parent dashboard: bookings, review prompts, saved coaches | Parents have a functional dashboard |
| 14 | Email notifications, cancellation flow, admin panel, bug fixes | Core platform complete |

### DAYS 15–30: VERIFICATION + ONBOARDING SPRINT (March 31 – April 14)

**Week 3 (March 31 – April 6): Verification + Polish**
| Day | Tasks | Output |
|---|---|---|
| 15 | Background check integration (Checkr API or manual workflow) | Coaches can submit to background check |
| 16 | Credential verification workflow + admin panel | Admin can verify credentials |
| 17 | Coach onboarding wizard (step-by-step profile setup) | Smooth coach signup experience |
| 18 | Mobile responsiveness pass (all screens) | Works great on phones |
| 19 | SEO: meta tags, Open Graph, structured data, sitemap | Search engines can index |
| 20 | Performance: image optimization, lazy loading, caching | Pages load fast |
| 21 | Bug fixes, edge cases, error handling | Stable platform |

**Week 4 (April 7–14): Manual Coach Onboarding + Soft Launch**
| Day | Tasks | Output |
|---|---|---|
| 22–25 | Reach out to 15 coaches in Austin (soccer + basketball); help them create profiles; initiate background checks | 15 coach profiles in pipeline |
| 26–27 | Build sample profiles with existing testimonials; assist coaches with availability setup | 10+ profiles live with reviews |
| 28 | **SOFT LAUNCH**: Invite first 25 parents from local league communities | Real users on the platform |

**Milestone: Day 28 (April 14) — Soft launch with 10+ verified coaches and 25 invited parents**

### DAYS 31–60: TRACTION SPRINT (April 15 – May 15)

**Weeks 5–6 (April 15–28): First Bookings + Feedback**
| Focus | Activities |
|---|---|
| Manual facilitation | Help first 50 bookings happen; follow up with coaches and parents after each session |
| Feedback collection | Post-session calls/texts with parents; collect improvement suggestions |
| Bug fixes | Address issues discovered by real users |
| Coach onboarding (cont.) | Onboard 10–15 additional coaches; run background checks |
| Content | Collect 5+ parent testimonials for marketing |

**Target by Day 45: 25 coaches, 75 parents, 100 bookings**

**Weeks 7–8 (April 29 – May 15): V1.1 Features + Growth**
| Focus | Activities |
|---|---|
| Advanced filters | Add distance, price, availability, rating filters |
| Coach analytics | Profile views, booking trends, earnings charts |
| Video portfolios (Showcase tier) | Video upload + playback on profiles |
| Email sequences | Automated review prompts, booking reminders, re-engagement |
| Growth marketing | Facebook group engagement (Youth Soccer Coach, Austin parent groups) |
| SEO content | Publish "Best Youth Soccer Coaches in Austin" city page |
| Local partnerships | Contact 3–5 youth leagues about partnership |

**Target by Day 60: 35 coaches, 125 parents, 250 bookings**

### DAYS 61–90: SCALE SPRINT (May 16 – June 15)

**Weeks 9–10 (May 16–29): Optimize + Expand**
| Focus | Activities |
|---|---|
| Conversion optimization | A/B test search result cards, profile CTAs, booking flow |
| Referral system | Parent referral links with $10 credits |
| Coach messaging | In-app pre-booking chat between parents and coaches |
| Re-engagement | Automated emails to parents who searched but didn't book |
| Coach success | Identify top coaches; feature them on homepage; collect case studies |
| Content marketing | Blog posts, social media, parent newsletter |

**Weeks 11–12 (May 30 – June 15): Hit Targets + Plan V2**
| Focus | Activities |
|---|---|
| Push to targets | Intensify outreach to hit 50 coaches, 200 parents, 500 bookings |
| User interviews | 10+ parent interviews; 5+ coach interviews |
| Metrics review | Analyze all KPIs; identify biggest levers |
| V2 planning | Decide second metro, additional sports, mobile app timeline |
| Financial review | Review unit economics; CAC, LTV, revenue run rate |
| Fundraising prep (if needed) | Pitch deck with real traction data |

**Target by Day 90: 50 coaches, 200 parents, 500 bookings, $4K–$5.5K total revenue**

---

## 6. Testing Strategy

### Unit Testing
- Backend API endpoints (search, booking, payment, reviews)
- Database queries (geolocation, availability calculation)
- Authentication flows (register, login, password reset)
- Payment calculations (platform fee, refund amounts)

### Integration Testing
- Full booking flow: search → profile → book → pay → confirm → review
- Stripe webhook handling (payment success, refund)
- Email delivery (booking confirmation, review prompt)
- Background check status updates

### User Testing
| When | Who | Method |
|---|---|---|
| Day 14 | Founder + 2 friends | Walk through full parent and coach flows |
| Day 28 | First 10 parents | Observe search-to-booking flow; collect feedback |
| Day 45 | 25 parents | Post-session surveys; phone interviews |
| Day 60 | 50+ parents | In-app feedback widget; NPS survey |
| Day 90 | Full user base | Comprehensive analytics review; user interviews |

### Performance Testing
- Search query response time under load (target: < 2 seconds at 100 concurrent users)
- Booking flow completion time (target: < 3 minutes end-to-end)
- Profile page load time (target: < 1.5 seconds)
- Stripe payment processing (target: < 5 seconds)

---

## 7. Risk Mitigation

### Timeline Risks

| Risk | Mitigation |
|---|---|
| Feature creep | Strict MVP scope defined above; anything not in "What's IN" waits |
| Stripe integration takes longer than expected | Start Stripe setup on Day 1; use hosted Checkout (simplest path) |
| Background check delays | Start with manual process; don't block launch on API automation |
| Solo founder burnout | Realistic 8h/day schedule; buffer days built in; use AI tools for boilerplate |

### Market Risks

| Risk | Mitigation |
|---|---|
| Coaches won't sign up | Offer first 3 months free; build profiles for them; show them the value |
| Parents don't find the platform | Seed demand manually via Facebook groups, league partnerships, local SEO |
| Chicken-and-egg problem | Launch supply (coaches) before demand (parents); ensure 10+ options before inviting parents |
| Low booking conversion | Manually facilitate first 50 bookings; iterate on UX based on feedback |
| Seasonal dip (summer) | Soccer/basketball are year-round in Austin; monitor and adjust |

### Technical Risks

| Risk | Mitigation |
|---|---|
| Supabase free tier limits | Monitor usage; upgrade to Pro ($25/mo) before hitting limits |
| Security breach | Use Supabase Auth (battle-tested); Stripe handles all payment data; HTTPS everywhere |
| Downtime | Vercel provides 99.99% uptime; Supabase has managed backups |

---

## 8. Launch Criteria

### Technical Readiness (Day 28)
- [ ] All 10 core features (F1–F10) functional and tested
- [ ] Search returns accurate results within 2 seconds
- [ ] Booking + payment flow completes end-to-end
- [ ] Reviews work (submission + display)
- [ ] Email notifications sending reliably
- [ ] Mobile responsive on iPhone/Android
- [ ] Error pages and edge cases handled
- [ ] Sentry monitoring active
- [ ] Analytics tracking deployed

### Business Readiness (Day 28)
- [ ] 10+ verified coaches with complete profiles live
- [ ] Background checks passed for all live coaches
- [ ] At least 1 credential verified per coach
- [ ] Pricing set and Stripe accounts connected for all live coaches
- [ ] 25+ parents invited with accounts created
- [ ] Landing page connected to main app
- [ ] Privacy policy and terms of service published
- [ ] Support email set up and monitored

### Success Metrics Review Schedule
| When | Review |
|---|---|
| Day 28 | Launch checklist complete? First bookings happening? |
| Day 45 | 100 bookings on track? Parent feedback positive? Coach retention healthy? |
| Day 60 | Growth trends upward? Revenue meeting projections? Conversion rates acceptable? |
| Day 75 | On track for Day 90 targets? What needs to change? |
| Day 90 | Full KPI review. V2 planning decisions. Expansion go/no-go. |

---

## 9. Post-Launch Iteration Plan

### Weeks 1–2 Post-Launch (Days 29–42)
- Monitor all metrics daily (bookings, signups, errors)
- Respond to user feedback within 24 hours
- Fix critical bugs same day
- Manually follow up with every parent after first session
- Analyze: where do parents drop off in the funnel?

### Month 2 Post-Launch (Days 43–60)
- Ship V1.1 features (video portfolios, advanced filters, coach analytics)
- Implement automated email sequences
- A/B test: search result card layout, profile CTA copy, pricing page
- Begin content marketing (blog, social, local SEO)

### Month 3 Post-Launch (Days 61–90)
- Ship referral program
- Ship in-app messaging
- Evaluate second metro expansion (Dallas, Houston, San Antonio?)
- Evaluate additional sports (baseball, tennis, swimming?)
- Compile traction data for potential fundraise or reinvestment decision

### Feedback Collection Methods
| Method | Timing | Audience |
|---|---|---|
| Post-session email survey (1–3 questions) | After every session | All parents |
| In-app feedback button | Always available | All users |
| Phone/video interviews (15 min) | Day 28, 45, 60, 90 | 5–10 parents per round |
| Coach check-in calls | Biweekly | All coaches |
| NPS survey | Day 60, Day 90 | All parents with 2+ sessions |
| Analytics dashboard review | Weekly | Founder |

---

## Key Dates Summary

| Date | Day | Milestone |
|---|---|---|
| March 17 | 1 | Development starts |
| March 23 | 7 | Foundation complete (auth, search, profiles) |
| March 30 | 14 | Core platform complete (booking, payments, reviews, dashboards) |
| April 6 | 21 | Verification + polish complete |
| April 14 | 28 | **Soft launch**: 10+ coaches, 25 parents |
| April 28 | 42 | First 100 bookings target |
| May 15 | 60 | V1.1 shipped; 250 bookings; 35 coaches |
| June 1 | 77 | Referral program live; 400 bookings |
| June 15 | 90 | **90-day review**: 50 coaches, 200 parents, 500 bookings |

---

*This roadmap is a living document. Review and adjust weekly based on actual progress, user feedback, and market conditions. When in doubt, ship faster and iterate — learning from real users beats planning in a vacuum.*
