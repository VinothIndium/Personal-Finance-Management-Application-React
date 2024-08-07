import axios from 'axios';
import axiosInstance from '../apis/config';

const API_URL = 'http://localhost:4000';

export const register = async (email, password) => {
    console.log("EMAIL", email);
    console.log("PASSWORD", password);

    try {
        const response = await axios.post(`${API_URL}/register`, { email, password });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error registering:', error.response ? error.response.data : error.message);
        throw error;
    }
};
export const login = async (email, password) => {
    console.log("EMAIL", email);
    console.log("PASSWORD", password);
    const response = await axiosInstance.post(`${API_URL}/login`, { email, password });
    console.log(response.data);
    if (response.data.token) {
        localStorage.setItem('userId', response.data);
        localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};


//create transaction

export const addTransaction = async (description, category, amount, date) => {

    console.log("Description", description);
    console.log("Category", category);
    console.log("Amount", amount);
    console.log("Date", date);

    const response = await axiosInstance.post(`/addTransaction`, {description, category, amount, date });
    console.log(response);
    return response;
};

//get transaction

export const getTransactionItem = async (transactionId) => {
    console.log("TransactionId", transactionId);

    const response = await axiosInstance.get(`/getTransaction/${transactionId}`);
    return response;
};

//get all transaction

export const getAllTransactions = async () => {
    console.log("GetAllTransactions");
    try {
        const response = await axiosInstance.get(`/getTransactions`);
        console.log("GetAllTransactions 2");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching transactions:", error.response ? error.response.data : error.message);
    }
};

//Edit transaction
export const editTransactionItem = async (transactionId, description, category, amount, date) => {
    console.log("TransactionId", transactionId);

    const response = await axiosInstance.put(`/editTransaction/${transactionId}`, { transactionId, description, category, amount, date });
    return response;
};

//delete transaction
export const deleteTransactionItem = async (transactionId) => {
    console.log("TransactionId", transactionId);

    const response = await axiosInstance.delete(`/deleteTransaction/${transactionId}`);
    return response;
};
