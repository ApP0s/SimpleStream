// app/api/artists/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoDB';
import Artist from '@/models/Artist';

export async function GET() {
  try {
    await dbConnect();

    const artists = await Artist.find({});
    return NextResponse.json({ success: true, data: artists });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const newArtist = await Artist.create(body);

    return NextResponse.json({ success: true, data: newArtist });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
