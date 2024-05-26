// utils/auth.js
import axios from 'axios';

const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios.post('/api/auth/refresh', { refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    return accessToken;
  } catch (error) {
    console.error('Failed to refresh access token', error.response?.data?.message || error.message);
    return null;
  }
};

export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!token || !refreshToken) {
    console.error('No token found');
    return null;
  }

  try {
    const response = await axios(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      const newAccessToken = await refreshAccessToken(refreshToken);
      if (newAccessToken) {
        const retryResponse = await axios(url, {
          ...options,
          headers: {
            ...options.headers,
            'Authorization': `Bearer ${newAccessToken}`,
          },
        });
        return retryResponse.data;
      }
    } else {
      throw error;
    }
  }
};
