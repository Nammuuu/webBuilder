import Link from 'next/link';
// import { useAuth } from '../../contexts/AuthContext';
import styles from '../../styles/Navbar.module.css';

const Nav = () => {
  // const { user } = useAuth();

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/">Home</Link>
        </li>

        <li className={styles.navItem}>
        <Link href="/admin">Admin</Link>
      </li>

      <li className={styles.navItem}>
            <Link href="/user">User</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/edit">Edit Themes</Link>
          </li>

        

       
      </ul>
    </nav>
  );
};

export default Nav;
