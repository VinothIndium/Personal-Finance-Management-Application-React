import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import HeaderView from "../components/headerview/HeaderView";
import SecurityContext from "../utils/SecurityContext";

const ProtectedRoutes = () => {
    const { loggedIn } = useContext(SecurityContext);
    if (loggedIn) {
        return (
            <div>
                <HeaderView />
                <main>
                    <Outlet />
                </main>
            </div>)
    } else {
        return <Navigate to="/500" />
    }
};

export default ProtectedRoutes;