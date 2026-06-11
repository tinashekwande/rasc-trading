import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

/* ─── Animated Routes Wrapper ──────────────────────────────── */
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public pages wrapped in MainLayout */}
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        {/* Admin — no layout wrapper */}
        <Route path="admin" element={<AdminPage />} />
      </Routes>
    </AnimatePresence>
  );
};

/* ─── App Root ─────────────────────────────────────────────── */
const App = () => {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
};

export default App;
