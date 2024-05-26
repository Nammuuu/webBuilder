// import { NextResponse } from 'next/server';
// import connectToDatabase from '../../../lib/mongodb';
// import Theme from '../../../../models/Theme';
// import { verify } from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET;

// export async function POST(req) {
//   const authHeader = req.headers.get('authorization');
//   if (!authHeader) {
//     return NextResponse.json({ message: 'No token provided' }, { status: 403 });
//   }

//   const token = authHeader.split(' ')[1];
//   try {
//     await connectToDatabase();
//     const decoded = verify(token, JWT_SECRET);

//     if (decoded.role !== 'admin') {
//       return NextResponse.json({ message: 'Access denied' }, { status: 403 });
//     }

//     const { content, name, description } = await req.json();
//     const newTheme = new Theme({
//       content,
//       name,
//       description,
//       createdBy: decoded.userId,
//     });

//     await newTheme.save();
//     return NextResponse.json({ message: 'Theme saved successfully' }, { status: 201 });
//   } catch (err) {
//     console.error('Failed to save theme', err);
//     return NextResponse.json({ message: 'Failed to save theme' }, { status: 500 });
//   }
// }



// import { NextResponse } from 'next/server';
// import connectToDatabase from '../../../lib/mongodb';
// import Theme from '../../../models/Theme';
// import { verify } from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET;

// export async function POST(req) {
//   const authHeader = req.headers.get('authorization');
//   if (!authHeader) {
//     return NextResponse.json({ message: 'No token provided' }, { status: 403 });
//   }

//   const token = authHeader.split(' ')[1];
//   try {
//     const decoded = verify(token, JWT_SECRET);

//     await connectToDatabase();
//     const { userId, content, name, description } = await req.json();

//     if (decoded.userId !== userId && decoded.role !== 'admin') {
//       return NextResponse.json({ message: 'Access denied' }, { status: 403 });
//     }

//     const theme = new Theme({
//       content,
//       name,
//       description,
//       createdBy: decoded.userId,
//     });

//     await theme.save();
//     return NextResponse.json({ message: 'Theme saved successfully' }, { status: 200 });
//   } catch (err) {
//     console.error('Failed to authenticate token or save theme', err);
//     return NextResponse.json({ message: 'Failed to authenticate token or save theme' }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Theme from '../../../models/Theme';
import { verifyToken } from '../../../lib/verifyToken';

export async function POST(req) {
  try {
    const decoded = verifyToken(req);

    await connectToDatabase();
    const { userId, content, name, description } = await req.json();

    if (decoded.userId !== userId && decoded.role !== 'admin') {
      return NextResponse.json({ message: 'Access denied' }, { status: 403 });
    }

    const theme = new Theme({
      content,
      name,
      description,
      createdBy: decoded.userId,
    });

    await theme.save();
    return NextResponse.json({ message: 'Theme saved successfully' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}


export async function GET() {
  try {
    await connectToDatabase();
    const themes = await Theme.find({});
    return NextResponse.json(themes, { status: 200 });
  } catch (err) {
    console.error('Failed to fetch themes', err);
    return NextResponse.json({ message: 'Failed to fetch themes' }, { status: 500 });
  }
}