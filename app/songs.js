'use client';

import { useEffect, useState } from 'react';

const SongsPage = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch('/api/songs')
      .then((res) => res.json())
      .then((data) => setSongs(data));
  }, []);

  return (
    <div>
      <h1>All Songs</h1>
      <ul>
        {songs.map((song) => (
          <li key={song._id}>
            {song.title} by {song.artist}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongsPage;
