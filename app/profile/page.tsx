import { getLastOrder } from "@/lib/order-actions"
import Image from "next/image"

const ProfilePage = async () => {

  const getNewOrder = await getLastOrder()
  const newOrder = await JSON.parse(JSON.stringify(getNewOrder));

  return (
    <>
      <div className='a_page'>
        <ul className="steps pb-10">
          <li data-content="✓" className="step step-primary">Purchase</li>
          <li className="step step-primary ">Preparing</li>
          <li className="step step-primary">Delivering</li>
          <li className="step step-primary">Receive Product</li>
        </ul>
        <div className='a_container'>
          <h1 className="text-center font-bold">Thank you for your purchase</h1>
          <div className="">
            {newOrder?.map((item: any) => (
              < div key={item._id} className="py-10 justify-center items-center text-center ">
                {item.productImage?.map((image: string, i: number) => (
                  <div className='inline-flex justify-between mt-4 ml-3 mb-5 ' key={i}>
                    <Image
                      width={100}
                      height={100}
                      className="max-h-[100px] min-h-[100px]"
                      alt=""
                      key={i}
                      src={(image)}
                      loading='lazy'
                    />
                  </div>
                ))}

                <h3> <strong>Order ID:</strong> {item._id.substring(0, 5)}</h3>
                <p className="text-withe"><strong>User ID:</strong> {item.userId}</p>
                <p className="text-withe"><strong>Total paid:</strong> ${item.totalAmount.toFixed(2)}</p>
                <p className="text-withe"><strong> Order Status:</strong> {item.orderStatus}</p>
                <p className="text-withe"><strong>Created At:</strong>
                  {new Date(item.createdAt.substring(0, 10)).toLocaleDateString(
                    'en-US',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }
                  )};</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default ProfilePage