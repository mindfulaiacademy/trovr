# Trovr Pricing Strategy — Berlin Launch (Football)

*Last updated: 2026-03-22*

---

## 1. PRICING OBJECTIVES & GOALS

### Primary Business Goals
- **Revenue Target**: €5,000 MRR within 90 days of launch (200 paying coaches × €25 avg)
- **Market Position**: Value positioning — significantly cheaper than the cost of invisibility for coaches, and free for parents
- **Growth Strategy**: Supply-first acquisition — onboard coaches, parents follow. Prioritize coach density per Bezirk over total revenue in months 1–2
- **Customer Lifetime Value**: Target €300 LTV per coach (12-month average retention at €25/month)

### Success Metrics
- **Conversion Rate**: 40% trial-to-paid within 30 days (coaches who complete profile → paying subscriber)
- **Average Revenue Per User (ARPU)**: €22/month blended across tiers (targeting 60% on €25 tier)
- **Churn Rate**: <10% monthly (coaches see ROI from first session booked)
- **Booking Volume**: 500 bookings through platform within 90 days
- **Platform Fee Revenue**: €2,100/month at scale (500 bookings × €60 avg × 7%)

---

## 2. MARKET RESEARCH & COMPETITIVE ANALYSIS

### Direct Competitors in Berlin

**Competitor 1: DFB Trainerbörse (trainer.dfb.de)**
- **Positioning**: Official DFB coach exchange — institutional, credentialed
- **Pricing Model**: Free for DFB-licensed coaches
- **Strengths**: Brand trust (DFB stamp), large database, credential verification built-in
- **Weaknesses**: No booking system, no reviews, no video portfolios, no parent-facing discovery UX, feels like a job board not a marketplace
- **Trovr Advantage**: Parent-facing design, verified reviews, booking flow, video showcases

**Competitor 2: Trainer.de**
- **Positioning**: General trainer/coach directory across all disciplines (not sports-specific)
- **Pricing Model**: Freemium listing with premium upgrades
- **Price Points**: Free basic listing, premium profiles from ~€10–20/month
- **Strengths**: Established platform, broad reach across fitness/coaching categories
- **Weaknesses**: No sport-specific verification, no DFB credential integration, diluted by personal trainers, yoga instructors, etc.
- **Trovr Advantage**: Football-specific, DFB credential verification, parent trust signals

**Competitor 3: Superprof (Germany)**
- **Positioning**: Tutoring/coaching marketplace (primarily academic, some sports)
- **Pricing Model**: Students pay €20–50/month subscription to contact tutors; coaches pay 10% commission or €9/month Premium
- **Price Points**: Coach rates €20–80/hour on platform
- **Strengths**: Brand awareness across Europe, established payment infrastructure
- **Weaknesses**: Sports coaching is an afterthought, no credential verification, no background checks, not trusted for children's safety
- **Trovr Advantage**: Built specifically for youth sports, Führungszeugnis checks, DFB verification

**Competitor 4: Word of Mouth / WhatsApp Groups**
- **Positioning**: The incumbent — how most Berlin parents find coaches today
- **Pricing Model**: Free (but high friction, no verification, limited reach)
- **Strengths**: Trusted because personal, zero cost
- **Weaknesses**: Geographically limited (your Bezirk only), no credential verification, no reviews aggregation, no booking system, no accountability
- **Trovr Advantage**: Extends word-of-mouth reach across all Berlin while adding trust infrastructure

### Market Positioning

Trovr occupies the **value-with-trust premium** position:
- **Below** private coaching agencies (€200–300/session with agency markup)
- **At parity** with direct coach rates (€50–75/session) — Trovr adds discovery, not cost
- **Above** unverified platforms — parents pay nothing extra, coaches pay €15–25/month for the trust infrastructure that makes them findable

---

## 3. PRICING TIER STRUCTURE

### For Parents: FREE (Always)

Parents never pay a subscription. This is non-negotiable for growth:
- Search by sport, location (Bezirk), age group, credential level
- View verified coach profiles with DFB credentials
- Read parent reviews tied to completed sessions
- Contact coaches directly
- Book sessions (when booking system launches)

**Rationale**: The two-sided marketplace only works if parent supply is unlimited. Every parent who finds a coach tells 3 others. The referral loop is the growth engine.

---

### For Coaches: Three Tiers

#### TIER 1: BASIC LISTING — FREE
- **Target Coach**: Part-time coaches, Verein assistants testing the platform, coaches who want to see if Trovr works before paying
- **What's Included**:
  - Basic text profile (name, sport, Bezirk, bio)
  - One profile photo
  - Contact email displayed
  - Appear in search results (standard ranking)
