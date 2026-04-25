import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <Link href="/fussballtrainer/berlin/" className="logo">
              trovr<span>.</span>
            </Link>
            <p>Finde geprüfte und hochqualifizerte Fußballtrainer:innen für dein junges Talent.</p>
          </div>
          <div className="footer-links">
            <a href="/fuer-trainer">Für Trainer:innen</a>
            <a href="/privacy.html">Datenschutz</a>
            <a href="/impressum.html">Impressum</a>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Trovr. Alle Rechte vorbehalten.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
