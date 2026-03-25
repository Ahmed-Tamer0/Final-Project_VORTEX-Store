import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Search, CreditCard, LayoutGrid, Zap, Shield, Globe, Smartphone, Watch, Laptop, Camera, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export const InteractiveHero3D = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Mouse tracking for parallax
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs
  const rotateX = useSpring(useTransform(y, [-300, 300], [15, -15]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-300, 300], [-15, 15]), { stiffness: 100, damping: 30 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      x.set(e.clientX - centerX);
      y.set(e.clientY - centerY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [x, y]);

  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: 'اكتشف المنتجات', icon: <LayoutGrid />, desc: 'تصفح أحدث التقنيات المختارة بعناية' },
    { title: 'أضف للمفضلة', icon: <Heart />, desc: 'احفظ ما يعجبك لتعود إليه لاحقاً' },
    { title: 'جهز سلتك', icon: <ShoppingBag />, desc: 'اجمع تحفك الرقمية في مكان واحد' },
    { title: 'إتمام الشراء', icon: <CreditCard />, desc: 'عملية دفع آمنة وسريعة' },
  ];

  // Auto-cycle steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Floating animations for elements
  const floatingAnim = {
    y: [-10, 10],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };

  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-slate-950 px-4 py-20">
      {/* Background Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10 flex flex-col items-center">
        
        {/* Section Title Header */}
        <div className="text-center mb-10 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-widest uppercase border border-primary/20 font-arabic"
          >
            <Zap size={12} /> رحلة المستقبل
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white font-arabic"
          >
            طريقة الاستخدام
          </motion.h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent rounded-full mx-auto" />
        </div>

        {/* Dynamic Step Title */}
        <div className="text-center mb-16 h-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-slate-500 font-bold tracking-widest text-sm font-arabic"
            >
              الخطوة الحالية: {steps[activeStep].title}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* 3D Visualizer Area */}
        <div className="perspective-2000 relative w-full h-[500px] flex items-center justify-center">
          <motion.div
            style={{
              rotateX: isMobile ? 0 : rotateX,
              rotateY: isMobile ? 0 : rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative flex items-center justify-center w-full"
          >
            {/* Main 3D Device */}
            <motion.div
              animate={floatingAnim}
              className="relative w-[320px] h-[480px] md:w-[680px] md:h-[450px] glass rounded-[3rem] border-white/20 shadow-3xl flex flex-col overflow-hidden group"
              style={{ 
                transformStyle: "preserve-3d",
                translateZ: 50 
              }}
            >
              {/* Screen Content */}
              <div className="flex-1 bg-slate-900/50 backdrop-blur-md p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden text-center">
                {/* Simulation UI */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-black text-lg shadow-lg glow-primary">V</div>
                    <div className="flex gap-4">
                      <div className={`w-5 h-5 rounded-full transition-all duration-700 ${activeStep === 0 ? 'bg-primary shadow-lg' : 'bg-white/5'}`} />
                      <div className={`w-5 h-5 rounded-full transition-all duration-700 ${activeStep === 3 ? 'bg-accent shadow-lg' : 'bg-white/5'}`} />
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                    {[
                      { icon: <Watch size={20} className="text-primary mx-auto" />, title: 'ساعة ڤورتكس', price: '$299' },
                      { icon: <Smartphone size={20} className="text-accent mx-auto" />, title: 'هاتف ڤورتكس', price: '$899' },
                      { icon: <Laptop size={20} className="text-secondary mx-auto" />, title: 'ڤورتكس برو', price: '$1299' },
                      { icon: <Camera size={20} className="text-primary mx-auto" />, title: 'كاميرا ڤورتكس', price: '$599' }
                    ].map((item, i) => (
                      <div key={i} className="glass p-3 rounded-2xl border-white/5 space-y-2">
                        <div className={`mx-auto w-10 h-10 rounded-xl transition-all duration-700 flex items-center justify-center ${activeStep === 0 ? 'bg-primary/20 scale-105' : 'bg-white/5'}`}>
                           {item.icon}
                        </div>
                        <div className="space-y-1">
                          <div className="text-[10px] font-black text-white/90 font-arabic truncate">{item.title}</div>
                          <div className="text-[9px] font-bold text-primary">{item.price}</div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* HUD Display */}
                <div className="mt-auto flex flex-col items-center justify-center p-5 md:p-6 glass rounded-2xl border-white/10 relative overflow-hidden bg-slate-900/60 shadow-2xl">
                   <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="h-full bg-gradient-to-r from-primary via-accent to-primary shadow-glow"
                      />
                   </div>

                   <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -15, filter: 'blur(5px)' }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center space-y-2 relative z-10 w-full"
                      >
                         <div className="inline-flex items-center px-4 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-black tracking-widest uppercase border border-primary/30 font-arabic">
                           الخطوة 0{activeStep + 1}
                         </div>
                         <h3 className="text-lg md:text-xl font-black text-white tracking-tight font-arabic">
                           {steps[activeStep].title}
                         </h3>
                         <p className="text-slate-300 text-xs md:text-sm font-medium font-arabic max-w-[260px] mx-auto leading-relaxed">
                           {steps[activeStep].desc}
                         </p>
                      </motion.div>
                   </AnimatePresence>

                   {/* Decorative Corner Accents */}
                   <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/20 rounded-tl-sm" />
                   <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-white/20 rounded-br-sm" />
                </div>

                {/* Active Glow */}
                <div className={`absolute -inset-40 bg-primary/10 blur-[120px] rounded-full pointer-events-none transition-opacity duration-1000 ${activeStep === 3 ? 'opacity-100' : 'opacity-0'}`} />
              </div>
              
              <div className="h-4 bg-slate-800/80 w-full flex items-center justify-center">
                <div className="w-20 h-1 rounded-full bg-white/10" />
              </div>
            </motion.div>

            {/* Floating 3D Icons surrounding the device */}
            <motion.div
              animate={{
                y: activeStep === 0 ? [-30, 30] : [-15, 15],
                rotate: [0, 5, 0],
                transition: { duration: 5, repeat: Infinity, repeatType: "reverse" }
              }}
              className={`absolute -top-10 -left-10 lg:-left-20 glass p-8 rounded-[2.5rem] border-white/20 transition-all duration-1000 hidden md:block ${activeStep === 0 ? 'opacity-100 scale-110 glow-primary border-primary/40' : 'opacity-20 scale-90 blur-[2px]'}`}
              style={{ translateZ: 150 }}
            >
              <LayoutGrid size={48} className={activeStep === 0 ? 'text-primary' : 'text-slate-500'} />
            </motion.div>

            <motion.div
              animate={{
                y: activeStep === 1 ? [20, -20] : [0, 0],
                rotate: [0, -5, 0],
                transition: { duration: 4, repeat: Infinity, repeatType: "reverse" }
              }}
              className={`absolute top-1/2 -left-32 glass p-6 rounded-[2.5rem] border-rose-500/20 transition-all duration-1000 hidden lg:block ${activeStep === 1 ? 'opacity-100 scale-125 glow-rose border-rose-500/40' : 'opacity-20 scale-90 blur-[2px]'}`}
              style={{ translateZ: 250 }}
            >
              <Heart size={40} fill={activeStep === 1 ? "currentColor" : "none"} className={activeStep === 1 ? 'text-rose-500' : 'text-slate-500'} />
            </motion.div>

            <motion.div
              animate={{
                y: activeStep === 2 ? [-25, 25] : [0, 0],
                transition: { duration: 6, repeat: Infinity, repeatType: "reverse" }
              }}
              className={`absolute bottom-0 -right-10 lg:-right-20 glass p-8 rounded-[2.5rem] border-primary/20 transition-all duration-1000 ${activeStep === 2 ? 'opacity-100 scale-110 glow-primary border-primary/40' : 'opacity-20 scale-90 blur-[2px]'}`}
              style={{ translateZ: 200 }}
            >
              <ShoppingBag size={52} className={activeStep === 2 ? 'text-primary' : 'text-slate-500'} />
            </motion.div>

            <motion.div
              animate={{
                y: activeStep === 3 ? [30, -30] : [0, 0],
                rotate: 15,
                transition: { duration: 7, repeat: Infinity, repeatType: "reverse" }
              }}
              className={`absolute -top-10 -right-12 lg:-right-24 glass p-6 rounded-[2.5rem] border-accent/20 transition-all duration-1000 hidden xl:block ${activeStep === 3 ? 'opacity-100 scale-110 glow-accent border-accent/40' : 'opacity-20 scale-90 blur-[2px]'}`}
              style={{ translateZ: 180 }}
            >
              <div className="w-56 h-36 bg-gradient-to-br from-accent/20 via-primary/20 to-transparent rounded-3xl p-8 flex flex-col justify-between shadow-2xl">
                <CreditCard size={32} className={activeStep === 3 ? 'text-accent' : 'text-slate-500'} />
                <div className="space-y-3">
                  <div className={`w-full h-2 rounded-full transition-colors ${activeStep === 3 ? 'bg-primary/50' : 'bg-white/10'}`} />
                  <div className={`w-1/2 h-2 rounded-full transition-colors ${activeStep === 3 ? 'bg-primary/30' : 'bg-white/10'}`} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Manual Step Controls (Dots) */}
        <div className="flex gap-4 mt-20">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={`h-2 rounded-full transition-all duration-700 ${activeStep === i ? 'w-12 bg-primary' : 'w-2 bg-slate-300 dark:bg-slate-800'}`}
            />
          ))}
        </div>
      </div>

      {/* Decorative Particles / Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 2000 - 1000, 
              y: Math.random() * 2000 - 1000,
              opacity: 0 
            }}
            animate={{ 
              y: [0, -100, 0],
              opacity: [0, 0.4, 0],
              scale: [1, 1.5, 1]
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity,
              delay: i * 2
            }}
            className="absolute w-2 h-2 bg-primary rounded-full blur-[1px]"
          />
        ))}
      </div>
    </section>
  );
};
