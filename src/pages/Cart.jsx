import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight, Trash2, Minus, Plus, CreditCard, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '../components/Button';

export const Cart = () => {
  const { cart, totalPrice, removeFromCart, updateQuantity } = useCart();

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-40 text-center space-y-8 px-4">
        <motion.div 
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-24 h-24 glass rounded-full mx-auto flex items-center justify-center text-primary glow-primary"
        >
          <ShoppingBag size={48} />
        </motion.div>
        <h3 className="text-4xl font-black tracking-tighter uppercase italic">YOUR REPO IS EMPTY</h3>
        <p className="text-slate-500 max-w-sm mx-auto font-medium">It seems you haven't staged any artifacts for acquisition yet.</p>
        <div className="flex justify-center">
          <Link to="/products">
            <Button variant="accent" className="px-10 py-4 uppercase font-black tracking-widest">RETURN TO CATALOG</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-10 pb-20 px-4 max-w-7xl mx-auto space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
        className="space-y-4"
      >
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">ACQUISITION REPO</h1>
        <p className="text-slate-500 font-black tracking-[0.2em] text-[10px] uppercase">
          {cart.length} {cart.length === 1 ? 'ITEM' : 'ITEMS'} STAGED FOR DEPLOYMENT
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-6">
          <AnimatePresence mode='popLayout'>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: 20 }}
                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                className="glass p-6 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 border-white/10 hover:border-primary/20 transition-all duration-500 hover:glow"
              >
                <div className="w-32 h-32 glass rounded-2xl p-4 flex items-center justify-center shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    loading="lazy" 
                    decoding="async"
                    className="w-full h-full object-contain drop-shadow-xl" 
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
                
                <div className="flex-1 space-y-2 text-center md:text-left">
                  <h3 className="text-xl font-black uppercase tracking-tight">{item.name}</h3>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{item.category}</p>
                  <p className="text-primary font-black text-lg">${item.price}</p>
                </div>

                <div className="flex items-center glass rounded-2xl border-white/5 p-1 backdrop-blur-3xl">
                  <button 
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="p-3 hover:bg-white/10 rounded-xl transition-all"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-10 text-center font-black">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-3 hover:bg-white/10 rounded-xl transition-all"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-4 glass rounded-2xl text-rose-500 hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-lg border-white/5"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4 mt-12 lg:mt-0">
          <div className="glass p-10 rounded-[3rem] border-white/10 space-y-8 sticky top-32 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-10 group-hover:bg-primary/10 transition-colors" />
            
            <h2 className="text-2xl font-black uppercase italic tracking-tighter">ORDER SUMMARY</h2>
            
            <div className="space-y-6 font-black text-[10px] tracking-widest text-slate-500">
              <div className="flex justify-between uppercase">
                <span>SUBTOTAL</span>
                <span className="text-slate-900 dark:text-white">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between uppercase">
                <span>SHIPPING</span>
                <span className="text-emerald-500 underline underline-offset-4 cursor-default">COMPLIMENTARY</span>
              </div>
              <div className="flex justify-between uppercase">
                <span>ESTIMATED TAX</span>
                <span className="text-slate-900 dark:text-white">$0.00</span>
              </div>
            </div>

            <div className="h-[2px] bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

            <div className="flex justify-between items-end">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">FINAL AGGREGATE</span>
              <span className="text-4xl font-black text-primary drop-shadow-xl shadow-primary/30">${totalPrice.toFixed(2)}</span>
            </div>

            <div className="space-y-4 pt-4">
                <Link to="/checkout" className="block">
                    <Button variant="accent" className="w-full py-5 text-base tracking-widest font-black uppercase shadow-primary/30">
                        INITIATE CHECKOUT <ArrowRight size={20} />
                    </Button>
                </Link>
                <div className="flex items-center justify-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <ShieldCheck size={14} className="text-emerald-500" /> ENCRYPTED TRANSACTION
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
