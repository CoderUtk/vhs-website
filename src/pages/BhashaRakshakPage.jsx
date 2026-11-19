import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import SpotlightCard from '../components/reactbits/SpotlightCard';
import rakshakData from '../data/rakshak.json';

export default function BhashaRakshakPage() {
  const { hash } = useLocation();
  const [activeId, setActiveId] = useState(rakshakData.divisions[0].id);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const slug = hash.slice(1);
    if (slug && rakshakData.divisions.some((d) => d.id === slug)) {
      setActiveId(slug);
    }
  }, [hash]);

  const activeDivision =
    rakshakData.divisions.find((d) => d.id === activeId) || rakshakData.divisions[0];

  const q = query.trim().toLowerCase();
  const filteredDivisions = !q
    ? rakshakData.divisions
    : rakshakData.divisions.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.titleEn.toLowerCase().includes(q) ||
          d.summary.toLowerCase().includes(q) ||
          d.role.toLowerCase().includes(q)
      );

  const credits = (
    <>
      Photographs:{' '}
      <a href="https://commons.wikimedia.org/wiki/File:BlackInkBottle.JPG">Eric Magnan</a> (CC BY-SA 4.0, Wikimedia Commons)
    </>
  );

  return (
    <Layout credits={credits}>
      <section className="hero hero--banner" aria-labelledby="rakshak-title">
        <div className="container">
          <div className="hero-copy">
            <h1 id="rakshak-title">भारतीय भाषा रक्षक (Bhartiya Bhasha Rakshak)</h1>
            <p className="lead">भारत और विश्व भर में हिंदी तथा भारतीय भाषाओं की रक्षा, सेवा व प्रसार करने वाले छह प्रमुख सम्मान एवं परिचय प्रभाग।</p>
          </div>
        </div>
      </section>

      <section className="section--roomy" aria-labelledby="rakshak-dir-title">
        <div className="container">
          <div className="section-head">
            <h2 id="rakshak-dir-title">रक्षक श्रेणियां एवं परिचय निर्देशिका</h2>
            <p className="lead">नीचे दिए गए छह प्रभागों में से श्रेणी चुनकर संबंधित भूमिका और विवरण देखें।</p>
          </div>

          <div className="seg" role="tablist" aria-label="भारतीय भाषा रक्षक छह श्रेणियां">
            {rakshakData.divisions.map((div) => (
              <button
                key={div.id}
                className="tab"
                role="tab"
                type="button"
                id={`tab-${div.id}`}
                aria-selected={activeId === div.id}
                onClick={() => setActiveId(div.id)}
              >
                {Number(div.number)}. {div.title}
              </button>
            ))}
          </div>

          <SpotlightCard
            className="vhs-spotlight vhs-spotlight--paper2"
            theme="light"
            spotlightColor="#2b45a8"
            intensity={0.08}
          >
            <div className="split" id={activeDivision.id}>
              <div className="split-copy">
                <h3>
                  {Number(activeDivision.number)}. {activeDivision.title} ({activeDivision.titleEn})
                </h3>
                <p className="lead">{activeDivision.summary}</p>
                <p>मुख्य भूमिका: {activeDivision.role}</p>
                <p>
                  अभिलेख स्थिति: <span className="fill" data-fill={activeDivision.id}>{activeDivision.slotNote}</span>
                </p>
              </div>

              <div className="split-media">
                <figure className="photo photo--split" data-slot="rakshak-ink" data-alt="स्याही और लेखनी का प्रतीकात्मक चित्र">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/BlackInkBottle.JPG/1280px-BlackInkBottle.JPG"
                    sizes="(min-width: 60rem) 48vw, 100vw"
                    width="3310"
                    height="2216"
                    style={{ objectPosition: '55% 50%' }}
                    loading="lazy"
                    alt="काली स्याही की खुली कांच की दवात"
                  />
                </figure>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </section>

      <section className="section band--paper" aria-labelledby="all-six-title">
        <div className="container">
          <div className="section-head">
            <h2 id="all-six-title">छहों प्रभागों की समग्र तालिका</h2>
            <p className="lead">सभी श्रेणियों की संरचना एवं खोज सुविधा एक दृष्टि में।</p>
          </div>

          <div className="search-row">
            <input
              id="rakshak-search"
              name="rakshak-search"
              className="search-input"
              type="search"
              aria-label="भाषा रक्षक श्रेणी खोजें"
              placeholder="रक्षक श्रेणी खोजें (जैसे: प्रहरी, सेनानी, विश्वदूत, सेवी, सम्मान, द्वीप)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="table-wrap">
            <table className="ledger-table">
              <thead>
                <tr>
                  <th>क्रमांक</th>
                  <th>हिंदी श्रेणी</th>
                  <th>अंग्रेजी नाम</th>
                  <th>मुख्य भूमिका</th>
                </tr>
              </thead>
              <tbody>
                {filteredDivisions.map((div) => (
                  <tr
                    key={div.id}
                    onClick={() => {
                      setActiveId(div.id);
                      window.scrollTo({ top: 320, behavior: 'smooth' });
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <td className="num">{div.number}</td>
                    <td>{div.title}</td>
                    <td>{div.titleEn}</td>
                    <td>{div.role}</td>
                  </tr>
                ))}
                {!filteredDivisions.length && (
                  <tr>
                    <td colSpan={4}>कोई मेल खाने वाली श्रेणी नहीं मिली।</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Layout>
  );
}
