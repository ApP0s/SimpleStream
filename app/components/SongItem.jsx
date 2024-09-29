// components/SongItem.jsx

import React from "react";
import { Button } from "@mui/material"; // Import MUI Button
import styles from "@/app/page.module.css";

const SongItem = ({ song, onEdit, onDelete }) => {
  return (
    <li className={styles.songItem}>
      <p>
        {song.title} by {song.artist}
      </p>
      <Button
        variant="outlined"
        color="primary"
        onClick={onEdit}
        style={{ marginRight: "8px" }}
      >
        Edit
      </Button>
      {/* <Button
        variant="outlined"
        color="secondary"
        onClick={() => onDelete(song._id)}
        style={{ marginRight: '8px' }}
      >
        Delete
      </Button> */}
      <Button
        variant="outlined"
        color="error" // Use MUI's error color for consistent styling
        onClick={() => onDelete(song._id)}
        sx={{
          borderColor: "red", // or your preferred color
          color: "red",
          "&:hover": {
            backgroundColor: "rgba(255, 0, 0, 0.1)", // Light red background on hover
          },
        }}
      >
        Delete
      </Button>
    </li>
  );
};

export default SongItem;
