"use client"
import React, { useState, useMemo } from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon} from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

// Category data with French names, Arabic names, and SVG icons
const CATEGORIES = [
  {
    slug: "Écouteurs Bluetooth",
    fr: "Écouteurs Bluetooth",
    ar: "سماعات بلوتوث",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
  },
  {
    slug: "Casque Audio",
    fr: "Casque Audio",
    ar: "سماعات رأس",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 1a9 9 0 00-9 9v4a3 3 0 003 3h1a1 1 0 001-1v-4a1 1 0 00-1-1H5v-1a7 7 0 1114 0v1h-2a1 1 0 00-1 1v4a1 1 0 001 1h1a3 3 0 003-3v-4a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    slug: "Chargeur",
    fr: "Chargeur",
    ar: "شاحن",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    slug: "Chargeur iPhone",
    fr: "Chargeur iPhone",
    ar: "شاحن آيفون",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    slug: "Câble",
    fr: "Câble",
    ar: "كابل",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    ),
  },
  {
    slug: "Power Bank",
    fr: "Power Bank",
    ar: "باور بانك",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <rect x="2" y="6" width="18" height="12" rx="2" />
        <path d="M22 10v4" strokeLinecap="round" />
        <path d="M7 10v4M10 10v4M13 10v4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    slug: "Montre Connectée",
    fr: "Montre Connectée",
    ar: "ساعة ذكية",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="6" />
        <path d="M12 10v2l1 1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 2h6M9 22h6M9 2l-1 4M15 2l1 4M9 22l-1-4M15 22l1-4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    slug: "Enceinte Bluetooth",
    fr: "Enceinte Bluetooth",
    ar: "مكبر صوت بلوتوث",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <rect x="4" y="2" width="16" height="20" rx="4" />
        <circle cx="12" cy="14" r="4" />
        <circle cx="12" cy="6" r="1.5" />
      </svg>
    ),
  },
  {
    slug: "Accessoires Téléphone",
    fr: "Accessoires Téléphone",
    ar: "إكسسوارات الهاتف",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    slug: "Accessoires Auto",
    fr: "Accessoires Auto",
    ar: "إكسسوارات السيارة",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 6h2l3 5h1a2 2 0 012 2v2a1 1 0 01-1 1h-1M5 15H3a1 1 0 01-1-1v-2a2 2 0 012-2h9V6" />
      </svg>
    ),
  },
  {
    slug: "Caméra",
    fr: "Caméra",
    ar: "كاميرا",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    ),
  },
  {
    slug: "Informatique",
    fr: "Informatique",
    ar: "معلوماتية",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" strokeLinecap="round" />
      </svg>
    ),
  },
];

const BRANDS = ["Hoco", "Anker", "Xiaomi", "Samsung", "Baseus"];

