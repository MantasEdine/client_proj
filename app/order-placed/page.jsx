'use client'
import { assets } from '@/assets/assets'
import { useAppContext } from '@/context/AppContext'
import Image from 'next/image'
import { useEffect } from 'react'

const OrderPlaced = () => {

  const { router } = useAppContext()

  useEffect(() => {
    // Force a hard navigation to ensure data refresh
    const timer = setTimeout(() => {
      // Use window.location for a full page reload to ensure fresh data
      window.location.href = '/my-orders'
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='h-screen flex flex-col justify-center items-center gap-5'>
      <div className="flex justify-center items-center relative">
        <Image className="absolute p-5" src={assets.checkmark} alt='' />
        <div className="animate-spin rounded-full h-24 w-24 border-4 border-t-green-300 border-gray-200"></div>
      </div>
      <div className="text-center text-2xl font-semibold">Commande passée avec succès</div>
      <p className="text-gray-600 text-sm">Redirection vers vos commandes...</p>
    </div>
  )
}

export default OrderPlaced