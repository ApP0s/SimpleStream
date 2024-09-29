import mongoose from 'mongoose';

const ArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  genres: {
    type: [String],
  },
  songs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song'
  }]
});

export default mongoose.models.Artist || mongoose.model('Artist', ArtistSchema);