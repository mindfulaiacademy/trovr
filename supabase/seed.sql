-- ============================================
-- Trovr Seed Data: 10 Coaches from coaches.json
-- ============================================

-- COACHES
INSERT INTO coaches (id, first_name, last_name, photo_url, sport, city, district, zip, bio, years_experience, age_range_min, age_range_max, session_price, background_check, availability, contact_email, contact_phone, active)
VALUES
  ('11111111-0001-0001-0001-000000000001', 'Markus', 'Hoffmann', 'images/coaches/coach-001.jpg', 'Football', 'Berlin', 'Charlottenburg', '10585', 'Former Hertha BSC youth academy coach with 14 years of experience developing young players. I focus on technical fundamentals, tactical awareness, and building confidence. My approach is play-based for younger kids (Bambini to E-Jugend) and competition-focused for advanced players preparing for Leistungsklasse.', 14, 5, 14, 60.00, 'passed', 'Mon, Wed, Fri afternoons; Sat mornings', 'markus.hoffmann@email.de', '+49 170 555 0147', true),

  ('11111111-0001-0001-0001-000000000002', 'Elena', 'Petrov', 'images/coaches/coach-002.jpg', 'Football', 'Berlin', 'Prenzlauer Berg', '10405', 'Former professional player in the Frauen-Bundesliga with 3 seasons at Turbine Potsdam. I specialise in technical skill development for competitive players, especially girls and young women. Bilingual coaching available in German and Russian.', 9, 8, 18, 70.00, 'passed', 'Mon-Fri evenings; Sat-Sun mornings', 'elena.petrov@email.de', '+49 176 555 0389', true),

  ('11111111-0001-0001-0001-000000000003', 'David', 'Okafor', 'images/coaches/coach-003.jpg', 'Football', 'Berlin', 'Kreuzberg', '10961', '15 years of youth football coaching with a focus on speed, agility, and 1v1 skills. I played Regionalliga for 6 seasons and spent 5 years as a Verein youth team coach before going full-time as a private trainer. Every kid can improve dramatically with the right individual attention.', 15, 7, 17, 65.00, 'passed', 'Tues, Thurs, Sat; flexible schedule', 'david.okafor@email.de', '+49 172 555 0234', true),

  ('11111111-0001-0001-0001-000000000004', 'Jan', 'Krause', 'images/coaches/coach-004.jpg', 'Football', 'Berlin', 'Spandau', '13597', 'Youth football specialist focused on shooting technique and finishing. I use video analysis to break down each player''s technique and create personalised improvement plans. Former DFB Stützpunkt coach with 4 age groups that advanced to Landesauswahl selection.', 11, 8, 16, 55.00, 'passed', 'Mon, Wed, Fri evenings; Sat all day', 'jan.krause@email.de', '+49 151 555 0456', true),

  ('11111111-0001-0001-0001-000000000005', 'Sarah', 'Bergmann', 'images/coaches/coach-005.jpg', 'Football', 'Berlin', 'Steglitz', '12163', 'I specialise in goalkeeper training for youth players ages 7-16. Former goalkeeper at FFC Berlin and 10 years of private coaching experience. I also offer field player sessions focused on defensive positioning and game reading.', 10, 7, 16, 60.00, 'passed', 'Tues, Thurs afternoons; Sat mornings', 'sarah.bergmann@email.de', '+49 160 555 0578', true),

  ('11111111-0001-0001-0001-000000000006', 'Andre', 'Mbeki', 'images/coaches/coach-006.jpg', 'Football', 'Berlin', 'Neukölln', '12043', 'Former semi-professional player turned youth performance coach. I focus on complete player development — ball mastery, passing technique, defensive skills, and football IQ. My training programmes are structured in 8-week cycles with measurable progress tracking.', 8, 9, 18, 75.00, 'passed', 'Mon-Fri mornings; Sat afternoons', 'andre.mbeki@email.de', '+49 157 555 0612', true),

  ('11111111-0001-0001-0001-000000000007', 'Maria', 'Santos', 'images/coaches/coach-007.jpg', 'Football', 'Berlin', 'Friedrichshain', '10243', 'Youth football coach specialising in the youngest players ages 4-10. I believe early development should focus on falling in love with the game. My sessions are play-based with age-appropriate technical skill building woven into fun games and activities. Coaching available in German, Spanish, and Portuguese.', 7, 4, 10, 50.00, 'passed', 'Mon, Wed, Fri mornings; Sat mornings', 'maria.santos@email.de', '+49 175 555 0723', true),

  ('11111111-0001-0001-0001-000000000008', 'Kevin', 'Brandt', 'images/coaches/coach-008.jpg', 'Football', 'Berlin', 'Mitte', '10115', 'Specialised in athletic performance and conditioning for football players. Former Bundesliga youth academy fitness coach at Union Berlin. I combine football skill work with sport-specific athletic training to create faster, more explosive, and more durable players.', 10, 11, 18, 75.00, 'passed', 'Mon-Fri early mornings (6-8); Sat all day', 'kevin.brandt@email.de', '+49 163 555 0834', true),

  ('11111111-0001-0001-0001-000000000009', 'Ali', 'Hassan', 'images/coaches/coach-009.jpg', 'Football', 'Berlin', 'Wedding', '13347', 'Community football coach with deep roots in Wedding and Moabit. I grew up playing Straßenfußball in Berlin and turned that passion into a coaching career. I specialise in working with kids from diverse backgrounds, making football accessible and building life skills through sport. Coaching in German, Arabic, and Turkish.', 8, 5, 14, 50.00, 'passed', 'Mon-Fri afternoons; Sat-Sun mornings', 'ali.hassan@email.de', '+49 179 555 0945', true),

  ('11111111-0001-0001-0001-000000000010', 'Lena', 'Fischer', 'images/coaches/coach-010.jpg', 'Football', 'Berlin', 'Tempelhof', '12099', 'DFB-licensed coach specialising in girls'' football development. Former captain of a Regionalliga team with a passion for growing the women''s game from grassroots up. I offer individual sessions and small-group training for girls who want to take their football seriously.', 6, 6, 16, 55.00, 'passed', 'Tues, Thurs, Sat; Sun mornings', 'lena.fischer@email.de', '+49 171 555 1056', true);

