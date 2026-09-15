/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { MoodCategory, Product, CartItem } from './types';
import { MOODY_PRODUCTS } from './data/moodyProducts';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MoodGrid } from './components/MoodGrid';
import { PackagingStory } from './components/PackagingStory';
import { ModelCampaignSection } from './components/ModelCampaignSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { AccountModal } from './components/AccountModal';
import { CheckoutModal } from './components/CheckoutModal';
import { MoodQuizModal } from './components/MoodQuizModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ToastContainer, ToastMessage } from './components/Toast';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  // Category Filtering State
  const [activeCategory, setActiveCategory] = useState<MoodCategory>('ALL');

  // Interactive Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMoodQuizOpen, setIsMoodQuizOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart State (stored locally)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('moody_match_cart_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read cart from localStorage', e);
    }
    // Default initial starter item for instant joy: #01 HEART
    return [
      {
        id: 'cart-init-01',
        product: MOODY_PRODUCTS[0],
        quantity: 1,
      },
    ];
  });

  // Wishlist State
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('moody_match_wishlist_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read wishlist from localStorage', e);
    }
    return ['mood-01', 'mood-02'];
  });

  // Order count for member tracking
  const [orderCount, setOrderCount] = useState(1);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('moody_match_cart_v2', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Could not save cart', e);
    }
  }, [cartItems]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('moody_match_wishlist_v2', JSON.stringify(wishlistIds));
    } catch (e) {
      console.warn('Could not save wishlist', e);
    }
  }, [wishlistIds]);

  const addToast = (type: 'cart' | 'wishlist' | 'info' | 'success', title: string, subtitle?: string, product?: Product) => {
    const id = Date.now().toString();
    const newToast: ToastMessage = { id, type, title, subtitle, product };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${product.id}`,
          product,
          quantity,
        },
      ];
    });

    addToast(
      'cart',
      `ADDED TO BAG`,
      `${product.number} ${product.name} (${quantity}) ♡`,
      product
    );
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    const exists = wishlistIds.includes(product.id);
    if (exists) {
      setWishlistIds((prev) => prev.filter((id) => id !== product.id));
      addToast('info', 'REMOVED FROM SAVED', `${product.name} was removed from your wishlist.`);
    } else {
      setWishlistIds((prev) => [...prev, product.id]);
      addToast('wishlist', 'SAVED TO WISHLIST ♡', `${product.number} ${product.name} — ${product.personality}`, product);
    }
  };

  const wishlistProducts = useMemo(() => {
    return MOODY_PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  }, [wishlistIds]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Smooth scroll anchors
  const scrollTo12Moods = () => {
    const el = document.getElementById('the-12-moods');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const el = document.getElementById('about-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#FFF8F2] text-[#111111] flex flex-col antialiased selection:bg-[#7B2638] selection:text-white font-sans">
        {/* Toast Notification Container */}
        <ToastContainer
          toasts={toasts}
          onDismiss={removeToast}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* 1. Minimal Editorial Header */}
        <Header
          activeCategory={activeCategory}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            scrollTo12Moods();
          }}
          cartCount={totalCartCount}
          wishlistCount={wishlistIds.length}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenAccount={() => setIsAccountOpen(true)}
          onOpenMoodQuiz={() => setIsMoodQuizOpen(true)}
          onScrollTo12Moods={scrollTo12Moods}
          onScrollToAbout={scrollToAbout}
        />

        <main className="flex-1 w-full flex flex-col">
          {/* 2. Hero Section: Editorial image-first beauty campaign */}
          <Hero
            onShopAll={scrollTo12Moods}
            onOpenMoodQuiz={() => setIsMoodQuizOpen(true)}
            onSelectProduct={(product) => setSelectedProduct(product)}
          />

          {/* 3. The 12 Moods Signature Collection */}
          <MoodGrid
            products={MOODY_PRODUCTS}
            selectedCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            onSelectProduct={(product) => setSelectedProduct(product)}
            onAddToCart={(product) => handleAddToCart(product, 1)}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={(id) => wishlistIds.includes(id)}
          />

          {/* 4. The Packaging Story (Multi-angle architectural presentation) */}
          <PackagingStory />

          {/* 5. Model & Beauty Campaign Direction (40% Model / 40% Product / 20% Macro Lip) */}
          <ModelCampaignSection
            products={MOODY_PRODUCTS}
            onSelectProduct={(product) => setSelectedProduct(product)}
          />
        </main>

        {/* 6. Footer */}
        <Footer
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            scrollTo12Moods();
          }}
          onOpenMoodQuiz={() => setIsMoodQuizOpen(true)}
        />

        {/* 7. Floating Mobile Bottom Navigation */}
        <MobileBottomNav
          cartCount={totalCartCount}
          wishlistCount={wishlistIds.length}
          onHomeClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onSearchClick={() => setIsSearchOpen(true)}
          onWishlistClick={() => setIsWishlistOpen(true)}
          onAccountClick={() => setIsAccountOpen(true)}
          onCartClick={() => setIsCartOpen(true)}
        />

        {/* Interactive Modals & Drawers */}
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        />

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveFromCart}
          onCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
        />

        <WishlistDrawer
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          wishlistProducts={wishlistProducts}
          onRemoveWishlist={handleToggleWishlist}
          onMoveToBag={(product) => {
            handleAddToCart(product, 1);
            setIsCartOpen(true);
          }}
          onSelectProduct={(product) => setSelectedProduct(product)}
        />

        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          products={MOODY_PRODUCTS}
          onSelectProduct={(product) => setSelectedProduct(product)}
        />

        <AccountModal
          isOpen={isAccountOpen}
          onClose={() => setIsAccountOpen(false)}
          orderCount={orderCount}
          wishlistCount={wishlistIds.length}
          onViewWishlist={() => {
            setIsAccountOpen(false);
            setIsWishlistOpen(true);
          }}
        />

        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          items={cartItems}
          onCompleteOrder={() => {
            setCartItems([]);
            setOrderCount((c) => c + 1);
          }}
        />

        <MoodQuizModal
          isOpen={isMoodQuizOpen}
          onClose={() => setIsMoodQuizOpen(false)}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToCart={(product) => handleAddToCart(product, 1)}
        />
      </div>
    </ErrorBoundary>
  );
}
