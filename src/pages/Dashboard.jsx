import React from 'react';
import Sidebar from '../layout/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import '../App.css'; // se necessário

function Dashboard() {
  return (
    <div className="app dashboard-layout" style={{ display: 'flex' }}>
      <Sidebar />
      <div className="content" style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
