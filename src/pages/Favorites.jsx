import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/Button';

export const Favorites = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="pt-40 pb-40 text-center space-y-8 px-4">
        <motion.div 
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-24 h-24 glass rounded-full mx-auto flex items-center justify-center text-rose-500"
        >
          <Heart size={48} fill="currentColor" />
        </motion.div>
        <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">NO SAVED PROTOCOLS</h2>
        <p className="text-slate-400 max-w-sm mx-auto font-medium">Your personal collection is empty. Explore the catalog to save your favorite artifacts.</p>
        <div className="flex justify-center">
          <Link to="/products">
            <Button variant="accent" className="px-10 py-4 uppercase font-black tracking-widest">EXPLORE CATALOG</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-20 px-4 max-w-7xl mx-auto space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
        className="space-y-4"
      >
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none">SAVED PROTOCOLS</h1>
        <p className="text-slate-400 uppercase tracking-widest text-xs font-bold">{favorites.length} ARTIFACTS SAVED</p>
      </motion.div>

      <motion.div 
        layout
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        <AnimatePresence mode='popLayout'>
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
