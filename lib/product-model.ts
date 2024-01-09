import mongoose from 'mongoose'

export type Product = {
    _id:string,
    video: [string],
    name: string,
    slug: string,
    category: string,
    subcategory: string,
    image: [string],
    price: number,
    brand: string,
    rating:  number, 
    numReviews:  number, 
    countInStock: number,
    description: string,
    isFeature: string,
    discount: number,
    topDeal: string,
    bestSeller: string,
    colors:[string]
    
}
const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    avatar:{type: String, required: false},
    subject:{ type: String, required: true },
    rating: { type: Number, default: 0 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
  
  const productSchema = new mongoose.Schema(
    { 
      video: { type:[String],required: false, },
      name: { type: String, required: true },
      slug: { type: String, required: true, unique: true },
      category: { type: String, required: true },  
      subcategory: { type: String,required: false},
      image: { type:[String],required: true },
      price: { type: Number, required: true },
      brand: { type: String, required: true },
      rating: { type: Number, required: true, default: 0 },
      numReviews: { type: Number, required: false, default: 0 },
      countInStock: { type: Number, required: true, default: 0 },
      description: { type: String, required: true },
      isFeature: { type: String, required: false, default:false },
      discount:{ type: Number, required: false  },
      topDeal: { type: String, required: false, default:false },
      bestSeller: { type: String, required: false, default:false },
      colors:{ type: [
        {
          name: { type: String, required: false },
          color: { type: String, required: false },
        },
      ],
      required: false
    },
    reviews: [reviewSchema],
  
    },
    {
      timestamps: true,
    }
  );

const ProductModel =
  mongoose.models.Product || mongoose.model('Product', productSchema)
export default ProductModel