import React, { useState } from 'react';
import logo2 from '../assets/Logo2.png';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <footer className="bg-brand-dark text-brand-light pt-20 pb-10 px-4 sm:px-6 lg:px-8 border-t border-brand-light/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-brand-light/10">
        
        {/* Left Column: Brand & Tagline */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center">
            <img src={logo2} alt="axivers" className="h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300" />
          </div>
          <p className="text-xs text-brand-light/60 font-light leading-relaxed max-w-sm tracking-wide">
            Precision-crafted athletic luxury essentials designed for the modern lifestyle. Re-engineering basics from the yarns up.
          </p>
          <div className="text-[10px] text-brand-light/40 font-mono">
            © {new Date().getFullYear()} AXIVERS CLOTHING PVT LTD. <br />
            MADE IN SRI LANKA // FOR THE WORLD.
          </div>
        </div>

        {/* Center Column 1: Shop Menu */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-xs uppercase tracking-widest font-display font-semibold text-white">Shop</h4>
          <ul className="space-y-2 text-xs font-light text-brand-light/60">
            <li><a href="#shop" className="hover:text-white transition-colors">Flagship Crewneck</a></li>
            <li><a href="#" className="hover:text-white transition-colors">New Releases</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Collections</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Essentials</a></li>
          </ul>
        </div>

        {/* Center Column 2: Information */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-xs uppercase tracking-widest font-display font-semibold text-white">Support</h4>
          <ul className="space-y-2 text-xs font-light text-brand-light/60">
            <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Shipping & Delivery</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Return Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        {/* Right Column: Newsletter Signup */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs uppercase tracking-widest font-display font-semibold text-white">Newsletter</h4>
          <p className="text-xs text-brand-light/60 font-light tracking-wide leading-relaxed">
            Subscribe to receive priority access to limited edition drops and fabric research.
          </p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 pt-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ENTER EMAIL ADDRESS"
              required
              className="bg-black/45 border border-brand-light/20 text-xs px-4 py-3 text-white placeholder-brand-light/40 focus:outline-none focus:border-brand-light rounded-md flex-1 tracking-wider font-mono uppercase"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-brand-light text-brand-dark font-display text-xs uppercase tracking-widest font-bold border border-brand-light hover:bg-transparent hover:text-brand-light transition-all duration-300 rounded-md cursor-pointer text-center"
            >
              {subscribed ? 'SUBSCRIBED' : 'JOIN'}
            </button>
          </form>
        </div>
      </div>

      {/* Social & Bottom Info */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Social Links */}
        <div className="flex space-x-6 text-xs tracking-widest font-display uppercase font-semibold text-brand-light/50">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Facebook</a>
          <a href="#" className="hover:text-white transition-colors">Tiktok</a>
        </div>
        
        {/* Certifications & payments */}
        <div className="flex items-center space-x-4 text-[9px] font-mono text-brand-light/40 tracking-wider">
          <span>VISA</span>
          <span>•</span>
          <span>MASTERCARD</span>
          <span>•</span>
          <span>AMEX</span>
          <span>•</span>
          <span>GENIE</span>
          <span>•</span>
          <span>KOKO</span>
          <span>•</span>
          <span>PAYHERE</span>
        </div>
      </div>
    </footer>
  );
};
