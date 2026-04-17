'use client';

import { useState, useEffect } from 'react';

export default function ContactSection({ coach }) {
  const [open, setOpen] = useState(false);
  const [phoneRevealed, setPhoneRevealed] = useState(false);

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

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
                  <a href={`mailto:${coach.contactEmail}`}>{coach.contactEmail}</a>
                </div>
              </div>
            </div>
            <div className="contact-row">
              <div>
                <div className="label">Telefon</div>
                <div className="value">
                  {phoneRevealed ? (
                    <a href={`tel:${coach.contactPhone?.replace(/\D/g, '')}`}>{coach.contactPhone}</a>
                  ) : (
                    <>
                      <span>+49 *** *** ****</span>
                      <a
                        href="#"
                        onClick={e => { e.preventDefault(); setPhoneRevealed(true); }}
                        style={{ marginLeft: '8px', fontSize: '0.85rem', color: 'var(--primary)', textDecoration: 'underline' }}
                      >
                        Anzeigen
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
