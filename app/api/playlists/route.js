import dbConnect from "@/lib/mongoDB";
import Playlist from "@/models/Playlist";

export async function POST(req) {
  try {
    const { name } = await req.json();
    await dbConnect();

    const newPlaylist = new Playlist({ name });
    await newPlaylist.save();

    return new Response(JSON.stringify(newPlaylist), {
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
