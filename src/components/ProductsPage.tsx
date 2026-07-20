import React, { useState } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'flagship' | 'minimalist' | 'technical';
  categoryLabel: string;
  tagline: string;
  description: string;
  images: string[];
  fabricSpec: string;
  careInstructions: string;
  sizes: string[];
}

interface ProductsPageProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onQuickAdd: (product: Product, size: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  onProductClick,
  onQuickAdd,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');

  const categories = [
    { value: 'all', label: 'All Essentials' },
    { value: 'flagship', label: 'Flagship Piping' },
    { value: 'minimalist', label: 'Minimalist Basics' },
    { value: 'technical', label: 'Technical Fit' },
  ];

  // Filtering
  const filteredProducts = products.filter((product) => {
    if (selectedCategory === 'all') return true;
    return product.category === selectedCategory;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0; // Default ordering
  });

  return (
    <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-brand-dark text-brand-light min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-light/50 font-display block">
            Systematic Wardrobe
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-light tracking-tight">
            The{' '}
            <span className="font-semibold italic font-sans">
              Core Collection
            </span>
          </h2>
          <p className="text-xs sm:text-sm font-light text-brand-light/60 max-w-lg mx-auto leading-relaxed">
            A modular range of engineered garments. Meticulously cut from local
            combed yarns and Beechwood Modal fibers to create the ultimate
            premium drape.
          </p>
        </div>

        {/* Filters & Sorting Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-brand-light/10 pb-6 mb-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 text-xs font-display uppercase tracking-widest font-medium border transition-all duration-300 rounded-md cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-brand-light text-brand-dark border-brand-light'
                    : 'bg-transparent text-brand-light/60 border-transparent hover:border-brand-light/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <span className="text-[10px] uppercase tracking-widest text-brand-light/50 font-display whitespace-nowrap">
              Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border border-brand-light/20 text-xs font-display tracking-wider py-2 px-3 focus:outline-none focus:border-brand-light rounded-md uppercase text-brand-light w-full sm:w-auto cursor-pointer"
            >
              <option value="default" className="bg-brand-dark">
                Default
              </option>
              <option value="price-asc" className="bg-brand-dark">
                Price: Low to High
              </option>
              <option value="price-desc" className="bg-brand-dark">
                Price: High to Low
              </option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xs uppercase tracking-widest font-display text-brand-light/50">
              No products found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col border border-brand-light/5 bg-black/5 p-4 transition-all duration-300 hover:shadow-lg relative"
              >
                {/* Product Image Area */}
                <div
                  onClick={() => onProductClick(product)}
                  className="aspect-square bg-zinc-950 overflow-hidden relative cursor-pointer"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Category overlay */}
                  <span className="absolute top-3 left-3 bg-brand-light/95 text-brand-dark text-[8px] uppercase tracking-widest font-display font-semibold px-2 py-0.5">
                    {product.categoryLabel}
                  </span>
                </div>

                {/* Info and action details */}
                <div className="pt-6 flex-grow flex flex-col justify-between">
                  <div
                    onClick={() => onProductClick(product)}
                    className="cursor-pointer"
                  >
                    <h3 className="text-sm font-display uppercase tracking-widest font-semibold group-hover:opacity-75 transition-opacity">
                      {product.name}
                    </h3>
                    <p className="text-[10px] text-brand-light/50 mt-1 line-clamp-1 italic font-light">
                      {product.tagline}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-brand-light/5 flex items-center justify-between">
                    <span className="text-md md:text-lg  font-semibold">
                      LKR {product.price.toLocaleString()}
                    </span>

                    <button
                      onClick={() => onQuickAdd(product, 'M')}
                      className="text-[10px] uppercase -tracking-tighter font-display font-bold border border-brand-light px-3 py-1.5 hover:bg-brand-light hover:text-brand-dark transition-all duration-300 rounded-md cursor-pointer"
                    >
                      Quick Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
