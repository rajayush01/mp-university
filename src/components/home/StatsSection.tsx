// ═══════════════════════════════════════
// StatsSection.tsx  —  Monochrome Luxury
// ═══════════════════════════════════════
import React, { useState, useEffect, useRef } from 'react';
import { Award, Users, BookOpen, Globe, LucideIcon } from 'lucide-react';

const statsStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  .stats-section  { font-family: 'DM Sans', sans-serif; }
  .stats-display  { font-family: 'Cormorant Garamond', serif; }

  @keyframes statReveal {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .stat-reveal { animation: statReveal 0.7s cubic-bezier(0.16,1,0.3,1) backwards; }

  .stat-item { transition: transform 0.3s ease, box-shadow 0.3s ease; }
  .stat-item:hover { transform: translateY(-6px); }

  .stat-icon-wrap { transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1); }
  .stat-item:hover .stat-icon-wrap { transform: scale(1.2) rotate(-5deg); }

  .stat-divider { transform: scaleY(0); transition: transform 0.4s ease; transform-origin: top; }
  .stat-item:hover .stat-divider { transform: scaleY(1); }
`;

interface Stat {
  icon: LucideIcon;
  number: string;
  label: string;
  description?: string;
}

const stats: Stat[] = [
  { icon: Award,    number: "100+",    label: "Years of Excellence",  description: "Decades of academic distinction" },
  { icon: Users,    number: "50000",   label: "Active Students",      description: "Learners across all programmes" },
  { icon: BookOpen, number: "3000",    label: "Expert Faculty",       description: "Distinguished academic staff" },
  { icon: Globe,    number: "150",     label: "Global Partners",      description: "International collaborations" },
];

interface CounterProps { end: number; suffix?: string; duration?: number; }

function Counter({ end, suffix = '', duration = 1800 }: CounterProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start: number, raf: number;
    const tick = (now: number) => {
      if (!start) start = now;
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setCount(Math.floor(ease * end));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setCount(end);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export function StatsSection() {
  const parse = (s: string) => {
    const m = s.match(/^([\d,]+)(.*)$/);
    return m ? { value: parseInt(m[1].replace(/,/g, '')), suffix: m[2] } : { value: 0, suffix: '' };
  };

  return (
    <>
      <style>{statsStyles}</style>
      <section className="stats-section py-20" style={{ background: '#fff', borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section label */}
          <div className="flex items-center gap-4 mb-12 justify-center">
            <div className="h-px w-10 bg-gray-300" />
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">By the Numbers</p>
            <div className="h-px w-10 bg-gray-300" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0" style={{ border: '1px solid #eee' }}>
            {stats.map(({ icon: Icon, number, label, description }, i) => {
              const { value, suffix } = parse(number);
              const isLast = i === stats.length - 1;
              return (
                <div
                  key={label}
                  className="stat-item stat-reveal text-center py-12 px-6 relative"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    borderRight: !isLast ? '1px solid #eee' : 'none',
                  }}
                >
                  {/* Hover top bar */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-black stat-divider" />

                  <div className="flex justify-center mb-5">
                    <div className="stat-icon-wrap w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#f5f5f5' }}>
                      <Icon className="w-5 h-5 text-black" />
                    </div>
                  </div>

                  <p className="stats-display text-5xl font-bold text-black mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    <Counter end={value} suffix={suffix} />
                  </p>
                  <p className="text-sm font-medium text-black mb-1 uppercase tracking-wider">{label}</p>
                  <p className="text-xs text-gray-400 font-light">{description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default StatsSection;