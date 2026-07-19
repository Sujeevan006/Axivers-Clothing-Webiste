import React from 'react';
import logo2 from '../assets/Logo2.png';

interface HeroProps {
  onShopClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick }) => {
  return (
    <section className="relative min-h-screen bg-brand-dark text-brand-light flex items-center justify-center overflow-hidden pt-20">
      
      {/* Ambient Radial Spotlight (glowing effect) */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-white/[0.015] rounded-full blur-[140px] pointer-events-none"></div>
      
      {/* Subtle Technical Grid Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] opacity-60"></div>
      
      {/* Huge Background Vertical Logo Watermark */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-[12%] rotate-90 origin-center pointer-events-none select-none z-0 opacity-[0.06] hidden lg:block">
        <img src={logo2} alt="axivers watermark" className="h-44 w-auto min-w-[85vh] object-contain" />
      </div>

      {/* Far Left Vertical Logo Accent */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 -rotate-90 origin-center pointer-events-none select-none z-10 hidden xl:flex items-center">
        <img src={logo2} alt="axivers vertical brand" className="h-6 w-auto opacity-35 tracking-[0.25em] scale-200" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Typography & Call to Action (7 cols on large screen) */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          {/* Subtle tag */}
          <div className="inline-flex items-center space-x-3 border border-brand-light/10 px-3 py-1 bg-white/[0.02] backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-brand-light animate-ping"></span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-light/70 font-display font-medium">
              Flagship Crewneck Available Now
            </span>
          </div>
          
          {/* Big Header Tagline - Fixed visibility of modern lifestyle and reduced font size for cleaner presentation */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extralight leading-tight tracking-tighter">
            Elevated essentials <br />
            for the <span className="font-semibold italic font-sans text-brand-light text-stroke-white tracking-normal">modern lifestyle.</span>
          </h1>
          
          {/* Detailed Paragraph */}
          <p className="text-sm sm:text-base font-light text-brand-light/70 max-w-xl leading-relaxed tracking-wide">
            Precision-crafted in Sri Lanka. Engineered with a heavy 190 GSM Cotton-Modal blend for unmatched cooling breathability, moisture management, and an elegant cloud-soft drape.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={onShopClick}
              className="px-10 py-4 bg-brand-light text-brand-dark font-display text-xs uppercase tracking-[0.2em] font-bold border border-brand-light hover:bg-transparent hover:text-brand-light transition-all duration-300 rounded-none shadow-lg cursor-pointer"
            >
              Shop Collection
            </button>
            <a
              href="#fabric"
              className="px-10 py-4 bg-transparent text-brand-light font-display text-xs uppercase tracking-[0.2em] font-semibold border border-brand-light/25 hover:border-brand-light transition-all duration-300 rounded-none text-center"
            >
              Fabric Research
            </a>
          </div>

          {/* Technical properties summaries */}
          <div className="grid grid-cols-3 gap-6 pt-10 border-t border-brand-light/10 max-w-lg">
            <div>
              <span className="text-xs font-mono text-brand-light/35 block mb-1">01 / FIBERS</span>
              <span className="text-xs uppercase tracking-wider font-semibold">Cotton-Modal</span>
            </div>
            <div>
              <span className="text-xs font-mono text-brand-light/35 block mb-1">02 / STRUCTURE</span>
              <span className="text-xs uppercase tracking-wider font-semibold">Custom Piping</span>
            </div>
            <div>
              <span className="text-xs font-mono text-brand-light/35 block mb-1">03 / WEIGHT</span>
              <span className="text-xs uppercase tracking-wider font-semibold">190 GSM</span>
            </div>
          </div>
        </div>

        {/* Right Column: High-Fashion Asymmetric Frame (5 cols) */}
        <div className="lg:col-span-5 relative hidden md:block">
          
          {/* Background offset card */}
          <div className="absolute inset-4 border border-brand-light/15 translate-x-4 translate-y-4 pointer-events-none z-0"></div>

          {/* Main Visual Display */}
          <div className="relative bg-zinc-950 border border-brand-light/10 p-6 z-10 shadow-2xl">
            {/* Tech details on overlay */}
            <div className="absolute top-3 left-4 text-[8px] font-mono text-brand-light/40 uppercase">
              MODEL_REP: FLAG.01 // SIZE_L
            </div>
            <div className="absolute top-3 right-4 text-[8px] font-mono text-brand-light/40">
              [ FIT_ATHLETIC ]
            </div>

            {/* Product Image Frame */}
            <div className="aspect-[3/4] bg-white overflow-hidden relative group">
              <img
                src="/images/pdp_front.jpg"
                alt="axivers Premium Piping Crewneck"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-widest text-brand-light/60">Flagship Item</span>
                  <p className="text-xs uppercase tracking-wider font-bold text-white">Premium Piping Crewneck</p>
                </div>
              </div>
            </div>

            {/* Crop crosshairs */}
            <div className="absolute bottom-2 left-4 text-[8px] font-mono text-brand-light/30">
              FRAME_REF_4832
            </div>
            <div className="absolute bottom-2 right-4 text-[8px] font-mono text-brand-light/30">
              © axivers clothing
            </div>
          </div>

          {/* Mini accent tag floating outside */}
          <div className="absolute -left-10 bottom-12 bg-white text-black py-2 px-4 uppercase tracking-[0.2em] text-[9px] font-display font-bold rotate-90 z-20 shadow-xl">
            SL_QUALITY
          </div>
        </div>

      </div>
    </section>
  );
};
