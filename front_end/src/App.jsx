import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DashboardCard from './components/DashboardCard';
import { VelocityChart, TalentProgressChart } from './components/Charts';
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

        <section className="chart-grid">
          <VelocityChart data={data.teamVelocity} />
          <TalentProgressChart data={data.talentDevelopment} />
        </section>

        <section className="status-section glass-morphism">
          <h3 className="chart-title" style={{ padding: '0 16px' }}>Global Infrastructure Status</h3>
          <div className="status-grid">
            {data.globalStatus.map((region, idx) => (
              <div key={idx} className="status-item">
                <div className="region-info">
                  <p className="font-semibold">{region.region}</p>
                  <p className="text-secondary" style={{ fontSize: '0.8rem' }}>Latency: {region.latency}ms</p>
                </div>
                <span className={`status-indicator ${region.status.toLowerCase()}`}>
                  {region.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="milestones-section" style={{ marginTop: '24px' }}>
          <div className="glass-morphism" style={{ padding: '24px' }}>
            <h3 className="chart-title">Key Strategic Milestones</h3>
            <div className="milestones-list">
              {data.recentMilestones.map(milestone => (
                <div key={milestone.id} className="milestone-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-color)' }}>
                  <div>
                    <p className="font-medium">{milestone.title}</p>
                    <p className="text-secondary" style={{ fontSize: '0.8rem' }}>Target: {milestone.date}</p>
                  </div>
                  <span className={`badge ${milestone.status.toLowerCase().replace(' ', '-')}`}>
                    {milestone.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
