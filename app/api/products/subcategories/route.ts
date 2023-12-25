
import { NextResponse } from "next/server";
import ProductModel from '@/lib/product-model'
import dbConnect from "@/lib/db-connect";

export async function GET(request: Request) {
  
    await dbConnect();
    const subcategories = await ProductModel.find().distinct('subcategory')
  
    return NextResponse.json({ subcategories});
  
 
}