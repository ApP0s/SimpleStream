// models/Artist.js
import mongoose from 'mongoose';

const ArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Artist = mongoose.models.Artist || mongoose.model('Artist', ArtistSchema);
export default Artist;
