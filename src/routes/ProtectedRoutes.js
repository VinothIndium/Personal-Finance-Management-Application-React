import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import LogoutView from "../components/logout/logout";
import SecurityContext from "../utils/SecurityContext";

const ProtectedRoutes = () => {
    const { loggedIn } = useContext(SecurityContext);
    if(loggedIn){
        return (<div>
            <header>HEADER
                <LogoutView/>
            </header>
            <hr/>
            <main>
                <Outlet/>
            </main>
            <hr/>
            <footer>FOOTER</footer>
        </div>)
    }else{
        return <Navigate to="/500"/>
    }
};

export default ProtectedRoutes;