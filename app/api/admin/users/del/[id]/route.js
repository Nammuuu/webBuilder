// import { NextResponse } from 'next/server';
// import connectToDatabase from '../../../../../../lib/mongodb';
// import User from '../../../../../../models/User';
// import { verify } from 'jsonwebtoken';


// export async function DELETE(req) {
//     const authHeader = req.headers.get('authorization');
//     if (!authHeader) {
//       return NextResponse.json({ message: 'No token provided' }, { status: 403 });
//     }
  
//     const token = authHeader.split(' ')[1];
//     try {
//       const decoded = verify(token, JWT_SECRET);
//       if (decoded.role !== 'admin') {
//         return NextResponse.json({ message: 'Access denied' }, { status: 403 });
//       }
  
//       const { id } = await req.json();
//       await connectToDatabase();
//       const user = await User.findByIdAndDelete(id);
  
//       if (!user) {
//         return NextResponse.json({ message: 'User not found' }, { status: 404 });
//       }
  
//       return NextResponse.json({ message: 'User deleted' }, { status: 200 });
//     } catch (err) {
//       return NextResponse.json({ message: 'Failed to authenticate token' }, { status: 500 });
//     }
//   }
  

import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../../../lib/mongodb';
import User from '../../../../../../models/User';
import { verifyToken } from '../../../../../../lib/verifyToken';

export async function DELETE(req) {
  try {
    const decoded = verifyToken(req);

    if (decoded.role !== 'admin') {
      return NextResponse.json({ message: 'Access denied' }, { status: 403 });
    }

    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    await connectToDatabase();
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted' }, { status: 200 });
  } catch (err) {
    if (err.message === 'Token expired') {
      return NextResponse.json({ message: 'Token expired' }, { status: 401 });
    }
    if (err.message === 'No token provided' || err.message === 'Failed to authenticate token') {
      return NextResponse.json({ message: err.message }, { status: 403 });
    }
    console.error('Error deleting user:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
