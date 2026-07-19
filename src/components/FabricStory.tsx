import React from 'react';

export const FabricStory: React.FC = () => {
  return (
    <section id="fabric" className="py-24 bg-brand-dark text-brand-light px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-brand-light/5">
      {/* Decorative background grid line */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Textile Spec Sheet Layout (Technical Streetwear Visual) */}
          <div className="border border-brand-light/10 p-8 sm:p-12 bg-black/40 backdrop-blur-sm relative group">
            {/* Corner crosshairs for technical look */}
            <div className="absolute top-0 left-0 w-3 h-[1px] bg-brand-light/40"></div>
            <div className="absolute top-0 left-0 w-[1px] h-3 bg-brand-light/40"></div>
            <div className="absolute top-0 right-0 w-3 h-[1px] bg-brand-light/40"></div>
            <div className="absolute top-0 right-0 w-[1px] h-3 bg-brand-light/40"></div>
            <div className="absolute bottom-0 left-0 w-3 h-[1px] bg-brand-light/40"></div>
            <div className="absolute bottom-0 left-0 w-[1px] h-3 bg-brand-light/40"></div>
            <div className="absolute bottom-0 right-0 w-3 h-[1px] bg-brand-light/40"></div>
            <div className="absolute bottom-0 right-0 w-[1px] h-3 bg-brand-light/40"></div>

            {/* Spec Sheet Header */}
            <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-brand-light/50 mb-8 border-b border-brand-light/10 pb-4 font-display">
              <span>Textile Tech Spec // v1.0</span>
              <span className="font-semibold text-brand-light">axivers.lab</span>
            </div>

            {/* Main Blend Highlight */}
            <div className="mb-8">
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-light/45 block mb-1">Custom Hybrid Blend</span>
              <div className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-white flex items-baseline">
                60/40
                <span className="text-xs uppercase tracking-widest font-normal text-brand-light/60 ml-3">Cotton-Modal</span>
              </div>
            </div>

            {/* Detailed Spec breakdown */}
            <div className="space-y-6">
              <div className="flex justify-between items-start border-b border-brand-light/5 pb-4">
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold font-display mb-1 text-white">Combed Ring-Spun Cotton (60%)</h4>
                  <p className="text-xs text-brand-light/70 font-light leading-relaxed">
                    Longer fibers combed for purity, spun into fine yarn to deliver premium structural integrity, shape retention, and natural breathability.
                  </p>
                </div>
                <span className="text-xs font-mono text-brand-light/40 ml-4">60%</span>
              </div>

              <div className="flex justify-between items-start border-b border-brand-light/5 pb-4">
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold font-display mb-1 text-white">Technical Beechwood Modal (40%)</h4>
                  <p className="text-xs text-brand-light/70 font-light leading-relaxed">
                    Sourced sustainably from European beechwood. Enhances the fabric with silk-like softness, natural moisture absorption, and a fluid, cloud-soft drape.
                  </p>
                </div>
                <span className="text-xs font-mono text-brand-light/40 ml-4">40%</span>
              </div>
            </div>

            {/* Spec Footer */}
            <div className="mt-8 pt-4 border-t border-brand-light/10 flex items-center justify-between text-[9px] uppercase tracking-wider font-mono text-brand-light/40">
              <span>Precision-Crafted in Sri Lanka</span>
              <span>Weight: 190 GSM // Heavy Premium</span>
            </div>
          </div>

          {/* Right Column: Narrative Story */}
          <div className="flex flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.3em] text-brand-light/50 mb-4 font-display font-medium">
              Made in Sri Lanka // Global Quality
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-display font-light leading-tight tracking-tight text-white mb-8">
              Engineered with <br className="hidden sm:inline" />
              <span className="font-semibold italic font-sans tracking-wide">precision yarn tech.</span>
            </h2>

            <p className="text-sm font-light text-brand-light/80 tracking-wide leading-relaxed mb-8">
              Sri Lanka is globally recognized for high-end apparel engineering, partnering with the world's most elite brands. For axivers, we leverage local technical expertise to create clothing that is unmatched in comfort and performance. 
              Our 60/40 blend combines the durability and breathability of finest ring-spun cotton with the moisture-wicking, silky properties of micro-modal fibers.
            </p>

            {/* Three key pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div className="border-l border-brand-light/20 pl-4 py-2">
                <span className="text-xs uppercase tracking-widest font-display font-semibold text-white block mb-1">Breathable</span>
                <p className="text-xs text-brand-light/60 font-light leading-relaxed">
                  Allows air-permeability, regulating body heat efficiently.
                </p>
              </div>

              <div className="border-l border-brand-light/20 pl-4 py-2">
                <span className="text-xs uppercase tracking-widest font-display font-semibold text-white block mb-1">Moisture Wicking</span>
                <p className="text-xs text-brand-light/60 font-light leading-relaxed">
                  Absorbs humidity 50% faster than standard cotton, keeping you dry.
                </p>
              </div>

              <div className="border-l border-brand-light/20 pl-4 py-2">
                <span className="text-xs uppercase tracking-widest font-display font-semibold text-white block mb-1">Cloud Drape</span>
                <p className="text-xs text-brand-light/60 font-light leading-relaxed">
                  Resists wrinkles and flows smoothly across body contours.
                </p>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