const Navbar = () => {
  const { isSeller, router, user, products, getCartCount } = useAppContext();
  const {openSignIn} = useClerk()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarView, setSidebarView] = useState('main'); // 'main', 'categories', 'brands'
  const [selectedCategory, setSelectedCategory] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      setSidebarView('main');
      setSelectedCategory(null);
    }
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setSidebarView('main');
    setSelectedCategory(null);
  };

  // Get brands available for a specific category from actual products
  const getBrandsForCategory = (categorySlug) => {
    const brandsInCategory = [...new Set(
      products
        .filter(p => p.category === categorySlug && p.brand)
        .map(p => p.brand)
    )];
    // Always show the main brands, mark which ones have products
    return BRANDS.map(b => ({
      name: b,
      hasProducts: brandsInCategory.includes(b),
      count: products.filter(p => p.category === categorySlug && p.brand === b).length
    }));
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setSidebarView('brands');
  };

  const handleBrandClick = (brand) => {
    closeSidebar();
    // Navigate to all-products with category + brand filters
    router.push(`/all-products?category=${encodeURIComponent(selectedCategory.slug)}&brand=${encodeURIComponent(brand)}`);
  };

  const handleCategoryOnly = () => {
    closeSidebar();
    router.push(`/all-products?category=${encodeURIComponent(selectedCategory.slug)}`);
  };

  return (
    <>
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
        {/* Mobile Menu Button */}
        <button onClick={toggleSidebar} className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <Image
          className="cursor-pointer w-28 md:w-32"
          onClick={() => router.push('/')}
          src={assets.logo}
          alt="logo"
        />

        {/* Desktop Navigation */}
        <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
          <Link href="/" className="hover:text-gray-900 transition">Accueil</Link>
          <Link href="/all-products" className="hover:text-gray-900 transition">Boutique</Link>
          <Link href="/promotions" className="hover:text-orange-600 transition flex items-center gap-1 font-medium">
            Promotions
          </Link>
          <Link href="/about-us" className="hover:text-gray-900 transition">Contact</Link>
          {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}
        </div>

        {/* Desktop User Actions */}
        <ul className="hidden md:flex items-center gap-4">
          <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
          {user ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action label="Cart" labelIcon={<CartIcon/>} onClick={()=>router.push('/cart')}/>
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="My Orders" labelIcon={<BagIcon/>} onClick={()=>router.push('/my-orders')}/>
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
              <Image src={assets.user_icon} alt="user icon" />
              Account
            </button>
          )}
        </ul>

        {/* Mobile User Button */}
        <div className="flex items-center md:hidden gap-3">
          {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller</button>}
          {user ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action label="Cart" labelIcon={<CartIcon/>} onClick={()=>router.push('/cart')}/>
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="Home" labelIcon={<HomeIcon/>} onClick={()=>router.push('/')}/>
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="Products" labelIcon={<BoxIcon/>} onClick={()=>router.push('/all-products')}/>
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="My Orders" labelIcon={<BagIcon/>} onClick={()=>router.push('/my-orders')}/>
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
              <Image src={assets.user_icon} alt="user icon" />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity" onClick={closeSidebar} />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          {sidebarView === 'main' ? (
            <Image className="w-28 cursor-pointer" onClick={() => { router.push('/'); closeSidebar(); }} src={assets.logo} alt="logo" />
          ) : (
            <button onClick={() => { 
              if (sidebarView === 'brands') setSidebarView('categories');
              else setSidebarView('main');
            }} className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium text-sm">
                {sidebarView === 'categories' ? 'القائمة الرئيسية' : selectedCategory?.fr}
              </span>
            </button>
          )}
          <button onClick={closeSidebar} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sidebar Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">

          {/* ===== MAIN VIEW ===== */}
          {sidebarView === 'main' && (
            <div className="p-4 space-y-1">
              {/* User greeting */}
              {user && (
                <div className="mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-800">{user.fullName || "User"}</p>
                      <p className="text-xs text-gray-500">{user.primaryEmailAddress?.emailAddress}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Categories Button - Main Entry Point */}
              <button
                onClick={() => setSidebarView('categories')}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-orange-50 border border-orange-200 hover:bg-orange-100 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-orange-700 text-sm">Catégories</p>
                    <p className="text-xs text-orange-600/70">التصنيفات</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-orange-500 group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Navigation Links */}
              <div className="pt-2 space-y-0.5">
                <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition" onClick={closeSidebar}>
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Accueil</span>
                </Link>

                <Link href="/all-products" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition" onClick={closeSidebar}>
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Tous les Produits</span>
                </Link>

                <Link href="/promotions" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 transition" onClick={closeSidebar}>
                  <span className="text-lg w-5 text-center">🔥</span>
                  <span className="text-sm font-semibold text-orange-600">Promotions</span>
                </Link>

                <Link href="/about-us" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition" onClick={closeSidebar}>
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Contact</span>
                </Link>
              </div>

              {/* User-specific links */}
              {user && (
                <div className="pt-2 mt-2 border-t border-gray-100 space-y-0.5">
                  <Link href="/cart" className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 transition" onClick={closeSidebar}>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">Panier</span>
                    </div>
                    {getCartCount() > 0 && (
                      <span className="bg-orange-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">{getCartCount()}</span>
                    )}
                  </Link>

                  <Link href="/my-orders" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition" onClick={closeSidebar}>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Mes Commandes</span>
                  </Link>
                </div>
              )}

              {!user && (
                <div className="pt-2 mt-2 border-t border-gray-100">
                  <button onClick={() => { openSignIn(); closeSidebar(); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span className="text-sm font-medium">Se connecter</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ===== CATEGORIES VIEW ===== */}
          {sidebarView === 'categories' && (
            <div className="p-3">
              <p className="px-3 pt-2 pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Toutes les catégories</p>
              <div className="space-y-0.5">
                {CATEGORIES.map((cat) => {
                  const productCount = products.filter(p => p.category === cat.slug).length;
                  return (
                    <button
                      key={cat.slug}
                      onClick={() => handleCategoryClick(cat)}
                      className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-orange-50 transition group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gray-100 group-hover:bg-orange-100 rounded-lg flex items-center justify-center text-gray-500 group-hover:text-orange-600 transition">
                          {cat.icon}
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition">{cat.fr}</p>
                          <p className="text-xs text-gray-400" dir="rtl">{cat.ar}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {productCount > 0 && (
                          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{productCount}</span>
                        )}
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===== BRANDS VIEW (within a category) ===== */}
          {sidebarView === 'brands' && selectedCategory && (
            <div className="p-3">
              {/* Category header */}
              <div className="px-3 pt-2 pb-4 border-b border-gray-100 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                    {selectedCategory.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{selectedCategory.fr}</p>
                    <p className="text-xs text-gray-500" dir="rtl">{selectedCategory.ar}</p>
                  </div>
                </div>
              </div>

              {/* View All in Category */}
              <button
                onClick={handleCategoryOnly}
                className="w-full flex items-center justify-between px-3 py-3 rounded-lg bg-orange-600 text-white mb-3 hover:bg-orange-700 transition"
              >
                <span className="text-sm font-medium">Voir tout</span>
                <span className="text-sm">عرض الكل</span>
              </button>

              {/* Brand filters */}
              <p className="px-3 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Filtrer par marque</p>
              <div className="space-y-0.5">
                {getBrandsForCategory(selectedCategory.slug).map((brand) => (
                  <button
                    key={brand.name}
                    onClick={() => handleBrandClick(brand.name)}
                    className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-50 transition group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gray-50 group-hover:bg-orange-50 rounded-lg flex items-center justify-center border border-gray-200 group-hover:border-orange-200 transition">
                        <span className="text-xs font-bold text-gray-600 group-hover:text-orange-600 transition">
                          {brand.name.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{brand.name}</span>
                    </div>
                    {brand.count > 0 && (
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{brand.count}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Besoin d'aide ? / محتاج مساعدة؟</p>
            <a href="tel:0550129006" className="text-orange-600 hover:text-orange-700 font-semibold text-sm">0550 12 90 06</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;