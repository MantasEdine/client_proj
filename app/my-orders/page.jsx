'use client';
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const MyOrders = () => {

    const { currency, getToken , user , router } = useAppContext();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const token = await getToken()
            const {data} = await axios.get('/api/order/list',{
                headers:{Authorization:`Bearer ${token}`}
            })
            if(data.success){
                setOrders(data.orders.reverse())
            }else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user){
            fetchOrders(); 
        }
    }, [user]);

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
                <div className="space-y-5">
                    <div className="flex items-center justify-between mt-6">
                        <h2 className="text-lg font-medium">Mes Commandes</h2>
                        <button 
                            onClick={fetchOrders}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition disabled:opacity-50"
                        >
                            <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Actualiser
                        </button>
                    </div>
                    {loading ? <Loading /> : orders.length > 0 ? (<div className="max-w-5xl border-t border-gray-300 text-sm">
                        {orders.map((order, index) => (
                            <div key={index} className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-gray-300">
                                <div className="flex-1 flex gap-5 max-w-80">
                                    <Image
                                        className="max-w-16 max-h-16 object-cover"
                                        src={assets.box_icon}
                                        alt="box_icon"
                                    />
                                    <p className="flex flex-col gap-3">
                                        <span className="font-medium text-base">
                                            {order.items.map((item) => item.product.name + ` x ${item.quantity}`).join(", ")}
                                        </span>
                                        <span>Articles : {order.items.length}</span>
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <span className="font-medium">{order.address.fullName}</span>
                                        <br />
                                        <span >{order.address.area}</span>
                                        <br />
                                        <span>{`${order.address.city}, ${order.address.state}`}</span>
                                        <br />
                                        <span>{order.address.phoneNumber}</span>
                                    </p>
                                </div>
                                <p className="font-medium my-auto">{order.amount}{currency}</p>
                                <div>
                                    <p className="flex flex-col">
                                        <span>Méthode : COD</span>
                                        <span>Date : {new Date(order.date).toLocaleDateString()}</span>
                                        <span>Paiement : En attente</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium text-gray-800 mb-2">Aucune commande</h3>
                            <p className="text-gray-600 mb-6">
                                Vous n'avez pas encore passé de commande
                            </p>
                            <button
                                onClick={() => router.push('/all-products')}
                                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
                            >
                                Commencer vos achats
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyOrders;