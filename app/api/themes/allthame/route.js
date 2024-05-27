// api/admin/themes/allthame/route.js
// api/admin/themes/allthame/route.js

import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Theme from '../../../../models/Theme';
import { verifyToken } from '../../../../lib/verifyToken';

export async function GET(req) {
  await connectToDatabase();

  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ message: 'No token provided' }, { status: 403 });
    }
    
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (decoded.role !== 'admin') {
      return NextResponse.json({ message: 'Access denied' }, { status: 403 });
    }

    const themes = await Theme.find({});
    const count = await Theme.countDocuments({});
    
    return NextResponse.json({ themes, count }, { status: 200 });
  } catch (error) {
    console.error('Error fetching themes:', error);
    return NextResponse.json({ message: 'Failed to fetch themes' }, { status: 500 });
  }
}





// import { NextResponse } from 'next/server';
// import connectToDatabase from '../../../../lib/mongodb';
// import Theme from '../../../../models/Theme';
// import { verifyToken } from '../../../../lib/verifyToken';

// export async function GET(req) {
//   await connectToDatabase();

//   try {
//     const authHeader = req.headers.get('authorization');
//     if (!authHeader) {
//       return NextResponse.json({ message: 'No token provided' }, { status: 403 });
//     }
    
//     const token = authHeader.split(' ')[1];
//     const decoded = verifyToken(token);

//     if (decoded.role !== 'admin') {
//       return NextResponse.json({ message: 'Access denied' }, { status: 403 });
//     }

//     const themes = await Theme.find({});
//     const count = await Theme.countDocuments({});
    
//     return NextResponse.json({ themes, count }, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching themes:', error);
//     return NextResponse.json({ message: 'Failed to fetch themes' }, { status: 500 });
//   }
// }





// export async function PUT(req) {
//   await connectToDatabase();

//   try {
//     // const token = req.headers.get('authorization')?.split(' ')[1];
//     const decoded = verifyToken(token);

//     if (decoded.role !== 'admin') {
//       return NextResponse.json({ message: 'Access denied' }, { status: 403 });
//     }

//     const { id } = req.query;
//     const { content, name, description } = await req.json();
    
//     const updatedTheme = await Theme.findByIdAndUpdate(id, { content, name, description }, { new: true });
    
//     if (!updatedTheme) {
//       return NextResponse.json({ message: 'Theme not found' }, { status: 404 });
//     }

//     return NextResponse.json({ message: 'Theme updated successfully', theme: updatedTheme }, { status: 200 });
//   } catch (error) {
//     console.error('Error updating theme:', error);
//     return NextResponse.json({ message: 'Failed to update theme' }, { status: 500 });
//   }
// }

// export async function DELETE(req) {
//   await connectToDatabase();

//   try {
//     // const token = req.headers.get('authorization')?.split(' ')[1];
//     const decoded = verifyToken(token);

//     if (decoded.role !== 'admin') {
//       return NextResponse.json({ message: 'Access denied' }, { status: 403 });
//     }

//     const { id } = req.query;
//     const deletedTheme = await Theme.findByIdAndDelete(id);
    
//     if (!deletedTheme) {
//       return NextResponse.json({ message: 'Theme not found' }, { status: 404 });
//     }

//     return NextResponse.json({ message: 'Theme deleted successfully' }, { status: 200 });
//   } catch (error) {
//     console.error('Error deleting theme:', error);
//     return NextResponse.json({ message: 'Failed to delete theme' }, { status: 500 });
//   }
// }
