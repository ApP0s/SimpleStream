import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import styles from "@/app/page.module.css";

const PlaylistList = ({ playlists, deletePlaylist, setPlaylists }) => {
  const [editingPlaylist, setEditingPlaylist] = useState(null); // Track which playlist is being edited
  const [newName, setNewName] = useState(""); // New name for the playlist

  // Function to handle the opening of the edit modal
  const handleEditOpen = (playlist) => {
    setEditingPlaylist(playlist);
    setNewName(playlist.name); // Set input value to current playlist name
  };

  // Function to handle closing of the edit modal
  const handleEditClose = () => {
    setEditingPlaylist(null); // Close the modal
    setNewName(""); // Reset the input field
  };

  // Function to handle saving the new playlist name
  const handleSaveClick = async () => {
    if (!editingPlaylist) return;

    try {
      const response = await fetch(`/api/playlists/${editingPlaylist._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
      });

      if (response.ok) {
        const updatedPlaylist = await response.json();
        setPlaylists((prevPlaylists) =>
          prevPlaylists.map((playlist) =>
            playlist._id === updatedPlaylist._id ? updatedPlaylist : playlist
          )
        );
        handleEditClose(); // Close modal after saving
      } else {
        console.error("Failed to update playlist");
      }
    } catch (error) {
      console.error("Error updating playlist:", error);
    }
  };

  return (
    <div className={styles.playlistContainer}>
      <h2>Playlists</h2>
      <div className={styles.playelement}>
        {playlists && playlists.length > 0 ? (
          <ul>
            {playlists.map((playlist) => (
              <li key={playlist._id}>
                <strong>{playlist.name}</strong>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEditOpen(playlist)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => deletePlaylist(playlist._id)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No playlists available</p>
        )}
      </div>

      {/* MUI Modal for Editing Playlist */}
      <Dialog open={!!editingPlaylist} onClose={handleEditClose}>
        <DialogTitle>Edit Playlist Name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Playlist Name"
            type="text"
            fullWidth
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveClick} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PlaylistList;