-- CREDENTIALS
INSERT INTO credentials (coach_id, name, verified, verified_at) VALUES
  -- Markus Hoffmann
  ('11111111-0001-0001-0001-000000000001', 'DFB B-Lizenz', true, '2025-11-01'),
  ('11111111-0001-0001-0001-000000000001', 'DFB Torwarttrainer-Lizenz', true, '2025-11-01'),
  ('11111111-0001-0001-0001-000000000001', 'Erste Hilfe Zertifikat', true, '2025-11-01'),
  -- Elena Petrov
  ('11111111-0001-0001-0001-000000000002', 'DFB B-Lizenz', true, '2025-11-15'),
  ('11111111-0001-0001-0001-000000000002', 'DFB Vereinsmanager-Lizenz', true, '2025-11-15'),
  ('11111111-0001-0001-0001-000000000002', 'Erste Hilfe Zertifikat', true, '2025-11-15'),
  -- David Okafor
  ('11111111-0001-0001-0001-000000000003', 'DFB A-Lizenz', true, '2025-11-20'),
  ('11111111-0001-0001-0001-000000000003', 'DFB Stützpunkttrainer', true, '2025-11-20'),
  ('11111111-0001-0001-0001-000000000003', 'Erste Hilfe Zertifikat', true, '2025-11-20'),
  -- Jan Krause
  ('11111111-0001-0001-0001-000000000004', 'DFB B-Lizenz', true, '2025-12-01'),
  ('11111111-0001-0001-0001-000000000004', 'DFB Kindertrainer-Zertifikat', true, '2025-12-01'),
  ('11111111-0001-0001-0001-000000000004', 'Erste Hilfe Zertifikat', true, '2025-12-01'),
  -- Sarah Bergmann
  ('11111111-0001-0001-0001-000000000005', 'DFB Torwarttrainer-Lizenz', true, '2025-12-05'),
  ('11111111-0001-0001-0001-000000000005', 'DFB C-Lizenz', true, '2025-12-05'),
  ('11111111-0001-0001-0001-000000000005', 'Erste Hilfe Zertifikat', true, '2025-12-05'),
  -- Andre Mbeki
  ('11111111-0001-0001-0001-000000000006', 'DFB B-Lizenz', true, '2025-12-10'),
  ('11111111-0001-0001-0001-000000000006', 'DOSB Sportphysiotherapie', true, '2025-12-10'),
  ('11111111-0001-0001-0001-000000000006', 'Erste Hilfe Zertifikat', true, '2025-12-10'),
  -- Maria Santos
  ('11111111-0001-0001-0001-000000000007', 'DFB C-Lizenz', true, '2025-12-15'),
  ('11111111-0001-0001-0001-000000000007', 'DFB Kindertrainer-Zertifikat', true, '2025-12-15'),
  ('11111111-0001-0001-0001-000000000007', 'Erste Hilfe Zertifikat', true, '2025-12-15'),
  -- Kevin Brandt
  ('11111111-0001-0001-0001-000000000008', 'DFB A-Lizenz', true, '2025-12-20'),
  ('11111111-0001-0001-0001-000000000008', 'DOSB Fitness-A-Lizenz', true, '2025-12-20'),
  ('11111111-0001-0001-0001-000000000008', 'DFB Athletiktrainer-Zertifikat', true, '2025-12-20'),
  ('11111111-0001-0001-0001-000000000008', 'Erste Hilfe Zertifikat', true, '2025-12-20'),
  -- Ali Hassan
  ('11111111-0001-0001-0001-000000000009', 'DFB C-Lizenz', true, '2026-01-05'),
  ('11111111-0001-0001-0001-000000000009', 'DFB Kindertrainer-Zertifikat', true, '2026-01-05'),
  ('11111111-0001-0001-0001-000000000009', 'Erste Hilfe Zertifikat', true, '2026-01-05'),
  -- Lena Fischer
  ('11111111-0001-0001-0001-000000000010', 'DFB B-Lizenz', true, '2026-01-10'),
  ('11111111-0001-0001-0001-000000000010', 'DFB Kindertrainer-Zertifikat', true, '2026-01-10'),
  ('11111111-0001-0001-0001-000000000010', 'Erste Hilfe Zertifikat', true, '2026-01-10');

