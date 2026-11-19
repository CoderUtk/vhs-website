import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import AccordionGallery from '../components/reactbits/AccordionGallery';
import Masonry from '../components/reactbits/Masonry';
import galleryData from '../data/gallery.json';

export default function GalleryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = useMemo(() => {
    const set = new Set(galleryData.photos.map((p) => p.category));
    return ['सभी', ...Array.from(set)];
  }, []);

  const paramCat = searchParams.get('category');
  const category = paramCat && categories.includes(paramCat) ? paramCat : 'सभी';

  const setCategory = (cat) => {
    if (cat === 'सभी') setSearchParams({}, { replace: true });
    else setSearchParams({ category: cat }, { replace: true });
  };

  const filteredPhotos = useMemo(
    () =>
      category === 'सभी'
        ? galleryData.photos
        : galleryData.photos.filter((p) => p.category === category),
    [category]
  );

  const accordionItems = galleryData.photos.slice(0, 5).map((p) => ({
    image: p.image,
    label: p.title,
    link: '#masonry-grid'
  }));

  const masonryItems = filteredPhotos.map((p) => ({
    id: p.id,
    img: p.image,
    width: p.width,
    height: p.height,
    title: p.title,
    alt: p.title,
    description: p.caption
  }));

  const credits = (
    <>
      Photographs:{' '}
      <a href="https://commons.wikimedia.org/wiki/File:Tianjin_Grand_Theater_Concert_Hall.jpg">北京驱动文化传媒有限公司</a> (CC BY-SA 3.0),{' '}
      <a href="https://commons.wikimedia.org/wiki/File:13-11-02-olb-by-RalfR-03.jpg">Ralf Roletschek</a> (CC BY 3.0),{' '}
      <a href="https://commons.wikimedia.org/wiki/File:Fountain_pen_writing_(literacy).jpg">Petar Milošević</a> (CC BY-SA 4.0),{' '}
      <a href="https://commons.wikimedia.org/wiki/File:Wood_Type_close-up.jpg">Adam Lusch</a> (CC BY-SA 2.0),{' '}
      <a href="https://commons.wikimedia.org/wiki/File:Old_Books_01.JPG">Ch. Maderthoner</a> (CC0),{' '}
      <a href="https://commons.wikimedia.org/wiki/File:Interior_of_Cantys_Bookshop_July_2022.jpg">Nick-D</a> (CC BY-SA 4.0, Wikimedia Commons)
    </>
  );

  return (
    <Layout credits={credits}>
      <section className="hero hero--banner" aria-labelledby="gallery-title">
        <div className="container">
          <div className="hero-copy">
            <h1 id="gallery-title">फोटो गैलरी (Photo Gallery)</h1>
            <p className="lead">साहित्यिक संगोष्ठी, ग्रंथागार और मुद्रण धरोहर के छायाचित्र। किसी भी चित्र पर क्लिक कर के बड़ा दृश्य (Lightbox) खोलें।</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="highlight-gallery-title">
        <div className="container">
          <div className="section-head">
            <h2 id="highlight-gallery-title">प्रमुख छायाचित्र झलक</h2>
            <p className="lead">चित्रों पर कर्सर ले जाकर या क्लिक कर के विस्तृत पैनल खोलें।</p>
          </div>

          <AccordionGallery
            className="vhs-accordion"
            items={accordionItems}
            defaultIndex={1}
            accentColor="#2b45a8"
            overlayColor="#2a1f18"
            textColor="#f5efe6"
            height={400}
            gap={10}
            radius={2}
            grayscale={false}
          />
        </div>
      </section>

      <section className="section--roomy band--paper" id="masonry-grid" aria-labelledby="gallery-grid-title">
        <div className="container">
          <div className="section-head">
            <h2 id="gallery-grid-title">आयोजन एवं सांस्कृतिक छायाचित्र</h2>
            <p className="lead">श्रेणी चुनें तथा किसी भी चित्र पर क्लिक कर के लाइटबॉक्स दृश्य देखें।</p>
          </div>

          <div className="seg" role="tablist" aria-label="गैलरी श्रेणियां">
            {categories.map((cat) => (
              <button
                key={cat}
                className="tab"
                role="tab"
                type="button"
                aria-selected={category === cat}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <Masonry
            className="vhs-masonry"
            items={masonryItems}
            columns="auto"
            columnWidth={340}
            gap={24}
            radius={2}
            hoverEffect="lift"
            captions="always"
            lightbox={true}
            draggable={false}
            revealOnScroll={false}
          />
        </div>
      </section>
    </Layout>
  );
}
