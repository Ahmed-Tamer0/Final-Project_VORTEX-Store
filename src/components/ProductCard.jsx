import { memo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

export const ProductCard = memo(({ product, viewMode = 'grid' }) => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    addToCart(product);
    showToast(`${product.name} Added to Inventory`, 'success');
    navigate('/cart');
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    const beingAdded = !isFavorite(product.id);
    toggleFavorite(product);
    showToast(beingAdded ? 'Added to Protocols' : 'Removed from Protocols', 'info');
  };

  const goToDetails = () => {
    navigate(`/product/${product.id}`);
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="group relative w-full perspective-1000 gpu-accelerated"
        onClick={goToDetails}
      >
        <div className="glass-card flex flex-col sm:flex-row items-center gap-8 p-6 hover-lift preserve-3d cursor-pointer group-hover:glow-primary dark:group-hover:glow-primary group-hover:glow">
          <div className="relative w-full sm:w-64 h-64 shrink-0 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900/80 flex items-center justify-center p-6 shadow-inner">
            <motion.img
              src={product.image}
              alt={product.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-2xl"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
          <div className="flex-1 space-y-4 text-center sm:text-left">
            <div>
              <h3 className="text-3xl font-black group-hover:text-primary transition-colors tracking-tight line-clamp-2">{product.name}</h3>
              <div className="flex justify-center sm:justify-start items-center gap-4 mt-2">
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{product.category}</span>
                <span className="text-accent font-black text-2xl">${product.price}</span>
              </div>
            </div>
            <p className="text-slate-500 text-sm line-clamp-2 font-medium max-w-2xl">{product.description}</p>
            <div className="flex items-center justify-center sm:justify-start gap-4 pt-4">
              <Button 
                variant="accent" 
                className="px-8 py-3 text-xs tracking-widest font-black uppercase"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={16} /> ADD TO CART
              </Button>
              <button 
                onClick={handleToggleFavorite}
                className={`p-3 glass rounded-full transition-all duration-300 ${isFavorite(product.id) ? 'text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)] border-rose-500/20' : 'text-slate-400 hover:text-rose-500 hover:shadow-[0_0_15px_rgba(244,63,94,0.5)]'}`}
              >
                <Heart size={20} fill={isFavorite(product.id) ? "currentColor" : "none"} />
              </button>
              <button 
                className="p-3 glass rounded-full text-slate-400 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-300"
                onClick={(e) => { e.stopPropagation(); goToDetails(); }}
              >
                <Eye size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid View (Default)
  return (
    <motion.div
      layout
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="group relative perspective-1000 gpu-accelerated"
      onClick={goToDetails}
    >
      <div className="glass-card hover-lift p-4 preserve-3d cursor-pointer group-hover:glow-primary dark:group-hover:glow-primary group-hover:glow bg-white/50 dark:bg-transparent transition-all duration-500 ease-premium">
        <div className="relative aspect-square mb-6 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900/80 flex items-center justify-center shadow-inner">
          <motion.img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700 drop-shadow-2xl"
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
          />
          
          <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
            <button 
              onClick={handleToggleFavorite}
              className={`p-3 glass rounded-full transition-all duration-300 ${isFavorite(product.id) ? 'text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)] border-rose-500/20' : 'text-slate-400 hover:text-rose-500 hover:shadow-[0_0_15px_rgba(244,63,94,0.5)]'}`}
            >
              <Heart size={20} fill={isFavorite(product.id) ? "currentColor" : "none"} />
            </button>
            <button 
              className="p-3 glass rounded-full text-slate-400 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-300"
              onClick={(e) => { e.stopPropagation(); goToDetails(); }}
            >
              <Eye size={20} />
            </button>
          </div>

          <div className="absolute bottom-4 left-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <Button 
              variant="accent" 
              className="w-full py-3 text-xs tracking-widest font-black uppercase"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} /> ADD TO CART
            </Button>
          </div>
        </div>

        <div className="space-y-2 px-2">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-black group-hover:text-primary transition-colors tracking-tight line-clamp-1">{product.name}</h3>
            <span className="text-accent font-black text-lg">${product.price}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{product.category}</span>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-slate-500/20 to-transparent" />
          </div>
        </div>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';
