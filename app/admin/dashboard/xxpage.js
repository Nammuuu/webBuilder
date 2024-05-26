'use client';

import { useEffect, useState } from 'react';

import axios from 'axios';
import ThemeEditor from '../../components/ThemeEditor';
import styles from '../../../styles/AdminPage.module.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState('');
  const [userId, setUserId] = useState('');

  // thme code  
  const [theme, setTheme] = useState(null);

  const handleSave = async (content) => {
    const name = prompt('Enter theme name');
    const description = prompt('Enter theme description');
    await axios.post('/api/themes', { userId, content, name, description });
  };
// end them code  

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const res = await fetch('/api/admin/users', {
  //       headers: {
  //         'Authorization': `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     });
  //     const data = await res.json();
  //     console.log("this line error", data); 
  //     setUsers(data);
  //   };

  //   fetchUsers();
  // }, []);


  useEffect(() => {
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
        console.error('Failed to fetch users', error.response.data.message);
      }
    };
  
    fetchUsers();
  }, []);

  const handleUpdate = async (id, updates) => {
    const {res} = await fetch(`/api/admin/users/${id}`, {
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
  };

  const handleDelete = async (id) => {
    // const res = await fetch(`/api/admin/users/${id}`, {
      const res = await fetch(`/api/admin/users/del${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (res.ok) {
      setUsers(users.filter(user => user._id !== id));
    } else {
      console.error('Failed to delete user');
    }
  };

  const handleNotificationSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/admin/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
  };
  // <h1>Admin Dashboard</h1>

  //  thame code  start 
//    <div className={styles.container}>
 
//   <h1>Admin Theme Editor</h1>
//   <ThemeEditor theme={theme} onSave={handleSave} />
// </div>

// thme code end

  return (
    <div>
       


    <div>
      <h1>Admin Dashboard</h1>
      {/* Theme Editor and other components */}
      <ul>
      <li> user id </li>
        {users.map(user => (
          <li key={user._id}>{user.email}</li>        
        ))}
      </ul>
    </div>


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
                <button onClick={() => handleDelete(user._id)}>Delete</button>
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
