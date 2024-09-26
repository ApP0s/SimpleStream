"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import SongList from "./components/SongList.jsx";
import PlaylistList from "./components/PlaylistList.jsx";
import "./globals.css";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetch("/api/songs")
      .then((res) => res.json())
      .then((data) => setSongs(data));
  }, []);

  useEffect(() => {
    fetch("/api/playlists")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPlaylists(data);
        }
      })
      .catch((error) => console.error("Error fetching playlists:", error));
  }, []);

  const addPlaylist = (newPlaylist) => {
    setPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]);
  };

  const deletePlaylist = (id) => {
    fetch(`/api/playlists/?id=${id}`, { method: "DELETE" })
      .then(() => {
        setPlaylists((prevPlaylists) =>
          prevPlaylists.filter((playlist) => playlist._id !== id)
        );
      })
      .catch((error) => console.error("Error deleting playlist:", error));
  };

  return (
    <div>
      <Header />
      <Sidebar addPlaylist={addPlaylist} />
      <PlaylistList
        playlists={playlists}
        deletePlaylist={deletePlaylist}
        setPlaylists={setPlaylists} // Pass setPlaylists to update state
      />
      <SongList songs={songs} />
    </div>
  );
}
