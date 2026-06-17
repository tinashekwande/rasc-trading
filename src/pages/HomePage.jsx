// ============================================
// HomePage — Premium Zenith Landing Page (Tailwind v4)
// ============================================

import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPhone } from 'react-icons/fi';

// Components
import HeroSection from '../components/HeroSection';
import StatsBar from '../components/StatsBar';
import ServiceCard from '../components/ServiceCard';
import ProjectCard from '../components/ProjectCard';
import ProcessTimeline from '../components/ProcessTimeline';
import TestimonialCarousel from '../components/TestimonialCarousel';
import ClientLogos from '../components/ClientLogos';
import ContactForm from '../components/ContactForm';
import Lightbox from '../components/Lightbox';
import SEO from '../components/SEO';
import OptimizedImage from '../components/OptimizedImage';

// Data
import { services, projects, companyInfo } from '../data/siteData';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0 },
};

export default function HomePage() {
  const featuredServices = services.slice(0, 6);
  const [dynamicProjects, setDynamicProjects] = useState([]);

  // Fetch projects
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
        console.error('Failed to fetch home page projects:', err);
      }
    };
    fetchProjects();
  }, []);

  const activeProjectsList = dynamicProjects.length > 0 ? dynamicProjects : projects;
  const featuredProjects = activeProjectsList.slice(0, 6);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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
      className="bg-transparent min-h-screen"
    >
      <SEO
        title="Premium Construction, Roofing & Renovations South Africa"
        description="NHBRC registered home builders and commercial contractors in South Africa. Over 35 years of experience in structural construction, roof installations, building alterations, and office white boxing."
        canonical="/"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "HomeAndConstructionBusiness",
            "name": "RASC Trading (Pty) Ltd",
            "alternateName": "Rocky and Son's Construction",
            "image": "https://rasctrading.co.za/images/brand/logo.png",
            "@id": "https://rasctrading.co.za/#organization",
            "url": "https://rasctrading.co.za",
            "telephone": "+27833186161",
            "priceRange": "$$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "South Africa",
              "addressLocality": "Durban",
              "addressRegion": "KwaZulu-Natal",
              "addressCountry": "ZA"
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "07:00",
                "closes": "17:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "08:00",
                "closes": "13:00"
              }
            ],
            "areaServed": {
              "@type": "Place",
              "name": "South Africa"
            },
            "knowsAbout": [
              "Construction Services",
              "Home Building & Extensions",
              "Office Fit-Outs & White Boxing",
              "Ceilings & Partitions Installation",
              "Plumbing, Drainage & Alterations",
              "Roofing, Trusses & Waterproofing",
              "Nutec Housing Solutions",
              "Bathroom Tiling & Renovations"
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "RASC Trading",
            "url": "https://rasctrading.co.za",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://rasctrading.co.za/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        ]}
      />
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Stats Bar */}
      <StatsBar />

      {/* 3. Client Logos */}
      <ClientLogos />

      {/* 4. About Story Preview */}
      <section className="bg-gray-50/50 py-24 px-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Frame */}
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-gray-100 border border-gray-100 shadow-sm">
            <OptimizedImage
              src="/images/about/about-1.jpg"
              alt="RASC Trading Construction team at work"
              width={800}
              height={600}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
            />
          </div>

          {/* Story Copy */}
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 bg-gray-100 text-gray-600 uppercase tracking-wider">
              Who We Are
            </div>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-gray-900 leading-[1.1]">
              Over 3 Decades of <span className="font-semibold">Bespoke Building</span>
            </h2>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-4">
              Rocky and Son&apos;s is a privately owned and managed construction company. 
              The business was conceived in 1990 as a Sole Proprietor and developed into a (Pty)Ltd in 2022, 
              meeting the growing demands and high quality needs of the construction industry.
            </p>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-8">
              We operate as a fully independent building contractor providing premium services. 
              From new residential builds to complex office white-boxing, our experience ensures 
              your construction is executed on budget and built to last.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-primary text-white hover:bg-primary-hover transition-all hover:scale-105 hover:shadow-md"
            >
              Learn More About Us <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Services Preview */}
      <section className="bg-transparent py-24 px-6 border-b border-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 bg-gray-50 border border-gray-100 text-gray-600 uppercase tracking-wider">
              Our Expertise
            </div>
            <h2 className="text-4xl font-light tracking-tight mb-4 text-gray-900">
              Premium Construction <span className="font-semibold">Services</span>
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              We combine decades of experience with modern methods to provide complete commercial 
              and residential building solutions.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>

          {/* View All Services Footer */}
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-primary text-white hover:bg-primary-hover transition-all hover:scale-105 hover:shadow-md"
            >
              View All Services <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Featured Projects Gallery */}
      <section className="bg-gray-50/50 py-24 px-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 bg-gray-100 text-gray-600 border border-gray-200 uppercase tracking-wider">
              Portfolio
            </div>
            <h2 className="text-4xl font-light tracking-tight mb-4 text-gray-900">
              Featured building <span className="font-semibold">Masterpieces</span>
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Explore some of our finest developments spanning high-end residential, white boxing, and structural roofing.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => openLightbox(index)}
              />
            ))}
          </div>

          {/* View All Projects Button */}
          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-primary text-white hover:bg-primary-hover transition-all hover:scale-105 hover:shadow-md"
            >
              View Complete Gallery <FiArrowRight />
            </Link>
          </div>
        </div>

        {/* Project Lightbox */}
        <Lightbox
          images={featuredProjects.map((p) => ({
            src: p.image,
            alt: p.title,
            caption: p.title,
          }))}
          isOpen={lightboxOpen}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={setLightboxIndex}
        />
      </section>

      {/* 6. Process Timeline */}
      <ProcessTimeline />

      {/* 7. Testimonials */}
      <TestimonialCarousel />

      {/* 8. Full Width Call to Action Banner */}
      <section className="bg-gray-950 text-white py-20 px-6 relative overflow-hidden text-center">
        {/* Subtle overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-gray-900 pointer-events-none opacity-40" />
        <div className="relative max-w-4xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white leading-tight">
            Ready to Build Your <span className="font-semibold">Dream Project?</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Let&apos;s construct something exceptional together. Fill out our detailed questionnaire or contact our South African estimation team directly.
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

      {/* 10. Quick Contact */}
      <section className="bg-transparent py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Contact Details Copy */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 bg-gray-50 border border-gray-100 text-gray-600 uppercase tracking-wider">
              Get In Touch
            </div>
            <h2 className="text-4xl font-light tracking-tight mb-6 text-gray-900">
              Start Your <span className="font-semibold">Building Journey</span>
            </h2>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-8">
              Whether you need to request a quote, query a site blueprint, or consult on material estimates, 
              our directors are available to discuss details.
            </p>
            {/* Quick Contact Box */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm w-full sm:w-auto">
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center">
                <FiPhone size={20} />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Direct Line
                </span>
                <a
                  href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
                  className="block text-sm font-semibold text-gray-900 mt-0.5"
                >
                  {companyInfo.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Compact Form Panel */}
          <div className="lg:col-span-7 bg-white p-6 md:p-10 border border-gray-100 rounded-3xl shadow-sm w-full">
            <ContactForm />
          </div>
        </div>
      </section>
    </motion.div>
  );
}
