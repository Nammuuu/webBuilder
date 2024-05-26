import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';
import Theme from '../../../models/Theme';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ message: 'No token provided' }, { status: 403 });
  }

  const token = authHeader.split(' ')[1];
  try {
    await connectToDatabase();
    const decoded = verify(token, JWT_SECRET);

    const { themeId } = await req.json();
    const user = await User.findById(decoded.userId);
    const theme = await Theme.findById(themeId);

    if (!user || !theme) {
      return NextResponse.json({ message: 'User or Theme not found' }, { status: 404 });
    }

    user.selectedTheme = themeId;
    await user.save();

    return NextResponse.json({ message: 'Theme selected successfully' }, { status: 200 });
  } catch (err) {
    console.error('Failed to select theme', err);
    return NextResponse.json({ message: 'Failed to select theme' }, { status: 500 });
  }
}
