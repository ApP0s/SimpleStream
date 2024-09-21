import SongItem from "./SongItem";
import styles from "@/app/page.module.css";

const SongList = ({ songs }) => {
  return (
    <div className={styles.mainContent}>
      <h2>Song List</h2>
      {songs.length > 0 ? (
        <ul className={styles.songList}>
          {songs.map((song) => (
            <SongItem key={song._id} song={song} />
          ))}
        </ul>
      ) : (
        <p>No songs available</p>
      )}
    </div>
  );
};

export default SongList;
