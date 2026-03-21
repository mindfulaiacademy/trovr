-- ============================================
-- Trovr Database Schema for Supabase (PostgreSQL)
-- ============================================

-- 1. PARENTS (authenticated users)
CREATE TABLE parents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  district TEXT,
  city TEXT DEFAULT 'Berlin',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. CHILDREN (linked to parents)
CREATE TABLE children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID NOT NULL REFERENCES parents(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age BETWEEN 3 AND 18),
  sport TEXT DEFAULT 'Football',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. COACHES
CREATE TABLE coaches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  photo_url TEXT,
  initials TEXT GENERATED ALWAYS AS (LEFT(first_name, 1) || LEFT(last_name, 1)) STORED,
  sport TEXT NOT NULL DEFAULT 'Football',
  city TEXT NOT NULL DEFAULT 'Berlin',
  district TEXT NOT NULL,
  zip TEXT NOT NULL,
  bio TEXT,
  years_experience INTEGER NOT NULL DEFAULT 0,
  age_range_min INTEGER NOT NULL DEFAULT 4 CHECK (age_range_min BETWEEN 3 AND 18),
  age_range_max INTEGER NOT NULL DEFAULT 18 CHECK (age_range_max BETWEEN 3 AND 18),
  session_price DECIMAL(6,2) NOT NULL,
  background_check TEXT DEFAULT 'pending' CHECK (background_check IN ('pending', 'passed', 'failed')),
  availability TEXT,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CHECK (age_range_min <= age_range_max)
);

-- 4. CREDENTIALS (per coach, multiple)
CREATE TABLE credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID NOT NULL REFERENCES coaches(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  verified BOOLEAN DEFAULT false,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. BOOKINGS
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID NOT NULL REFERENCES parents(id),
  coach_id UUID NOT NULL REFERENCES coaches(id),
  child_id UUID REFERENCES children(id),
  session_date DATE NOT NULL,
  session_time TIME NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  price DECIMAL(6,2) NOT NULL,
  platform_fee DECIMAL(6,2) GENERATED ALWAYS AS (price * 0.07) STORED,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. REVIEWS (tied to completed bookings)
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID UNIQUE REFERENCES bookings(id),
  coach_id UUID NOT NULL REFERENCES coaches(id),
  parent_id UUID NOT NULL REFERENCES parents(id),
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. PAYMENTS (Stripe integration)
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id),
  stripe_payment_id TEXT UNIQUE,
  amount DECIMAL(6,2) NOT NULL,
  platform_fee DECIMAL(6,2) NOT NULL,
  coach_payout DECIMAL(6,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'succeeded', 'failed', 'refunded')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- INDEXES for search & performance
-- ============================================
CREATE INDEX idx_coaches_sport ON coaches(sport);
CREATE INDEX idx_coaches_district ON coaches(district);
CREATE INDEX idx_coaches_active ON coaches(active) WHERE active = true;
CREATE INDEX idx_coaches_age_range ON coaches(age_range_min, age_range_max);
CREATE INDEX idx_bookings_coach ON bookings(coach_id);
CREATE INDEX idx_bookings_parent ON bookings(parent_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_reviews_coach ON reviews(coach_id);
CREATE INDEX idx_credentials_coach ON credentials(coach_id);

-- ============================================
-- VIEWS for computed stats (replaces JSON fields)
-- ============================================
CREATE VIEW coach_stats AS
SELECT
  c.id AS coach_id,
  COALESCE(AVG(r.rating), 0) AS rating,
  COUNT(DISTINCT r.id) AS review_count,
  COUNT(DISTINCT b.id) FILTER (WHERE b.status = 'completed') AS total_sessions,
  COUNT(DISTINCT b.child_id) FILTER (WHERE b.status IN ('confirmed', 'completed')) AS active_athletes
FROM coaches c
LEFT JOIN reviews r ON r.coach_id = c.id
LEFT JOIN bookings b ON b.coach_id = c.id
GROUP BY c.id;

-- ============================================
-- ROW LEVEL SECURITY (Supabase Auth)
-- ============================================

-- Coaches: anyone can read active coaches, only the coach can edit their own
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active coaches" ON coaches FOR SELECT USING (active = true);
CREATE POLICY "Coach can update own profile" ON coaches FOR UPDATE USING (auth_id = auth.uid());

-- Parents: only the parent can see/edit their own data
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Parent can view own profile" ON parents FOR SELECT USING (auth_id = auth.uid());
CREATE POLICY "Parent can update own profile" ON parents FOR UPDATE USING (auth_id = auth.uid());
CREATE POLICY "Anyone can create parent profile" ON parents FOR INSERT WITH CHECK (auth_id = auth.uid());

-- Children: only the parent can manage
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Parent can manage own children" ON children FOR ALL USING (
  parent_id IN (SELECT id FROM parents WHERE auth_id = auth.uid())
);

-- Bookings: parent and coach can see their own bookings
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Parent can view own bookings" ON bookings FOR SELECT USING (
  parent_id IN (SELECT id FROM parents WHERE auth_id = auth.uid())
);
CREATE POLICY "Coach can view own bookings" ON bookings FOR SELECT USING (
  coach_id IN (SELECT id FROM coaches WHERE auth_id = auth.uid())
);
CREATE POLICY "Parent can create booking" ON bookings FOR INSERT WITH CHECK (
  parent_id IN (SELECT id FROM parents WHERE auth_id = auth.uid())
);

-- Reviews: anyone can read, only parent of completed booking can write
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Parent can create review" ON reviews FOR INSERT WITH CHECK (
  parent_id IN (SELECT id FROM parents WHERE auth_id = auth.uid())
  AND booking_id IN (SELECT id FROM bookings WHERE status = 'completed')
);

-- Credentials: anyone can read, managed by admin
ALTER TABLE credentials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view credentials" ON credentials FOR SELECT USING (true);

-- Payments: only involved parties can see
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Booking parties can view payment" ON payments FOR SELECT USING (
  booking_id IN (
    SELECT id FROM bookings WHERE
      parent_id IN (SELECT id FROM parents WHERE auth_id = auth.uid())
      OR coach_id IN (SELECT id FROM coaches WHERE auth_id = auth.uid())
  )
);
