import { createBrowserRouter } from "react-router-dom";
import DashboardView from "../components/dashboard/DashboardView";
import ErrorView from "../components/error/ErrorView";
import ForgotPasswordScreen from "../components/forgot-password/ForgotPassword";
import LoginScreen from "../components/login/login";
import RegisterScreen from "../components/register/register";
import SettingsView from "../components/settings/SettingsView";
import TransactionsView from "../components/transactions/TransactionsView";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoutes />,
    children: [
        {
            path: '/',
            element: <LoginScreen />
        },
        {
            path: "/register",
            element: <RegisterScreen />
        },
        {
            path: "/forgot-password",
            element: <ForgotPasswordScreen />
        },
        {
            path: "/500",
            element: <ErrorView />
        }
    ]
  },
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
        {
            path: "/dashboard",
            element: <DashboardView/>
        },
        {
            path: "/transactions",
            element: <TransactionsView />
        },
        {
            path: "/settings",
            element: <SettingsView />
        }
    ]
  }
  ]);

  export default AppRoutes;