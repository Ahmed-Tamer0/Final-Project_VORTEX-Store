import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

export const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleReducedMotion = (e) => {
      if (e.matches) setIsVisible(false); // Hide custom cursor if motion is reduced
    };
    mediaQuery.addEventListener('change', handleReducedMotion);
    if (mediaQuery.matches) return;

    window.addEventListener('resize', checkMobile, { passive: true });

    const moveCursor = (e) => {
      // useMotionValue is already efficient, no need to throttle here
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.hasAttribute('data-hover');

      setIsHovered(isInteractive);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', handleReducedMotion);
    };
  }, [isVisible]);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Scanning Lines (appear on hover) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              translateX: cursorXSpring,
              translateY: cursorYSpring,
              left: -40,
              top: -40,
              willChange: 'transform, opacity'
            }}
            transition={{ duration: 0.2 }}
            className="absolute w-20 h-20 pointer-events-none"
          >
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-accent" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-accent" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-accent" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-accent" />

            {/* Upgraded High-Fidelity Scanline */}
            <motion.div
              animate={{ y: [0, 80] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              style={{ willChange: 'transform' }}
              className="absolute w-full h-4 bg-gradient-to-b from-transparent via-accent/40 to-transparent blur-[2px]"
            >
              <div className="w-full h-[2px] bg-accent/60 shadow-[0_0_15px_#ec4899]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
