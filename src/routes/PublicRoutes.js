import { Outlet } from 'react-router-dom';

const PublicRoutes = () => {
    return (
        <div>
            <main>
                <Outlet />
            </main>
        </div>
    )
};

export default PublicRoutes;