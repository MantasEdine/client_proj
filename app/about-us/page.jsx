'use client'
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

const AboutUs = () => {
    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 py-16">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        À Propos de <span className="text-orange-600">N-Finity</span>
                    </h1>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4" dir="rtl">
                        عن <span className="text-orange-600">N-Finity</span>
                    </h2>
                    <div className="w-32 h-1 bg-orange-600 mx-auto mb-6"></div>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-2">
                        Votre destination de confiance pour les produits électroniques de haute qualité
                    </p>
                    <p className="text-base text-gray-600 max-w-3xl mx-auto" dir="rtl">
                        وجهتك الموثوقة لمنتجات الإلكترونيات عالية الجودة
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid md:grid-cols-2 gap-12 mb-16">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-semibold text-gray-800">Qui Sommes-Nous ?</h2>
                        <h3 className="text-2xl font-semibold text-gray-700" dir="rtl">من نحن؟</h3>
                        
                        <p className="text-gray-600 leading-relaxed">
                            N-Finity est votre boutique en ligne de référence pour tous vos besoins en électronique et accessoires high-tech. Nous sommes spécialisés dans la vente au <span className="font-semibold text-orange-600">détail</span>, offrant une large gamme de produits de marques mondiales reconnues.
                        </p>
                        
                        <p className="text-gray-600 leading-relaxed" dir="rtl">
                            N-Finity هو متجرك الإلكتروني المرجعي لجميع احتياجاتك من الإلكترونيات والإكسسوارات التقنية. نحن متخصصون في البيع <span className="font-semibold text-orange-600">بالتجزئة</span>، ونقدم مجموعة واسعة من المنتجات من علامات تجارية عالمية معترف بها.
                        </p>
                        
                        <p className="text-gray-600 leading-relaxed">
                            Situés à <span className="font-semibold">Belfort, Harrach, Alger</span>, nous nous engageons à fournir des produits authentiques de qualité supérieure avec un service client exceptionnel. Notre sélection comprend des marques de renom comme <span className="font-semibold text-orange-600">HOCO, Anker</span>, et bien d'autres marques mondiales.
                        </p>
                        
                        <p className="text-gray-600 leading-relaxed" dir="rtl">
                            نقع في <span className="font-semibold">بلفور، حراش، الجزائر</span>، ونلتزم بتوفير منتجات أصلية ذات جودة عالية مع خدمة عملاء استثنائية. يشمل اختيارنا علامات تجارية مشهورة مثل <span className="font-semibold text-orange-600">HOCO و Anker</span> والعديد من العلامات التجارية العالمية الأخرى.
                        </p>
                        
                        <p className="text-gray-600 leading-relaxed">
                            Que vous recherchiez des écouteurs, des casques audio, des power banks, des accessoires pour smartphone, des montres connectées, des caméras, ou tout autre produit électronique, N-Finity est là pour vous offrir les meilleures options aux meilleurs prix.
                        </p>
                        
                        <p className="text-gray-600 leading-relaxed" dir="rtl">
                            سواء كنت تبحث عن سماعات أذن، سماعات رأس، بطاريات محمولة، إكسسوارات للهاتف الذكي، ساعات ذكية، كاميرات، أو أي منتج إلكتروني آخر، N-Finity هنا لتقديم أفضل الخيارات بأفضل الأسعار.
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 flex items-center justify-center">
                        <div className="text-center">
                            <div className="mb-6">
                                <div className="w-24 h-24 bg-orange-600 rounded-full mx-auto flex items-center justify-center mb-4">
                                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">Qualité Garantie</h3>
                                <p className="text-lg font-bold text-gray-800 mb-2" dir="rtl">جودة مضمونة</p>
                                <p className="text-gray-600">Produits authentiques de marques mondiales</p>
                                <p className="text-gray-600 text-sm" dir="rtl">منتجات أصلية من علامات تجارية عالمية</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="bg-white rounded-lg p-4">
                                    <p className="text-3xl font-bold text-orange-600">100+</p>
                                    <p className="text-sm text-gray-600">Produits / منتج</p>
                                </div>
                                <div className="bg-white rounded-lg p-4">
                                    <p className="text-3xl font-bold text-orange-600">24/7</p>
                                    <p className="text-sm text-gray-600">Support / دعم</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-16">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-2 text-center">Contactez-Nous</h2>
                    <h3 className="text-2xl font-semibold text-gray-700 mb-8 text-center" dir="rtl">اتصل بنا</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Facebook */}
                        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1">Facebook</h3>
                            <p className="text-xs text-gray-600 mb-2" dir="rtl">فيسبوك</p>
                            <a href="https://www.facebook.com/profile.php?id=61585542284025" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 break-all text-sm">
                                N-Finity على فيسبوك
                            </a>
                        </div>

                        {/* Email */}
                        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
                            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                            <p className="text-xs text-gray-600 mb-2" dir="rtl">البريد الإلكتروني</p>
                            <a href="mailto:youcef@n-finity.shop" className="text-orange-600 hover:text-orange-700 break-all text-sm">
                                youcef@n-finity.shop
                            </a>
                        </div>

                        {/* Phone & WhatsApp */}
                        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1">Téléphone / WhatsApp</h3>
                            <p className="text-xs text-gray-600 mb-2" dir="rtl">هاتف / واتساب</p>
                            <a href="tel:0550129006" className="text-orange-600 hover:text-orange-700 text-sm block">
                                0550 12 90 06
                            </a>
                            <a href="https://wa.me/213550129006" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 text-xs mt-1 inline-block">
                                Ouvrir WhatsApp / فتح واتساب
                            </a>
                        </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Suivez-nous / تابعونا</h3>
                        <div className="flex items-center justify-center gap-6">
                            {/* Facebook */}
                            <a href="https://www.facebook.com/profile.php?id=61585542284025" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition hover:scale-110">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                            {/* Instagram */}
                            <a href="https://www.instagram.com/nfinity16" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-full flex items-center justify-center hover:opacity-90 transition hover:scale-110">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                </svg>
                            </a>
                            {/* TikTok */}
                            <a href="https://www.tiktok.com/@nfinity16" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition hover:scale-110">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.28 8.28 0 005.58 2.17v-3.44a4.85 4.85 0 01-1.58-.27 4.82 4.82 0 01-1.42-.77V6.69h3z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Brands Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-2 text-center">Nos Marques</h2>
                    <h3 className="text-2xl font-semibold text-gray-700 mb-8 text-center" dir="rtl">علاماتنا التجارية</h3>
                    <div className="bg-white rounded-2xl p-8 shadow-sm">
                        <div className="flex flex-wrap justify-center items-center gap-8">
                            <div className="text-center">
                                <div className="bg-gray-50 rounded-lg p-6 mb-2 hover:shadow-md transition">
                                    <p className="text-2xl font-bold text-gray-800">HOCO</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="bg-gray-50 rounded-lg p-6 mb-2 hover:shadow-md transition">
                                    <p className="text-2xl font-bold text-gray-800">Anker</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="bg-gray-50 rounded-lg p-6 mb-2">
                                    <p className="text-lg text-gray-600">+ Autres marques mondiales</p>
                                    <p className="text-sm text-gray-600" dir="rtl">+ علامات تجارية عالمية أخرى</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AboutUs;