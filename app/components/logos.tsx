'use client';
import { useEffect, useRef, useState } from 'react';

const portfolio = [
  { src: '/sparkseed.png', name: 'SparkSeed' },
  { src: '/traqo.png', name: 'Traqo' },
  { src: '/a.png', name: 'Ambitio' },
  { src: '/pick-up.png', name: 'Pickup' },
  { src: '/indian.png', name: 'Very Much Indian' },
];

const sectors = ['D2C', 'Logistics', 'SaaS', 'Tech', 'Manufacturing', 'Fintech'];

const RotatingLogoGrid = () => {
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

  // Triple the list for a seamless infinite loop
  const tripled = [...portfolio, ...portfolio, ...portfolio];

  return (
    <section
      ref={ref}
      className="relative vp-section vp-px bg-[#ffffff] overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(53,94,59,0.08), transparent 60%)',
        }}
      />

      <div className="vp-container relative">
        <div
          className="text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
            marginBottom: 'clamp(2rem, 4vh, 4rem)',
          }}
        >
          <p className="eyebrow mb-5">Portfolio &amp; track record</p>
          <h2 className="font-display vp-display-lg font-semibold text-[#355E3B] text-balance">
            Companies who trusted us with{' '}
            <span className="italic text-[#355E3B]">their dreams</span>.
          </h2>
          <p className="vp-body mt-5 max-w-2xl mx-auto text-[#355E3B]">
            10+ companies backed. 1 acquisition completed. 3.8× average MOIC. We back businesses built to last,
            not just built to raise.
          </p>
        </div>

        {/* Sector chips */}
        <div
          className="flex flex-wrap items-center justify-center gap-2 mb-14"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1s 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {sectors.map((s, i) => (
            <span
              key={s}
              className="px-4 py-1.5 rounded-full bg-white border border-[#355E3B]/15 text-xs font-semibold text-[#355E3B] uppercase tracking-[0.18em] shadow-sm hover:bg-[#355E3B] hover:text-white transition-all duration-300 cursor-default"
              style={{
                animationDelay: `${i * 80}ms`,
              }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden py-6">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#ffffff] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#ffffff] to-transparent z-10 pointer-events-none" />

          <div
            className="flex gap-8 items-center"
            style={{ animation: 'ss-marquee 30s linear infinite' }}
          >
            {tripled.map((logo, i) => (
              <div
                key={i}
                className="group flex-shrink-0 w-44 h-32 flex items-center justify-center"
              >
                <div className="relative w-full h-full flex items-center justify-center bg-white rounded-2xl border border-[#355E3B]/8 shadow-[0_8px_24px_-12px_rgba(53,94,59,0.25)] p-5 overflow-hidden transition-all duration-500 hover:shadow-[0_18px_40px_-15px_rgba(53,94,59,0.4)] hover:-translate-y-1 hover:border-[#355E3B]/25">
                  {/* Shimmer sweep on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'linear-gradient(120deg, transparent 30%, rgba(244,185,66,0.2) 50%, transparent 70%)',
                      backgroundSize: '200% 100%',
                      animation: 'ss-shimmer 1.6s linear infinite',
                    }}
                  />
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="relative max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div
          className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1s 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {[
            { v: '10+', l: 'Companies backed' },
            { v: '1', l: 'Acquisition exit' },
            { v: '6–8', l: 'Deals / year' },
            { v: '3.8×', l: 'Average MOIC' },
          ].map((s, i) => (
            <div
              key={s.l}
              className="group relative overflow-hidden rounded-2xl bg-white border border-[#355E3B]/8 p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_18px_40px_-15px_rgba(53,94,59,0.3)]"
            >
              {/* Hover gradient sweep */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 30% 0%, rgba(244,185,66,0.12), transparent 70%)',
                }}
              />

              <div className="relative font-display text-3xl md:text-4xl font-semibold text-[#355E3B] tabular-nums transition-transform duration-500 group-hover:-translate-y-1">
                {s.v}
              </div>
              <div className="relative mt-1 text-[10px] uppercase tracking-[0.22em] text-[#355E3B]/70">
                {s.l}
              </div>

              {/* Reveal bar */}
              <div className="relative mt-4 h-px bg-[#355E3B]/15 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#355E3B] to-[#f4b942]"
                  style={{
                    width: isVisible ? '100%' : '0%',
                    transition: `width 1.4s ${0.5 + i * 0.12}s cubic-bezier(0.22, 1, 0.36, 1)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 max-w-3xl mx-auto">
          <p className="font-display text-lg md:text-xl text-[#355E3B] italic leading-relaxed">
            Trusted not with money — but with their{' '}
            <span className="text-[#355E3B]">dreams</span>. We did everything to honour that trust.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RotatingLogoGrid;
