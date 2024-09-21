import styles from "@/app/page.module.css"; // Adjust the path accordingly


const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.homeIcon}>🏠</div>
      <input type="text" className={styles.searchBar} placeholder="Search..." />
      <div>Artists</div>
    </header>
  );
};

export default Header;
