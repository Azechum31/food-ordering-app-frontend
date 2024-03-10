import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import AuthCallback from './pages/AuthCallback';
import UserProfilePage from './pages/UserProfilePage';
import ProtectedRoutes from './auth/ProtectedRoutes';
import RestuarantPage from './pages/RestuarantPage';
import SearchPage from './pages/SearchPage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import OrderStatusPage from './pages/OrderStatusPage';
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
				<Route
					path='/search/:city'
					element={
						<Layout>
							<SearchPage />
						</Layout>
					}
				/>
				<Route
					path='/restaurant/:restaurantId'
					element={
						<Layout>
							<RestaurantDetailPage />
						</Layout>
					}
				/>

				<Route path='/auth-callback' element={<AuthCallback />} />
				<Route element={<ProtectedRoutes />}>
					<Route
						path='/order-status'
						element={
							<Layout>
								<OrderStatusPage />
							</Layout>
						}
					/>
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
