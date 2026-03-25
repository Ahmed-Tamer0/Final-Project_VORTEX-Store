import { Github, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <footer className="pt-20 pb-10 px-4 md:px-10 mt-20 relative overflow-hidden perspective-1000 border-t border-slate-200/50 dark:border-white/5">
      
      <motion.div 
        initial={{ rotateX: 20, opacity: 0, y: 50 }}
        whileInView={{ rotateX: 0, opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent glow-primary" 
      />
      
      <motion.div 
        initial={{ rotateX: 10, opacity: 0, y: 30 }}
        whileInView={{ rotateX: 0, opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10 preserve-3d"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <motion.div 
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-gradient-to-tr from-primary to-accent rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center text-white font-bold text-xl glow-primary"
            >
              V
            </motion.div>
            <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-white/70 dark:to-white bg-clip-text text-transparent">
              VORTEX
            </span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed font-medium">
            Pioneering the future of electronics with a commitment to innovation, design excellence, and an unparalleled shopping experience.
          </p>
          <div className="flex items-center gap-4">
            <motion.a whileHover={{ y: -5, scale: 1.1 }} href="#" className="p-3 glass rounded-xl text-slate-500 hover:text-primary transition-colors shadow-lg shadow-black/5"><Twitter size={18} /></motion.a>
            <motion.a whileHover={{ y: -5, scale: 1.1 }} href="#" className="p-3 glass rounded-xl text-slate-500 hover:text-accent transition-colors shadow-lg shadow-black/5"><Instagram size={18} /></motion.a>
            <motion.a whileHover={{ y: -5, scale: 1.1 }} href="#" className="p-3 glass rounded-xl text-slate-500 hover:text-slate-900 transition-colors shadow-lg shadow-black/5 dark:hover:text-white"><Github size={18} /></motion.a>
          </div>
        </div>

        <div>
          <h4 className="text-slate-900 dark:text-white font-black mb-6 tracking-widest text-[11px] uppercase">Quick Links</h4>
          <ul className="space-y-4 text-slate-500 text-sm font-medium">
            <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-3"><span className="w-1 h-1 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity"></span> Special Offers</a></li>
            <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-3"><span className="w-1 h-1 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity"></span> Gift Cards</a></li>
            <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-3"><span className="w-1 h-1 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity"></span> Store Locator</a></li>
            <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-3"><span className="w-1 h-1 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity"></span> Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-slate-900 dark:text-white font-black mb-6 tracking-widest text-[11px] uppercase">Support</h4>
          <ul className="space-y-4 text-slate-500 text-sm font-medium">
            <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-3"><span className="w-1 h-1 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity"></span> Order Status</a></li>
            <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-3"><span className="w-1 h-1 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity"></span> Return Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-3"><span className="w-1 h-1 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity"></span> Shipping Info</a></li>
            <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-3"><span className="w-1 h-1 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity"></span> FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-slate-900 dark:text-white font-black mb-6 tracking-widest text-[11px] uppercase">Newsletter</h4>
          <p className="text-slate-500 text-sm mb-4 font-medium">Get the latest updates on new drops and exclusive deals.</p>
          <div className="relative group">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full glass border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-primary/50 transition-all shadow-inner placeholder:text-slate-400 group-hover:border-primary/30"
            />
            <button className="absolute right-2 top-2 bottom-2 px-6 bg-primary rounded-xl text-white text-[10px] tracking-widest font-black hover:bg-primary/80 transition-all hover:scale-95 shadow-lg shadow-primary/30 uppercase">
              Join
            </button>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-20 pt-10 border-t border-slate-200/50 dark:border-white/5 text-center relative z-10"
      >
          <div className="text-slate-500 text-sm font-black tracking-widest uppercase flex items-center justify-center flex-wrap gap-2 mt-4 relative z-20">
            &copy; {new Date().getFullYear()} Vortex. Engineered with precision by
            
            <motion.div 
              className="inline-flex cursor-pointer text-lg md:text-xl font-black"
              initial="initial"
              whileHover="hover"
              variants={{
                initial: {},
                hover: { transition: { staggerChildren: 0.05 } }
              }}
            >
              {"AHMED TAMER".split('').map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    initial: { y: 0, color: "#64748b", textShadow: "0px 0px 0px rgba(0,0,0,0)" },
                    hover: { 
                      y: [-4, 4, -4, 0], 
                      color: ["#64748b", "#8b5cf6", "#ec4899", "#6366f1"],
                      textShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 15px rgba(139,92,246,0.8)", "0px 0px 0px rgba(0,0,0,0)"],
                      transition: { duration: 1, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }
                    }
                  }}
                  className="inline-block transition-colors duration-300"
                  style={{ minWidth: char === ' ' ? '10px' : 'auto' }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          </div>
      </motion.div>
    </footer>
  );
};
