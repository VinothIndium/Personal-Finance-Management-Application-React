import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GET_ALL_TRANSACTIONS } from '../../apis/graphql/queries';
import Card from '../core/card/CardStyle';

const Title = styled.h1`
  color: black;
  font-size: 25px;
  padding-left: 0.5rem;
  margin-top: 0; 
`;

const DashboardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; 
`;

const Container = styled.div`
  margin-top: 0;
  padding-top: 0;
`;

const FinanceDashboard = () => {
  const [totals, setTotals] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
  });
  const { data, loading, error } = useQuery(GET_ALL_TRANSACTIONS);

  useEffect(() => {
    // const fetchTransactions = async () => {
    //   try {
    //     const response = await getAllTransactions();

    //     // Calculate totals
    //     const calculatedTotals = calculateTotals(response);
    //     setTotals(calculatedTotals);
    //   } catch (error) {
    //     console.error('Error fetching transactions:', error);
    //   }
    // };

    // fetchTransactions();
    if (data) {
      if (data.getAllTransactions) {
        const calculatedTotals = calculateTotals(data.getAllTransactions);
         setTotals(calculatedTotals);
      } else {
        console.log('Error fetching transactions:', error);
      }
  }
  }, [data, error]);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const calculateTotals = (transactions) => {
    const totals = {
      totalBalance: 0,
      totalIncome: 0,
      totalExpense: 0,
    };
  
    transactions.forEach(transaction => {
      const amount = parseFloat(transaction.amount); // Convert amount to a number
      if (transaction.category === 'Deposit') {
        totals.totalIncome += amount;
      } else if (transaction.category === 'Expense') {
        totals.totalExpense += amount;
      }
  
      // Assuming balance is calculated as income - expense
      totals.totalBalance = totals.totalIncome - totals.totalExpense;
    });
  
    return totals;
  };

  return (
    <Container>
      <Title>Finance Dashboard</Title>
      <DashboardContainer>
        <Card $bgColor="#4CAF50">
          <h2>Total Balance</h2>
          <p>${totals.totalBalance}</p>
        </Card>
        <Card $bgColor="#2196F3">
          <h2>Income</h2>
          <p>${totals.totalIncome}</p>
        </Card>
        <Card $bgColor="#f44336">
          <h2>Expenses</h2>
          <p>${totals.totalExpense}</p>
        </Card>
      </DashboardContainer>
    </Container>
  );
};

export default FinanceDashboard;
