
import db from '@/utils/db';
import User from '@/models/User';

export default async function handler(req, res) {
    const { email, avatar } = req.body

    await db();
    const userData = await User.findOne({ email: email })
    if (userData) {
      userData.avatar = await User.updateOne({ email: email },
        { $set: { avatar: avatar } });
     
      res.status(200).send({ success: true });
    } else {
      res.status(401).send({ message: 'Email does not exist , please register' })
    }
  }
