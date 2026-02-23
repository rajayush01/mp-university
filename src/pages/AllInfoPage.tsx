import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight, Info } from 'lucide-react';
import { allInfoData, detailedInfoData, DepartmentType } from '@/data/allInfoData';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  .allinfo-section { font-family: 'DM Sans', sans-serif; }
  .allinfo-display  { font-family: 'Cormorant Garamond', serif; }
  .sidebar-scroll::-webkit-scrollbar { width: 3px; }
  .sidebar-scroll::-webkit-scrollbar-thumb { background: #555; }
`;

const AllInfoPage: React.FC = () => {
  const { department } = useParams<{ department: string }>();
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const currentDept = department ? allInfoData[department as DepartmentType] : null;
  const sections    = department ? detailedInfoData[department as DepartmentType] : null;

  useEffect(() => {
    if (sections) {
      const first = Object.keys(sections)[0];
      if (first) setSelectedSection(first);
    }
  }, [department, sections]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);

  if (!currentDept || !sections) {
    return (
      <div className="allinfo-section min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} className="mb-6">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
              <span className="text-3xl">📭</span>
            </div>
          </motion.div>
          <h2 className="allinfo-display text-3xl font-semibold text-black mb-3">Department not found</h2>
          <p className="text-gray-500 mb-8 font-light">The department you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-black text-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-gray-900 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const currentSection = sections[selectedSection];
  const currentData    = currentSection?.items || [];

  return (
    <>
      <style>{styles}</style>
      <div className="allinfo-section min-h-screen mt-40" style={{ background: '#fafafa' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Back + Title */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors text-sm mb-5"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
            <div className="flex items-center gap-4 mb-2">
              <div className="h-px w-10 bg-black" />
              <p className="text-xs uppercase tracking-[0.25em] text-gray-400">Information Portal</p>
            </div>
            <h1 className="allinfo-display text-4xl font-semibold text-black">{currentDept.title}</h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* ── Sidebar ── */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-3"
            >
              <div className="rounded-sm overflow-hidden sticky top-6" style={{ background: '#111', border: '1px solid #222' }}>
                <div className="px-5 py-4" style={{ borderBottom: '1px solid #222' }}>
                  <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-1">Browse</p>
                  <h2 className="allinfo-display text-lg text-white">Important Links</h2>
                </div>
                <nav className="sidebar-scroll overflow-y-auto" style={{ maxHeight: '60vh' }}>
                  {Object.entries(sections).map(([key, section]) => (
                    <motion.button
                      key={key}
                      onClick={() => setSelectedSection(key)}
                      whileHover={{ x: 4 }}
                      className="w-full text-left px-5 py-3.5 transition-all duration-200 flex items-center gap-3"
                      style={{
                        borderBottom: '1px solid #1a1a1a',
                        background: selectedSection === key ? 'rgba(255,255,255,0.08)' : 'transparent',
                        borderLeft: selectedSection === key ? '3px solid #fff' : '3px solid transparent',
                      }}
                    >
                      <span className="text-base">{section.icon}</span>
                      <span className={`text-sm font-medium ${selectedSection === key ? 'text-white' : 'text-gray-400'}`}>
                        {section.label}
                      </span>
                      {selectedSection === key && <ChevronRight className="w-3.5 h-3.5 text-gray-400 ml-auto" />}
                    </motion.button>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* ── Main Content ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="lg:col-span-9"
            >
              {/* Content Header */}
              <div
                className="rounded-sm overflow-hidden"
                style={{ background: '#fff', border: '1px solid #e5e5e5' }}
              >
                <div className="px-6 py-5" style={{ borderBottom: '3px solid #111' }}>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1">Viewing</p>
                  <h2 className="allinfo-display text-3xl font-semibold text-black">
                    {currentSection?.label || 'Information'}
                  </h2>
                </div>

                {/* Item List */}
                <div className="divide-y" style={{ divideColor: '#f5f5f5' }}>
                  {currentData.map((item, index) => {
                    const itemKey = `${selectedSection}-${item.id}`;
                    return (
                      <motion.div
                        key={itemKey}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.04 }}
                        className="relative overflow-hidden cursor-pointer group"
                        onMouseEnter={() => setActiveItem(itemKey)}
                        onMouseLeave={() => setActiveItem(null)}
                      >
                        {/* Hover bg */}
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: activeItem === itemKey ? 1 : 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="absolute inset-0 origin-left"
                          style={{ background: '#f9f9f9' }}
                        />

                        <div className="relative px-6 py-4 flex items-start gap-4">
                          <span className="text-gray-300 font-bold text-lg mt-0.5 min-w-[24px] group-hover:text-black transition-colors">»</span>
                          <div className="flex-1">
                            <div className="flex items-start gap-3 flex-wrap">
                              <p className="text-gray-700 group-hover:text-black transition-colors text-sm font-medium flex-1 leading-relaxed">
                                {item.title}
                              </p>
                              {item.isNew && (
                                <span className="bg-black text-white text-xs px-2.5 py-0.5 font-medium uppercase tracking-wider flex-shrink-0">
                                  New
                                </span>
                              )}
                            </div>
                            {item.date && (
                              <p className="text-gray-400 text-xs mt-1.5 font-light">
                                {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                              </p>
                            )}
                            {item.content && (
                              <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: activeItem === itemKey ? 1 : 0, height: activeItem === itemKey ? 'auto' : 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-gray-500 text-sm mt-2 overflow-hidden font-light leading-relaxed"
                              >
                                {item.content}
                              </motion.p>
                            )}
                          </div>
                          <motion.span
                            initial={{ x: -8, opacity: 0 }}
                            animate={{ x: activeItem === itemKey ? 0 : -8, opacity: activeItem === itemKey ? 1 : 0 }}
                            transition={{ duration: 0.25 }}
                            className="text-black text-lg"
                          >
                            →
                          </motion.span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Empty state */}
                {currentData.length === 0 && (
                  <div className="px-6 py-20 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📭</span>
                    </div>
                    <p className="text-gray-500 font-light">No items available at the moment.</p>
                    <p className="text-gray-400 text-sm mt-1">Check back later for updates.</p>
                  </div>
                )}
              </div>

              {/* Info Box */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-5 p-5 rounded-sm flex items-start gap-4"
                style={{ background: '#fff', border: '1px solid #e5e5e5', borderLeft: '3px solid #111' }}
              >
                <Info className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-black text-sm mb-1">Need More Information?</h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">
                    For additional details or inquiries, please contact the respective department office or visit the university help desk.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllInfoPage;