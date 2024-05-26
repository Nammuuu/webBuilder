import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
// import { verifyToken } from '../../../../../lib/verifyToken';

import { verifyToken } from '../../../../lib/verifyToken';


const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  const { refreshToken } = await req.json();

  try {
    const decoded = verifyToken(refreshToken);
    const newToken = jwt.sign({ userId: decoded.userId, role: decoded.role }, JWT_SECRET, { expiresIn: '1h' });
    return NextResponse.json({ token: newToken }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to refresh token' }, { status: 403 });
  }
}
