'use client'
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";


const AddProduct = () => {
 
   const {getToken} = useAppContext()
   
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Earphone');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [isPromotion, setIsPromotion] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append('name',name)
    formData.append('description',description)
    formData.append('category',category)
    formData.append('price',price)
    formData.append('offerPrice',offerPrice)
    formData.append('isPromotion', isPromotion)
    for (let i = 0; i < files.length; i++) {
      formData.append('image',files[i])
    }
    try {
      const token = await getToken()
      const {data} = await axios.post('/api/product/add',formData,{headers:{Authorization:`Bearer ${token}`}})
      if(data.success){
        toast.success(data.message)
        setFiles([])
        setName("")
        setDescription("")
        setCategory('Earphone')
        setPrice('')
        setOfferPrice('')
        setIsPromotion(false)
      }else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {[...Array(4)].map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input onChange={(e) => {
                  const updatedFiles = [...files];
                  updatedFiles[index] = e.target.files[0];
                  setFiles(updatedFiles);
                }} type="file" id={`image${index}`} hidden />
                <Image
                  key={index}
                  className="max-w-24 cursor-pointer"
                  src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                  alt=""
                  width={100}
                  height={100}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-description">
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></textarea>
        </div>

        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setCategory(e.target.value)}
              defaultValue={category}
            >
              <option value="Earphone">Earphone</option>
              <option value="Chargeur-Iphone">Chargeur-Iphone</option>
              <option value="Headphone">Headphone</option>
              <option value="Watch">Watch</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Camera">Camera</option>
              <option value="Power-Bank">Power-Bank</option>
              <option value="Accessories">Accessories</option>
              <option value="Cable">Cable</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              required
            />
          </div>
        </div>

        {/* Promotion Toggle */}
        <div className="flex flex-col gap-2 max-w-md">
          <label className="text-base font-medium">Promotion</label>
          <div
            onClick={() => setIsPromotion(!isPromotion)}
            className={`flex items-center gap-3 w-fit px-4 py-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              isPromotion
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-300 bg-white hover:border-gray-400'
            }`}
          >
            {/* Toggle switch */}
            <div className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${isPromotion ? 'bg-orange-500' : 'bg-gray-300'}`}>
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${isPromotion ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </div>
            <div>
              <p className={`font-medium text-sm ${isPromotion ? 'text-orange-600' : 'text-gray-600'}`}>
                {isPromotion ? '🔥 En Promotion' : 'Pas en promotion'}
              </p>
              <p className="text-xs text-gray-400">
                {isPromotion ? 'Ce produit apparaîtra sur la page Promotions' : 'Activer pour afficher dans les promotions'}
              </p>
            </div>
          </div>
        </div>

        <button type="submit" className="px-8 py-2.5 bg-orange-600 text-white font-medium rounded">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddProduct;