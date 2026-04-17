import Link from 'next/link';

export default function Nav({ listingLinks, backLink }) {
  return (
    <nav>
      <div className="container nav-inner">
        <Link href="/fussballtrainer/berlin/" className="logo">
          trovr<span>.</span>
        </Link>
        <div className="nav-links">
          {listingLinks && (
            <>
              <a href="#results" className="nav-link-desktop">Trainer suchen</a>
              <a href="#how-it-works" className="nav-link-desktop">So funktioniert&apos;s</a>
            </>
          )}
          {backLink && (
            <Link href={backLink.href} className="nav-link-desktop">
              {backLink.label}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