- **What's Limited**:
  - No DFB credential verification badge
  - No parent reviews displayed
  - No booking integration
  - No analytics
  - Lowest search priority
- **Purpose**: Seed the directory with coach supply. Convert to paid once they see profile views and parent interest. Acts as the entry point of the funnel.

#### TIER 2: VERIFIED PROFILE — €15/month (or €144/year — save 20%)
- **Target Coach**: Semi-professional coaches with 5–15 clients, wanting credibility
- **Price Point**: €15/month — a coach running 3 sessions/week at €60 covers this in the first 15 minutes of the first session
- **What's Included**:
  - Everything in Basic, plus:
  - ✅ Führungszeugnis background check badge
  - ✅ DFB credential verification (C/B/A-Lizenz, Torwarttrainer, Kindertrainer)
  - ✅ Parent reviews and star ratings displayed
  - ✅ Online booking (when available)
  - ✅ Basic session analytics (views, inquiries, bookings)
  - ✅ Priority search placement over free listings
- **Value Proposition**: "The trust badge that turns profile views into paying clients"
- **Psychological Hook**: Parents filter for verified coaches — unverified coaches are invisible to serious parents

#### TIER 3: COMPLETE SHOWCASE — €25/month (or €240/year — save 20%) ⭐ MOST POPULAR
- **Target Coach**: Full-time coaches, former professionals, coaches building a personal brand
- **Price Point**: €25/month — less than half a session's revenue
- **What's Included**:
  - Everything in Verified, plus:
  - 🎥 Video portfolio (up to 10 session clips / training highlights)
  - 🎬 Custom video intro (60-second coach introduction)
  - 📊 Referral tracking dashboard (see which parents refer others)
  - 🔝 Top search placement (above Verified and Basic)
  - 📈 Advanced analytics (conversion rates, peak inquiry times, comparison to Bezirk average)
  - 🏷️ "Featured Coach" badge eligibility
- **Value Proposition**: "The full showcase that makes you the obvious choice"
- **Psychological Hook**: Video is the #1 trust signal for parents. A 60-second intro converts 3× better than text alone.

---

### Platform Booking Fee: 7% per Session

- Applied to every session booked through Trovr's booking system
- **Coach receives**: 93% of session price
- **Example**: €60 session → coach gets €55.80, Trovr takes €4.20
- **Justification**: Coach would not have found this client without Trovr. 7% is well below Thumbtack (15-20%) and Superprof (10%)
- **Implementation**: Deducted automatically via Stripe Connect at payout

---

## 4. PSYCHOLOGICAL PRICING STRATEGIES

### Price Anchoring

**The Decoy Effect (Asymmetric Dominance)**:
The three-tier structure is designed so that €25/month feels like the obvious choice:

| Feature | Free | €15/month | €25/month |
|---|:---:|:---:|:---:|
| Basic profile | ✅ | ✅ | ✅ |
| Background check badge | ❌ | ✅ | ✅ |
| DFB credential verification | ❌ | ✅ | ✅ |
| Parent reviews displayed | ❌ | ✅ | ✅ |
| Video portfolio | ❌ | ❌ | ✅ |
| Video intro | ❌ | ❌ | ✅ |
| Referral tracking | ❌ | ❌ | ✅ |
| Top search placement | ❌ | ❌ | ✅ |
| Advanced analytics | ❌ | Basic | ✅ Full |

**The jump from Free → €15 is large** (you gain trust signals).
**The jump from €15 → €25 is small** (only €10 more) **but the value jump is enormous** (video, top placement, referrals).

This makes €25 the "no-brainer" choice for any coach who is serious.

### Reference Pricing (Cost of the Alternative)

Frame pricing against what coaches currently spend on visibility:
- Google Ads for "Fußballtrainer Berlin": €2–5 per click × 100 clicks/month = **€200–500/month**
- Flyer printing and distribution: **€50–100/month**
- Social media advertising: **€100–300/month**
- Trovr Complete Showcase: **€25/month** — with built-in trust signals none of those channels provide

### Loss Aversion Messaging

- "Coaches without verification badges get 73% fewer inquiries" (once data supports this)
- "Parents filter for verified coaches first — are you visible?"
- "Every day without a Trovr profile is another family booking someone else"

### Charm Pricing Decision

**Use round numbers (€15, €25), not €14.99 or €24.99.**

Rationale: Trovr is a professional tool for coaches, not a consumer impulse purchase. Round numbers signal confidence and professionalism. Charm pricing (€14.99) signals discount retail — wrong positioning for a platform asking coaches to trust it with their professional reputation.

### Annual Discount Psychology

- Monthly: €15 / €25
- Annual: €144 / €240 (save 20%)
- **Frame as**: "Get 2.4 months free" rather than "save 20%" — months free is more tangible
- Annual billing reduces churn and improves cash flow predictability

