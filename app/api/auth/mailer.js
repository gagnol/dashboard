
import db from '@/utils/db';
import sgMail from '@sendgrid/mail'
import User from '@/models/User';
import ramdomstring from 'randomstring'

const { SG_API_KEY, FROM_EMAIL } = process.env

sgMail.setApiKey(SG_API_KEY);

export default async function handler(req, res) {
    const { email } = req.body
    await db();
    
    const userData = await User.findOne({ email: email })
    const ramdom = ramdomstring.generate(7);
    userData.token = await User.updateOne({ email: email }, { $set: { token: ramdom } });
    if (!userData) {
        res.status(422).send("Incorrect Email, Please Register");
    }
    if (userData) {

        if (userData.isAdmin === true) {
            res.status(422).send("Incorrect Email, Please Register");
        } else {

            const msg = {
                to: { email },
                from: FROM_EMAIL,
                subject: 'Amazon password assistance',
                html: ` 
                
                <td width="250" >
            <img src="https://ci3.googleusercontent.com/proxy/pv_4JFo0doMGxloBsubjlzv6PeHAOBUFHMWM3caaLKhvI290uvuXLkQhXFe_SN-TXzMQb4hgodAPI0GRpZ_aQTL-97tTS0D1g1iPXMGMSY15y1IrLwZI3KeunR5ecD8=s0-d-e1-ft#https://m.media-amazon.com/images/G/01/x-locale/cs/te/logo._CB485949097_.png" /> </td>
               <p>To authenticate, please use the following One Time Password (OTP):</p>
                 <h1><strong>${ramdom}</strong></h1>
                 <p>Don't share this OTP with anyone. Our customer service team will never ask you for your password, OTP, credit card, or banking info.</p>
                 <p>We hope to see you again soon.</p>
                        <p><strong>Email:</strong>${email}</p>
                      `
            }
            await sgMail.send(msg);

            res.status(200).send({ email: email });

        }

    } else {
        res.status(401).render('forgot', { message: 'Email does not exist , please register' })
    }
}
