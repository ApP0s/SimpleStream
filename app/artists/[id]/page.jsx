'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Typography, List, ListItem, ListItemText, CircularProgress, Box } from '@mui/material';

// Fetch songs by artist
async function fetchSongsByArtist(artistId) {
  const res = await fetch(`/api/artists/${artistId}/songs`);
  if (!res.ok) {
    throw new Error('Failed to fetch songs');
  }
  return res.json();
}

export default function ArtistSongsPage() {
  const [songs, setSongs] = useState([]);
  const [artist, setArtist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const artistId = params.id;

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setError(null);
      try {
        const [artistData, songsData] = await Promise.all([
          fetch(`/api/artists/${artistId}`).then(res => res.json()),
          fetchSongsByArtist(artistId)
        ]);
        setArtist(artistData);
        setSongs(songsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [artistId]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        {artist ? artist.name : 'Artist'} Songs
      </Typography>
      {songs.length === 0 ? (
        <Typography>No songs found for this artist.</Typography>
      ) : (
        <List>
          {songs.map((song) => (
            <ListItem key={song._id}>
              <ListItemText
                primary={song.title}
                secondary={`Album: ${song.album || 'N/A'} | Year: ${song.year || 'N/A'}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}