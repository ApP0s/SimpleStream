// app/api/artists/[id]/route.js
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import dbConnect from '@/lib/mongoDB';
import Artist from '@/models/Artist';

export async function GET(request, { params }) {
  try {
    await dbConnect();

    const artist = await Artist.findById(params.id);

    if (!artist) {
      return NextResponse.json({ success: false, error: 'Artist not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: artist });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();

    const body = await request.json();
    const updatedArtist = await Artist.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedArtist) {
      return NextResponse.json({ success: false, error: 'Artist not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedArtist });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();

    const deletedArtist = await Artist.findByIdAndDelete(params.id);

    if (!deletedArtist) {
      return NextResponse.json({ success: false, error: 'Artist not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: 'Artist deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
