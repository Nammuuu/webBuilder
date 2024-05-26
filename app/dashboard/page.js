'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/signin');
    } else {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    router.push('/auth/signin');
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>User Dashboard</h1>
      <button onClick={handleSignOut}>Sign Out</button>
      <h2>Welcome, {user.email}</h2>
      {user.subscriptionStatus === 'inactive' ? (
        <button onClick={() => alert('Subscription feature not implemented yet.')}>Buy Subscription</button>
      ) : (
        <p>Subscription active until {new Date(user.subscriptionEndDate).toLocaleDateString()}</p>
      )}
    </div>
  );
};

export default Dashboard;
