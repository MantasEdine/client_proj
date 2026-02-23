import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const OrderSummary = () => {

  const { currency, router, getCartCount, getCartAmount, getToken , user , cartItems, setCartItems, guestAddress } = useAppContext()
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);

  const fetchUserAddresses = async () => {
    try {
      const token = await getToken()
      const {data} = await axios.get('/api/user/get-address',{headers:{Authorization : `Bearer ${token}`}})

      if(data.success){
        setUserAddresses(data.addresses)
        if(data.addresses.length > 0){
          setSelectedAddress(data.addresses[0])
        }
      }else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const createOrder = async () => {
    try {
      // For guests - use guestAddress
      if (!user) {
        if (!guestAddress) {
          return toast.error("اختر عنوانًا\n Veuillez ajouter une adresse de livraison");
        }
        
        let cartItemsArray = Object.keys(cartItems).map((key)=>({product:key, quantity:cartItems[key]}))
        cartItemsArray = cartItemsArray.filter(item =>item.quantity > 0)
        
        if(cartItemsArray.length === 0){
          return toast.error("Panier Vide")
        }

        const {data} = await axios.post('/api/order/create-guest',{
          address: guestAddress, 
          items: cartItemsArray
        })
        
        if(data.success){
          toast.success(data.message)
          router.push('/order-placed-guest')
        }else{
          toast.error(data.message)
        }
        return;
      }

      // For logged-in users
      if(!selectedAddress){
        return toast.error("اختر عنوانًا\n Veuillez sélectionner une adresse");
      }
      
      let cartItemsArray = Object.keys(cartItems).map((key)=>({product:key, quantity:cartItems[key]}))
      cartItemsArray = cartItemsArray.filter(item =>item.quantity > 0)
      
      if(cartItemsArray.length ===0){
        return toast.error("Panier Vide")
      }
      
      const token = await getToken()
      const{data} = await axios.post('/api/order/create',{address: selectedAddress._id, items:cartItemsArray},{headers:{Authorization:`Bearer ${token}`}})
      
      if(data.success){
        toast.success(data.message)
        setCartItems({})
        router.push('/order-placed')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(user) {
      fetchUserAddresses();
    } else if (guestAddress) {
      setSelectedAddress(guestAddress);
    }
  }, [user, guestAddress])

  return (
    <div className="w-full md:w-96 bg-gray-500/5 p-5">
      <h2 className="text-xl md:text-2xl font-medium text-gray-700">
        Commande
      </h2>
      <hr className="border-gray-500/30 my-5" />
      <div className="space-y-6">
        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            {user ? "اختر عنوانًا Sélectionner Une Addresse" : "Adresse de Livraison"}
          </label>
          
          {user ? (
            // Logged-in user: dropdown
            <div className="relative inline-block w-full text-sm border">
              <button
                className="peer w-full text-left px-4 pr-2 py-2 bg-white text-gray-700 focus:outline-none"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>
                  {selectedAddress
                    ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                    : "Selection d'Address"}
                </span>
                <svg className={`w-5 h-5 inline float-right transition-transform duration-200 ${isDropdownOpen ? "rotate-0" : "-rotate-90"}`}
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#6B7280"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <ul className="absolute w-full bg-white border shadow-md mt-1 z-10 py-1.5">
                  {userAddresses.map((address, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer"
                      onClick={() => handleAddressSelect(address)}
                    >
                      {address.fullName}, {address.area}, {address.city}, {address.state}
                    </li>
                  ))}
                  <li
                    onClick={() => router.push("/add-address")}
                    className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer text-center"
                  >
                    + Nouvelle Address
                  </li>
                </ul>
              )}
            </div>
          ) : (
            // Guest user: display or add address
            <div>
              {guestAddress ? (
                <div className="border border-gray-300 rounded-lg p-4 bg-white">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">{guestAddress.fullName}</span>
                    <br />
                    {guestAddress.area}
                    <br />
                    {guestAddress.city}, {guestAddress.state}
                    <br />
                    {guestAddress.phoneNumber}
                  </p>
                  <button
                    onClick={() => router.push("/add-address")}
                    className="text-orange-600 hover:text-orange-700 text-sm mt-2"
                  >
                    Modifier l'adresse
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => router.push("/add-address")}
                  className="w-full border-2 border-dashed border-orange-300 rounded-lg p-4 text-orange-600 hover:bg-orange-50 transition"
                >
                  + إضافة عنوان توصيل
                </button>
              )}
            </div>
          )}
        </div>

        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Code Promo
          </label>
          <div className="flex flex-col items-start gap-3">
            <input
              type="text"
              placeholder="Entrer Votre Code Promo"
              className="flex-grow w-full outline-none p-2.5 text-gray-600 border"
            />
            <button className="bg-orange-600 text-white px-9 py-2 hover:bg-orange-700">
              Appliqué
            </button>
          </div>
        </div>

        <hr className="border-gray-500/30 my-5" />

        <div className="space-y-4">
          <div className="flex justify-between text-base font-medium">
            <p className="uppercase text-gray-600">Articles {getCartCount()}</p>
            <p className="text-gray-800">{getCartAmount()}{currency}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Frais de livraison </p>
            <p className="font-medium text-gray-800">-----</p>
          </div>
          <div className="flex justify-between">
          </div>
          <div className="flex justify-between text-lg md:text-xl font-medium border-t pt-3">
            <p>Totale</p>
            <p>{getCartAmount()}{currency}</p>
          </div>
        </div>
      </div>

      <button onClick={createOrder} className="w-full bg-orange-600 text-white py-3 mt-5 hover:bg-orange-700">
        Passer la commande
      </button>
    </div>
  );
};

export default OrderSummary;