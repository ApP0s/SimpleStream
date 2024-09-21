
const SongItem = ({ song }) => {
    return (
      <li key={song._id}>
        <strong>{song.title}</strong> by {song.artist}
      </li>
    );
  };
  
  export default SongItem;
  