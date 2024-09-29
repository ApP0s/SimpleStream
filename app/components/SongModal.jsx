import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';

const SongModal = ({ isOpen, onClose, onSubmit, song }) => {
  const [songDetails, setSongDetails] = useState({
    title: '',
    artist: '',
    album: '',
    year: '',
    songFile: null, // Add songFile to state
  });

  useEffect(() => {
    if (song) {
      setSongDetails(song); // If a song is passed for editing, set its details
    } else {
      setSongDetails({ title: '', artist: '', album: '', year: '', songFile: null }); // Reset for creating a new song
    }
  }, [song]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSongDetails({ ...songDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    setSongDetails({ ...songDetails, songFile: e.target.files[0] }); // Update songFile
  };

const handleSubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append('songFile', selectedFile); // Ensure selectedFile is the actual file object
  formData.append('title', songDetails.title);
  formData.append('artist', songDetails.artist);
  formData.append('album', songDetails.album);
  formData.append('year', songDetails.year);

  try {
    const response = await fetch('/api/songs', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const newSong = await response.json();
    console.log("New song created:", newSong);
  } catch (error) {
    console.error("Error creating song:", error);
  }
};

  

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{song ? 'Edit Song' : 'Create Song'}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Song Title"
          name="title"
          value={songDetails.title}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Artist"
          name="artist"
          value={songDetails.artist}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Album"
          name="album"
          value={songDetails.album}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Year"
          name="year"
          type="number"
          value={songDetails.year}
          onChange={handleChange}
          fullWidth
        />
        <input
          type="file"
          onChange={handleFileChange}
          required // Make it required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {song ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SongModal;
