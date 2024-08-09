import { useMutation, useQuery } from '@apollo/client';
import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DELETE_TRANSACTION, GET_TRANSACTION } from '../../apis/graphql/queries';

const CardStyle = muiStyled(Card)(({ theme }) => ({
    backgroundColor: 'white',
    margin: '15px',
    boxShadow: '0px 4px 8px rgba(2, 136, 209, 0.3)',
    padding: '20px',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
}));

const DetailsContainer = muiStyled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
}));

const ActionButtons = muiStyled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '16px',
}));

const PrimaryButton = muiStyled(Button)(({ theme }) => ({
    backgroundColor: '#4a90e2', // Light Blue
    color: 'white',
    '&:hover': {
        backgroundColor: '#357ABD', // Darker Blue
    },
}));

const SecondaryButton = muiStyled(Button)(({ theme }) => ({
    backgroundColor: '#e94e77', // Red
    color: 'white',
    '&:hover': {
        backgroundColor: '#c73b60', // Darker Red
    },
}));

const EditIcon = muiStyled(Edit)(({ theme }) => ({
    color: '#4CAF50', // Green
}));

const DeleteIcon = muiStyled(Delete)(({ theme }) => ({
    color: '#f44336', // Red
}));

const TransactionDetails = () => {
    const { transactionId } = useParams();
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState(null);
    const [loadingError, setLoadingError] = useState('');

    const [deleteTransaction] = useMutation(DELETE_TRANSACTION);

    useQuery(GET_TRANSACTION, {
        variables: { id: transactionId },
        onCompleted: (data) => {
            if (data && data.getTransaction) {
                setTransaction(data.getTransaction);
            }
        },
        onError: (error) => {
            setLoadingError(`Error fetching transaction: ${error.message}`);
        },
    });

    // useEffect(() => {
    //     const fetchTransaction = async () => {
    //         try {
    //             const response = await getTransactionItem(transactionId);
    //             if (response.status === 200) {
    //                 const transaction = response.data;
    //                 setTransaction(transaction);
    //                 console.log("Transaction fetched successfully");
    //             } else {
    //                 console.error("Transaction failed to add");
    //                 setLoadingError("Transaction not found");
    //             }
    //         } catch (error) {
    //             setLoadingError("Error loading data: " + error.message);
    //         }
    //     };
    //     fetchTransaction();
    // }, [transactionId]);

    const handleEdit = () => {
        console.log('Edit transaction with ID:', transactionId);
        navigate(`/transaction-form/${transactionId}`);
    };

    const handleDelete = async () => {
        console.log('Delete transaction with ID:', transactionId);
        try {
            //const response = await deleteTransactionItem(transactionId);
            const response = await deleteTransaction({ variables: { id: transactionId } });
            console.log(response);
            if (response.data.deleteTransaction.success) {
                navigate("/transactions");
                console.log("Transaction deleted successfully");
            } else {
                console.error("Transaction failed to delete");
                setLoadingError("Transaction not found");
            }
        } catch (error) {
            setLoadingError("Error loading data: " + error.message);
        }
       
    };

    if (loadingError) {
        return <p style={{ color: 'red' }}>{loadingError}</p>;
    }

    return (
        <DetailsContainer>
            {transaction ? (
                <CardStyle>
                    <CardContent>
                        <Typography variant="h4" component="h2" gutterBottom color="textPrimary">
                            Transaction Details
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6" color="blue">Description</Typography>
                                <Typography variant="body1">{transaction.description}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" color="blue">Category</Typography>
                                <Typography variant="body1">{transaction.category}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" color="blue">Amount</Typography>
                                <Typography variant="body1">${transaction.amount}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" color="blue">Date</Typography>
                                <Typography variant="body1">
                                    {new Date(transaction.date).toLocaleString()}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <ActionButtons>
                        <PrimaryButton variant="contained" onClick={handleEdit} startIcon={<EditIcon />}>
                            Edit
                        </PrimaryButton>
                        <SecondaryButton variant="contained" onClick={handleDelete} startIcon={<DeleteIcon />}>
                            Delete
                        </SecondaryButton>
                    </ActionButtons>
                </CardStyle>
            ) : (
                <p>Loading...</p>
            )}
        </DetailsContainer>
    );
};

export default TransactionDetails;
