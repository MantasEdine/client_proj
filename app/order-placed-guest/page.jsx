'use client'
import { assets } from '@/assets/assets'
import { useAppContext } from '@/context/AppContext'
import Image from 'next/image'
import { useEffect } from 'react'

const OrderPlacedGuest = () => {

  const { router, clearGuestData } = useAppContext()

  useEffect(() => {
    // Clear guest data after successful order
    clearGuestData()
    
    const timer = setTimeout(() => {
      router.push('/')
    }, 8000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='h-screen flex flex-col justify-center items-center gap-6 px-6'>
      <div className="flex justify-center items-center relative">
        <Image className="absolute p-5" src={assets.checkmark} alt='' />
        <div className="animate-spin rounded-full h-24 w-24 border-4 border-t-green-300 border-gray-200"></div>
      </div>
      
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Commande passée avec succès !</h2>
        <p className="text-gray-600 text-sm">Nous avons bien reçu votre commande</p>
      </div>

      {/* Arabic Message to Create Account */}
      <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 max-w-md text-center" dir="rtl">
        <div className="mb-4">
          <svg className="w-12 h-12 text-orange-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-orange-600 mb-3">
          أنشئ حسابًا الآن!
        </h3>
        <p className="text-gray-700 mb-4 leading-relaxed">
          قم بإنشاء حساب لتتبع طلباتك، حفظ عناوينك، والاستمتاع بتجربة تسوق أسرع في المستقبل
        </p>
        <button 
          onClick={() => router.push('/')}
          className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition font-medium"
        >
          إنشاء حساب الآن
        </button>
      </div>

      <p className="text-gray-500 text-sm mt-4">
        Redirection vers la page d'accueil...
      </p>
    </div>
  )
}

export default OrderPlacedGuest