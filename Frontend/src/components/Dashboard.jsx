import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TopBar from './TopBar';

function Dashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Admin';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <div>
      <TopBar/>
      <div className="dashboard">
        <main>
          <h1>Welcome Admin Panel</h1>
          <div style={{marginLeft:425, marginTop:10}}>
            <Link to="/create-employee" className="create-employee-btn">Create Employee</Link>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;