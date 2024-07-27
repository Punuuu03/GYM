import React from 'react';
import SideBar from '../SideBar/SideBar'; 
import './Layout.css'; 

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <SideBar />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
