import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Terminal, Globe, Github, Twitter } from 'lucide-react';
import { Button } from '../components/Button';
import { useToast } from '../context/ToastContext';
import { useState } from 'react';

export const Contact = () => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
        showToast('TRANSMISSION RECEIVED. WE WILL RESPOND SHORTLY.', 'success');
        setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pb-20 pt-10 px-4 max-w-7xl mx-auto space-y-20">
      {/* Header */}
      <section className="text-center space-y-6">
        <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="inline-flex items-center gap-2 px-6 py-2 glass rounded-full text-[10px] font-black tracking-[0.3em] text-accent border-accent/20 uppercase"
        >
          <Terminal size={14} /> SECURE TRANSMISSION
        </motion.div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">CONTACT <span className="text-accent">COMMAND</span></h1>
        <p className="text-slate-500 max-w-2xl mx-auto font-medium">Have a technical query or need to report an anomaly? Reach out through our secure communication nodes.</p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-12"
        >
          <div className="space-y-8">
            <h2 className="text-3xl font-black tracking-tighter uppercase italic">NETWORK NODES</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: <Mail className="text-primary" />, label: 'NEURAL LINK', value: 'COMMAND@VORTEX.IO' },
                { icon: <Phone className="text-secondary" />, label: 'VOICE BRIDGE', value: '+1 (888) VORTEX-0' },
                { icon: <MapPin className="text-accent" />, label: 'PHYSICAL SECTOR', value: 'NEO-TOKYO, BLOCK 7' },
                { icon: <Globe className="text-emerald-500" />, label: 'GLOBAL GRID', value: 'WWW.VORTEX.IO' },
              ].map((item, i) => (
                <div key={i} className="glass p-6 rounded-3xl border-white/10 hover:glow transition-all duration-500 group">
                  <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <p className="text-[10px] font-black text-slate-500 tracking-widest uppercase mb-1">{item.label}</p>
                  <p className="text-sm font-black uppercase text-slate-800 dark:text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-black tracking-tighter uppercase italic">SOCIAL UPLINKS</h3>
            <div className="flex gap-4">
              {[Github, Twitter, MessageSquare].map((Icon, i) => (
                <button key={i} className="p-4 glass rounded-2xl hover:bg-white/10 transition-all hover:scale-110 text-slate-400 hover:text-white">
                  <Icon size={24} />
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="glass p-10 md:p-12 rounded-[3.5rem] border-white/10 shadow-3d relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] -z-10 group-hover:bg-accent/10 transition-colors" />
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 tracking-widest uppercase px-2">OPERATOR NAME</label>
                    <input type="text" placeholder="VORTEX" className="w-full glass py-4 px-6 rounded-2xl outline-none focus:border-accent/50 transition-all font-black text-xs placeholder:text-slate-600" required />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 tracking-widest uppercase px-2">EMAIL IDENTITY</label>
                    <input type="email" placeholder="VORTEX EXAMPLE" className="w-full glass py-4 px-6 rounded-2xl outline-none focus:border-accent/50 transition-all font-black text-xs placeholder:text-slate-600" required />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 tracking-widest uppercase px-2">SUBJECT HEADER</label>
                <input type="text" placeholder="VORTEX" className="w-full glass py-4 px-6 rounded-2xl outline-none focus:border-accent/50 transition-all font-black text-xs placeholder:text-slate-600" required />
            </div>
            <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 tracking-widest uppercase px-2">PACKET MESSAGE</label>
                <textarea rows="5" placeholder="VORTEX EXAMPLE" className="w-full glass py-4 px-6 rounded-2xl outline-none focus:border-accent/50 transition-all font-black text-xs placeholder:text-slate-600 resize-none" required></textarea>
            </div>
            <Button isLoading={isLoading} variant="accent" className="w-full py-5 text-sm shadow-accent/20 uppercase tracking-widest font-black">
                INITIATE <Send size={20} />
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
