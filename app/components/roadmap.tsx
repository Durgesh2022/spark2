'use client';
import { useEffect, useRef, useState } from 'react';

type Phase = {
  tag: string;
  era: string;
  title: string;
  bullets: string[];
};

const phases: Phase[] = [
  {
    tag: 'Phase 1',
    era: '2024 — 2025',
    title: 'Present',
    bullets: [
      '10+ portfolio companies',
      '1 acquisition exit',
      '6–8 new deals per year',
      'PMF validation framework live',
    ],
  },
  {
    tag: 'Phase 2',
    era: '2025 — 2027',
    title: 'Growth',
    bullets: [
      '25 portfolio companies',
      '3–4 acquisition exits',
      '2 companies at Series B+',
      'LP base expanded',
    ],
  },
  {
    tag: 'Phase 3',
    era: '2027 — 2030',
    title: 'Scale',
    bullets: [
      '40+ companies funded',
      '2 IPO-track companies identified',
      'Full studio infrastructure',
      'Pan-India presence',
    ],
  },
];

const RoadmapSection = () => {
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
      className="relative vp-section vp-px bg-[#355E3B] text-white overflow-hidden"
    >
      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(closest-side, rgba(196,223,182,0.45), transparent 70%)',
          filter: 'blur(60px)',
          animation: 'ss-blob 22s ease-in-out infinite',
        }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(closest-side, rgba(244,185,66,0.35), transparent 70%)',
          filter: 'blur(70px)',
          animation: 'ss-blob 26s ease-in-out infinite reverse',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { l: 14, t: 30, s: 4, d: 0 },
          { l: 88, t: 42, s: 6, d: 1.2 },
          { l: 24, t: 78, s: 3, d: 0.6 },
          { l: 78, t: 80, s: 5, d: 2 },
          { l: 50, t: 20, s: 4, d: 1.6 },
          { l: 38, t: 60, s: 3, d: 0.3 },
        ].map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-[#f4b942]"
            style={{
              left: `${p.l}%`,
              top: `${p.t}%`,
              width: p.s,
              height: p.s,
              opacity: 0.5,
              animation: `ss-shape-float ${8 + i}s ease-in-out ${p.d}s infinite`,
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
            marginBottom: 'clamp(2.5rem, 5vh, 5rem)',
          }}
        >
          <p className="eyebrow mb-5 text-[#f4b942]">Roadmap ahead</p>
          <h2 className="font-display vp-display-lg font-semibold text-balance">
            Fund 40+ companies. <span className="italic text-[#f4b942]">Take 2 to IPO.</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Spine */}
          <div className="hidden md:block absolute left-0 right-0 top-[68px] h-px">
            <div
              className="h-full bg-gradient-to-r from-[#f4b942]/0 via-[#f4b942]/60 to-[#f4b942]/0"
              style={{
                transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 1.6s 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 'clamp(1.25rem, 2vw, 2rem)' }}>
            {phases.map((phase, i) => (
              <div
                key={phase.tag}
                className="relative"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(36px)',
                  transition: `all 1s ${0.4 + i * 0.18}s cubic-bezier(0.22, 1, 0.36, 1)`,
                }}
              >
                {/* Node on timeline */}
                <div className="hidden md:flex justify-center mb-8 relative z-10">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-[#f4b942]/30 animate-ping" />
                    <div className="relative w-5 h-5 rounded-full bg-[#f4b942] border-4 border-[#355E3B] shadow-[0_0_24px_rgba(196,223,182,0.6)]" />
                  </div>
                </div>

                <div
                  className="group relative h-full bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-3xl transition-all duration-500 hover:bg-white/[0.07] hover:-translate-y-2 hover:border-[#f4b942]/40 overflow-hidden"
                  style={{ padding: 'clamp(1.5rem, 2.6vw, 2.5rem)' }}
                >
                  {/* Shimmer sweep on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: 'linear-gradient(120deg, transparent 30%, rgba(196,223,182,0.18) 50%, transparent 70%)',
                      backgroundSize: '200% 100%',
                      animation: 'ss-shimmer 2s linear infinite',
                    }}
                  />

                  <div className="relative flex items-baseline gap-3 mb-2">
                    <span className="text-[10px] uppercase tracking-[0.32em] font-semibold text-[#f4b942]">
                      {phase.tag}
                    </span>
                    <span className="text-[10px] tracking-[0.2em] text-white/40 font-mono">{phase.era}</span>
                    {i === 0 && (
                      <span className="ml-auto inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#f4b942]/15 border border-[#f4b942]/30 text-[9px] uppercase tracking-[0.2em] font-semibold text-[#f4b942]">
                        <span className="w-1 h-1 rounded-full bg-[#f4b942] animate-pulse" />
                        Now
                      </span>
                    )}
                  </div>
                  <h3
                    className="relative font-display font-semibold mb-6"
                    style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)', lineHeight: 1.05 }}
                  >
                    {phase.title}
                  </h3>

                  <ul className="space-y-3">
                    {phase.bullets.map((b, j) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 text-[15px] text-white/85 leading-relaxed"
                        style={{
                          opacity: isVisible ? 1 : 0,
                          transform: isVisible ? 'translateX(0)' : 'translateX(-8px)',
                          transition: `all 0.6s ${0.7 + i * 0.18 + j * 0.08}s ease-out`,
                        }}
                      >
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#f4b942] flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
