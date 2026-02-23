import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Address from "@/models/Address";
import Order from "@/models/Order";
import GuestOrder from "@/models/GuestOrder";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const {userId} = getAuth(request)
        const isSeller = await authSeller(userId)
        if(!isSeller){
            return NextResponse.json({success : false , message : 'not authorized'})
        }
        
        await connectDB()
        Address.length
        
        // Get regular user orders
        const userOrders = await Order.find({}).populate('address items.product')
        
        // Get guest orders
        const guestOrders = await GuestOrder.find({}).populate('items.product')
        
        // Format guest orders to match user orders structure
        const formattedGuestOrders = guestOrders.map(order => ({
            _id: order._id,
            items: order.items,
            amount: order.amount,
            address: {
                fullName: order.address.fullName,
                phoneNumber: order.address.phoneNumber,
                area: order.address.area,
                city: order.address.city,
                state: order.address.state,
                pincode: order.address.pincode
            },
            status: order.status,
            date: order.date,
            isGuest: true // Flag to identify guest orders
        }))
        
        // Combine and sort by date (newest first)
        const allOrders = [...userOrders, ...formattedGuestOrders]
            .sort((a, b) => b.date - a.date)
        
        return NextResponse.json({success : true , orders: allOrders})
    } catch (error) {
        return NextResponse.json({success : false , message : error.message})
    }
}