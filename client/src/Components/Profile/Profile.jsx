import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({ username: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const userId = 1;
    Axios.get(`http://localhost:3000/user`, { params: { userId } })
      .then(response => {
        console.log('User data:', response.data); 
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    Axios.post('http://localhost:3000/logout')
      .then(response => {
        if (response.data.message === 'Logout successful') {
          navigate('/');
        } else {
          console.error('Logout failed:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error during logout:', error);
        navigate('/'); 
      });
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password'); 
  };

  return (
    <div className="profileContainer">
      <h2>User Profile</h2>
      <div className="profileInfo">
        <p><strong>Username:</strong> {user.username}</p>
      </div>
      <div className="profileActions">
        <button className="btn" onClick={handleLogout}>Logout</button>
        <button className="btn" onClick={handleForgotPassword}>Forgot Password</button>
      </div>
    </div>
  );
};

export default Profile;
