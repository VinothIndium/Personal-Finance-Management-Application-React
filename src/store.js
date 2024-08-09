import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './components/transactions/transactionSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
  },
});