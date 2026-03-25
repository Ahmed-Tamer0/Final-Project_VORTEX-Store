import { memo } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export const Button = memo(({ children, variant = 'primary', className = '', isLoading = false, ...props }) => {
  const variants = {
    primary: 'bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 shadow-xl',
    secondary: 'glass text-slate-800 dark:text-white hover:bg-white/10',
    accent: 'bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-xl glow-primary',
    outline: 'border-2 border-slate-200 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5'
  };

  return (
    <motion.button
      whileHover={{ scale: isLoading ? 1 : 1.05, y: isLoading ? 0 : -2 }}
      whileTap={{ scale: isLoading ? 1 : 0.95 }}
      disabled={isLoading}
      className={`px-8 py-4 rounded-2xl font-black text-sm tracking-widest transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" size={18} />
          <span>PLEASE WAIT...</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';
