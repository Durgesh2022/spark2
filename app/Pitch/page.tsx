'use client';
import React, { useState } from 'react';

const PitchPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do we add value to companies?",
      answer: "We provide hands-on mentorship, strategic guidance, operational support, and access to our extensive network of industry experts and potential partners."
    },
    {
      question: "What are the top considerations for SparkSeed when determining whether to invest in a particular company?",
      answer: "We look at the founding team's capabilities, market opportunity, product-market fit, scalability potential, and the company's ability to execute their vision."
    },
    {
      question: "Does SparkSeed participate in syndicated investments with other VCs and angels?",
      answer: "Yes, we actively collaborate with other VCs and angel investors to provide the best support and funding for our portfolio companies."
    },
    {
      question: "What sectors does SparkSeed invest?",
      answer: "We invest across various sectors including technology, SaaS, fintech, healthcare, and other innovative industries with high growth potential."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#ffffff]">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(53, 94, 59) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>
      {/* Header */}
      <header className="relative px-6 sm:px-8 md:px-12 lg:px-20 py-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#355E3B]">Pitch</h1>
      </header>

      {/* Main Content */}
      <main className="relative px-6 sm:px-8 md:px-12 lg:px-20 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-7xl">
          {/* Left Section - Share Your Vision */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#355E3B] leading-tight">
                Share Your Vision
              </h2>
              
              <p className="text-base sm:text-lg text-[#355E3B] leading-relaxed">
                Great ideas can come from anyone, anywhere. If you have an idea burning in your mind, let's ignite it together and make a lasting impact. Pitch to us now!
              </p>
              
              <div className="pt-4">
                <p className="text-lg sm:text-xl font-semibold text-[#355E3B] mb-6">
                  Kindly fill this form for us to initiate the evaluation process.
                </p>
                
                <a
                  href="https://forms.gle/bSRnkukrFKB7QFzPA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full sm:w-auto px-8 py-4 bg-[#355E3B] text-white text-center text-lg font-semibold rounded-lg hover:bg-[#355E3B] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Fill the Form
                </a>
              </div>
              
              <div className="pt-4">
                <p className="text-sm text-[#355E3B]">
                  <span className="font-bold">Note:</span> It is mandatory to fill the form to initiate evaluation process.
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - FAQs */}
          <div 
            className="rounded-2xl p-8 sm:p-10 shadow-xl"
            style={{
              background: 'linear-gradient(135deg, #355E3B 0%, #355E3B 50%, #5a8c69 100%)'
            }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8">FAQs</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="border-b border-white/30 pb-4"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-start justify-between gap-4 text-left group"
                  >
                    <span className="text-white text-base sm:text-lg font-medium leading-snug flex-1">
                      {faq.question}
                    </span>
                    <span 
                      className="text-white text-2xl font-bold flex-shrink-0 transition-transform duration-300"
                      style={{
                        transform: openFaq === index ? 'rotate(45deg)' : 'rotate(0deg)'
                      }}
                    >
                      +
                    </span>
                  </button>
                  
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: openFaq === index ? '500px' : '0',
                      opacity: openFaq === index ? 1 : 0
                    }}
                  >
                    <p className="text-white/90 text-sm sm:text-base mt-4 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PitchPage;