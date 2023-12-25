import Image from 'next/image'
import { Toaster } from 'react-hot-toast'
import CreateForm from '../components/create-form'
import dbConnect from '@/lib/db-connect'
import ProductModel, { Product } from '@/lib/product-model'
import Rating from '../components/rating'
import DeleteForm from '../components/delete-form'
import Link from 'next/link'


export default async function Dashboard({searchParams}:
  {searchParams:{[key:string]:string |string }}) {
  const query=searchParams.query||'';
  await dbConnect()

  let page = parseInt(searchParams.page, 10);
  page = !page || page < 1 ? 1 : page;
  const perPage = 8;
  const products = (await ProductModel.find({
    name: { $regex: new RegExp(query, 'i') }, // Use a case-insensitive regular expression for searching
  })
  .skip(perPage * (page - 1))
  .limit(perPage)
  .sort({
    _id: 1,
  })) as Product[];
 
 const totalProducts= (await ProductModel.countDocuments({})) 

 const totalPages = Math.ceil(totalProducts / perPage);

  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const nextPage = page + 1;
	
  const pageNumbers = [];
  const offsetNumber = 3;
  for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
    if (i >= 1 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }

  return (
    <div className="mx-auto max-w-2xl lg:max-w-7xl" >
      <div className="flex justify-between items-center">
       
        <h1 className="font-bold py-10 text-2xl ">Admin Products</h1>
        <Toaster />
        <CreateForm />

      </div>
     
     Total products :  {totalProducts}
      <table className="table text-center">
        <thead>
          <tr >
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={5}>No product found</td>
            </tr>
          ) : (
            products.map((product: Product) => (
              <tr key={product._id}>
                <td>
                  <Link href={`/products/${product.slug}`}>
                  <Image
                    src={product.image[0]}
                    alt={product.name}
                    width={100}
                    height={100}
                    className="rounded-lg max-w-[100px] max-h-[100px] min-h-[100px]"
                  />
                  </Link>
                </td>
                <td className='text-neutral-content'>{product.name}</td>
                <td className='text-bold'>${product.price}</td>
                <td>
                  <Rating value={product.rating} />
                </td>
                <td>
                  <DeleteForm
                    _id={product._id.toString()}
                    name={product.name}
                  />
                </td>
              </tr>
            ))
          )
           }
        </tbody>
      </table>
      <div className="flex justify-center items-center my-16">
          <div className="flex border-[1px] gap-4 rounded-[10px] border-light-green p-4">
            {page === 1 ? (
              <button className="join-item btn btn-outline opacity-40" aria-disabled="true">
                Previous
              </button>
            ) : (
              <Link href={`?page=${prevPage}`} aria-label="Previous Page">
                 <button className="join-item btn btn-outline">
                Previous
                </button>
              </Link>
            )}
            {pageNumbers.map((pageNumber, index) => (
              <Link
                key={index}
                className={
                  page === pageNumber
                    ? "join-item btn btn-square"
                    : "hover:join-item btn btn-square btn-primary"
                }
                href={`?page=${pageNumber}`}
              >
                {pageNumber}
              </Link>
            ))}
            {page === totalPages ? (
              <button className="join-item btn btn-outline opacity-40" aria-disabled="true">
                Next
              </button>
            ) : (
              <Link href={`?page=${nextPage}`} aria-label="Next Page">
                <button className="join-item btn btn-outline">
                Next
                </button>
              </Link>
            )}
          </div>
        </div>
    </div>
  )
}