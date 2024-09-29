"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";

export default function ArtistModal({ artist, onClose, onSave }) {
  const [name, setName] = useState(artist ? artist.name : "");
  const [bio, setBio] = useState(artist ? artist.bio : "");
  const [genres, setGenres] = useState(artist ? artist.genres.join(", ") : "");

  const handleSave = async () => {
    const savedArtist = {
      name,
      bio,
      genres: genres.split(",").map((genre) => genre.trim()),
    };

    try {
      let res;
      if (artist) {
        // Update existing artist
        res = await fetch(`/api/artists/${artist._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(savedArtist),
        });
      } else {
        // Add new artist
        res = await fetch("/api/artists", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(savedArtist),
        });
      }

      if (!res.ok) {
        throw new Error("Failed to save artist");
      }

      const data = await res.json();
      onSave(data); // Assuming 'data' contains the artist object
      onClose(); // Close the modal once save is successful
    } catch (error) {
      console.error("Error saving artist:", error);
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{artist ? "Edit Artist" : "Add Artist"}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            multiline
            rows={4}
            fullWidth
          />
          <TextField
            label="Genres (comma separated)"
            value={genres}
            onChange={(e) => setGenres(e.target.value)}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          {artist ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
