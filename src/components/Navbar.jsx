// ============================================
// Navbar — Sticky Glassmorphic Navigation (Tailwind v4)
// ============================================

import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiPhone, FiLock } from 'react-icons/fi';
import { navigationLinks, companyInfo } from '../data/siteData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? 'glass-effect bg-white/95 border-gray-100 shadow-sm py-4'
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-[1.02]">
              <img
                src="/images/brand/logo.png"
                alt="RASC Trading Logo"
                className="h-10 w-auto object-contain animate-heartbeat"
              />
              <span className="font-semibold text-lg tracking-tight text-gray-900">
                RASC <span className="font-light text-gray-500">Trading</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {navigationLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-all duration-300 relative py-1.5 group ${
                      isActive ? 'text-gray-900 font-semibold' : 'text-gray-600 hover:text-gray-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span
                        className={`absolute -bottom-0.5 left-0 h-[2px] bg-gray-900 transition-all duration-300 group-hover:w-full ${
                          isActive ? 'w-full' : 'w-0'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-5">
              <Link
                to="/admin"
                className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-wider"
              >
                <FiLock className="text-gray-400" />
                Portal
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 hover:scale-105 hover:shadow-md bg-gray-900 text-white hover:bg-gray-800"
              >
                Get a Quote
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2.5 rounded-xl transition-all duration-200 hover:bg-gray-100 text-gray-700"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden border-t border-gray-100 mt-4 pt-4 pb-6 space-y-4"
              >
                {navigationLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block text-base font-medium transition-colors py-2 ${
                        isActive ? 'text-gray-900 font-semibold' : 'text-gray-600 hover:text-gray-900'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <div className="pt-4 border-t border-gray-100 flex flex-col gap-4">
                  <Link
                    to="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-gray-900 text-white shadow-sm"
                  >
                    Get a Quote
                  </Link>
                  <a
                    href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
                    className="flex items-center justify-center gap-2 text-sm text-gray-600 py-2"
                  >
                    <FiPhone className="text-gray-400" />
                    {companyInfo.phone}
                  </a>
                  <Link
                    to="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="text-center text-xs text-gray-400 hover:text-gray-600 py-1"
                  >
                    Admin Portal Login
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>
    </>
  );
}
