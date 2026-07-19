import React from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, size: string, quantity: number) => void;
  onRemoveItem: (id: string, size: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal > 10000 ? 0 : 350;
  const total = subtotal === 0 ? 0 : subtotal + shippingFee;

  return (
    <div
      className={`fixed inset-0 z-50 transition-visibility duration-300 ${
        isOpen ? 'visible' : 'invisible'
      }`}
    >
      {/* Backdrop overlay */}
      <div
        className={`absolute inset-0 bg-[#060606]/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Cart Panel */}
      <div
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-brand-light text-brand-dark shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-brand-dark/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm uppercase tracking-widest font-display font-semibold">Your Bag</span>
            <span className="text-xs bg-brand-dark text-brand-light font-mono px-1.5 py-0.5 font-bold">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:opacity-60 transition-opacity focus:outline-none cursor-pointer"
            aria-label="Close Cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart items list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <svg
                className="w-10 h-10 text-brand-dark/20 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h3 className="text-sm uppercase tracking-wider font-display font-semibold mb-1">Your bag is empty</h3>
              <p className="text-xs text-brand-dark/50 font-light max-w-[240px] leading-relaxed">
                Add premium essentials to start styling.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-3 bg-brand-dark text-brand-light text-xs font-display uppercase tracking-widest font-semibold hover:opacity-95 transition-opacity"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4 border-b border-brand-dark/5 pb-6">
                {/* Product thumbnail */}
                <div className="w-20 h-20 bg-white border border-brand-dark/5 aspect-square overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs uppercase tracking-wider font-semibold font-display pr-4 line-clamp-1">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id, item.size)}
                        className="text-[10px] text-brand-dark/40 hover:text-brand-dark transition-colors font-display"
                      >
                        Remove
                      </button>
                    </div>
                    <span className="text-[10px] text-brand-dark/50 block mt-0.5 uppercase font-display font-medium">
                      Size: {item.size}
                    </span>
                  </div>

                  {/* Quantity selector & Price */}
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center border border-brand-dark/20">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.size, item.quantity - 1)}
                        className="px-2 py-1 text-xs hover:bg-brand-dark/5 transition-colors focus:outline-none cursor-pointer"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-mono font-medium">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.size, item.quantity + 1)}
                        className="px-2 py-1 text-xs hover:bg-brand-dark/5 transition-colors focus:outline-none cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-xs font-mono font-semibold">
                      LKR {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary (Sticky at bottom if items exist) */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-brand-dark/10 bg-brand-light/95 backdrop-blur-md space-y-4">
            
            {/* Calculation summary */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between font-light text-brand-dark/70">
                <span>Subtotal</span>
                <span className="font-mono">LKR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-light text-brand-dark/70">
                <span>Shipping (Islandwide)</span>
                <span className="font-mono">{shippingFee === 0 ? 'FREE' : `LKR ${shippingFee}`}</span>
              </div>
              <hr className="border-brand-dark/5" />
              <div className="flex justify-between text-sm font-semibold uppercase tracking-wider font-display pt-1">
                <span>Total</span>
                <span className="font-mono">LKR {total.toLocaleString()}</span>
              </div>
            </div>

            {/* Local Payments Notice */}
            <div className="bg-brand-dark/5 p-3 text-[10px] leading-relaxed text-brand-dark/70 font-light border-l border-brand-dark/30">
              <p className="font-medium mb-1 uppercase tracking-wider font-display">Local Gateway Integration Ready</p>
              Checkout uses encrypted processing. Integrates seamlessly with local payment gateways (PayHere, Webxpay) supporting Visa, Mastercard, AMEX, Genie, and Koko.
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => alert('Proceeding to Checkout with secure gateway... (Mock Checkout)')}
              className="w-full py-4 bg-brand-dark text-brand-light text-xs font-display uppercase tracking-widest font-bold border border-brand-dark hover:bg-transparent hover:text-brand-dark transition-all duration-300 rounded-none cursor-pointer text-center"
            >
              Proceed to Checkout
            </button>
            
            {/* Lock Secure Indicators */}
            <div className="flex items-center justify-center space-x-1 text-[9px] uppercase tracking-widest text-brand-dark/40 font-mono">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>128-bit SSL Secure Checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
