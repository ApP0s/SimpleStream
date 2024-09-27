"use client"; // Marking this component as a Client Component

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation for router

const PlaylistDetail = () => {
  const router = useRouter();
  const [playlist, setPlaylist] = useState(null);
  const [loadingId, setLoadingId] = useState(true);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      const { id: playlistId } = router.query; // Destructure the id from router.query
      console.log("Playlist ID:", playlistId); // Log the playlist ID
      setId(playlistId);
      setLoadingId(false);
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (id) {
      const fetchPlaylist = async () => {
        try {
          const response = await fetch(`/api/playlists/${id}`); // Ensure this matches your API route
          console.log("Response status:", response.status); // Log the response status
          if (!response.ok) throw new Error("Failed to fetch playlist");
          const data = await response.json();
          console.log("Fetched playlist data:", data); // Log the fetched data
          setPlaylist(data);
        } catch (error) {
          console.error("Error fetching playlist:", error);
        }
      };
      fetchPlaylist();
    }
  }, [id]);

  if (loadingId) return <div>Loading...</div>;
  if (!playlist) return <div>Loading playlist data...</div>;

  return (
    <div>
      <h1>{playlist.name}</h1>
      <ul>
        {playlist.songs.map((song) => (
          <li key={song._id}>{song.title} by {song.artist}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistDetail;
