// src/queries.js
import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $name: String!, $password: String!) {
    register(email: $email, name: $name, password: $password) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

// Query to get all transactions
export const GET_ALL_TRANSACTIONS = gql`
  query GetAllTransactions {
    getAllTransactions {
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
      message
        transaction {
          id
          description
          category
          amount
          date
        }
      }
    }
`;

export const GET_TRANSACTION = gql`
  query GetTransaction($id: ID!) {
    getTransaction(id: $id) {
      id
      description
      category
      amount
      date
    }
  }
`;

// Mutation to edit a transaction
export const EDIT_TRANSACTION_MUTATION = gql`
  mutation EditTransaction($id: ID!, $description: String!, $category: String!, $amount: Float!, $date: String!) {
    editTransaction(id: $id, description: $description, category: $category, amount: $amount, date: $date) {
      message
      transaction {
        id
        description
        category
        amount
        date
      }
    }
  }
`;

// Mutation to delete a transaction
export const DELETE_TRANSACTION = gql`
   mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id) {
      message
      success
    }
  }
`;
