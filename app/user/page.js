'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

const UserThemes = () => {
  const [themes, setThemes] = useState([]);
  const [notification, setNotification] = useState('');

  const fetchThemes = async () => {
    try {
      const res = await axios.get('/api/themes');
      setThemes(res.data);
    } catch (error) {
      console.error('Failed to fetch themes', error.response.data.message);
    }
  };

  useEffect(() => {
    fetchThemes();
  }, []);

  const handleSelectTheme = async (themeId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      await axios.post(
        '/api/user/theme',
        { themeId },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setNotification('Theme selected successfully');
    } catch (error) {
      console.error('Failed to select theme', error.response.data.message);
      setNotification('Failed to select theme');
    }
  };

  return (
    <div>
      <h1>Select a Theme</h1>
      {notification && <p>{notification}</p>}
      <ul>
        {themes.map((theme) => (
          <li key={theme._id}>
            {theme.name} - {theme.description}
            <button onClick={() => handleSelectTheme(theme._id)}>Select</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserThemes;
