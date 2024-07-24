import React from 'react';
import styled from 'styled-components';
import Card from '../core/card/CardStyle';

const DashboardWrapper = styled.div`
  padding-left: 2rem;
  padding-right: 2rem;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 1rem auto;
   flex: 2;
`;

const Title = styled.h1`
  color: black;
  font-size: 30px;
`;

const DashboardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  
`;



const FinanceDashboard = () => {
    const balance = 10000; // Example balance
    const totalIncome = 5000; // Example total income
    const totalExpenses = 2000; // Example total expenses

    return (
        <div>
            <Title>Finance Dashboard</Title>
            <DashboardContainer>
                <Card bgColor="#4CAF50">
                    <h2>Total Balance</h2>
                    <p>${balance}</p>
                </Card>
                <Card bgColor="#2196F3">
                    <h2>Income</h2>
                    <p>${totalIncome}</p>
                </Card>
                <Card bgColor="#f44336">
                    <h2>Expenses</h2>
                    <p>${totalExpenses}</p>
                </Card>
            </DashboardContainer>
        </div>
    );
};


export default FinanceDashboard;