-- SEED PARENTS (placeholder accounts for existing reviews)
INSERT INTO parents (id, first_name, last_name, email) VALUES
  ('22222222-0001-0001-0001-000000000001', 'Julia', 'S.', 'julia.s@seed.trovr.de'),
  ('22222222-0001-0001-0001-000000000002', 'Thomas', 'K.', 'thomas.k@seed.trovr.de'),
  ('22222222-0001-0001-0001-000000000003', 'Katharina', 'L.', 'katharina.l@seed.trovr.de'),
  ('22222222-0001-0001-0001-000000000004', 'Michael', 'R.', 'michael.r@seed.trovr.de'),
  ('22222222-0001-0001-0001-000000000005', 'Carlos', 'G.', 'carlos.g@seed.trovr.de'),
  ('22222222-0001-0001-0001-000000000006', 'Sandra', 'W.', 'sandra.w@seed.trovr.de'),
  ('22222222-0001-0001-0001-000000000007', 'Stefan', 'B.', 'stefan.b@seed.trovr.de'),
  ('22222222-0001-0001-0001-000000000008', 'Sabine', 'K.', 'sabine.k@seed.trovr.de'),
  ('22222222-0001-0001-0001-000000000009', 'Robert', 'M.', 'robert.m@seed.trovr.de'),
  ('22222222-0001-0001-0001-000000000010', 'Lisa', 'P.', 'lisa.p@seed.trovr.de'),
  ('22222222-0001-0001-0001-000000000011', 'Anna', 'S.', 'anna.s@seed.trovr.de'),
  ('22222222-0001-0001-0001-000000000012', 'Oliver', 'T.', 'oliver.t@seed.trovr.de'),
  ('22222222-0001-0001-0001-000000000013', 'Natalie', 'H.', 'natalie.h@seed.trovr.de'),
  ('22222222-0001-0001-0001-000000000014', 'Angela', 'D.', 'angela.d@seed.trovr.de'),
  ('22222222-0001-0001-0001-000000000015', 'Florian', 'C.', 'florian.c@seed.trovr.de'),
  ('22222222-0001-0001-0001-000000000016', 'Jessica', 'M.', 'jessica.m@seed.trovr.de'),
  ('22222222-0001-0001-0001-000000000017', 'Daniel', 'F.', 'daniel.f@seed.trovr.de'),
  ('22222222-0001-0001-0001-000000000018', 'Stefanie', 'R.', 'stefanie.r@seed.trovr.de'),
  ('22222222-0001-0001-0001-000000000019', 'Christian', 'A.', 'christian.a@seed.trovr.de'),
  ('22222222-0001-0001-0001-000000000020', 'Priya', 'N.', 'priya.n@seed.trovr.de'),
  ('22222222-0001-0001-0001-000000000021', 'Laura', 'H.', 'laura.h@seed.trovr.de'),
  ('22222222-0001-0001-0001-000000000022', 'Markus', 'J.', 'markus.j@seed.trovr.de'),
  ('22222222-0001-0001-0001-000000000023', 'Tamara', 'W.', 'tamara.w@seed.trovr.de'),
  ('22222222-0001-0001-0001-000000000024', 'Fatima', 'B.', 'fatima.b@seed.trovr.de'),
  ('22222222-0001-0001-0001-000000000025', 'Martin', 'G.', 'martin.g@seed.trovr.de'),
  ('22222222-0001-0001-0001-000000000026', 'Yuki', 'T.', 'yuki.t@seed.trovr.de'),
  ('22222222-0001-0001-0001-000000000027', 'Claudia', 'M.', 'claudia.m@seed.trovr.de'),
  ('22222222-0001-0001-0001-000000000028', 'Henrik', 'S.', 'henrik.s@seed.trovr.de');

