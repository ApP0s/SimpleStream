import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.homeIcon}>🏠</div>
        <input type="text" className={styles.searchBar} placeholder="Search..." />
      </header>
      <div className={styles.sidebar}>
        <div className={styles.menuItem}>+</div>
      </div>
      <main className={styles.main}>
        <div className={styles.mainContent}>
          {/* Add your main content here */}
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.bottomItem}></div>
          <div className={styles.bottomItem}></div>
          <div className={styles.bottomItem}></div>
          <div className={styles.bottomItem}></div>
        </div>
      </main>
    </div>
  );
}
