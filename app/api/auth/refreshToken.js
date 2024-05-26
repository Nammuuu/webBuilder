import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import User from '../../../../models/User';
import { verify, sign } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ message: 'No token provided' }, { status: 403 });
  }

  const token = authHeader.split(' ')[1];
  try {
    await connectToDatabase();
    const decoded = verify(token, JWT_SECRET, { ignoreExpiration: true });

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const newToken = sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    return NextResponse.json({ token: newToken }, { status: 200 });
  } catch (err) {
    console.error('Failed to refresh token', err);
    return NextResponse.json({ message: 'Failed to refresh token' }, { status: 500 });
  }
}
