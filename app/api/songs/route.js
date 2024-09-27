import dbConnect from "../../../lib/mongoDB";
import Song from "../../../models/Song";

export async function GET(req) {
  try {
    await dbConnect();
    const songs = await Song.find({}); // Fetch all songs from the database
    return new Response(JSON.stringify(songs), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req) {
  try {
    const { title, artist, album, year } = await req.json();
    await dbConnect();
    
    const newSong = new Song({ title, artist, album, year });
    await newSong.save();
    
    return new Response(JSON.stringify(newSong), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
