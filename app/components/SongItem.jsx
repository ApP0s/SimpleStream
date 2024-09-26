const SongItem = ({ song }) => {
  return (
    <li>
      <span>{song.title} by {song.artist}</span>
    </li>
  );
};

export default SongItem;
