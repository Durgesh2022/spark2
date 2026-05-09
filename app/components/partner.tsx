'use client';
import { useEffect, useRef, useState } from 'react';

type Audience = {
  key: string;
  title: string;
  blurb: string;
  bullets: string[];
  cta: { label: string; href: string };
  emphasis: 'dark' | 'brand' | 'light';
};

const audiences: Audience[] = [
  {
    key: 'investors',
    title: 'For Investors',
    blurb: 'Disciplined early-stage exposure to India&rsquo;s most underserved deal flow.',
    bullets: [
      'PMF-validated deals before capital deployment',
      'Studio layer structurally reduces downside risk',
      'Co-investment rights on breakout companies',
      'Access to India&rsquo;s most underserved deal flow',
      '3.8× average MOIC on realised investments',
    ],
    cta: { label: 'Investor brief', href: '/about/investors' },
    emphasis: 'dark',
  },
  {
    key: 'founders',
    title: 'For Founders',
    blurb: 'Capital, conviction, and on-ground operators from Day 0 to Series A.',
    bullets: [
      '₹2–4 Cr pre-seed &amp; seed capital',
      'No pedigree filter — only potential matters',
      'On-ground operators from Day 0 to Series A',
      '6-month PMF validation + GTM playbooks',
      '50+ operator mentors across every sector',
    ],
    cta: { label: 'Pitch to us', href: '/Pitch' },
    emphasis: 'brand',
  },
  {
    key: 'partners',
    title: 'For Strategic Partners',
    blurb: 'First look at breakthrough companies and a curated Tier 2/3 deal flow.',
    bullets: [
      'First look at breakthrough companies',
      'Curated Tier 2/3 deal flow access',
      'Co-build and partnership opportunities',
      'Shared mission to build India 3.0',
      'Ecosystem access across 6 cities',
    ],
    cta: { label: 'Partner with us', href: '#contact' },
    emphasis: 'light',
  },
];

const PartnerSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative vp-section vp-px bg-[#ffffff] overflow-hidden"
    >
      {/* Decorative animated blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(closest-side, rgba(53,94,59,0.35), transparent 70%)',
            filter: 'blur(50px)',
            animation: 'ss-blob 18s ease-in-out infinite',
          }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(closest-side, rgba(244,185,66,0.3), transparent 70%)',
            filter: 'blur(60px)',
            animation: 'ss-blob 22s ease-in-out infinite reverse',
          }}
        />
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
          <p className="eyebrow mb-5">Why partner with SparkSeed</p>
          <h2 className="font-display vp-display-lg font-semibold text-[#355E3B] text-balance">
            For every stakeholder, a <span className="italic text-[#355E3B]">compelling</span> case.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 'clamp(1rem, 1.6vw, 1.5rem)' }}>
          {audiences.map((aud, i) => {
            const palette =
              aud.emphasis === 'brand'
                ? {
                    card: 'bg-[#355E3B] text-white',
                    bullet: 'bg-[#f4b942]',
                    chip: 'bg-white/10 text-[#f4b942] border-white/15',
                    sub: 'text-white/80',
                    cta: 'bg-white text-[#355E3B] hover:bg-[#f4b942]',
                  }
                : aud.emphasis === 'dark'
                ? {
                    card: 'bg-[#355E3B] text-white',
                    bullet: 'bg-[#f4b942]',
                    chip: 'bg-white/8 text-[#f4b942] border-white/15',
                    sub: 'text-white/75',
                    cta: 'bg-[#f4b942] text-[#355E3B] hover:bg-white',
                  }
                : {
                    card: 'bg-white text-[#355E3B] border border-[#355E3B]/12',
                    bullet: 'bg-[#355E3B]',
                    chip: 'bg-[#355E3B]/8 text-[#355E3B] border-[#355E3B]/15',
                    sub: 'text-[#355E3B]',
                    cta: 'bg-[#355E3B] text-white hover:bg-[#355E3B]',
                  };

            return (
              <div
                key={aud.key}
                onMouseEnter={() => setHovered(aud.key)}
                onMouseLeave={() => setHovered(null)}
                className={`group relative overflow-hidden rounded-3xl transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_40px_80px_-30px_rgba(53,94,59,0.45)] ${palette.card}`}
                style={{
                  padding: 'clamp(1.5rem, 2.6vw, 2.5rem)',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(36px)',
                  transitionDelay: `${0.15 + i * 0.12}s`,
                  transitionProperty: 'opacity, transform, box-shadow',
                  transitionDuration: '900ms',
                  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                {/* Shimmer sweep on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background:
                      aud.emphasis === 'light'
                        ? 'linear-gradient(120deg, transparent 30%, rgba(53,94,59,0.07) 50%, transparent 70%)'
                        : 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.10) 50%, transparent 70%)',
                    backgroundSize: '200% 100%',
                    animation: 'ss-shimmer 2.4s linear infinite',
                  }}
                />

                {/* Floating accent orb that scales on hover */}
                <div
                  className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-20 transition-transform duration-700 group-hover:scale-150 pointer-events-none"
                  style={{
                    background: aud.emphasis === 'brand' ? '#f4b942' : aud.emphasis === 'dark' ? '#f4b942' : '#355E3B',
                    filter: 'blur(30px)',
                  }}
                />

                <div className={`relative inline-flex items-center px-3 py-1 rounded-full border text-[10px] uppercase tracking-[0.28em] font-semibold mb-6 ${palette.chip}`}>
                  0{i + 1}
                </div>
                <h3
                  className="relative font-display font-semibold mb-4 leading-tight"
                  style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)' }}
                >
                  {aud.title}
                </h3>
                <p className={`relative text-base leading-relaxed mb-8 ${palette.sub}`} dangerouslySetInnerHTML={{ __html: aud.blurb }} />

                <ul className="relative space-y-3 mb-10">
                  {aud.bullets.map((b, j) => (
                    <li
                      key={b}
                      className={`flex items-start gap-3 text-[15px] leading-relaxed ${palette.sub}`}
                      style={{
                        opacity: hovered === aud.key || isVisible ? 1 : 0,
                        transform: hovered === aud.key ? 'translateX(4px)' : 'translateX(0)',
                        transition: `all 0.4s ${j * 0.05}s ease-out`,
                      }}
                      dangerouslySetInnerHTML={{ __html: `<span class="mt-2 w-1.5 h-1.5 rounded-full ${palette.bullet} flex-shrink-0 inline-block"></span><span>${b}</span>` }}
                    />
                  ))}
                </ul>

                <a
                  href={aud.cta.href}
                  className={`relative inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:gap-3 ${palette.cta}`}
                >
                  {aud.cta.label}
                  <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>

                {/* Decorative corner */}
                <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-current opacity-30" />
              </div>
            );
          })}
        </div>

        <div
          className="mt-16 md:mt-20 text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1s 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <a
            href="https://www.sparkseedventures.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#355E3B] uppercase tracking-[0.28em] border-b border-[#355E3B]/40 hover:border-[#355E3B] pb-1 transition-colors"
          >
            sparkseedventures.in
          </a>
          <p className="mt-6 font-display text-2xl md:text-3xl italic text-[#355E3B]">
            This isn&rsquo;t investment. <span className="text-[#355E3B]">This is a movement.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
