import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import User from '../../../../models/User';
import { verifyToken } from '../../../../lib/verifyToken';

export async function POST(req) {
  const { themeId } = await req.json();
  
  try {
    const decoded = verifyToken(req);

    await connectToDatabase();
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    user.selectedTheme = themeId;
    await user.save();

    return NextResponse.json({ message: 'Theme selected successfully' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
