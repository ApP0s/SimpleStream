import mongoose from 'mongoose';

const ArtistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String },
  photo: { type: String },
});

export default mongoose.models.Artist || mongoose.model('Artist', ArtistSchema);
