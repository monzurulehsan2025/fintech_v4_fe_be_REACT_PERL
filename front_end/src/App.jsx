import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DashboardCard from './components/DashboardCard';
import { Activity, Users, Globe, Zap, Clock, ShieldCheck } from 'lucide-react';
// import mockData from './data/mockData.json';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/data')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch from Perl backend');
        return res.json();
      })
      .then(setData)
      .catch(err => {
        console.error(err);
        setError(err.message);
      });
  }, []);

  if (error) {
    return (
      <div className="error-screen">
        <div className="glass-morphism" style={{ padding: '40px', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--error)' }}>Backend Offline</h2>
          <p className="text-secondary">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar />

      <main className="main-content">
        <header className="header">
          <div className="banner-container">
            <img
              src="http://localhost:3000/api/banner"
              alt="Fintech Banner"
              className="dashboard-banner"
              loading="lazy"
              onLoad={(e) => e.target.classList.add('loaded')}
            />
            <div className="banner-overlay"></div>
          </div>
          <div className="header-top">
            <div>
              <p className="secondary-header">Welcome Back, Platform Engineering Lead</p>
              <h1>Fintech Excellence <span className="gradient-text">Dashboard</span></h1>
            </div>
            <div className="header-actions">
              <button className="primary-btn">Generate Report</button>
            </div>
          </div>
        </header>

        <section className="stats-container">
          <DashboardCard
            title="System Availability"
            value={`${data.summary.systemHealth}%`}
            icon={<ShieldCheck size={20} />}
            trend={{ type: 'up', value: 0.02 }}
            subtext="from last week"
            color="green"
          />
          <DashboardCard
            title="Active Users"
            value={data.summary.activeUsers}
            icon={<Users size={20} />}
            trend={{ type: 'up', value: 12 }}
            subtext="monthly growth"
            color="cyan"
          />
          <DashboardCard
            title="Deployment Frequency"
            value={data.summary.deploymentFrequency}
            icon={<Zap size={20} />}
            trend={{ type: 'up', value: 8 }}
            subtext="sprint average"
            color="blue"
          />
          <DashboardCard
            title="Mean Time To Recover"
            value={data.summary.mttr}
            icon={<Clock size={20} />}
            trend={{ type: 'down', value: 5 }}
            subtext="improvement"
            color="purple"
          />
        </section>




      </main>
    </div>
  );
}

export default App;
