import styles from "@/app/page.module.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

const PlaylistList = ({ playlists, deletePlaylist }) => {
  return (
    <div className={styles.playlistContainer}>
      <h2>Playlists</h2>
      {playlists && playlists.length > 0 ? ( // Ensure playlists is an array and has items
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist._id}>
              <strong>{playlist.name}</strong>
              <button onClick={() => deletePlaylist(playlist._id)}>
                <i className="bi bi-x-octagon-fill"></i> Delete
              </button>
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