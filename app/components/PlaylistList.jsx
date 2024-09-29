import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";
import styles from "@/app/page.module.css";

const PlaylistList = () => {
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([]); // Available songs
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const [newName, setNewName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddSongsOpen, setIsAddSongsOpen] = useState(false); // Track add songs modal
  const [selectedSongs, setSelectedSongs] = useState([]); // Store selected songs

  // Fetch playlists from the API
  const fetchPlaylists = async () => {
    try {
      const response = await fetch("/api/playlists");
      if (!response.ok) throw new Error("Failed to fetch playlists");
      const data = await response.json();
      setPlaylists(data);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  // Fetch available songs
  const fetchSongs = async () => {
    try {
      const response = await fetch("/api/songs");
      if (!response.ok) throw new Error("Failed to fetch songs");
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  useEffect(() => {
    fetchPlaylists();
    fetchSongs();
  }, []);

  const handleEditOpen = (playlist) => {
    setEditingPlaylist(playlist);
    setNewName(playlist.name);
    setIsModalOpen(true);
  };

  const handleCreateOpen = () => {
    setNewName("");
    setEditingPlaylist(null);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingPlaylist(null);
    setNewName("");
  };

  const handleSaveClick = async () => {
    if (!editingPlaylist) return;

    try {
      const response = await fetch(`/api/playlists/${editingPlaylist._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          songs: selectedSongs, // Ensure selectedSongs contains the intended songs
        }),
      });

      if (response.ok) {
        const updatedPlaylist = await response.json();
        console.log("Updated Playlist:", updatedPlaylist); // Log the updated playlist

        setPlaylists((prevPlaylists) =>
          prevPlaylists.map((playlist) =>
            playlist._id === updatedPlaylist._id ? updatedPlaylist : playlist
          )
        );
        handleClose(); // Close modal after saving
      } else {
        console.error("Failed to update playlist");
      }
    } catch (error) {
      console.error("Error updating playlist:", error);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch("/api/playlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
      });

      if (response.ok) {
        const newPlaylist = await response.json();
        setPlaylists((prev) => [...prev, newPlaylist]);
        handleClose(); // Close modal after creating
        setNewName(""); // Reset new name
      } else {
        console.error("Failed to create playlist");
      }
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/playlists?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPlaylists((prevPlaylists) =>
          prevPlaylists.filter((playlist) => playlist._id !== id)
        );
      } else {
        console.error("Failed to delete playlist");
      }
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  const handleAddSongsOpen = (playlist) => {
    setEditingPlaylist(playlist);
    setSelectedSongs(playlist.songs || []); // Preselect current songs in playlist
    setIsAddSongsOpen(true); // Open add songs modal
  };

  const handleAddSongsClose = () => {
    setIsAddSongsOpen(false);
  };

  const handleSongSelect = (songId) => {
    setSelectedSongs((prev) =>
      prev.includes(songId)
        ? prev.filter((id) => id !== songId)
        : [...prev, songId]
    );
  };

  const handleAddSongsToPlaylist = async () => {
    try {
      const response = await fetch(`/api/playlists/${editingPlaylist._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ songs: selectedSongs }), // Send updated songs array
      });

      if (response.ok) {
        const updatedPlaylist = await response.json();
        setPlaylists((prev) =>
          prev.map((playlist) =>
            playlist._id === updatedPlaylist._id ? updatedPlaylist : playlist
          )
        );
        handleAddSongsClose(); // Close modal after saving
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
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateOpen}
        style={{ marginBottom: "16px" }}
      >
        Create Playlist
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playlists.length > 0 ? (
              playlists.map((playlist) => (
                <TableRow key={playlist._id}>
                  <TableCell>
                    <Link href={`/playlists/${playlist._id}`}>
                      {playlist.name}
                    </Link>{" "}
                    {/* Make name a link */}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEditOpen(playlist)}
                      style={{ marginRight: "8px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(playlist._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      color="default"
                      onClick={() => handleAddSongsOpen(playlist)} // Open add songs modal
                      style={{ marginLeft: "8px" }}
                    >
                      Add Songs
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  No playlists available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* MUI Modal for Editing or Creating Playlist */}
      <Dialog open={isModalOpen} onClose={handleClose}>
        <DialogTitle>
          {editingPlaylist ? "Edit Playlist" : "Create Playlist"}
        </DialogTitle>
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={editingPlaylist ? handleSaveClick : handleCreate}
            color="primary"
          >
            {editingPlaylist ? "Save" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* MUI Modal for Adding Songs to Playlist */}
      <Dialog open={isAddSongsOpen} onClose={handleAddSongsClose}>
        <DialogTitle>Add Songs to Playlist</DialogTitle>
        <DialogContent>
          {songs.map((song) => (
            <div key={song._id}>
              <Checkbox
                checked={selectedSongs.includes(song._id)}
                onChange={() => handleSongSelect(song._id)}
              />
              {song.title} by {song.artist}
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddSongsClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddSongsToPlaylist} color="primary">
            Add Songs
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PlaylistList;
