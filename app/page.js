"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import SongList from "./components/SongList";
import styles from "./page.module.css"; // Ensure this import is present

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
      <Header />
      <Sidebar />
      <main className={styles.main}>
        <SongList songs={songs} />
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
