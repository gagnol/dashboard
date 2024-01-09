import Image from "next/image";
import dbConnect from "@/lib/db-connect";
import OrderModel from "@/lib/order-model"

const Transactions = async () => {
  await dbConnect();
  const orderDocs = (await OrderModel.find().sort({
    _id: -1,
  }))
  const orders = JSON.parse(JSON.stringify(orderDocs));

  return (
    <div className="my-5 rounded-md">
      <h2 className=" text-xl">Latest Transactions</h2>
      <table className="table text-center">
        <thead>
          <tr className="bg-base-200">
            <th>Product</th>
            <th>Buyer</th>
            <th>Price</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={5}>No orders found</td>
            </tr>
          ) : (
            orders.map((item:any) => (
              <tr key={item._id}>
                <td>
                 <Image
                    src={item.productImage[0]}
                    alt=""
                    width={50}
                    height={50}
                    className="rounded-lg max-w-[50px] max-h-[50px] min-h-[50px]"
                  />
                </td>
                <td className='text-neutral-content'>{item.userId}</td>
                <td className='text-bold'>${item.totalAmount.toFixed(2)}</td>
                <td>
                {new Date(item.createdAt.substring(0, 10)).toLocaleDateString(
            'en-US',
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }
          )};
                </td>
                <td>
                 {item.orderStatus}
                </td>
              </tr>
            ))
          )
           } 
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
