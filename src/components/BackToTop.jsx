import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when scrolled down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 z-[60] group"
          aria-label="Back to Top"
        >
          {/* Outer Glow Effect */}
          <div className="absolute inset-0 bg-primary/40 rounded-full blur-2xl group-hover:bg-primary/60 transition-all duration-500 opacity-0 group-hover:opacity-100" />
          
          {/* Main Button */}
          <div className="relative w-16 h-16 glass rounded-full flex items-center justify-center border-white/20 shadow-2xl transition-all duration-500 hover:border-primary/50 overflow-hidden">
            {/* Background Animation */}
            <motion.div 
               animate={{ y: [0, -100] }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/10 opacity-50"
            />
            
            {/* Progress/Dynamic ring could go here, but keeping it simple/premium */}
            <div className="relative group-hover:text-primary transition-colors">
              <ChevronUp size={28} className="group-hover:animate-bounce" />
            </div>

            {/* Hidden Text for interaction */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] font-black tracking-[0.3em] uppercase px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none border border-white/10 whitespace-nowrap">
              Return Up
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
