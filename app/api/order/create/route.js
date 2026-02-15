import connectDB from "@/config/db";
import Product from "@/models/Product";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { Inngest } from "inngest";
import { NextResponse } from "next/server";


export const inngest = new Inngest({ id: "N-Finity" });

export async function POST(request) {
    try {
        const {userId} = getAuth(request)
        const {address , items} = await request.json()
        if(!address || items.length === 0){
            return NextResponse.json({success : false , message : 'Invalid data'})
        }
        await connectDB()
        const amount = await items.reduce(async (acc,item) =>{
            const product = await Product.findById(item.product)
            return await acc + product.offerPrice * item.quantity
        },0)
        if(!userId){
            return NextResponse.json({success : false , message : "no userId"})
        }
        await inngest.send({
            name: 'order/created',
            data:{
                userId,
                address,
                items,
                amount,
                date: Date.now()
            }
        })
        const user = await User.findById(userId)
        if(user) {
            user.cartItems = {}
            await user.save()
    }
        return NextResponse.json({success : true , message : 'Commande passée avec succès'})

    } catch (error) {
        console.log(error)
        return NextResponse.json({success : false , message : error.message})


    }
}