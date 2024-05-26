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
  try {
    const decoded = verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') {
      return NextResponse.json({ message: 'Access denied' }, { status: 403 });
    }

    const { userId, message } = await req.json();

    await connectToDatabase();

    if (userId) {
      const user = await User.findById(userId);
      if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }
      // Replace with actual notification logic
      console.log(`Sending notification to ${user.email}: ${message}`);
    } else {
      const users = await User.find({});
      users.forEach(user => {
        // Replace with actual notification logic
        console.log(`Sending notification to ${user.email}: ${message}`);
      });
    }

    return NextResponse.json({ message: 'Notification sent successfully' });
  } catch (err) {
    return NextResponse.json({ message: 'Failed to authenticate token' }, { status: 500 });
  }
}
