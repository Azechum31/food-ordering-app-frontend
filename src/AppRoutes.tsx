import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import AuthCallback from './pages/AuthCallback';
import UserProfilePage from './pages/UserProfilePage';
import ProtectedRoutes from './auth/ProtectedRoutes';
import RestuarantPage from './pages/RestuarantPage';
const AppRoutes = () => {
	return (
		<div>
			<Routes>
				<Route
					path='/'
					element={
						<Layout showHero>
							<HomePage />
						</Layout>
					}
				/>

				<Route path='/auth-callback' element={<AuthCallback />} />
				<Route element={<ProtectedRoutes />}>
					<Route
						path='/manage-restuarant'
						element={
							<Layout>
								<RestuarantPage />
							</Layout>
						}
					/>
					<Route
						path='/user-profile'
						element={
							<Layout>
								<UserProfilePage />
							</Layout>
						}
					/>
				</Route>
				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
		</div>
	);
};

export default AppRoutes;
