import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    id: '01',
    question: 'How long does shipping take?',
    answer: 'Orders are processed within 24 hours. Domestic shipping typically takes 2-3 business days, while international secure delivery can take 5-7 business days depending on customs.'
  },
  {
    id: '02',
    question: 'What is your return policy?',
    answer: 'We offer a 30-day transcended experience guarantee. If your artifact is defective or doesn\'t meet your expectations, return it in original condition for a full refund.'
  },
  {
    id: '03',
    question: 'Are the products authentic?',
    answer: 'Every item in the Vortex collection is 100% verified and authentic. We partner directly with premium manufacturers to ensure highest-grade components.'
  },
  {
    id: '04',
    question: 'Is international shipping available?',
    answer: 'Yes, we operate an encrypted global fulfillment network. Shipping rates and delivery times are calculated at checkout based on your sector destination.'
  }
];

export const FAQ = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="px-4 max-w-4xl mx-auto space-y-12 w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-xs font-bold tracking-widest text-secondary border-secondary/20 uppercase">
          Support Grid
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">FREQUENTLY ASKED</h2>
      </motion.div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openId === faq.id;

          return (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`glass rounded-2xl border-white/10 transition-colors duration-300 overflow-hidden ${
                isOpen ? 'bg-primary/5 border-primary/30' : 'hover:border-white/20'
              }`}
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
              >
                <div className="flex items-center gap-6">
                  <span className="text-sm font-black text-slate-400 font-mono">{faq.id}</span>
                  <h3 className="text-lg md:text-xl font-bold tracking-tight">{faq.question}</h3>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-slate-800'}`}
                >
                  <ChevronDown size={18} />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 pt-2 pl-[4.5rem] text-slate-500 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
