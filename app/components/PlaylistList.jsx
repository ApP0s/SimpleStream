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
} from "@mui/material";
import styles from "@/app/page.module.css";

const PlaylistList = () => {
  const [playlists, setPlaylists] = useState([]);
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const [newName, setNewName] = useState("");

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

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const handleEditOpen = (playlist) => {
    setEditingPlaylist(playlist);
    setNewName(playlist.name);
  };

  const handleEditClose = () => {
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
        body: JSON.stringify({ name: newName }),
      });

      if (response.ok) {
        const updatedPlaylist = await response.json();
        setPlaylists((prevPlaylists) =>
          prevPlaylists.map((playlist) =>
            playlist._id === updatedPlaylist._id ? updatedPlaylist : playlist
          )
        );
        handleEditClose();
      } else {
        console.error("Failed to update playlist");
      }
    } catch (error) {
      console.error("Error updating playlist:", error);
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

  const handleCreateOpen = () => {
    setNewName("");
    setEditingPlaylist(null); // Ensure no playlist is being edited
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
        handleEditClose(); // Close modal after creating
        setNewName(""); // Reset new name
      } else {
        console.error("Failed to create playlist");
      }
    } catch (error) {
      console.error("Error creating playlist:", error);
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
                  <TableCell>{playlist.name}</TableCell>
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
      <Dialog open={!!editingPlaylist || newName !== ""} onClose={handleEditClose}>
        <DialogTitle>{editingPlaylist ? "Edit Playlist" : "Create Playlist"}</DialogTitle>
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
          <Button
            onClick={editingPlaylist ? handleSaveClick : handleCreate}
            color="primary"
          >
            {editingPlaylist ? "Save" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PlaylistList;
