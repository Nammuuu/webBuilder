'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);

  useEffect(() => {
    const fetchSelectedTheme = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const res = await axios.get('/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        setSelectedTheme(res.data.selectedTheme);
      } catch (error) {
        console.error('Failed to fetch selected theme', error.response.data.message);
      }
    };

    fetchSelectedTheme();
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      {selectedTheme ? (
        <div dangerouslySetInnerHTML={{ __html: selectedTheme.html }} />
      ) : (
        <p>No theme selected</p>
      )}
    </div>
  );
};

export default UserProfile;
