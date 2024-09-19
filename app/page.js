"use client"; // <-- This is the key addition

import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [songs, setSongs] = useState([]);

  // Fetch songs from the API
  useEffect(() => {
    fetch("/api/songs")
      .then((res) => res.json())
      .then((data) => setSongs(data));
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.homeIcon}>🏠</div>
        <input type="text" className={styles.searchBar} placeholder="Search..." />
      </header>

      <div className={styles.sidebar}>
        <div className={styles.menuItem}>+</div>
      </div>

      <main className={styles.main}>
        <div className={styles.mainContent}>
          {/* Display song data */}
          <h2>Song List</h2>
          {songs.length > 0 ? (
            <ul className={styles.songList}>
              {songs.map((song) => (
                <li key={song._id} className={styles.songItem}>
                  <strong>{song.title}</strong> by {song.artist}
                </li>
              ))}
            </ul>
          ) : (
            <p>No songs available</p>
          )}
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.bottomItem}></div>
          <div className={styles.bottomItem}></div>
          <div className={styles.bottomItem}></div>
          <div className={styles.bottomItem}></div>
        </div>
      </main>
    </div>
  );
}
