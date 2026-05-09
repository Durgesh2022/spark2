'use client';
import React, { useEffect, useRef, useState } from 'react';

const SparkSeedTeam = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const leadersRef = useRef<(HTMLDivElement | null)[]>([]);
  const mentorsRef = useRef<HTMLDivElement | null>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const percentage = (scrollTop / scrollHeight) * 100;
      setScrollProgress(percentage);

      // Leader cards animation
      leadersRef.current.forEach((leader, index) => {
        if (leader) {
          const rect = leader.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight - 100;
          
          if (isVisible && !leader.classList.contains('animated')) {
            setTimeout(() => {
              leader.style.transition = 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
              leader.style.opacity = '1';
              leader.style.transform = 'translateY(0)';
              leader.style.filter = 'blur(0px)';
              leader.classList.add('animated');
            }, index * 200);
          }
        }
      });

      // Mentors section animation
      if (mentorsRef.current && !animated) {
        const rect = mentorsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          setAnimated(true);
          mentorsRef.current.style.transition = 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
          mentorsRef.current.style.opacity = '1';
          mentorsRef.current.style.transform = 'translateY(0)';
          mentorsRef.current.style.filter = 'blur(0px)';
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [animated]);

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#355E3B]">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(53, 94, 59) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      <style dangerouslySetInnerHTML={{__html: `
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background-color: #355E3B; border-radius: 4px; }
      `}} />

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 md:pt-36 pb-10 md:pb-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="eyebrow mb-5">The team</p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-semibold mb-6 tracking-tight leading-[1.02] text-[#355E3B] text-balance">
            Leadership that&rsquo;s built<br className="hidden sm:block" />{' '}
            <span className="italic text-[#355E3B]">companies</span> — not just portfolios.
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-[#355E3B] leading-relaxed">
            Operators first. Operators only. Every partner here has owned P&amp;Ls and scaled teams.
          </p>
          <div className="mt-8 w-20 sm:w-24 h-px bg-[#355E3B]/40"></div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
            {/* Mayur S */}
            <div 
              ref={(el) => {
                leadersRef.current[0] = el;
              }}
              className="opacity-0"
              style={{ 
                transform: 'translateY(50px)',
                filter: 'blur(5px)'
              }}
            >
              <div className="mb-8">
                {/* Image placeholder */}
      <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] bg-white border-2 sm:border-4 border-[#355E3B] mb-4 sm:mb-6 relative overflow-hidden rounded-lg">
  
  <img
    src="/shivankar.jpeg"
    alt="Placeholder image"
    className="w-full h-full object-cover"
  />

</div>
                
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-2 tracking-tight text-[#355E3B]">Mayur S</h2>
                <p className="text-sm sm:text-base text-[#355E3B] font-semibold uppercase tracking-[0.22em] mb-5">Founder &amp; CEO</p>

                <div className="space-y-3 sm:space-y-4 text-base sm:text-lg leading-relaxed text-[#355E3B]">
                  <p>
                    <span className="font-semibold text-[#355E3B]">Builder, operator, storyteller &amp; ecosystem architect.</span> Ex-WFC, VMI, Cart12, Jumbotail, Textron — with deep expertise in fintech, consumer &amp; supply chain.
                  </p>
                  <p>
                    A founder who has sat on both sides of the table — and now chooses to sit{' '}
                    <span className="font-semibold text-[#355E3B]">beside founders, not above them.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* P. Raajashekar */}
            <div 
              ref={(el) => {
                leadersRef.current[1] = el;
              }}
              className="opacity-0"
              style={{ 
                transform: 'translateY(50px)',
                filter: 'blur(5px)'
              }}
            >
              <div className="mb-8">
                {/* Image placeholder */}
                          <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] bg-white border-2 sm:border-4 border-[#355E3B] mb-4 sm:mb-6 relative overflow-hidden rounded-lg">
  
  <img
    src="/rajshekhar.jpeg"
    alt="Placeholder image"
    className="w-full h-full object-cover"
  />

</div>
                
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-2 tracking-tight text-[#355E3B]">P. Raajashekar</h2>
                <p className="text-sm sm:text-base text-[#355E3B] font-semibold uppercase tracking-[0.22em] mb-5">Managing Partner · Lotus Group, Coimbatore</p>

                <div className="space-y-3 sm:space-y-4 text-base sm:text-lg leading-relaxed text-[#355E3B]">
                  <p>
                    <span className="font-semibold text-[#355E3B]">MD, Lotus Auto — leading businesses across South India.</span> Deep manufacturing &amp; industrial sector expertise; a Tier 2 ecosystem builder bridging traditional industry with startup innovation.
                  </p>
                  <p>
                    Knows how to run companies at scale, simplify complexity, and guide founders through chaos{' '}
                    <span className="font-semibold text-[#355E3B]">with clarity.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentor ecosystem grid */}
      <section className="relative py-20 md:py-28 px-4 sm:px-6 md:px-8 bg-[#355E3B] text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <div
          ref={mentorsRef}
          className="max-w-7xl mx-auto relative z-10 opacity-0"
          style={{ transform: 'translateY(50px)', filter: 'blur(5px)' }}
        >
          <div className="text-center mb-14 md:mb-20">
            <p className="eyebrow mb-5 text-[#f4b942]">Mentor &amp; network ecosystem</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] text-balance">
              50+ mentors who don&rsquo;t advise.<br className="hidden md:block" />{' '}
              <span className="italic text-[#f4b942]">They DO.</span>
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-white/80 leading-relaxed">
              Every mentor has launched products, managed P&amp;Ls, and scaled teams. Operators-first. Zero ego, infinite grit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'Industry Operators', body: 'CEOs and MDs from manufacturing, logistics and traditional industries — bridging the old economy with new tech.' },
              { title: 'Tech Builders', body: 'CTOs and product leaders from funded startups and enterprise tech companies.' },
              { title: 'Finance &amp; Capital', body: 'CA firms, investment bankers and CFOs who&rsquo;ve raised from institutional investors.' },
              { title: 'GTM &amp; Growth', body: 'Sales leaders, marketing heads and growth operators from D2C, SaaS and B2B companies.' },
            ].map((m) => (
              <div
                key={m.title}
                className="group rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/10 p-6 md:p-7 transition-all duration-500 hover:bg-white/[0.1] hover:-translate-y-1 hover:border-[#f4b942]/40"
              >
                <h3 className="font-display text-xl md:text-2xl font-semibold mb-3 text-white" dangerouslySetInnerHTML={{ __html: m.title }} />
                <p className="text-sm md:text-[15px] leading-relaxed text-white/75" dangerouslySetInnerHTML={{ __html: m.body }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-24 md:py-36 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="eyebrow mb-5">Let&rsquo;s build</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 tracking-tight leading-[1.05] text-[#355E3B] text-balance">
            Ready to build alongside<br className="hidden sm:block" />{' '}
            <span className="italic text-[#355E3B]">real operators?</span>
          </h2>
          <p className="text-base md:text-lg text-[#355E3B] mb-10 leading-relaxed">
            We don&rsquo;t invest from ivory towers. We build in the dirt with you.
          </p>

          <a
            href="https://forms.gle/bSRnkukrFKB7QFzPA"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 bg-[#355E3B] text-white px-9 py-4 text-[15px] font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#355E3B]/40 hover:-translate-y-0.5"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#355E3B] via-[#355E3B] to-[#355E3B] bg-[length:200%_100%] group-hover:bg-[position:100%_0] transition-[background-position] duration-700" />
            <span className="relative z-10">Let&rsquo;s talk</span>
            <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
};

export default SparkSeedTeam;