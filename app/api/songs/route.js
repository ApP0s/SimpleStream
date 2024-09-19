import dbConnect from "../../../lib/mongoDB";
import Song from "@/models/Song"; // Assuming you have a Song model defined

export default async function handler(req, res) {
  await dbConnect(); // Connect to MongoDB

  if (req.method === "GET") {
    try {
      const songs = await Song.find(); // Fetch songs from MongoDB
      res.status(200).json(songs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch songs" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
