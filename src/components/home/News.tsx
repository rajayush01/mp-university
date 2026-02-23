import React, { useState } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import img1 from "../../assets/mp1.png";
import img2 from "../../assets/mp2.png";
import img3 from "../../assets/mp3.png";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  .news-section  { font-family: 'DM Sans', sans-serif; }
  .news-display  { font-family: 'Cormorant Garamond', serif; }

  @keyframes tabSlide {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes cardIn {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .card-animate { animation: cardIn 0.45s cubic-bezier(0.16,1,0.3,1) backwards; }
  .tab-underline { animation: tabSlide 0.3s ease forwards; transform-origin: left; }
`;

interface EventItem {
  id: number;
  title: string;
  date: string;
  image: string;
  badge?: { text: string };
}

const News = () => {
  const [activeTab, setActiveTab] = useState<'webinars' | 'news' | 'events'>('webinars');

  const webinars: EventItem[] = [
    { id: 1, title: 'Viksit Bharat@2047: Voice of Youth', date: '16 December, 2023', image: img1 },
    { id: 2, title: 'राष्ट्रीय शिक्षा नीति-2020 और इसके एवं युवा शिक्षा पर भौतिक दृष्टि विशेषज्ञायुक्त के विचार', date: '22 July, 2023', image: img2 },
    { id: 3, title: 'मध्यप्रदेश भोज (मुक्त) विश्वविद्यालय भोपाल एवं पर्यावरण मंत्रालय के संयुक्त तत्वाधान में', date: '22 November, 2022', image: img3 },
  ];
  const news: EventItem[] = [
    { id: 1, title: 'M.Ed. Spl.Ed. Semi-Contact Class', date: 'Jul 9', badge: { text: 'New' }, image: img1 },
    { id: 2, title: 'Application form B.Ed. (Special Education-Distance Education) 2023-25', date: 'Jan 12', badge: { text: 'Updated' }, image: img2 },
    { id: 3, title: 'UGC approved programmes from academic year 2023-24, academic session beginning February, 2024 and onwards to Madhya Pradesh Bhoj (Open) University, Bhopal', date: 'Jan 12', badge: { text: 'New' }, image: img3 },
  ];
  const events: EventItem[] = [
    { id: 1, title: 'Viksit Bharat@2047: Voice of Youth', date: '16 December, 2023', image: img1 },
    { id: 2, title: 'चार प्रतिभाशाली युवा उर्जा के उपयोग से ही हम देश में ऊर्जा स्वरूप परिवर्तन कर सकते हैं', date: '26 August, 2023', image: img2 },
    { id: 3, title: 'राष्ट्रीय विज्ञान दिवस पर भोज विश्वविद्यालय में समारोह संपन्न।', date: '26 August, 2023', image: img3 },
  ];

  const tabData = { webinars, news, events };
  const tabs = [
    { key: 'webinars', label: 'Webinars' },
    { key: 'news',     label: 'News & Updates' },
    { key: 'events',   label: 'Our Events' },
  ] as const;

  return (
    <>
      <style>{styles}</style>
      <div className="news-section max-w-7xl mx-auto px-4 py-20" style={{ background: '#fff' }}>

        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-12 bg-black" />
            <p className="text-xs uppercase tracking-[0.28em] text-gray-400">Latest from the University</p>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="news-display text-5xl font-semibold text-black">
              Stay <span className="italic font-normal">Informed</span>
            </h2>
            <button className="text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors flex items-center gap-2 pb-1" style={{ borderBottom: '1px solid #ddd' }}>
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-0 mb-10" style={{ borderBottom: '1px solid #e5e5e5' }}>
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className="relative pb-4 px-6 text-sm font-medium transition-colors duration-200"
              style={{ color: activeTab === key ? '#111' : '#999', letterSpacing: '0.04em' }}
            >
              <span className="uppercase tracking-wider text-xs">{label}</span>
              {activeTab === key && (
                <div className="tab-underline absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
              )}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tabData[activeTab].map((item, index) => (
            <div
              key={`${activeTab}-${item.id}`}
              className="card-animate group relative bg-white overflow-hidden rounded-sm cursor-pointer"
              style={{
                border: '1px solid #e5e5e5',
                animationDelay: `${index * 0.07}s`,
                transition: 'box-shadow 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

              <div className="flex gap-4 p-5">
                {/* Date badge for news */}
                {activeTab === 'news' && (
                  <div className="flex-shrink-0 w-14 text-center">
                    <div className="bg-black text-white rounded-sm p-2">
                      <div className="text-xs font-medium uppercase">{item.date.split(' ')[0]}</div>
                      <div className="text-2xl font-bold leading-none mt-0.5">{item.date.split(' ')[1]}</div>
                    </div>
                  </div>
                )}

                {/* Image */}
                <div className="flex-shrink-0 overflow-hidden rounded-sm" style={{ width: '80px', height: '80px' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    style={{ filter: 'grayscale(20%)' }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-800 group-hover:text-black font-medium text-sm leading-snug mb-2 line-clamp-3 transition-colors duration-200">
                    {item.title}
                  </h3>
                  {activeTab !== 'news' && (
                    <p className="text-gray-400 text-xs flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </p>
                  )}
                  {item.badge && (
                    <span
                      className="inline-block mt-2 text-white text-xs px-2.5 py-0.5 font-medium"
                      style={{ background: '#111', letterSpacing: '0.08em' }}
                    >
                      {item.badge.text}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-right" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <button
            className="inline-flex items-center gap-3 text-white text-sm px-10 py-4 font-medium uppercase tracking-widest transition-all duration-300 hover:tracking-[0.2em]"
            style={{ background: '#111', border: '1px solid #333' }}
          >
            View All {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default News;