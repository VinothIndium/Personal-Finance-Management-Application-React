import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: [],
    transaction: null,
    loading: false,
    error: null,
    loadingError: ''
};

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        // Actions for handling transactions list
        setTransactions: (state, action) => {
            state.list = action.payload;
        },
        deleteTransactionSlice: (state, action) => {
            state.list = state.list.filter(transaction => transaction.id !== action.payload);
        },
        setLoadingError: (state, action) => {
            state.loadingError = action.payload;
        },

        // Actions for handling loading, success, and error states for individual transaction operations
        addTransactionRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        addTransactionSuccess: (state, action) => {
            state.loading = false;
            state.transaction = action.payload;
            state.list.push(action.payload); // If you want to add the new transaction to the list
        },
        addTransactionFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        editTransactionRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        editTransactionSuccess: (state, action) => {
            state.loading = false;
            state.transaction = action.payload;
            state.list = state.list.map(transaction =>
                transaction.id === action.payload.id ? action.payload : transaction
            );
        },
        editTransactionFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

// Exporting actions
export const { 
    setTransactions, 
    deleteTransactionSlice, 
    setLoadingError, 
    addTransactionRequest, 
    addTransactionSuccess, 
    addTransactionFailure, 
    editTransactionRequest, 
    editTransactionSuccess, 
    editTransactionFailure 
} = transactionSlice.actions;

export default transactionSlice.reducer;
