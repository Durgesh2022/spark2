'use client';

import { useEffect, useRef, useState } from 'react';

interface StageCardProps {
  stage: number;
  title: string;
  description: string;
  iconLevel: number;
  delay: string;
}

const StageIcon = ({ level }: { level: number }) => {
  const getIconComplexity = () => {
    switch (level) {
      case 1:
        return (
          <>
            <circle cx="32" cy="45" r="3" fill="#355E3B" />
            <circle cx="28" cy="42" r="2.5" fill="#355E3B" opacity="0.7" />
            <circle cx="36" cy="42" r="2.5" fill="#355E3B" opacity="0.7" />
            <path d="M32 42 L32 28 Q32 22 28 18" stroke="#355E3B" strokeWidth="2" fill="none" />
            <ellipse cx="28" cy="18" rx="6" ry="3" fill="#5a8c69" />
            <path d="M22 18 L28 10 L34 18" fill="#355E3B" />
          </>
        );
      case 2:
        return (
          <>
            <circle cx="32" cy="48" r="4" fill="#355E3B" />
            <circle cx="26" cy="45" r="3" fill="#355E3B" opacity="0.7" />
            <circle cx="38" cy="45" r="3" fill="#355E3B" opacity="0.7" />
            <path d="M32 44 L32 26 Q32 20 28 16" stroke="#355E3B" strokeWidth="2.5" fill="none" />
            <ellipse cx="28" cy="16" rx="8" ry="4" fill="#5a8c69" />
            <path d="M28 16 L32 8 L28 8 L32 4" fill="#355E3B" />
            <path d="M20 16 L28 8 L36 16" fill="#355E3B" />
          </>
        );
      case 3:
        return (
          <>
            <circle cx="32" cy="50" r="5" fill="#355E3B" />
            <circle cx="24" cy="46" r="4" fill="#355E3B" opacity="0.7" />
            <circle cx="40" cy="46" r="4" fill="#355E3B" opacity="0.7" />
            <circle cx="32" cy="42" r="3" fill="#355E3B" opacity="0.5" />
            <path d="M32 45 L32 24 Q32 18 28 14" stroke="#355E3B" strokeWidth="3" fill="none" />
            <ellipse cx="28" cy="14" rx="10" ry="5" fill="#5a8c69" />
            <path d="M28 14 L32 6 L28 6 L32 2" fill="#355E3B" />
            <path d="M18 14 L28 6 L38 14" fill="#355E3B" />
          </>
        );
      case 4:
        return (
          <>
            <circle cx="32" cy="52" r="6" fill="#355E3B" />
            <circle cx="22" cy="48" r="5" fill="#355E3B" opacity="0.7" />
            <circle cx="42" cy="48" r="5" fill="#355E3B" opacity="0.7" />
            <circle cx="28" cy="44" r="4" fill="#355E3B" opacity="0.5" />
            <circle cx="36" cy="44" r="4" fill="#355E3B" opacity="0.5" />
            <path d="M32 46 L32 22 Q32 16 28 12" stroke="#355E3B" strokeWidth="3.5" fill="none" />
            <ellipse cx="28" cy="12" rx="12" ry="6" fill="#5a8c69" />
            <path d="M28 12 L32 4 L28 4 L32 0" fill="#355E3B" />
            <path d="M16 12 L28 4 L40 12" fill="#355E3B" />
            <path d="M20 12 L28 6 L36 12" fill="#355E3B" opacity="0.6" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-[60px] h-[60px]">
      {getIconComplexity()}
    </svg>
  );
};

interface GrowthStageProps {
  position: string;
  title: string;
  delay: string;
  iconLevel: number;
  percentage: string;
  visible: boolean;
}

const GrowthStage = ({ position, title, delay, iconLevel, percentage, visible }: GrowthStageProps) => {
  return (
    <div
      className={`absolute ${position} flex flex-col items-center transition-all duration-1000 ease-out ${delay} ${
        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
      }`}
    >
      {/* Connection dot on curve */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-4 border-[#355E3B] rounded-full shadow-lg animate-pulse" />
      
      {/* Stage card */}
      <div className="bg-white rounded-xl md:rounded-2xl shadow-xl border-2 border-[#355E3B]/20 p-4 md:p-6 hover:scale-110 hover:shadow-2xl transition-all duration-300 min-w-[140px] md:min-w-[180px] mt-3 md:mt-4 relative z-20">
        {/* Icon */}
        <div className="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-[#ffffff] to-[#e8e8dc] rounded-full flex items-center justify-center mb-2 md:mb-4 mx-auto shadow-md">
          <StageIcon level={iconLevel} />
        </div>

        {/* Title */}
        <h3 className="text-[11px] md:text-sm font-bold text-[#355E3B] text-center mb-1.5 md:mb-2 leading-tight">
          {title}
        </h3>

        {/* Valuation range */}
        <div className="text-center mb-2 md:mb-0">
          <div className="inline-block bg-gradient-to-r from-[#355E3B] to-[#355E3B] text-white text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 rounded-full">
            ${percentage}
          </div>
        </div>

        {/* Growth bars */}
        <div className="flex gap-1 justify-center mt-2 md:mt-3">
          {Array.from({ length: iconLevel }).map((_, i) => (
            <div
              key={i}
              className="w-1.5 md:w-2 bg-gradient-to-t from-[#355E3B] to-[#355E3B] rounded-full transition-all duration-500"
              style={{
                height: `${(i + 1) * 6}px`,
                animationDelay: `${i * 100}ms`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Vertical line connecting to curve */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-3 md:h-4 bg-[#355E3B]/30" />
    </div>
  );
};

export default function AboutPage() {
  const [aboutVisible, setAboutVisible] = useState(false);
  const [stagesTitleVisible, setStagesTitleVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

  const aboutRef = useRef<HTMLDivElement>(null);
  const stagesTitleRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === aboutRef.current) setAboutVisible(true);
          if (entry.target === stagesTitleRef.current) setStagesTitleVisible(true);
          if (entry.target === infoRef.current) setInfoVisible(true);
        }
      });
    }, observerOptions);

    if (aboutRef.current) observer.observe(aboutRef.current);
    if (stagesTitleRef.current) observer.observe(stagesTitleRef.current);
    if (infoRef.current) observer.observe(infoRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-[#ffffff] text-gray-800 overflow-x-hidden">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(53, 94, 59) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      {/* About Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20">
        <div
          ref={aboutRef}
          className={`max-w-6xl w-full transition-all duration-1000 ease-out ${
            aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-12 sm:mb-16 md:mb-20 lg:mb-24 text-[#355E3B] tracking-tight">About</h1>

          <div className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-6 sm:mb-8 md:mb-10 tracking-tight">
              <span className="bg-gradient-to-r from-[#355E3B] via-[#355E3B] to-[#5a8c69] bg-clip-text text-transparent">Who</span>{' '}
              <span className="bg-gradient-to-r from-[#355E3B] via-[#5a8c69] to-green-400 bg-clip-text text-transparent">we</span>{' '}
              <span className="text-[#355E3B]">are</span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-[#355E3B] font-semibold mb-4 sm:mb-6 md:mb-8">
              SparkSeed Ventures is a SEBI approved early-stage venture capital firm.
            </p>

            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-600">
              SparkSeed Ventures seeks out startups with founder market fit, which entails founders who
              possess a profound comprehension of the problem they are addressing, relevant
              expertise, exceptional execution skills, and a commitment to integrity. The startups
              must also have the potential for scalability, market acceptance of their product, and
              unique product differentiation.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-white to-[#ffffff] flex items-center justify-center px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-[#355E3B]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-[#355E3B]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        
        <div className="w-full max-w-7xl relative z-10">
          {/* Vision Title with animated underline */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-3 sm:mb-4 md:mb-6 inline-block relative tracking-tight">
              <span className="bg-gradient-to-r from-[#355E3B] via-[#355E3B] to-[#5a8c69] bg-clip-text text-transparent">
                Vision
              </span>
              <div className="absolute -bottom-1.5 sm:-bottom-2 md:-bottom-3 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#355E3B] via-[#355E3B] to-[#5a8c69] rounded-full" />
            </h2>
          </div>

          {/* Stats Cards - Redesigned */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-16 lg:mb-20">
            {/* 20-30 Investments Card */}
            <div className="group relative bg-white border-2 border-gray-200 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl hover:border-[#355E3B]/30 transition-all duration-500 hover:-translate-y-2">
              <div className="text-center">
                {/* Number */}
                <div className="mb-3 sm:mb-4 md:mb-6">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent">
                    20-30
                  </div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#355E3B] mt-1 sm:mt-2">
                    Investments
                  </div>
                </div>
                
                {/* Decorative Arc */}
                <div className="relative h-20 sm:h-24 md:h-32 mb-3 sm:mb-4 md:mb-6 overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="xMidYMax meet">
                    <defs>
                      <linearGradient id="gradient-gray" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#9ca3af" />
                        <stop offset="50%" stopColor="#6b7280" />
                        <stop offset="100%" stopColor="#4b5563" />
                      </linearGradient>
                    </defs>
                    {[70, 60, 50, 40, 30].map((radius, index) => (
                      <path
                        key={index}
                        d={`M ${100 - radius} 95 A ${radius} ${radius} 0 0 1 ${100 + radius} 95`}
                        stroke="url(#gradient-gray)"
                        strokeWidth="3"
                        fill="none"
                        opacity={0.8 - index * 0.15}
                        className="transition-all duration-1000"
                      />
                    ))}
                  </svg>
                </div>
                
                {/* Description */}
                <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">
                  Strategic portfolio companies
                </p>
              </div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-400/0 to-gray-600/0 group-hover:from-gray-400/5 group-hover:to-gray-600/5 rounded-xl sm:rounded-2xl md:rounded-3xl transition-all duration-500" />
            </div>

            {/* 5+ Unicorns Card */}
            <div className="group relative bg-gradient-to-br from-[#355E3B]/5 to-[#355E3B]/10 border-2 border-[#355E3B] rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl hover:shadow-2xl hover:border-[#355E3B] transition-all duration-500 hover:-translate-y-2 hover:scale-105">
              <div className="text-center">
                {/* Number */}
                <div className="mb-3 sm:mb-4 md:mb-6">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-br from-[#355E3B] via-[#355E3B] to-[#5a8c69] bg-clip-text text-transparent">
                    5+
                  </div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#355E3B] mt-1 sm:mt-2">
                    Unicorns
                  </div>
                </div>
                
                {/* Decorative Arc */}
                <div className="relative h-20 sm:h-24 md:h-32 mb-3 sm:mb-4 md:mb-6 overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="xMidYMax meet">
                    <defs>
                      <linearGradient id="gradient-green" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#355E3B" />
                        <stop offset="50%" stopColor="#355E3B" />
                        <stop offset="100%" stopColor="#5a8c69" />
                      </linearGradient>
                      <filter id="glow-green">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    {[70, 60, 50, 40, 30].map((radius, index) => (
                      <path
                        key={index}
                        d={`M ${100 - radius} 95 A ${radius} ${radius} 0 0 1 ${100 + radius} 95`}
                        stroke="url(#gradient-green)"
                        strokeWidth="4"
                        fill="none"
                        opacity={0.9 - index * 0.15}
                        filter="url(#glow-green)"
                        className="transition-all duration-1000"
                      />
                    ))}
                  </svg>
                </div>
                
                {/* Description */}
                <p className="text-xs sm:text-sm md:text-base text-[#355E3B] font-semibold">
                  Billion-dollar valuations
                </p>
              </div>
              
              {/* Shine effect */}
              <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            </div>

            {/* 10+ Sectors Card */}
            <div className="group relative bg-white border-2 border-gray-200 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl hover:border-[#355E3B]/30 transition-all duration-500 hover:-translate-y-2">
              <div className="text-center">
                {/* Number */}
                <div className="mb-3 sm:mb-4 md:mb-6">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-br from-[#355E3B] via-[#5a8c69] to-green-400 bg-clip-text text-transparent">
                    10+
                  </div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#355E3B] mt-1 sm:mt-2">
                    Sectors
                  </div>
                </div>
                
                {/* Decorative Arc */}
                <div className="relative h-20 sm:h-24 md:h-32 mb-3 sm:mb-4 md:mb-6 overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="xMidYMax meet">
                    <defs>
                      <linearGradient id="gradient-accent" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#355E3B" />
                        <stop offset="50%" stopColor="#5a8c69" />
                        <stop offset="100%" stopColor="#6abe83" />
                      </linearGradient>
                    </defs>
                    {[70, 60, 50, 40, 30].map((radius, index) => (
                      <path
                        key={index}
                        d={`M ${100 - radius} 95 A ${radius} ${radius} 0 0 1 ${100 + radius} 95`}
                        stroke="url(#gradient-accent)"
                        strokeWidth="3"
                        fill="none"
                        opacity={0.8 - index * 0.15}
                        className="transition-all duration-1000"
                      />
                    ))}
                  </svg>
                </div>
                
                {/* Description */}
                <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">
                  Diversified investments
                </p>
              </div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#355E3B]/0 to-green-400/0 group-hover:from-[#355E3B]/5 group-hover:to-green-400/5 rounded-xl sm:rounded-2xl md:rounded-3xl transition-all duration-500" />
            </div>
          </div>

          {/* Vision Statement Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#355E3B]/20 via-[#355E3B]/20 to-[#5a8c69]/20 rounded-xl sm:rounded-2xl md:rounded-3xl blur-2xl" />
            <div className="relative bg-gradient-to-br from-[#355E3B] via-[#355E3B] to-[#355E3B] rounded-xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-2xl overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 md:w-64 md:h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-40 sm:h-40 md:w-64 md:h-64 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 text-center">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 text-white/90 leading-tight tracking-tight">
                  Creating Multibagger Returns
                </h3>
                <div className="inline-block">
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                    With Historically Proven Best Asset Class
                  </p>
                  <div className="mt-2 sm:mt-3 md:mt-4 h-0.5 sm:h-1 md:h-1.5 bg-white/40 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Stages Section */}
      <section className="relative min-h-screen bg-[#ffffff] flex items-center justify-center px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20">
        <div className="w-full max-w-7xl">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 sm:gap-8 mb-12 sm:mb-16">
            <h2
              ref={stagesTitleRef}
              className={`text-2xl sm:text-3xl lg:text-4xl font-black text-[#355E3B] tracking-tight transition-all duration-1000 ease-out ${
                stagesTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Investing Across Stages
            </h2>

            <div
              ref={infoRef}
              className={`text-left lg:text-right text-base sm:text-lg leading-relaxed text-gray-600 max-w-xl transition-all duration-1000 ease-out delay-300 ${
                infoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Investing in startups that demonstrate high potential for achieving either an IPO or a
              M&A deal.
            </div>
          </div>

          {/* Growth Graph Visualization - Desktop / Timeline - Mobile */}
          <div className="relative w-full">
            {/* MOBILE VIEW - Clean Timeline Layout */}
            <div className="sm:hidden space-y-6">
              {/* Stage 1 */}
              <div className="flex gap-4 items-start">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#355E3B] to-[#355E3B] flex items-center justify-center shadow-lg">
                    <span className="text-white font-black text-lg">1</span>
                  </div>
                  <div className="w-1 flex-1 min-h-[80px] bg-gradient-to-b from-[#355E3B] to-[#355E3B]"></div>
                </div>
                <div className="flex-1 bg-white rounded-xl shadow-lg border-2 border-[#355E3B]/20 p-4 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#ffffff] to-[#e8e8dc] rounded-full flex items-center justify-center shadow-sm">
                      <div className="scale-[0.6]">
                        <StageIcon level={1} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-[#355E3B] leading-tight">Pre-Seed & Seed</h3>
                      <div className="inline-block bg-gradient-to-r from-[#355E3B] to-[#355E3B] text-white text-xs font-bold px-2 py-0.5 rounded-full mt-1">
                        $0-5M
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">Initial funding for product development and market validation</p>
                </div>
              </div>

              {/* Stage 2 */}
              <div className="flex gap-4 items-start">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#355E3B] to-[#355E3B] flex items-center justify-center shadow-lg">
                    <span className="text-white font-black text-lg">2</span>
                  </div>
                  <div className="w-1 flex-1 min-h-[80px] bg-gradient-to-b from-[#355E3B] to-[#5a8c69]"></div>
                </div>
                <div className="flex-1 bg-white rounded-xl shadow-lg border-2 border-[#355E3B]/20 p-4 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#ffffff] to-[#e8e8dc] rounded-full flex items-center justify-center shadow-sm">
                      <div className="scale-[0.6]">
                        <StageIcon level={2} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-[#355E3B] leading-tight">Pre-Series A / Series A</h3>
                      <div className="inline-block bg-gradient-to-r from-[#355E3B] to-[#355E3B] text-white text-xs font-bold px-2 py-0.5 rounded-full mt-1">
                        $5-15M
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">Scaling operations and expanding market reach</p>
                </div>
              </div>

              {/* Stage 3 */}
              <div className="flex gap-4 items-start">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#355E3B] to-[#5a8c69] flex items-center justify-center shadow-lg">
                    <span className="text-white font-black text-lg">3</span>
                  </div>
                  <div className="w-1 flex-1 min-h-[80px] bg-gradient-to-b from-[#5a8c69] to-green-400"></div>
                </div>
                <div className="flex-1 bg-white rounded-xl shadow-lg border-2 border-[#355E3B]/20 p-4 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#ffffff] to-[#e8e8dc] rounded-full flex items-center justify-center shadow-sm">
                      <div className="scale-[0.6]">
                        <StageIcon level={3} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-[#355E3B] leading-tight">Series B</h3>
                      <div className="inline-block bg-gradient-to-r from-[#355E3B] to-[#5a8c69] text-white text-xs font-bold px-2 py-0.5 rounded-full mt-1">
                        $15-50M
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">Market expansion and building competitive advantages</p>
                </div>
              </div>

              {/* Stage 4 */}
              <div className="flex gap-4 items-start">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5a8c69] to-green-400 flex items-center justify-center shadow-lg">
                    <span className="text-white font-black text-lg">4</span>
                  </div>
                </div>
                <div className="flex-1 bg-gradient-to-br from-[#355E3B]/5 to-[#355E3B]/10 rounded-xl shadow-lg border-2 border-[#355E3B] p-4 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#ffffff] to-[#e8e8dc] rounded-full flex items-center justify-center shadow-sm">
                      <div className="scale-[0.6]">
                        <StageIcon level={4} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-[#355E3B] leading-tight">Series C & onwards</h3>
                      <div className="inline-block bg-gradient-to-r from-[#5a8c69] to-green-400 text-white text-xs font-bold px-2 py-0.5 rounded-full mt-1">
                        $50M+
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-[#355E3B] font-semibold">Preparing for IPO or major acquisition</p>
                </div>
              </div>
            </div>

            {/* DESKTOP VIEW - Original Graph */}
            <div className="hidden sm:block relative w-full h-[600px] md:h-[700px] lg:h-[750px] bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-6 md:p-10 lg:p-16 overflow-visible shadow-lg">
              {/* Grid lines */}
              <div className="absolute inset-0 opacity-20 rounded-2xl sm:rounded-3xl overflow-hidden">
                <div className="absolute bottom-16 left-0 right-0 h-px bg-gray-300" />
                <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gray-300" />
                <div className="absolute bottom-2/4 left-0 right-0 h-px bg-gray-300" />
                <div className="absolute bottom-3/4 left-0 right-0 h-px bg-gray-300" />
              </div>

              {/* Y-axis label */}
              <div className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 -rotate-90 text-xs md:text-sm font-bold text-gray-500 tracking-wide whitespace-nowrap">
                Company Growth
              </div>

              {/* X-axis label */}
              <div className="absolute bottom-2 md:bottom-6 left-1/2 -translate-x-1/2 text-xs md:text-sm font-bold text-gray-500 tracking-wide">
                Investment Stage
              </div>

              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 1200 750"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Animated growth curve */}
                <defs>
                  <linearGradient id="growthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#355E3B" />
                    <stop offset="50%" stopColor="#355E3B" />
                    <stop offset="100%" stopColor="#5a8c69" />
                  </linearGradient>
                  
                  {/* Glow effect */}
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Growth curve path */}
                <path
                  d="M 140 650 Q 220 590, 300 520 Q 400 440, 520 340 Q 640 240, 790 160 Q 920 100, 1060 80"
                  stroke="url(#growthGradient)"
                  strokeWidth="6"
                  fill="none"
                  filter="url(#glow)"
                  className={`transition-all duration-[3000ms] ease-out`}
                  style={{
                    strokeDasharray: 1500,
                    strokeDashoffset: stagesTitleVisible ? 0 : 1500,
                  }}
                />

                {/* Area fill under curve */}
                <path
                  d="M 140 650 Q 220 590, 300 520 Q 400 440, 520 340 Q 640 240, 790 160 Q 920 100, 1060 80 L 1060 730 L 140 730 Z"
                  fill="url(#growthGradient)"
                  opacity="0.1"
                  className={`transition-all duration-[3000ms] ease-out delay-500`}
                  style={{
                    strokeDasharray: 2200,
                    strokeDashoffset: stagesTitleVisible ? 0 : 2200,
                  }}
                />
              </svg>

              {/* Stage markers on the curve - Desktop only */}
              <GrowthStage
                position="bottom-[80px] left-[12%]"
                title="Pre-Seed & Seed"
                delay="delay-[800ms]"
                iconLevel={1}
                percentage="0-5M"
                visible={stagesTitleVisible}
              />

              <GrowthStage
                position="bottom-[210px] left-[32%]"
                title="Pre-Series A / Series A"
                delay="delay-[1200ms]"
                iconLevel={2}
                percentage="5-15M"
                visible={stagesTitleVisible}
              />

              <GrowthStage
                position="bottom-[380px] left-[54%]"
                title="Series B"
                delay="delay-[1600ms]"
                iconLevel={3}
                percentage="15-50M"
                visible={stagesTitleVisible}
              />

              <GrowthStage
                position="bottom-[540px] left-[76%]"
                title="Series C & onwards"
                delay="delay-[2000ms]"
                iconLevel={4}
                percentage="50M+"
                visible={stagesTitleVisible}
              />

              {/* Milestone indicators */}
              <div
                className={`absolute bottom-16 right-16 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border-2 border-[#355E3B]/20 transition-all duration-1000 delay-[2400ms] ${
                  stagesTitleVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
              >
                <div className="text-sm font-bold text-[#355E3B] mb-3 tracking-wide">Growth Trajectory</div>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#355E3B]" />
                    <span>Product Development</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#355E3B]" />
                    <span>Market Expansion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#5a8c69]" />
                    <span>Scale & IPO/M&A</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}