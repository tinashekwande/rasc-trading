// ============================================
// ServiceCard — Zenith Style Service Card
// ============================================

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ServiceCard({ service, index = 0, onClick }) {
  const Icon = service.icon;

  return (
    <motion.article
      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col h-full cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      onClick={onClick}
    >
      {/* Image frame */}
      <div className="relative overflow-hidden aspect-[16/10] bg-gray-50 border-b border-gray-50">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Icon badge */}
        <div className="absolute bottom-4 right-4 w-11 h-11 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-gray-800 border border-gray-100 shadow-sm group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
          <Icon size={18} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg text-gray-900 mb-2.5 group-hover:text-gray-950 transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-grow">
          {service.description}
        </p>
        <div className="inline-flex items-center gap-1.5 font-semibold text-xs text-gray-900 hover:gap-2.5 transition-all mt-auto uppercase tracking-wider">
          Learn More
          <span>&rarr;</span>
        </div>
      </div>
    </motion.article>
  );
}
