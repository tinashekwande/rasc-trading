// ============================================
// HeroSection — Premium Zenith Split-Layout Hero
// ============================================

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiCalendar, FiMaximize, FiLayers, FiCompass, FiShield, FiHeart } from 'react-icons/fi';
import { projects } from '../data/siteData';

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showcaseProjects, setShowcaseProjects] = useState(projects);

  // Fetch projects from the gallery API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data && json.data.length > 0) {
            setShowcaseProjects(json.data);
          }
        }
      } catch (err) {
        console.error('Failed to fetch hero projects:', err);
      }
    };
    fetchProjects();
  }, []);

  // Auto sliding every 4 seconds
  useEffect(() => {
    if (showcaseProjects.length === 0) return;
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % showcaseProjects.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [showcaseProjects.length]);

  const activeProject = showcaseProjects[currentImageIndex % showcaseProjects.length] || null;

  const getProjectSpecs = (project) => {
    if (!project) return { size: '3,000', unit: 'sq ft', detail: '3 Bedrooms', rating: 'Certified' };
    if (project.specs) return project.specs;
    
    const id = project.id || 1;
    const categoryLower = project.category?.toLowerCase() || '';
    
    if (categoryLower.includes('commercial')) {
      return {
        size: `${((id * 1500) % 8000) + 4000}`,
        unit: 'sq ft',
        detail: 'Office Spaces',
        rating: 'Premium Spec'
      };
    } else if (categoryLower.includes('renovation')) {
      return {
        size: `${((id * 800) % 2500) + 1200}`,
        unit: 'sq ft',
        detail: 'Bespoke Fit',
        rating: 'Modern Style'
      };
    } else {
      // Residential / default
      return {
        size: `${((id * 1000) % 3500) + 2000}`,
        unit: 'sq ft',
        detail: `${(id % 3) + 3} Bedrooms`,
        rating: 'NHBRC Certified'
      };
    }
  };

  const specs = getProjectSpecs(activeProject);

  return (
    <section className="relative overflow-hidden pt-28 min-h-screen flex items-center bg-transparent">
      {/* Background Dots Pattern */}
      <div className="absolute inset-0 pattern-dots opacity-20 pointer-events-none" />

      {/* Subtle Background Radial Gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-full -translate-y-20 translate-x-20 opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full">
        {/* Left Column: Copy & CTAs */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-start"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full text-xs font-semibold mb-8 bg-gray-50 border border-gray-100 text-gray-700 shadow-sm">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            EST. 1990 &bull; NHBRC CERTIFIED BUILDER
          </div>

          {/* Large Serif Title */}
          <h1 className="sm:text-7xl lg:text-8xl text-5xl leading-[0.9] tracking-tighter font-light mb-8 text-gray-900">
            <span className="text-gradient font-extralight block">Building Excellence.</span>
            <span className="font-semibold block mt-1">Transforming Spaces.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg font-light leading-relaxed text-gray-600 max-w-xl mb-10">
            South Africa&apos;s premier independent contractor delivering bespoke residential builds, 
            luxury commercial fit-outs, and world-class structural renovations engineered for longevity.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl bg-primary text-white hover:bg-primary-hover"
            >
              Get in Touch
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-gray-200 font-medium transition-all duration-300 hover:shadow-md hover:scale-105 bg-white text-gray-700 hover:bg-gray-50"
            >
              View Our Portfolio
            </Link>
          </div>

          {/* Symmetrical Stats Section */}
          <div className="grid grid-cols-3 gap-8 border-t border-gray-100 pt-8 w-full max-w-md">
            <div>
              <div className="text-2xl font-semibold text-gray-900 mb-1">35+</div>
              <div className="text-xs text-gray-500 font-medium tracking-wide uppercase">Years Exp</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-gray-900 mb-1">500+</div>
              <div className="text-xs text-gray-500 font-medium tracking-wide uppercase">Projects</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-gray-900 mb-1">100%</div>
              <div className="text-xs text-gray-500 font-medium tracking-wide uppercase">Satisfaction</div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Sliding Project Card & Floating Widgets */}
        <motion.div
          className="lg:col-span-5 relative flex justify-center lg:justify-end w-full"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative w-full max-w-[420px] lg:max-w-none">
            {/* Main Project Card */}
            <div className="relative rounded-3xl shadow-xl p-6 md:p-8 gradient-border overflow-hidden floating min-h-[480px] flex flex-col justify-between">
              {/* Sliding Image Background */}
              <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-full object-cover rounded-3xl"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6 }}
                  />
                </AnimatePresence>
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/35 z-10 rounded-3xl" />
              </div>

              {/* Overlaid Card Interior */}
              <div className="relative z-20 flex flex-col h-full justify-between w-full">
                <div>
                  {/* Category tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md border border-white/10 text-white">
                      {activeProject.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 border border-green-500/20 text-green-300">
                      Sustainable
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary text-white">
                      Featured
                    </span>
                  </div>

                  {/* Title & Stats */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight text-white mb-1">
                        {activeProject.title}
                      </h3>
                      <p className="text-xs text-white/70 font-medium uppercase tracking-wider">
                        High-End Construction Scope
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  {/* Specs Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="text-center p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                      <div className="flex items-center justify-center gap-1 text-xs font-bold text-white mb-0.5">
                        <FiMaximize className="text-white/80" />
                        {specs.size}
                      </div>
                      <p className="text-[10px] text-white/60 uppercase font-semibold">{specs.unit}</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                      <div className="flex items-center justify-center gap-1 text-xs font-bold text-white mb-0.5">
                        <FiLayers className="text-white/80" />
                        {specs.detail.split(' ')[0]}
                      </div>
                      <p className="text-[10px] text-white/60 uppercase font-semibold">
                        {specs.detail.split(' ').slice(1).join(' ')}
                      </p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-green-500/20 backdrop-blur-md border border-green-500/20">
                      <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-green-300 mb-0.5">
                        <FiShield className="text-green-300" />
                        {specs.rating.split(' ')[0]}
                      </div>
                      <p className="text-[10px] text-green-300 uppercase font-semibold">
                        {specs.rating.split(' ').slice(1).join(' ') || 'Certified'}
                      </p>
                    </div>
                  </div>

                  {/* View details button */}
                  <Link
                    to="/projects"
                    className="block text-center w-full py-3 px-4 rounded-xl bg-primary text-white font-medium text-sm transition-all duration-200 hover:bg-primary-hover hover:shadow-md"
                  >
                    View Project Details
                  </Link>
                </div>
              </div>
            </div>


            {/* Bounce element background */}
            <div className="absolute top-1/2 -left-6 w-5 h-5 bg-gradient-to-br from-green-200 to-green-300 rounded-full animate-bounce opacity-70 pointer-events-none hidden sm:block" />
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5">
        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest animate-pulse">
          Scroll Down
        </span>
        <button
          onClick={() => {
            const statsBar = document.getElementById('stats-bar');
            if (statsBar) {
              if (window.lenisInstance) {
                window.lenisInstance.scrollTo(statsBar);
              } else {
                statsBar.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }}
          className="p-2 rounded-full border border-gray-200 bg-white/80 backdrop-blur-xs shadow-xs hover:shadow-md hover:scale-110 transition-all text-gray-500 hover:text-gray-900 cursor-pointer animate-bounce"
          aria-label="Scroll down to stats bar"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
