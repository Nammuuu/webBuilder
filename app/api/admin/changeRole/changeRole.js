import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import User from '../../../../models/User';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ message: 'No token provided' }, { status: 403 });
  }

  const token = authHeader.split(' ')[1];
  const { userId, newRole } = await req.json();

  try {
    const decoded = verify(token, JWT_SECRET);

    if (decoded.role !== 'admin') {
      return NextResponse.json({ message: 'Access denied' }, { status: 403 });
    }

    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    user.role = newRole;
    await user.save();

    return NextResponse.json({ message: 'User role updated successfully' }, { status: 200 });
  } catch (err) {
    console.error('Failed to authenticate token or update role', err);
    return NextResponse.json({ message: 'Failed to authenticate token or update role' }, { status: 500 });
  }
}