---

## 5. REVENUE MODEL & PROJECTIONS

### Revenue Streams

| Stream | Unit Economics | Month 3 Target | Month 12 Target |
|---|---|---|---|
| Verified Profile (€15/mo) | €15 × coaches | €600 (40 coaches) | €1,500 (100 coaches) |
| Complete Showcase (€25/mo) | €25 × coaches | €1,500 (60 coaches) | €5,000 (200 coaches) |
| Booking Fee (7%) | €4.20 avg per booking | €840 (200 bookings) | €4,200 (1,000 bookings) |
| **Total MRR** | | **€2,940** | **€10,700** |

### Assumptions
- 100 coaches onboarded by Month 3 (40% Verified, 60% Showcase)
- 300 coaches onboarded by Month 12
- Average session price: €60
- Average bookings per coach: 3–5/month through platform
- Coach churn: 8%/month (coaches who don't get bookings leave)

### Break-Even Analysis
- **Fixed costs**: ~€200/month (Supabase, hosting, domain, background check API)
- **Variable costs**: €15–25 per Führungszeugnis check (passed to coach or absorbed as acquisition cost)
- **Break-even**: ~15 paying coaches at €25/month or 10 coaches + 50 bookings/month

---

## 6. PRICING EXPERIMENTS & OPTIMIZATION

### A/B Tests to Run (Months 2–3)

**Test 1: Price Point Sensitivity**
- Control: €15 / €25
- Variant A: €12 / €19 (lower barrier, test volume vs. revenue)
- Variant B: €19 / €29 (test willingness to pay at higher points)
- Metric: Trial-to-paid conversion rate, total revenue
- Duration: 4 weeks, minimum 50 coaches per variant

**Test 2: Annual vs. Monthly Default**
- Control: Monthly pricing shown first, annual as option
- Variant: Annual pricing shown first ("€12/month billed annually"), monthly as option
- Metric: Annual plan adoption rate, 6-month retention

**Test 3: Free Trial Length**
- Control: No free trial (free tier acts as trial)
- Variant A: 14-day free trial of Complete Showcase for all new coaches
- Variant B: 30-day free trial
- Metric: Conversion to paid, time-to-first-booking

**Test 4: Booking Fee Visibility**
- Control: 7% fee clearly displayed at booking
- Variant: "Platform fee included" (bake into displayed price)
- Metric: Booking completion rate, coach satisfaction

### Pricing Metrics Dashboard

Track weekly:
- **Conversion funnel**: Profile created → Tier selected → Payment completed → First booking received
- **Revenue metrics**: MRR, ARPU, LTV, expansion revenue (upgrades)
- **Cohort analysis**: Do Month 1 coaches retain better than Month 3 coaches?
- **Price sensitivity**: Do coaches in Prenzlauer Berg (higher income) choose €25 more than coaches in Neukölln?
- **Feature usage**: Do €25 coaches actually upload videos? If not, the tier needs restructuring.

---

## 7. BERLIN-SPECIFIC PRICING CONSIDERATIONS

### Local Market Context

Germany's youth football ecosystem is fundamentally different from the US:
- **Club membership is cheap**: ~€150/year for Verein membership with 2–3 training sessions/week
- **Private coaching is supplementary**, not primary — parents pay for 1-on-1 skill development on top of Verein training
- **DFB Talent Development Programme**: Free supplemental training at regional centers for ages 11–14
- **Result**: Private coaching is a premium add-on, not a necessity. Price sensitivity is moderate — parents who seek private coaching are already willing to spend

### Session Price Benchmarking

| Coach Type | Typical Rate | Trovr Target |
|---|---|---|
| University student / Part-time | €30–45/session | €35–50 |
| Semi-professional / DFB C-Lizenz | €50–70/session | €50–65 |
| Former professional / DFB A-Lizenz | €75–120/session | €70–90 |
| Agency-booked (LHCoaching etc.) | €200–300/session | N/A (different market) |

Trovr coaches in the **€50–75 sweet spot** — affordable enough for regular sessions, premium enough to signal quality.

### Payment Preferences (Germany)

- **SEPA direct debit** is strongly preferred over credit cards in Germany
- **Stripe supports SEPA** — implement as primary payment method
- **PayPal** is a secondary preference — add as option
- **Invoice / Rechnung**: Some coaches may request invoices for tax purposes — generate automatically
- **VAT (Mehrwertsteuer)**: 19% standard rate applies. Display prices as "€15/Monat zzgl. MwSt." or include VAT and note it. Decision: **Include VAT in displayed price** (€15 and €25 are VAT-inclusive) for simplicity. Simpler for coaches, avoids sticker shock.

### Competitor Pricing Gap

| Platform | Coach Cost | Parent Cost | Booking Fee | Sport-Specific |
|---|---|---|---|---|
| DFB Trainerbörse | Free | Free | None | ✅ Football only |
| Trainer.de | €0–20/month | Free | Varies | ❌ All disciplines |
| Superprof | €0–9/month | €20–50/month | 10% | ❌ All subjects |
| **Trovr** | **€0–25/month** | **Free** | **7%** | **✅ Football only** |

Trovr's gap: **Lower booking fee than Superprof, free for parents (unlike Superprof), sport-specific verification (unlike Trainer.de), with booking + reviews (unlike DFB Trainerbörse).**

---

## 8. IMPLEMENTATION ROADMAP

### Phase 1: Soft Launch (Weeks 1–4)

**Pricing Setup**:
- Launch with Verified (€15) and Complete Showcase (€25) tiers only
- Free tier available but not promoted — coaches are encouraged to start on €15
- Manual onboarding: Andreas personally helps first 10–15 coaches set up profiles
- **No booking fee yet** — bookings happen off-platform via WhatsApp/phone until booking system is built
- Accept payment via Stripe (SEPA + card) with monthly billing

**Promotional Pricing**:
- **Founder's Rate**: First 25 coaches get Complete Showcase at €15/month for life ("Gründerpreis")
- Creates urgency, rewards early adopters, locks in retention
- These coaches become ambassadors and case studies

**Analytics**:
- Track profile views, inquiry clicks, and contact-to-booking conversion
- Survey every new coach: "How did you hear about Trovr?" and "What would you pay for this?"

### Phase 2: Optimization (Months 2–3)

**Payment Infrastructure**:
- Implement Stripe Connect for booking fee collection
- Launch 7% booking fee alongside in-app booking
- Add annual billing option
- Begin A/B testing price points

**Data-Driven Adjustments**:
- If <30% choose €25 tier → improve video upload UX or add more value to justify gap
- If >70% choose €25 tier → consider raising to €29 (the gap is too small, leaving money on the table)
- If churn >15% → interview churned coaches, likely not getting enough bookings (supply/demand problem, not pricing problem)

### Phase 3: Scale (Months 4–6)

**Expansion Pricing**:
- Introduce **Coach Branding Suite** (€99/month or €999/year) for top coaches:
  - Custom branded booking page
  - Trovr-produced professional video intro
  - Featured placement in marketing emails to parents
  - Multi-location listing (coach in multiple Bezirke)
- Consider geographic expansion pricing (München, Hamburg) — same structure, new metro
- Evaluate adding second sport (basketball) — same pricing, separate directory

**Referral Program**:
- Coach refers another coach → referring coach gets 1 month free
- Parent refers another parent → both get a "verified parent" badge (social proof, no monetary cost to Trovr)

---

## 9. RISK MITIGATION

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Coaches won't pay when DFB Trainerbörse is free | Medium | High | Emphasize what DFB doesn't offer: reviews, video, booking, parent discovery UX |
| Parents book off-platform to avoid booking fee | High | Medium | 7% is low enough that convenience wins. Add value: booking confirmation, session reminders, review prompts |
| Insufficient coach density in Bezirke | High | High | Focus on 3–4 Bezirke first (Charlottenburg, Prenzlauer Berg, Kreuzberg, Friedrichshain) before expanding |
| Price too high for part-time coaches | Low | Medium | Free tier exists. €15/month is <1 session's revenue |
| German payment complexity (VAT, SEPA) | Medium | Medium | Use Stripe's built-in SEPA + tax handling. Consult Steuerberater for Kleinunternehmerregelung if applicable |

---

## 10. KEY PRICING PRINCIPLES

1. **Parents never pay.** The moment you charge parents, the referral loop dies.
2. **Coaches pay for visibility, not access.** Free coaches exist but are invisible to serious parents.
3. **The ROI must be obvious.** €25/month < half of one session. If a coach can't see the math, the product has a demand problem, not a pricing problem.
4. **Price for the Berlin market, not the US.** German parents expect Verein-level affordability. Private coaching is supplementary. Price coaches accordingly.
5. **Booking fees stay low.** 7% is a feature, not a cost. "We take less than anyone else" is a competitive advantage.
6. **Annual billing is the goal.** Monthly lets coaches try. Annual locks in retention and cash flow. Optimize toward annual conversion.
7. **Promotional pricing builds the supply side.** Founder's Rate for early coaches is an investment in marketplace liquidity, not a discount.

---

*This strategy should be revisited monthly during the first 90 days and quarterly thereafter. All pricing decisions should be validated against actual coach acquisition, retention, and booking data.*
