'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArtistModal from '@/app/components/ArtistModal';

export default function ArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch existing artists from the API
    async function fetchArtists() {
      const res = await fetch('/api/artists');
      const data = await res.json();
      if (data.success) setArtists(data.data);
    }

    fetchArtists();
  }, []);

  const handleAdd = () => {
    setSelectedArtist(null); // Clear selected artist for new add
    setIsModalOpen(true);
  };

  const handleEdit = (artist) => {
    setSelectedArtist(artist); // Set artist to be edited
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this artist?')) {
      const res = await fetch(`/api/artists/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) setArtists(artists.filter((artist) => artist._id !== id));
    }
  };

  const handleSave = (savedArtist) => {
    setIsModalOpen(false);

    if (selectedArtist) {
      // Edit existing artist
      setArtists(
        artists.map((artist) =>
          artist._id === savedArtist._id ? savedArtist : artist
        )
      );
    } else {
      // Add new artist
      setArtists([...artists, savedArtist]);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Artists
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAdd}
        sx={{ marginBottom: 2 }}
      >
        Add Artist
      </Button>

      <List>
        {artists.map((artist) => (
          <Box key={artist._id} sx={{ display: 'flex', alignItems: 'center' }}>
            <ListItem>
              <ListItemText
                primary={artist.name}
                secondary={`${artist.bio} - ${artist.genres.join(', ')}`}
              />
              <IconButton
                color="primary"
                onClick={() => handleEdit(artist)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => handleDelete(artist._id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>

      {isModalOpen && (
        <ArtistModal
          artist={selectedArtist}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </Box>
  );
}
