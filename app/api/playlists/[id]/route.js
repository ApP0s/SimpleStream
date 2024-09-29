import Playlist from "@/models/Playlist";
import dbConnect from "@/lib/mongoDB";

export async function PUT(req) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    const body = await req.json();

    // Update the playlist by ID with new name and songs
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
      id,
      {
        name: body.name, // Ensure you're updating the name
        songs: body.songs, // Update songs array if needed
      },
      { new: true, runValidators: true } // Ensure to return the updated document
    );

    if (!updatedPlaylist) {
      return new Response(JSON.stringify({ error: "Playlist not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedPlaylist), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}


export async function GET(req, { params }) {
  const { id } = params; // Get the playlist ID from the URL
  try {
    await dbConnect();
    const playlist = await Playlist.findById(id).populate('songs'); // Populate song details if needed
    if (!playlist) {
      return new Response(JSON.stringify({ error: "Playlist not found" }), { status: 404 });
    }
    return new Response(JSON.stringify(playlist), { headers: { "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}