// ============================================
// ServicesPage — Premium Services Grid & Details Modal (Tailwind v4)
// ============================================

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheckCircle, FiPhone, FiArrowRight } from 'react-icons/fi';

import ServiceCard from '../components/ServiceCard';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import OptimizedImage from '../components/OptimizedImage';
import { services, companyInfo } from '../data/siteData';
import { getServiceImage } from '../utils/imageMapper';

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0 },
};

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [dynamicProjects, setDynamicProjects] = useState(null);

  // Fetch projects from the Express API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setDynamicProjects(json.data);
            return;
          }
        }
        setDynamicProjects([]);
      } catch (err) {
        console.error('Failed to fetch projects for services page:', err);
        setDynamicProjects([]);
      }
    };
    fetchProjects();
  }, []);

  const activeProjectsList = dynamicProjects !== null ? dynamicProjects : [];

  const dynamicServices = services.map(service => ({
    ...service,
    image: getServiceImage(service.id, activeProjectsList)
  }));

  // Resolve selected service dynamically to use the updated image when modal opens
  const activeSelectedService = selectedService
    ? dynamicServices.find(s => s.id === selectedService.id)
    : null;

  // Prevent scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedService ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedService]);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rasctrading.co.za/" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://rasctrading.co.za/services" }
    ]
  };

  const serviceSchema = selectedService ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": selectedService.title,
    "description": selectedService.description,
    "provider": {
      "@type": "HomeAndConstructionBusiness",
      "name": "RASC Trading (Pty) Ltd",
      "url": "https://rasctrading.co.za"
    },
    "areaServed": {
      "@type": "Place",
      "name": "South Africa"
    }
  } : null;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-transparent min-h-screen pt-20"
    >
      <SEO
        title="Bespoke Construction Services, Ceilings & Plumbing"
        description="Complete construction services including home alterations, turnkey office fit-outs, suspended ceilings, partition walls, plumbing alterations, waterproofing, and structural roofing."
        canonical="/services"
        structuredData={[breadcrumbSchema, serviceSchema].filter(Boolean)}
      />
      {/* ── Page Hero ── */}
      <section className="relative h-[320px] md:h-[400px] flex items-center justify-center overflow-hidden bg-gray-950 text-white">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40" style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-transparent" />
        <div className="relative z-10 text-center max-w-xl px-6">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            Our Services
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }]} />
          </motion.div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="py-24 px-6 bg-transparent">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 bg-gray-50 border border-gray-100 text-gray-600 uppercase tracking-wider">
              Full Portfolio
            </div>
            <h2 className="text-4xl font-light tracking-tight mb-4 text-gray-900">
              Complete Building <span className="font-semibold">Solutions</span>
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              We provide complete turnkey building services, managing everything from council registration 
              to architectural finishing. Click a card to read full scope specifications.
            </p>
          </div>

          {/* Grid of 13 items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dynamicServices.map((svc, idx) => (
              <ServiceCard
                key={svc.id}
                service={svc}
                index={idx}
                onClick={() => setSelectedService(svc)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Turnkey Services Scope Modals ── */}
      <AnimatePresence>
        {selectedService && activeSelectedService && (
          <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            {/* Backdrop close link trigger */}
            <div
              className="absolute inset-0 cursor-pointer"
              onClick={() => setSelectedService(null)}
            />

            {/* Modal Body */}
            <motion.div
              className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col my-8 max-h-[85vh] z-10"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button overlay */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 h-9 w-9 rounded-full flex items-center justify-center bg-white border border-gray-150 text-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm cursor-pointer z-20"
                aria-label="Close"
              >
                <FiX size={18} />
              </button>

              {/* Image Frame */}
              <div className="relative aspect-[21/9] bg-gray-50 border-b border-gray-100 overflow-hidden">
                <OptimizedImage
                  src={activeSelectedService.image}
                  alt={activeSelectedService.title}
                  width={840}
                  height={360}
                  className="w-full h-full object-cover"
                  priority={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Scrollable details */}
              <div className="p-6 md:p-10 overflow-y-auto space-y-6">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                    Scope of Service
                  </span>
                  <h2 className="font-semibold text-2xl md:text-3xl text-gray-900">
                    {activeSelectedService.title}
                  </h2>
                </div>

                <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                  {activeSelectedService.description}
                </p>

                {/* Specific features checklist */}
                {activeSelectedService.features && activeSelectedService.features.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Standard Inclusions
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {activeSelectedService.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                          <FiCheckCircle className="text-primary flex-shrink-0" size={15} />
                          <span className="font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Request redirection button */}
                <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/contact"
                    onClick={() => setSelectedService(null)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold bg-primary text-white hover:bg-primary-hover transition-colors shadow-xs w-full sm:w-auto"
                  >
                    Request Estimate <FiArrowRight size={13} />
                  </Link>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-gray-250 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors w-full sm:w-auto cursor-pointer"
                  >
                    Close Specifications
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
