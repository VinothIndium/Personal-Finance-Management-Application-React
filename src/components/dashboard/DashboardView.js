import React from 'react';
import styled from 'styled-components';
import CategoryView from './CategoryView';
import DashboardTransactionList from './DashboardTransactionList';
import FinanceDashboard from './FinanceDashboard';

const DashboardWrapper = styled.div`
    background-color: #f4f4f4;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 1rem;
    flex: 2;
`;

const DashboardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; 
`;


const DashboardView = () => {
    return (
        <div>
            <DashboardWrapper>
                <FinanceDashboard />
            </DashboardWrapper>
            <DashboardContainer>
                <DashboardWrapper>
                    <DashboardTransactionList />
                </DashboardWrapper>
                <DashboardWrapper>
                    <CategoryView />
                </DashboardWrapper>
            </DashboardContainer>
        </div>
    );
};

export default DashboardView;
