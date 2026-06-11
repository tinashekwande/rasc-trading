// ============================================
// AboutPage — Zenith About Us Page (Tailwind v4)
// ============================================

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAward, FiShield, FiHeart, FiZap, FiArrowRight, FiPhone, FiCheckCircle } from 'react-icons/fi';
import { companyInfo, values } from '../data/siteData';

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

export default function AboutPage() {
  const milestones = [
    {
      year: '1990',
      title: 'Company Founded',
      description: "Rocky and Son's Construction was born as a sole proprietorship, driven by a passion for quality building in South Africa."
    },
    {
      year: '2022',
      title: 'Incorporated as Pty Ltd',
      description: 'In response to industry growth, structural demands, and client needs, the business evolved into a private company.'
    },
    {
      year: '500+ Projects',
      title: 'Structural Developments',
      description: 'From high-end residential extensions to office park white boxing, our registry of completions stands as proof of quality.'
    }
  ];

  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch('/api/team');
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data && json.data.length > 0) {
            setTeamMembers(json.data);
          }
        }
      } catch (err) {
        console.error('Failed to fetch team members, using defaults:', err);
      }
    };
    fetchTeam();
  }, []);

  const fallbackTeam = [
    {
      id: 'team-1',
      name: 'Rocky Naidoo',
      position: 'Founder & Director',
      description: "Rocky founded RASC Trading in 1990 as a sole proprietorship. Under his leadership, the business has grown into one of South Africa's premier independent building contractors.",
      image: '/images/about/about-3.jpg'
    },
    {
      id: 'team-2',
      name: 'Shaun Naidoo',
      position: 'Co-Director & Project Manager',
      description: 'Shaun handles on-site executions, structural compliance engineering, and direct customer relations, ensuring all builds are executed on budget and with precision.',
      image: '/images/about/about-4.jpg'
    }
  ];

  const activeTeam = teamMembers.length > 0 ? teamMembers : fallbackTeam;

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
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40" style={{ backgroundImage: 'url(/images/about/about-1.jpg)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-transparent" />
        <div className="relative z-10 text-center max-w-xl px-6">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            Our Studio &amp; Story
          </motion.h1>
          <motion.nav
            className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-gray-600">/</span>
            <span>About</span>
          </motion.nav>
        </div>
      </section>

      {/* ── Company Story & Stepper Timeline ── */}
      <section className="py-24 px-6 border-b border-gray-100 bg-transparent">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Story Copy */}
          <ScrollReveal className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 bg-gray-50 border border-gray-100 text-gray-600 uppercase tracking-wider">
              About Us
            </div>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-gray-900 leading-tight">
              Building Dreams &amp; <span className="font-semibold">Bespoke Spaces</span>
            </h2>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-4">
              Rocky and Son&apos;s is a privately owned and managed company. The business was conceived in 1990 as a Sole Proprietor 
              and developed into a (Pty)Ltd in 2022, as a result of demands and needs of the industry.
            </p>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-4">
              Rocky and Sons are an independent construction company that provides a wide range of services. 
              Over three decades, we have grown from humble beginnings into one of the region&apos;s most trusted construction partners, 
              delivering exceptional results across residential, commercial, and industrial sectors.
            </p>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed">
              Our commitment to excellence is reflected in every project we undertake. Whether it&apos;s a simple renovation or a complex 
              commercial fit-out, we approach each job with the same dedication to quality, safety, and client satisfaction.
            </p>
          </ScrollReveal>

          {/* Stepper Stepper */}
          <ScrollReveal delay={0.15} className="lg:col-span-5 w-full">
            <div className="relative pl-8 border-l border-gray-100 space-y-12">
              {milestones.map((milestone, idx) => (
                <div className="relative" key={idx}>
                  {/* Stepper Dot */}
                  <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-gray-900 border-[6px] border-white shadow-sm flex items-center justify-center z-10" />
                  <span className="block text-2xl font-bold text-gray-900 mb-1">
                    {milestone.year}
                  </span>
                  <h3 className="font-semibold text-gray-800 text-base mb-1">
                    {milestone.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-24 px-6 border-b border-gray-50 bg-transparent">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 bg-white border border-gray-200 text-gray-600 uppercase tracking-wider">
              Studio Values
            </div>
            <h2 className="text-4xl font-light tracking-tight mb-4 text-gray-900">
              What Drives Our <span className="font-semibold">Excellence</span>
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Our core values guide every site project, ensuring safety, premium craftsmanship, and absolute transparency.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon || FiAward;
              return (
                <ScrollReveal key={val.title} delay={idx * 0.05}>
                  <div className="bg-white p-8 border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 text-gray-800 flex items-center justify-center shadow-xs mb-5">
                      <Icon size={18} />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {val.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed flex-grow">
                      {val.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Meet Our Team Section ── */}
      <section className="py-24 px-6 border-b border-gray-100 bg-white/40">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 bg-gray-50 border border-gray-100 text-gray-600 uppercase tracking-wider">
              Management
            </div>
            <h2 className="text-4xl font-light tracking-tight mb-4 text-gray-900">
              Meet Our <span className="font-semibold">Leadership & Team</span>
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              The professional leadership steering RASC Trading's building sites and estimation divisions to success.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {activeTeam.map((member, idx) => (
              <ScrollReveal key={member.id || idx} delay={idx * 0.08} className="h-full">
                <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-xs hover:shadow-md transition-all duration-300 h-full flex flex-col items-center text-center">
                  {/* Circle Portrait Photo */}
                  <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm flex-shrink-0 relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  {/* Content area */}
                  <div className="mt-6 flex-grow flex flex-col items-center">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                      {member.position}
                    </span>
                    <p className="text-xs text-gray-500 leading-relaxed flex-grow">
                      {member.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── NHBRC Certification Section ── */}
      <section className="py-24 px-6 border-b border-gray-100 bg-transparent">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Badge Image */}
          <ScrollReveal className="lg:col-span-4 flex justify-center">
            <div className="relative rounded-3xl overflow-hidden shadow-md border border-gray-150 p-4 max-w-[280px]">
              <img
                src="/images/brand/nhbrc-badge.jpg"
                alt="NHBRC Registration Badge"
                className="w-full h-auto object-contain rounded-2xl"
                loading="lazy"
              />
            </div>
          </ScrollReveal>

          {/* Details list */}
          <ScrollReveal delay={0.15} className="lg:col-span-8 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 bg-gray-50 border border-gray-100 text-gray-600 uppercase tracking-wider">
              NHBRC Compliance
            </div>
            <h2 className="text-4xl font-light tracking-tight mb-6 text-gray-900 leading-tight">
              Registered Builder &amp; <span className="font-semibold">Structural Warranty</span>
            </h2>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-6">
              RASC Trading is fully registered with the **National Home Builders Registration Council (NHBRC)**. 
              This registry registration is a legal requirement in South Africa that ensures all home builders adhere to 
              standard engineering specifications and building codes.
            </p>
            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {[
                `Registration Number: ${companyInfo.nhbrc}`,
                'Compliant with National Building Regulations',
                'Homeowner Warranty Protection Coverage',
                'Regular site quality audit compliance checks',
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-3.5 text-sm text-gray-700">
                  <FiCheckCircle className="text-gray-900 flex-shrink-0" size={16} />
                  <span className="font-medium">{bullet}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Team & Works Gallery ── */}
      <section className="py-24 px-6 border-b border-gray-50 bg-transparent">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 bg-white border border-gray-200 text-gray-600 uppercase tracking-wider">
              Our Studio
            </div>
            <h2 className="text-4xl font-light tracking-tight mb-4 text-gray-900">
              Decades on the <span className="font-semibold">Building Sites</span>
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              We employ professional project managers and trade supervisors who manage each site division from start to completion.
            </p>
          </div>

          {/* Grid Gallery */}
          <ScrollReveal delay={0.15}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { img: '/images/about/about-2.jpg', label: 'Concrete Foundation Pouring' },
                { img: '/images/about/about-3.jpg', label: 'Superstructure Brickwork' },
                { img: '/images/about/about-4.jpg', label: 'Premium Finishing Details' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-3xl overflow-hidden aspect-[4/3] border border-gray-100 shadow-sm"
                >
                  <img
                    src={item.img}
                    alt={item.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="block text-xs font-semibold text-white tracking-wide uppercase">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

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
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-gray-800 text-xs font-semibold hover:bg-gray-900 hover:scale-105 transition-all w-full sm:w-auto justify-center"
            >
              <FiPhone /> Call {companyInfo.phone}
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
