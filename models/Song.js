import mongoose from 'mongoose';

const SongSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Artist model
    ref: 'Artist', // Name of the model being referenced
    required: true,
  },
  album: {
    type: String,
  },
  year: {
    type: Number,
  },
});

const Song = mongoose.models.Song || mongoose.model('Song', SongSchema);
export default Song;
