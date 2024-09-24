import Playlist from "@/models/Playlist";
import dbConnect from "@/lib/mongoDB";


export async function PUT(req) {
    try {
      await dbConnect();
      const url = new URL(req.url); // Extract full URL
      const id = url.pathname.split("/").pop(); // Get the ID from the URL
      const body = await req.json();
  
      const updatedPlaylist = await Playlist.findByIdAndUpdate(id, body, {
        new: true,
      });
  
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