// import { NextResponse } from 'next/server';
// import connectToDatabase from '../../../../lib/mongodb';
// import User from '../../../../models/User';
// import { verify } from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET;

// export async function GET(req) {
//   const authHeader = req.headers.get('authorization');
//   if (!authHeader) {
//     return NextResponse.json({ message: 'No token provided' }, { status: 403 });
//   }

//   const token = authHeader.split(' ')[1];
//   try {
//     const decoded = verify(token, JWT_SECRET);
//     if (decoded.role !== 'admin') {
//       return NextResponse.json({ message: 'Access denied' }, { status: 403 });
//     }

//     await connectToDatabase();
//     const users = await User.find({});
//     return NextResponse.json(users, { status: 200 });
//   } catch (err) {
//     return NextResponse.json({ message: 'Failed to authenticate token' }, { status: 500 });
//   }
// }

// import { NextResponse } from 'next/server';
// import connectToDatabase from '../../../../lib/mongodb';
// import User from '../../../../models/User';
// import { verify } from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET;

// export async function GET(req) {
//   const authHeader = req.headers.get('authorization');
//   if (!authHeader) {
//     return NextResponse.json({ message: 'No token provided' }, { status: 403 });
//   }

//   const token = authHeader.split(' ')[1];
//   try {
//     const decoded = verify(token, JWT_SECRET);
//       console.log("decoded",decoded)
//     if (decoded.role !== 'admin') {
//       return NextResponse.json({ message: 'Access denied' }, { status: 403 });
//     }

//     await connectToDatabase();
//     const users = await User.find({});
//     return NextResponse.json(users, { status: 200 });
//   } catch (err) {
//     return NextResponse.json({ message: 'Failed to authenticate token' }, { status: 500 });
//   }
// }


// import { NextResponse } from 'next/server';
// import connectToDatabase from '../../../../lib/mongodb';
// import User from '../../../../models/User';
// import { verify } from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET;

// export async function GET(req) {
//   const authHeader = req.headers.get('authorization');
//   console.log("authHeader", authHeader);
//   if (!authHeader) {
//     return NextResponse.json({ message: 'No token provided' }, { status: 403 });
//   }

//   const token = authHeader.split(' ')[1];
//   try {
//     await connectToDatabase();
//     const decoded = verify(token, JWT_SECRET);
//     console.log("decoded", decoded);

//     if (decoded.role !== 'admin') {
//       return NextResponse.json({ message: 'Access denied' }, { status: 403 });
//     }

//     const users = await User.find({});
//     return NextResponse.json(users, { status: 200 });
//   } catch (err) {
//     console.error('Failed to authenticate token', err);
//     return NextResponse.json({ message: 'Failed to authenticate token' }, { status: 500 });
//   }
// }





// import { NextResponse } from 'next/server';
// import connectToDatabase from '../../../../lib/mongodb';
// import User from '../../../../models/User';
// import { verify } from 'jsonwebtoken';
// import { verifyToken } from '../../../../lib/verifyToken';



import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import User from '../../../../models/User';
import { verifyToken } from '../../../../lib/verifyToken';


export async function GET(req) { 
  try {
    const decoded = verifyToken(req);

    if (decoded.role !== 'admin') {
      return NextResponse.json({ message: 'Access denied' }, { status: 403 });
    }

    await connectToDatabase();
    const users = await User.find({});
    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    if (err.message === 'Token expired') {
      return NextResponse.json({ message: 'Token expired' }, { status: 401 });
    }
    if (err.message === 'No token provided' || err.message === 'Failed to authenticate token') {
      return NextResponse.json({ message: err.message }, { status: 403 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}


// const JWT_SECRET = process.env.JWT_SECRET;
// export async function GET(req) {
//   const authHeader = req.headers.get('authorization');
//   console.log("authHeader", authHeader);
//   if (!authHeader) {
//     return NextResponse.json({ message: 'No token provided' }, { status: 403 });
//   }

//   const token = authHeader.split(' ')[1];
//   try {
//     const decoded = verify(token, JWT_SECRET);
//     console.log("decoded", decoded);

//     if (decoded.role !== 'admin') {
//       return NextResponse.json({ message: 'Access denied' }, { status: 403 });
//     }

//     await connectToDatabase();
//     const users = await User.find({});
//     return NextResponse.json(users, { status: 200 });
//   } catch (err) {
//     console.error('Failed to authenticate token', err);
//     return NextResponse.json({ message: 'Failed to authenticate token' }, { status: 500 });
//   }
// }

// export async function DELETE(req) {
//   const authHeader = req.headers.get('authorization');
//   if (!authHeader) {
//     return NextResponse.json({ message: 'No token provided' }, { status: 403 });
//   }

//   const token = authHeader.split(' ')[1];
//   try {
//     const decoded = verify(token, JWT_SECRET);
//     if (decoded.role !== 'admin') {
//       return NextResponse.json({ message: 'Access denied' }, { status: 403 });
//     }

//     const { id } = await req.json();
//     await connectToDatabase();
//     await User.findByIdAndDelete(id);
//     return NextResponse.json({ message: 'User deleted' }, { status: 200 });
//   } catch (err) {
//     return NextResponse.json({ message: 'Failed to authenticate token' }, { status: 500 });
//   }
// }
