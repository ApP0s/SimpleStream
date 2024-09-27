// components/SongModal.jsx

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
  });

  useEffect(() => {
    if (song) {
      setSongDetails(song); // If a song is passed for editing, set its details
    } else {
      setSongDetails({ title: '', artist: '', album: '', year: '' }); // Reset for creating a new song
    }
  }, [song]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSongDetails({ ...songDetails, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(songDetails);
    onClose(); // Close the modal after submitting
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
