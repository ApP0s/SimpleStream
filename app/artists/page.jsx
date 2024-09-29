'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link'; // Import Link from Next.js
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Divider,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArtistModal from '@/app/components/ArtistModal';

export default function ArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArtists();
  }, []);

  async function fetchArtists() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/artists');
      if (!res.ok) {
        throw new Error('Failed to fetch artists');
      }
      const data = await res.json();
      setArtists(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleAdd = () => {
    setSelectedArtist(null);
    setIsModalOpen(true);
  };

  const handleEdit = (artist) => {
    setSelectedArtist(artist);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this artist?')) {
      try {
        const res = await fetch(`/api/artists/${id}`, {
          method: 'DELETE',
        });
        if (!res.ok) {
          throw new Error('Failed to delete artist');
        }
        setArtists(artists.filter((artist) => artist._id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleSave = async (savedArtist) => {
    setIsModalOpen(false);
    try {
      if (selectedArtist) {
        // Edit existing artist
        const res = await fetch(`/api/artists/${savedArtist._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(savedArtist),
        });
        if (!res.ok) {
          throw new Error('Failed to update artist');
        }
        setArtists(
          artists.map((artist) =>
            artist._id === savedArtist._id ? savedArtist : artist
          )
        );
      } else {
        // Add new artist
        const res = await fetch('/api/artists', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(savedArtist),
        });
        if (!res.ok) {
          throw new Error('Failed to add artist');
        }
        const newArtist = await res.json();
        setArtists([...artists, newArtist]);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

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

      {artists.length === 0 ? (
        <Typography>No artists found.</Typography>
      ) : (
        <List>
          {artists.map((artist) => (
            <Box key={artist._id} sx={{ display: 'flex', alignItems: 'center' }}>
              <ListItem>
                <ListItemText
                  primary={
                    <Link href={`/artists/${artist._id}`} passHref>
                      <Typography
                        variant="h6"
                        component="a"
                        sx={{
                          textDecoration: 'none',
                          color: 'primary.main',
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        {artist.name}
                      </Typography>
                    </Link>
                  }
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
      )}

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
