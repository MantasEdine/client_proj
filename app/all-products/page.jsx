'use client'
import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { assets } from "@/assets/assets";

const AllProducts = () => {
    const { products } = useAppContext();
    
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Get unique categories from products
    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(products.map(product => product.category))];
        return uniqueCategories;
    }, [products]);

    // Filter products based on search and category
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                product.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
            
            return matchesSearch && matchesCategory;
        });
    }, [products, searchQuery, selectedCategory]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setIsFilterOpen(false);
    };

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedCategory("all");
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
                {/* Header Section */}
                <div className="flex flex-col items-end pt-12 w-full">
                    <p className="text-2xl font-medium">Tous les produits</p>
                    <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
                </div>

                {/* Search and Filter Section */}
                <div className="w-full mt-8 space-y-4">
                    {/* Search Bar */}
                    <div className="relative w-full max-w-2xl">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Image 
                                src={assets.search_icon} 
                                alt="search" 
                                className="w-5 h-5 text-gray-400"
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Rechercher un produit..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition text-gray-700 placeholder:text-gray-400"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Filter Bar */}
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Category Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                                    selectedCategory !== "all" 
                                        ? "bg-orange-600 text-white border-orange-600" 
                                        : "bg-white text-gray-700 border-gray-300 hover:border-orange-500"
                                }`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                                <span className="font-medium">
                                    {selectedCategory === "all" ? "Catégorie" : selectedCategory}
                                </span>
                                <svg 
                                    className={`w-4 h-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {isFilterOpen && (
                                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-2">
                                    <button
                                        onClick={() => handleCategoryChange("all")}
                                        className={`w-full text-left px-4 py-2 hover:bg-orange-50 transition ${
                                            selectedCategory === "all" ? "bg-orange-50 text-orange-600 font-medium" : "text-gray-700"
                                        }`}
                                    >
                                        Tous les produits
                                    </button>
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => handleCategoryChange(category)}
                                            className={`w-full text-left px-4 py-2 hover:bg-orange-50 transition ${
                                                selectedCategory === category ? "bg-orange-50 text-orange-600 font-medium" : "text-gray-700"
                                            }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Active Filters Display */}
                        {(selectedCategory !== "all" || searchQuery) && (
                            <div className="flex items-center gap-2 flex-wrap">
                                {selectedCategory !== "all" && (
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm">
                                        <span>{selectedCategory}</span>
                                        <button
                                            onClick={() => setSelectedCategory("all")}
                                            className="hover:text-orange-900"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                                {searchQuery && (
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm">
                                        <span>Recherche: "{searchQuery}"</span>
                                        <button
                                            onClick={() => setSearchQuery("")}
                                            className="hover:text-orange-900"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-orange-600 hover:text-orange-700 font-medium underline"
                                >
                                    Effacer tout
                                </button>
                            </div>
                        )}

                        {/* Results Count */}
                        <div className="ml-auto text-sm text-gray-600">
                            {filteredProducts.length} {filteredProducts.length === 1 ? "produit" : "produits"}
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="w-full mt-8">
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-14">
                            {filteredProducts.map((product, index) => (
                                <ProductCard key={index} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium text-gray-800 mb-2">Aucun produit trouvé</h3>
                            <p className="text-gray-600 mb-6">
                                Essayez de modifier vos filtres ou votre recherche
                            </p>
                            <button
                                onClick={clearFilters}
                                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
                            >
                                Réinitialiser les filtres
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AllProducts;