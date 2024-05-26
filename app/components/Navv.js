
import Link from 'next/link';
import styles from '../../styles/Navbar.module.css';

const Navv = () => {
  // const { user } = useAuth();

  return (
    <nav className={styles.navbar}>
    <div>
    <h1>Welcome to the Theme Selector</h1>
    <Link href="/admin/dashboard">
      <p>Go to Admin Dashboard</p>
    </Link>
    <br />
    <Link href="/user/themes">
      <p>Select a Theme</p>
    </Link>
    <br />
    <Link href="/user/profile">
      <p>View Profile</p>
    </Link>
  </div>
    </nav>
  );
};

export default Navv;
