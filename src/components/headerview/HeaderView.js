import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import SecurityContext from '../../utils/SecurityContext';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: white;
  color: black;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5 rem;
  color: black;
`;

const Button = styled.button`
margin-left: 10px;
  background-color: white;
  color: black;
  border: 1px solid black;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: green;
    color: white;
  }
`;

const HeaderView = () => {
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(SecurityContext);

  const handleAddTransaction = () => {
    // Add transaction logic here
    navigate('/transaction-form');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.setItem("loggedIn", "0");
    localStorage.removeItem('user');
    navigate("/", { replace: true });
  };

  const handleHomeButton = () => {
    navigate("/dashboard", { replace: true });
  };

  return <HeaderContainer>
    <Title>Personal Finance Management</Title>
    <div>
      <Button onClick={handleHomeButton}>Home</Button>
      <Button onClick={handleAddTransaction}>Add New Transaction</Button>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  </HeaderContainer>
}

export default HeaderView;