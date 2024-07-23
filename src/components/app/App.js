import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import '../../assets/styles/App.css';
import AppRoutes from '../../routes/AppRoutes';
import SecurityContext from '../../utils/SecurityContext';

function App() {
  const loggedInStorage = localStorage.getItem('loggedIn');
  const loggedInValue = loggedInStorage && loggedInStorage === 'true' ? true : false;
  const[loggedIn, setLoggedIn] = useState(loggedInValue);
  return (
    <SecurityContext.Provider value={{loggedIn, setLoggedIn}}>
      <RouterProvider router = { AppRoutes}/>
    </SecurityContext.Provider> 
  );
}

export default App;
