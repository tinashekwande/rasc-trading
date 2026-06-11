// ============================================
// Footer — Modern Premium Dark Footer (Tailwind v4)
// ============================================

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFacebook, FiPhone, FiMail, FiMapPin, FiArrowUp } from 'react-icons/fi';
import { companyInfo, navigationLinks, services } from '../data/siteData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Show top 6 services in footer
  const footerServices = services.slice(0, 6);

  return (
    <footer className="relative bg-gray-950 text-gray-400 border-t border-gray-900 pt-16">
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="absolute top-0 right-8 md:right-16 -translate-y-1/2 h-11 w-11 rounded-full flex items-center justify-center bg-primary text-white border border-gray-800 hover:bg-primary-hover hover:border-gray-700 hover:scale-105 transition-all shadow-lg cursor-pointer"
        aria-label="Scroll to top"
      >
        <FiArrowUp size={18} />
      </button>

      {/* Decorative top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gray-800 to-transparent" />

      <motion.div
        className="max-w-7xl mx-auto px-6 lg:px-8 pb-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Info */}
          <motion.div variants={childVariants} className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/images/brand/logo.png"
                alt="RASC Trading Logo"
                className="h-10 w-auto object-contain animate-heartbeat"
              />
              <span className="font-semibold text-lg tracking-tight text-white">
                RASC <span className="font-light text-gray-500">Trading</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500">
              {companyInfo.description}
            </p>
            {/* NHBRC Certificate Info */}
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-gray-900/50 border border-gray-900 w-fit">
              <img
                src="/images/brand/nhbrc-badge.jpg"
                alt="NHBRC Certification Badge"
                className="h-12 w-12 rounded-lg object-cover"
              />
              <div>
                <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  NHBRC Registered
                </span>
                <span className="block text-xs font-semibold text-white mt-0.5">
                  Ref No: {companyInfo.nhbrc}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={childVariants} className="lg:col-span-2">
            <h4 className="font-semibold text-white text-xs tracking-widest uppercase mb-6">
              Navigation
            </h4>
            <ul className="space-y-3.5">
              {navigationLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-500 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services list */}
          <motion.div variants={childVariants} className="lg:col-span-3">
            <h4 className="font-semibold text-white text-xs tracking-widest uppercase mb-6">
              Services
            </h4>
            <ul className="space-y-3.5">
              {footerServices.map((svc) => (
                <li key={svc.id}>
                  <Link
                    to="/services"
                    className="text-sm text-gray-500 hover:text-white transition-colors duration-200"
                  >
                    {svc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact details */}
          <motion.div variants={childVariants} className="lg:col-span-3 space-y-6">
            <h4 className="font-semibold text-white text-xs tracking-widest uppercase mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-3 text-sm text-gray-500 hover:text-white transition-colors"
                >
                  <FiPhone className="text-gray-600" />
                  {companyInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="inline-flex items-center gap-3 text-sm text-gray-500 hover:text-white transition-colors"
                >
                  <FiMail className="text-gray-600" />
                  {companyInfo.email}
                </a>
              </li>
              <li className="inline-flex items-start gap-3 text-sm text-gray-500">
                <FiMapPin className="text-gray-600 mt-1 flex-shrink-0" />
                <span>{companyInfo.location}</span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="pt-2">
              <a
                href={companyInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-gray-900 text-gray-500 hover:text-white hover:bg-primary transition-all"
                aria-label="Facebook"
              >
                <FiFacebook size={16} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom copyright details */}
        <div className="border-t border-gray-900 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <p>&copy; {currentYear} RASC Trading (Pty) Ltd. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <span className="text-red-800">❤️</span> in South Africa
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
