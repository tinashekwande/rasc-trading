// ============================================
// StatsBar — Animated counters (Tailwind v4)
// ============================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import ReactCountUp from 'react-countup';
import { stats } from '../data/siteData';

const CountUp = typeof ReactCountUp === 'function' ? ReactCountUp : (ReactCountUp.default || ReactCountUp);

export default function StatsBar() {
  const [hasEntered, setHasEntered] = useState(false);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="stats-bar" className="bg-gray-50 border-y border-gray-100 py-12 px-6">
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        onViewportEnter={() => setHasEntered(true)}
      >
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              className="flex flex-col items-center text-center relative px-2"
              variants={itemVariants}
            >
              {/* Icon Wrap */}
              <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-800 shadow-sm mb-4">
                <Icon size={20} />
              </div>

              {/* Value Counter */}
              <div className="font-semibold text-3xl md:text-4xl text-gray-900 tracking-tight">
                {stat.displayText ? (
                  <span>{stat.displayText}</span>
                ) : (
                  hasEntered && (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2.0}
                      delay={0.1 + i * 0.1}
                      prefix={stat.prefix || ''}
                      suffix={stat.suffix || ''}
                    />
                  )
                )}
              </div>

              {/* Label */}
              <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-1.5">
                {stat.label}
              </div>

              {/* Vertical divider on desktop, only between items */}
              {i < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/4 h-1/2 w-[1.5px] bg-gray-200" />
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
