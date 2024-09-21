import mongoose from 'mongoose';

const PlaylistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Playlist = mongoose.models.Playlist || mongoose.model('Playlist', PlaylistSchema);
export default Playlist;
