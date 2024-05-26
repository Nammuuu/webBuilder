import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import User from '../../../../models/User';
import Theme from '../../../../models/Theme';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ message: 'No token provided' }, { status: 403 });
  }

  const token = authHeader.split(' ')[1];
  try {
    await connectToDatabase();
    const decoded = verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId).populate('selectedTheme');

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ selectedTheme: user.selectedTheme }, { status: 200 });
  } catch (err) {
    console.error('Failed to fetch user profile', err);
    return NextResponse.json({ message: 'Failed to fetch user profile' }, { status: 500 });
  }
}
