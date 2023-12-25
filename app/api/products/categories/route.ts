
import { NextResponse } from "next/server";
import ProductModel from '@/lib/product-model'
import dbConnect from "@/lib/db-connect";

export async function GET(request: Request) {
  
    await dbConnect();
    const categories = await ProductModel.find().distinct('category')
  
    return NextResponse.json({ categories});
  
 
}