-- SEED BOOKINGS (completed, to support reviews)
INSERT INTO bookings (id, parent_id, coach_id, session_date, session_time, price, status) VALUES
  -- Markus Hoffmann reviews
  ('33333333-0001-0001-0001-000000000001', '22222222-0001-0001-0001-000000000001', '11111111-0001-0001-0001-000000000001', '2026-02-14', '15:00', 60.00, 'completed'),
  ('33333333-0001-0001-0001-000000000002', '22222222-0001-0001-0001-000000000002', '11111111-0001-0001-0001-000000000001', '2026-01-27', '15:00', 60.00, 'completed'),
  ('33333333-0001-0001-0001-000000000003', '22222222-0001-0001-0001-000000000003', '11111111-0001-0001-0001-000000000001', '2026-01-09', '15:00', 60.00, 'completed'),
  ('33333333-0001-0001-0001-000000000004', '22222222-0001-0001-0001-000000000004', '11111111-0001-0001-0001-000000000001', '2025-12-19', '15:00', 60.00, 'completed'),
  -- Elena Petrov reviews
  ('33333333-0001-0001-0001-000000000005', '22222222-0001-0001-0001-000000000005', '11111111-0001-0001-0001-000000000002', '2026-02-27', '18:00', 70.00, 'completed'),
  ('33333333-0001-0001-0001-000000000006', '22222222-0001-0001-0001-000000000006', '11111111-0001-0001-0001-000000000002', '2026-02-04', '18:00', 70.00, 'completed'),
  ('33333333-0001-0001-0001-000000000007', '22222222-0001-0001-0001-000000000007', '11111111-0001-0001-0001-000000000002', '2026-01-14', '18:00', 70.00, 'completed'),
  -- David Okafor reviews
  ('33333333-0001-0001-0001-000000000008', '22222222-0001-0001-0001-000000000008', '11111111-0001-0001-0001-000000000003', '2026-02-28', '16:00', 65.00, 'completed'),
  ('33333333-0001-0001-0001-000000000009', '22222222-0001-0001-0001-000000000009', '11111111-0001-0001-0001-000000000003', '2026-02-11', '16:00', 65.00, 'completed'),
  ('33333333-0001-0001-0001-000000000010', '22222222-0001-0001-0001-000000000010', '11111111-0001-0001-0001-000000000003', '2026-01-24', '16:00', 65.00, 'completed'),
  -- Jan Krause reviews
  ('33333333-0001-0001-0001-000000000011', '22222222-0001-0001-0001-000000000011', '11111111-0001-0001-0001-000000000004', '2026-02-19', '18:00', 55.00, 'completed'),
  ('33333333-0001-0001-0001-000000000012', '22222222-0001-0001-0001-000000000012', '11111111-0001-0001-0001-000000000004', '2026-01-29', '18:00', 55.00, 'completed'),
  ('33333333-0001-0001-0001-000000000013', '22222222-0001-0001-0001-000000000013', '11111111-0001-0001-0001-000000000004', '2025-12-17', '18:00', 55.00, 'completed'),
  -- Sarah Bergmann reviews
  ('33333333-0001-0001-0001-000000000014', '22222222-0001-0001-0001-000000000014', '11111111-0001-0001-0001-000000000005', '2026-03-04', '14:00', 60.00, 'completed'),
  ('33333333-0001-0001-0001-000000000015', '22222222-0001-0001-0001-000000000015', '11111111-0001-0001-0001-000000000005', '2026-02-09', '14:00', 60.00, 'completed'),
  -- Andre Mbeki reviews
  ('33333333-0001-0001-0001-000000000016', '22222222-0001-0001-0001-000000000016', '11111111-0001-0001-0001-000000000006', '2026-02-21', '09:00', 75.00, 'completed'),
  ('33333333-0001-0001-0001-000000000017', '22222222-0001-0001-0001-000000000017', '11111111-0001-0001-0001-000000000006', '2026-01-17', '09:00', 75.00, 'completed'),
  ('33333333-0001-0001-0001-000000000018', '22222222-0001-0001-0001-000000000018', '11111111-0001-0001-0001-000000000006', '2025-12-27', '09:00', 75.00, 'completed'),
  -- Maria Santos reviews
  ('33333333-0001-0001-0001-000000000019', '22222222-0001-0001-0001-000000000019', '11111111-0001-0001-0001-000000000007', '2026-03-07', '09:00', 50.00, 'completed'),
  ('33333333-0001-0001-0001-000000000020', '22222222-0001-0001-0001-000000000020', '11111111-0001-0001-0001-000000000007', '2026-02-13', '09:00', 50.00, 'completed'),
  ('33333333-0001-0001-0001-000000000021', '22222222-0001-0001-0001-000000000021', '11111111-0001-0001-0001-000000000007', '2026-01-19', '09:00', 50.00, 'completed'),
  -- Kevin Brandt reviews
  ('33333333-0001-0001-0001-000000000022', '22222222-0001-0001-0001-000000000022', '11111111-0001-0001-0001-000000000008', '2026-02-24', '06:30', 75.00, 'completed'),
  ('33333333-0001-0001-0001-000000000023', '22222222-0001-0001-0001-000000000023', '11111111-0001-0001-0001-000000000008', '2026-01-29', '06:30', 75.00, 'completed'),
  -- Ali Hassan reviews
  ('33333333-0001-0001-0001-000000000024', '22222222-0001-0001-0001-000000000024', '11111111-0001-0001-0001-000000000009', '2026-03-09', '15:00', 50.00, 'completed'),
  ('33333333-0001-0001-0001-000000000025', '22222222-0001-0001-0001-000000000025', '11111111-0001-0001-0001-000000000009', '2026-02-17', '15:00', 50.00, 'completed'),
  ('33333333-0001-0001-0001-000000000026', '22222222-0001-0001-0001-000000000026', '11111111-0001-0001-0001-000000000009', '2026-01-21', '15:00', 50.00, 'completed'),
  -- Lena Fischer reviews
  ('33333333-0001-0001-0001-000000000027', '22222222-0001-0001-0001-000000000027', '11111111-0001-0001-0001-000000000010', '2026-03-01', '16:00', 55.00, 'completed'),
  ('33333333-0001-0001-0001-000000000028', '22222222-0001-0001-0001-000000000028', '11111111-0001-0001-0001-000000000010', '2026-02-07', '16:00', 55.00, 'completed');

