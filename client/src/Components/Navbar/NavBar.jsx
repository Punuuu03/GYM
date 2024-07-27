import React, { useState } from 'react';
import './NavBar.css';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../../Assets/logo.jpg';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen); 
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
    setIsDropdownOpen(false); 
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/'); 
    setIsDropdownOpen(false); 
  };

  return (
    <div className="navBar">
      <div className="logoDiv flex">
        <img src={logo} className="logo" alt="Logo" />
      </div>
      <div className="profileIcon" onClick={handleProfileClick}>
        <FaUserCircle size={30} />
      </div>
      {isDropdownOpen && (
        <div className="dropdownMenu">
          <button className="dropdownItem" onClick={handleForgotPassword}>
            Forgot Password
          </button>
          <button className="dropdownItem" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
