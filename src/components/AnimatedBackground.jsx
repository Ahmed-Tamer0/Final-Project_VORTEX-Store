import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const Particles = ({ count = 5 }) => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    // Reduce particle count based on prop
    const newParticles = [...Array(count)].map((_, i) => ({
      id: i,
      size: Math.random() * 40 + 20, // Smaller particles
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100 + 100}vh`,
      duration: Math.random() * 25 + 25, // Much slower particles
      delay: Math.random() * -15,
      xOffset: Math.random() * 60 - 30,
    }));
    setParticles(newParticles);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/10 dark:bg-white/5"
          style={{ willChange: 'transform, opacity' }}
          initial={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            top: '-20vh',
            opacity: [0, 0.3, 0], // Lower opacity
            scale: [0.5, 1.1, 0.7],
            x: [0, p.xOffset, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

export const AnimatedBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);
 
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Increased damping for smoother, less CPU-intensive movement
  const smoothX = useSpring(mouseX, { damping: 100, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 100, stiffness: 200 });

  useEffect(() => {
    if (isMobile) return; // Disable mouse tracking on mobile

    const handleMouseMove = (e) => {
      // Throttle mouse move slightly by setting values only
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    
    // Use passive listener for better scroll performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isMobile]);

  const blob1X = useTransform(smoothX, value => value * 0.08);
  const blob1Y = useTransform(smoothY, value => value * 0.08);
  const blob2X = useTransform(smoothX, value => value * -0.12);
  const blob2Y = useTransform(smoothY, value => value * -0.12);
  const blob3X = useTransform(smoothX, value => value * 0.04);
  const blob3Y = useTransform(smoothY, value => value * -0.04);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none bg-slate-50 dark:bg-slate-950 transition-colors duration-700">
      <Particles count={isMobile ? 3 : 5} />

      {!isMobile && (
        <>
          {/* Blobs with optimized animations and will-change - Disabled on mobile for speed */}
          <motion.div
            style={{ x: blob1X, y: blob1Y, willChange: 'transform' }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/15 blur-[100px] rounded-full mix-blend-screen"
          />
          
          <motion.div
            style={{ x: blob2X, y: blob2Y, willChange: 'transform' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent/15 blur-[120px] rounded-full mix-blend-screen"
          />
          
          <motion.div
            style={{ x: blob3X, y: blob3Y, willChange: 'transform' }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-secondary/15 blur-[110px] rounded-full mix-blend-screen"
          />
        </>
      )}

      {/* Static noise - optimized with lower opacity */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.12] contrast-125 brightness-125 mix-blend-overlay"></div>
    </div>
  );
};