-- REVIEWS (linked to completed bookings)
INSERT INTO reviews (booking_id, coach_id, parent_id, rating, comment, created_at) VALUES
  -- Markus Hoffmann
  ('33333333-0001-0001-0001-000000000001', '11111111-0001-0001-0001-000000000001', '22222222-0001-0001-0001-000000000001', 5, 'Markus has been coaching my son for 6 months and the improvement is incredible. He went from Kreisliga to being scouted by a Bezirksliga team. Markus really understands youth development and makes every session count.', '2026-02-15'),
  ('33333333-0001-0001-0001-000000000002', '11111111-0001-0001-0001-000000000001', '22222222-0001-0001-0001-000000000002', 5, 'We tried three different coaches before finding Markus on Trovr. The difference is night and day. My daughter''s ball control and first touch have improved dramatically. He adapts his coaching style perfectly to each kid.', '2026-01-28'),
  ('33333333-0001-0001-0001-000000000003', '11111111-0001-0001-0001-000000000001', '22222222-0001-0001-0001-000000000003', 5, 'Finally a coach who takes Bambini development seriously. Markus doesn''t just run drills — he makes the kids fall in love with football. My 6-year-old now practices voluntarily in the garden every day.', '2026-01-10'),
  ('33333333-0001-0001-0001-000000000004', '11111111-0001-0001-0001-000000000001', '22222222-0001-0001-0001-000000000004', 4, 'Great coach with excellent credentials. Only reason for 4 stars is that weekend slots fill up fast. Book early if you want Saturdays.', '2025-12-20'),
  -- Elena Petrov
  ('33333333-0001-0001-0001-000000000005', '11111111-0001-0001-0001-000000000002', '22222222-0001-0001-0001-000000000005', 5, 'Elena is the real deal. Former Bundesliga player who knows how to translate elite-level skills to youth players. My daughter''s technique has improved massively. The bilingual coaching is a bonus for our family.', '2026-02-28'),
  ('33333333-0001-0001-0001-000000000006', '11111111-0001-0001-0001-000000000002', '22222222-0001-0001-0001-000000000006', 5, 'Worth every cent. Elena identified weaknesses in my son''s game that his Verein coach missed completely. Her professional experience shows in every session.', '2026-02-05'),
  ('33333333-0001-0001-0001-000000000007', '11111111-0001-0001-0001-000000000002', '22222222-0001-0001-0001-000000000007', 5, 'Elena helped my 16-year-old daughter prepare for NLZ trials. Her knowledge of what NLZ scouts look for was invaluable. She got accepted at Hertha BSC.', '2026-01-15'),
  -- David Okafor
  ('33333333-0001-0001-0001-000000000008', '11111111-0001-0001-0001-000000000003', '22222222-0001-0001-0001-000000000008', 5, 'Coach David completely transformed my son''s game. He went from being afraid of 1v1 situations to actively seeking them out. David focuses on the mental side of football too, not just technique.', '2026-03-01'),
  ('33333333-0001-0001-0001-000000000009', '11111111-0001-0001-0001-000000000003', '22222222-0001-0001-0001-000000000009', 5, 'We moved to Berlin and found David on Trovr within our first week. My daughter''s Verein coach noticed the improvement after just 4 sessions. David has a gift for coaching young players.', '2026-02-12'),
  ('33333333-0001-0001-0001-000000000010', '11111111-0001-0001-0001-000000000003', '22222222-0001-0001-0001-000000000010', 5, 'David is incredible with younger kids. My 8-year-old was struggling with confidence but now can''t wait for his weekly private training. Patient, encouraging, and makes every drill fun.', '2026-01-25'),
  -- Jan Krause
  ('33333333-0001-0001-0001-000000000011', '11111111-0001-0001-0001-000000000004', '22222222-0001-0001-0001-000000000011', 5, 'Jan uses video analysis to show my son exactly what he needs to fix. The improvement in his shooting technique after 6 sessions is unbelievable. He''s now the top scorer in his E-Jugend team.', '2026-02-20'),
  ('33333333-0001-0001-0001-000000000012', '11111111-0001-0001-0001-000000000004', '22222222-0001-0001-0001-000000000012', 5, 'Very fair pricing compared to other coaches in Berlin and the quality is excellent. Jan is great with younger kids — my 8-year-old went from barely being able to strike the ball to scoring from distance.', '2026-01-30'),
  ('33333333-0001-0001-0001-000000000013', '11111111-0001-0001-0001-000000000004', '22222222-0001-0001-0001-000000000013', 4, 'Solid coaching with a smart approach. Jan really knows attacking play. Would love to see him offer defensive training packages too for my older son who plays centre-back.', '2025-12-18'),
  -- Sarah Bergmann
  ('33333333-0001-0001-0001-000000000014', '11111111-0001-0001-0001-000000000005', '22222222-0001-0001-0001-000000000014', 5, 'There are almost no goalkeeper-specific coaches in Berlin doing private training. Sarah fills a huge gap. My daughter''s save percentage went way up in just one season working with her.', '2026-03-05'),
  ('33333333-0001-0001-0001-000000000015', '11111111-0001-0001-0001-000000000005', '22222222-0001-0001-0001-000000000015', 5, 'Sarah is incredibly knowledgeable about the goalkeeper position. She teaches positioning, footwork, and the mental toughness side that most Verein coaches ignore. My son now loves playing keeper.', '2026-02-10'),
  -- Andre Mbeki
  ('33333333-0001-0001-0001-000000000016', '11111111-0001-0001-0001-000000000006', '22222222-0001-0001-0001-000000000016', 5, 'Andre''s 8-week programme structure is exactly what my son needed. He can see his own progress on the tracking sheet and it keeps him motivated. The athletic performance background adds so much value.', '2026-02-22'),
  ('33333333-0001-0001-0001-000000000017', '11111111-0001-0001-0001-000000000006', '22222222-0001-0001-0001-000000000017', 5, 'Premium price but premium coaching. Andre treats every session like a professional training. My 16-year-old is now being considered for NLZ selection thanks to the development he got here.', '2026-01-18'),
  ('33333333-0001-0001-0001-000000000018', '11111111-0001-0001-0001-000000000006', '22222222-0001-0001-0001-000000000018', 4, 'Excellent coach with serious credentials. Training location in Neukölln works well for us. The structured approach with progress tracking sets him apart from other coaches.', '2025-12-28'),
  -- Maria Santos
  ('33333333-0001-0001-0001-000000000019', '11111111-0001-0001-0001-000000000007', '22222222-0001-0001-0001-000000000019', 5, 'Maria is AMAZING with little kids. My 5-year-old was scared of the ball and now she''s dribbling around the flat. Maria makes every session feel like a game, not practice. Can''t recommend enough.', '2026-03-08'),
  ('33333333-0001-0001-0001-000000000020', '11111111-0001-0001-0001-000000000007', '22222222-0001-0001-0001-000000000020', 5, 'Finally a coach who understands that 6-year-olds need fun, not drills. Maria''s play-based approach has my son begging to go to football. She''s patient, creative, and genuinely loves coaching little ones.', '2026-02-14'),
  ('33333333-0001-0001-0001-000000000021', '11111111-0001-0001-0001-000000000007', '22222222-0001-0001-0001-000000000021', 5, 'My twins started with Maria 3 months ago and the transformation is unreal. They went from not wanting to play to being the most enthusiastic kids on their Verein team. Maria is a gift.', '2026-01-20'),
  -- Kevin Brandt
  ('33333333-0001-0001-0001-000000000022', '11111111-0001-0001-0001-000000000008', '22222222-0001-0001-0001-000000000022', 5, 'Kevin is the only coach in Berlin combining real football training with professional-level athletic conditioning. My son''s sprint times improved by 0.4 seconds in 3 months. NLZ scouts are noticing.', '2026-02-25'),
  ('33333333-0001-0001-0001-000000000023', '11111111-0001-0001-0001-000000000008', '22222222-0001-0001-0001-000000000023', 5, 'The athletic performance angle is what sets Kevin apart. The explosiveness training has completely changed how my daughter moves on the pitch. Worth the premium price.', '2026-01-30'),
  -- Ali Hassan
  ('33333333-0001-0001-0001-000000000024', '11111111-0001-0001-0001-000000000009', '22222222-0001-0001-0001-000000000024', 5, 'Ali is more than a football coach — he''s a role model. My son looks up to him and has grown so much in confidence, both on and off the pitch. The multilingual coaching is wonderful for our family.', '2026-03-10'),
  ('33333333-0001-0001-0001-000000000025', '11111111-0001-0001-0001-000000000009', '22222222-0001-0001-0001-000000000025', 5, 'Ali''s sessions are the highlight of my daughter''s week. He creates an environment where every kid feels welcome regardless of their level. She''s improved technically while having a blast.', '2026-02-18'),
  ('33333333-0001-0001-0001-000000000026', '11111111-0001-0001-0001-000000000009', '22222222-0001-0001-0001-000000000026', 5, 'We''re an expat family and Ali made our son feel immediately at home. His coaching style is encouraging and structured. After 2 months, our boy made the starting lineup at his local Verein.', '2026-01-22'),
  -- Lena Fischer
  ('33333333-0001-0001-0001-000000000027', '11111111-0001-0001-0001-000000000010', '22222222-0001-0001-0001-000000000027', 5, 'Finally a coach who specifically understands girls'' football. Lena has given my daughter confidence she never had in her mixed Verein training. She went from sitting on the bench to being team captain.', '2026-03-02'),
  ('33333333-0001-0001-0001-000000000028', '11111111-0001-0001-0001-000000000010', '22222222-0001-0001-0001-000000000028', 5, 'Lena is passionate about developing the next generation of women''s football. My twin daughters train with her weekly and the progress in technique and game understanding is remarkable.', '2026-02-08');
