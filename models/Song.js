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
  album: {
    type: String,
    required: false, 
  },
  year: {
    type: Number,
    required: false,
  },
});

const Song = mongoose.models.Song || mongoose.model("Song", SongSchema);
export default Song;
