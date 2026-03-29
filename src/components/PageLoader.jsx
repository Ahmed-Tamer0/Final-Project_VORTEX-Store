import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

export const PageLoader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Shorter timeout for better perceived performance
    const timer = setTimeout(() => setIsVisible(false), 1500);
    
    // Safety: ensure it fades out even if component stays mounted
    const backupTimer = setTimeout(() => setIsVisible(false), 3000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(backupTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center gap-8"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="w-24 h-24 bg-gradient-to-tr from-primary via-secondary to-accent rounded-[2rem] rotate-12 flex items-center justify-center text-white font-black text-4xl shadow-2xl glow-primary">
              V
            </div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 border-2 border-dashed border-white/10 rounded-full"
            />
          </motion.div>
          
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-black tracking-tighter text-white uppercase italic">INITIALIZING CORE</h2>
            <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden mx-auto">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
