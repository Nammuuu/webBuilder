// // pages/admin/themes.js
// "use client"

// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const Themes = () => {
//   const [themes, setThemes] = useState([]);
//   const [count, setCount] = useState(0);

//   const fetchThemes = async () => {
//     try {
//       const res = await axios.get('/api/themes/allthame');
//       setThemes(res.data.themes);
//       setCount(res.data.count);
//     } catch (error) {
//       console.error('Failed to fetch themes:', error.response.data.message);
//     }
//   };

//   const updateTheme = async (id, newData) => {
//     try {
//       await axios.put(`/api/admin/themes/${id}`, newData);
//       fetchThemes();
//       console.log('Theme updated successfully');
//     } catch (error) {
//       console.error('Failed to update theme:', error.response.data.message);
//     }
//   };

//   const deleteTheme = async (id) => {
//     try {
//       await axios.delete(`/api/admin/themes/${id}`);
//       fetchThemes();
//       console.log('Theme deleted successfully');
//     } catch (error) {
//       console.error('Failed to delete theme:', error.response.data.message);
//     }
//   };

//   useEffect(() => {
//     fetchThemes();
//   }, []);

//   return (
//     <div>
//       <h1>Themes</h1>
//       <p>Total Themes: {count}</p>
//       <ul>
//         {themes.map((theme) => (
//           <li key={theme._id}>
//             {theme.name} - {theme.description}
//             <button onClick={() => updateTheme(theme._id, { name: 'Updated Name', description: 'Updated Description' })}>
//               Update
//             </button>
//             <button onClick={() => deleteTheme(theme._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Themes;

"use client"
// pages/admin/themes/index.js

'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminThemes = () => {
  const [themes, setThemes] = useState([]);
  const [count, setCount] = useState(0);
  const [notification, setNotification] = useState('');

  const fetchThemes = async () => {
    let token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!token || !refreshToken) {
      console.error('No token found');
      return;
    }

    try {
      let res = await axios.get('/api/admin/themes', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setThemes(res.data.themes);
      setCount(res.data.count);
    } catch (error) {
      if (error.response.status === 403 && error.response.data.message === 'Token expired') {
        // Refresh the token
        try {
          const refreshRes = await axios.post('/api/auth/refresh', { refreshToken });
          token = refreshRes.data.token;
          localStorage.setItem('token', token);

          // Retry the original request
          const retryRes = await axios.get('/api/admin/themes', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          setThemes(retryRes.data.themes);
          setCount(retryRes.data.count);
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError.response?.data?.message || refreshError.message);
        }
      } else {
        console.error('Failed to fetch themes:', error.response?.data?.message || error.message);
      }
    }
  };

  useEffect(() => {
    fetchThemes();
  }, []);

  const updateTheme = async (id, updateData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      await axios.put(`/api/admin/themes`, { id, updateData }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setNotification('Theme updated successfully');
      fetchThemes(); // Refresh themes after update
    } catch (error) {
      console.error('Failed to update theme:', error.response?.data?.message || error.message);
      setNotification('Failed to update theme');
    }
  };

  const deleteTheme = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      await axios.delete(`/api/admin/themes`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: { id }
      });
      setNotification('Theme deleted successfully');
      fetchThemes(); // Refresh themes after deletion
    } catch (error) {
      console.error('Failed to delete theme:', error.response?.data?.message || error.message);
      setNotification('Failed to delete theme');
    }
  };

  return (
    <div>
      <h1>Admin Themes</h1>
      {notification && <p>{notification}</p>}
      <p>Total Themes: {count}</p>
      <ul>
        {themes.map((theme) => (
          <li key={theme._id}>
            {theme.name} - {theme.description}
            <button onClick={() => updateTheme(theme._id, { /* updated data */ })}>Update</button>
            <button onClick={() => deleteTheme(theme._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminThemes;
