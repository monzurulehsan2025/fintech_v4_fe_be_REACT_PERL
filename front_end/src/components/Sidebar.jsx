import React from 'react';
import { LayoutDashboard, Users, ShieldCheck, Zap, BarChart3, Settings, HelpCircle } from 'lucide-react';

const Sidebar = () => {
    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Overview', active: true },
        { icon: <Users size={20} />, label: 'Team & Talent' },
        { icon: <ShieldCheck size={20} />, label: 'Governance' },
        { icon: <Zap size={20} />, label: 'Performance' },
        { icon: <BarChart3 size={20} />, label: 'Reports' },
    ];

    return (
        <aside className="sidebar">
            <div className="logo-section">
                <div className="logo-icon">
                    <Zap size={24} />
                </div>
                <span className="logo-text">Nova Fintech</span>
            </div>

            <nav className="nav-menu">
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className={`nav-item ${item.active ? 'active' : ''}`}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </div>
                ))}
            </nav>

            <div className="sidebar-footer">
                <div className="nav-item secondary">
                    <Settings size={20} />
                    <span>Settings</span>
                </div>
                <div className="nav-item secondary">
                    <HelpCircle size={20} />
                    <span>Support</span>
                </div>

                <div className="user-profile">
                    <div className="avatar">JD</div>
                    <div className="user-info">
                        <p className="user-name">J. Doe</p>
                        <p className="user-role">Platform Lead</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
