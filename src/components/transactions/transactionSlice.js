import { createSlice } from '@reduxjs/toolkit';

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setTransactions: (state, action) => {
      state.list = action.payload;
    },
    addTransaction: (state, action) => {
      state.list.push(action.payload);
    },
    deleteTransaction: (state, action) => {
      state.list = state.list.filter(transaction => transaction.id !== action.payload);
    },
    updateTransaction: (state, action) => {
      const index = state.list.findIndex(transaction => transaction.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    setLoadingError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setTransactions, addTransaction, deleteTransaction, updateTransaction, setLoadingError } = transactionSlice.actions;

export default transactionSlice.reducer;
