import {NextApiRequest, NextApiResponse} from "next";

import Stripe from "stripe";
import { buffer } from "micro";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2023-10-16"
});
const webhookSecret = "whsec_ff0af1b7e5bf3f1487e5700b3681812d4bc80ba445c85055f344b887920d7ae2"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed")
  }

  const rawBody = await buffer(req)
  const sig = req.headers['stripe-signature']!;

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(rawBody.toString(), sig, webhookSecret);
    res.status(200).send("OK")
  } catch (err) {
    if (err instanceof Error)
      return res.status(400).send(`Webhook Error: ${err.message}`);
    return res.status(400).send('Signature Webhook Error')
  }

  console.log(stripeEvent)
}