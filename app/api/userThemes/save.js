import connectToDatabase from '../../../lib/mongodb';
import UserTheme from '../../../models/UserTheme';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { userId, themeId, content } = req.body;

    const userTheme = await UserTheme.findOneAndUpdate(
      { userId, themeId },
      { content },
      { new: true, upsert: true }
    );

    res.status(200).json(userTheme);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
