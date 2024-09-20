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
    required: false, // or true if you want this field to be mandatory
  },
  year: {
    type: Number,
    required: false, // or true depending on your requirement
  },
});

const Song = mongoose.models.Song || mongoose.model("Song", SongSchema);
export default Song;
