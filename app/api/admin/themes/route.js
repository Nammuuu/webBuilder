import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Theme from '../../../../models/Theme';
// import { verifyToken } from '../../../../lib/verifyToken';
import { verifythame } from '../../../../lib/verifythame';



export async function GET(req) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ message: 'No token provided' }, { status: 403 });
    }
    
    const token = authHeader.split(' ')[1];
    // const decoded = verifyToken(token);
    const decoded = verifythame(token);

    await connectToDatabase();
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

export async function PUT(req) {
  const { id, updateData } = await req.json();

  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ message: 'No token provided' }, { status: 403 });
    }
    
    const token = authHeader.split(' ')[1];
    // const decoded = verifyToken(token);
    const decoded = verifythame(token);

    await connectToDatabase();
    if (decoded.role !== 'admin') {
      return NextResponse.json({ message: 'Access denied' }, { status: 403 });
    }

    await Theme.findByIdAndUpdate(id, updateData);
    return NextResponse.json({ message: 'Theme updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating theme:', error);
    return NextResponse.json({ message: 'Failed to update theme' }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { id } = await req.json();

  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ message: 'No token provided' }, { status: 403 });
    }
    
    const token = authHeader.split(' ')[1];
    // const decoded = verifyToken(token);
    const decoded = verifythame(token);

    await connectToDatabase();
    if (decoded.role !== 'admin') {
      return NextResponse.json({ message: 'Access denied' }, { status: 403 });
    }

    await Theme.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Theme deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting theme:', error);
    return NextResponse.json({ message: 'Failed to delete theme' }, { status: 500 });
  }
}
