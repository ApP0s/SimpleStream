import dbConnect from '@/lib/mongoDB';
import Song from '@/models/Song';

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === 'GET') {
    const song = await Song.findById(id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.status(200).json(song);
  } else if (req.method === 'PUT') {
    const updatedSong = await Song.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedSong);
  } else if (req.method === 'DELETE') {
    await Song.findByIdAndDelete(id);
    res.status(204).end();
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
