import * as React from 'react';
import styles from "@/app/page.module.css";
<<<<<<< HEAD
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


=======
import 'bootstrap-icons/font/bootstrap-icons.css';
>>>>>>> SkyDev

const PlaylistList = ({ playlists, deletePlaylist }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className={styles.playlistContainer}>
      <h2>Playlists</h2>
      {playlists && playlists.length > 0 ? ( // Ensure playlists is an array and has items
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist._id}>
              <strong>{playlist.name}</strong>
              <button onClick={() => deletePlaylist(playlist._id)}>
<<<<<<< HEAD
                Delete
              </button>
              <Button onClick={handleOpen}>Open modal</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Text in a modal
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor
                    ligula.
                  </Typography>
                </Box>
              </Modal>
=======
                <i className="bi bi-x-octagon-fill"></i> Delete
              </button>
>>>>>>> SkyDev
            </li>
          ))}
        </ul>
      ) : (
        <p>No playlists available</p>
      )}
    </div>
  );
};

export default PlaylistList;