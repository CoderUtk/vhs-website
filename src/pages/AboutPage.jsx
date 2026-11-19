import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import site from '../data/site.json';

export default function AboutPage() {
  const credits = (
    <>
      Photographs:{' '}
      <a href="https://commons.wikimedia.org/wiki/File:Interior_of_Cantys_Bookshop_July_2022.jpg">Nick-D</a> (CC BY-SA 4.0, Wikimedia Commons)
    </>
  );

  return (
    <Layout credits={credits}>
      <section className="hero hero--banner" aria-labelledby="about-title">
        <div className="container">
          <div className="hero-copy">
            <h1 id="about-title">हमारे बारे में (About Us)</h1>
            <p className="lead">वैश्विक हिंदी सम्मेलन हिंदी और समस्त भारतीय भाषाओं के सांस्कृतिक, शैक्षिक और व्यावहारिक सशक्तीकरण के लिए समर्पित संगठन है।</p>
          </div>
        </div>
      </section>

      <section className="section band--paper fibre" aria-labelledby="mission-title">
        <div className="container">
          <h2 className="visually-hidden" id="mission-title">हमारा संकल्प</h2>
          <p className="statement">मातृभाषा के सम्मान बिना सांस्कृतिक स्वाभिमान अधूरा रहता है; हिंदी और भारतीय भाषाओं का सह-अस्तित्व ही हमारी साझा शक्ति है।</p>
        </div>
      </section>

      <section className="section--roomy" aria-labelledby="pillars-title">
        <div className="container">
          <div className="section-head">
            <h2 id="pillars-title">संगठन के चार प्रमुख आधार</h2>
            <p className="lead">सांस्कृतिक धरोहर और आधुनिक संवाद के बीच सेतु बनाने वाले मुख्य कार्यक्षेत्र।</p>
          </div>

          <ul className="ledger">
            <li className="ledger-row">
              <span className="ledger-index">आधार 01</span>
              <span className="ledger-title">हिंदी का वैश्विक संवाद</span>
              <span className="ledger-desc">देश तथा विदेश में हिंदी शिक्षण, संगोष्ठी और साहित्यिक आदान-प्रदान का विस्तार।</span>
              <Link className="ledger-link" to="/karyakram#vhs">सम्मेलन कार्यक्रम</Link>
            </li>
            <li className="ledger-row">
              <span className="ledger-index">आधार 02</span>
              <span className="ledger-title">भारतीय भाषाओं का समन्वय</span>
              <span className="ledger-desc">सभी भारतीय भाषाओं और बोलियों के बीच अनुवाद, शोध और संयुक्त कार्यक्रम।</span>
              <Link className="ledger-link" to="/karyakram#indian-languages">भाषा कार्यक्रम</Link>
            </li>
            <li className="ledger-row">
              <span className="ledger-index">आधार 03</span>
              <span className="ledger-title">साहित्य एवं प्रेस अभिलेख</span>
              <span className="ledger-desc">पुस्तकों, पत्रिकाओं, भाषा सामग्री तथा पत्र-पत्रिका कतरनों का व्यवस्थित संरक्षण।</span>
              <Link className="ledger-link" to="/prakashan">प्रकाशन देखें</Link>
            </li>
            <li className="ledger-row">
              <span className="ledger-index">आधार 04</span>
              <span className="ledger-title">भाषा रक्षकों का सम्मान</span>
              <span className="ledger-desc">प्रहरी, सेनानी, विश्वदूत, भाषा सेवी और हिंदी के द्वीपों का परिचय एवं सम्मान।</span>
              <Link className="ledger-link" to="/bhasha-rakshak">रक्षक सूची</Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="section band--paper" aria-labelledby="contact-title">
        <div className="container split">
          <div className="split-copy">
            <h2 id="contact-title">संगठन संपर्क विवरण</h2>
            <p className="lead">वैश्विक हिंदी सम्मेलन कार्यालय से संवाद, कार्यक्रम सहभागिता तथा प्रकाशन प्राप्ति के लिए विवरण।</p>
            <p>मुख्यालय पता: <span className="fill" data-fill="address">{site.contact.address}</span></p>
            <p>संपर्क ईमेल एवं दूरभाष: <span className="fill" data-fill="contact">{site.contact.emailPhone}</span></p>
          </div>

          <div className="split-media">
            <figure className="photo photo--split" data-slot="about-photo" data-alt="पुस्तकालय एवं पठन कक्ष का चित्र">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Interior_of_Cantys_Bookshop_July_2022.jpg/1280px-Interior_of_Cantys_Bookshop_July_2022.jpg"
                sizes="(min-width: 60rem) 50vw, 100vw"
                width="4032"
                height="3024"
                loading="lazy"
                alt="ऊंची पुस्तक अलमारियों से सजा अध्ययन कक्ष"
              />
            </figure>
          </div>
        </div>
      </section>
    </Layout>
  );
}
