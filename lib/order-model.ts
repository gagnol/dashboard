import mongoose, { Document, Schema } from "mongoose";

interface Metadata {
  shipping: number;
  quantity: string[];
  userId: string;
  totalAmount: number;
  images: string[];
  productId: string[];
  importFees: number;
  subTotal: number;
  name: string[];
}

interface Shipping {
  city: string;
  country: string;
  line1: string;
  postal_code: string;
  state: string;
}

interface OrderDocument extends Document {
   
      stripeId: string,
      productId: string[],
      productImage:string[],
      productName:string[],
      userId: string,
      totalAmount:string,
      quantity:string[],
      orderStatus:string,
      createdAt: Date
     
}

const orderSchema = new Schema<OrderDocument>({
  stripeId: { type: String, required: true },
  productId: { type: [String], required: true },
  productImage: { type: [String], required: true },
  productName: { type: [String], required: true },
  userId:{ type: String, required: true },
  totalAmount:{ type: String, required: true },
  quantity:{ type: [String], required: true },
  orderStatus: { type: String, default: "Processing"},
  createdAt: { type:Date, default: Date.now}

});

export default mongoose.models.Order || mongoose.model<OrderDocument>("Order", orderSchema);
