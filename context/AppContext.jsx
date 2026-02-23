'use client'
import { productsDummyData, userDummyData } from "@/assets/assets";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = (props) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY
    const router = useRouter()
    const {user} = useUser()
    const { getToken } = useAuth()

    const [products, setProducts] = useState([])
    const [userData, setUserData] = useState(false)
    const [isSeller, setIsSeller] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [guestAddress, setGuestAddress] = useState(null)

    const fetchProductData = async () => {
        try {
            const {data} = await axios.get('/api/product/list')
            if(data.success){
                setProducts(data.products)
            }else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            
        }
    }

    const fetchUserData = async () => {
        try {
           if(user.publicMetadata.role === "seller"){
            setIsSeller(true)
        }
         const token = await getToken()
        const {data} = await axios.get('/api/user/data',{headers: {Authorization: `Bearer ${token}`}})
        if(data.success){
            setUserData(data.user)
            setCartItems(data.user.cartItems)
        }else {
            toast.error(data.message)
        }
        } catch (error) {
           toast.error(error.message);
           console.log(error.message)
              
        }
        
    }

    // Load guest cart and address from cookies
    useEffect(() => {
        if (!user) {
            const guestCart = Cookies.get('guestCart');
            const guestAddr = Cookies.get('guestAddress');
            
            if (guestCart) {
                try {
                    setCartItems(JSON.parse(guestCart));
                } catch (e) {
                    console.error('Error parsing guest cart:', e);
                }
            }
            
            if (guestAddr) {
                try {
                    setGuestAddress(JSON.parse(guestAddr));
                } catch (e) {
                    console.error('Error parsing guest address:', e);
                }
            }
        }
    }, [user]);

    const addToCart = async (itemId) => {

        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        }
        else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        
        if(user){
            try {
                const token = await getToken()
                await axios.post('/api/cart/update',{cartData},{headers:{Authorization :`Bearer ${token}`}})
                toast.success("تمت إضافة المنتج إلى السلة بنجاح")

            } catch (error) {
                toast.error(error.message)
            }
        } else {
            // Save to cookie for guest users
            Cookies.set('guestCart', JSON.stringify(cartData), { expires: 7 });
            toast.success("تمت إضافة المنتج إلى السلة بنجاح")
        }
    }

    const updateCartQuantity = async (itemId, quantity) => {

        let cartData = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData)
        
        if(user){
            try {
                const token = await getToken()
                await axios.post('/api/cart/update',{cartData},{headers:{Authorization :`Bearer ${token}`}})
                toast.success("تم تحديث سلة التسوق")

            } catch (error) {
                toast.error(error.message)
            }
        } else {
            // Save to cookie for guest users
            Cookies.set('guestCart', JSON.stringify(cartData), { expires: 7 });
            toast.success("تم تحديث سلة التسوق")
        }

    }

    const saveGuestAddress = (address) => {
        setGuestAddress(address);
        Cookies.set('guestAddress', JSON.stringify(address), { expires: 7 });
    }

    const clearGuestData = () => {
        Cookies.remove('guestCart');
        Cookies.remove('guestAddress');
        setCartItems({});
        setGuestAddress(null);
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                totalCount += cartItems[items];
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
    let totalAmount = 0;

    if (!products.length) return 0;

    for (const itemId in cartItems) {
        const itemInfo = products.find(
            (product) => product._id.toString() === itemId
        );

        if (!itemInfo) continue;

        if (cartItems[itemId] > 0) {
            totalAmount += itemInfo.offerPrice * cartItems[itemId];
        }
    }

    return Math.floor(totalAmount * 100) / 100;
};

    useEffect(() => {
        fetchProductData()
    }, [])

    useEffect(() => {
        if(user){
        fetchUserData()

        }
    }, [user])

    const value = {
        user,getToken,
        currency, router,
        isSeller, setIsSeller,
        userData, fetchUserData,
        products, fetchProductData,
        cartItems, setCartItems,
        addToCart, updateCartQuantity,
        getCartCount, getCartAmount,
        guestAddress, saveGuestAddress,
        clearGuestData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}