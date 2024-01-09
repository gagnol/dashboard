
import React, { useEffect, useState } from 'react';
import { signIn, useSession, signOut } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import dbConnect from "@/lib/db-connect";
import OrderModel from "@/lib/order-model"


interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}
export default async function ProfileScreen() {

    const session = await getServerSession();

    if (!session?.user) {
        redirect("/")
    }

    await dbConnect();

    const orderDocs = (await OrderModel.find({ userId: session.user.name }).sort({
        _id: -1,
    }))
    const orders = JSON.parse(JSON.stringify(orderDocs));


    return (
        <div className="grid  md:grid-cols-4 md:gap-5">
            <div className='mx-10 my-5 border-r-[1px]'>
                <h1 className=" text-xl font-bold">Your Account</h1>
                <Image src={session?.user?.image || "/noavatar.png"} alt='' width={100} height={100} />
                <ul className='my-5'>
                    <li className="text-[20px] font-semibold">Name:&nbsp;{session?.user?.name}</li>
                    <li className="text-[20px] font-semibold">Email:&nbsp;{session?.user?.email} </li>

                    <li className="nav_text">Browsing History</li>
                    <li className="nav_text">Watchlist</li>
                    <li className="nav_text">Customer Service</li>
                    <li className="nav_text" >Sign Out</li>
                </ul>
            </div>
            <div className="md:col-span-3">
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
                                orders.map((item: any) => (
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
            </div>
        </div>

    );
}


