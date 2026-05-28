import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-20 border-t border-red-950/20 bg-black/40 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-900/30 text-red-500 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle size={14} className="text-red-500 animate-pulse" />
            <span>Support</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Frequently Asked <span className="text-red-600 bg-clip-text">Questions</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            Everything you need to know about extracting video and high-end audio streams.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                id={`faq-item-${idx}`}
                key={idx}
                className="rounded-2xl border border-red-950/20 bg-zinc-950/80 hover:bg-zinc-950 hover:border-red-900/30 transition-all duration-300 overflow-hidden"
              >
                <button
                  id={`faq-btn-${idx}`}
                  onClick={() => toggleIndex(idx)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer select-none"
                >
                  <span className="font-semibold text-white pr-4 text-sm sm:text-base">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="flex-shrink-0 text-red-500 rounded-lg p-1 bg-red-950/30"
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-gray-400 text-sm leading-relaxed border-t border-zinc-900">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
