import { useEffect, useState } from "react";
import SongItem from "./SongItem"; // Make sure SongItem is correctly imported
import styles from "@/app/page.module.css"; // Adjust your CSS file if needed

const SongList = () => {
  const [songs, setSongs] = useState([]); // Initialize with an empty array

  useEffect(() => {
    fetch("/api/songs")
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((error) => console.error("Error fetching songs:", error));
  }, []);

  return (
    <div className={styles.mainContent}>
      <h2>Song List</h2>
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

