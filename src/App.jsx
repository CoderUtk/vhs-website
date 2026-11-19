import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProgramsPage from './pages/ProgramsPage';
import PublicationsPage from './pages/PublicationsPage';
import BhashaRakshakPage from './pages/BhashaRakshakPage';
import GalleryPage from './pages/GalleryPage';

export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
