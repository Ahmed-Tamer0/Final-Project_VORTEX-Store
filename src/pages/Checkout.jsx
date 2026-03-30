import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, CreditCard, ShieldCheck, Truck, Package, CheckCircle2, Zap, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/Button';
import { useNavigate, Link } from 'react-router-dom';

export const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);

  const handleOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsOrdered(true);
      showToast('ORDER FINALIZED. TRANSMISSION COMPLETE.', 'success');
      setTimeout(() => {
        clearCart();
        navigate('/');
      }, 5000);
    }, 3000);
  };

  if (isOrdered) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center space-y-8 px-4">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          className="w-32 h-32 bg-emerald-500 text-white rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-emerald-500/30"
        >
          <CheckCircle2 size={64} />
        </motion.div>
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">ORDER <span className="text-emerald-500">SYNCED</span></h1>
          <p className="text-slate-500 font-black tracking-[0.2em] text-xs uppercase">ORDER PROTOCOL #VO-77292-X</p>
        </div>
        <p className="text-slate-500 max-w-md mx-auto font-medium">Your artifacts are being prepared for immediate deployment. You will be redirected shortly.</p>
        <Link to="/">
          <Button variant="secondary" className="px-10 uppercase font-black tracking-widest">RETURN HOME</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-10 pb-20 px-4 max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <Link to="/cart" className="inline-flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-white transition-colors mb-4 uppercase tracking-[0.3em]">
            <ArrowLeft size={14} /> BACK TO REPO
          </Link>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">CHECKOUT <span className="text-primary">PROTOCOL</span></h1>
        </div>
        <div className="glass p-4 rounded-2xl flex items-center gap-6 border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[10px] font-black text-white">1</div>
            <span className="text-[10px] font-black text-primary tracking-widest uppercase">STAGING</span>
          </div>
          <ChevronRight size={14} className="text-slate-600" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full glass border-white/10 flex items-center justify-center text-[10px] font-black text-slate-500">2</div>
            <span className="text-[10px] font-black text-slate-500 tracking-widest uppercase">DEPLOY</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Form Section */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-10 md:p-12 rounded-[3.5rem] border-white/10 shadow-3d space-y-10"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-primary shadow-lg border-white/10">
                <Truck size={24} />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight">LOGISTICS DATA</h2>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">SPECIFY DEPLOYMENT COORDINATES</p>
              </div>
            </div>

            <form onSubmit={handleOrder} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-slate-500 tracking-widest uppercase px-2">FULL NAME</label>
                <input
                  type="text"
                  placeholder="VORTEX"
                  required
                  className="w-full glass py-4 px-6 rounded-2xl outline-none focus:border-primary/50 transition-all font-black text-xs"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-slate-500 tracking-widest uppercase px-2">STREET ADDRESS</label>
                <input
                  type="text"
                  placeholder="VORTEX EXAMPLE"
                  required
                  className="w-full glass py-4 px-6 rounded-2xl outline-none focus:border-primary/50 transition-all font-black text-xs"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 tracking-widest uppercase px-2">CITY/SECTOR</label>
                <input
                  type="text"
                  placeholder="VORTEX"
                  required
                  className="w-full glass py-4 px-6 rounded-2xl outline-none focus:border-primary/50 transition-all font-black text-xs"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 tracking-widest uppercase px-2">ZIP CODE</label>
                <input
                  type="text"
                  placeholder="VORTEX"
                  required
                  className="w-full glass py-4 px-6 rounded-2xl outline-none focus:border-primary/50 transition-all font-black text-xs"
                />
              </div>

              <div className="md:col-span-2 h-[1px] bg-white/5 my-4" />

              <div className="md:col-span-2 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-accent shadow-lg border-white/10">
                    <CreditCard size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-tight">TRANSACTION KEY</h2>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">SECURE PAYMENT METHOD</p>
                  </div>
                </div>

                <div className="glass p-6 rounded-3xl border-white/5 flex items-center justify-between group cursor-pointer hover:border-accent/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center">
                      <Zap size={20} className="text-accent" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest">NEURAL TRANSFER</span>
                  </div>
                  <div className="w-6 h-6 border-2 border-accent rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-accent rounded-full" />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 pt-6">
                <Button isLoading={isProcessing} variant="accent" className="w-full py-5 text-base shadow-primary/20 uppercase tracking-widest font-black">
                  FINALIZE DEPLOYMENT <ShieldCheck size={20} />
                </Button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-5">
          <div className="glass p-10 rounded-[3.5rem] border-white/10 space-y-10 sticky top-32 shadow-2xl">
            <h2 className="text-2xl font-black uppercase italic tracking-tighter flex items-center gap-4">
              <Package className="text-primary" /> CONTENT STAGING
            </h2>

            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 no-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-6 group">
                  <div className="w-20 h-20 glass rounded-2xl p-2 flex items-center justify-center shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform"
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-black uppercase tracking-tight leading-none mb-2">{item.name}</h4>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">QTY: {item.quantity}</p>
                    <p className="text-primary font-black text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-[2px] bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

            <div className="space-y-8">
              <div className="flex justify-between items-end">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">AGGREGATE PAYLOAD</span>
                <span className="text-5xl font-black text-primary drop-shadow-2xl shadow-primary/30">${totalPrice.toFixed(2)}</span>
              </div>

              <div className="glass p-6 rounded-[2.5rem] border-white/5 flex flex-col gap-4 text-center">
                <div className="flex items-center justify-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <ShieldCheck size={16} className="text-emerald-500" /> ENCRYPTION ACTIVE
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
