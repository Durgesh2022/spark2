'use client';
import React, { useEffect, useRef, useState } from 'react';

const WhatMakesUsDifferent: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const sectionTop = sectionRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        const scrollProgress = Math.max(0, (windowHeight - sectionTop) / windowHeight);
        const itemsToShow = Math.floor(scrollProgress * 7);
        
        const newVisible = Array.from({ length: itemsToShow }, (_, i) => i);
        setVisibleItems(newVisible);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const differences = [
    {
      number: "01",
      title: "We invest early — when nobody else believes yet.",
      description: "Idea, prototype, pre-revenue, pre-team? Perfect. That's where the magic is. That's where we enter.",
      side: "left"
    },
    {
      number: "02",
      title: "We don't sit in AC offices. We go to the ground.",
      description: "We meet founders in:",
      list: [
        "Coimbatore workshops",
        "Surat manufacturing units",
        "Indore offices",
        "Bangalore co-working",
        "Tier 2–4 founder ecosystems"
      ],
      footer: "We work where founders actually work — not where investors pretend to understand them.",
      side: "right"
    },
    {
      number: "03",
      title: "Our mentors don't advise. They DO.",
      description: "Every mentor is an operator. Builders. Founders. CEOs. People who know the market because they bleed it.",
      side: "left"
    },
    {
      number: "04",
      title: "We don't give sessions. We build companies WITH you.",
      description: "GTM? We sit with you. First 50 customers? We plan. Investor deck? We rewrite. Fundraise? We open doors. Burning problem? We get on the next flight.",
      footer: "Because we promised you a partner, not a programme.",
      side: "right"
    },
    {
      number: "05",
      title: "We focus on founders with potential — not pedigree.",
      description: "Your father doesn't need a factory. Your resume doesn't need an IIT stamp. Your idea doesn't need jargon.",
      footer: "You just need the courage to build. We handle the rest.",
      side: "left"
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-[#ffffff] vp-px relative overflow-hidden"
      style={{
        minHeight: 'max(640px, 100svh)',
        paddingTop: 'clamp(4rem, 8vh, 8rem)',
        paddingBottom: 'clamp(4rem, 8vh, 8rem)',
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#355E3B] rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#355E3B] rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="vp-container relative z-10">
        {/* Main Title */}
        <div
          className={`mb-16 md:mb-28 text-center transition-all duration-1000 ${
            visibleItems.includes(0)
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          <p className="eyebrow mb-5">The SparkSeed difference</p>
          <h2 className="font-display vp-display-lg font-semibold text-[#355E3B] text-balance">
            What makes us{' '}
            <span className="relative inline-block">
              <span className="italic text-[#355E3B]">different</span>
              <svg className="absolute -bottom-2 left-0 w-full" height="14" viewBox="0 0 300 14" preserveAspectRatio="none" fill="none">
                <path d="M2 9 Q75 -2, 150 7 T298 6" stroke="#f4b942" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>.
          </h2>
          <p className="vp-body mt-5 max-w-2xl mx-auto text-[#355E3B] font-sans">
            Not a typical VC. Not a fancy accelerator. A studio that builds with founders — not above them.
          </p>
        </div>

        {/* Difference Items with Center Timeline - Desktop */}
        <div className="hidden md:block relative">
          {/* Center vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#355E3B] via-[#355E3B] to-[#355E3B] transform -translate-x-1/2 animate-draw-line">
            <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-transparent to-[#355E3B] opacity-50 animate-pulse"></div>
          </div>

          <div className="space-y-32">
            {differences.map((item, index) => (
              <div
                key={index}
                className={`relative transition-all duration-1000 ${
                  visibleItems.includes(index + 1)
                    ? 'opacity-100'
                    : 'opacity-0'
                }`}
              >
                {/* Number Circle on Center Line */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className={`absolute inset-0 w-24 h-24 bg-[#355E3B] rounded-full transition-all duration-700 ${
                    visibleItems.includes(index + 1) ? 'scale-150 opacity-10 animate-ping-slow' : 'scale-0 opacity-0'
                  }`}></div>
                  <div className={`relative w-24 h-24 bg-gradient-to-br from-[#355E3B] to-[#2d4a30] rounded-full flex items-center justify-center shadow-2xl transition-all duration-700 border-4 border-white ${
                    visibleItems.includes(index + 1) ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                  } ${hoveredIndex === index ? 'scale-125 shadow-3xl' : ''}`}>
                    <span className="text-white text-3xl font-bold">
                      {item.number}
                    </span>
                  </div>
                  {/* Connecting line to card */}
                  <div className={`absolute top-1/2 ${item.side === 'left' ? 'right-full' : 'left-full'} w-16 h-0.5 bg-[#355E3B] transform -translate-y-1/2 transition-all duration-700 ${
                    visibleItems.includes(index + 1) ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                  }`} style={{ transformOrigin: item.side === 'left' ? 'right' : 'left' }}></div>
                </div>

                {/* Card */}
                <div
                  className={`w-[calc(50%-4rem)] ${item.side === 'left' ? 'ml-0 mr-auto' : 'ml-auto mr-0'} transition-all duration-1000 ${
                    visibleItems.includes(index + 1)
                      ? item.side === 'left' ? 'translate-x-0' : 'translate-x-0'
                      : item.side === 'left' ? '-translate-x-32' : 'translate-x-32'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className={`relative bg-white p-10 transition-all duration-500 ${
                    hoveredIndex === index
                      ? 'shadow-[0_30px_60px_-25px_rgba(53,94,59,0.45)] scale-[1.02]'
                      : 'shadow-[0_18px_40px_-20px_rgba(53,94,59,0.25)]'
                  } ${item.side === 'left' ? 'rounded-r-3xl border-l-[5px]' : 'rounded-l-3xl border-r-[5px]'} border-[#355E3B]`}>

                    {/* Animated border glow */}
                    <div className={`absolute inset-0 border border-[#355E3B] transition-opacity duration-500 ${
                      item.side === 'left' ? 'rounded-r-3xl' : 'rounded-l-3xl'
                    } ${hoveredIndex === index ? 'opacity-20 animate-pulse-border' : 'opacity-0'}`}></div>

                    {/* Content */}
                    <div>
                      <h3 className={`font-display text-2xl md:text-3xl font-semibold mb-4 leading-tight tracking-tight transition-all duration-500 ${
                        hoveredIndex === index ? 'text-[#355E3B]' : 'text-[#355E3B]'
                      }`}>
                        {item.title}
                      </h3>

                      <p className="text-[15px] md:text-lg leading-relaxed mb-4 text-[#355E3B]">
                        {item.description}
                      </p>

                      {item.list && (
                        <div className="my-6 bg-[#ffffff] p-5 rounded-2xl">
                          <ul className="space-y-2.5">
                            {item.list.map((listItem, listIndex) => (
                              <li
                                key={listIndex}
                                className={`text-[15px] text-[#355E3B] relative pl-7 transition-all duration-500 ${
                                  hoveredIndex === index ? 'translate-x-2' : 'translate-x-0'
                                }`}
                                style={{
                                  transitionDelay: `${listIndex * 50}ms`,
                                  animation: visibleItems.includes(index + 1) ? `slideIn 0.5s ease-out ${listIndex * 100}ms forwards` : 'none',
                                  opacity: visibleItems.includes(index + 1) ? 1 : 0,
                                }}
                              >
                                <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#f4b942]" />
                                {listItem}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {item.footer && (
                        <div className="mt-6 pt-5 border-t border-[#355E3B]/15 relative">
                          <div className={`absolute top-0 left-0 h-px bg-[#355E3B] transition-all duration-700 ${
                            hoveredIndex === index ? 'w-full' : 'w-0'
                          }`}></div>
                          <p className="font-display text-lg md:text-xl italic text-[#355E3B] leading-relaxed">
                            {item.footer}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Corner accent with animation */}
                    <div className={`absolute ${item.side === 'left' ? 'top-0 right-0' : 'top-0 left-0'} w-20 h-20 overflow-hidden`}>
                      <div className={`absolute ${item.side === 'left' ? '-top-10 -right-10' : '-top-10 -left-10'} w-24 h-24 bg-[#355E3B] rounded-full transition-all duration-500 ${
                        hoveredIndex === index ? 'scale-100 opacity-10' : 'scale-0 opacity-0'
                      }`}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-12">
          {differences.map((item, index) => (
            <div
              key={index}
              className={`relative transition-all duration-1000 ${
                visibleItems.includes(index + 1)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Number Badge */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`relative w-16 h-16 bg-gradient-to-br from-[#355E3B] to-[#2d4a30] rounded-full flex items-center justify-center shadow-lg transition-all duration-700 border-2 border-white ${
                  visibleItems.includes(index + 1) ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                }`}>
                  <span className="text-white text-xl font-bold">
                    {item.number}
                  </span>
                </div>
                <div className="flex-1 h-0.5 bg-[#355E3B] opacity-30"></div>
              </div>

              {/* Card */}
              <div className="relative bg-white p-6 rounded-2xl shadow-[0_18px_40px_-22px_rgba(53,94,59,0.35)] border-l-4 border-[#355E3B]">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold mb-3 leading-tight text-[#355E3B]">
                    {item.title}
                  </h3>

                  <p className="text-[15px] sm:text-base leading-relaxed mb-3 text-[#355E3B]">
                    {item.description}
                  </p>

                  {item.list && (
                    <div className="my-4 bg-[#ffffff] p-4 rounded-xl">
                      <ul className="space-y-2">
                        {item.list.map((listItem, listIndex) => (
                          <li
                            key={listIndex}
                            className="text-[15px] text-[#355E3B] relative pl-6"
                            style={{
                              animation: visibleItems.includes(index + 1) ? `slideIn 0.5s ease-out ${listIndex * 100}ms forwards` : 'none',
                              opacity: visibleItems.includes(index + 1) ? 1 : 0,
                            }}
                          >
                            <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#f4b942]" />
                            {listItem}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item.footer && (
                    <div className="mt-4 pt-4 border-t border-[#355E3B]/15">
                      <p className="font-display text-base sm:text-lg italic text-[#355E3B] leading-relaxed">
                        {item.footer}
                      </p>
                    </div>
                  )}
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute -top-8 -right-8 w-20 h-20 bg-[#355E3B] rounded-full opacity-5"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(20px) translateX(-10px); }
        }

        @keyframes expand {
          from { width: 0; }
          to { width: 8rem; }
        }

        @keyframes expand-center {
          from { width: 0; }
          to { width: 8rem; }
        }

        @keyframes pulse-border {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.1; transform: scale(1.02); }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes word-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes word-float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes draw-line {
          from { height: 0; }
          to { height: 100%; }
        }

        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.5); opacity: 0.05; }
          100% { transform: scale(2); opacity: 0; }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }

        .animate-expand {
          animation: expand 1s ease-out forwards;
        }

        .animate-expand-center {
          animation: expand-center 1.2s ease-out forwards;
        }

        .animate-pulse-border {
          animation: pulse-border 2s ease-in-out infinite;
        }

        .animate-word-float {
          animation: word-float 3s ease-in-out infinite;
        }

        .animate-word-float-delayed {
          animation: word-float-delayed 3.5s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-fade-in {
          animation: fade-in 1.5s ease-out forwards;
        }

        .animate-draw-line {
          animation: draw-line 2s ease-out forwards;
        }

        .animate-ping-slow {
          animation: ping-slow 3s ease-out infinite;
        }
      `}</style>
    </section>
  );
};

export default WhatMakesUsDifferent;