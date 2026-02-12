import React from 'react';
import { motion } from 'framer-motion';

const DashboardCard = ({ title, value, icon, trend, subtext, color = 'blue' }) => {
    return (
        <motion.div
            className="glass-morphism dashboard-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="card-header">
                <span className="secondary-header">{title}</span>
                <div className={`card-icon ${color}`}>
                    {icon}
                </div>
            </div>
            <div className="card-body">
                <h2 className="card-value">{value}</h2>
                {trend && (
                    <div className={`trend ${trend.type}`}>
                        {trend.type === 'up' ? '↑' : '↓'} {trend.value}%
                        <span className="trend-label">{subtext}</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default DashboardCard;
