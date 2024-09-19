import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String },
  year: { type: Number },
});

export default mongoose.models.Song || mongoose.model("Song", SongSchema);
