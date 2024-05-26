import connectToDatabase from '../../../lib/mongodb';
import UserTheme from '../../../models/UserTheme';

export default async function handler(req, res) {
  await connectToDatabase(); 

  if (req.method === 'GET') {
    const { userId } = req.query;
    const userThemes = await UserTheme.find({ userId });
    res.status(200).json(userThemes);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
