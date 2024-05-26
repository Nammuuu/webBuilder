'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import ThemeEditor from '../../components/ThemeEditor';
import styles from '../../../styles/AdminPage.module.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState('');
  const [userId, setUserId] = useState('');
  const [theme, setTheme] = useState(null);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const res = await axios.get('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setUsers(res.data);
    } catch (error) {
      console.error('Failed to fetch users', error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={styles.adminDashboard}>
      <h1>Admin Dashboard</h1>
      <ThemeEditor userId={userId} />
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
