import React from 'react';
import CategoryView from './CategoryView';
import FinanceDashboard from './FinanceDashboard';

const DashboardView = () => {
    return (
        <div>
            <FinanceDashboard/>
            <CategoryView/>
        </div>
    );
};

export default DashboardView;
