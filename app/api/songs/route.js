// /pages/api/songs/index.js
import dbConnect from "@/lib/mongodb"; // Assuming dbConnect handles MongoDB connection
import Song from "@/models/Song"; // Your Song model

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const songs = await Song.find({});
    res.status(200).json(songs);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
