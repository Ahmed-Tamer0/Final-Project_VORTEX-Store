import { motion } from 'framer-motion';
import { Globe, Users, Trophy, Cpu, Target, Rocket, ShieldCheck } from 'lucide-react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

export const About = () => {
  const stats = [
    { icon: <Globe className="text-primary" />, label: 'GLOBAL OUTLETS', value: '150+' },
    { icon: <Users className="text-secondary" />, label: 'ACTIVE USERS', value: '2M+' },
    { icon: <Trophy className="text-accent" />, label: 'DESIGN AWARDS', value: '45' },
    { icon: <Cpu className="text-emerald-500" />, label: 'COMPUTE POWER', value: '500 TFLOPS' },
  ];

  return (
    <div className="min-h-screen pb-20 space-y-32">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent -z-10" />
        <div className="text-center space-y-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="inline-flex items-center gap-2 px-6 py-2 glass rounded-full text-xs font-black tracking-[0.3em] text-primary border-primary/20 uppercase"
          >
            <Target size={14} /> OUR CORE MISSION
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic leading-none"
          >
            BEYOND <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent italic">INNOVATION</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.5 }}
            className="text-lg text-slate-500 dark:text-slate-400 font-medium tracking-tight uppercase"
          >
            VORTEX is not just a platform; it's a digital ecosystem engineered for the next generation of tech enthusiasts.
          </motion.p>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: i * 0.15 }}
              className="glass p-8 rounded-[2.5rem] border-white/10 text-center space-y-4 hover:glow transition-all duration-500"
            >
              <div className="w-16 h-16 glass rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                {stat.icon}
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-black tracking-tighter">{stat.value}</h3>
                <p className="text-[10px] font-black text-slate-500 tracking-widest uppercase">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">ENGINEERING PHILOSOPHY</h2>
          <div className="h-1 w-32 bg-primary rounded-full" />
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium">
            We believe that technology should be an extension of human potential. Our philosophy centers on minimalist aesthetics, maximum performance, and ethical engineering.
          </p>
          <div className="space-y-4">
            {['NEURAL-REACTIVE DESIGN', 'CARBON-NEUTRAL PRODUCTION', 'ACTIVE USER EMPOWERMENT'].map((tech, i) => (
                <div key={i} className="flex items-center gap-3 font-black text-xs tracking-widest text-slate-400 italic">
                    <ShieldCheck size={18} className="text-emerald-500" /> {tech}
                </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative glass p-2 aspect-video rounded-[3rem] overflow-hidden group border-white/10"
        >
            <div className="absolute inset-0 bg-slate-900 flex items-center justify-center overflow-hidden rounded-[2.5rem]">
                 <img 
                  src="https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&q=80" 
                  alt="Cyberpunk Core" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all duration-1000 mix-blend-luminosity group-hover:mix-blend-normal" 
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                 <div className="absolute w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                 <div className="absolute animate-pulse w-32 h-32 bg-primary/40 blur-[100px] rounded-full" />
            </div>
            <div className="absolute bottom-8 left-8 glass p-6 rounded-2xl border-white/20 shadow-3d backdrop-blur-2xl">
                <p className="text-[10px] font-black tracking-widest text-primary mb-2 uppercase drop-shadow-md">ESTABLISHED</p>
                <p className="text-3xl font-black uppercase text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">SINCE 2024</p>
            </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="px-4 max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">READY TO LINK?</h2>
            <p className="text-slate-500 font-medium">Step into the future of commerce. Secure your identity and start building your collection of next-gen artifacts.</p>
        </div>
        <div className="flex justify-center flex-wrap gap-6">
            <Link to="/auth">
                <Button variant="accent" className="px-12 uppercase font-black tracking-widest">JOIN NETWORK</Button>
            </Link>
            <Link to="/contact">
                <Button variant="outline" className="px-12 uppercase font-black tracking-widest">CONTACT COMMAND</Button>
            </Link>
        </div>
      </section>
    </div>
  );
};
