// ============================================
// ContactPage — Premium Contact Studio (Tailwind v4)
// ============================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiClock, FiArrowRight } from 'react-icons/fi';

import ContactForm from '../components/ContactForm';
import QuoteForm from '../components/QuoteForm';
import { companyInfo } from '../data/siteData';

const ScrollReveal = ({ children, delay = 0, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0 },
};

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState('message');

  const contactDetails = [
    {
      icon: FiPhone,
      label: 'Phone',
      value: companyInfo.phone,
      href: `tel:${companyInfo.phone.replace(/\s/g, '')}`,
    },
    {
      icon: FiMail,
      label: 'Email',
      value: companyInfo.email,
      href: `mailto:${companyInfo.email}`,
    },
    {
      icon: FiMapPin,
      label: 'Office Location',
      value: companyInfo.location || 'South Africa',
      href: null,
    },
    {
      icon: FiClock,
      label: 'Business Hours',
      value: 'Mon – Fri: 7:00 – 17:00\nSat: 8:00 – 13:00',
      href: null,
    },
  ];

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
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-45" style={{ backgroundImage: 'url(/images/about/about-2.jpg)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-transparent" />
        <div className="relative z-10 text-center max-w-xl px-6">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            Get In Touch
          </motion.h1>
          <motion.nav
            className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-gray-600">/</span>
            <span>Contact</span>
          </motion.nav>
        </div>
      </section>

      {/* ── Main Layout ── */}
      <section className="py-24 px-6 bg-transparent">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 bg-gray-50 border border-gray-100 text-gray-600 uppercase tracking-wider">
              Contact Studio
            </div>
            <h2 className="text-4xl font-light tracking-tight mb-4 text-gray-900">
              Start Your <span className="font-semibold">Building Quote</span>
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Fill out our inquiry questionnaire below or contact our office directly. 
              We reply to all scopes and cost estimates within 24 business hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* ── Left Column: Form Tab Slider ── */}
            <ScrollReveal className="lg:col-span-7 space-y-8">
              {/* Tab Selector */}
              <div className="flex gap-2 p-1.5 bg-gray-50 border border-gray-100 rounded-full w-max">
                <button
                  onClick={() => setActiveTab('message')}
                  className={`px-6 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'message'
                      ? 'bg-gray-900 text-white shadow-sm'
                      : 'bg-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Send Message
                </button>
                <button
                  onClick={() => setActiveTab('quote')}
                  className={`px-6 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'quote'
                      ? 'bg-gray-900 text-white shadow-sm'
                      : 'bg-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Request Estimate Quote
                </button>
              </div>

              {/* Form box */}
              <div className="bg-white p-6 md:p-10 border border-gray-100 rounded-3xl shadow-sm">
                {activeTab === 'message' ? <ContactForm /> : <QuoteForm />}
              </div>
            </ScrollReveal>

            {/* ── Right Column: Cards & Map ── */}
            <ScrollReveal delay={0.15} className="lg:col-span-5 space-y-8">
              {/* Cards Grid */}
              <div className="grid grid-cols-1 gap-5">
                {contactDetails.map((detail, idx) => {
                  const Icon = detail.icon;
                  return (
                    <div
                      key={idx}
                      className="flex gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-xs"
                    >
                      <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 text-gray-800 flex items-center justify-center flex-shrink-0 shadow-xs">
                        <Icon size={16} />
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">
                          {detail.label}
                        </span>
                        {detail.href ? (
                          <a
                            href={detail.href}
                            className="block text-sm font-semibold text-gray-900 hover:text-gray-700 transition-colors"
                          >
                            {detail.value}
                          </a>
                        ) : (
                          <p
                            className="text-sm font-semibold text-gray-900 leading-normal"
                            style={{ whiteSpace: 'pre-line' }}
                          >
                            {detail.value}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Maps Frame */}
              <div className="rounded-3xl border border-gray-100 overflow-hidden shadow-sm aspect-video relative">
                <iframe
                  title="RASC Trading Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580000!2d28.0473!3d-26.2041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950c68f0406a51%3A0x238ac9d9b1d34041!2sJohannesburg%2C%20South%20Africa!5e0!3m2!1sen!2s!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Symmetrical CTA banner ── */}
      <section className="bg-gray-950 text-white py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-gray-900 pointer-events-none opacity-40" />
        <div className="relative max-w-4xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white leading-tight">
            Prefer to Talk? Call Our Team
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Our estimating coordinators are available during South African business hours to query blueprints.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg bg-white text-gray-900 hover:bg-gray-100 w-full sm:w-auto justify-center"
            >
              <FiPhone className="mr-1" /> Call {companyInfo.phone}
            </a>
            <a
              href={`mailto:${companyInfo.email}`}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-gray-800 text-xs font-semibold hover:bg-gray-900 hover:scale-105 transition-all w-full sm:w-auto justify-center"
            >
              <FiMail /> Email Estimation
              <FiArrowRight />
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
