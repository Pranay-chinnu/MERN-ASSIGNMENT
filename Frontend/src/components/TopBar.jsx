import React from 'react';
import { Link } from 'react-router-dom';

function TopBar() {
  const username = localStorage.getItem('username') || 'Admin';  // Assuming "Admin" is the default username

  return (
    <header className="top-bar">
      <div className="logo">
        <img src="/src/logo.png" alt="Logo" /> 
      </div>
      <nav className="nav-links" style={{display: 'flex', justifyContent: 'center',}}> 
        <p style={{marginLeft: "5px"}}><Link to="/dashboard">Home</Link></p>              
       <p style={{marginLeft: "20px"}}> <Link to="/employees">Employee List</Link> </p>    
      </nav>
      <div className="user-info">
        <span>{username}</span>                        {/* Admin/User display */}
        <Link to="/">Logout</Link>                     {/* Logout link */}
      </div>
    </header>
  );
}

export default TopBar;
