import styles from "@/app/page.module.css"; // Adjust the path accordingly
import Link from 'next/link'

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.homeIcon}>🏠</Link>
      <Link href="/playlists">playlists</Link>
      <Link href="/artists">Artists</Link>
    </header>
  );
};


export default Header;
