import { useAuth0 } from '@auth0/auth0-react';
import { Button } from './ui/button';
import { useLocation } from 'react-router-dom';
import LoadingButton from './LoadingButton';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import UserProfileForm, {
	UserFormData,
} from '@/forms/user-profile-form/UserProfileForm';
import { useGetUser } from '@/api/MyUserAPI';

type Props = {
	onCheckout: (userFormData: UserFormData) => void;
	disabled: boolean;
	isLoading: boolean;
};

const CheckoutButton = ({
	onCheckout,
	disabled,
	isLoading: isCheckoutLoading,
}: Props) => {
	const {
		isAuthenticated,
		isLoading: isAuthLoading,
		loginWithRedirect,
	} = useAuth0();
	const { pathname } = useLocation();

	const { currentUser, isLoading } = useGetUser();

	const isLogin = () => {
		loginWithRedirect({
			appState: {
				returnTo: pathname,
			},
		});
	};

	if (!isAuthenticated) {
		return (
			<Button onClick={isLogin} className='bg-orange-500 flex-1'>
				Log in to Checkout
			</Button>
		);
	}
	if (isAuthLoading || !currentUser || isCheckoutLoading) {
		return <LoadingButton />;
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button disabled={disabled} className='bg-orange-500 flex-1'>
					Go to Checkout
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-[350px] md:min-w-[550px] bg-slate-50'>
				<UserProfileForm
					currentUser={currentUser}
					onSave={onCheckout}
					isLoading={isLoading}
					title='Confirm Delivery Details'
					buttonText='Continue to Payment'
				/>
			</DialogContent>
		</Dialog>
	);
};

export default CheckoutButton;
