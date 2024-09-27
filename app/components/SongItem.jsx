// components/SongItem.jsx

import React from 'react';
import { Button } from '@mui/material'; // Import MUI Button
import styles from '@/app/page.module.css';

const SongItem = ({ song, onEdit, onDelete }) => {
  return (
    <li className={styles.songItem}>
      <p>{song.title} by {song.artist}</p>
      <Button variant="outlined" color="primary" onClick={onEdit} style={{ marginRight: '8px' }}>
        Edit
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => onDelete(song._id)}
      >
        Delete
      </Button>
    </li>
  );
};

export default SongItem;
