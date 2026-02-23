"use client"
import React, { useState } from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon} from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { isSeller, router, user } = useAppContext();
  const {openSignIn} = useClerk()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

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
          <Link href="/about-us" className="hover:text-gray-900 transition">Contacte</Link>
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
          {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}
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
      <div className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <Image className="w-28 cursor-pointer" onClick={() => { router.push('/'); closeSidebar(); }} src={assets.logo} alt="logo" />
          <button onClick={closeSidebar} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex flex-col p-6 space-y-2">
          {user && (
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{user.fullName || "User"}</p>
                  <p className="text-sm text-gray-500">{user.primaryEmailAddress?.emailAddress}</p>
                </div>
              </div>
            </div>
          )}

          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition group" onClick={closeSidebar}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="font-medium">Accueil</span>
          </Link>

          <Link href="/all-products" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition group" onClick={closeSidebar}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="font-medium">Boutique</span>
          </Link>

          <Link href="/promotions" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition group" onClick={closeSidebar}>
            <span className="text-lg">🔥</span>
            <span className="font-medium text-orange-600">Promotions</span>
          </Link>

          <Link href="/about-us" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition group" onClick={closeSidebar}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">À Propos</span>
          </Link>

          {user && (
            <>
              <Link href="/cart" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition group" onClick={closeSidebar}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="font-medium">Panier</span>
              </Link>

              <Link href="/my-orders" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition group" onClick={closeSidebar}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="font-medium">Mes Commandes</span>
              </Link>
            </>
          )}

          {!user && (
            <button onClick={() => { openSignIn(); closeSidebar(); }} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition group mt-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span className="font-medium">Se connecter</span>
            </button>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Besoin d'aide ?</p>
            <a href="tel:0550129006" className="text-orange-600 hover:text-orange-700 font-medium text-sm">0550 12 90 06</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;