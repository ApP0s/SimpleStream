import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoDB';
import Artist from '@/models/Artist';
import Song from '@/models/Song';

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { name, bio, genres } = body;

    // Create the new artist
    const newArtist = await Artist.create({ name, bio, genres });

    // Find all songs by this artist
    const artistSongs = await Song.find({ artist: name });

    // Update the artist document to include these songs
    if (artistSongs.length > 0) {
      const songIds = artistSongs.map(song => song._id);
      await Artist.findByIdAndUpdate(newArtist._id, { $push: { songs: { $each: songIds } } });
    }

    // Fetch the updated artist document
    const updatedArtist = await Artist.findById(newArtist._id).populate('songs');

    return NextResponse.json(updatedArtist, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// You can add other HTTP methods here if needed
export async function GET() {
  await dbConnect();

  try {
    const artists = await Artist.find({}).populate('songs');
    return NextResponse.json(artists);
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}