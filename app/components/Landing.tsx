'use client';
import { useEffect, useRef, useState } from 'react';
import Hello from './about';
import Hero from './demo';

const personas = [
  {
    tag: 'Small-town founder',
    title: 'The founder from a small town with a big idea.',
  },
  {
    tag: 'Operator',
    title: 'The operator who builds with zero ego and infinite grit.',
  },
  {
    tag: 'Dreamer',
    title: "The dreamer who won't quit until they change their city, their industry, their future.",
  },
];

const SparkSeedLanding: React.FC = () => {
  const soulRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setRevealed(true),
      { threshold: 0.18 },
    );
    if (soulRef.current) obs.observe(soulRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="bg-white text-[#355E3B] relative overflow-x-hidden">
      <section className="relative">
        <Hero />
      </section>

      <Hello />

      {/* Manifesto / soul section */}
      <section
        id="soul"
        ref={soulRef}
        className="relative vp-section vp-px"
      >
        <div className="vp-container">
          {/* Top headline — wider */}
          <div
            className="text-center mx-auto"
            style={{
              marginBottom: 'clamp(2.5rem, 5vh, 5rem)',
              maxWidth: 'min(1100px, 100%)',
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <p className="eyebrow mb-5">Our soul</p>
            <p
              className="font-display font-medium leading-[1.15] text-balance width-[min(1100px,100%)] mx-auto"
              style={{ fontSize: 'clamp(1.6rem, 3.6vw, 3.4rem)' }}
            >
              A real founder doesn&rsquo;t need coffee-table theory.{' '}
              <span className="text-[#355E3B]/55">
                They need people who show up. Every day. On the ground.
              </span>
            </p>
          </div>

          {/* Two-column layout: image | manifesto */}
          <div
            className="grid grid-cols-1 lg:grid-cols-12 items-stretch"
            style={{ gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            {/* Image column */}
            <div
              className="lg:col-span-5 relative rounded-3xl overflow-hidden"
              style={{
                minHeight: 'clamp(360px, 56vh, 640px)',
                boxShadow: '0 30px 80px -30px rgba(53,94,59,0.4)',
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'translateY(0)' : 'translateY(28px)',
                transition: 'all 1.1s 0.15s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <img
                src="/7.jpg"
                alt="Founders collaborating"
                className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-[6s] ease-out hover:scale-100"
              />
              {/* Brand-tinted overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#355E3B]/65 via-[#355E3B]/25 to-transparent" />

              {/* Floating tag at bottom */}
              <div className="absolute left-6 bottom-6 right-6 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f4b942] animate-pulse" />
                  <span className="text-[10px] uppercase tracking-[0.32em] font-semibold text-[#355E3B]">
                    On the ground
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-white/80">
                  Tier 2 · Tier 3
                </span>
              </div>
            </div>

            {/* Manifesto column */}
            <div
              className="lg:col-span-7 relative rounded-3xl bg-white border border-[#355E3B]/10 overflow-hidden"
              style={{
                padding: 'clamp(1.75rem, 3.2vw, 3rem)',
                boxShadow: '0 30px 80px -40px rgba(53,94,59,0.25)',
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'translateY(0)' : 'translateY(28px)',
                transition: 'all 1.1s 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              {/* Decorative corner accent */}
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#f4b942]/12 blur-2xl pointer-events-none" />

              <div className="relative">
                <p className="eyebrow mb-6">SparkSeed was created for</p>

                {/* Persona list */}
                <ul className="space-y-3" style={{ marginBottom: 'clamp(2rem, 4vh, 2.75rem)' }}>
                  {personas.map((p, i) => (
                    <li
                      key={p.tag}
                      className="group relative flex gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-white border border-[#355E3B]/8 transition-all duration-500 hover:-translate-y-0.5 hover:border-[#355E3B]/25 hover:shadow-[0_18px_40px_-20px_rgba(53,94,59,0.3)] cursor-default"
                      style={{
                        opacity: revealed ? 1 : 0,
                        transform: revealed ? 'translateY(0)' : 'translateY(20px)',
                        transition: `all 0.8s ${0.5 + i * 0.12}s cubic-bezier(0.22, 1, 0.36, 1)`,
                      }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#355E3B] text-white flex items-center justify-center font-mono text-xs font-semibold shadow-md group-hover:bg-[#f4b942] group-hover:text-[#355E3B] transition-colors duration-500">
                        0{i + 1}
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.28em] font-semibold text-[#f4b942] mb-1">
                          {p.tag}
                        </div>
                        <p
                          className="font-display font-medium text-[#355E3B] leading-snug"
                          style={{ fontSize: 'clamp(1rem, 1.4vw, 1.25rem)' }}
                        >
                          {p.title}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Manifesto paragraph */}
                <div
                  className="border-t border-[#355E3B]/12 pt-6"
                  style={{
                    opacity: revealed ? 1 : 0,
                    transform: revealed ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.8s 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                >
                  <p
                    className="leading-relaxed text-[#355E3B]/80"
                    style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)' }}
                  >
                    We exist for{' '}
                    <span className="font-semibold text-[#355E3B]">founders who hustle without an audience</span>. For{' '}
                    <span className="font-semibold text-[#355E3B]">creators who don&rsquo;t want hand-holding</span>{' '}
                    — they want hand-to-hand combat. For{' '}
                    <span className="font-semibold text-[#355E3B]">leaders building India 3.0</span>: not slides, but systems.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Big finale */}
          <div
            className="text-center mx-auto"
            style={{
              marginTop: 'clamp(3.5rem, 8vh, 6rem)',
              maxWidth: 'min(1100px, 100%)',
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 1.1s 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px w-12 bg-[#355E3B]/40" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-semibold text-[#f4b942]">
                The promise
              </span>
              <span className="h-px w-12 bg-[#355E3B]/40" />
            </div>
            <p
              className="font-display font-semibold tracking-tight leading-[1.05] text-balance"
              style={{ fontSize: 'clamp(2.2rem, 6vw, 5.5rem)', color: '#355E3B' }}
            >
              This isn&rsquo;t investment —{' '}
              <span className="relative inline-block italic text-[#f4b942]">
                this is a movement
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
                      strokeDashoffset: revealed ? 0 : 320,
                      transition: 'stroke-dashoffset 1.6s 1s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  />
                </svg>
              </span>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SparkSeedLanding;
