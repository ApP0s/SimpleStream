
import dbConnect from "../../../../lib/mongoDB";
import Song from "../../../../models/Song";

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { title, artist, album, year } = await req.json();
    await dbConnect();

    const updatedSong = await Song.findByIdAndUpdate(
      id,
      { title, artist, album, year },
      { new: true }
    );

    return new Response(JSON.stringify(updatedSong), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(req, { params }) {
    try {
      const { id } = params;
      await dbConnect();
  
      await Song.findByIdAndDelete(id); // Delete the song by its ID
  
      return new Response(JSON.stringify({ message: "Song deleted successfully" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }