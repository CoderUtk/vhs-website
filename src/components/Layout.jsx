import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import site from '../data/site.json';

const ROUTE_META = {
  '/': {
    title: 'वैश्विक हिंदी सम्मेलन | Vaishwik Hindi Sammelan',
    description: 'वैश्विक हिंदी सम्मेलन का आधिकारिक मंच: हिंदी और भारतीय भाषाओं के संवर्धन, कार्यक्रमों, प्रकाशनों तथा भारतीय भाषा रक्षकों का संग्रह।'
  },
  '/about': {
    title: 'हमारे बारे में (About Us) | वैश्विक हिंदी सम्मेलन',
    description: 'वैश्विक हिंदी सम्मेलन का परिचय, उद्देश्य, चार आधार और संपर्क विवरण।'
  },
  '/karyakram': {
    title: 'भाषा कार्यक्रम (Language Programs) | वैश्विक हिंदी सम्मेलन',
    description: 'वैश्विक हिंदी सम्मेलन कार्यक्रम तथा भारतीय भाषाओं के नए कार्यक्रमों की संपूर्ण रूपरेखा।'
  },
  '/prakashan': {
    title: 'सामग्री एवं प्रकाशन (Material & Press) | वैश्विक हिंदी सम्मेलन',
    description: 'नवीनतम भाषा सामग्री, पुस्तक व पत्रिका तथा पत्र-पत्रिका कतरन संग्रह।'
  },
  '/bhasha-rakshak': {
    title: 'भारतीय भाषा रक्षक (Bhartiya Bhasha Rakshak) | वैश्विक हिंदी सम्मेलन',
    description: 'भारत भाषा प्रहरी, भारतीय भाषा सेनानी, हिंदी के विश्वदूत, भाषा सेवी, सम्मान प्राप्तकर्ता तथा हिंदी के द्वीप।'
  },
  '/gallery': {
    title: 'फोटो गैलरी (Photo Gallery) | वैश्विक हिंदी सम्मेलन',
    description: 'वैश्विक हिंदी सम्मेलन के आयोजनों, ग्रंथागार और सांस्कृतिक कार्यक्रमों की फोटो गैलरी।'
  }
};

export default function Layout({ children, credits }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const meta = ROUTE_META[pathname] || ROUTE_META['/'];
    document.title = meta.title;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute('content', meta.description);
    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) {
      canonicalEl.setAttribute(
        'href',
        `https://vhs-website.navalo.workers.dev${pathname === '/' ? '/' : pathname}`
      );
    }
  }, [pathname]);

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
      <a className="skip-link" href="#main-content">
        मुख्य सामग्री पर जाएं
      </a>

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
              <span className="brand-sub" translate="no">{site.orgNameEn}</span>
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

      <main id="main-content" tabIndex={-1}>{children}</main>

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
