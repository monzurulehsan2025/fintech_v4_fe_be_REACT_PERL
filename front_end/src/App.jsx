import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DashboardCard from './components/DashboardCard';
import { Activity, Users, Globe, Zap, Clock, ShieldCheck } from 'lucide-react';
// import mockData from './data/mockData.json';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    setData(null);
    fetch(`http://localhost:3000/api/data?page=${currentPage}&limit=${limit}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch from Perl backend');
        return res.json();
      })
      .then(setData)
      .catch(err => {
        console.error(err);
        setError(err.message);
      });
  }, [currentPage]);

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

        {!data ? (
          <div className="loading-screen" style={{ height: '400px', background: 'transparent' }}>
            <div className="loader"></div>
          </div>
        ) : (
          <>
            <section className="stats-container">
              {data.summary.map((item, index) => {
                const { key, value } = item;
                // Simple mapping for display titles
                const displayTitle = key
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, (str) => str.toUpperCase());

                // Assign colors and icons based on index or key for variety
                const colors = ['blue', 'cyan', 'purple', 'green'];
                const color = colors[index % colors.length];

                return (
                  <DashboardCard
                    key={key}
                    title={displayTitle}
                    value={typeof value === 'number' && key === 'systemHealth' ? `${value}%` : value}
                    icon={<Activity size={20} />}
                    color={color}
                  />
                );
              })}
            </section>

            <div className="pagination-controls glass-morphism">
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <div className="page-info">
                Page <span className="current-page">{data.pagination.currentPage}</span> of {data.pagination.totalPages}
              </div>
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(prev => Math.min(data.pagination.totalPages, prev + 1))}
                disabled={currentPage === data.pagination.totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
