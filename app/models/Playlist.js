import mongoose from 'mongoose';

const PlaylistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
});

export default mongoose.models.Playlist || mongoose.model('Playlist', PlaylistSchema);
