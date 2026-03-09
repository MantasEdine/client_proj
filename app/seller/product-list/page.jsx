'use client'
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const ProductList = () => {

  const { router , getToken , user } = useAppContext()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)


   const deleteProduct = async (productId) =>{
    try {
      const {data} = await  axios.delete('/api/product/update',{data : {productId}})
      if (data.success){
        toast.success("Produit Supprimé !")
        setProducts(products.filter(p => p._id !== productId))
      }else {
        toast.error("Erreur , produit pas supprimé !")
      }
    } catch (error) {
      toast.error(error.message)
    }
   }

  const fetchSellerProduct = async () => {
    try {
      const token = await getToken()
      const {data} = await axios.get('/api/product/seller-list',{headers:{Authorization:`Bearer ${token}`}})
      if(data.success){
        setProducts(data.products)
        setLoading(false)
      }else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  useEffect(() => {
    if(user){
    fetchSellerProduct();

    }
  }, [user])

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      {loading ? <Loading /> : <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">Tous les produits</h2>
        <div className="flex flex-col items-center max-w-5xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="w-2/5 px-4 py-3 font-medium truncate">Produit</th>
                <th className="px-4 py-3 font-medium truncate max-sm:hidden">Catégorie</th>
                <th className="px-4 py-3 font-medium truncate max-sm:hidden">Marque</th>
                <th className="px-4 py-3 font-medium truncate">Prix</th>
                <th className="px-4 py-3 font-medium truncate max-sm:hidden">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {products.map((product, index) => (
                <tr key={index} className="border-t border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="bg-gray-500/10 rounded p-2">
                      <Image
                        src={product.image[0]}
                        alt="product Image"
                        className="w-16"
                        width={1280}
                        height={720}
                      />
                    </div>
                    <span className="truncate w-full">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 max-sm:hidden">{product.category}</td>
                  <td className="px-4 py-3 max-sm:hidden">
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">{product.brand || 'Autre'}</span>
                  </td>
                  <td className="px-4 py-3">{product.offerPrice}DA</td>
                  <td className="px-4 py-3 max-sm:hidden">
                    <div className="flex gap-2">
                      <button onClick={() => router.push(`/product/${product._id}`)} className="flex items-center gap-1 px-1.5 md:px-3.5 py-2 bg-orange-600 text-white rounded-md">
                      <span className="hidden md:block">Voir</span>
                      <Image
                        className="h-3.5"
                        src={assets.redirect_icon}
                        alt="redirect_icon"
                      />
                    </button>
                    <button onClick={()=>deleteProduct(product._id)} className="flex items-center gap-1 px-1.5 md:px-3.5 py-2 bg-red-600 text-white rounded-md">
                      <span className="hidden md:block">Supprimer</span>
                    </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>}
      <Footer />
    </div>
  );
};

export default ProductList;