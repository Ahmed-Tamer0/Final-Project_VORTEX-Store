import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, LayoutGrid, List, ArrowUpDown, ChevronDown } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const Products = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortOptions = [
    { value: 'newest', label: 'NEWEST RELEASES' },
    { value: 'price-low', label: 'PRICE: LOW TO HIGH' },
    { value: 'price-high', label: 'PRICE: HIGH TO LOW' },
  ];

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                             p.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === 'All' || p.category === category;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return 0; // newest/default
      });
  }, [search, category, sortBy]);

  return (
    <div className="min-h-screen pb-20 px-4 space-y-12 max-w-7xl mx-auto pt-10">
      {/* Header Section */}
      <section className="space-y-6 text-center md:text-left">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-[10px] font-black tracking-widest text-primary border-primary/20"
        >
          <LayoutGrid size={14} /> CATALOG ACCESS
        </motion.div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">The Collection</h1>
            <p className="text-slate-500 max-w-md font-medium">Browse our curated selection of high-performance tech artifacts and digital instruments.</p>
          </div>
          <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl glass">
            <button 
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-primary text-white shadow-lg' : 'hover:bg-primary/20'}`}
            >
              <LayoutGrid size={20} />
            </button>
            <button 
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-primary text-white shadow-lg' : 'hover:bg-primary/20'}`}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="relative z-50 glass p-6 rounded-[2.5rem] border-white/10 shadow-2xl space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Search Input */}
            <div className="lg:col-span-4 relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                <input 
                    type="text" 
                    placeholder="Search artifacts..."
                    className="w-full glass py-5 pl-14 pr-6 rounded-2xl border-white/10 focus:border-primary/50 outline-none font-black tracking-widest text-sm placeholder:text-slate-500 transition-all shadow-inner"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Category Pills */}
            <div className="lg:col-span-5 flex flex-wrap justify-center items-center gap-3 font-black text-[10px]">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`relative px-4 lg:px-6 py-3 lg:py-4 rounded-xl whitespace-nowrap transition-all duration-500 border-none group ${category === cat ? 'text-white' : 'glass hover:bg-primary/20 text-slate-500 hover:text-primary dark:hover:text-white'}`}
                    >
                        {category === cat && (
                          <motion.div 
                            layoutId="activeCategory"
                            className="absolute inset-0 bg-primary rounded-xl shadow-lg shadow-primary/30 -z-10"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">{cat === 'All' ? 'ALL' : cat.toUpperCase()}</span>
                    </button>
                ))}
            </div>

            {/* Sort Dropdown */}
            <div className="lg:col-span-3 relative">
                <button 
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  onBlur={() => setTimeout(() => setIsSortOpen(false), 200)}
                  className="w-full glass py-5 px-4 rounded-2xl border-white/10 hover:border-primary/50 transition-all font-black tracking-widest text-[10px] flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2 text-slate-500 group-hover:text-primary transition-colors">
                    <ArrowUpDown size={16} /> 
                    <span className="text-slate-900 dark:text-white uppercase group-hover:text-primary transition-colors">
                      {sortOptions.find(o => o.value === sortBy)?.label}
                    </span>
                  </div>
                  <ChevronDown size={14} className={`text-slate-500 transition-transform duration-300 ${isSortOpen ? 'rotate-180 text-primary' : ''}`} />
                </button>

                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-[calc(100%+10px)] left-0 w-full glass rounded-2xl border-white/10 shadow-2xl overflow-hidden z-50 p-2 space-y-1 backdrop-blur-2xl"
                    >
                      {sortOptions.map(option => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setIsSortOpen(false);
                          }}
                          className={`w-full text-left px-4 py-4 rounded-xl text-[10px] font-black tracking-widest transition-all ${sortBy === option.value ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-[1.02]' : 'hover:bg-primary/20 text-slate-500 hover:text-primary dark:hover:text-white hover:scale-[1.02]'}`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="relative min-h-[400px]">
        <AnimatePresence mode="popLayout">
            {filteredProducts.length > 0 ? (
                <motion.div 
                    layout
                    initial="hidden"
                    animate="visible"
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
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`}
                >
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} viewMode={viewMode} />
                    ))}
                </motion.div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-40 glass rounded-[3rem] border-dashed border-white/10"
                >
                    <Search className="mx-auto text-slate-500 mb-6" size={64} />
                    <h2 className="text-3xl font-black italic tracking-tighter uppercase">No matches found</h2>
                    <p className="text-slate-500 font-medium">Try adjusting your search or filters to find what you're looking for.</p>
                </motion.div>
            )}
        </AnimatePresence>
      </section>
    </div>
  );
};
