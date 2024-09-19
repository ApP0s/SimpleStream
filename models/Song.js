import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
});

const Song = mongoose.models.Song || mongoose.model("Song", SongSchema);
export default Song;
