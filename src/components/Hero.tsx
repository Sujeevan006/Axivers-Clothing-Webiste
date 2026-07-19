import React from 'react';

interface HeroProps {
  onShopClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick }) => {
  return (
    <section className="relative min-h-screen bg-brand-dark text-brand-light flex items-center justify-center overflow-hidden">
      {/* Background Subtle Gradient & Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40"></div>
      
      {/* Large Backdrop Brand Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[20vw] font-display font-extrabold uppercase tracking-[0.15em] opacity-[0.03] select-none text-stroke whitespace-nowrap">
          axivers
        </span>
      </div>

      {/* Decorative vertical lines for streetwear aesthetic */}
      <div className="absolute left-8 bottom-0 top-0 w-[1px] bg-brand-light/5 hidden md:block"></div>
      <div className="absolute right-8 bottom-0 top-0 w-[1px] bg-brand-light/5 hidden md:block"></div>
      
      {/* Hero Content */}
      <div className="relative max-w-4xl mx-auto px-6 text-center z-10 flex flex-col items-center">
        
        {/* Subtle top subtitle */}
        <span className="text-xs uppercase tracking-[0.3em] text-brand-light/60 mb-6 animate-fade-in font-display font-medium">
          Flagship Release 01 // The Crewneck
        </span>
        
        {/* Main Header Tagline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-light leading-tight tracking-tight mb-8 max-w-3xl animate-slide-up">
          Elevated essentials for the <br className="hidden sm:inline" />
          <span className="font-semibold font-sans italic tracking-wide">modern lifestyle.</span>
        </h1>
        
        {/* Secondary Subtitle */}
        <p className="text-sm sm:text-base font-light text-brand-light/75 max-w-xl mb-12 tracking-wide leading-relaxed animate-slide-up [animation-delay:200ms]">
          Precision-crafted in Sri Lanka. Engineered with a premium cotton-modal blend for unmatched breathability, drape, and cloud-soft touch.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto animate-slide-up [animation-delay:400ms]">
          <button
            onClick={onShopClick}
            className="w-full sm:w-auto px-8 py-4 bg-brand-light text-brand-dark font-display text-xs uppercase tracking-widest font-semibold hover:bg-transparent hover:text-brand-light border border-brand-light transition-all duration-300 rounded-none shadow-lg"
          >
            Shop Flagship
          </button>
          
          <a
            href="#fabric"
            className="w-full sm:w-auto px-8 py-4 bg-transparent text-brand-light font-display text-xs uppercase tracking-widest font-semibold hover:bg-brand-light/10 border border-brand-light/35 transition-all duration-300 rounded-none text-center"
          >
            Explore Fabric
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-50 animate-bounce">
        <span className="text-[9px] uppercase tracking-[0.25em] font-display font-medium">Scroll Down</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};
