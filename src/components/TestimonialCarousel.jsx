// ============================================
// TestimonialCarousel — modern dark slider (Tailwind v4)
// ============================================

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import { testimonials } from '../data/siteData';

// Swiper CSS imports (handled by Swiper, index.css has our custom styling overrides)
import 'swiper/css';
import 'swiper/css/pagination';

export default function TestimonialCarousel() {
  return (
    <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-24 px-6 relative overflow-hidden">
      {/* Background Dots Pattern overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0px)', backgroundSize: '40px 40px' }} />
      </div>

      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 bg-white/10 text-white border border-white/10 uppercase tracking-wider">
            Reviews
          </div>
          <h2 className="text-4xl font-light tracking-tight mb-4 text-white">
            What Our <span className="font-semibold">Clients Say</span>
          </h2>
          <p className="text-base text-gray-400 max-w-lg mx-auto">
            Read success stories from the homeowners and businesses who trusted us with their building vision.
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={32}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="pb-16 w-full max-w-3xl"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/10 text-center shadow-lg max-w-2xl mx-auto flex flex-col items-center">
                {/* Quote Icon */}
                <div className="text-white/10 mb-6">
                  <FaQuoteLeft size={32} />
                </div>

                {/* Testimonial Quote */}
                <p className="text-base md:text-lg font-light leading-relaxed text-gray-200 mb-6 italic max-w-xl">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Star Ratings */}
                <div className="flex justify-center gap-1.5 mb-8">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FiStar
                      key={i}
                      size={14}
                      fill="#EAB308"
                      stroke="#EAB308"
                      className="text-yellow-500"
                    />
                  ))}
                </div>

                {/* Client Avatar & Signature */}
                <div className="flex items-center gap-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full border-2 border-white/15 object-cover"
                    loading="lazy"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-sm text-white">{t.name}</div>
                    <div className="text-xs text-gray-400 tracking-wider uppercase mt-0.5">{t.role}</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
}
