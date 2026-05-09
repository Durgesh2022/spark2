'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  scrollProgress?: number;
  isScrolled?: boolean;
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about1', label: 'About' },
  { href: '/about/investors', label: 'For Investors' },
  { href: '/about/founders', label: 'For Founders' },
];

const Navbar: React.FC<NavbarProps> = ({ scrollProgress, isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [localScrollProgress, setLocalScrollProgress] = useState(0);
  const [localIsScrolled, setLocalIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const percentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setLocalScrollProgress(percentage);
      setLocalIsScrolled(scrollTop > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const progress = scrollProgress || localScrollProgress;
  const scrolled = isScrolled !== undefined && isScrolled !== false ? isScrolled : localIsScrolled;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-xl shadow-[0_4px_24px_-12px_rgba(53,94,59,0.18)] border-b border-[#355E3B]/8'
          : 'bg-transparent'
      }`}
    >
      <div className="hidden md:flex items-center justify-between max-w-[1400px] mx-auto px-8 h-[78px]">
        <a href="/" className="flex items-center gap-3 group">
          <img src="/sparkseed2.png" alt="SPARKSEED" className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" />
        </a>

        <nav className="flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-[15px] font-medium text-[#355E3B] hover:text-[#355E3B] transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#355E3B] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <a
            href="/Pitch"
            className="relative inline-flex items-center gap-2 bg-[#355E3B] text-white px-6 py-2.5 text-sm font-semibold tracking-wide rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#355E3B]/30 hover:-translate-y-0.5"
          >
            <span className="relative z-10">Pitch to us</span>
            <svg className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>

      {/* Progress bar */}
      <div className="hidden md:block absolute bottom-0 left-0 right-0 h-[2px] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[#355E3B] via-[#355E3B] to-[#f4b942] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-center justify-between px-5 h-[64px]">
        <a href="/" className="flex items-center">
          <img src="/sparkseed2.png" alt="SPARKSEED" className="h-9 w-auto" />
        </a>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-[#355E3B] p-2 z-[70] rounded-full hover:bg-[#355E3B]/10 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={`md:hidden fixed inset-0 bg-[#ffffff] z-50 transition-all duration-500 ${
          isMenuOpen ? 'top-[64px] opacity-100' : '-top-full opacity-0'
        }`}
      >
        <nav className="flex flex-col p-6 gap-1">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="text-2xl font-display font-semibold text-[#355E3B] py-4 border-b border-[#355E3B]/15 hover:text-[#355E3B] transition-colors"
              style={{ animation: isMenuOpen ? `ss-fade-up 0.5s ${i * 0.06}s both` : 'none' }}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/Pitch"
            className="mt-6 inline-block bg-[#355E3B] text-white px-6 py-4 text-sm uppercase tracking-widest text-center rounded-full font-semibold hover:bg-[#355E3B] transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Pitch to us →
          </a>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#355E3B]/10">
          <div
            className="h-full bg-gradient-to-r from-[#355E3B] to-[#f4b942] transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
