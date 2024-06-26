'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import styles from '../../../styles/AdminPage.module.css';

const ThemeEditor = dynamic(() => import('../../components/ThemeEditor'), { ssr: false });

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState('');
  const [userId, setUserId] = useState('');
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
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

      fetchUsers();
    }
  }, []);

  const handleSave = async (content) => {
    if (typeof window !== 'undefined') {
      const name = prompt('Enter theme name');
      const description = prompt('Enter theme description');
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        await axios.post('/api/themes', { userId, content, name, description }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error('Failed to save theme', error);
      }
    }
  };

  const handleUpdate = async (id, updates) => {
    if (typeof window !== 'undefined') {
      try {
        const res = await fetch(`/api/admin/users/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(updates),
        });

        if (res.ok) {
          const updatedUser = await res.json();
          setUsers(users.map(user => (user._id === id ? updatedUser : user)));
        } else {
          console.error('Failed to update user');
        }
      } catch (error) {
        console.error('Failed to update user', error);
      }
    }
  };

  const handleNotificationSubmit = async (e) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const res = await fetch('/api/admin/notifications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ userId, message: notification }),
        });

        if (res.ok) {
          setNotification('');
          setUserId('');
          console.log('Notification sent successfully');
        } else {
          console.error('Failed to send notification');
        }
      } catch (error) {
        console.error('Failed to send notification', error);
      }
    }
  };

  return (
    <div className={styles.adminDashboard}>
      <h1>Admin Dashboard</h1>
      <ThemeEditor userId={userId} onSave={handleSave} />
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.email}</li>
        ))}
      </ul>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleUpdate(user._id, { role: user.role === 'admin' ? 'user' : 'admin' })}>
                  {user.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
                </button>
                <button onClick={() => handleUpdate(user._id, { isActive: !user.isActive })}>
                  {user.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Send Notification</h2>
      <form onSubmit={handleNotificationSubmit}>
        <div>
          <label>User ID (optional)</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div>
          <label>Message</label>
          <textarea
            value={notification}
            onChange={(e) => setNotification(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Send Notification</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
