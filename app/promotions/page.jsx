'use client'
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { assets } from "@/assets/assets";

// Promotion-specific product card with badge
const PromotionProductCard = ({ product }) => {
    const { currency, router } = useAppContext()
    const discount = Math.round(((product.price - product.offerPrice) / product.price) * 100)

    return (
        <div
            onClick={() => { router.push('/product/' + product._id); scrollTo(0, 0) }}
            className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer"
        >
            <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center overflow-hidden">
                <Image
                    src={product.image[0]}
                    alt={product.name}
                    className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
                    width={800}
                    height={800}
                />

                {/* Discount badge */}
                {discount > 0 && (
                    <div className="absolute top-2 left-2 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                        -{discount}%
                    </div>
                )}

                {/* Promo ribbon */}
                <div className="absolute top-0 right-0">
                    <div className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 shadow-md"
                        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                    >
                        🔥 PROMO
                    </div>
                </div>

                <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md">
                    <Image
                        className="h-3 w-3"
                        src={assets.heart_icon}
                        alt="heart_icon"
                    />
                </button>
            </div>

            <p className="md:text-base font-medium pt-2 w-full truncate">{product.name}</p>
            <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">{product.description}</p>

            <div className="flex items-center gap-2">
                <p className="text-xs">{4.5}</p>
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Image
                            key={index}
                            className="h-3 w-3"
                            src={index < 4 ? assets.star_icon : assets.star_dull_icon}
                            alt="star_icon"
                        />
                    ))}
                </div>
            </div>

            <div className="flex items-end justify-between w-full mt-1">
                <div>
                    <p className="text-base font-bold text-orange-600">{product.offerPrice}{currency}</p>
                    <p className="text-xs text-gray-400 line-through">{product.price}{currency}</p>
                </div>
                <button className="max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition">
                    Acheter Maintenant
                </button>
            </div>
        </div>
    )
}

const Promotions = () => {
    const { products } = useAppContext();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Only promotion products
    const promotionProducts = useMemo(() => {
        return products.filter(p => p.isPromotion)
    }, [products])

    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(promotionProducts.map(p => p.category))];
        return uniqueCategories;
    }, [promotionProducts]);

    const filteredProducts = useMemo(() => {
        return promotionProducts.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [promotionProducts, searchQuery, selectedCategory]);

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedCategory("all");
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">

                {/* Header */}
                <div className="pt-12 w-full">
                    <div className="flex items-center justify-between mb-1">
                        <div>
                            <h1 className="text-2xl font-medium flex items-center gap-2">
                                🔥 <span>Promotions</span>
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Les meilleures offres du moment — <span className="text-orange-600 font-medium">{promotionProducts.length} produits en promo</span>
                            </p>
                        </div>
                        <div className="w-16 h-0.5 bg-orange-600 rounded-full self-end mb-1"></div>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="w-full mt-8 space-y-4">
                    <div className="relative w-full max-w-2xl">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Image src={assets.search_icon} alt="search" className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Rechercher une promo..."
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

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative">
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${selectedCategory !== "all"
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
                                <svg className={`w-4 h-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isFilterOpen && (
                                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-2">
                                    <button
                                        onClick={() => { setSelectedCategory("all"); setIsFilterOpen(false); }}
                                        className={`w-full text-left px-4 py-2 hover:bg-orange-50 transition ${selectedCategory === "all" ? "bg-orange-50 text-orange-600 font-medium" : "text-gray-700"}`}
                                    >
                                        Toutes les promos
                                    </button>
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => { setSelectedCategory(category); setIsFilterOpen(false); }}
                                            className={`w-full text-left px-4 py-2 hover:bg-orange-50 transition ${selectedCategory === category ? "bg-orange-50 text-orange-600 font-medium" : "text-gray-700"}`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {(selectedCategory !== "all" || searchQuery) && (
                            <div className="flex items-center gap-2 flex-wrap">
                                {selectedCategory !== "all" && (
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm">
                                        <span>{selectedCategory}</span>
                                        <button onClick={() => setSelectedCategory("all")}>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                                <button onClick={clearFilters} className="text-sm text-orange-600 hover:text-orange-700 font-medium underline">
                                    Effacer tout
                                </button>
                            </div>
                        )}

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
                                <PromotionProductCard key={index} product={product} />
                            ))}
                        </div>
                    ) : promotionProducts.length === 0 ? (
                        // No promotions at all
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="text-6xl mb-4">🏷️</div>
                            <h3 className="text-xl font-medium text-gray-800 mb-2">Aucune promotion pour le moment</h3>
                            <p className="text-gray-600">Revenez bientôt pour découvrir nos offres !</p>
                        </div>
                    ) : (
                        // Filtered but no results
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium text-gray-800 mb-2">Aucun produit trouvé</h3>
                            <p className="text-gray-600 mb-6">Essayez de modifier vos filtres</p>
                            <button onClick={clearFilters} className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
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

export default Promotions;