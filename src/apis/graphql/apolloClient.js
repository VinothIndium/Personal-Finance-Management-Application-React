import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create an http link:
const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

// Create a middleware link to attach the token to every request
const authLink = setContext((_, { headers }) => {
  // Retrieve the token from local storage or any other method
  const token = localStorage.getItem('authToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create an Apollo Client instance
const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});


export default client;
