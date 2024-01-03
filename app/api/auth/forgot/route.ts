import dbConnect from "@/lib/db-connect"
import User from "@/lib/user-model";
import { NextResponse } from "next/server";
import sgMail from '@sendgrid/mail'; 
import ramdomstring from 'randomstring'

const { SG_API_KEY, FROM_EMAIL } = process.env

sgMail.setApiKey(SG_API_KEY!);

export async function POST(request: Request) {
  const { email } = await request.json()
  await dbConnect();
  
  const userData = await User.findOne({ email: email })
  const ramdom = ramdomstring.generate(7);
  userData.token = await User.updateOne({ email: email }, { $set: { token: ramdom } });

  if (!userData) {
    return NextResponse.json(
      {
        message: "Incorrect Email, Please Register",
      },
      {
        status: 422,
      }
    );
  }

  if (userData) {
    const msg:any= {
      to: { email },
      from: {
        email: FROM_EMAIL,
        name: "Your Name", // Add your name or leave it as an empty string
      },
      subject: 'Amazon password assistance',
      html: `
        <td width="250" >
          <img src="https://ci3.googleusercontent.com/proxy/pv_4JFo0doMGxloBsubjlzv6PeHAOBUFHMWM3caaLKhvI290uvuXLkQhXFe_SN-TXzMQb4hgodAPI0GRpZ_aQTL-97tTS0D1g1iPXMGMSY15y1IrLwZI3KeunR5ecD8=s0-d-e1-ft#https://m.media-amazon.com/images/G/01/x-locale/cs/te/logo._CB485949097_.png" />
        </td>
        <p>To authenticate, please use the following One Time Password (OTP):</p>
        <h1><strong>${ramdom}</strong></h1>
        <p>Don't share this OTP with anyone. Our customer service team will never ask you for your password, OTP, credit card, or banking info.</p>
        <p>We hope to see you again soon.</p>
        <p><strong>Email:</strong>${email}</p>
      `,
    };

    try {
      await sgMail.send(msg);
      return NextResponse.json(
        {
          email: email
        },
        { status: 201 }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        {
          message: "Error sending email",
        },
        {
          status: 500,
        }
      );
    }
  }
}
