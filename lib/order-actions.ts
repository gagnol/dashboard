"use server"

import Stripe from 'stripe';
import { CheckoutOrderParams, CreateOrderParams, GetOrdersByEventParams, GetOrdersByUserParams } from "@/types"
import { redirect } from 'next/navigation';
import User from './user-model'
import dbConnect from './db-connect'
import Order from './order-model';
import Product from './product-model';
import { ObjectId } from 'mongodb';

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = Number((order.totalAmount).toFixed(2)) * 100;
  const productName = JSON.stringify(order?.productName?.map((item: any) => item))
  const productId = JSON.stringify(order?.productId?.map((item: any) => item))
  const quantity = JSON.stringify(order?.quantity?.map((item: any) => item))
  const productImage = JSON.stringify(order?.productImage?.map((item: any) => item))

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: price,
            product_data: {
              name: productName,

            }
          },
         quantity:1

        },
      ],
      metadata: {
        productName:productName,
        productImage:productImage,
        productId: productId,
        quantity:quantity,
        userId: order.email,
      },
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["AR", "AU"],
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
    });

    redirect(session.url!)
  } catch (error) {
    throw error;
  }
}



export const createOrder = async (order: CreateOrderParams) => {
  try {
    await dbConnect();

    const newOrder = await Order.create({
      ...order,

    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.log(error);
  }
}

// GET ORDERS BY EVENT
export async function getOrdersByEvent({ searchString, eventId }: GetOrdersByEventParams) {
  try {
    await dbConnect()

    if (!eventId) throw new Error('Event ID is required')
    const eventObjectId = new ObjectId(eventId)

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'buyer',
          foreignField: '_id',
          as: 'buyer',
        },
      },
      {
        $unwind: '$buyer',
      },
      {
        $lookup: {
          from: 'events',
          localField: 'event',
          foreignField: '_id',
          as: 'event',
        },
      },
      {
        $unwind: '$event',
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          eventTitle: '$event.title',
          eventId: '$event._id',
          buyer: {
            $concat: ['$buyer.firstName', ' ', '$buyer.lastName'],
          },
        },
      },
      {
        $match: {
          $and: [{ eventId: eventObjectId }, { buyer: { $regex: RegExp(searchString, 'i') } }],
        },
      },
    ])

    return JSON.parse(JSON.stringify(orders))
  } catch (error) {
    console.log(error)
  }
}
