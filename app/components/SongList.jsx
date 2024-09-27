import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import styles from "@/app/page.module.css";

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    year: "",
  });

  // Fetch songs from the API
  useEffect(() => {
    fetch("/api/songs")
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((error) => console.error("Error fetching songs:", error));
  }, []);

  const handleOpen = (song = null) => {
    setCurrentSong(song);
    setFormData(
      song
        ? {
            title: song.title,
            artist: song.artist,
            album: song.album || "",
            year: song.year || "",
          }
        : { title: "", artist: "", album: "", year: "" }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentSong(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = currentSong ? "PUT" : "POST";
    const url = currentSong ? `/api/songs/${currentSong._id}` : "/api/songs";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newSong = await response.json();
        setSongs((prev) =>
          method === "POST"
            ? [...prev, newSong]
            : prev.map((song) => (song._id === newSong._id ? newSong : song))
        );
        handleClose();
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/songs/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setSongs((prev) => prev.filter((song) => song._id !== id));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Song list</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpen()}
        sx={{ margin: 2 }} // Adds margin around the button
      >
        Add Song
      </Button>
      <TableContainer component={Paper} className={styles.container}>
        <Table sx={{ minWidth: 650 }} aria-label="song list table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Artist</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {songs.length > 0 ? (
              songs.map((song) => (
                <TableRow key={song._id}>
                  <TableCell component="th" scope="row">
                    {song.title}
                  </TableCell>
                  <TableCell>{song.artist}</TableCell>
                  <TableCell>{song.year}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleOpen(song)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(song._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No songs available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentSong ? "Edit Song" : "Add Song"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              label="Artist"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              label="Album"
              name="album"
              value={formData.album}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              type="number"
              fullWidth
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">{currentSong ? "Update" : "Create"}</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SongList;
