import { Delete, Edit, Visibility } from '@mui/icons-material';
import { FormControl, IconButton, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deleteTransactionItem, getAllTransactions } from '../../services/authService';
import Card from '../core/card/CardStyle';

const Title = styled.h1`
    color: black;
    font-size: 25px;
    padding-left: 0.5rem;
    margin-top: 10px;
    margin-bottom:0;
`;

const Container = styled.div`
  margin-top: 0;
  padding-top: 0;
`;

const CardStyle = muiStyled(Card)(({ theme }) => ({
    backgroundColor: 'white',
    boxShadow: '0px 4px 8px rgba(2, 136, 209, 0.3)',
    paddingLeft: '16px',
    margin: '15px',
}));

const TableHeader = muiStyled(TableCell)(({ theme }) => ({
    fontSize: '20px',
    fontWeight: 'bold',
    paddingTop: 0
}));

const TableCellItem = muiStyled(TableCell)(({ theme }) => ({
    color: 'blue',
    fontSize: 16
}));

const SearchContainer = muiStyled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    margin: '16px',
}));

const TransactionListViewAll = () => {
    const navigate = useNavigate();
    const [transactionList, setTransactionList] = useState([]);
    const [loadingError, setLoadingError] = useState('');
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getAllTransactions();
                console.log(response);
                if (Array.isArray(response)) {
                    setTransactionList(response);

                    const uniqueCategories = [...new Set(response.map(item => item.category))];
                    setCategories(uniqueCategories);
                } else {
                    throw new Error('Fetched data is not an array');
                }
            } catch (error) {
                setLoadingError("Error saving data: " + error.message);
            }
        }
        fetchData();
    }, []);

    const formatDateTime = (dateTime) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateTime).toLocaleDateString(undefined, options);
    };

    const filteredTransactions = transactionList
        .filter(transaction =>
            transaction.description.toLowerCase().includes(searchText.toLowerCase()) &&
            (selectedCategory === '' || transaction.category === selectedCategory)
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    const handleEdit = (transactionId) => {
        console.log('Edit transaction with ID:', transactionId);
        navigate(`/transaction-form/${transactionId}`);
    };

    const handleDelete = async (transactionId) => {
        console.log('Delete transaction with ID:', transactionId);
        // Implement delete functionality
        //setTransactionList(transactionList.filter(transaction => transaction.id !== transactionId));
        try {
            const response = await deleteTransactionItem(transactionId);
            if (response.status === 200) {
                setTransactionList(transactionList.filter(transaction => transaction.id !== transactionId));
                //navigate('/transactions');
                console.log("Transaction deleted successfully");
            } else {
                console.error("Transaction failed to delete");
                setLoadingError("Transaction not found");
            }
        } catch (error) {
            setLoadingError("Error loading data: " + error.message);
        }

    };

    const handleViewDetails = (transactionId) => {
        navigate(`/transaction-details/${transactionId}`);
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };


    return (
        <Container>
            <Title>Transaction ListView</Title>
            <SearchContainer>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchText}
                    onChange={handleSearchChange}
                    style={{ marginRight: '16px' }}
                />
                <FormControl variant="outlined" style={{ minWidth: 150 }}>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        label="Category"
                    >
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        {categories.map(category => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </SearchContainer>
            {loadingError ? (
                <p style={{ color: 'red' }}>{loadingError}</p>
            ) : (
                <CardStyle>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeader>S. No</TableHeader>
                                <TableHeader>Description</TableHeader>
                                <TableHeader>Amount</TableHeader>
                                <TableHeader>Date</TableHeader>
                                <TableHeader>View Details</TableHeader>
                                <TableHeader>Edit</TableHeader>
                                <TableHeader>Delete</TableHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredTransactions.map((transaction, index) => (
                                <TableRow key={transaction.id}>
                                    <TableCellItem>{index + 1}</TableCellItem>
                                    <TableCellItem>{transaction.description}</TableCellItem>
                                    <TableCellItem>${transaction.amount}</TableCellItem>
                                    <TableCellItem>{formatDateTime(transaction.date)}</TableCellItem>
                                    <TableCellItem>
                                        <IconButton onClick={() => handleViewDetails(transaction.id)} aria-label="view details">
                                            <Visibility style={{ color: 'green' }} />
                                        </IconButton>
                                    </TableCellItem>
                                    <TableCellItem>
                                        <IconButton onClick={() => handleEdit(transaction.id)} aria-label="edit">
                                            <Edit style={{ color: 'blue' }} />
                                        </IconButton>
                                    </TableCellItem>
                                    <TableCellItem>
                                        <IconButton onClick={() => handleDelete(transaction.id)} aria-label="delete">
                                            <Delete style={{ color: 'red' }} />
                                        </IconButton>
                                    </TableCellItem>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardStyle>
            )}
        </Container>
    );
}

export default TransactionListViewAll;