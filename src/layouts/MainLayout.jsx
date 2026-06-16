import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  const location = useLocation();
  const lenisRef = useRef(null);

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    // Check if the device supports touch (mobile/tablet)
    const isTouchDevice = 
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 || 
      (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0);

    if (isTouchDevice) {
      return; // Do not initialize Lenis on mobile devices to preserve native touch swiping
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    lenisRef.current = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Expose lenis to window so we can trigger scroll to elements if needed
    window.lenisInstance = lenis;

    // Observe body resizing (e.g. image loads, dynamic widgets) and resize Lenis automatically
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    resizeObserver.observe(document.body);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.lenisInstance = null;
    };
  }, []);

  // Scroll to top instantly on every route change, bypassing smooth scroll
  useEffect(() => {
    // Force reset overflow style when route changes to prevent any modals/menus leaving it stuck
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      // Force instant resize calculation on layout shift for new page
      setTimeout(() => {
        lenisRef.current?.resize();
      }, 50);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="site-wrapper relative min-h-screen bg-white">
      {/* Premium Floating Blurry Background Bubbles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Bubble 1: Soft Indigo Aurora */}
        <div className="absolute top-[10%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-indigo-200/40 mix-blend-multiply filter blur-[100px] opacity-75 animate-blob" />
        
        {/* Bubble 2: Soft Rose Aurora */}
        <div className="absolute top-[35%] right-[-10%] w-[45rem] h-[45rem] rounded-full bg-rose-200/40 mix-blend-multiply filter blur-[100px] opacity-65 animate-blob" style={{ animationDelay: '5s' }} />
        
        {/* Bubble 3: Soft Amber Gold Aurora */}
        <div className="absolute bottom-[20%] left-[-10%] w-[42rem] h-[42rem] rounded-full bg-amber-100/60 mix-blend-multiply filter blur-[100px] opacity-75 animate-blob" style={{ animationDelay: '10s' }} />

        {/* Bubble 4: Soft Teal Aurora */}
        <div className="absolute bottom-[5%] right-[-10%] w-[38rem] h-[38rem] rounded-full bg-teal-200/40 mix-blend-multiply filter blur-[100px] opacity-60 animate-blob" style={{ animationDelay: '15s' }} />
      </div>

      <Navbar />
      <main className="main-content relative z-10">
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
