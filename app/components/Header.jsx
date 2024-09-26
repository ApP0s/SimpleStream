import styles from "@/app/page.module.css"; // Adjust the path accordingly


const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.homeIcon}>🏠</div>
      <div>Artists</div>
    </header>
  );
};

export default Header;
