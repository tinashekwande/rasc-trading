// ============================================
// ProjectCard — Zenith Architectural Showcase Card
// ============================================

import { FiMaximize } from 'react-icons/fi';

export default function ProjectCard({ project, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-3xl aspect-[4/5] w-full cursor-pointer shadow-sm hover:shadow-xl border border-gray-100/10 transition-all duration-500 flex flex-col justify-end h-full"
    >
      {/* Full-width Image Background */}
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 rounded-3xl"
        loading="lazy"
      />
      
      {/* Dark Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent opacity-95 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
      
      {/* Category Badge - Absolute Top Left */}
      <div className="absolute top-3 left-3 md:top-4 md:left-4 z-20">
        <span className="px-2 py-1 md:px-3 md:py-1.5 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-gray-800 border border-gray-100 shadow-sm">
          {project.category}
        </span>
      </div>

      {/* Floating View Icon Overlay - Center */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <div className="h-10 w-10 md:h-11 md:w-11 rounded-full bg-white/95 backdrop-blur-md border border-gray-100 flex items-center justify-center text-gray-800 shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
          <FiMaximize size={14} />
        </div>
      </div>

      {/* Overlaid Content */}
      <div className="relative p-4 md:p-8 flex flex-col z-20 w-full">
        <h3 className="font-semibold text-sm md:text-xl text-white mb-0.5 group-hover:text-white transition-colors line-clamp-2">
          {project.title}
        </h3>
        <p className="text-[9px] md:text-xs text-white/70 font-medium uppercase tracking-wider mb-2 md:mb-4">
          Premium Construction Project
        </p>
        <div className="inline-flex items-center gap-1.5 font-semibold text-[10px] md:text-xs text-white group-hover:gap-2.5 transition-all uppercase tracking-wider">
          View Gallery
          <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
        </div>
      </div>
    </div>
  );
}
