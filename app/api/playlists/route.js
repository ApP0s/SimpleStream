import Playlist from "../../../models/Playlist";
import dbConnect from "../../../lib/mongoDB";
import mongoose from 'mongoose';

export async function GET(req) {
  try {
    await dbConnect();
    const playlists = await Playlist.find().populate("songs");
    return new Response(JSON.stringify(playlists), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const newPlaylist = await Playlist.create(body);
    return new Response(JSON.stringify(newPlaylist), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    // Check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: "Invalid Playlist ID" }), {
        status: 400,
      });
    }

    const deletedPlaylist = await Playlist.findByIdAndDelete(id);

    if (!deletedPlaylist) {
      return new Response(JSON.stringify({ error: "Playlist not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Playlist deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
