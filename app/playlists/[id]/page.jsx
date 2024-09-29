// app/playlists/[id]/page.jsx

"use client"; // Ensure this is a client component

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // New way to access query params in Next.js 14
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const PlaylistDetails = ({ params }) => {
  const { id } = params; // Access the playlist ID directly from params
  const [playlist, setPlaylist] = useState(null);
  const [error, setError] = useState(null);

  const fetchPlaylist = async () => {
    if (!id) return; // Ensure ID is available
    try {
      const response = await fetch(`/api/playlists/${id}`);
      if (!response.ok) throw new Error("Failed to fetch playlist");
      const data = await response.json();
      setPlaylist(data);
    } catch (error) {
      console.error("Error fetching playlist:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, [id]);

  if (error) {
    return <p>Error loading playlist: {error}</p>;
  }

  if (!playlist) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{playlist.name}</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playlist.songs.length > 0 ? (
              playlist.songs.map((song) => (
                <TableRow key={song._id}>
                  <TableCell>{song.title} by {song.artist}</TableCell>
                  <TableCell align="right">
                    {/* You can add actions for each song here if needed */}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} align="center">No songs in this playlist</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PlaylistDetails;
