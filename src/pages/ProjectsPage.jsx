// ============================================
// ProjectsPage — Filterable Masonry Portfolio (Tailwind v4)
// ============================================

import { useState, useCallback, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPhone, FiArrowRight } from 'react-icons/fi';

import ProjectCard from '../components/ProjectCard';
import Lightbox from '../components/Lightbox';
import { projects, projectCategories, companyInfo } from '../data/siteData';

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0 },
};

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [dynamicProjects, setDynamicProjects] = useState([]);

  // Fetch projects from the Express API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setDynamicProjects(json.data);
          }
        }
      } catch (err) {
        console.error('Failed to fetch projects from server:', err);
      }
    };
    fetchProjects();
  }, []);

  const activeProjectsList = dynamicProjects.length > 0 ? dynamicProjects : projects;

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return activeProjectsList;
    return activeProjectsList.filter((p) => p.category === activeFilter);
  }, [activeFilter, activeProjectsList]);

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-transparent min-h-screen pt-20"
    >
      {/* ── Page Hero ── */}
      <section className="relative h-[320px] md:h-[400px] flex items-center justify-center overflow-hidden bg-gray-950 text-white">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-45" style={{ backgroundImage: 'url(/images/projects/project-1.jpg)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-transparent" />
        <div className="relative z-10 text-center max-w-xl px-6">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            Our Work
          </motion.h1>
          <motion.nav
            className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-gray-600">/</span>
            <span>Projects</span>
          </motion.nav>
        </div>
      </section>

      {/* ── Main Portfolio Area ── */}
      <section className="py-24 px-6 bg-transparent">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 bg-gray-50 border border-gray-100 text-gray-600 uppercase tracking-wider">
              Completed Works
            </div>
            <h2 className="text-4xl font-light tracking-tight mb-4 text-gray-900">
              Architectural <span className="font-semibold">Showcase</span>
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Explore our record of completions spanning South Africa. Use the filters below 
              to display developments by building category. Click any project to open the gallery.
            </p>
          </div>

          {/* Symmetrical Category Filters with Scroll Support */}
          <div className="flex items-center justify-start md:justify-center gap-2 mb-12 pb-4 overflow-x-auto whitespace-nowrap scrollbar-none">
            {projectCategories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-white border-gray-200 text-gray-500 hover:text-gray-950 hover:border-gray-300'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <motion.div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8" layout>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                >
                  <ProjectCard
                    project={project}
                    onClick={() => openLightbox(index)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── Lightbox viewer ── */}
      <Lightbox
        images={filteredProjects.map((p) => ({
          src: p.image,
          alt: p.title,
          caption: p.title,
          category: p.category,
        }))}
        isOpen={lightboxOpen}
        currentIndex={lightboxIndex}
        onClose={closeLightbox}
        onNavigate={setLightboxIndex}
      />

      {/* ── Symmetrical CTA banner ── */}
      <section className="bg-gray-950 text-white py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-gray-900 pointer-events-none opacity-40" />
        <div className="relative max-w-4xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white leading-tight">
            Ready to Build Your <span className="font-semibold">Next Project?</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Get in touch with our team today. We provide cost estimates, timeline scheduling, and design consults.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg bg-white text-gray-900 hover:bg-gray-100 w-full sm:w-auto justify-center"
            >
              Get a Free Quote
            </Link>
            <a
              href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-gray-800 text-xs font-semibold hover:bg-primary hover:border-primary hover:scale-105 transition-all w-full sm:w-auto justify-center"
            >
              <FiPhone /> Call {companyInfo.phone}
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
