import { useState } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import '../../assets/styles/App.css';
import AppRoutes from '../../routes/AppRoutes';
import { store } from '../../store';
import SecurityContext from '../../utils/SecurityContext';

function App() {
  const loggedInStorage = localStorage.getItem('loggedIn');
  const loggedInValue = loggedInStorage && loggedInStorage === '1' ? true : false;
  const [loggedIn, setLoggedIn] = useState(loggedInValue);
  return (
    <Provider store={store}>
      <SecurityContext.Provider value={{ loggedIn, setLoggedIn }}>
        <RouterProvider router={AppRoutes} />
      </SecurityContext.Provider>
    </Provider>
  );
}

export default App;
