import connectDB from "@/config/db";
import Product from "@/models/Product";
import GuestOrder from "@/models/GuestOrder";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const {address , items} = await request.json()
        
        if(!address || items.length === 0){
            return NextResponse.json({success : false , message : 'Invalid data'})
        }
        
        await connectDB()
        
        const amount = await items.reduce(async (acc,item) =>{
            const product = await Product.findById(item.product)
            return await acc + product.offerPrice * item.quantity
        },0)
        
        const newOrder = await GuestOrder.create({
            address,
            items,
            amount,
            date: Date.now()
        })
        
        return NextResponse.json({success : true , message : 'Commande passée avec succès', order: newOrder})

    } catch (error) {
        console.log(error)
        return NextResponse.json({success : false , message : error.message})
    }
}