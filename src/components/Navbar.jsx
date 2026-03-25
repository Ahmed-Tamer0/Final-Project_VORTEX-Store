import { useState, useEffect } from 'react';
import { ShoppingBag, Search, User, Menu, X, LogOut, Moon, Sun, Heart, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';
import { Button } from './Button';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, logout, isLoggedIn } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 w-[96%] max-w-7xl ${isScrolled ? 'top-4' : 'top-8'}`}>
      <div className={`glass rounded-3xl px-6 md:px-10 py-5 flex items-center justify-between shadow-2xl transition-all duration-700 border-white/10 ${isScrolled ? 'py-4 backdrop-blur-2xl shadow-primary/5' : 'backdrop-blur-xl'}`}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 45, scale: 1.1 }}
            className="w-10 h-10 bg-gradient-to-tr from-primary via-secondary to-accent rounded-xl shadow-lg flex items-center justify-center text-white font-black text-xl glow-primary"
          >
            V
          </motion.div>
          <span className="text-2xl font-black bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-white/70 dark:to-white bg-clip-text text-transparent tracking-tighter hidden lg:block">
            VORTEX
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-[11px] font-black tracking-[0.2em] text-slate-500 dark:text-slate-400">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative hover:text-slate-900 dark:hover:text-white transition-colors group py-2 uppercase`}
            >
              {link.name}
              <motion.div
                className={`absolute bottom-0 left-0 h-[2px] bg-primary rounded-full w-0 group-hover:w-full transition-all duration-700 ease-premium ${location.pathname === link.path ? 'w-full' : ''}`}
              />
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/" className="p-3 hover:bg-black/5 dark:hover:bg-white/10 rounded-2xl transition-all duration-300">
            <Home size={20} />
          </Link>

          <button
            onClick={toggleTheme}
            className="p-3 hover:bg-black/5 dark:hover:bg-white/10 rounded-2xl transition-all duration-300"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link to="/favorites" className="p-3 hover:bg-black/5 dark:hover:bg-white/10 rounded-2xl transition-all duration-300 relative group">
            <Heart size={20} className={favorites.length > 0 ? "text-rose-500" : ""} fill={favorites.length > 0 ? "currentColor" : "none"} />
            <AnimatePresence>
              {favorites.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full shadow-lg"
                />
              )}
            </AnimatePresence>
          </Link>

          <Link to="/cart" className="p-3 hover:bg-black/5 dark:hover:bg-white/10 rounded-2xl transition-all duration-300 relative group">
            <ShoppingBag size={20} />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0, y: 10 }}
                  className="absolute top-2 right-2 w-5 h-5 bg-primary text-[10px] flex items-center justify-center rounded-full font-black text-white shadow-lg shadow-primary/30"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center gap-4 ml-2">
              <div className="hidden lg:flex flex-col items-end">
                <span className="text-[10px] font-black text-slate-500 tracking-widest leading-none uppercase">Commander</span>
                <span className="text-xs font-black text-slate-800 dark:text-white uppercase">{user?.name ? user.name.split(' ')[0] : (typeof user === 'string' ? user.split('@')[0] : 'USER')}</span>
              </div>
              <button onClick={logout} className="p-3 hover:bg-rose-500/10 hover:text-rose-400 rounded-2xl transition-all duration-300">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/auth">
              <Button variant="accent" className="hidden md:flex py-2 px-6 text-[10px] tracking-widest font-black uppercase">Login</Button>
            </Link>
          )}

          <button
            className="md:hidden p-3 glass rounded-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="absolute top-[calc(100%+1rem)] left-0 w-full glass rounded-3xl p-10 border-white/10 shadow-3xl md:hidden"
          >
            <div className="flex flex-col gap-8 text-center text-xl font-black tracking-tighter">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors uppercase">
                  {link.name}
                </Link>
              ))}
              <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors uppercase flex items-center justify-center gap-2">
                Cart {totalItems > 0 && <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">{totalItems}</span>}
              </Link>
              <Link to="/favorites" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors uppercase flex items-center justify-center gap-2">
                Favorites {favorites.length > 0 && <span className="text-xs bg-rose-500 text-white px-2 py-0.5 rounded-full">{favorites.length}</span>}
              </Link>
              {!isLoggedIn && (
                <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="accent" className="w-full py-4 text-sm tracking-widest font-black uppercase">Login</Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
