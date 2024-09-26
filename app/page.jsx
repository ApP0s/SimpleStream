"use client";

import { useEffect, useState } from "react";

import SongList from "./components/SongList.jsx";

export default function Home() {
  const [songs, setSongs] = useState([]);


  // Fetch songs from the API
  useEffect(() => {
    fetch("/api/songs")
      .then((res) => res.json())
      .then((data) => setSongs(data));
  }, []);


  return (
    <div>
      <SongList />
    </div>
  );
}
