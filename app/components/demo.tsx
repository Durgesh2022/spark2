'use client';
import { useEffect, useMemo, useRef, useState } from 'react';

const HEADLINE_WORD = 'relentless';

const tickerItems = [
  '52.6% startups from Tier 2 & 3',
  '6-month PMF validation',
  '50+ operator mentors',
  '₹2–4 Cr per deal',
  '10+ portfolio companies',
  'Backed by SEBI-registered AIF',
];

type Spark = { id: number; x: number; y: number; size: number; color: string };

type Shape = {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  type: number; // 0 circle, 1 triangle, 2 square, 3 ring
  rotation: number;
  color: string;
};

const HeroLanding = () => {
  const [mounted, setMounted] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const heroRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const sparkIdRef = useRef(0);
  const lastSparkAt = useRef(0);

  useEffect(() => setMounted(true), []);

  // Floating shapes — generated client-side to avoid hydration mismatch
  const shapes: Shape[] = useMemo(() => {
    if (!mounted) return [];
    const colors = ['#355E3B', '#f4b942'];
    return Array.from({ length: 32 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 56 + 18,
      delay: Math.random() * 4,
      duration: Math.random() * 6 + 6,
      opacity: Math.random() * 0.25 + 0.12,
      type: i % 4,
      rotation: Math.floor(Math.random() * 360),
      color: colors[i % colors.length],
    }));
  }, [mounted]);

  // Mouse parallax + spark trail + custom cursor + magnetic CTA
  useEffect(() => {
    if (!mounted) return;

    const handleMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const nx = e.clientX / w - 0.5;
      const ny = e.clientY / h - 0.5;
      setMouse({ x: nx, y: ny });

      if (orbRef.current) {
        orbRef.current.style.transform = `translate3d(${nx * 36}px, ${ny * 36}px, 0)`;
      }

      if (headlineRef.current) {
        headlineRef.current.style.transform = `perspective(1200px) rotateX(${ny * -3}deg) rotateY(${nx * 3}deg) translateZ(0)`;
      }

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      if (ctaRef.current) {
        const rect = ctaRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        const radius = 160;
        if (dist < radius) {
          const pull = (1 - dist / radius) * 18;
          ctaRef.current.style.transform = `translate3d(${(dx / dist) * pull}px, ${(dy / dist) * pull}px, 0)`;
        } else {
          ctaRef.current.style.transform = '';
        }
      }

      const now = performance.now();
      if (now - lastSparkAt.current > 60) {
        lastSparkAt.current = now;
        const id = sparkIdRef.current++;
        const colors = ['#355E3B', '#f4b942'];
        setSparks((prev) => [
          ...prev.slice(-14),
          {
            id,
            x: e.clientX,
            y: e.clientY,
            size: 6 + Math.random() * 8,
            color: colors[Math.floor(Math.random() * colors.length)],
          },
        ]);
        setTimeout(() => {
          setSparks((prev) => prev.filter((s) => s.id !== id));
        }, 900);
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mounted]);

  return (
    <div ref={heroRef} className="relative w-full overflow-hidden bg-white" style={{ minHeight: '100svh' }}>
      {/* Animated grid that flows */}
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(53,94,59,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(53,94,59,0.6) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            animation: 'ss-grid-flow 22s linear infinite',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 78%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 78%)',
          }}
        />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {shapes.map((shape) => {
          const baseStyle = {
            left: `${shape.left}%`,
            top: `${shape.top}%`,
            width: shape.size,
            height: shape.size,
            opacity: shape.opacity,
            animation: `ss-shape-float ${shape.duration}s ease-in-out ${shape.delay}s infinite`,
            transform: `translate(${mouse.x * 30}px, ${mouse.y * 30}px) rotate(${shape.rotation}deg)`,
            transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
          };
          if (shape.type === 0) {
            return (
              <div
                key={shape.id}
                className="absolute rounded-full"
                style={{
                  ...baseStyle,
                  background: `radial-gradient(circle, ${shape.color} 0%, transparent 70%)`,
                  filter: 'blur(2px)',
                }}
              />
            );
          }
          if (shape.type === 1) {
            return (
              <div
                key={shape.id}
                className="absolute"
                style={{
                  ...baseStyle,
                  width: 0,
                  height: 0,
                  borderLeft: `${shape.size / 2}px solid transparent`,
                  borderRight: `${shape.size / 2}px solid transparent`,
                  borderBottom: `${shape.size}px solid ${shape.color}`,
                  filter: 'blur(2px)',
                }}
              />
            );
          }
          if (shape.type === 2) {
            return (
              <div
                key={shape.id}
                className="absolute rounded-md"
                style={{
                  ...baseStyle,
                  background: `linear-gradient(135deg, ${shape.color}, transparent)`,
                  filter: 'blur(2px)',
                }}
              />
            );
          }
          return (
            <div
              key={shape.id}
              className="absolute rounded-full border-2"
              style={{
                ...baseStyle,
                borderColor: shape.color,
                background: 'transparent',
                filter: 'blur(0.5px)',
              }}
            />
          );
        })}
      </div>

      {/* Glowing orbs (parallax) */}
      <div ref={orbRef} className="absolute inset-0 transition-transform duration-700 ease-out will-change-transform pointer-events-none">
        <div
          className="absolute -top-32 -left-32 w-[640px] h-[640px] rounded-full mix-blend-multiply opacity-50"
          style={{
            background: 'radial-gradient(closest-side, rgba(53,94,59,0.45), transparent 70%)',
            filter: 'blur(50px)',
            animation: 'ss-blob 18s ease-in-out infinite',
          }}
        />
        <div
          className="absolute -bottom-40 -right-32 w-[720px] h-[720px] rounded-full mix-blend-multiply opacity-50"
          style={{
            background: 'radial-gradient(closest-side, rgba(244,185,66,0.45), transparent 70%)',
            filter: 'blur(60px)',
            animation: 'ss-blob 22s ease-in-out infinite reverse',
          }}
        />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full mix-blend-multiply opacity-40"
          style={{
            background: 'radial-gradient(closest-side, rgba(53,94,59,0.32), transparent 70%)',
            filter: 'blur(70px)',
            animation: 'ss-blob 26s ease-in-out infinite',
            animationDelay: '-6s',
          }}
        />
      </div>

      {/* Custom cursor dot */}
      {mounted && (
        <div
          ref={cursorRef}
          className="hidden md:block fixed top-0 left-0 w-3 h-3 rounded-full bg-[#f4b942] mix-blend-multiply pointer-events-none z-[80]"
          style={{ transition: 'width 0.2s, height 0.2s, opacity 0.3s' }}
        />
      )}

      {/* Spark trail */}
      <div className="hidden md:block fixed inset-0 pointer-events-none z-[70]">
        {sparks.map((s) => (
          <span
            key={s.id}
            className="absolute rounded-full"
            style={{
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              background: s.color,
              filter: 'blur(2px)',
              transform: 'translate(-50%, -50%)',
              animation: 'ss-spark 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center vp-px text-center"
        style={{
          minHeight: '100svh',
          paddingTop: 'clamp(6rem, 14vh, 9rem)',
          paddingBottom: 'clamp(6rem, 14vh, 9rem)',
          gap: 'clamp(1.5rem, 3vh, 3rem)',
        }}
      >
        {/* Eyebrow badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-[#355E3B]/15 shadow-sm"
          style={{ animation: mounted ? 'ss-fade-up 0.9s 0.05s both' : 'none' }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#355E3B] opacity-60 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#355E3B]" />
          </span>
          <span className="text-[11px] uppercase tracking-[0.32em] text-[#355E3B] font-semibold">
            Venture Studio · Built for Builders
          </span>
        </div>

        {/* Headline with glitch layers */}
        <div className="relative inline-block">
          <h1
            ref={headlineRef}
            className="font-display vp-display-xl max-w-6xl font-semibold text-[#355E3B] text-balance transition-transform duration-300 ease-out will-change-transform"
            style={{ animation: mounted ? 'ss-fade-up 1s 0.15s both' : 'none' }}
          >
            Backing India&rsquo;s most{' '}
            <span className="relative inline-block align-baseline">
              <span
                className="italic"
                style={{
                  background: 'linear-gradient(120deg, #355E3B 0%, #f4b942 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {HEADLINE_WORD}
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" height="14" viewBox="0 0 300 14" preserveAspectRatio="none" fill="none">
                <path
                  d="M2 9 Q75 -2, 150 7 T298 6"
                  stroke="#f4b942"
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 320,
                    strokeDashoffset: mounted ? 0 : 320,
                    transition: 'stroke-dashoffset 1.4s 0.7s ease-out',
                  }}
                />
              </svg>
            </span>{' '}
            founders.
          </h1>

          {/* Glitch echo layer */}
          <h1
            aria-hidden
            className="font-display vp-display-xl absolute top-0 left-0 w-full font-semibold text-balance opacity-30 pointer-events-none"
            style={{
              background: 'linear-gradient(120deg, #355E3B 0%, #f4b942 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'ss-glitch 4s steps(1, end) infinite',
              mixBlendMode: 'multiply',
            }}
          >
            Backing India&rsquo;s most {HEADLINE_WORD} founders.
          </h1>
        </div>

        {/* Sub-headline */}
        <p
          className="vp-body max-w-3xl font-sans text-balance"
          style={{ animation: mounted ? 'ss-fade-up 1s 0.35s both' : 'none', color: 'rgba(53,94,59,0.78)' }}
        >
          From <span className="text-[#355E3B] font-semibold">first spark</span> to{' '}
          <span className="text-[#f4b942] font-semibold">final scale</span>. A venture studio for the operators
          building India 3.0 from Tier 2 &amp; 3 cities — not boardrooms.
        </p>

        {/* CTA group */}
        <div
          className="flex flex-col sm:flex-row items-center gap-4"
          style={{ animation: mounted ? 'ss-fade-up 1s 0.55s both' : 'none' }}
        >
          <a
            ref={ctaRef}
            href="/Pitch"
            className="group relative inline-flex items-center justify-center gap-3 px-9 py-4 bg-[#355E3B] text-white text-[15px] font-semibold rounded-full overflow-hidden transition-transform duration-200 ease-out will-change-transform"
            style={{ boxShadow: '0 18px 40px -12px rgba(53,94,59,0.5)' }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#355E3B] via-[#355E3B] to-[#355E3B] bg-[length:200%_100%] group-hover:bg-[position:100%_0] transition-[background-position] duration-700" />
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: '0 0 0 2px rgba(244,185,66,0.6)' }} />
            <span className="relative z-10">Pitch your idea</span>
            <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="/about/investors"
            className="group inline-flex items-center gap-2 px-7 py-4 text-[15px] font-semibold text-[#355E3B] rounded-full border border-[#355E3B]/25 hover:border-[#355E3B] hover:bg-[#355E3B]/5 transition-all"
          >
            For Investors
            <span className="text-[#355E3B] transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>

        {/* Stat strip */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 w-full max-w-4xl"
          style={{ animation: mounted ? 'ss-fade-up 1s 0.75s both' : 'none', marginTop: 'clamp(2rem, 4vh, 4rem)' }}
        >
          {[
            { v: '₹100 Cr', l: 'Target Fund' },
            { v: '10+', l: 'Companies Backed' },
            { v: '50+', l: 'Operator Mentors' },
            { v: '3.8x', l: 'Avg. MOIC' },
          ].map((s) => (
            <div key={s.l} className="text-center sm:text-left border-l-0 sm:border-l border-[#355E3B]/15 sm:pl-5 group">
              <div
                className="font-display font-semibold text-[#355E3B] transition-transform duration-300 group-hover:-translate-y-1"
                style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)' }}
              >
                {s.v}
              </div>
              <div className="mt-1 uppercase tracking-[0.18em] font-sans" style={{ fontSize: 'clamp(0.6rem, 0.7vw, 0.72rem)', color: 'rgba(53,94,59,0.6)' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scrolling ticker */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-[#355E3B]/10 bg-white/70 backdrop-blur-md overflow-hidden">
        <div className="flex gap-12 py-3 whitespace-nowrap" style={{ animation: 'ss-marquee 38s linear infinite' }}>
          {[...tickerItems, ...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i} className="flex items-center gap-3 text-[12px] uppercase tracking-[0.2em] font-medium" style={{ color: 'rgba(53,94,59,0.7)' }}>
              <span className="w-1.5 h-1.5 bg-[#f4b942] rounded-full" />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-[#355E3B]/60">
        <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#355E3B]/40 to-transparent" />
      </div>

      <style jsx>{`
        @keyframes ss-blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -30px) scale(1.05); }
          66% { transform: translate(-30px, 40px) scale(0.95); }
        }
        @keyframes ss-shape-float {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          33% { transform: translateY(-32px) translateX(20px) rotate(120deg); }
          66% { transform: translateY(18px) translateX(-22px) rotate(240deg); }
        }
        @keyframes ss-grid-flow {
          0% { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
        @keyframes ss-glitch {
          0%, 90%, 100% { transform: translate(0, 0); opacity: 0; }
          92% { transform: translate(-2px, 2px); opacity: 0.4; }
          94% { transform: translate(2px, -2px); opacity: 0.4; }
          96% { transform: translate(-1px, 1px); opacity: 0.3; }
          98% { transform: translate(1px, -1px); opacity: 0.3; }
        }
      `}</style>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ss-spark {
          0% { opacity: 0.9; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.2); }
        }
      ` }} />
    </div>
  );
};

export default HeroLanding;
