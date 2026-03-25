import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/Button';
import { InteractiveHero3D } from '../components/InteractiveHero3D';
import { FAQ } from '../components/FAQ';

export const Home = () => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  return (
    <div className="space-y-32 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-primary/20 blur-[150px] rounded-full -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-xs font-bold tracking-widest text-primary border-primary/20">
              <Zap size={14} /> NEXT GEN ELECTRONICS
            </div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-6xl md:text-8xl font-black tracking-tighter leading-none"
            >
              TRANSCEND <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-sm">REALITY</span>
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              Experience the pinnacle of digital craftsmanship with our curated selection of high-performance tech artifacts.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6"
            >
              <Link to="/products">
                <Button variant="accent" className="px-10 py-5 text-lg">
                  SHOP DROPS <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="secondary" className="px-10 py-5 text-lg">
                  OUR STORY
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero 3D Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 glass-card p-8 rotate-3 hover:rotate-0 transition-transform duration-700 aspect-square flex items-center justify-center">
              <img 
                src="/images/samsung-removebg-preview.png" 
                alt="Featured" 
                className="w-full h-full object-contain drop-shadow-2xl" 
              />
              <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl shadow-3d border-white/20">
                <p className="text-xs font-black text-slate-400 tracking-widest mb-1 uppercase">NEW ARRIVAL</p>
                <p className="text-xl font-black">Galaxy S24 Ultra</p>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-white/5 rounded-full -z-10 animate-[spin_20s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] border border-white/5 rounded-full -z-10 animate-[spin_30s_linear_infinite_reverse]" />
          </motion.div>
        </div>
      </section>


      {/* Stats/Features */}
      <section className="px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Shield size={32} className="text-primary" />, title: 'SECURE LINK', desc: 'Enterprise-grade encryption for every transaction in our network.' },
            { icon: <Zap size={32} className="text-accent" />, title: 'CARBON NEUTRAL', desc: 'Every delivery is offset by our sustainable carbon-capture protocols.' },
            { icon: <Globe size={32} className="text-secondary" />, title: 'NEURAL SUPPORT', desc: 'Direct access to our advanced support grid for any technical inquiries.' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass p-8 rounded-3xl border-white/10 hover:border-primary/30 transition-all duration-500 hover:glow-primary group"
            >
              <div className="mb-6 w-16 h-16 glass rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
              <h3 className="text-xl font-black mb-2 tracking-tight uppercase">{item.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <InteractiveHero3D />


      {/* Featured Products */}
      <section className="px-4 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">FEATURED DROPS</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent rounded-full" />
          </motion.div>
          <Link to="/products">
            <Button variant="secondary" className="group">
              VIEW ALL <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {featuredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <section className="px-4 max-w-7xl mx-auto">
        <div className="relative glass-card p-12 md:p-20 overflow-hidden text-center space-y-8">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-accent/10 -z-10" />
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">Ready to join the vortex?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Step into the future of commerce. Secure your identity and start building your collection of next-gen artifacts.</p>
          <div className="flex justify-center">
            <Link to="/auth">
              <Button variant="accent" className="px-12 py-4 uppercase font-black tracking-widest">GET STARTED</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
