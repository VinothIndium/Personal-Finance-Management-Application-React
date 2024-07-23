import { Outlet } from 'react-router-dom';

const PublicRoutes = () => {
    return (<div>
        <header>HEADER</header>
        <hr/>
        <main>
            <Outlet/>
        </main>
        <hr/>
        <footer>FOOTER</footer>
    </div>)
};

export default PublicRoutes;