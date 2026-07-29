"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '@/types/product';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  color?: string;
  selectedSize?: string;
  selectedColor?: string;
  quantity: number;
  image: string;
  images?: string[];
  stock?: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, size?: string, color?: string, quantity?: number) => void;
  updateQuantity: (id: string, size: string, color: string | undefined, quantity: number) => void;
  removeItem: (id: string, size: string, color?: string) => void;
  clearCart: () => void;
  totalCartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    try {
      const savedCart = localStorage.getItem('axivers_cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (e) {
      console.warn('Failed to load cart from localStorage:', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('axivers_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Failed to save cart to localStorage:', e);
    }
  }, [cartItems]);

  const addToCart = (product: Product, size = 'M', color = '', quantityToAdd = 1) => {
    const availableStock = product.stock !== undefined ? product.stock : 99;
    if (availableStock <= 0) {
      alert(`Sorry, "${product.name}" is currently sold out.`);
      return;
    }

    const selectedSize = size || (product.sizes?.[0] || 'M');
    const selectedColor = color || (product.colors?.[0] || 'Black');

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id && (item.size === selectedSize || item.selectedSize === selectedSize) && (item.color === selectedColor || item.selectedColor === selectedColor)
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        const currentQty = newItems[existingItemIndex].quantity;
        const newQty = Math.min(currentQty + quantityToAdd, availableStock);
        newItems[existingItemIndex].quantity = newQty;
        return newItems;
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            size: selectedSize,
            color: selectedColor,
            selectedSize: selectedSize,
            selectedColor: selectedColor,
            quantity: Math.min(quantityToAdd, availableStock),
            image: product.images?.[0] || '/images/pdp_front.jpg',
            images: product.images || ['/images/pdp_front.jpg'],
            stock: availableStock,
          },
        ];
      }
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, size: string, color: string | undefined, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        const itemSize = item.selectedSize || item.size;
        const itemColor = item.selectedColor || item.color || '';
        if (item.id === id && itemSize === size && itemColor === (color || '')) {
          const maxAllowed = item.stock !== undefined ? item.stock : 99;
          const targetQty = Math.min(quantity, maxAllowed);
          return { ...item, quantity: targetQty };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string, size: string, color?: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => {
        const itemSize = item.selectedSize || item.size;
        const itemColor = item.selectedColor || item.color || '';
        return !(item.id === id && itemSize === size && itemColor === (color || ''));
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem('axivers_cart');
    } catch {}
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        totalCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

