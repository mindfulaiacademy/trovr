'use client';

import { useState, useEffect } from 'react';

export default function ContactSection({ coach, coachId, city }) {
  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState(null);
  const [emailRevealed, setEmailRevealed] = useState(false);
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  async function fetchContact() {
    if (contact) return contact;
    setLoading(true);
    try {
      const res = await fetch(`/api/contact?id=${encodeURIComponent(coachId)}&city=${encodeURIComponent(city)}`);
      const data = await res.json();
      setContact(data);
      return data;
    } finally {
      setLoading(false);
    }
  }

  async function revealEmail(e) {
    e.preventDefault();
    const data = await fetchContact();
    if (data) setEmailRevealed(true);
  }

  async function revealPhone(e) {
    e.preventDefault();
    const data = await fetchContact();
    if (data) setPhoneRevealed(true);
  }

  return (
    <>
      <button className="btn-contact" onClick={() => setOpen(true)}>
        Trainer kontaktieren
      </button>

      {/* Mobile booking bar — CSS controls visibility via media query */}
      <div className="mobile-booking-bar">
        <div className="mobile-bar-price">
          <span className="price-num">€{coach.sessionPrice}</span>
          <span className="price-sub">/Einheit</span>
        </div>
        <button className="mobile-bar-cta" onClick={() => setOpen(true)}>
          Trainer kontaktieren
        </button>
      </div>

      {/* Contact modal */}
      {open && (
        <div
          className="modal-overlay active"
          onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="modal">
            <button className="modal-close" onClick={() => setOpen(false)}>&times;</button>
            <h2>{coach.firstName} kontaktieren</h2>
            <p>Nimm Kontakt auf, um deine erste Einheit zu vereinbaren. Erwähne, dass du ihn auf Trovr gefunden hast!</p>
            <div className="contact-row">
              <div>
                <div className="label">E-Mail</div>
                <div className="value">
                  {emailRevealed && contact ? (
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  ) : (
                    <>
                      <span>••••••@••••••.de</span>
                      <a
                        href="#"
                        onClick={revealEmail}
                        style={{ marginLeft: '8px', fontSize: '0.85rem', color: 'var(--primary)', textDecoration: 'underline' }}
                      >
                        {loading ? 'Lädt…' : 'Anzeigen'}
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="contact-row">
              <div>
                <div className="label">Telefon</div>
                <div className="value">
                  {phoneRevealed && contact ? (
                    <a href={`tel:${contact.phone?.replace(/\D/g, '')}`}>{contact.phone}</a>
                  ) : (
                    <>
                      <span>+49 *** *** ****</span>
                      <a
                        href="#"
                        onClick={revealPhone}
                        style={{ marginLeft: '8px', fontSize: '0.85rem', color: 'var(--primary)', textDecoration: 'underline' }}
                      >
                        {loading ? 'Lädt…' : 'Anzeigen'}
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
