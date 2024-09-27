// app/api/artists/route.js
import dbConnect from '../../../lib/mongoDB';
import Artist from '../../../models/Artist';

export async function GET(req) {
  try {
    await dbConnect();
    const artists = await Artist.find(); // Fetch all artists from the database
    return new Response(JSON.stringify(artists), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
