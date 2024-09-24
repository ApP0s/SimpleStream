"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import SongList from "./components/SongList.jsx";
import PlaylistList from "./components/PlaylistList.jsx";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]); // Add playlists state

  // Fetch songs from the API
  useEffect(() => {
    fetch("/api/songs")
      .then((res) => res.json())
      .then((data) => setSongs(data));
  }, []);

  // Fetch playlists from the API
  useEffect(() => {
    fetch("/api/playlists")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPlaylists(data); // Only set playlists if the response is an array
        }
      })
      .catch((error) => console.error("Error fetching playlists:", error));
  }, []);

  // Function to add a new playlist
  const addPlaylist = (newPlaylist) => {
    setPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]);
  };

  // Function to delete a playlist (optional if you want to move the delete logic here)
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
      <PlaylistList playlists={playlists} deletePlaylist={deletePlaylist} />
      <SongList />
    </div>
  );
}
