import { useState } from 'react';
import Layout from '../components/Layout';
import Folder from '../components/reactbits/Folder';
import publicationsData from '../data/publications.json';

export default function PublicationsPage() {
  const [selectedDoc, setSelectedDoc] = useState('');

  const credits = (
    <>
      Photographs:{' '}
      <a href="https://commons.wikimedia.org/wiki/File:Old_Books_01.JPG">Ch. Maderthoner</a> (CC0),{' '}
      <a href="https://commons.wikimedia.org/wiki/File:Wood_Type_close-up.jpg">Adam Lusch</a> (CC BY-SA 2.0, Wikimedia Commons)
    </>
  );

  return (
    <Layout credits={credits}>
      <section className="hero hero--banner" aria-labelledby="pub-title">
        <div className="container">
          <div className="hero-copy">
            <h1 id="pub-title">नवीनतम भाषा सामग्री एवं प्रकाशन</h1>
            <p className="lead">भाषा संसाधन (Latest Language Material), पुस्तक व पत्रिका (Latest Books / Magazine) और पत्र-पत्रिका कतरन संग्रह।</p>
            <div className="hero-actions">
              <a className="btn btn--primary" href="#samagri">नवीनतम भाषा सामग्री</a>
              <a className="btn" href="#books">नवीनतम पुस्तक/पत्रिका</a>
              <a className="btn" href="#cuttings">पत्र-पत्रिका कतरन</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section--roomy" id="samagri" aria-labelledby="samagri-title">
        <div className="container">
          <div className="section-head">
            <h2 id="samagri-title">नवीनतम भाषा सामग्री (Latest Language Material)</h2>
            <p className="lead">शिक्षण, प्रशासनिक प्रयोग, देवनागरी मानकीकरण और भाषा संवाद से जुड़े संकलित संसाधन।</p>
          </div>

          <ul className="ledger">
            {publicationsData.materials.map((item) => (
              <li className="ledger-row" key={item.id}>
                <span className="ledger-index">{item.code}</span>
                <span className="ledger-title">{item.title}</span>
                <span className="ledger-desc">{item.description}</span>
                <span className="ledger-index">{item.type}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section band--paper fibre" id="books" aria-labelledby="books-title">
        <div className="container split">
          <div className="split-copy">
            <h2 id="books-title">नवीनतम पुस्तक/पत्रिका (Latest Books / Magazine)</h2>
            <p className="lead">वैश्विक हिंदी सम्मेलन द्वारा प्रकाशित नवीनतम शोध ग्रंथ, स्मारिका और पत्रिका अंक।</p>
            <p>इस खंड में संस्था की मुद्रित एवं डिजिटल पत्रिकाओं, सम्मेलन स्मारिकाओं तथा भाषा चिंतन की पुस्तकों का ब्यौरा संकलित किया जाता है।</p>
            <p>वर्तमान अंक एवं ISBN विवरण: <span className="fill" data-fill="book-catalogue">{publicationsData.bookCatalogueSlot}</span></p>
          </div>

          <div className="split-media">
            <figure className="photo photo--split" data-slot="books-showcase" data-alt="पुस्तकें और पत्रिका अंकों का चित्र">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Old_Books_01.JPG/1280px-Old_Books_01.JPG"
                sizes="(min-width: 60rem) 45vw, 100vw"
                width="2400"
                height="2466"
                loading="lazy"
                alt="सजी हुई चार प्राचीन साहित्यिक पुस्तकें"
              />
            </figure>
          </div>
        </div>

        <div className="container">
          <div className="folder-shelf">
            <div className="folder-slot">
              <Folder
                mode="book"
                variant="solid"
                theme="light"
                color="#2b45a8"
                label="पुस्तक संग्रह"
                size={0.9}
                intro={false}
                draggable={false}
                items={publicationsData.bookFolders}
                onItemClick={(item) => setSelectedDoc(item?.title || '')}
              />
              <span className="folder__caption">पुस्तक एवं स्मारिका संदूक</span>
              <span className="folder__meta">क्लिक कर के प्रकाशित संग्रह देखें</span>
            </div>

            <div className="folder-slot">
              <Folder
                mode="flap"
                variant="solid"
                theme="light"
                color="#6e563d"
                label="पत्र-पत्रिका कतरन"
                size={0.9}
                intro={false}
                draggable={false}
                items={publicationsData.cuttingFolders}
                onItemClick={(item) => setSelectedDoc(item?.title || '')}
              />
              <span className="folder__caption">प्रेस कतरन अभिलेखागार</span>
              <span className="folder__meta">समाचार पत्रों एवं पत्रिकाओं की कतरन</span>
            </div>

            <div className="folder-slot">
              <Folder
                mode="flap"
                variant="solid"
                theme="light"
                color="#4d6082"
                label="भाषा सामग्री"
                size={0.9}
                intro={false}
                draggable={false}
                items={publicationsData.materials.map((m) => ({ title: m.title, meta: m.type }))}
                onItemClick={(item) => setSelectedDoc(item?.title || '')}
              />
              <span className="folder__caption">मानकीकरण एवं शोध प्रलेख</span>
              <span className="folder__meta">प्रलेख चुनने हेतु फोल्डर खोलें</span>
            </div>
          </div>

          {selectedDoc && (
            <p className="caption" role="status" aria-live="polite">
              चयनित संग्रह: <strong>{selectedDoc}</strong>
            </p>
          )}
        </div>
      </section>

      <section className="section--deep" id="cuttings" aria-labelledby="cuttings-title">
        <div className="container split split--reverse">
          <div className="split-media">
            <figure className="photo photo--split" data-slot="press-type" data-alt="मुद्रण और समाचार पत्र अभिलेख का चित्र">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Wood_Type_close-up.jpg/1280px-Wood_Type_close-up.jpg"
                sizes="(min-width: 60rem) 50vw, 100vw"
                width="4714"
                height="3143"
                style={{ objectPosition: '50% 45%' }}
                loading="lazy"
                alt="प्राचीन काष्ठ मुद्रण ब्लॉक के अक्षर"
              />
            </figure>
          </div>

          <div className="split-copy">
            <h2 id="cuttings-title">पत्र-पत्रिका कतरन (Newspaper / Magazine Cuttings)</h2>
            <p className="lead">दैनिक समाचार पत्रों और साप्ताहिक पत्रिकाओं में प्रकाशित सम्मेलन कवरेज एवं भाषा विमर्श।</p>
            <p>राष्ट्रीय तथा क्षेत्रीय समाचार पत्रों में भारतीय भाषाओं, सम्मेलनों और भाषा सेवियों पर प्रकाशित कतरनों का ऐतिहासिक अभिलेखागार यहां संजोया जाता है।</p>
            <p>अभिलेखागार फाइल संदर्भ: <span className="fill" data-fill="press-archive">{publicationsData.pressArchiveSlot}</span></p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
