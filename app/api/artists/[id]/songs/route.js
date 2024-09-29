import dbConnect from '@/lib/mongoDB';
import Artist from '@/models/Artist';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    // Find the artist by ID and populate the 'songs' field
    const artist = await Artist.findById(id).populate('songs');

    if (!artist || !artist.songs || artist.songs.length === 0) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Return the populated songs
    return new Response(JSON.stringify(artist.songs), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Failed to fetch songs:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch songs' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
