import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { allInfoData, DepartmentType } from '@/data/allInfoData';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  .events-section { font-family: 'DM Sans', sans-serif; }
  .events-display  { font-family: 'Cormorant Garamond', serif; }
  .scrollbar-mono::-webkit-scrollbar { width: 3px; }
  .scrollbar-mono::-webkit-scrollbar-track { background: #f0f0f0; }
  .scrollbar-mono::-webkit-scrollbar-thumb { background: #aaa; border-radius: 2px; }
`;

const EventsSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleViewAll = (key: DepartmentType) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/all-info/${key}`);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="events-section px-4 sm:px-10 py-24" style={{ background: 'linear-gradient(180deg, #fafafa 0%, #fff 100%)' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 max-w-7xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-black" />
            <div className="w-2 h-2 rotate-45 bg-black" />
            <div className="h-px w-16 bg-black" />
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">Resources & Governance</p>
          <h2 className="events-display text-5xl sm:text-6xl font-semibold text-black mb-6">
            Quick <span className="italic font-normal">Information</span>
          </h2>
          <p className="text-base text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
            Access important resources and information about our institute's administration, policies, and governance.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {(Object.keys(allInfoData) as DepartmentType[]).map((key, idx) => {
            const dept = allInfoData[key]!;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
                whileHover={{ y: -8, boxShadow: '0 24px 48px rgba(0,0,0,0.12)' }}
                className="relative flex flex-col overflow-hidden max-h-[420px] rounded-sm"
                style={{ background: '#fff', border: '1px solid #e5e5e5', transition: 'box-shadow 0.3s ease' }}
              >
                {/* Top accent line that expands on hover */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute top-0 left-0 right-0 h-0.5 bg-black origin-left"
                  style={{ zIndex: 10 }}
                />

                {/* Corner bracket */}
                <div className="absolute top-0 left-0 w-5 h-5 pointer-events-none" style={{ borderTop: '2px solid #111', borderLeft: '2px solid #111' }} />
                <div className="absolute bottom-0 right-0 w-5 h-5 pointer-events-none" style={{ borderBottom: '2px solid #111', borderRight: '2px solid #111' }} />

                {/* Title */}
                <div className="px-5 py-4 sticky top-0 z-10 bg-white" style={{ borderBottom: '1px solid #eee' }}>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1">Section</p>
                  <h3 className="events-display text-xl font-semibold text-black">{dept.title}</h3>
                </div>

                {/* Scrollable List */}
                <ul className="flex-1 divide-y overflow-y-auto scrollbar-mono" style={{ divideColor: '#f5f5f5' }}>
                  {dept.items.map((item, index) => {
                    const itemKey = `${key}-${index}`;
                    return (
                      <motion.li
                        key={itemKey}
                        className="relative overflow-hidden px-5 py-3 text-sm text-gray-600 cursor-pointer select-none"
                        onMouseEnter={() => setActiveItem(itemKey)}
                        onMouseLeave={() => setActiveItem(null)}
                        onClick={() => handleViewAll(key)}
                      >
                        <motion.span
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: activeItem === itemKey ? 1 : 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="absolute inset-0 bg-black origin-left z-0"
                        />
                        <span className={`relative z-10 flex items-center gap-2 transition-colors duration-200 ${activeItem === itemKey ? 'text-white' : ''}`}>
                          <ChevronRight className="w-3 h-3 flex-shrink-0 opacity-50" />
                          {item}
                        </span>
                      </motion.li>
                    );
                  })}
                </ul>

                {/* View All Button */}
                <motion.button
                  onClick={() => handleViewAll(key)}
                  whileTap={{ scale: 0.97 }}
                  className="relative overflow-hidden bg-black text-white py-3.5 font-medium flex items-center justify-center gap-2 text-xs uppercase tracking-widest transition-colors hover:bg-gray-900"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View All
                    <motion.span whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>→</motion.span>
                  </span>
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default EventsSection;