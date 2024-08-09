export const ADD_TRANSACTION_REQUEST = 'ADD_TRANSACTION_REQUEST';
export const ADD_TRANSACTION_SUCCESS = 'ADD_TRANSACTION_SUCCESS';
export const ADD_TRANSACTION_FAILURE = 'ADD_TRANSACTION_FAILURE';
export const EDIT_TRANSACTION_REQUEST = 'EDIT_TRANSACTION_REQUEST';
export const EDIT_TRANSACTION_SUCCESS = 'EDIT_TRANSACTION_SUCCESS';
export const EDIT_TRANSACTION_FAILURE = 'EDIT_TRANSACTION_FAILURE';

// Action creators
export const addTransactionRequest = () => ({ type: ADD_TRANSACTION_REQUEST });
export const addTransactionSuccess = (transaction) => ({ type: ADD_TRANSACTION_SUCCESS, payload: transaction });
export const addTransactionFailure = (error) => ({ type: ADD_TRANSACTION_FAILURE, payload: error });

export const editTransactionRequest = () => ({ type: EDIT_TRANSACTION_REQUEST });
export const editTransactionSuccess = (transaction) => ({ type: EDIT_TRANSACTION_SUCCESS, payload: transaction });
export const editTransactionFailure = (error) => ({ type: EDIT_TRANSACTION_FAILURE, payload: error });
