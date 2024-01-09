import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Chart from "@/app/components/Admin-navigation/chart"
import Sidebar from "@/app/components/Admin-navigation/sidebar";
import Transactions from "@/app/components/Admin-navigation/transactions";

export default async function Main(){
  const session = await getServerSession();

    if( session?.user?.email !== "admin@example.com")    
    {
      redirect("/")
    }

    return ( 
        <>
        <div className="max-w-screen-2xl mx-auto my-10">
        <div className="grid md:grid-cols-5 md:gap-5">
        <Sidebar/>
        <div className="md:col-span-3">
          <h1 className="mb-4 text-[28px] font-extrabold">Admin Dashboard</h1>
        <div>
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="card m-5 p-5 rounded-md border-2">
                  <p className="text-3xl">$500 </p>
                  <p>Sales</p>
                  <Link href="/admin/orders" className="hover:text-primary">View sales</Link>
                </div>
                <div className="card m-5 p-5 rounded-md border-2">
                  <p className="text-3xl">54 </p>
                  <p>Orders</p>
                  <Link href="/admin/orders" className="hover:text-primary">View orders</Link>
                </div>
                <div className="card m-5 p-5 rounded-md border-2">
                  <p className="text-3xl">44 </p>
                  <p>Products</p>
                  <Link href="/admin/products" className="hover:text-primary">View products</Link>
                </div>
                <div className="card m-5 p-5 rounded-md border-2">
                  <p className="text-3xl">5 </p>
                  <p>Users</p>
                  <Link href="/admin/users" className="hover:text-primary">View users</Link>
                </div>
              </div>
              <h2 className="text-xl">Sales Report</h2>
             </div>
            <Chart />
            <Transactions/>
            </div>
      
            </div> 
        </div>
        </>
    )
}