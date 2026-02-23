'use client';
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const Orders = () => {

    const { currency, getToken, user } = useAppContext();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // 'all', 'user', 'guest'

    const fetchSellerOrders = async () => {
        try {
            const token = await getToken()
            const {data} = await axios.get('/api/order/seller-orders',{headers:{Authorization:`Bearer ${token}`}})
            if(data.success){
                setOrders(data.orders)
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
            fetchSellerOrders();
        }
    }, [user]);

    // Filter orders based on selection
    const filteredOrders = orders.filter(order => {
        if (filter === 'all') return true;
        if (filter === 'guest') return order.isGuest;
        if (filter === 'user') return !order.isGuest;
        return true;
    });

    const guestOrdersCount = orders.filter(o => o.isGuest).length;
    const userOrdersCount = orders.filter(o => !o.isGuest).length;

    return (
        <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
            {loading ? <Loading /> : <div className="md:p-10 p-4 space-y-5">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium">Commandes</h2>
                    
                    {/* Filter Tabs */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                filter === 'all' 
                                    ? 'bg-orange-600 text-white' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Toutes ({orders.length})
                        </button>
                        <button
                            onClick={() => setFilter('user')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                filter === 'user' 
                                    ? 'bg-orange-600 text-white' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Utilisateurs ({userOrdersCount})
                        </button>
                        <button
                            onClick={() => setFilter('guest')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                filter === 'guest' 
                                    ? 'bg-orange-600 text-white' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Invités ({guestOrdersCount})
                        </button>
                    </div>
                </div>

                <div className="max-w-4xl rounded-md">
                    {filteredOrders.map((order, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-5 justify-between p-5 border-t border-gray-300 relative">
                            {/* Guest Badge */}
                            {order.isGuest && (
                                <div className="absolute top-3 right-3">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                        Invité
                                    </span>
                                </div>
                            )}
                            
                            <div className="flex-1 flex gap-5 max-w-80">
                                <Image
                                    className="max-w-16 max-h-16 object-cover"
                                    src={assets.box_icon}
                                    alt="box_icon"
                                />
                                <p className="flex flex-col gap-3">
                                    <span className="font-medium">
                                        {order.items.map((item) => item.product.name + ` x ${item.quantity}`).join(", ")}
                                    </span>
                                    <span>Articles : {order.items.length}</span>
                                </p>
                            </div>
                            <div>
                                <p>
                                    <span className="font-medium">{order.address.fullName}</span>
                                    <br />
                                    <span>{order.address.area}</span>
                                    <br />
                                    <span>{`${order.address.city}, ${order.address.state}`}</span>
                                    <br />
                                    <span>{order.address.phoneNumber}</span>
                                </p>
                            </div>
                            <p className="font-medium my-auto">{order.amount}{currency}</p>
                            <div>
                                <p className="flex flex-col">
                                    <span>Methode : COD</span>
                                    <span>Date : {new Date(order.date).toLocaleDateString()}</span>
                                    <span>Payment : Pending</span>
                                </p>
                            </div>
                        </div>
                    ))}
                    
                    {filteredOrders.length === 0 && (
                        <div className="text-center py-20 text-gray-500">
                            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <p>Aucune commande {filter === 'guest' ? "d'invité" : filter === 'user' ? "d'utilisateur" : ""}</p>
                        </div>
                    )}
                </div>
            </div>}
            <Footer />
        </div>
    );
};

export default Orders;