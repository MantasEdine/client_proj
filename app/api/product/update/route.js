import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

const { getAuth } = require("@clerk/nextjs/server");


export async function DELETE(request) {
    try {
        const {userId} = getAuth(request)
    const isSeller = await authSeller(userId)
    if(!isSeller){
        return NextResponse.json({success : false , message : "Unauthorized"})
    }
    const {productId} = await request.json()
    await connectDB()
    await Product.findByIdAndDelete(productId)
    return NextResponse.json({success : true , message : "Product Deleted Successfully"})
    } catch (error) {
        return NextResponse.json({success : false , message : error.message })
    }

}