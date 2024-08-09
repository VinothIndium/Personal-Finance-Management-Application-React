import { useMutation, useQuery } from '@apollo/client';
import { Delete, Edit, Print, Visibility } from '@mui/icons-material';
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import { jwtDecode } from 'jwt-decode';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { DELETE_TRANSACTION, GET_ALL_TRANSACTIONS } from '../../apis/graphql/queries';
import Card from '../core/card/CardStyle';
import { deleteTransactionSlice, setLoadingError, setTransactions } from './reducers/transactionSlice';

pdfMake.vfs = pdfFonts.pdfMake.vfs; // Required for pdfmake to work

const Title = styled.h1`
    color: black;
    font-size: 25px;
    padding-left: 0.5rem;
    margin-top: 10px;
    margin-bottom: 0;
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

const ReportButton = muiStyled(Button)(({ theme }) => ({
    marginLeft: '16px',
    backgroundColor: '#4a90e2',
    color: 'white',
    '&:hover': {
        backgroundColor: '#357ABD',
    },
}));

const TransactionListViewAll = () => {
    const dispatch = useDispatch();
    const transactions = useSelector(state => state.transactions.list);
    const loadingError = useSelector(state => state.transactions.loadingError);

    const navigate = useNavigate();

    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);

    const { data, loading, error } = useQuery(GET_ALL_TRANSACTIONS);

    const [deleteTransaction] = useMutation(DELETE_TRANSACTION);

    useEffect(() => {
        if (data) {
            try {
                if (data.getAllTransactions) {
                    dispatch(setTransactions(data.getAllTransactions));

                    const uniqueCategories = [...new Set(data.getAllTransactions.map(item => item.category))];
                    setCategories(uniqueCategories);
                } else {
                    throw new Error('Fetched data is not an array');
                }
            } catch (error) {
                dispatch(setLoadingError("Error saving data: " + error.message));
            }
        }
    }, [data, dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const formatDateTime = (dateTime) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateTime).toLocaleDateString(undefined, options);
    };

    const filteredTransactions = transactions
        .filter(transaction => {
            // Ensure description is defined, fallback to empty string if undefined
            const description = transaction.description ? transaction.description.toLowerCase() : '';

            // Check if description includes the search text
            const matchesSearchText = description.includes(searchText.toLowerCase());

            // Check if the selected category matches, or if no category is selected
            const matchesCategory = selectedCategory === '' || transaction.category === selectedCategory;

            // Return true if both conditions are met
            return matchesSearchText && matchesCategory;
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort transactions by date in descending order

    const handleEdit = (transactionId) => {
        navigate(`/transaction-form/${transactionId}`);
    };

    const handleDelete = async (transactionId) => {
        try {
            const response = await deleteTransaction({ variables: { id: transactionId } });
            if (response.data.deleteTransaction.success) {
                dispatch(deleteTransactionSlice(transactionId));
                console.log("Transaction deleted successfully");
            } else {
                console.error("Transaction failed to delete");
                dispatch(setLoadingError("Transaction not found"));
            }
        } catch (error) {
            dispatch(setLoadingError("Error loading data: " + error.message));
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

    const getUsernameFromToken = () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                console.log("Decoded Token:", decodedToken);
                return decodedToken.email; // Adjust this according to your token's payload structure
            } catch (error) {
                console.error("Invalid token or decoding error", error);
                return null;
            }
        }
        return null;
    };
    
    // Usage
    const username = getUsernameFromToken();

    const generateReport = () => {
        // Logic for generating the report
        console.log("Generating report...");
        const docDefinition = {
            content: [
                { text: 'Transaction Report', style: 'header' },
                { text: `Email: ${username}`, margin: [0, 0, 0, 15] },
                {
                    table: {
                        headerRows: 1,
                        widths: [ '*', '*', '*', '*' ],
                        body: [
                            [ 'Description', 'Category', 'Amount', 'Date' ],
                            ...filteredTransactions.map(transaction => [
                                transaction.description,
                                transaction.category,
                                `$${transaction.amount}`,
                                new Date(transaction.date).toLocaleDateString()
                            ])
                        ]
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true
                }
            }
        };
    
        pdfMake.createPdf(docDefinition).download('TransactionReport.pdf');
        
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
                <ReportButton
                    variant="contained"
                    startIcon={<Print />}
                    onClick={generateReport}
                >
                    Generate Report
                </ReportButton>
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
