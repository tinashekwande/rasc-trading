// ============================================
// ProcessTimeline — 4-step process (Tailwind v4)
// ============================================

import { motion } from 'framer-motion';
import { processSteps } from '../data/siteData';

export default function ProcessTimeline() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="bg-white py-24 px-6 border-b border-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 bg-gray-50 border border-gray-100 text-gray-600 uppercase tracking-wider">
            Our Method
          </div>
          <h2 className="text-4xl font-light tracking-tight mb-4 text-gray-900">
            How We <span className="font-semibold">Work</span>
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            From initial consultation to final completion, we follow a meticulous process 
            that guarantees premium craftsmanship and absolute transparency.
          </p>
        </div>

        {/* Timeline Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {processSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                className="group flex flex-col items-center lg:items-start text-center lg:text-left relative p-6 bg-gray-50/50 hover:bg-gray-50 border border-gray-100/50 hover:border-gray-100 rounded-3xl transition-all duration-300"
                variants={stepVariants}
              >
                {/* Horizontal connector line on large screens only */}
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute left-3/4 top-14 w-1/2 h-[1px] bg-gray-200 z-0" />
                )}

                {/* Step Marker */}
                <div className="relative flex items-center justify-center mb-6 z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-800 shadow-sm transition-all duration-300 group-hover:bg-gray-900 group-hover:text-white group-hover:border-gray-900">
                    <span className="font-semibold text-lg">{step.number}</span>
                  </div>
                  {/* Small floating icon badge */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-gray-900 text-white flex items-center justify-center shadow-md group-hover:bg-white group-hover:text-gray-900 transition-colors">
                    <Icon size={12} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-gray-950 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
