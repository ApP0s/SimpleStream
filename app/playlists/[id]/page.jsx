"use client";

import { useEffect, useState } from "react";
import PlaylistList from "@/app/components/PlaylistList";
import "./globals.css";


export default function Playlist() {
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
    <PlaylistList playlists={playlists} deletePlaylist={deletePlaylist} />
  )
}
