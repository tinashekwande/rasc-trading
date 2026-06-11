// ============================================
// ProjectCard — Zenith Architectural Showcase Card
// ============================================

import { motion } from 'framer-motion';
import { FiMaximize } from 'react-icons/fi';

export default function ProjectCard({ project, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-500 flex flex-col h-full cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/3] bg-gray-50 border-b border-gray-50">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        {/* Subtle Dark Overlay on Hover */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-gray-800 border border-gray-100 shadow-sm">
            {project.category}
          </span>
        </div>

        {/* Floating View Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="h-11 w-11 rounded-full bg-white/95 backdrop-blur-md border border-gray-100 flex items-center justify-center text-gray-800 shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <FiMaximize size={16} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg text-gray-900 mb-1 group-hover:text-gray-950 transition-colors">
          {project.title}
        </h3>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-4">
          Premium Construction Project
        </p>
        <div className="inline-flex items-center gap-1.5 font-semibold text-xs text-gray-900 hover:gap-2.5 transition-all mt-auto uppercase tracking-wider">
          View Gallery
          <span>&rarr;</span>
        </div>
      </div>
    </div>
  );
}
