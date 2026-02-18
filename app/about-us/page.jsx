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
                            N-Finity est votre boutique en ligne de référence pour tous vos besoins en électronique et accessoires high-tech. Nous sommes spécialisés dans la vente en <span className="font-semibold text-orange-600">gros et détail</span>, offrant une large gamme de produits de marques mondiales reconnues.
                        </p>
                        
                        <p className="text-gray-600 leading-relaxed" dir="rtl">
                            N-Finity هو متجرك الإلكتروني المرجعي لجميع احتياجاتك من الإلكترونيات والإكسسوارات التقنية. نحن متخصصون في البيع <span className="font-semibold text-orange-600">بالجملة والتجزئة</span>، ونقدم مجموعة واسعة من المنتجات من علامات تجارية عالمية معترف بها.
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
                        {/* Telegram */}
                        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-1.953 9.205-2.762 12.208-.343 1.272-.682 1.7-1.12 1.742-.952.087-1.675-.63-2.598-1.234-1.445-.943-2.262-1.531-3.664-2.451-1.62-1.064-.57-1.649.354-2.605.242-.25 4.442-4.073 4.527-4.418.011-.043.02-.203-.076-.288-.095-.085-.236-.056-.337-.033-.143.032-2.423 1.54-6.838 4.521-.647.446-1.233.663-1.758.65-.58-.015-1.695-.328-2.524-.597-.808-.27-1.45-.412-1.394-.87.03-.238.346-.482.95-.733 3.72-1.623 6.2-2.695 7.44-3.215 3.542-1.475 4.279-1.732 4.757-1.74.106-.002.342.024.496.148.13.105.165.246.182.345.017.099.038.325.021.502z"/>
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1">Boutique Telegram</h3>
                            <p className="text-xs text-gray-600 mb-2" dir="rtl">متجر تيليجرام</p>
                            <a href="https://t.me/mybrandbelfort" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 break-all text-sm">
                                @mybrandbelfort
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
                            <a href="mailto:haouasseyacine@gmail.com" className="text-orange-600 hover:text-orange-700 break-all text-sm">
                                haouasseyacine@gmail.com
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

                {/* Dev Team Section */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-semibold mb-2">Équipe de Développement</h2>
                        <h3 className="text-2xl font-semibold mb-4" dir="rtl">فريق التطوير</h3>
                        <p className="text-gray-300 mb-1">En cas de bug technique, contactez notre équipe de développement</p>
                        <p className="text-gray-300 text-sm" dir="rtl">في حالة وجود خلل تقني، اتصل بفريق التطوير لدينا</p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                {/* Dev Team Logo */}
                                <div className="flex-shrink-0">
                                    <div className="w-32 h-32 bg-white rounded-lg overflow-hidden flex items-center justify-center">
                                        <Image 
                                            src="/r_y.jpg" 
                                            alt="R&Y Dev Team" 
                                            width={128} 
                                            height={128}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Dev Team Info */}
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-2xl font-bold mb-2">R&Y Dev Team</h3>
                                    <p className="text-gray-300 mb-1">Équipe de développement professionnelle</p>
                                    <p className="text-gray-300 text-sm mb-6" dir="rtl">فريق تطوير محترف</p>

                                    <div className="space-y-4">
                                        {/* Lead Dev */}
                                        <div className="bg-white/5 rounded-lg p-4">
                                            <p className="font-semibold text-orange-400 mb-1">Lead Developer: Youcef Rabia</p>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
                                                    <svg className="w-4 h-4 text-orange-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    <a href="mailto:rabiayoucef77@gmail.com" className="text-gray-300 hover:text-orange-400 break-all">
                                                        rabiayoucef77@gmail.com
                                                    </a>
                                                </div>
                                                <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
                                                    <svg className="w-4 h-4 text-orange-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    <a href="tel:0549982823" className="text-gray-300 hover:text-orange-400">
                                                        0549 98 28 23
                                                    </a>
                                                </div>
                                                <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
                                                    <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                                    </svg>
                                                    <a href="https://wa.me/213549982823" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-green-400">
                                                        WhatsApp: 0549 98 28 23
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-4">
                                            <p className="text-sm text-orange-200 mb-1">
                                                <span className="font-semibold">Note:</span> Pour tout problème technique, bug ou assistance avec le site web, veuillez contacter directement l'équipe de développement R&Y.
                                            </p>
                                            <p className="text-xs text-orange-200" dir="rtl">
                                                <span className="font-semibold">ملاحظة:</span> لأي مشكلة تقنية أو خلل أو مساعدة بخصوص الموقع، يرجى الاتصال مباشرة بفريق التطوير R&Y.
                                            </p>
                                        </div>
                                    </div>
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