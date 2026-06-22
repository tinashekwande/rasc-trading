// ============================================
// TestimonialCarousel — modern dark section with Elfsight Google Reviews
// ============================================

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TestimonialCarousel() {
  useEffect(() => {
    // Dynamically load the Elfsight platform script if not already present
    const existingScript = document.querySelector('script[src="https://elfsightcdn.com/platform.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://elfsightcdn.com/platform.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-24 px-6 relative overflow-hidden">
      {/* Background Dots Pattern overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0px)', 
            backgroundSize: '40px 40px' 
          }} 
        />
      </div>

      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 bg-white/10 text-white border border-white/10 uppercase tracking-wider">
            Reviews
          </div>
          <h2 className="text-4xl font-light tracking-tight mb-4 text-white">
            What Our <span className="font-semibold">Clients Say</span>
          </h2>
          <p className="text-base text-gray-400 max-w-lg mx-auto">
            Read real-time success stories and reviews from our clients on Google.
          </p>
        </div>

        {/* Elfsight Google Reviews Widget */}
        <div className="w-full bg-white/5 backdrop-blur-md rounded-3xl p-4 md:p-6 border border-white/10 shadow-lg">
          <div className="elfsight-app-d542f999-df8b-474b-85eb-6e697e5d389f" data-elfsight-app-lazy></div>
        </div>
      </motion.div>
    </section>
  );
}

