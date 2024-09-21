import styles from "@/app/page.module.css";

const Sidebar = ({ addPlaylist }) => {
  const handleAddPlaylist = () => {
    // Prompt the user to enter a name for the new playlist
    const name = prompt("Enter a name for the new playlist:");

    if (name) {
      // Make a POST request to create a new playlist
      fetch("/api/playlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }), // Sending the name of the playlist
      })
        .then((res) => res.json())
        .then((newPlaylist) => {
          if (newPlaylist && newPlaylist._id) {
            addPlaylist(newPlaylist); // Call the function passed down from Home to add the new playlist to the state
          }
        })
        .catch((error) => console.error("Error creating playlist:", error));
    }
  };

  return (
    <div className={styles.sidebar}>
      <button className={styles.menuItem} onClick={handleAddPlaylist}>+</button>
    </div>
  );
};

export default Sidebar;
