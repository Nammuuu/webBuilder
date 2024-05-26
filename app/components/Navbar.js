'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import{ jwtDecode} from 'jwt-decode';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    router.push('/auth/signin');
  };

  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/auth/register">Register</Link></li>
        <li><Link href="/auth/signin">Sign In</Link></li>
        {user && (
          <>
            <li><Link href="/dashboard">Dashboard</Link></li>
            {user.role === 'admin' && (
              <li><Link href="/admin/dashboard">Admin Dashboard</Link></li>
            )}
            <li><button onClick={handleSignOut}>Sign Out</button></li>
          </>
        )}
      </ul>
      <style jsx>{`
        nav {
          background: #333;
          padding: 1rem;
        }
        ul {
          list-style: none;
          display: flex;
          gap: 1rem;
        }
        li {
          color: white;
        }
        a {
          color: white;
          text-decoration: none;
        }
        button {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
