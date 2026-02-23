import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, MapPin, BookOpen, Award, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import img1 from "../../assets/logo_main.jpg";
import img2 from "../../assets/mp1.png";

/* ── Keyframes & global styles ── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeLeft {
    from { opacity: 0; transform: translateX(-32px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeRight {
    from { opacity: 0; transform: translateX(32px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes lineGrow {
    from { width: 0; }
    to   { width: 80px; }
  }
  @keyframes lineGrowFull {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes countUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmerLine {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes rotateIn {
    from { opacity: 0; transform: rotate(-6deg) scale(0.95); }
    to   { opacity: 1; transform: rotate(0deg) scale(1); }
  }
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(0,0,0,0.08); }
    50%       { box-shadow: 0 0 40px 8px rgba(0,0,0,0.14); }
  }

  .about-section { font-family: 'DM Sans', sans-serif; }
  .display-font  { font-family: 'Cormorant Garamond', serif; }

  .reveal         { opacity: 0; }
  .reveal.visible { animation: fadeUp   0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .reveal-left    { opacity: 0; }
  .reveal-left.visible { animation: fadeLeft 0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .reveal-right   { opacity: 0; }
  .reveal-right.visible { animation: fadeRight 0.8s cubic-bezier(0.16,1,0.3,1) forwards; }

  .stat-card:hover { transform: translateY(-6px); box-shadow: 0 24px 48px rgba(0,0,0,0.14); }
  .stat-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }

  .img-hover:hover img { transform: scale(1.04); }
  .img-hover img { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }

  .cta-btn:hover { letter-spacing: 0.12em; background: #111; }
  .cta-btn { transition: all 0.35s cubic-bezier(0.16,1,0.3,1); letter-spacing: 0.06em; }
  .cta-btn:hover .arrow-icon { transform: translateX(6px); }
  .arrow-icon { transition: transform 0.3s ease; }

  .mission-item:hover .mission-dot { transform: scale(1.6); background: #111; }
  .mission-dot { transition: transform 0.3s ease, background 0.3s ease; }
  .mission-item:hover .mission-line { transform: scaleX(1); }
  .mission-line { transform: scaleX(0); transform-origin: left; transition: transform 0.4s ease; }

  .decorative-border {
    background: linear-gradient(90deg, #111 60%, #aaa 80%, #111 100%);
    background-size: 200% auto;
  }
  .decorative-border:hover { animation: shimmerLine 1.5s linear infinite; }

  .glow-on-hover:hover { animation: glowPulse 1.5s ease-in-out infinite; }
`;

/* ── Intersection observer hook ── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ── Animated counter ── */
function Counter({ end, duration = 1600 }: { end: number; duration?: number }) {
  const [val, setVal] = useState(0);
  const { ref, visible } = useReveal(0.5);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(end / (duration / 16));
    const t = setInterval(() => {
      start = Math.min(start + step, end);
      setVal(start);
      if (start >= end) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [visible, end, duration]);
  return <span ref={ref}>{val}</span>;
}

const About: React.FC = () => {
  const header    = useReveal(0.2);
  const imgLeft   = useReveal(0.2);
  const imgRight  = useReveal(0.2);
  const foundation= useReveal(0.2);
  const mission   = useReveal(0.15);
  const cta       = useReveal(0.3);

  return (
    <>
      <style>{styles}</style>
      <section className="about-section bg-white py-24 px-6 overflow-hidden" style={{ background: 'linear-gradient(180deg, #fff 0%, #f9f9f9 100%)' }}>
        <div className="max-w-7xl mx-auto">

          {/* ── Header ── */}
          <div
            ref={header.ref}
            className={`reveal mb-20 flex flex-col items-center text-center ${header.visible ? 'visible' : ''}`}
          >
            {/* Ornamental line */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-16 bg-black" />
              <div className="w-2 h-2 rotate-45 bg-black" />
              <div className="h-px w-16 bg-black" />
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">Est. October 1992</p>
            <h2
              className="display-font text-6xl lg:text-7xl font-semibold text-black mb-6 leading-tight"
              style={{ letterSpacing: '-0.01em' }}
            >
              Welcome to <br />
              <span className="italic font-normal">Government Model</span>
              <br />College
            </h2>
            <div className="h-px w-20 bg-black mb-6 decorative-border" style={{ height: '2px' }} />
            <p className="text-lg text-gray-500 max-w-2xl leading-relaxed font-light">
              A beacon of inclusive education and transformative learning, shaping futures since 1992.
            </p>
          </div>

          {/* ── Image Grid ── */}
          <div className="grid md:grid-cols-2 gap-6 mb-20">
            {/* Left Image */}
            <div
              ref={imgLeft.ref}
              className={`reveal-left ${imgLeft.visible ? 'visible' : ''}`}
              style={{ animationDelay: '0.1s' }}
            >
              <div className="relative img-hover overflow-hidden rounded-sm glow-on-hover" style={{ border: '1px solid #e0e0e0' }}>
                <div className="absolute inset-0 pointer-events-none z-10" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.03) 0%, transparent 60%)' }} />
                <img
                  src={img1}
                  alt="MPBOU Logo"
                  className="w-full h-[380px] object-contain bg-white p-10"
                />
                {/* Corner accent */}
                <div className="absolute top-0 left-0 w-12 h-12" style={{ borderTop: '3px solid #111', borderLeft: '3px solid #111' }} />
                <div className="absolute bottom-0 right-0 w-12 h-12" style={{ borderBottom: '3px solid #111', borderRight: '3px solid #111' }} />
              </div>
            </div>

            {/* Right Image */}
            <div
              ref={imgRight.ref}
              className={`reveal-right ${imgRight.visible ? 'visible' : ''}`}
              style={{ animationDelay: '0.2s' }}
            >
              <div className="relative img-hover overflow-hidden rounded-sm glow-on-hover" style={{ border: '1px solid #e0e0e0' }}>
                <img
                  src={img2}
                  alt="University Campus"
                  className="w-full h-[380px] object-contain"
                  style={{ filter: 'grayscale(20%)' }}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)' }} />

                {/* Stats badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div
                    className="flex items-center justify-around py-4 px-6 rounded-sm"
                    style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.8)' }}
                  >
                    <div className="text-center">
                      <p className="display-font text-4xl font-bold text-black"><Counter end={11} /></p>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Regional Centers</p>
                    </div>
                    <div className="w-px h-10 bg-gray-300" />
                    <div className="text-center">
                      <p className="display-font text-4xl font-bold text-black"><Counter end={612} /></p>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Study Centers</p>
                    </div>
                  </div>
                </div>

                {/* Corner accents */}
                <div className="absolute top-0 right-0 w-12 h-12" style={{ borderTop: '3px solid white', borderRight: '3px solid white' }} />
              </div>
            </div>
          </div>

          {/* ── Foundation Section ── */}
          <div
            ref={foundation.ref}
            className={`reveal mb-20 ${foundation.visible ? 'visible' : ''}`}
            style={{ animationDelay: '0.1s' }}
          >
            {/* Section label */}
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-gray-200" />
              <p className="text-xs uppercase tracking-[0.25em] text-gray-400">Our Foundation</p>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="grid md:grid-cols-5 gap-8 mb-10">
              <div className="md:col-span-3">
                <p className="text-gray-600 leading-relaxed text-lg font-light mb-4">
                  Madhya Pradesh Bhoj (Open) University was inaugurated by President Dr. Shankar Dayal Sharma on October 19, 1992, under the Madhya Pradesh University Act 1991.
                </p>
                <p className="text-gray-500 leading-relaxed font-light">
                  The university's emblem draws inspiration from a verse in Raja Bhoj's <em className="display-font text-lg text-black">"Saraswati Kanthabharan"</em> — a testament to our rich cultural heritage and commitment to scholarly excellence.
                </p>
              </div>
              <div className="md:col-span-2 flex flex-col justify-center">
                <blockquote
                  className="display-font text-2xl italic text-black leading-relaxed pl-6"
                  style={{ borderLeft: '3px solid #111' }}
                >
                  "Utilizing diverse resources for effective knowledge dissemination."
                </blockquote>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: <TrendingUp className="w-5 h-5" />, value: '30+', label: 'Years of Excellence' },
                { icon: <Award className="w-5 h-5" />,      value: 'UGC', label: 'Recognized',          isText: true },
                { icon: <MapPin className="w-5 h-5" />,     value: 11,    label: 'Regional Centers' },
                { icon: <BookOpen className="w-5 h-5" />,   value: 612,   label: 'Study Centers' },
              ].map(({ icon, value, label, isText }, i) => (
                <div
                  key={label}
                  className="stat-card p-6 text-center rounded-sm"
                  style={{
                    background: i % 2 === 0 ? '#111' : '#fff',
                    color:      i % 2 === 0 ? '#fff' : '#111',
                    border:     i % 2 === 0 ? 'none' : '1px solid #ddd',
                    animationDelay: `${i * 0.08}s`,
                  }}
                >
                  <div className="flex justify-center mb-3 opacity-60">{icon}</div>
                  <p className="display-font text-4xl font-bold mb-2">
                    {isText ? value : (typeof value === 'number' ? <Counter end={value} /> : value)}
                  </p>
                  <p className="text-xs uppercase tracking-widest opacity-60">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Mission ── */}
          <div
            ref={mission.ref}
            className={`reveal mb-20 ${mission.visible ? 'visible' : ''}`}
            style={{ animationDelay: '0.15s' }}
          >
            <div
              className="rounded-sm p-10 md:p-14"
              style={{ background: '#111', position: 'relative', overflow: 'hidden' }}
            >
              {/* Decorative large text */}
              <div
                className="display-font absolute -top-4 -right-4 text-white select-none pointer-events-none"
                style={{ fontSize: '160px', opacity: 0.04, lineHeight: 1, fontStyle: 'italic' }}
              >
                Mission
              </div>

              <div className="relative z-10">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">Our Purpose</p>
                <h3 className="display-font text-4xl font-semibold text-white mb-10">Our Mission</h3>

                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    {
                      title: 'Promotion of Learning',
                      desc: 'Utilizing diverse resources, including technology, for effective knowledge dissemination across all demographics.',
                    },
                    {
                      title: 'Inclusive Higher Education',
                      desc: 'Enhancing educational standards by offering opportunities to various segments of society regardless of geography.',
                    },
                    {
                      title: 'Cultural Preservation',
                      desc: 'Honoring the rich intellectual heritage of Madhya Pradesh while building bridges to modern academic excellence.',
                    },
                    {
                      title: 'Research & Innovation',
                      desc: 'Fostering a culture of inquiry and discovery to prepare scholars for an ever-evolving knowledge economy.',
                    },
                  ].map(({ title, desc }) => (
                    <div key={title} className="mission-item flex items-start gap-5 group cursor-default">
                      <div className="flex-shrink-0 pt-2">
                        <div
                          className="mission-dot w-2.5 h-2.5 rounded-full"
                          style={{ background: '#aaa' }}
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1 text-base tracking-wide">{title}</h4>
                        <div className="mission-line h-px bg-gray-600 mb-3" />
                        <p className="text-gray-400 text-sm leading-relaxed font-light">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── CTA ── */}
          <div
            ref={cta.ref}
            className={`reveal text-center ${cta.visible ? 'visible' : ''}`}
          >
            <div className="flex items-center gap-4 justify-center mb-8">
              <div className="h-px w-16 bg-gray-300" />
              <div className="w-1.5 h-1.5 rotate-45 bg-gray-300" />
              <div className="h-px w-16 bg-gray-300" />
            </div>
            <Link to="/about">
              <button
                className="cta-btn group inline-flex items-center gap-4 text-white px-10 py-4 rounded-sm font-medium text-sm uppercase"
                style={{ background: '#222', border: '1px solid #444', letterSpacing: '0.08em' }}
              >
                Discover More About MPBOU
                <ArrowRight className="arrow-icon w-4 h-4" />
              </button>
            </Link>
            <p className="text-xs text-gray-400 mt-4 tracking-wider">30+ Years of Academic Excellence</p>
          </div>

        </div>
      </section>
    </>
  );
};

export default About;