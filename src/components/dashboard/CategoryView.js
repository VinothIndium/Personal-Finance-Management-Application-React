import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAllTransactions } from '../../services/authService';
import Card from '../core/card/CardStyle';

// Styled components
const Container = styled.div`
  margin-top: 0;
  padding-top: 0;
`;

const Title = styled.h1`
  color: black;
  font-size: 25px;
  padding-left: 0.5rem;
  margin-top: 10px;
`;

const CardContainer = styled.div`
  margin: 0;
  padding: 0;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin: 1rem 0;
`;

const TransactionCard = styled.div`
  background-color: #e3f2fd;
  color: black;
  padding: 0.5rem; /* Reduced padding */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 100px; /* Optional: Fixed height */
  overflow: hidden; /* Ensure content does not overflow */
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;
const CategoryView = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch all transactions when the component mounts
    const fetchTransactions = async () => {
      try {
        const response = await getAllTransactions(); // Adjust the URL as needed
        console.log("Categories",response);
        setTransactions(response); // Assuming the API returns an array of transactions
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <Container>
      <Title>Transactions View</Title>
      <CardContainer>
        <Card $bgColor="#FFC107">
          <GridContainer>
            {transactions.map((transaction, index) => (
              <TransactionCard key={index}>
                <h3>{transaction.description}</h3>
                <p>Amount: ${transaction.amount}</p>
              </TransactionCard>
            ))}
          </GridContainer>
        </Card>
      </CardContainer>
    </Container>
  );
};

export default CategoryView;
