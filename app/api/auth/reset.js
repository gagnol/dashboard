import bcrypt from 'bcryptjs';
import User from '@/models/User';
import db from '@/utils/db';

export default async function handler(req, res) {
  const { email, password } = req.body
  await db();
  const userData = await User.findOne({ email: email })
  if (userData) {
    userData.password = await User.updateOne({ email: email },
      { $set: { password: bcrypt.hashSync(password) } });
    res.status(200).send({ success: true });
  } else {
    res.status(401).send({ message: 'Email does not exist , please register' })
  }
}