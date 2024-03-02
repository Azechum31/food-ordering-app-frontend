import { useAuth0 } from '@auth0/auth0-react';
import { Loader2 } from 'lucide-react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
	const { isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return (
			<span>
				Loading <Loader2 className='w-6 h-6 ml-2 animate-spin' />
			</span>
		);
	}

	if (isAuthenticated) {
		return <Outlet />;
	}

	return <Navigate to='/' replace />;
};

export default ProtectedRoutes;
