import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import site from '../data/site.json';

export default function Layout({ children, credits }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <>
      <header className="site-header">
        <div className="container nav-bar">
          <Link className="brand" to="/" aria-label="वैश्विक हिंदी सम्मेलन मुख्य पृष्ठ">
            <span className="brand-mark" data-slot="logo" data-alt="वैश्विक हिंदी सम्मेलन का प्रतीक चिह्न">
              <img
                src="/logo/Latest%20LOGO%20-%20small.jpg"
                width="108"
                height="92"
                alt="वैश्विक हिंदी सम्मेलन प्रतीक चिह्न"
              />
            </span>
            <span className="brand-text">
              <span className="brand-title">{site.orgName}</span>
              <span className="brand-sub">{site.orgNameEn}</span>
            </span>
          </Link>

          <button
            className="nav-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            मेनू
          </button>

          <nav aria-label="मुख्य नेविगेशन">
            <ul className={`nav-links${menuOpen ? ' is-open' : ''}`} id="primary-nav">
              {site.nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) => (isActive ? 'is-active' : undefined)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <img
                className="footer-logo"
                src="/logo/Latest%20LOGO.jpg"
                width="108"
                height="109"
                alt="वैश्विक हिंदी सम्मेलन प्रतीक चिह्न"
                loading="lazy"
              />
              <div>
                <p className="brand-title">{site.orgName}</p>
                <p className="caption">{site.shortDesc}</p>
              </div>
            </div>

            <ul className="footer-links">
              <li><Link to="/">मुख्य पृष्ठ (Home)</Link></li>
              <li><Link to="/about">हमारे बारे में (About Us)</Link></li>
              <li><Link to="/karyakram#vhs">वैश्विक हिंदी सम्मेलन कार्यक्रम</Link></li>
              <li><Link to="/karyakram#indian-languages">भारतीय भाषाओं के नए कार्यक्रम</Link></li>
              <li><Link to="/prakashan#samagri">नवीनतम भाषा सामग्री</Link></li>
              <li><Link to="/prakashan#books">नवीनतम पुस्तक/पत्रिका</Link></li>
              <li><Link to="/prakashan#cuttings">पत्र-पत्रिका कतरन</Link></li>
              <li><Link to="/bhasha-rakshak">भारतीय भाषा रक्षक</Link></li>
              <li><Link to="/gallery">फोटो गैलरी (Photo Gallery)</Link></li>
            </ul>
          </div>

          <div className="footer-meta">
            <span>{site.orgName}, द्विभाषी संस्करण (हिंदी प्रमुख, अंग्रेजी सहायक)</span>
            {credits && <span data-credits>{credits}</span>}
          </div>
        </div>
      </footer>
    </>
  );
}
