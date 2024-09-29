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
  Typography,
  Grid,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LyricsIcon from "@mui/icons-material/Lyrics";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import GroupIcon from "@mui/icons-material/Group";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

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
        setPlaylists((prevPlaylists) =>
          prevPlaylists.map((playlist) =>
            playlist._id === updatedPlaylist._id ? updatedPlaylist : playlist
          )
        );
        handleClose();
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
        handleClose();
        setNewName("");
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
    fetchSongs();
    setEditingPlaylist(playlist);
    setSelectedSongs(playlist.songs || []);
    setIsAddSongsOpen(true);
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
        body: JSON.stringify({ songs: selectedSongs }),
      });

      if (response.ok) {
        const updatedPlaylist = await response.json();
        setPlaylists((prev) =>
          prev.map((playlist) =>
            playlist._id === updatedPlaylist._id ? updatedPlaylist : playlist
          )
        );
        handleAddSongsClose();
      } else {
        console.error("Failed to update playlist");
      }
    } catch (error) {
      console.error("Error updating playlist:", error);
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Playlists
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleCreateOpen}
        sx={{ marginBottom: "16px" }}
      >
        Create Playlist
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">
                  Playlist Name <GroupIcon />
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playlists.length > 0 ? (
              playlists.map((playlist) => (
                <TableRow key={playlist._id}>
                  <TableCell>
                    <Link href={`/playlists/${playlist._id}`}>
                      <Typography variant="body1" color="primary">
                        {playlist.name}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Playlist">
                      <IconButton
                        color="primary"
                        onClick={() => handleEditOpen(playlist)}
                      >
                        <BorderColorIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Playlist">
                      <IconButton
                        color="secondary"
                        onClick={() => handleDelete(playlist._id)}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Add Songs">
                      <IconButton
                        color="default"
                        onClick={() => handleAddSongsOpen(playlist)}
                      >
                        <LyricsIcon />
                      </IconButton>
                    </Tooltip>
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
          <Grid container spacing={2}>
            {songs.map((song) => (
              <Grid item xs={12} key={song._id}>
                <Checkbox
                  checked={selectedSongs.includes(song._id)}
                  onChange={() => handleSongSelect(song._id)}
                />
                {song.title} - {song.artist}
              </Grid>
            ))}
          </Grid>
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
    </Box>
  );
};

export default PlaylistList;