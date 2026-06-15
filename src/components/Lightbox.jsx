// ============================================
// Lightbox — Fullscreen Portfolio Image Lightbox (Tailwind v4)
// ============================================

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Lightbox({
  images = [],
  currentIndex = 0,
  isOpen = false,
  onClose,
  onNext,
  onPrev,
  onNavigate,
}) {
  // Navigation fallback helpers
  const handleNext = onNext || (() => {
    if (onNavigate) onNavigate((currentIndex + 1) % images.length);
  });
  const handlePrev = onPrev || (() => {
    if (onNavigate) onNavigate((currentIndex - 1 + images.length) % images.length);
  });

  // Keyboard controls
  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'ArrowLeft':
          handlePrev();
          break;
      }
    },
    [isOpen, onClose, handleNext, handlePrev]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock scrolling
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && currentImage && (
        <motion.div
          className="fixed inset-0 z-[1200] bg-black/95 backdrop-blur-md flex items-center justify-center cursor-zoom-out p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 h-12 w-12 rounded-full border border-white/15 bg-white/5 text-white flex items-center justify-center hover:bg-white/15 hover:border-white/30 hover:scale-105 transition-all cursor-pointer z-30"
            aria-label="Close"
          >
            <FiX size={20} />
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-xs font-semibold tracking-widest text-white/50 z-30 uppercase">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Centered Image Card */}
          <motion.div
            className="relative max-w-[90vw] max-h-[80vh] md:max-h-[85vh] cursor-grab active:cursor-grabbing rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-gray-950 flex flex-col justify-center select-none touch-none"
            onClick={(e) => e.stopPropagation()}
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(event, info) => {
              const swipeThreshold = 50;
              if (info.offset.x < -swipeThreshold) {
                handleNext();
              } else if (info.offset.x > swipeThreshold) {
                handlePrev();
              }
            }}
          >
            <img
              src={currentImage.src || currentImage.image || currentImage}
              alt={currentImage.alt || currentImage.title || `Image ${currentIndex + 1}`}
              className="max-w-full max-h-[80vh] md:max-h-[85vh] object-contain rounded-3xl pointer-events-none"
            />

            {/* Title & category details overlay */}
            {currentImage.title && (
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/85 via-black/45 to-transparent rounded-b-3xl text-left pointer-events-none">
                {currentImage.category && (
                  <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest block mb-1">
                    {currentImage.category}
                  </span>
                )}
                <h3 className="text-lg font-semibold text-white">
                  {currentImage.title}
                </h3>
              </div>
            )}
          </motion.div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <div className="hidden sm:block">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute top-1/2 -translate-y-1/2 left-6 h-12 w-12 rounded-full border border-white/15 bg-white/5 text-white flex items-center justify-center hover:bg-white/15 hover:border-white/30 hover:scale-105 transition-all cursor-pointer z-30"
                aria-label="Previous image"
              >
                <FiChevronLeft size={22} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute top-1/2 -translate-y-1/2 right-6 h-12 w-12 rounded-full border border-white/15 bg-white/5 text-white flex items-center justify-center hover:bg-white/15 hover:border-white/30 hover:scale-105 transition-all cursor-pointer z-30"
                aria-label="Next image"
              >
                <FiChevronRight size={22} />
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
