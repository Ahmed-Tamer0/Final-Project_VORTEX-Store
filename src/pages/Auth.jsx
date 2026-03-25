import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Github, Chrome, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [errors, setErrors] = useState({});

  const { login, register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'EMAIL IS REQUIRED';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'INVALID EMAIL PROTOCOL';
    
    if (!formData.password) newErrors.password = 'ACCESS KEY REQUIRED';
    else if (formData.password.length < 6) newErrors.password = 'MINIMUM 6 CHARACTERS';
    
    if (!isLogin && !formData.name) newErrors.name = 'OPERATOR NAME REQUIRED';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
        const success = isLogin 
        ? login(formData.email, formData.password)
        : register({ name: formData.name, email: formData.email, password: formData.password });

        if (success) {
            showToast(isLogin ? 'WELCOME BACK, AGENT.' : 'IDENTITY ESTABLISHED.', 'success');
            navigate('/');
        } else {
            showToast(isLogin ? 'INVALID CREDENTIALS' : 'USER IDENTITY ALREADY EXISTS', 'error');
        }
        setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
        className="max-w-[1000px] w-full grid grid-cols-1 lg:grid-cols-2 glass rounded-[3rem] overflow-hidden shadow-3d border-white/10"
      >
        {/* Left Side: Illustration/Text */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-primary via-secondary to-accent relative overflow-hidden text-white">
          <div className="relative z-10 space-y-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-3xl font-black shadow-2xl">V</div>
            <h2 className="text-5xl font-black tracking-tighter leading-none italic uppercase">THE VORTEX CORE</h2>
            <p className="text-white/80 font-medium leading-relaxed max-w-xs uppercase tracking-widest text-xs">JOIN THE MOST ADVANCED COMMERCE GRID IN THE SECTOR.</p>
          </div>
          
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3 glass p-4 rounded-2xl border-white/20">
              <ShieldCheck className="text-white" size={24} />
              <div className="text-[10px] font-black tracking-widest uppercase">ENCRYPTION: ACTIVE (AES-256)</div>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] opacity-30 animate-pulse"></div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-12 lg:p-16 space-y-10 bg-white/5 dark:bg-slate-900/50">
          <div className="space-y-2">
            <h3 className="text-3xl font-black tracking-tighter uppercase italic">{isLogin ? 'ACCESS INTERFACE' : 'ESTABLISH IDENTITY'}</h3>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">
              {isLogin ? 'PROVIDE ACCESS CREDENTIALS' : 'CREATE YOUR OPERATOR PROFILE'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                  className="space-y-2"
                >
                  <label className="block text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase">FULL NAME</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="JOHN DOE"
                      className={`w-full glass py-4 pl-12 pr-4 rounded-2xl border-white/10 focus:border-primary/50 transition-all outline-none font-bold placeholder:text-slate-500 ${errors.name ? 'border-rose-500/50' : ''}`}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  {errors.name && <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest">{errors.name}</p>}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase">EMAIL PORT</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  placeholder="USER@VORTEX.IO"
                  className={`w-full glass py-4 pl-12 pr-4 rounded-2xl border-white/10 focus:border-primary/50 transition-all outline-none font-bold placeholder:text-slate-500 ${errors.email ? 'border-rose-500/50' : ''}`}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              {errors.email && <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase">ACCESS KEY</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className={`w-full glass py-4 pl-12 pr-4 rounded-2xl border-white/10 focus:border-primary/50 transition-all outline-none font-bold placeholder:text-slate-500 ${errors.password ? 'border-rose-500/50' : ''}`}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
              {errors.password && <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest">{errors.password}</p>}
            </div>

            <Button isLoading={isLoading} variant="accent" className="w-full py-5 text-sm tracking-widest font-black uppercase shadow-primary/20">
              {isLogin ? 'INITIALIZE SESSION' : 'CREATE PROFILE'} <ArrowRight size={20} />
            </Button>
          </form>

          <div className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
              <div className="relative flex justify-center text-[10px] font-black uppercase"><span className="bg-slate-900 px-4 text-slate-500 tracking-widest leading-none">OR LINK WITH</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="glass p-4 rounded-2xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest">
                <Github size={16} /> GitHub
              </button>
              <button className="glass p-4 rounded-2xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest">
                <Chrome size={16} /> Google
              </button>
            </div>

            <p className="text-center text-[11px] font-bold text-slate-500 uppercase tracking-widest">
              {isLogin ? "NO IDENTITY YET?" : "ALREADY ESTABLISHED?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-primary hover:text-accent transition-colors underline underline-offset-4"
              >
                {isLogin ? 'CREATE ONE' : 'LOGIN HERE'}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
