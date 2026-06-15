// ============================================
// ServiceCard — Zenith Style Service Card
// ============================================

import { motion } from 'framer-motion';

export default function ServiceCard({ service, index = 0, onClick }) {
  const Icon = service.icon;

  return (
    <motion.article
      className="group relative overflow-hidden rounded-3xl aspect-[4/5] w-full cursor-pointer shadow-sm hover:shadow-xl border border-gray-100/10 transition-all duration-300 flex flex-col justify-end h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      onClick={onClick}
    >
      {/* Full-width Image Background */}
      <img
        src={service.image}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 rounded-3xl"
        loading="lazy"
      />
      
      {/* Dark Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-95 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
      
      {/* Icon badge - Absolute Top Right */}
      <div className="absolute top-4 right-4 w-11 h-11 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-gray-800 border border-gray-100 shadow-sm group-hover:bg-gray-900 group-hover:text-white transition-all duration-300 z-20">
        <Icon size={18} />
      </div>

      {/* Overlaid Content */}
      <div className="relative p-6 md:p-8 flex flex-col z-20 w-full">
        <h3 className="font-semibold text-lg md:text-xl text-white mb-2 group-hover:text-white transition-colors">
          {service.title}
        </h3>
        <p className="text-xs md:text-sm text-white/80 leading-relaxed mb-6 flex-grow">
          {service.description}
        </p>
        <div className="inline-flex items-center gap-1.5 font-semibold text-[11px] md:text-xs text-white group-hover:gap-2.5 transition-all uppercase tracking-wider">
          Learn More
          <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
        </div>
      </div>
    </motion.article>
  );
}
