// src/queries.js
import { gql } from '@apollo/client';

// Query to get all transactions
export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    getTransactions {
      id
      description
      category
      amount
      date
    }
  }
`;

// Mutation to add a transaction
export const ADD_TRANSACTION = gql`
  mutation AddTransaction($description: String!, $category: String!, $amount: Float!, $date: String!) {
    addTransaction(description: $description, category: $category, amount: $amount, date: $date) {
      id
      description
      category
      amount
      date
    }
  }
`;

// Mutation to edit a transaction
export const EDIT_TRANSACTION = gql`
  mutation EditTransaction($id: ID!, $description: String, $category: String, $amount: Float, $date: String) {
    editTransaction(id: $id, description: $description, category: $category, amount: $amount, date: $date) {
      id
      description
      category
      amount
      date
    }
  }
`;

// Mutation to delete a transaction
export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id)
  }
`;
