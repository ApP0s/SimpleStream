import * as React from 'react';
import styles from "@/app/page.module.css";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Sidebar = ({ addPlaylist }) => {
  const [open, setOpen] = React.useState(false); // State to control modal visibility
  const [playlistName, setPlaylistName] = React.useState(''); // State to store the playlist name

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPlaylistName(''); // Reset playlist name when closing the modal
  };

  const handleSubmit = () => {
    if (playlistName) {
      // Make a POST request to create a new playlist
      fetch("/api/playlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: playlistName }), // Sending the name of the playlist
      })
        .then((res) => res.json())
        .then((newPlaylist) => {
          if (newPlaylist && newPlaylist._id) {
            addPlaylist(newPlaylist); // Call the function passed down from Home to add the new playlist to the state
            handleClose(); // Close the modal after successful submission
          }
        })
        .catch((error) => console.error("Error creating playlist:", error));
    }
  };

  return (
    <div className={styles.sidebar}>
      <Button className={styles.menuItem} onClick={handleOpen}>+</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Create New Playlist
          </Typography>
          <TextField
            fullWidth
            label="Playlist Name"
            variant="outlined"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)} // Update state with input value
            margin="normal"
          />
          <Box mt={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClose} // Cancel button to close the modal
              sx={{ marginRight: 2 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit} // Submit form to create playlist
              disabled={!playlistName} // Disable button if no name is entered
            >
              Create
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Sidebar;
