import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProgramsPage = lazy(() => import('./pages/ProgramsPage'));
const PublicationsPage = lazy(() => import('./pages/PublicationsPage'));
const BhashaRakshakPage = lazy(() => import('./pages/BhashaRakshakPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="container section">लोड हो रहा है…</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/index.html" element={<Navigate to="/" replace />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about.html" element={<Navigate to="/about" replace />} />
          <Route path="/karyakram" element={<ProgramsPage />} />
          <Route path="/karyakram.html" element={<Navigate to="/karyakram" replace />} />
          <Route path="/prakashan" element={<PublicationsPage />} />
          <Route path="/prakashan.html" element={<Navigate to="/prakashan" replace />} />
          <Route path="/bhasha-rakshak" element={<BhashaRakshakPage />} />
          <Route path="/bhasha-rakshak.html" element={<Navigate to="/bhasha-rakshak" replace />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/gallery.html" element={<Navigate to="/gallery" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
