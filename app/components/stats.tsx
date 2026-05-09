'use client';
import { useEffect, useRef, useState } from 'react';

type Stat = {
  value: string;
  numeric: number | null;
  prefix?: string;
  suffix?: string;
  label: string;
  caption?: string;
  emphasis?: 'brand' | 'dark' | 'light' | 'accent';
};

const stats: Stat[] = [
  { value: '200+', numeric: 200, suffix: '+', label: 'Startups screened / month', emphasis: 'dark' },
  { value: '6 mo', numeric: 6, suffix: ' mo', label: 'PMF validation track', emphasis: 'brand' },
  { value: '6–8', numeric: null, label: 'Deals deployed / year', emphasis: 'light' },
  { value: '10+', numeric: 10, suffix: '+', label: 'Portfolio companies', emphasis: 'dark' },
  { value: '40+', numeric: 40, suffix: '+', label: 'Companies to fund', emphasis: 'light' },
  { value: '50+', numeric: 50, suffix: '+', label: 'Operator mentors', emphasis: 'brand' },
  { value: '1', numeric: 1, label: 'Acquisition completed', emphasis: 'dark' },
  { value: '₹2–4 Cr', numeric: null, label: 'Average check size', emphasis: 'accent' },
];

const useCount = (target: number | null, isVisible: boolean, duration = 1600) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible || target === null) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, isVisible, duration]);
  return count;
};

const StatCard = ({ stat, isVisible, index }: { stat: Stat; isVisible: boolean; index: number }) => {
  const count = useCount(stat.numeric, isVisible);

  const display = stat.numeric === null
    ? stat.value
    : `${stat.prefix ?? ''}${count}${stat.suffix ?? ''}`;

  const palette = {
    brand: 'bg-[#355E3B] text-white border-transparent',
    dark: 'bg-[#355E3B] text-white border-transparent',
    light: 'bg-white text-[#355E3B] border-[#355E3B]/12',
    accent: 'bg-[#f4b942] text-[#355E3B] border-transparent',
  }[stat.emphasis ?? 'light'];

  const labelColor = stat.emphasis === 'light'
    ? 'text-[#355E3B]/70'
    : stat.emphasis === 'accent'
      ? 'text-[#355E3B]/70'
      : 'text-white/70';

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl md:rounded-3xl border transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(53,94,59,0.4)] ${palette}`}
      style={{
        padding: 'clamp(1.25rem, 2.4vw, 2.25rem)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
        transitionDelay: `${index * 90}ms`,
        transitionProperty: 'opacity, transform, box-shadow',
        transitionDuration: '900ms',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            stat.emphasis === 'light'
              ? 'radial-gradient(circle at 30% 0%, rgba(53,94,59,0.06), transparent 70%)'
              : 'radial-gradient(circle at 30% 0%, rgba(255,255,255,0.08), transparent 70%)',
        }}
      />
      <div className="relative z-10">
        <div
          className="font-display font-semibold tracking-tight tabular-nums"
          style={{ fontSize: 'clamp(1.85rem, 4vw, 3.4rem)', lineHeight: 1.05 }}
        >
          {display}
        </div>
        <div
          className={`mt-3 uppercase tracking-[0.22em] font-medium ${labelColor}`}
          style={{ fontSize: 'clamp(0.65rem, 0.8vw, 0.78rem)' }}
        >
          {stat.label}
        </div>

        {/* Animated reveal bar */}
        <div className={`mt-5 h-px overflow-hidden ${stat.emphasis === 'light' ? 'bg-[#355E3B]/15' : 'bg-white/15'}`}>
          <div
            className={`h-full ${stat.emphasis === 'light' ? 'bg-[#355E3B]' : 'bg-current'}`}
            style={{
              width: isVisible ? '100%' : '0%',
              transition: `width 1.6s ${0.15 + index * 0.09}s cubic-bezier(0.22, 1, 0.36, 1)`,
            }}
          />
        </div>
      </div>
      <div
        className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-10"
        style={{
          background: stat.emphasis === 'light' ? '#355E3B' : 'currentColor',
          filter: 'blur(20px)',
        }}
      />
    </div>
  );
};

const StatsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative vp-section vp-px bg-[#ffffff] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(53,94,59,0.06), transparent 60%)',
      }} />

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { l: 6, t: 12, s: 80, c: '#355E3B', d: 0 },
          { l: 92, t: 22, s: 60, c: '#f4b942', d: 1.4 },
          { l: 12, t: 78, s: 100, c: '#355E3B', d: 0.7 },
          { l: 88, t: 82, s: 70, c: '#f4b942', d: 2.1 },
        ].map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${b.l}%`,
              top: `${b.t}%`,
              width: b.s,
              height: b.s,
              background: `radial-gradient(circle, ${b.c} 0%, transparent 70%)`,
              opacity: 0.25,
              filter: 'blur(20px)',
              animation: `ss-blob 14s ease-in-out ${b.d}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="vp-container relative">
        <div
          className="text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
            marginBottom: 'clamp(2.5rem, 5vh, 4.5rem)',
          }}
        >
          <p className="eyebrow mb-5">By the numbers</p>
          <h2 className="font-display vp-display-lg font-semibold text-[#355E3B] text-balance">
            Discipline you can <span className="italic text-[#355E3B]">measure</span>.
          </h2>
          <p className="vp-body mt-5 max-w-2xl mx-auto text-[#355E3B]">
            We screen ruthlessly, validate for six months, and only then deploy capital.
            Here&rsquo;s what that looks like in numbers.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 vp-gap">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} isVisible={isVisible} index={i} />
          ))}
        </div>

        <div
          className="text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1s 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
            marginTop: 'clamp(2rem, 4vh, 3.5rem)',
          }}
        >
          <p className="font-display italic text-[#355E3B]" style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.5rem)' }}>
            ₹100 Cr fund · 25–30 companies · 2 IPO-bound · India&rsquo;s most founder-first studio.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
