'use client';
import { useEffect, useRef, useState } from 'react';

type City = {
  name: string;
  focus: string;
  /** percent positions calibrated to the /image.png India map */
  x: number;
  y: number;
  tier: 'Tier 2' | 'Tier 3' | 'Metro';
};

const cities: City[] = [
  { name: 'Delhi NCR', focus: 'Enterprise & SaaS', x: 38, y: 22, tier: 'Metro' },
  { name: 'Surat', focus: 'Textiles, trade & D2C', x: 22, y: 47, tier: 'Tier 2' },
  { name: 'Indore', focus: 'Emerging startup ecosystem', x: 32, y: 46, tier: 'Tier 2' },
  { name: 'Mangaluru', focus: 'Co-working & deep tech', x: 31, y: 75, tier: 'Tier 2' },
  { name: 'Coimbatore', focus: 'Manufacturing & industrial tech', x: 38, y: 82, tier: 'Tier 2' },
  { name: 'Karaikudi', focus: 'Finance', x: 43, y: 86, tier: 'Tier 3' },
];

const PresenceSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.18 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (!isVisible || hovered !== null) return;
    const id = setInterval(() => setActive((i) => (i + 1) % cities.length), 2800);
    return () => clearInterval(id);
  }, [isVisible, hovered]);

  // Hub city for connection lines (Indore as central hub)
  const hubIndex = cities.findIndex((c) => c.name === 'Indore');
  const hub = cities[hubIndex];

  return (
    <section
      ref={ref}
      className="relative vp-section vp-px bg-white overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(53,94,59,0.12), transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(244,185,66,0.08), transparent 60%)',
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
          <p className="eyebrow mb-5">Our presence</p>
          <h2 className="font-display vp-display-lg font-semibold text-[#355E3B] text-balance">
            We go where founders <span className="italic text-[#355E3B]">actually</span> work.
          </h2>
          <p className="vp-body mt-5 max-w-2xl mx-auto text-[#355E3B]/75">
            60% of India&rsquo;s next billion-dollar companies will come from Tier 2 &amp; 3 cities.
            We&rsquo;ll be the first ones there.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 items-center" style={{ gap: 'clamp(2rem, 4vw, 3rem)' }}>
          {/* India outline map */}
          <div
            className="lg:col-span-7 relative order-2 lg:order-1"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
              transition: 'all 1.1s 0.15s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <div
              className="relative w-full mx-auto"
              style={{
                maxWidth: 'min(620px, 86vw)',
                maxHeight: '64vh',
                aspectRatio: '3262 / 3502',
              }}
            >
              {/* Soft glow halo */}
              <div
                className="absolute inset-[6%] pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(53,94,59,0.10), transparent 70%)',
                  filter: 'blur(20px)',
                  opacity: isVisible ? 1 : 0,
                  transition: 'opacity 1.4s 0.5s ease-out',
                }}
              />

              {/* India map background image */}
              <img
                src="/image.png"
                alt="Map of India highlighting SparkSeed presence"
                className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'scale(1)' : 'scale(0.96)',
                  transition: 'opacity 1.4s 0.2s cubic-bezier(0.22, 1, 0.36, 1), transform 1.6s 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
                draggable={false}
              />

              {/* SVG layer for connection lines + travelling pulse */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full pointer-events-none"
                preserveAspectRatio="none"
              >
                {hub && cities.map((c, i) => {
                  if (i === hubIndex) return null;
                  const isActive = active === i || active === hubIndex;
                  const len = Math.hypot(c.x - hub.x, c.y - hub.y);
                  return (
                    <line
                      key={`line-${c.name}`}
                      x1={hub.x}
                      y1={hub.y}
                      x2={c.x}
                      y2={c.y}
                      stroke="#f4b942"
                      strokeWidth={isActive ? 0.5 : 0.3}
                      strokeDasharray={`${len} ${len}`}
                      style={{
                        strokeDashoffset: isVisible ? 0 : len,
                        opacity: isVisible ? (isActive ? 0.95 : 0.5) : 0,
                        transition: `stroke-dashoffset 1.4s ${1.2 + i * 0.12}s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease-out, stroke-width 0.4s ease-out`,
                      }}
                    />
                  );
                })}

                {hub && cities.map((c, i) => {
                  if (i === hubIndex || active !== i) return null;
                  return (
                    <circle key={`pulse-${c.name}`} r="0.7" fill="#f4b942">
                      <animateMotion
                        dur="1.6s"
                        repeatCount="indefinite"
                        path={`M ${hub.x} ${hub.y} L ${c.x} ${c.y}`}
                      />
                    </circle>
                  );
                })}
              </svg>

              {/* HTML pins overlaid on the image */}
              {cities.map((c, i) => {
                const isActive = active === i;
                return (
                  <button
                    key={c.name}
                    onMouseEnter={() => {
                      setActive(i);
                      setHovered(i);
                    }}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setActive(i)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                    style={{
                      left: `${c.x}%`,
                      top: `${c.y}%`,
                    }}
                  >
                    {isActive && (
                      <span className="absolute -inset-3 rounded-full bg-[#f4b942]/35 animate-ping pointer-events-none" />
                    )}
                    <span
                      className={`relative block rounded-full border-2 border-white shadow-[0_4px_12px_rgba(53,94,59,0.45)] transition-all duration-500 ${
                        isActive
                          ? 'w-4 h-4 bg-[#f4b942] scale-110'
                          : 'w-2.5 h-2.5 bg-[#355E3B] group-hover:scale-150'
                      }`}
                    />
                    <span
                      className={`absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[11px] font-semibold tracking-wide pointer-events-none transition-all duration-300 px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'text-[#355E3B] bg-white/85 opacity-100 translate-x-0 shadow-sm'
                          : 'text-[#355E3B] bg-white/70 opacity-80 group-hover:opacity-100'
                      }`}
                    >
                      {c.name}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-6 text-center text-[10px] uppercase tracking-[0.3em] text-[#355E3B]/45 font-mono">
              {cities.length} cities · 6 ecosystems · 1 mission
            </p>
          </div>

          {/* City detail card */}
          <div
            className="lg:col-span-5 order-1 lg:order-2"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
              transition: 'all 1.1s 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <div
              className="relative bg-white rounded-3xl shadow-[0_30px_60px_-30px_rgba(53,94,59,0.3)] border border-[#355E3B]/10"
              style={{ padding: 'clamp(1.5rem, 3vw, 2.75rem)' }}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="text-[10px] uppercase tracking-[0.32em] font-semibold text-[#355E3B]">
                  {cities[active].tier}
                </div>
                <div className="text-[10px] tracking-[0.3em] font-mono text-[#355E3B]/40">
                  0{active + 1} / 0{cities.length}
                </div>
              </div>

              <h3
                key={cities[active].name}
                className="font-display font-semibold text-[#355E3B] mb-3"
                style={{ animation: 'ss-fade-up 0.6s both', fontSize: 'clamp(1.85rem, 3.4vw, 3rem)', lineHeight: 1.05 }}
              >
                {cities[active].name}
              </h3>
              <p
                key={`${cities[active].name}-focus`}
                className="vp-body text-[#355E3B]/80 mb-8"
                style={{ animation: 'ss-fade-up 0.6s 0.05s both' }}
              >
                {cities[active].focus}
              </p>

              <div className="grid grid-cols-3 gap-2 mb-8">
                {cities.map((c, i) => (
                  <button
                    key={c.name}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      active === i
                        ? 'bg-[#355E3B] text-white shadow-md'
                        : 'bg-[#355E3B]/5 text-[#355E3B] hover:bg-[#355E3B]/15'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>

              <div className="border-t border-[#355E3B]/12 pt-6">
                <p className="text-sm text-[#355E3B]/75 leading-relaxed">
                  Less than <span className="font-semibold text-[#355E3B]">8% of institutional capital</span> reaches
                  Tier 2/3 founders. We close that gap with on-the-ground operators in every market we enter.
                </p>
              </div>

              <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[#f4b942] shadow-md" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PresenceSection;
