import React, { useState } from 'react';

interface PDPProps {
  onAddToCart: (size: string) => void;
}

export const PDP: React.FC<PDPProps> = ({ onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('fabric');

  const productImages = [
    { src: '/images/pdp_front.jpg', label: 'Front View' },
    { src: '/images/pdp_detail.jpg', label: 'Cuff Detail' },
    { src: '/images/pdp_back.jpg', label: 'Back View' },
  ];

  const sizes = ['S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      setAddedSuccess(true);
      onAddToCart(selectedSize);
      setTimeout(() => {
        setAddedSuccess(false);
      }, 2000);
    }, 800);
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <section id="shop" className="py-24 bg-brand-light text-brand-dark px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 grid grid-cols-12 gap-4">
          {/* Main Large Image Display */}
          <div className="col-span-12 bg-white border border-brand-dark/5 aspect-square relative overflow-hidden group">
            <img
              src={productImages[activeImageIndex].src}
              alt={productImages[activeImageIndex].label}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            {/* Tag Overlay */}
            <span className="absolute top-4 left-4 bg-brand-dark text-brand-light text-[9px] uppercase tracking-widest font-display font-semibold px-2 py-1">
              Flagship Release
            </span>
          </div>
          
          {/* Thumbnail Track */}
          <div className="col-span-12 flex gap-4 mt-2">
            {productImages.map((image, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`flex-1 aspect-square bg-white border cursor-pointer overflow-hidden transition-all duration-300 relative ${
                  activeImageIndex === idx
                    ? 'border-brand-dark opacity-100 ring-1 ring-brand-dark'
                    : 'border-brand-dark/10 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={image.src}
                  alt={image.label}
                  className="w-full h-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Product Actions & Details */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider text-brand-dark/50 mb-4 font-display">
            <a href="#" className="hover:text-brand-dark transition-colors">axivers</a>
            <span>/</span>
            <a href="#shop" className="hover:text-brand-dark transition-colors">Apparel</a>
            <span>/</span>
            <span className="text-brand-dark">Premium Piping Crewneck</span>
          </div>

          {/* Product Header */}
          <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight text-brand-dark mb-2">
            Premium Piping Crewneck
          </h2>
          
          {/* Price */}
          <div className="text-lg font-display font-medium tracking-wider mb-6 text-brand-dark/90">
            LKR 4,000
          </div>
          
          <hr className="border-brand-dark/10 mb-6" />

          {/* Description */}
          <p className="text-sm font-light text-brand-dark/80 tracking-wide leading-relaxed mb-8">
            A masterclass in modern minimalist streetwear. This deep solid black T-shirt is redefined with custom-inserted crisp white piping details inside the sleeve cuffs and along the bottom hem. Finished with clean, subtle white chest embroidery and our signature geometric back logo.
          </p>

          {/* Size Selector */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs uppercase tracking-widest font-display font-semibold">Select Size</span>
              <span className="text-xs text-brand-dark/50 underline cursor-pointer hover:text-brand-dark transition-colors font-display">
                Size Guide
              </span>
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3.5 border text-xs font-display font-semibold tracking-wider transition-all duration-300 rounded-none cursor-pointer ${
                    selectedSize === size
                      ? 'bg-brand-dark text-brand-light border-brand-dark'
                      : 'bg-transparent text-brand-dark border-brand-dark/20 hover:border-brand-dark'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`w-full py-4 text-xs font-display uppercase tracking-widest font-bold border transition-all duration-300 rounded-none cursor-pointer flex items-center justify-center gap-2 mb-8 ${
              addedSuccess
                ? 'bg-emerald-600 text-brand-light border-emerald-600'
                : 'bg-brand-dark text-brand-light border-brand-dark hover:bg-transparent hover:text-brand-dark'
            }`}
          >
            {isAdding ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : addedSuccess ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Added to Cart
              </>
            ) : (
              'Add to Cart'
            )}
          </button>

          {/* Product Specifications & Accordions */}
          <div className="border-t border-brand-dark/10">
            {/* Accordion 1: Fabric Details */}
            <div className="border-b border-brand-dark/10">
              <button
                onClick={() => toggleAccordion('fabric')}
                className="w-full py-4 flex justify-between items-center text-xs uppercase tracking-wider font-display font-semibold hover:opacity-75 transition-opacity"
              >
                <span>Fabric & Fit Spec</span>
                <svg
                  className={`w-3.5 h-3.5 transform transition-transform duration-300 ${openAccordion === 'fabric' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openAccordion === 'fabric' ? 'max-h-60 pb-5 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="text-xs font-light text-brand-dark/80 space-y-2 leading-relaxed tracking-wide">
                  <p><strong>Composition:</strong> 60% Combed Ring-Spun Cotton / 40% Modal blend.</p>
                  <p><strong>Fit:</strong> Contemporary athletic fit. True to size with a clean structured drape.</p>
                  <p><strong>Feel:</strong> Cloud-soft handfeel. Lightweight, highly breathable, and moisture-wicking for premium, all-day comfort.</p>
                  <p><strong>Origin:</strong> Precision-knitted and crafted locally in Sri Lanka.</p>
                </div>
              </div>
            </div>

            {/* Accordion 2: Care Instructions */}
            <div className="border-b border-brand-dark/10">
              <button
                onClick={() => toggleAccordion('care')}
                className="w-full py-4 flex justify-between items-center text-xs uppercase tracking-wider font-display font-semibold hover:opacity-75 transition-opacity"
              >
                <span>Care Instructions</span>
                <svg
                  className={`w-3.5 h-3.5 transform transition-transform duration-300 ${openAccordion === 'care' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openAccordion === 'care' ? 'max-h-60 pb-5 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <ul className="text-xs font-light text-brand-dark/80 list-disc pl-4 space-y-2 leading-relaxed tracking-wide">
                  <li>Machine wash cold (30°C) on a gentle cycle, wash inside out.</li>
                  <li>Wash with like colors only. Do not bleach.</li>
                  <li>Flat dry in shade to maintain optimal modal structure.</li>
                  <li>Cool iron on reverse side. Do not iron prints or embroidery.</li>
                </ul>
              </div>
            </div>

            {/* Accordion 3: Delivery & Returns */}
            <div className="border-b border-brand-dark/10">
              <button
                onClick={() => toggleAccordion('shipping')}
                className="w-full py-4 flex justify-between items-center text-xs uppercase tracking-wider font-display font-semibold hover:opacity-75 transition-opacity"
              >
                <span>Shipping & Returns</span>
                <svg
                  className={`w-3.5 h-3.5 transform transition-transform duration-300 ${openAccordion === 'shipping' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openAccordion === 'shipping' ? 'max-h-60 pb-5 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="text-xs font-light text-brand-dark/80 space-y-2 leading-relaxed tracking-wide">
                  <p><strong>Sri Lanka Delivery:</strong> 1-3 business days islandwide. Colombo next-day shipping available. LKR 350 flat shipping rate or free for orders over LKR 10,000.</p>
                  <p><strong>International Shipping:</strong> Express global DHL shipping calculated at checkout (4-7 business days).</p>
                  <p><strong>Returns:</strong> Returns accepted within 7 days of receipt for exchange or store credit in original unworn condition with tags attached.</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
