import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import AnimatedList from '../components/reactbits/AnimatedList';
import SpotlightCard from '../components/reactbits/SpotlightCard';
import FadeContent from '../components/reactbits/FadeContent';
import site from '../data/site.json';
import newsData from '../data/news.json';
import programsData from '../data/programs.json';

export default function HomePage() {
  const [programTab, setProgramTab] = useState('vhs');
  const vhsTabRef = useRef(null);
  const indianTabRef = useRef(null);
  const navigate = useNavigate();

  const newsItems = newsData.newsItems.map((item) => ({
    title: item.title,
    description: item.description,
    meta: item.meta,
    link: item.link
  }));

  const credits = (
    <>
      Photographs:{' '}
      <a href="https://commons.wikimedia.org/wiki/File:13-11-02-olb-by-RalfR-03.jpg">Ralf Roletschek</a> (CC BY 3.0),{' '}
      <a href="https://commons.wikimedia.org/wiki/File:Fountain_pen_writing_(literacy).jpg">Petar Milošević</a> (CC BY-SA 4.0),{' '}
      <a href="https://commons.wikimedia.org/wiki/File:Old_Books_01.JPG">Ch. Maderthoner</a> (CC0, Wikimedia Commons)
    </>
  );

  return (
    <Layout credits={credits}>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1 id="hero-title">{site.heroHeadline}</h1>
            <p className="lead">{site.heroLead}</p>
            <div className="hero-actions">
              <Link className="btn btn--primary" to="/karyakram">भाषा कार्यक्रम देखें</Link>
              <Link className="btn" to="/bhasha-rakshak">भारतीय भाषा रक्षक</Link>
            </div>
          </div>

          <div className="hero-visual">
            <figure className="photo photo--hero" data-slot="hero" data-alt={site.heroImage.alt}>
              <img
                src={site.heroImage.src}
                sizes="(min-width: 60rem) 55vw, 100vw"
                width={site.heroImage.width}
                height={site.heroImage.height}
                alt={site.heroImage.alt}
                fetchPriority="high"
              />
            </figure>
            <p className="caption">{site.heroImage.caption}</p>
          </div>
        </div>
      </section>

      <section className="section--roomy" aria-labelledby="news-title">
        <div className="container">
          <div className="section-head">
            <h2 id="news-title">नवीनतम भाषा समाचार</h2>
            <p className="lead">हिंदी, भारतीय भाषाओं और अंतर्राष्ट्रीय संवाद से जुड़ी ताजा सूचनाएं तथा प्रेस विज्ञप्तियां।</p>
          </div>

          <FadeContent duration={0.5} threshold={0.1}>
            <AnimatedList
              className="vhs-animated-list"
              items={newsItems}
              theme="light"
              accentColor="#2b45a8"
              radius={2}
              maxHeight={380}
              showGradients={false}
              onItemSelect={(item) => {
                if (item?.link) navigate(item.link);
              }}
            />
          </FadeContent>
        </div>
      </section>

      <section className="section band--paper fibre" aria-labelledby="sevi-title">
        <div className="container split">
          <div className="split-copy">
            <h2 id="sevi-title">{newsData.seviSpotlight.title}</h2>
            <p className="lead">{newsData.seviSpotlight.lead}</p>
            <p>{newsData.seviSpotlight.body}</p>
            <div>
              <Link className="btn" to="/bhasha-rakshak#sevi">भाषा सेवी विवरण पढ़ें</Link>
            </div>
          </div>

          <div className="split-media">
            <figure className="photo photo--split" data-slot="sevi" data-alt={newsData.seviSpotlight.image.alt}>
              <img
                src={newsData.seviSpotlight.image.src}
                sizes="(min-width: 60rem) 50vw, 100vw"
                width={newsData.seviSpotlight.image.width}
                height={newsData.seviSpotlight.image.height}
                style={{ objectPosition: '30% 50%' }}
                loading="lazy"
                alt={newsData.seviSpotlight.image.alt}
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="section--deep band--pigment" aria-labelledby="programs-title">
        <div className="container">
          <div className="section-head">
            <h2 id="programs-title">भाषा कार्यक्रम</h2>
            <p className="lead">वैश्विक हिंदी सम्मेलन कार्यक्रम तथा भारतीय भाषाओं के नए कार्यक्रम (Language Programs)।</p>
          </div>

          <div
            className="seg"
            role="tablist"
            aria-label="कार्यक्रम श्रेणियां"
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const next = programTab === 'vhs' ? 'indian' : 'vhs';
                setProgramTab(next);
                (next === 'vhs' ? vhsTabRef : indianTabRef).current?.focus({ preventScroll: true });
              }
            }}
          >
            <button
              ref={vhsTabRef}
              className="tab"
              role="tab"
              type="button"
              id="tab-home-vhs"
              tabIndex={programTab === 'vhs' ? 0 : -1}
              aria-selected={programTab === 'vhs'}
              aria-controls="panel-home-programs"
              onClick={() => setProgramTab('vhs')}
            >
              वैश्विक हिंदी सम्मेलन कार्यक्रम
            </button>
            <button
              ref={indianTabRef}
              className="tab"
              role="tab"
              type="button"
              id="tab-home-indian"
              tabIndex={programTab === 'indian' ? 0 : -1}
              aria-selected={programTab === 'indian'}
              aria-controls="panel-home-programs"
              onClick={() => setProgramTab('indian')}
            >
              भारतीय भाषाओं के नए कार्यक्रम
            </button>
          </div>

          <ul
            className="ledger"
            id="panel-home-programs"
            role="tabpanel"
            aria-labelledby={programTab === 'vhs' ? 'tab-home-vhs' : 'tab-home-indian'}
          >
            {(programTab === 'vhs' ? programsData.vhsPrograms : programsData.indianLanguagePrograms).map((prog) => (
              <li className="ledger-row" key={prog.id}>
                <span className="ledger-index">{prog.category}</span>
                <span className="ledger-title">{prog.title}</span>
                <span className="ledger-desc">{prog.description}</span>
                <Link
                  className="ledger-link"
                  to={programTab === 'vhs' ? '/karyakram#vhs' : '/karyakram#indian-languages'}
                >
                  पूरा कार्यक्रम
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section--roomy" aria-labelledby="material-title">
        <div className="container">
          <div className="section-head">
            <h2 id="material-title">नवीनतम भाषा सामग्री</h2>
            <p className="lead">भाषा शोध, पुस्तकें, पत्रिकाएं तथा समाचार कतरनों का व्यवस्थित पठन संग्रह।</p>
          </div>

          <FadeContent duration={0.55} stagger={0.08} threshold={0.1} className="grid-3">
            <SpotlightCard className="vhs-spotlight" theme="light" spotlightColor="#2b45a8" intensity={0.08}>
              <h3>नवीनतम भाषा सामग्री</h3>
              <p>शोध आलेख, शब्दावली कोष, व्याख्यान पाठ और जनसंपर्क के लिए उपयोगी द्विभाषी दस्तावेज।</p>
              <Link className="ledger-link" to="/prakashan#samagri">सामग्री पढ़ें</Link>
            </SpotlightCard>

            <SpotlightCard className="vhs-spotlight" theme="light" spotlightColor="#2b45a8" intensity={0.08}>
              <h3>नवीनतम पुस्तक/पत्रिका</h3>
              <p>संगठन द्वारा प्रकाशित स्मारिकाएं, त्रैमासिक पत्रिकाएं और संदर्भ पुस्तकों की सूची।</p>
              <Link className="ledger-link" to="/prakashan#books">पुस्तक एवं पत्रिका देखें</Link>
            </SpotlightCard>

            <SpotlightCard className="vhs-spotlight" theme="light" spotlightColor="#2b45a8" intensity={0.08}>
              <h3>पत्र-पत्रिका कतरन</h3>
              <p>प्रिंट मीडिया और समाचार पत्रों में प्रकाशित सम्मेलन संबंधी कतरनों का ऐतिहासिक अभिलेख।</p>
              <Link className="ledger-link" to="/prakashan#cuttings">कतरन संग्रह देखें</Link>
            </SpotlightCard>
          </FadeContent>
        </div>
      </section>

      <section className="section band--paper" aria-labelledby="rakshak-home-title">
        <div className="container split split--reverse">
          <div className="split-media">
            <figure className="photo photo--split" data-slot="books" data-alt="प्राचीन एवं सांस्कृतिक पुस्तकों का संग्रह">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Old_Books_01.JPG/1280px-Old_Books_01.JPG"
                sizes="(min-width: 60rem) 42vw, 100vw"
                width="2400"
                height="2466"
                loading="lazy"
                alt="चमड़े की जिल्द वाली चार प्राचीन पुस्तकों का संग्रह"
              />
            </figure>
          </div>

          <div className="split-copy">
            <h2 id="rakshak-home-title">भारतीय भाषा रक्षक (Bhartiya Bhasha Rakshak)</h2>
            <p className="lead">भारत भाषा प्रहरी, भारतीय भाषा सेनानी, हिंदी के विश्वदूत, भाषा सेवी, सम्मान प्राप्तकर्ता तथा हिंदी के द्वीप।</p>
            <p>भाषा आंदोलन और सांस्कृतिक संवर्धन को समर्पित व्यक्तित्वों एवं वैश्विक हिंदी केंद्रों की छह प्रमुख श्रेणियों का परिचय एक स्थान पर उपलब्ध है।</p>
            <div>
              <Link className="btn btn--primary" to="/bhasha-rakshak">सभी छह श्रेणियां देखें</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
