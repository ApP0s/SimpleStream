import Playlist from "@/models/Playlist";
import dbConnect from "@/lib/mongoDB";
import mongoose from "mongoose"; // Make sure to import mongoose to use ObjectId

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


export async function GET(req) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // Extract the playlist ID

    const playlist = await Playlist.findById(id).populate("songs"); // Fetch the playlist and populate songs
    if (!playlist) {
      return new Response(JSON.stringify({ error: "Playlist not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(playlist), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
