// ============================================
// ClientLogos — Infinite Scrolling Marquee (Tailwind v4)
// ============================================

import { motion } from 'framer-motion';
import { clientLogos } from '../data/siteData';

export default function ClientLogos() {
  // Duplicate logos array for seamless loop animation
  const duplicatedLogos = [...clientLogos, ...clientLogos];

  return (
    <section className="bg-white py-16 border-b border-gray-50 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5 }}
      >
        {/* Label */}
        <p className="text-[10px] font-bold uppercase tracking-widest text-center text-gray-400 mb-10">
          Trusted By Leading Brands
        </p>

        {/* Marquee Wrapper */}
        <div className="overflow-hidden relative w-full [mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)]">
          <div className="flex items-center gap-16 md:gap-24 w-max marquee-track-logos">
            {duplicatedLogos.map((logo, i) => (
              <div
                key={`logo-${i}`}
                className="flex items-center justify-center h-[72px] w-[192px] flex-shrink-0 cursor-pointer"
              >
                <img
                  src={logo.image}
                  alt={logo.alt}
                  width={192}
                  height={60}
                  className="h-[60px] w-auto object-contain hover:scale-105 transition-all duration-300 opacity-90 hover:opacity-100"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
