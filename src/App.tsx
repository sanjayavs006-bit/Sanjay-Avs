/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { MainCategory, ActivePage, Product, CartItem } from './types';
import { FASHION_PRODUCTS } from './data/fashionProducts';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryTiles } from './components/CategoryTiles';
import { ProductGrid } from './components/ProductGrid';
import { EditorialBanner } from './components/EditorialBanner';
import { EditorialStatement } from './components/EditorialStatement';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { AccountModal } from './components/AccountModal';
import { CheckoutModal } from './components/CheckoutModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ToastContainer, ToastMessage } from './components/Toast';

export default function App() {
  // Navigation & Category Filtering State
  const [activeCategory, setActiveCategory] = useState<MainCategory>('ALL');
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [sortBy, setSortBy] = useState<'recommended' | 'newest' | 'price-asc' | 'price-desc'>('recommended');

  // Interactive Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart State (stored locally with defensive try-catch)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mm_fashion_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read cart from localStorage', e);
    }
    // Default starter item
    return [
      {
        id: 'cart-1',
        product: FASHION_PRODUCTS[0],
        selectedSize: 'M',
        selectedColor: 'Pitch Black',
        quantity: 1,
      },
    ];
  });

  // Wishlist State
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mm_fashion_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read wishlist from localStorage', e);
    }
    return ['prod-1', 'prod-4'];
  });

  // Order count for member tracking
  const [orderCount, setOrderCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('mm_fashion_orders');
      return saved ? parseInt(saved, 10) : 1;
    } catch {
      return 1;
    }
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync Cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mm_fashion_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Could not save cart', e);
    }
  }, [cartItems]);

  // Sync Wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mm_fashion_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.warn('Could not save wishlist', e);
    }
  }, [wishlistIds]);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...FASHION_PRODUCTS];

    if (activeCategory === 'SALE') {
      result = result.filter((p) => p.badge === 'SALE' || !!p.originalPrice);
    } else if (activeCategory === 'NEW ARRIVALS') {
      result = result.filter((p) => p.isNew || p.badge === 'NEW');
    } else if (activeCategory === 'DENIM') {
      result = result.filter((p) => p.category === 'DENIM' || p.subCategory.toLowerCase().includes('jean'));
    } else if (activeCategory !== 'ALL') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [activeCategory, sortBy]);

  // Handlers
  const handleSelectCategory = (cat: MainCategory) => {
    setActiveCategory(cat);
    // Smooth scroll to product grid if clicked from other components
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickAdd = (product: Product, size: string, color: string) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );
      if (existing) {
        return prev.map((item) =>
          item === existing ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `${product.id}-${size}-${color}-${Date.now()}`,
          product,
          selectedSize: size,
          selectedColor: color,
          quantity: 1,
        },
      ];
    });

    addToast({
      type: 'cart',
      title: 'ADDED TO BAG',
      subtitle: `${product.name} (SIZE: ${size})`,
      product,
    });
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        addToast({
          type: 'wishlist',
          title: 'REMOVED FROM SAVED',
          subtitle: product.name,
        });
        return prev.filter((id) => id !== product.id);
      } else {
        addToast({
          type: 'wishlist',
          title: 'SAVED TO WISHLIST',
          subtitle: product.name,
        });
        return [...prev, product.id];
      }
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleMoveToBagFromWishlist = (product: Product) => {
    const defaultSize = product.sizes[0] || 'M';
    const defaultColor = product.colors[0]?.name || 'Standard';
    handleQuickAdd(product, defaultSize, defaultColor);
    setWishlistIds((prev) => prev.filter((id) => id !== product.id));
  };

  const handleOrderComplete = () => {
    const nextCount = orderCount + 1;
    setOrderCount(nextCount);
    try {
      localStorage.setItem('mm_fashion_orders', nextCount.toString());
    } catch {}
    setCartItems([]);
  };

  // Saved Wishlist Products
  const wishlistProducts = useMemo(() => {
    return FASHION_PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  }, [wishlistIds]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#000000] font-sans antialiased flex flex-col selection:bg-[#E30613] selection:text-white">
      {/* 1. Top Announcement Bar & Desktop Navigation */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
      />

      {/* 2. Bold Red Editorial Campaign Hero Section */}
      <Hero onShopNow={handleSelectCategory} />

      {/* 3. Large Editorial Category Tiles (WOMEN / MEN / KIDS / NEW ARRIVALS) */}
      <CategoryTiles onSelectCategory={handleSelectCategory} />

      {/* 4. Product Catalog Grid (Clean 2-Col Mobile, 4-Col Desktop) */}
      <ProductGrid
        products={filteredProducts}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
        onQuickAdd={handleQuickAdd}
        onSelectProduct={setSelectedProduct}
        sortBy={sortBy}
        onChangeSort={setSortBy}
      />

      {/* 5. Dual-Feature Editorial Campaign Banner */}
      <EditorialBanner onSelectCategory={handleSelectCategory} />

      {/* 6. Newsletter / Club Statement Section */}
      <EditorialStatement />

      {/* 7. Minimalist Monochrome Fashion Footer */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* 8. Floating Rounded Black Mobile Navigation Bar */}
      <MobileBottomNav
        activePage={activePage}
        onNavigate={(page, cat) => {
          setActivePage(page);
          if (cat) handleSelectCategory(cat);
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
      />

      {/* Modals & Drawers */}
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

      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleQuickAdd}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveWishlist={handleToggleWishlist}
        onMoveToBag={handleMoveToBagFromWishlist}
        onSelectProduct={setSelectedProduct}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={FASHION_PRODUCTS}
        onSelectProduct={setSelectedProduct}
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
        discountPercent={0}
        onOrderComplete={handleOrderComplete}
      />

      {/* Floating Toasts */}
      <ToastContainer
        toasts={toasts}
        onDismiss={removeToast}
        onOpenCart={() => setIsCartOpen(true)}
      />
    </div>
  );
}
