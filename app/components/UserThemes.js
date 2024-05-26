import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ThemeEditor from './ThemeEditor';
import styles from '../../styles/UserThemes.module.css';

const UserThemes = ({ userId }) => {
  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(null);

  useEffect(() => {
    const fetchThemes = async () => {
      const response = await axios.get(`/api/userThemes?userId=${userId}`);
      setThemes(response.data);
    };

    fetchThemes();
  }, [userId]);

  const handleSave = async (content) => {
    await axios.post(`/api/userThemes`, { userId, themeId: selectedTheme._id, content });
    const response = await axios.get(`/api/userThemes?userId=${userId}`);
    setThemes(response.data);
  };

  return (
    <div className={styles.container}>
      <h1>Your Themes</h1>
      <ul className={styles.themeList}>
        {themes.map(theme => (
          <li key={theme._id} onClick={() => setSelectedTheme(theme)} className={styles.themeItem}>
            {theme.name}
          </li>
        ))}
      </ul>
      {selectedTheme && (
        <ThemeEditor theme={selectedTheme} onSave={handleSave} />
      )}
    </div>
  );
};

export default UserThemes;
