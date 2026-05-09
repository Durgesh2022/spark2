'use client';
import { useEffect, useMemo, useRef, useState } from 'react';

type Transformation = {
  number: string;
  from: string;
  to: string;
  fromTag: string;
  toTag: string;
};

const transformations: Transformation[] = [
  {
    number: '01',
    from: 'Broken industries',
    to: 'billion-rupee opportunities',
    fromTag: 'Fragmented',
    toTag: 'Defensible',
  },
  {
    number: '02',
    from: 'Sleepy markets',
    to: 'high-growth ecosystems',
    fromTag: 'Overlooked',
    toTag: 'Compounding',
  },
  {
    number: '03',
    from: 'Traditional sectors',
    to: 'tech-powered machines',
    fromTag: 'Manual',
    toTag: 'Automated',
  },
  {
    number: '04',
    from: 'Local solutions',
    to: 'national companies',
    fromTag: 'Local',
    toTag: 'Pan-India',
  },
];

type FloatingElement = {
  width: number;
  height: number;
  left: number;
  top: number;
  opacity: number;
  duration: number;
  delay: number;
};

export default function InvestmentThesis() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);

  // Reveal on scroll
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.15 },
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (!isVisible || paused) return;
    const id = setInterval(() => setActiveIndex((i) => (i + 1) % transformations.length), 3600);
    return () => clearInterval(id);
  }, [isVisible, paused]);

  // Background floats (client only)
  useEffect(() => {
    const elements = Array.from({ length: 14 }, () => ({
      width: Math.random() * 280 + 100,
      height: Math.random() * 280 + 100,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.04 + 0.02,
      duration: Math.random() * 18 + 14,
      delay: Math.random() * 5,
    }));
    setFloatingElements(elements);
  }, []);

  const active = transformations[activeIndex];

  // Pre-split text for letter animation
  const fromLetters = useMemo(() => Array.from(active.from), [active.from]);
  const toLetters = useMemo(() => Array.from(active.to), [active.to]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden vp-px"
      style={{
        backgroundColor: '#ffffff',
        paddingTop: 'clamp(4rem, 8vh, 7rem)',
        paddingBottom: 'clamp(4rem, 8vh, 7rem)',
      }}
    >
      {/* Floating background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((e, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: e.width,
              height: e.height,
              left: `${e.left}%`,
              top: `${e.top}%`,
              background: `radial-gradient(circle, rgba(53,94,59,${e.opacity}) 0%, transparent 70%)`,
              animation: `ss-blob ${e.duration}s ease-in-out infinite`,
              animationDelay: `${e.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative vp-container">
        {/* Header */}
        <div
          className="text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
            marginBottom: 'clamp(2.5rem, 5vh, 5rem)',
          }}
        >
          <p className="eyebrow mb-5">Our investment thesis</p>
          <h2 className="font-display vp-display-lg font-semibold text-[#355E3B] text-balance">
            We back founders <span className="italic text-[#355E3B]">who can turn:</span>
          </h2>
        </div>

        {/* Cinematic transformation stage */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(36px)',
            transition: 'all 1s 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <div className="relative mx-auto max-w-6xl rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-white shadow-[0_40px_80px_-40px_rgba(53,94,59,0.4)] border border-[#355E3B]/10">
            {/* Giant index number watermark */}
            <div className="absolute -top-4 right-4 md:-top-8 md:right-10 pointer-events-none select-none z-0">
              <span
                key={`num-${activeIndex}`}
                className="font-display block leading-none font-bold text-[#355E3B]/[0.06] tabular-nums"
                style={{ animation: 'ss-fade-up 0.7s both', fontSize: 'clamp(140px, 28vw, 380px)' }}
              >
                {active.number}
              </span>
            </div>

            {/* Top progress bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#355E3B]/8 z-20">
              <div
                key={`progress-${activeIndex}-${paused}`}
                className="h-full bg-gradient-to-r from-[#355E3B] via-[#355E3B] to-[#f4b942]"
                style={{
                  animation: paused ? 'none' : 'ss-progress 3.6s linear forwards',
                }}
              />
            </div>

            <div
              className="relative z-10"
              style={{
                paddingLeft: 'clamp(1.25rem, 4vw, 4rem)',
                paddingRight: 'clamp(1.25rem, 4vw, 4rem)',
                paddingTop: 'clamp(2.25rem, 5vh, 4rem)',
                paddingBottom: 'clamp(2.25rem, 5vh, 4rem)',
              }}
            >
              {/* Tag chips for context */}
              <div className="flex items-center justify-between gap-4 mb-10 md:mb-14">
                <span
                  key={`fromTag-${activeIndex}`}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#355E3B]/5 border border-[#355E3B]/10 text-[10px] uppercase tracking-[0.28em] font-semibold text-[#355E3B]/60"
                  style={{ animation: 'ss-fade-up 0.6s 0.1s both' }}
                >
                  <span className="w-1 h-1 rounded-full bg-[#355E3B]/40" />
                  Before · {active.fromTag}
                </span>
                <span
                  key={`toTag-${activeIndex}`}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#355E3B]/10 border border-[#355E3B]/25 text-[10px] uppercase tracking-[0.28em] font-semibold text-[#355E3B]"
                  style={{ animation: 'ss-fade-up 0.6s 0.5s both' }}
                >
                  After · {active.toTag}
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f4b942] animate-pulse" />
                </span>
              </div>

              {/* From text */}
              <div className="relative mb-2 md:mb-4">
                <p
                  key={`from-${activeIndex}`}
                  className="font-display font-medium text-[#355E3B]/35 tracking-tight leading-tight"
                  style={{ perspective: '600px', fontSize: 'clamp(1.75rem, 5.2vw, 4.5rem)' }}
                >
                  {fromLetters.map((c, i) => (
                    <span
                      key={i}
                      className="inline-block whitespace-pre"
                      style={{
                        animation: `ss-letter-up 0.5s ${i * 0.018}s cubic-bezier(0.22, 1, 0.36, 1) both`,
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </p>
                {/* Strike-through that draws across */}
                <div
                  key={`strike-${activeIndex}`}
                  className="absolute top-1/2 left-0 h-[3px] bg-[#355E3B]/40 rounded-full origin-left"
                  style={{
                    animation: 'ss-strike 0.7s 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
                  }}
                />
              </div>

              {/* Arrow that draws */}
              <div className="my-6 md:my-10 flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-[0.32em] text-[#355E3B]/50 font-semibold">
                  becomes
                </span>
                <div className="flex-1 relative h-px">
                  <svg
                    key={`arrow-${activeIndex}`}
                    className="absolute inset-0 w-full h-8 -top-4 overflow-visible"
                    viewBox="0 0 600 16"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id={`arrow-grad-${activeIndex}`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#355E3B" stopOpacity="0" />
                        <stop offset="50%" stopColor="#355E3B" />
                        <stop offset="100%" stopColor="#f4b942" />
                      </linearGradient>
                    </defs>
                    <line
                      x1="0"
                      y1="8"
                      x2="582"
                      y2="8"
                      stroke={`url(#arrow-grad-${activeIndex})`}
                      strokeWidth="2"
                      strokeDasharray="600"
                      style={{
                        animation: 'ss-draw 1s 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
                      }}
                    />
                    <polyline
                      points="572,2 600,8 572,14"
                      fill="none"
                      stroke="#f4b942"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        animation: 'ss-fade-in 0.4s 1.4s both',
                      }}
                    />
                    {/* Traveling pulse */}
                    <circle r="3" fill="#f4b942" opacity="0.85">
                      <animateMotion
                        key={`pulse-${activeIndex}`}
                        dur="1.4s"
                        begin="0.7s"
                        path="M 0 8 L 582 8"
                        fill="freeze"
                      />
                    </circle>
                  </svg>
                </div>
              </div>

              {/* To text */}
              <div className="relative">
                <p
                  key={`to-${activeIndex}`}
                  className="font-display font-semibold tracking-tight leading-[1.05] italic text-[#355E3B]"
                  style={{
                    perspective: '800px',
                    fontSize: 'clamp(2.1rem, 6.4vw, 5.5rem)',
                  }}
                >
                  {toLetters.map((c, i) => (
                    <span
                      key={i}
                      className="inline-block whitespace-pre"
                      style={{
                        animation: `ss-letter-pop 0.7s ${1.0 + i * 0.025}s cubic-bezier(0.22, 1, 0.36, 1) both`,
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>

          {/* Selector dots */}
          <div className="mt-8 flex justify-center gap-2 md:gap-3">
            {transformations.map((t, i) => (
              <button
                key={t.number}
                onClick={() => setActiveIndex(i)}
                className="group relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300"
                aria-label={`Switch to transformation ${t.number}`}
              >
                <span
                  className={`relative h-2 rounded-full transition-all duration-500 ${
                    activeIndex === i
                      ? 'w-12 bg-[#355E3B]'
                      : 'w-2 bg-[#355E3B]/25 group-hover:bg-[#355E3B]/50'
                  }`}
                >
                  {activeIndex === i && !paused && (
                    <span
                      key={`dot-progress-${activeIndex}`}
                      className="absolute inset-0 rounded-full bg-[#f4b942] origin-left"
                      style={{ animation: 'ss-progress 3.6s linear forwards' }}
                    />
                  )}
                </span>
                <span
                  className={`text-[10px] uppercase tracking-[0.22em] font-semibold transition-all duration-300 ${
                    activeIndex === i ? 'text-[#355E3B] opacity-100' : 'text-[#355E3B]/0 group-hover:text-[#355E3B]/60'
                  }`}
                >
                  {t.number}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Journey */}
        <div
          className="max-w-5xl mx-auto"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 1s 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
            marginTop: 'clamp(4rem, 10vh, 8rem)',
          }}
        >
          <div className="relative">
            

            <p className="font-display text-xl md:text-2xl lg:text-3xl text-center text-[#355E3B] leading-relaxed px-4">
              We invest in the <span className="italic text-[#355E3B]">first spark</span>{' '}
              and stay till the <span className="italic text-[#f4b942]">final scale</span>.
            </p>
          </div>
        </div>

        {/* Finale */}
        <div
          className="text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.92)',
            transition: 'all 1.1s 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
            marginTop: 'clamp(4rem, 10vh, 8rem)',
          }}
        >
          <div className="relative max-w-5xl mx-auto">
            {/* Tiny eyebrow */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="h-px w-10 bg-[#355E3B]/30" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-semibold text-[#f4b942]">
                The thesis
              </span>
              <span className="h-px w-10 bg-[#355E3B]/30" />
            </div>

            {/* Quiet line above */}
            <p
              className="font-display italic mb-2"
              style={{
                fontSize: 'clamp(0.95rem, 1.2vw, 1.25rem)',
                color: 'rgba(53,94,59,0.55)',
              }}
            >
              Because compounding doesn&rsquo;t start with money.
            </p>

            {/* The big line */}
            <h3
              className="font-display font-semibold tracking-tight leading-[1] text-[#355E3B] text-balance"
              style={{ fontSize: 'clamp(2.6rem, 8vw, 7.5rem)' }}
            >
              It starts with{' '}
              <span className="relative inline-block">
                <span className="italic text-[#f4b942]">belief</span>
                <svg
                  className="absolute left-0 -bottom-1 sm:-bottom-2 w-full"
                  height="14"
                  viewBox="0 0 300 14"
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M2 9 Q75 -2, 150 7 T298 6"
                    stroke="#f4b942"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: 320,
                      strokeDashoffset: isVisible ? 0 : 320,
                      transition: 'stroke-dashoffset 1.6s 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  />
                </svg>
              </span>
              .
            </h3>

            {/* Signature line */}
            <div className="mt-10 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-[#355E3B]" />
              <span className="text-[10px] uppercase tracking-[0.32em] font-semibold text-[#355E3B]">
                SparkSeed Ventures
              </span>
              <span className="h-px w-12 bg-[#355E3B]" />
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ss-letter-up {
          from { opacity: 0; transform: translateY(40%) rotateX(60deg); }
          to   { opacity: 1; transform: translateY(0) rotateX(0); }
        }
        @keyframes ss-letter-pop {
          from { opacity: 0; transform: translateY(30%) scale(0.85); filter: blur(6px); }
          to   { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes ss-strike {
          from { width: 0; opacity: 0.6; }
          to   { width: 100%; opacity: 1; }
        }
        @keyframes ss-draw {
          from { stroke-dashoffset: 600; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes ss-progress {
          from { transform: scaleX(0); transform-origin: left; }
          to   { transform: scaleX(1); transform-origin: left; }
        }
        @keyframes ss-trail {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
        @keyframes ss-blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
      ` }} />
    </section>
  );
}
