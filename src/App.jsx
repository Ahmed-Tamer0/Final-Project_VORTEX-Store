import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Suspense, lazy, useEffect, memo } from 'react';

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Products = lazy(() => import('./pages/Products').then(m => ({ default: m.Products })));
const ProductDetail = lazy(() => import('./pages/ProductDetail').then(m => ({ default: m.ProductDetail })));
const Cart = lazy(() => import('./pages/Cart').then(m => ({ default: m.Cart })));
const Checkout = lazy(() => import('./pages/Checkout').then(m => ({ default: m.Checkout })));
const Auth = lazy(() => import('./pages/Auth').then(m => ({ default: m.Auth })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Favorites = lazy(() => import('./pages/Favorites').then(m => ({ default: m.Favorites })));
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { AnimatedBackground } from './components/AnimatedBackground';
import { PageLoader } from './components/PageLoader';
import { CustomCursor } from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';
import { motion, AnimatePresence } from 'framer-motion';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/auth" />;
};

const AnimatedRoutes = memo(() => {
  const location = useLocation();

  useEffect(() => {
    const getPageTitle = (path) => {
      if (path === '/') return 'Home';
      if (path.startsWith('/product/')) return 'Product';
      
      const cleanPath = path.substring(1);
      if (!cleanPath) return '';
      return cleanPath.charAt(0).toUpperCase() + cleanPath.slice(1);
    };

    const pageTitle = getPageTitle(location.pathname);
    document.title = pageTitle ? `Vortex || ${pageTitle}` : 'Vortex';
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, scale: 0.98, translateY: 10 }}
        animate={{ opacity: 1, scale: 1, translateY: 0 }}
        exit={{ opacity: 0, scale: 1.02, translateY: -10 }}
        transition={{ 
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1] // Apple-style premium easing
        }}
      >
        <Suspense fallback={
          <div className="min-h-[80vh] flex flex-col items-center justify-center gap-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-primary/10 rounded-full animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-primary text-[10px] font-black tracking-[0.4em] uppercase animate-pulse">Synchronizing</span>
              <div className="w-32 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full bg-primary"
                />
              </div>
            </div>
          </div>
        }>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
});

AnimatedRoutes.displayName = 'AnimatedRoutes';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <ToastProvider>
                <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-500 selection:bg-primary/30 selection:text-white relative">
                  <ScrollToTop />
                  <PageLoader />
                  <CustomCursor />
                  <AnimatedBackground />
                  <Navbar />
                  <div className="pt-20">
                    <AnimatedRoutes />
                  </div>
                  <Footer />
                </div>
              </ToastProvider>
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
