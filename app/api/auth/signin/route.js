// import { NextResponse } from 'next/server';
// import connectToDatabase from '../../../../lib/mongodb';
// import User from '../../../../models/User';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';


// const JWT_SECRET = process.env.JWT_SECRET;

// if (!JWT_SECRET) {
//   throw new Error('Please define the JWT_SECRET environment variable inside .env.local');
// }

// export async function POST(req) {
//   const { email, password } = await req.json();
  
//   await connectToDatabase();
  
//   const user = await User.findOne({ email });
//   if (!user) {
//     return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
//   }
  
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
//   }

//   const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

//   return NextResponse.json({ token }, { status: 200 });
// }


// import { NextResponse } from 'next/server';
// import connectToDatabase from '../../../../lib/mongodb';
// import User from '../../../../models/User';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET;

// if (!JWT_SECRET) {
//   throw new Error('Please define the JWT_SECRET environment variable inside .env.local');
// }

// export async function POST(req) {
//   try {
//     const { email, password } = await req.json();
    
//     await connectToDatabase();
    
//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
//     }
    
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
//     }
  
//     const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  
//     return NextResponse.json({ token }, { status: 200 });
//   } catch (err) {
//     console.error('Error during sign-in:', err.message);
//     return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//   }
// }



// app/api/auth/signin/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  const { email, password } = await req.json();
  
  await connectToDatabase();
  
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
  }
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

  return NextResponse.json({ token, refreshToken }, { status: 200 });
}
