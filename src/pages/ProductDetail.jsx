import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ShoppingCart, Heart, Shield, Zap, Globe, Star, Minus, Plus } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/Button';
import { ProductCard } from '../components/ProductCard';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  // Ensure ID is handled as a number and add defensive check
  const product = useMemo(() => {
    if (!id) return null;
    const numericId = parseInt(id);
    return products.find(p => p.id === numericId || p.id === id);
  }, [id]);

  const relatedProducts = useMemo(() => 
    product ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4) : []
  , [product]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center space-y-8">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           className="w-24 h-24 glass rounded-[2rem] flex items-center justify-center text-primary border-primary/20 bg-primary/5 shadow-2xl glow-primary"
        >
          <Globe size={40} className="animate-pulse" />
        </motion.div>
        <div className="space-y-4">
          <h2 className="text-4xl font-black italic tracking-tighter uppercase">Protocol Not Found</h2>
          <p className="text-slate-500 font-medium max-w-xs mx-auto text-sm uppercase tracking-widest">The requested artifact ID {id} does not exist in the current sector.</p>
        </div>
        <Link to="/products">
          <Button variant="primary" className="px-10 py-4 text-[10px] font-black tracking-[0.3em] uppercase">Return to Catalog</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for(let i = 0; i < quantity; i++) {
        addToCart(product);
    }
    showToast(`${product.name} SYNTHESIZED INTO REPO`, 'success');
    navigate('/cart');
  };

  return (
    <div className="min-h-screen pb-20 px-4 pt-10 max-w-7xl mx-auto space-y-20">
      <Link to="/products" className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-slate-500 hover:text-white transition-colors group uppercase">
        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> BACK TO CATALOG
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image Section */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.98, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            className="relative glass-card aspect-square p-12 flex items-center justify-center group overflow-hidden animate-soft-float"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <motion.img 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            src={product.image} 
            alt={product.name} 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 group-hover:scale-105 transition-transform duration-700"
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
          />
          <div className="absolute top-8 right-8 z-20">
             <button 
                onClick={() => toggleFavorite(product)}
                className={`p-4 glass rounded-2xl transition-all duration-300 ${isFavorite(product.id) ? 'text-rose-500 shadow-lg shadow-rose-500/20 scale-110' : 'hover:scale-110'}`}
             >
                <Heart size={24} fill={isFavorite(product.id) ? "currentColor" : "none"} />
             </button>
          </div>
        </motion.div>

        {/* Info Section */}
        <div className="space-y-10">
          <div className="space-y-4">
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest text-secondary uppercase"
            >
              <Zap size={14} /> NEW ARRIVAL PROTOCOL
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
              className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none italic"
            >
              {product.name}
            </motion.h1>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-1 text-amber-500">
                    {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                    <span className="text-xs font-black ml-2 text-slate-500 uppercase tracking-widest">NEURAL ANALYTICS</span>
                </div>
                <span className="text-3xl font-black text-accent">${product.price}</span>
            </div>
          </div>

          <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium text-lg uppercase tracking-tight">
            {product.description}
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-8">
                <div className="flex items-center glass p-2 rounded-2xl border-white/10">
                    <button 
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="p-3 hover:bg-white/10 rounded-xl transition-all"
                    >
                        <Minus size={20} />
                    </button>
                    <span className="w-12 text-center font-black text-xl">{quantity}</span>
                    <button 
                        onClick={() => setQuantity(q => q + 1)}
                        className="p-3 hover:bg-white/10 rounded-xl transition-all"
                    >
                        <Plus size={20} />
                    </button>
                </div>
                <Button variant="accent" onClick={handleAddToCart} className="flex-1 py-5 text-base shadow-primary/30 uppercase tracking-widest font-black">
                    <ShoppingCart size={22} /> ACQUIRE ARTIFACT
                </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                 <div className="glass p-5 rounded-2xl flex items-center gap-4 text-xs font-black tracking-widest border-white/5 uppercase">
                    <Shield className="text-primary" /> SECURE LINK
                 </div>
                 <div className="glass p-5 rounded-2xl flex items-center gap-4 text-xs font-black tracking-widest border-white/5 uppercase">
                    <Globe className="text-accent" /> WORLDWIDE DEPLOY
                 </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-12">
           <div className="space-y-2">
                <h2 className="text-3xl font-black tracking-tighter uppercase italic">SIMILAR PROTOCOLS</h2>
                <div className="h-1 w-20 bg-primary rounded-full" />
           </div>
           <motion.div 
             layout
             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
           >
             {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
           </motion.div>
        </section>
      )}
    </div>
  );
};
