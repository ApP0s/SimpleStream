import { useState, useEffect } from 'react'; // Make sure useState and useEffect are imported
import SongItem from './SongItem'; // Ensure SongItem is correctly imported
import styles from '@/app/page.module.css'; // Import the CSS module

const SongList = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("/api/songs")
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((error) => console.error("Error fetching songs:", error));
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Song List</h2>
      {songs.length > 0 ? (
        <ul className={styles.songList}>
          {songs.map((song) => (
            <SongItem key={song._id} song={song} />
          ))}
        </ul>
      ) : (
        <p>No songs available</p>
      )}
    </div>
  );
};

export default SongList;
