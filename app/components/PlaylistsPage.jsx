import React from "react";
import { useRouter } from "next/router";
import PlaylistList from "@/app/components/PlaylistList";

const PlaylistsPage = () => {
  const router = useRouter();

  const deletePlaylist = async (id) => {
    try {
      const response = await fetch(`/api/playlists/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Fetch and update playlists after deletion if needed
        console.log("Playlist deleted successfully");
      } else {
        console.error("Failed to delete playlist");
      }
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  return (
    <div>
      <h1>Your Playlists</h1>
      <PlaylistList deletePlaylist={deletePlaylist} />
    </div>
  );
};

export default PlaylistsPage;
