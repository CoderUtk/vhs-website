import { useState } from 'react';
import Layout from '../components/Layout';
import programsData from '../data/programs.json';

export default function ProgramsPage() {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const filterList = (list) =>
    !q
      ? list
      : list.filter(
          (item) =>
            item.title.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q) ||
            item.participants.toLowerCase().includes(q)
        );

  const vhsList = filterList(programsData.vhsPrograms);
  const indList = filterList(programsData.indianLanguagePrograms);

  const credits = (
    <>
      Photographs:{' '}
      <a href="https://commons.wikimedia.org/wiki/File:Open_Book_b%26w.jpg">Bibliothek Wissenschaftspark Albert Einstein</a> (CC BY-SA 4.0, Wikimedia Commons)
    </>
  );

  return (
    <Layout credits={credits}>
      <section className="hero hero--banner" aria-labelledby="programs-page-title">
        <div className="container">
          <div className="hero-copy">
            <h1 id="programs-page-title">भाषा कार्यक्रम (Language Programs)</h1>
            <p className="lead">वैश्विक हिंदी सम्मेलन कार्यक्रम और भारतीय भाषाओं के नए कार्यक्रमों की संपूर्ण रूपरेखा।</p>
            <div className="hero-actions">
              <a className="btn btn--primary" href="#vhs">वैश्विक हिंदी सम्मेलन कार्यक्रम</a>
              <a className="btn" href="#indian-languages">भारतीय भाषाओं के नए कार्यक्रम</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section--roomy" id="vhs" aria-labelledby="vhs-prog-title">
        <div className="container">
          <div className="section-head">
            <h2 id="vhs-prog-title">वैश्विक हिंदी सम्मेलन कार्यक्रम</h2>
            <p className="lead">Vaishwik Hindi Sammelan Program के अंतर्गत आयोजित होने वाले प्रमुख सत्र एवं संगोष्ठियां।</p>
          </div>

          <div className="search-row">
            <input
              id="programs-search"
              name="programs-search"
              className="search-input"
              type="search"
              aria-label="कार्यक्रम खोजें"
              placeholder="कार्यक्रम खोजें (जैसे: संगोष्ठी, अनुवाद, राजभाषा, सम्मान)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="table-wrap">
            <table className="ledger-table">
              <thead>
                <tr>
                  <th>कार्यक्रम श्रेणी</th>
                  <th>विषय एवं उद्देश्य</th>
                  <th>सहभागिता स्वरूप</th>
                </tr>
              </thead>
              <tbody>
                {vhsList.map((row) => (
                  <tr key={row.id}>
                    <td>{row.title}</td>
                    <td>{row.description}</td>
                    <td>{row.participants}</td>
                  </tr>
                ))}
                {!vhsList.length && (
                  <tr>
                    <td colSpan={3}>कोई मेल खाने वाला सम्मेलन कार्यक्रम नहीं मिला।</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section band--paper fibre" id="indian-languages" aria-labelledby="indian-prog-title">
        <div className="container split">
          <div className="split-copy">
            <h2 id="indian-prog-title">भारतीय भाषाओं के नए कार्यक्रम</h2>
            <p className="lead">Indian Languages Other Programs के तहत बहुभाषी साहित्य, अनुवाद और क्षेत्रीय भाषा संरक्षण पहल।</p>
            <ul className="ledger">
              {indList.map((prog) => (
                <li className="ledger-row" key={prog.id}>
                  <span className="ledger-index">{prog.category}</span>
                  <span className="ledger-title">{prog.title}</span>
                  <span className="ledger-desc">{prog.description}</span>
                </li>
              ))}
            </ul>
            <p>आगामी तिथि एवं आयोजन स्थान: <span className="fill" data-fill="program-schedule">{programsData.scheduleSlot}</span></p>
          </div>

          <div className="split-media">
            <figure className="photo photo--split" data-slot="programs-photo" data-alt="खुली पुस्तक और साहित्य अध्ययन का चित्र">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Open_Book_b%26w.jpg/1280px-Open_Book_b%26w.jpg"
                sizes="(min-width: 60rem) 50vw, 100vw"
                width="2256"
                height="1504"
                style={{ objectPosition: '50% 60%' }}
                loading="lazy"
                alt="खुली हुई पुस्तक के मुड़े हुए पृष्ठ"
              />
            </figure>
          </div>
        </div>
      </section>
    </Layout>
  );
}
