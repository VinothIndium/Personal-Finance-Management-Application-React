import { ChevronRight, Delete, Edit } from '@mui/icons-material';
import { Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
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

const CardStyle = styled(Card)`
    background-color: white;
    padding-left: 16px;
    padding-top: 5px;
    margin: 15px;
    box-shadow: 0px 4px 8px rgba(2, 136, 209, 0.3);
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
`;

const TableHeader = muiStyled(TableCell)(({ theme }) => ({
    fontSize: '20px',
    fontWeight: 'bold',
    paddingTop: 0
}));

const TableCellItem = muiStyled(TableCell)(({ theme }) => ({
    color: 'blue',
    fontSize: 16
}));

const SeeAllButton = muiStyled(Button)(({ theme }) => ({
    backgroundColor: '#0288d1',
    color: 'white',
    marginRight: '0.5rem',
    marginTop: '10px',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#01579b',
    },
    display: 'flex',
    alignItems: 'center',
}));

const DashboardTransactionList = () => {
    const navigate = useNavigate();
   // const {loading, error, data} = useQuery(GET_TRANSACTIONS);
    const [transactionList, setTransactionList] = useState([]);
    const [loadingError, setLoadingError] = useState('');

    // console.log("DATA: ", data.getTransactions);
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllTransactions();
                console.log(response);
                if (Array.isArray(response)) {
                    setTransactionList(response);
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

    const sortedTransactions = Array.isArray(transactionList)
        ? transactionList.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4)
        : [];

    const seeAllButtonClicked = () => {
        navigate("/transactions");
    };

    const handleEdit = (transactionId) => {
        console.log('Edit transaction with ID:', transactionId);
        // Implement edit functionality
        navigate(`/transaction-form/${transactionId}`);
    };

    const handleDelete = async (transactionId) => {
        console.log('Delete transaction with ID:', transactionId);
        // Implement delete functionality
        try{
            const response = await deleteTransactionItem(transactionId);
            if (response.message === "Transaction deleted") {
                setTransactionList(transactionList.filter(transaction => transaction.id !== transactionId));
                console.log("Transaction deleted successfully");
            } else {
                console.error("Transaction failed to delete");
                setLoadingError("Transaction not found");
            }
        } catch (error) {
            setLoadingError("Error loading data: " + error.message);
        }
       
    };

    return (
        <Container>
            <HeaderContainer>
                <Title>Transaction ListView</Title>
                <SeeAllButton onClick={seeAllButtonClicked}>
                    See All<ChevronRight />
                </SeeAllButton>
            </HeaderContainer>
            {loadingError ? (
                <p style={{ color: 'red' }}>{loadingError}</p>
            ) : (
                <CardStyle>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeader>Description</TableHeader>
                                <TableHeader>Amount</TableHeader>
                                <TableHeader>Date</TableHeader>
                                <TableHeader>Edit</TableHeader>
                                <TableHeader>Delete</TableHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedTransactions.map(transaction => (
                                <TableRow key={transaction.id}>
                                    <TableCellItem>{transaction.description}</TableCellItem>
                                    <TableCellItem>${transaction.amount}</TableCellItem>
                                    <TableCellItem>{formatDateTime(transaction.date)}</TableCellItem>
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

export default DashboardTransactionList;