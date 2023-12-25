
import User from '@/models/User';
import db from '@/utils/db';

export default async function handler(req, res) {

      if (req.method !== 'POST') {
      return;
    }
    const { token } = req.body;
  await db();
  const existingUser = await User.findOne({ token: token });
  if (existingUser) {
    res.status(200).json({ success: true });
         
    return;
  }else{
    res.status(401).send('Invalid Token');  
  }
    
}

